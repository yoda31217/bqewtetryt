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

public class LiveLanosAdapter implements BAdapter {

  static final Splitter KOF_FRACTIONAL_SPLITTER = Splitter.on('/').omitEmptyStrings().trimResults();
  private final SideCodeAdapter sideCodeAdapter;

  public LiveLanosAdapter(SideCodeAdapter sideCodeAdapter) {
    this.sideCodeAdapter = sideCodeAdapter;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String side1 = parsedEvent.side1;
    String side2 = parsedEvent.side2;

    double lowKof = parseKof(parsedEvent.lowKof);
    double highKof = parseKof(parsedEvent.highKof);

    if (lowKof > highKof) {
      double swapKof = lowKof;
      lowKof = highKof;
      highKof = swapKof;

      String swapSide = side1;
      side1 = side2;
      side2 = swapSide;
    }

    Sport sport = adoptSport(parsedEvent.sportDescr);

    String side1Code = sideCodeAdapter.adapt(side1, sport);
    String secondSIdeCode = sideCodeAdapter.adapt(side2, sport);

    return new AdaptedEvent(LIVE, sport, side1, side2, lowKof, highKof, LANOS, null, side1Code, secondSIdeCode);
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