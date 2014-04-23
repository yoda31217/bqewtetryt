package models.data.adapter.side;

import com.google.common.base.Splitter;

import java.util.List;
import java.util.regex.Pattern;

import static com.google.common.base.Splitter.on;
import static com.google.common.collect.Lists.newArrayList;

public class KamazNivaSideCodeAdapter extends BaseSideCodeAdapter {

  public static final Splitter PLAYER_PARTS_SPLITTER = on(Pattern.compile("[^a-z]+")).omitEmptyStrings().trimResults();
  public final String   coopSeparator;
  public final Splitter coopSplitter;

  public KamazNivaSideCodeAdapter(String coopSeparator) {
    this.coopSeparator = coopSeparator;
    coopSplitter = on(this.coopSeparator).omitEmptyStrings().trimResults();
  }

  @Override
  protected List<List<String>> buildBasketballCode(String side) { return buildSideCode(side); }

  @Override
  protected List<List<String>> buildTennisCode(String side) { return buildSideCode(side); }

  @Override
  protected List<List<String>> buildVolleyballCode(String side) {return buildSideCode(side); }

  private List<List<String>> buildSideCode(String side) {
    side = simplifyEng(side);

    List<String> players = newArrayList(coopSplitter.split(side));
    List<List<String>> sideCode = newArrayList();

    for (String player : players)
      sideCode.add(newArrayList(PLAYER_PARTS_SPLITTER.split(player)));

    return sideCode;
  }
}