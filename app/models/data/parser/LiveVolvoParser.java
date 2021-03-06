package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Function;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.LinkedList;
import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.transform;
import static java.util.Collections.emptyList;

public class LiveVolvoParser implements BParser {

  private final ChromeDriver webDriver;
  private final String       sportCode;
  private final Timer timerMetric;

  public LiveVolvoParser(ChromeDriver webDriver, String sportCode, MetricRegistry metricRegistry) {
    this.sportCode = sportCode;
    this.webDriver = webDriver;

    this.webDriver.get("http://www.bet365.com/lite/#!in-play/overview/");
    this.webDriver.manage().window().setSize(new Dimension(50, 50));
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  @Override
  public List<ParsedEvent> parse() {
    if (!isSportSelected()) {
      selectSport();
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

  private boolean isSportSelected() {
    List<WebElement> selectedSportButtons = webDriver.findElementsByCssSelector(
      "#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification." + sportCode + ".on");
    return 0 < selectedSportButtons.size();
  }

  private Document parseDocument() {
    this.webDriver.executeScript("$('#sbMCN div.FixtureList div.Fixture:not([fqlb])').each(function(){" +
                                 "this.setAttribute('fqlb', this.wrapper.stem.data.ID.split('_')[0]);" +
                                 "});");
    String html = webDriver.findElementByTagName("html").getAttribute("outerHTML");
    return Jsoup.parse(html);
  }

  private ParsedEvent parseEvent(Element eventEl) {
    String externalId = eventEl.attr("fqlb");
    if (null == externalId) return null;

    List<String> sides = selectElsTexts(eventEl, "div.RowContainer > div.Row > div.teams");
    if (2 > sides.size()) return null;

    List<String> kofs = selectElsTexts(eventEl, "div.OverviewMarket > div.Participant:not(.Suspended) > span.Odds");
    if (2 > kofs.size()) return null;

    String side1 = sides.get(0);
    if (null == side1) return null;

    String lowKof = kofs.get(0);
    if (null == lowKof) return null;
    if ("SP".equals(lowKof)) return null;

    String side2 = sides.get(1);
    if (null == side2) return null;

    String highKof = kofs.get(1);
    if (null == highKof) return null;
    if ("SP".equals(highKof)) return null;

    return new ParsedEvent(externalId, side1, side2, null, lowKof, highKof);
  }

  private List<ParsedEvent> parseEvents(Document doc) {
    List<ParsedEvent> events = new LinkedList<ParsedEvent>();

    Elements eventEls = doc.select("#sbMCN div.FixtureList div.Fixture");
    for (Element eventEl : eventEls) {

      ParsedEvent parsedEvent = parseEvent(eventEl);
      if (null == parsedEvent) continue;

      events.add(parsedEvent);
    }

    return events;
  }

  private String selectElText(Element parentEl, String cssSelector) {
    List<String> elsTexts = selectElsTexts(parentEl, cssSelector);

    if (elsTexts.isEmpty()) return null;

    return elsTexts.get(0);
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

  private void selectSport() {
    List<WebElement> sportButtons = webDriver.findElementsByCssSelector(
      "#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification." + sportCode);

    if (sportButtons.isEmpty()) return;

    sportButtons.get(0).click();
  }
}