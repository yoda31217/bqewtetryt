package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.parser.ParsedEvent;
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
import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static org.apache.commons.lang3.StringUtils.stripAccents;
import static play.Logger.of;

public class VolvoAdapter
  implements BAdapter {

  private static final Logger.ALogger LOG = of(VolvoAdapter.class);

  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");
  private static final Splitter ONE_PLAYER_ON_SIDE_NAME_SPLITTER = on(" ").omitEmptyStrings().trimResults();
  private static final Splitter TWO_PLAYERS_ON_SIDE_NAME_SPLITTER = on("&").omitEmptyStrings().trimResults();

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String side1 = parsedEvent.side1;
    String side2 = parsedEvent.side2;

    side1 = stripAccents(side1);
    side2 = stripAccents(side2);

    double lowKof = Double.parseDouble(parsedEvent.lowKof);
    double highKof = Double.parseDouble(parsedEvent.highKof);

    if (lowKof > highKof) {
      double swapKof = lowKof;
      lowKof = highKof;
      highKof = swapKof;

      String swapSide = side1;
      side1 = side2;
      side2 = swapSide;
    }

    Date date = adoptDate(parsedEvent.date);

    String side1Code = adoptSideCode(side1);
    String side2Code = adoptSideCode(side2);

    AdaptedEvent adoptedEvent = new AdaptedEvent(REGULAR, TENNIS, side1, side2, lowKof, highKof, VOLVO, date, side1Code, side2Code);

    LOG.trace("Adapted Event with Code: {}", adoptedEvent.code);

    return adoptedEvent;
  }

  private String adoptSideCode(String sideStr) {
    if (!sideStr.contains("&")) {
      ArrayList<String> sideParts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(sideStr));
      return sideParts.get(sideParts.size() - 1).toLowerCase();
    }

    Iterator<String> sideParts = TWO_PLAYERS_ON_SIDE_NAME_SPLITTER.split(sideStr).iterator();
    String side1Part = sideParts.next();
    String side2Part = sideParts.next();

    ArrayList<String> side1Parts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(side1Part));
    ArrayList<String> side2Parts = newArrayList(ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(side2Part));

    return side1Parts.get(side1Parts.size() - 1).toLowerCase() + "," + side2Parts.get(side2Parts.size() - 1).toLowerCase();
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