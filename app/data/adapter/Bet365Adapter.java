package data.adapter;

import com.google.common.base.Splitter;
import data.AdaptedEvent;
import data.parser.ParsedEvent;
import play.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;

import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.Calendar.YEAR;
import static java.util.TimeZone.getTimeZone;
import static models.store.Organisation.BET365;
import static org.apache.commons.lang3.StringUtils.stripAccents;
import static play.Logger.of;

public class Bet365Adapter
  implements BAdapter {

  private static final Logger.ALogger LOG = of(Bet365Adapter.class);

  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");
  private static final Splitter ONE_PLAYER_ON_SIDE_NAME_SPLITTER = on(" ").omitEmptyStrings().trimResults();
  private static final Splitter TWO_PLAYERS_ON_SIDE_NAME_SPLITTER = on("&").omitEmptyStrings().trimResults();

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    firstSide = stripAccents(firstSide);
    secondSide = stripAccents(secondSide);

    double firstKof = Double.parseDouble(parsedEvent.firstKof);
    double secondKof = Double.parseDouble(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapSide = firstSide;
      firstSide = secondSide;
      secondSide = swapSide;
    }

    Date date = adoptDate(parsedEvent.date);

    String firstSideCode = adoptSideCode(firstSide);
    String secondSideCode = adoptSideCode(secondSide);

    AdaptedEvent adoptedEvent = new AdaptedEvent(firstSide, secondSide, firstKof, secondKof, BET365, date, firstSideCode, secondSideCode);

    LOG.trace("Adapted Event with Code: {}", adoptedEvent.code);

    return adoptedEvent;
  }

  private String adoptSideCode(String sideStr) {
    if (!sideStr.contains("&")) {
      ArrayList<String> sideParts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(sideStr));
      return sideParts.get(sideParts.size() - 1).toLowerCase();
    }

    Iterator<String> sideParts = TWO_PLAYERS_ON_SIDE_NAME_SPLITTER.split(sideStr).iterator();
    String firstSidePart = sideParts.next();
    String secondSidePart = sideParts.next();

    ArrayList<String> firstSideParts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(firstSidePart));
    ArrayList<String> secondSideParts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(secondSidePart));

    return firstSideParts.get(firstSideParts.size() - 1).toLowerCase() + "," + secondSideParts.get(secondSideParts.size() - 1).toLowerCase();
  }

  private Date adoptDate(String dateStr) {
    String normalizedDateStr = Calendar.getInstance(getTimeZone("GMT")).get(YEAR) + " " + dateStr + " +0100";

    try {
      return LONG_DATE_FORMAT.parse(normalizedDateStr);

    } catch (ParseException e) {
      throw new RuntimeException("Cannot adopt Event Date string: " + dateStr, e);
    }
  }
}