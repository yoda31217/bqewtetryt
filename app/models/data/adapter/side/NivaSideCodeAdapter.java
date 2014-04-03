package models.data.adapter.side;

import com.google.common.base.Splitter;

import java.util.ArrayList;

import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;

public class NivaSideCodeAdapter extends BaseSideCodeAdapter {

  public static final String   COOP_SEPARATOR = "|";
  public static final Splitter COOP_SPLITTER  = on(COOP_SEPARATOR).omitEmptyStrings().trimResults();

  @Override
  protected String buildBasketballCode(String side) {
    return side;
  }

  @Override
  protected String buildTennisCode(String side) {
    side = simplifyEng(side);

    if (!side.contains(COOP_SEPARATOR)) {

      if (side.contains(",")) {
        String[] sideParts = side.split(",");
        side = sideParts[1] + " " + sideParts[0];
      }

      return getLastWord(side);
    }

    ArrayList<String> players = newArrayList(COOP_SPLITTER.split(side));
    String playerCode1 = getFirstWord(players.get(0));
    String playerCode2 = getFirstWord(players.get(1));

    if (0 > playerCode2.compareTo(playerCode1)) {
      String temp = playerCode1;
      playerCode1 = playerCode2;
      playerCode2 = temp;
    }

    return joinPlayerCodes(playerCode1, playerCode2);
  }

}