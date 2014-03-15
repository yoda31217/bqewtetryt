package models.data.adapter.side;

import com.google.common.base.Splitter;

import java.util.ArrayList;

import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;

public class LanosSideCodeAdapter
  extends BaseSideCodeAdapter {

  private static final String TWO_PLAYERS_SEPARATOR = "/";
  private static final Splitter TWO_PLAYERS_SPLITTER = on(TWO_PLAYERS_SEPARATOR).omitEmptyStrings().trimResults();

  @Override
  protected String buildBasketballCode(String side) {
    side = removeDigit2(side);
    return removeJunior(side);
  }

  @Override
  protected String buildTennisCode(String side) {
    if (!side.contains(TWO_PLAYERS_SEPARATOR)) return getFirstWord(side);

    ArrayList<String> players = newArrayList(TWO_PLAYERS_SPLITTER.split(side));
    String playerCode1 = getLastWord(players.get(0));
    String playerCode2 = getLastWord(players.get(1));
    return joinPlayerCodes(playerCode1, playerCode2);
  }

}