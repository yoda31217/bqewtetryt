package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import play.Logger;

import java.util.List;

import static play.Logger.of;

public class EventJob implements Runnable {

  Logger.ALogger log;
  private final BAdapter   adapter;
  private final BParser    parser;
  private final EventStore eventStore;
  private final Predicate<AdaptedEvent> filter;

  public EventJob(EventStore eventStore, BParser parser, BAdapter adapter, Predicate<AdaptedEvent> filter, String name) {
    this.eventStore = eventStore;
    this.parser = parser;
    this.adapter = adapter;
    this.filter = filter;
    log = of(EventJob.class.getName() + "." + name);
  }

  @Override
  public void run() {
    List<ParsedEvent> parsedEvents = parser.parse();
    for (ParsedEvent parsedEvent : parsedEvents) {

      try {
        AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

        if (!filter.apply(adaptedEvent)) continue;

        Event event = eventStore.createOrGetEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.side1, adaptedEvent.side2,
                                                  adaptedEvent.code);
        event.addHistory(new HistoryRecord(adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.lowKof, adaptedEvent.highKof));

      } catch (Exception e) {
        log.error("Failed to run job. Failed to process parsed event: {}", parsedEvent.toString());
        log.error("Cause:", e);
      }
    }
  }
}