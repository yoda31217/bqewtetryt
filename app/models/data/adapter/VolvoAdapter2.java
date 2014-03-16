package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.ParsedEvent;
import models.event.EventType;
import models.event.Sport;

import java.util.Date;
import java.util.Iterator;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.lang.Double.parseDouble;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.VOLLEYBALL;

public class VolvoAdapter2 implements BAdapter {

  public static final Splitter KOF_SPLITTER = Splitter.on("/").omitEmptyStrings().trimResults();
  private final SideCodeAdapter sideCodeAdapter;
  private final DateAdapter     dateAdapter;
  private       EventType       type;

  public VolvoAdapter2(SideCodeAdapter sideCodeAdapter, DateAdapter dateAdapter, EventType type) {
    this.sideCodeAdapter = sideCodeAdapter;
    this.dateAdapter = dateAdapter;
    this.type = type;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    Sport sport = adoptSport(parsedEvent.sportDescr);

    String side1 = parsedEvent.side1;
    String side2 = parsedEvent.side2;

    double lowKof = adaptKof(parsedEvent.lowKof);
    double highKof = adaptKof(parsedEvent.highKof);

    if (lowKof > highKof) {
      double swapKof = lowKof;
      lowKof = highKof;
      highKof = swapKof;

      String swapSide = side1;
      side1 = side2;
      side2 = swapSide;
    }

    String side1Code = sideCodeAdapter.adapt(side1, sport);
    String side2Code = sideCodeAdapter.adapt(side2, sport);

    Date adaptedDate = dateAdapter.adapt(parsedEvent.date);

    return new AdaptedEvent(type, sport, side1, side2, lowKof, highKof, VOLVO, adaptedDate, side1Code, side2Code);
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