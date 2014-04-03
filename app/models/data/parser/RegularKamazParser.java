package models.data.parser;

import com.google.common.base.Function;
import com.google.common.base.Joiner;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.LinkedList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Lists.transform;

public class RegularKamazParser implements BParser {

  public static final Joiner TOURNAMENT_IDS_URL_PART_JOINER = Joiner.on(",").skipNulls();
  private final ChromeDriver webDriver;
  private final String       baseUrl;
  private String sportStyleName;

  public RegularKamazParser(String url, ChromeDriver webDriver, String sportStyleName) {
    this.sportStyleName = sportStyleName;
    this.webDriver = webDriver;
    baseUrl = url;

    this.webDriver.get(baseUrl);
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  @Override
  public List<ParsedEvent> parse() {
    Document doc = parseDocument();
    refreshPage(doc);

    doc = parseDocument();
    return parseEvents(doc);
  }

  private Document parseDocument() {
    String html = webDriver.findElementByTagName("html").getAttribute("outerHTML");
    return Jsoup.parse(html);
  }

  private ParsedEvent parseEvent(Element eventEl) {
    String date = selectElText(eventEl, "li.col1");
    if (null == date) return null;

    String side1 = selectElText(eventEl, "li.col21 > ul > li.bets_fullmark_body.m_1 > label > span");
    if (null == side1) return null;

    String lowKof = selectElText(eventEl, "li.col21 > ul > li.bets_fullmark_body.m_1 > label > button");
    if (null == lowKof) return null;

    String side2 = selectElText(eventEl, "li.col21 > ul > li.bets_fullmark_body.m_2 > label > span");
    if (null == side2) return null;

    String highKof = selectElText(eventEl, "li.col21 > ul > li.bets_fullmark_body.m_2 > label > button");
    if (null == highKof) return null;

    return new ParsedEvent(side1, side2, date, lowKof, highKof);
  }

  private List<ParsedEvent> parseEvents(Document doc) {
    List<ParsedEvent> events = new LinkedList<ParsedEvent>();
    Elements eventEls = doc.select("#selevents > div.sel_evs > div.betlist > ul.sel-itm > li > ul.mrk-head");

    for (Element eventEl : eventEls) {
      ParsedEvent parsedEvent = parseEvent(eventEl);
      if (null == parsedEvent) continue;

      events.add(parsedEvent);
    }
    return events;
  }

  private void refreshPage(Document doc) {
    String url = baseUrl;

    Elements tournamentEls = doc.select(
      "#sideLeft > div.menu_sport > div.ms_body > ul.sportslist > li.sprt:has(a." + sportStyleName + ") > ul > li.cntr > ul > li.trnm");

    if (!tournamentEls.isEmpty()) {
      List<String> tournamentIds = transformTournamentElsToIds(tournamentEls);
      url += "#tour=" + TOURNAMENT_IDS_URL_PART_JOINER.join(tournamentIds);

    }

    webDriver.get(url);

    try {
      Thread.sleep(3000L);

    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
  }

  private String selectElText(Element el, String cssSelector) {
    Elements els = el.select(cssSelector);
    if (els.isEmpty()) return null;

    String elText = els.get(0).text();
    if (isNullOrEmpty(elText)) return null;

    return elText;
  }

  private List<String> transformTournamentElsToIds(Elements tournamentEls) {
    return transform(tournamentEls, new Function<Element, String>() {
      @Override
      public String apply(Element tournamentEl) {
        return tournamentEl.attr("data-tournament");
      }
    });
  }

}


