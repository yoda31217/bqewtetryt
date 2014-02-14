package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.fetcher.BFetcher;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.HistoryRecord;
import play.Logger;

import java.util.List;

import static models.event.EventStore.createOrGetEvent;
import static play.Logger.of;

public class EventJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(EventJob.class);
  final BAdapter adapter;
  final String name;
  final BFetcher fetcher;
  final BParser parser;
  private final Predicate<AdaptedEvent> filter;

  public EventJob(BFetcher fetcher, BParser parser, BAdapter adapter, Predicate<AdaptedEvent> filter, String name) {
    this.fetcher = fetcher;
    this.parser = parser;
    this.adapter = adapter;
    this.filter = filter;
    this.name = name;
  }

  @Override
  public void run() {
    //    LOG.debug("Running Job: {}", name);

    byte[] fetchResult = fetcher.fetch();

    List<ParsedEvent> parsedEvents = parser.parse(fetchResult);
    for (ParsedEvent parsedEvent : parsedEvents) {

      try {
        AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

        if (!filter.apply(adaptedEvent)) continue;

        Event event = createOrGetEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.firstSide, adaptedEvent.secondSide,
          adaptedEvent.code);
        event.addHistory(new HistoryRecord(adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.firstKof, adaptedEvent.secondKof));

      } catch (Exception e) {
        LOG.error("Failed to run job: {}. Failed to adapt event: {}", name, parsedEvent.toString());
        LOG.error("Cause:", e);
      }
    }
  }
}