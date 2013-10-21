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

import static com.google.common.base.Splitter.on;
import static java.util.Calendar.YEAR;
import static java.util.TimeZone.getTimeZone;
import static models.store.Organisation.BET365;

public class Bet365Adapter
  implements BAdapter {

  private static final Splitter ONE_PLAYER_NAME_SPLITTER = on(" ").omitEmptyStrings().trimResults();
  private static final Splitter TWO_PLAYER_NAME_SPLITTER = on("&").omitEmptyStrings().trimResults();
  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    Player firstPlayer = adoptPlayer(parsedEvent.firstPlayer);
    Player secondPlayer = adoptPlayer(parsedEvent.secondPlayer);
    double firstKof = Double.parseDouble(parsedEvent.firstKof);
    double secondKof = Double.parseDouble(parsedEvent.secondKof);

    Date date = adoptDate(parsedEvent.date);

    return new AdaptedEvent(firstPlayer, secondPlayer, firstKof, secondKof, BET365, date);
  }

  private Player adoptPlayer(String playerStr) {
    Splitter nameSplitter = playerStr.contains("&") ? TWO_PLAYER_NAME_SPLITTER : ONE_PLAYER_NAME_SPLITTER;

    Iterator<String> playerNames = nameSplitter.split(playerStr).iterator();
    String firstName = playerNames.next();
    String secondName = playerNames.next();
    return new Player(firstName, secondName);
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