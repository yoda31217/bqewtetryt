package models.data.adapter.side;

import models.event.Sport;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public abstract class BaseSideCodeAdapter implements SideCodeAdapter {

  @Override
  public List<List<String>> adapt(String side, Sport sport) {
    side = normalize(side);
    return buildBySport(side, sport);
  }

  public String normalize(String side) {
    side = stripUpperCase(side);
    side = stripAccents(side);
    side = transliterate(side);
    return side;
  }

  protected abstract List<List<String>> buildBasketballCode(String side);

  protected abstract List<List<String>> buildTennisCode(String side);

  protected abstract List<List<String>> buildVolleyballCode(String side);

  protected String simplifyEng(String side) {
    return side.replace("sch", "s").replace("sh", "s").replace('c', 's').replaceAll("([a-z])\\1", "$1");
  }

  protected String stripAccents(String side) {return StringUtils.stripAccents(side);}

  protected String stripUpperCase(String side) {return side.toLowerCase();}

  private List<List<String>> buildBySport(String side, Sport sport) {
    switch (sport) {

      case VOLLEYBALL:
        return buildVolleyballCode(side);

      case BASKETBALL:
        return buildBasketballCode(side);

      case TENNIS:
        return buildTennisCode(side);

      default:
        List<List<String>> sideCode = newArrayList();
        sideCode.add(newArrayList(side));
        return sideCode;
    }
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
          transliteratedSide.append('j');
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