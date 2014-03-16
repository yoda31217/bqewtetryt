package models.data.adapter.side;

import models.event.Sport;
import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkArgument;

public abstract class BaseSideCodeAdapter implements SideCodeAdapter {

  private static final Pattern LAST_WORD_PATTERN  = Pattern.compile("^(.*[^a-z])?([a-z]+)$");
  private static final Pattern FIRST_WORD_PATTERN = Pattern.compile("^([a-z]+)[^a-z].*$");

  public String normalize(String side) {
    side = stripUpperCase(side);
    side = stripAccents(side);
    side = stripHyphens(side);
    side = stripSpaces(side);
    return side;
  }

  protected String stripUpperCase(String side) {return side.toLowerCase();}

  protected String stripAccents(String side) {return StringUtils.stripAccents(side);}

  protected String removeWomen(String side) { return side.replaceAll("\\swomen", " "); }

  protected String removeDigit2(String side) { return side.replaceAll("\\s2", " "); }

  protected String stripSpaces(String side) { return side.trim().replaceAll("\\s+", " "); }

  protected String stripHyphens(String side) { return side.replace('-', ' '); }

  protected String removeJunior(String side) { return side.replaceAll("\\sjunior", " "); }

  protected String getLastWord(String side) { return getByPattern(side, LAST_WORD_PATTERN, "last word", 2); }

  protected String getFirstWord(String side) { return getByPattern(side, FIRST_WORD_PATTERN, "first word", 1); }

  private String getByPattern(String side, Pattern pattern, final String patternName, int groupNumber) {
    Matcher matcher = pattern.matcher(side);
    checkArgument(matcher.matches(), "Failed to get %s from side: [%s]", patternName, side);
    return matcher.group(groupNumber);
  }

  @Override
  public String adapt(String side, Sport sport) {
    side = normalize(side);
    side = buildBySport(side, sport);
    return stripSpaces(side);
  }

  private String buildBySport(String side, Sport sport) {
    switch (sport) {

      case BASKETBALL:
        return buildBasketballCode(side);

      case TENNIS:
      case TABLE_TENNIS:
        return buildTennisCode(side);

      default:
        return side;
    }
  }

  protected abstract String buildBasketballCode(String side);

  protected abstract String buildTennisCode(String side);

  protected String joinPlayerCodes(String playerCode1, String playerCode2) {return playerCode1 + "," + playerCode2;}
}