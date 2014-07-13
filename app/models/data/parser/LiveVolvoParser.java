package models.data.parser;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.LinkedList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.util.Collections.emptyList;

public class LiveVolvoParser implements BParser {

  private final ChromeDriver webDriver;
  private final String       sportCode;

  public LiveVolvoParser(ChromeDriver webDriver, String sportCode) {
    this.sportCode = sportCode;
    this.webDriver = webDriver;

    this.webDriver.get("http://www.bet365.com/lite/#!in-play/overview/");
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  @Override
  public List<ParsedEvent> parse() {
    if (!isSportSelected()) {
      selectSport();
      return emptyList();
    }

    Document doc = parseDocument();
    return parseEvents(doc);
  }

  private boolean isSportSelected() {
    List<WebElement> selectedSportButtons = webDriver.findElementsByCssSelector(
      "#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification." + sportCode + ".on");
    return 0 < selectedSportButtons.size();
  }

  private Document parseDocument() {
    String html = webDriver.findElementByTagName("html").getAttribute("outerHTML");
    return Jsoup.parse(html);
  }

  private ParsedEvent parseEvent(Element eventEl) {
    String side1 = selectElText(eventEl, "div.RowContainer > div.Row:nth-child(1) > div.teams");
    if (null == side1) return null;

    String lowKof = selectElText(eventEl, "div.OverviewMarket > div.Participant:nth-child(1) > span.Odds");
    if (null == lowKof) return null;
    if ("SP".equals(lowKof)) return null;

    String side2 = selectElText(eventEl, "div.RowContainer > div.Row:nth-child(2) > div.teams");
    if (null == side2) return null;

    String highKof = selectElText(eventEl, "div.OverviewMarket > div.Participant:nth-child(2) > span.Odds");
    if (null == highKof) return null;
    if ("SP".equals(highKof)) return null;

    return new ParsedEvent(side1, side2, null, lowKof, highKof);
  }

  private List<ParsedEvent> parseEvents(Document doc) {
    List<ParsedEvent> events = new LinkedList<ParsedEvent>();

    Elements eventEls = doc.select("#sbMCN div.FixtureList.PC_2 > div.Fixture");
    for (Element eventEl : eventEls) {

      ParsedEvent parsedEvent = parseEvent(eventEl);
      if (null == parsedEvent) continue;

      events.add(parsedEvent);
    }

    return events;
  }

  private String selectElText(Element el, String cssSelector) {
    Elements els = el.select(cssSelector);
    if (els.isEmpty()) return null;

    String elText = els.get(0).text();
    if (isNullOrEmpty(elText)) return null;

    return elText;
  }

  private void selectSport() {
    List<WebElement> sportButtons = webDriver.findElementsByCssSelector(
      "#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification." + sportCode);

    if (sportButtons.isEmpty()) return;

    sportButtons.get(0).click();
  }
}