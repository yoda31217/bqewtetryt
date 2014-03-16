package models.data.adapter.side;

import com.google.common.base.Splitter;

import java.util.ArrayList;

import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;

public class VolvoSideCodeAdapter extends BaseSideCodeAdapter {

  private final String   coopSeparator;
  private final Splitter coopSplitter;

  public VolvoSideCodeAdapter(String coopSeparator) {
    this.coopSeparator = coopSeparator;
    coopSplitter = on(coopSeparator).omitEmptyStrings().trimResults();
  }

  @Override
  protected String buildBasketballCode(String side) {
    side = removeDigit2(side);
    return removeWomen(side);
  }

  @Override
  protected String buildTennisCode(String side) {
    if (!side.contains(coopSeparator)) return getLastWord(side);

    ArrayList<String> players = newArrayList(coopSplitter.split(side));
    String playerCode1 = getLastWord(players.get(0));
    String playerCode2 = getLastWord(players.get(1));
    return joinPlayerCodes(playerCode1, playerCode2);
  }

}