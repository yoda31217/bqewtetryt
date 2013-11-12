package data.adapter;

import com.google.common.base.Splitter;
import data.parser.ParsedEvent;

import java.util.Date;
import java.util.Iterator;

import static java.lang.Double.parseDouble;
import static models.store.EventType.LIVE;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;
import static org.apache.commons.lang3.StringUtils.stripAccents;

public class LiveVolvoAdapter
  implements BAdapter {

  public static final Splitter KOF_SPLITTER = Splitter.on("/").omitEmptyStrings().trimResults();

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    firstSide = stripAccents(firstSide);
    secondSide = stripAccents(secondSide);

    double firstKof = adaptKof(parsedEvent.firstKof);
    double secondKof = adaptKof(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapSide = firstSide;
      firstSide = secondSide;
      secondSide = swapSide;
    }

    String firstSideCode = adoptSideCode(firstSide);
    String secondSideCode = adoptSideCode(secondSide);

    AdaptedEvent adoptedEvent = new AdaptedEvent(LIVE, TENNIS, firstSide, secondSide, firstKof, secondKof, VOLVO, new Date(), firstSideCode, secondSideCode);
    return adoptedEvent;
  }

  private double adaptKof(String kofStr) {
    Iterator<String> kofParts = KOF_SPLITTER.split(kofStr).iterator();
    return parseDouble(kofParts.next()) / parseDouble(kofParts.next());
  }

  private String adoptSideCode(String sideStr) {
    return sideStr;
  }
}