package data.adapter;

import com.google.common.base.Splitter;
import data.AdaptedEvent;
import data.parser.ParsedEvent;
import models.store.Player;

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
import static models.store.Organisation.MARATHON;

public class MarathonAdapter
  implements BAdapter {

  private static final Splitter PLAYER_NAME_SPLITTER = on(anyOf(",/")).omitEmptyStrings().trimResults();
  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    Player firstPlayer = adoptPlayer(parsedEvent.firstPlayer);
    Player secondPlayer = adoptPlayer(parsedEvent.secondPlayer);
    double firstKof = Double.parseDouble(parsedEvent.firstKof);
    double secondKof = Double.parseDouble(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      Player swapPlayer = firstPlayer;
      firstPlayer = secondPlayer;
      secondPlayer = swapPlayer;
    }

    Date date = adoptDate(parsedEvent.date);

    return new AdaptedEvent(firstPlayer, secondPlayer, firstKof, secondKof, MARATHON, date);
  }

  private Player adoptPlayer(String playerStr) {
    Iterator<String> playerNames = PLAYER_NAME_SPLITTER.split(playerStr).iterator();
    String firstName = playerNames.next();
    String secondName = playerNames.next();
    return new Player(firstName, secondName);
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