package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.parser.ParsedEvent;
import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class BAdapter {

  public final Splitter coopSplitter;
  private final DateAdapter  dateAdapter;
  private final KofAdapter   kofAdapter;
  private final Organisation organisation;
  private final Sport        sport;
  private final EventType    type;

  public BAdapter(String coopSeparator, DateAdapter dateAdapter, KofAdapter kofAdapter, EventType type, Organisation organisation, Sport sport) {
    coopSplitter = Splitter.on(coopSeparator).omitEmptyStrings().trimResults();
    this.kofAdapter = kofAdapter;
    this.organisation = organisation;
    this.dateAdapter = dateAdapter;
    this.type = type;
    this.sport = sport;
  }

  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    List<String> side1 = newArrayList(coopSplitter.split(parsedEvent.side1));
    List<String> side2 = newArrayList(coopSplitter.split(parsedEvent.side2));

    double lowKof = kofAdapter.adapt(parsedEvent.lowKof);
    double highKof = kofAdapter.adapt(parsedEvent.highKof);

    if (lowKof > highKof) {
      double swapKof = lowKof;
      lowKof = highKof;
      highKof = swapKof;

      List<String> swapSide = side1;
      side1 = side2;
      side2 = swapSide;
    }

    Date adaptedDate = dateAdapter.adapt(parsedEvent.date);

    return new AdaptedEvent(type, sport, side1, side2, lowKof, highKof, organisation, adaptedDate);
  }
}