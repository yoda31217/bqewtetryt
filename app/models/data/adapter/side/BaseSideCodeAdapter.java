package models.data.adapter.side;

import models.event.Sport;
import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkArgument;

public abstract class BaseSideCodeAdapter implements SideCodeAdapter {

  private static final Pattern LAST_WORD_PATTERN  = Pattern.compile("^(.*[^a-z])?([a-z]+)[^a-z]*$");
  private static final Pattern FIRST_WORD_PATTERN = Pattern.compile("^[^a-z]*([a-z]+).*$");

  @Override
  public String adapt(String side, Sport sport) {
    side = normalize(side);
    side = buildBySport(side, sport);
    return stripSpaces(side);
  }

  public String normalize(String side) {
    side = stripUpperCase(side);
    side = stripAccents(side);
    side = transliterate(side);
    side = stripHyphens(side);
    side = stripSpaces(side);
    return side;
  }

  protected abstract String buildBasketballCode(String side);

  protected abstract String buildTennisCode(String side);

  protected String getFirstWord(String side) { return getByPattern(side, FIRST_WORD_PATTERN, "last word", 1); }

  protected String getLastWord(String side) { return getByPattern(side, LAST_WORD_PATTERN, "last word", 2); }

  protected String joinPlayerCodes(String playerCode1, String playerCode2) {return playerCode1 + "," + playerCode2;}

  protected String removeDigit2(String side) { return side.replaceAll("\\s2", " "); }

  protected String removeWomen(String side) { return side.replaceAll("\\swomen", " "); }

  protected String stripAccents(String side) {return StringUtils.stripAccents(side);}

  protected String stripHyphens(String side) { return side.replace('-', ' '); }

  protected String stripSpaces(String side) { return side.trim().replaceAll("\\s+", " "); }

  protected String stripUpperCase(String side) {return side.toLowerCase();}

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

  private String getByPattern(String side, Pattern pattern, final String patternName, int groupNumber) {
    Matcher matcher = pattern.matcher(side);
    checkArgument(matcher.matches(), "Failed to get %s from side: [%s]", patternName, side);
    return matcher.group(groupNumber);
  }

  private String transliterate(String side) {

    StringBuilder transliteratedSide = new StringBuilder(side.length());

    for (int i = 0; i < side.length(); i++) {
      char c = side.charAt(i);

      switch (c) {
        case 'а':
          transliteratedSide.append('a');
          break;
        case 'б':
          transliteratedSide.append('b');
          break;
        case 'в':
          transliteratedSide.append('v');
          break;
        case 'г':
          transliteratedSide.append('g');
          break;
        case 'д':
          transliteratedSide.append('d');
          break;
        case 'е':
          transliteratedSide.append('e');
          break;
        case 'ё':
          transliteratedSide.append('e');
          break;
        case 'ж':
          transliteratedSide.append('g');
          break;
        case 'з':
          transliteratedSide.append('z');
          break;
        case 'и':
          transliteratedSide.append('i');
          break;
        case 'й':
          transliteratedSide.append('y');
          break;
        case 'к':
          transliteratedSide.append('k');
          break;
        case 'л':
          transliteratedSide.append('l');
          break;
        case 'м':
          transliteratedSide.append('m');
          break;
        case 'н':
          transliteratedSide.append('n');
          break;
        case 'о':
          transliteratedSide.append('o');
          break;
        case 'п':
          transliteratedSide.append('p');
          break;
        case 'р':
          transliteratedSide.append('r');
          break;
        case 'с':
          transliteratedSide.append('s');
          break;
        case 'т':
          transliteratedSide.append('t');
          break;
        case 'у':
          transliteratedSide.append('u');
          break;
        case 'ф':
          transliteratedSide.append('f');
          break;
        case 'х':
          transliteratedSide.append('h');
          break;
        case 'ц':
          transliteratedSide.append('c');
          break;
        case 'ч':
          transliteratedSide.append("ch");
          break;
        case 'ш':
          transliteratedSide.append("sh");
          break;
        case 'щ':
          transliteratedSide.append("sch");
          break;
        case 'ь':
          break;
        case 'ы':
          transliteratedSide.append('y');
          break;
        case 'ъ':
          break;
        case 'э':
          transliteratedSide.append('e');
          break;
        case 'ю':
          transliteratedSide.append("yu");
          break;
        case 'я':
          transliteratedSide.append("ya");
          break;
        default:
          transliteratedSide.append(c);
          break;
      }
    }

    return transliteratedSide.toString();
  }
}