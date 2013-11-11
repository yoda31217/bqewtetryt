package data.adapter;

import data.parser.ParsedEvent;

import java.util.Date;

import static models.store.EventType.LIVE;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;
import static org.apache.commons.lang3.StringUtils.stripAccents;

public class LiveVolvoAdapter
  implements BAdapter {

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    firstSide = stripAccents(firstSide);
    secondSide = stripAccents(secondSide);

    double firstKof = Double.parseDouble(parsedEvent.firstKof);
    double secondKof = Double.parseDouble(parsedEvent.secondKof);

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

  private String adoptSideCode(String sideStr) {
    return sideStr;
  }
}