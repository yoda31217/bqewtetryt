package data.adapter;

import com.google.common.base.Splitter;
import data.parser.ParsedEvent;
import data.side.SideCoder;
import models.store.Sport;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.lang.Double.parseDouble;
import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.SECOND;
import static java.util.TimeZone.getTimeZone;
import static models.store.EventType.LIVE;
import static models.store.Organisation.LANOS;
import static models.store.Sport.TENNIS;
import static models.store.Sport.UNKNOWN;
import static models.store.Sport.VOLLEYBALL;

public class LiveLanosAdapter
  implements BAdapter {

  static final Splitter KOF_FRACTIONAL_SPLITTER = Splitter.on('/').omitEmptyStrings().trimResults();
  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");
  private final SideCoder sideCoder;

  public LiveLanosAdapter(SideCoder sideCoder) {
    this.sideCoder = sideCoder;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    double firstKof = parseKof(parsedEvent.firstKof);
    double secondKof = parseKof(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapSide = firstSide;
      firstSide = secondSide;
      secondSide = swapSide;
    }

    Date date = adoptDate(parsedEvent.date);

    Sport sport = adoptSport(parsedEvent.sportDescr);

    String firstSideCode = sideCoder.buildCode(firstSide, sport);
    String secondSIdeCode = sideCoder.buildCode(secondSide, sport);

    AdaptedEvent adoptedEvent = new AdaptedEvent(LIVE, sport, firstSide, secondSide, firstKof, secondKof, LANOS, date, firstSideCode, secondSIdeCode);

    return adoptedEvent;
  }

  private double parseKof(String kof) {
    if (!kof.contains("/")) return parseDouble(kof);
    else {
      Iterator<String> kofParts = KOF_FRACTIONAL_SPLITTER.split(kof).iterator();
      return 1 + (parseDouble(kofParts.next()) / parseDouble(kofParts.next()));
    }

  }

  private Sport adoptSport(String descr) {
    if (isNullOrEmpty(descr)) return UNKNOWN;

    if (descr.startsWith("Tennis. ")) return TENNIS;
    if (descr.startsWith("Volleyball. ")) return VOLLEYBALL;

    return UNKNOWN;
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
    String normalizedDateStr = Calendar.getInstance(getTimeZone("GMT")).get(Calendar.YEAR) + " " + date + " +0100";

    try {
      return LONG_DATE_FORMAT.parse(normalizedDateStr);

    } catch (ParseException e) {
      throw new RuntimeException("Cannot adopt Event Date string: " + date, e);
    }
  }
}