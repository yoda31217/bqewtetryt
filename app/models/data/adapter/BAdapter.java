package models.data.adapter;

import com.google.common.base.Splitter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.sport.SportAdapter;
import models.data.parser.ParsedEvent;
import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;
import org.joda.time.DateTime;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;

public class BAdapter {

  private final Splitter     coopSplitter;
  private final DateAdapter  dateAdapter;
  private final KofAdapter   kofAdapter;
  private final Organisation organisation;
  private final EventType    type;
  private final SportAdapter sportAdapter;

  public BAdapter(String coopSeparator, DateAdapter dateAdapter, KofAdapter kofAdapter, SportAdapter sportAdapter, EventType type, Organisation organisation) {
    this.sportAdapter = sportAdapter;
    coopSplitter = Splitter.on(coopSeparator).omitEmptyStrings().trimResults();
    this.kofAdapter = kofAdapter;
    this.organisation = organisation;
    this.dateAdapter = dateAdapter;
    this.type = type;
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

    DateTime eventDate = dateAdapter.adapt(parsedEvent.date);

    Sport sport = sportAdapter.adapt(parsedEvent.sport);

    return new AdaptedEvent(type, sport, side1, side2, lowKof, highKof, organisation, eventDate);
  }
}