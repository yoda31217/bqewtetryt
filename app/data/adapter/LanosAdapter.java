package data.adapter;

import com.google.common.base.Splitter;
import data.AdaptedEvent;
import data.parser.ParsedEvent;
import play.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;

import static com.google.common.base.CharMatcher.anyOf;
import static com.google.common.base.Splitter.on;
import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.SECOND;
import static java.util.Calendar.YEAR;
import static java.util.TimeZone.getTimeZone;
import static models.store.EventType.REGULAR;
import static models.store.Organisation.LANOS;
import static models.store.Sport.TENNIS;
import static org.apache.commons.lang3.StringUtils.stripAccents;
import static play.Logger.of;

public class LanosAdapter
  implements BAdapter {

  private static final Logger.ALogger LOG = of(LanosAdapter.class);
  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");
  private static final Splitter ONE_PLAYER_ON_SIDE_NAME_SPLITTER = on(",").omitEmptyStrings().trimResults();
  private static final Splitter TWO_PLAYERS_ON_SIDE_NAME_SPLITTER = on(anyOf("./")).omitEmptyStrings().trimResults();

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
    String secondSIdeCode = adoptSideCode(secondSide);

    AdaptedEvent adoptedEvent = new AdaptedEvent(REGULAR, TENNIS, firstSide, secondSide, firstKof, secondKof, LANOS, date, firstSideCode, secondSIdeCode);

    LOG.trace("Adapted Event with Code: {}", adoptedEvent.code);

    return adoptedEvent;
  }

  private String adoptSideCode(String sideStr) {
    if (!sideStr.contains("/")) return ONE_PLAYER_ON_SIDE_NAME_SPLITTER.split(sideStr).iterator().next().toLowerCase();

    Iterator<String> sideParts = TWO_PLAYERS_ON_SIDE_NAME_SPLITTER.split(sideStr).iterator();

    sideParts.next();
    String code = sideParts.next().toLowerCase();
    sideParts.next();
    code += "," + sideParts.next().toLowerCase();

    return code;
  }

  private Date adoptDate(String date) {
    return 5 >= date.length() ? adoptShortDate(date) : adaptLongDate(date);
  }

  private Date adoptShortDate(String date) {
    String[] shortDateParts = date.split(":");
    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, Integer.parseInt(shortDateParts[0]));
    calendar.set(MINUTE, Integer.parseInt(shortDateParts[1]));
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);
    return calendar.getTime();
  }

  private Date adaptLongDate(String date) {
    String normalizedDateStr = Calendar.getInstance(getTimeZone("GMT")).get(YEAR) + " " + date + " +0100";

    try {
      return LONG_DATE_FORMAT.parse(normalizedDateStr);

    } catch (ParseException e) {
      throw new RuntimeException("Cannot adopt Event Date string: " + date, e);
    }
  }
}