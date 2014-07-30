package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.EventStore;
import play.Logger;

import java.util.List;

import static java.lang.System.currentTimeMillis;
import static play.Logger.of;

public class EventJob implements Runnable {

  Logger.ALogger log = of(EventJob.class);
  private final BAdapter                adapter;
  private final BParser                 parser;
  private final EventStore              eventStore;
  private final Predicate<AdaptedEvent> filter;

  public EventJob(EventStore eventStore, BParser parser, BAdapter adapter, Predicate<AdaptedEvent> filter) {
    this.eventStore = eventStore;
    this.parser = parser;
    this.adapter = adapter;
    this.filter = filter;
  }

  @Override
  public void run() {
    log.debug("Event Job start.");
    long startMillis = currentTimeMillis();

    List<ParsedEvent> parsedEvents = parser.parse();

    for (ParsedEvent parsedEvent : parsedEvents) {
      processParsedEvent(parsedEvent);
    }

    long durationMillis = currentTimeMillis() - startMillis;
    log.info("Processed {} events in {} ms.", parsedEvents.size(), durationMillis);
    log.debug("Event Job end.");
  }

  private void processParsedEvent(ParsedEvent parsedEvent) {
    try {
      AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

      if (!filter.apply(adaptedEvent)) return;

      Event event = eventStore.createOrFindEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.side1, adaptedEvent.side2);
      eventStore.addHistory(event, adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.lowKof, adaptedEvent.highKof);

    } catch (Exception e) {
      log.error("Failed to process parsed event: {}.", parsedEvent.toString());
      log.error("Cause.", e);
    }
  }
}