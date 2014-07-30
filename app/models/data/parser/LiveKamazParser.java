package models.data.parser;

import com.google.common.base.Splitter;
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

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.Collections.emptyList;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;

public class LiveKamazParser implements BParser {

  private static final long     REFRESH_DELAY_IN_MILLIS = 10 * 60 * 1000L;
  private static final Splitter SPORT_NAME_SPLITTER     = Splitter.on('|');
  private final    ChromeDriver webDriver;
  private volatile DateTime     lastRefreshDate;

  public LiveKamazParser(ChromeDriver webDriver) {
    this.webDriver = webDriver;

    this.webDriver.get("https://www.favbet.com/en/live/");
    this.webDriver.manage().window().setSize(new Dimension(50, 50));
    this.lastRefreshDate = now(UTC);
  }

  @Override
  public List<ParsedEvent> parse() {
    if (refreshIfNeeded()) {
      return emptyList();
    }

    Document doc = parseDocument();
    return parseEvents(doc);
  }

  private Document parseDocument() {
    String html = webDriver.findElementByTagName("html").getAttribute("outerHTML");
    return Jsoup.parse(html);
  }

  private ParsedEvent parseEvent(Element eventEl, String sportStr) {
    String date = null;

    String side1 = selectElText(eventEl, "li.bets_fullmark_body.m_1 span");
    if (null == side1) return null;

    String lowKof = selectElText(eventEl, "li.bets_fullmark_body.m_1 button:not([disabled])");
    if (null == lowKof) return null;

    String side2 = selectElText(eventEl, "li.bets_fullmark_body.m_2 span");
    if (null == side2) return null;

    String highKof = selectElText(eventEl, "li.bets_fullmark_body.m_2 button:not([disabled])");
    if (null == highKof) return null;

    return new ParsedEvent(sportStr, side1, side2, date, lowKof, highKof);
  }

  private List<ParsedEvent> parseEvents(Document doc) {
    List<ParsedEvent> events = new LinkedList<ParsedEvent>();

    Elements sportEls = doc.select("#content > div.content > div.livediv > ul.betlist > li.tour-bl");
    for (Element sportEl : sportEls) {

      String sportStr = parseSportStr(sportEl);

      Elements eventEls = sportEl.select("li > ul.mrk-head > li.col21 > ul.mrk-itm");
      for (Element eventEl : eventEls) {

        ParsedEvent parsedEvent = parseEvent(eventEl, sportStr);
        if (null == parsedEvent) continue;

        events.add(parsedEvent);
      }
    }

    return events;
  }

  private String parseSportStr(Element sportEl) {
    String rawSportStr = selectElText(sportEl, "div.t_name b");
    return newArrayList(SPORT_NAME_SPLITTER.split(rawSportStr)).get(0).trim();
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

  private String selectElText(Element el, String cssSelector) {
    Elements els = el.select(cssSelector);
    if (els.isEmpty()) return null;

    String elText = els.get(0).text();
    if (isNullOrEmpty(elText)) return null;

    return elText;
  }
}