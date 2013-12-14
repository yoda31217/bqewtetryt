package data.side;

import com.google.common.base.Splitter;
import models.store.Sport;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;
import static models.store.Sport.UNKNOWN;
import static org.apache.commons.lang3.StringUtils.stripAccents;

public class LanosSideCoder
  implements SideCoder {

  private static final Pattern LAST_WORD_PATTERN = Pattern.compile("^.*[^a-z]([a-z]+)$");
  private static final Pattern FIRST_WORD_PATTERN = Pattern.compile("^([a-z]+)[^a-z].*$");
  private static final String TWO_PLAYERS_SPLIT_STR = "/";
  private static final Splitter TWO_PLAYERS_SIDE_SPLITTER = on(TWO_PLAYERS_SPLIT_STR).omitEmptyStrings().trimResults();

  @Override
  public String buildCode(String side, Sport sport) {
    if (UNKNOWN.equals(sport)) return side;

    side = stripAccents(side);
    side = side.toLowerCase();

    if (!side.contains(TWO_PLAYERS_SPLIT_STR)) {
      return getFirstWordFromOnePlayerSide(side).toLowerCase();
    }

    ArrayList<String> playerSides = newArrayList(TWO_PLAYERS_SIDE_SPLITTER.split(side));
    return getLastWordFromOnePlayerSide(playerSides.get(0)) + "," + getLastWordFromOnePlayerSide(playerSides.get(1));
  }

  private String getFirstWordFromOnePlayerSide(String side) {
    return getFirstGroupFromSideByPattern(side, FIRST_WORD_PATTERN);
  }

  private String getLastWordFromOnePlayerSide(String side) {
    return getFirstGroupFromSideByPattern(side, LAST_WORD_PATTERN);
  }

  private String getFirstGroupFromSideByPattern(String side, Pattern pattern) {
    Matcher matcher = pattern.matcher(side);
    checkArgument(matcher.matches(), "Failed to build code for side: %s", side);

    return matcher.group(1);
  }
}