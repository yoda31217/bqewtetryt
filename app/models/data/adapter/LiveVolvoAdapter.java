package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.parser.ParsedEvent;
import models.data.side.SideCoder;
import models.event.Sport;

import java.util.Date;
import java.util.Iterator;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.lang.Double.parseDouble;
import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.VOLLEYBALL;

public class LiveVolvoAdapter
  implements BAdapter {

  public static final Splitter KOF_SPLITTER = Splitter.on("/").omitEmptyStrings().trimResults();
  private final SideCoder sideCoder;

  public LiveVolvoAdapter(SideCoder sideCoder, Sport ignor) {
    this.sideCoder = sideCoder;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    Sport sport = adoptSport(parsedEvent.sportDescr);

    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

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

    String firstSideCode = sideCoder.buildCode(firstSide, sport);
    String secondSideCode = sideCoder.buildCode(secondSide, sport);

    AdaptedEvent adoptedEvent = new AdaptedEvent(LIVE, sport, firstSide, secondSide, firstKof, secondKof, VOLVO, new Date(), firstSideCode, secondSideCode);
    return adoptedEvent;
  }

  private double adaptKof(String kofStr) {
    Iterator<String> kofParts = KOF_SPLITTER.split(kofStr).iterator();
    return 1 + parseDouble(kofParts.next()) / parseDouble(kofParts.next());
  }

  private Sport adoptSport(String descr) {
    if (isNullOrEmpty(descr)) return UNKNOWN;

    if (descr.startsWith("Tennis")) return TENNIS;
    if (descr.startsWith("Table Tennis")) return TABLE_TENNIS;
    if (descr.startsWith("Volleyball")) return VOLLEYBALL;
    if (descr.startsWith("Basketball")) return BASKETBALL;

    return UNKNOWN;
  }
}