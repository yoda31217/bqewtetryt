package data.adapter;

import com.google.common.base.Splitter;
import data.AdaptedEvent;
import data.parser.ParsedEvent;

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

public class Bet365Adapter
  implements BAdapter {

  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");
  private static final Splitter ONE_PLAYER_NAME_SPLITTER = on(" ").omitEmptyStrings().trimResults();
  private static final Splitter TWO_PLAYERS_NAME_SPLITTER = on("&").omitEmptyStrings().trimResults();

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstPlayer = parsedEvent.firstPlayer;
    String secondPlayer = parsedEvent.secondPlayer;
    double firstKof = Double.parseDouble(parsedEvent.firstKof);
    double secondKof = Double.parseDouble(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapPlayer = firstPlayer;
      firstPlayer = secondPlayer;
      secondPlayer = swapPlayer;
    }

    Date date = adoptDate(parsedEvent.date);

    String firstPlayerCode = adoptPlayerCode(firstPlayer);
    String secondPlayerCode = adoptPlayerCode(secondPlayer);

    return new AdaptedEvent(firstPlayer, secondPlayer, firstKof, secondKof, BET365, date, firstPlayerCode, secondPlayerCode);
  }

  private String adoptPlayerCode(String playerStr) {
    if (!playerStr.contains("&")) {
      ArrayList<String> playerParts = newArrayList(ONE_PLAYER_NAME_SPLITTER.split(playerStr));
      return playerParts.get(playerParts.size() - 1).toLowerCase();
    }

    Iterator<String> playerParts = TWO_PLAYERS_NAME_SPLITTER.split(playerStr).iterator();
    String firstPlayerPart = playerParts.next();
    String secondPlayerPart = playerParts.next();

    ArrayList<String> firstPlayerParts = newArrayList(ONE_PLAYER_NAME_SPLITTER.split(firstPlayerPart));
    ArrayList<String> secondPlayerParts = newArrayList(ONE_PLAYER_NAME_SPLITTER.split(secondPlayerPart));

    return firstPlayerParts.get(firstPlayerParts.size() - 1).toLowerCase() + "," + secondPlayerParts.get(secondPlayerParts.size() - 1).toLowerCase();
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