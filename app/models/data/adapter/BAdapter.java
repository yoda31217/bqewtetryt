package models.data.adapter;

import models.data.adapter.date.DateAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.parser.ParsedEvent;
import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;

public class BAdapter {

  private final DateAdapter  dateAdapter;
  private final KofAdapter   kofAdapter;
  private final Organisation organisation;
  private final Sport        sport;
  private final EventType    type;

  public BAdapter(DateAdapter dateAdapter, KofAdapter kofAdapter, EventType type, Organisation organisation, Sport sport) {
    this.kofAdapter = kofAdapter;
    this.organisation = organisation;
    this.dateAdapter = dateAdapter;
    this.type = type;
    this.sport = sport;
  }

  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String side1 = parsedEvent.side1;
    String side2 = parsedEvent.side2;

    double lowKof = kofAdapter.adapt(parsedEvent.lowKof);
    double highKof = kofAdapter.adapt(parsedEvent.highKof);

    if (lowKof > highKof) {
      double swapKof = lowKof;
      lowKof = highKof;
      highKof = swapKof;

      String swapSide = side1;
      side1 = side2;
      side2 = swapSide;
    }

    Date adaptedDate = dateAdapter.adapt(parsedEvent.date);

    return new AdaptedEvent(type, sport, side1, side2, lowKof, highKof, organisation, adaptedDate);
  }
}