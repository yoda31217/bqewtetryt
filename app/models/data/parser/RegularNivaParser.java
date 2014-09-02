package models.data.parser;

import models.event.EventSport;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static models.event.EventSport.sportFromEngName;

public class RegularNivaParser implements BParser {

  private final String       url;
  private final ChromeDriver webDriver;
  private final EventSport   sport;

  public RegularNivaParser(String urlPart, ChromeDriver webDriver, EventSport sport) {
    this.sport = sport;
    this.url = "https://igra.msl.ua/sportliga/uk/sports/" + urlPart;
    this.webDriver = webDriver;

    this.webDriver.get(url);
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  @Override
  public List<ParsedEvent> parse() {
    refreshPage();
    return parseEvents();
  }

  private ParsedEvent parseEvent(Map eventObject) {
    try {
      String side1 = parseSide(eventObject, "homeCompetitors");
      String side2 = parseSide(eventObject, "awayCompetitors");

      String date = ((Map) eventObject.get("date")).get("sec").toString();

      //noinspection unchecked
      List<Map> kofs = (List<Map>) eventObject.get("winnerOdds");
      if (2 < kofs.size()) throw new IllegalArgumentException("Failed to parse kofs: " + kofs + ".");

      String lowKof = parseKof(kofs, "1");
      String highKof = parseKof(kofs, "2");

      if (null == lowKof || null == highKof) return null;

      return new ParsedEvent("", side1, side2, date, lowKof, highKof);

    } catch (Exception ex) {
      throw new IllegalArgumentException("Failed to parse event: " + eventObject + ".", ex);
    }
  }

  private List<ParsedEvent> parseEvents() {
    List<ParsedEvent> events = new LinkedList<ParsedEvent>();

    //noinspection unchecked
    List<Map> eventObjects = (List<Map>) webDriver.executeScript("return window.bootstrapData.events;");

    for (Map eventObject : eventObjects) {
      if (sport != parseSport(eventObject)) continue;

      ParsedEvent parsedEvent = parseEvent(eventObject);
      if (null == parsedEvent) continue;

      events.add(parsedEvent);
    }

    return events;
  }

  private String parseKof(List<Map> kofs, String index) {
    for (Map kof : kofs) {
      String outcomeName = ((Map) ((Map) kof.get("outcome")).get("name")).get("ru").toString();

      if (index.equals(outcomeName)) return kof.get("coefficient").toString();
    }
    return null;
  }

  private String parseSide(Map eventObject, String sideKey) {
    //noinspection unchecked
    List<Map> sidePlayers = (List<Map>) eventObject.get(sideKey);
    if (2 < sidePlayers.size()) throw new IllegalArgumentException("Failed to parse side: " + sidePlayers + ".");

    if (2 == sidePlayers.size()) {
      String sidePlayer1 = ((Map) sidePlayers.get(0).get("name")).get("ru").toString();
      String sidePlayer2 = ((Map) sidePlayers.get(1).get("name")).get("ru").toString();
      return sidePlayer1 + "|" + sidePlayer2;
    }

    return ((Map) sidePlayers.get(0).get("name")).get("ru").toString();
  }

  private EventSport parseSport(Map eventObject) {
    String engSportName = ((Map) eventObject.get("sport")).get("alias").toString();
    return sportFromEngName(engSportName);
  }

  private void refreshPage() {
    webDriver.get(url);

    try {
      Thread.sleep(3000L);

    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
  }
}


