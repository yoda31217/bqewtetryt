package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Function;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.LinkedList;
import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.transform;
import static java.util.Collections.emptyList;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;

public class LiveFordParser implements BParser {

  private static final long REFRESH_DELAY_IN_MILLIS = 10 * 60 * 1000L;
  private final    ChromeDriver webDriver;
  private volatile DateTime     lastRefreshDate;
  private final    Timer        timerMetric;

  public LiveFordParser(ChromeDriver webDriver, MetricRegistry metricRegistry) {
    this.webDriver = webDriver;

    this.webDriver.get("http://sports.williamhill.com/bet/en-gb/betlive/all");
    this.webDriver.manage().window().setSize(new Dimension(50, 50));
    this.lastRefreshDate = now(UTC);
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  @Override
  public List<ParsedEvent> parse() {
    if (refreshIfNeeded()) {
      return emptyList();
    }

    Timer.Context timer = timerMetric.time();
    try {
      Document doc = parseDocument();
      return parseEvents(doc);

    } finally {
      timer.stop();
    }
  }

  private Document parseDocument() {
    String html = webDriver.findElementByTagName("html").getAttribute("outerHTML");
    return Jsoup.parse(html);
  }

  private ParsedEvent parseEvent(Element eventEl, String sportStr) {
    String date = null;

    String externalId = parseExternalId(eventEl);
    if (null == externalId) return null;

    String sidesStr = selectElText(eventEl, "td.CentrePad > a > span");
    if (null == sidesStr) return null;

    String[] sides = sidesStr.split("( v | @ )");
    String side1 = sides[0];
    String side2 = sides[1];

    List<String> kofs = selectElsTexts(eventEl, "td > div.eventpriceholder-left > div.eventprice");
    if (2 > kofs.size()) return null;

    String lowKof = kofs.get(0);
    if (null == lowKof) return null;
    if ("EVS".equals(lowKof)) return null;

    String highKof = kofs.get(1);
    if (null == highKof) return null;
    if ("EVS".equals(highKof)) return null;

    return new ParsedEvent(externalId, sportStr, side1, side2, date, lowKof, highKof);
  }

  private List<ParsedEvent> parseEvents(Document doc) {
    List<ParsedEvent> events = new LinkedList<>();

    Elements sportEls = doc.select("#sports_holder > div");
    for (Element sportEl : sportEls) {

      String sportStr = parseSportStr(sportEl);

      Elements eventEls = sportEl.select("div > div > div > div.marketHolderExpanded > table.tableData > tbody > tr.rowLive");
      for (Element eventEl : eventEls) {

        ParsedEvent parsedEvent = parseEvent(eventEl, sportStr);
        if (null == parsedEvent) continue;

        events.add(parsedEvent);
      }
    }

    return events;
  }

  private String parseExternalId(Element eventEl) {
    String eventElId = selectElAttr(eventEl, "id");

    if (isNullOrEmpty(eventElId)) return null;

    String[] externalIdParts = eventElId.split("_");
    return externalIdParts[externalIdParts.length - 1];
  }

  private String parseSportStr(Element sportEl) {
    return selectElText(sportEl, "div.subtitlediv > h2");
  }

  private boolean refreshIfNeeded() {
    DateTime now = now(UTC);
    boolean isRefreshNeeded = REFRESH_DELAY_IN_MILLIS <= new Duration(lastRefreshDate, now).getMillis();

    if (isRefreshNeeded) {
      webDriver.navigate().refresh();
      lastRefreshDate = now;
    }
    return isRefreshNeeded;
  }

  private String selectElAttr(Element el, String attrName) {
    String attrText = el.attr(attrName);
    if (isNullOrEmpty(attrText)) return null;

    return attrText.trim();
  }

  private String selectElText(Element el, String cssSelector) {
    Elements els = el.select(cssSelector);
    if (els.isEmpty()) return null;

    String elText = els.get(0).text();
    if (isNullOrEmpty(elText)) return null;

    return elText.trim();
  }

  private List<String> selectElsTexts(Element parentEl, String cssSelector) {
    return transform(parentEl.select(cssSelector), new Function<Element, String>() {

      @Override
      public String apply(Element el) {
        String elText = el.text();
        return (isNullOrEmpty(elText)) ? null : elText;
      }
    });
  }
}