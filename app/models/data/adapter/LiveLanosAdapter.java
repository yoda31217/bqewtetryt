package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.ParsedEvent;
import models.event.Sport;

import java.util.Iterator;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.lang.Double.parseDouble;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.VOLLEYBALL;

public class LiveLanosAdapter
  implements BAdapter {

  static final Splitter KOF_FRACTIONAL_SPLITTER = Splitter.on('/').omitEmptyStrings().trimResults();
  private final SideCodeAdapter sideCodeAdapter;

  public LiveLanosAdapter(SideCodeAdapter sideCodeAdapter) {
    this.sideCodeAdapter = sideCodeAdapter;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    double firstKof = parseKof(parsedEvent.firstKof);
    double secondKof = parseKof(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapSide = firstSide;
      firstSide = secondSide;
      secondSide = swapSide;
    }

    Sport sport = adoptSport(parsedEvent.sportDescr);

    String firstSideCode = sideCodeAdapter.adapt(firstSide, sport);
    String secondSIdeCode = sideCodeAdapter.adapt(secondSide, sport);

    return new AdaptedEvent(LIVE, sport, firstSide, secondSide, firstKof, secondKof, LANOS, null, firstSideCode, secondSIdeCode);
  }

  private double parseKof(String kof) {
    Iterator<String> kofParts = KOF_FRACTIONAL_SPLITTER.split(kof).iterator();
    return 1 + (parseDouble(kofParts.next()) / parseDouble(kofParts.next()));
  }

  private Sport adoptSport(String descr) {
    if (isNullOrEmpty(descr)) return UNKNOWN;

    if (descr.startsWith("Tennis.")) return TENNIS;
    if (descr.startsWith("Table Tennis.")) return TABLE_TENNIS;
    if (descr.startsWith("Volleyball.")) return VOLLEYBALL;
    if (descr.startsWith("Basketball.")) return BASKETBALL;

    return UNKNOWN;
  }
}