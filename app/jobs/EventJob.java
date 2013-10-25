package jobs;

import data.AdaptedEvent;
import data.adapter.BAdapter;
import data.fetcher.UrlFetcher;
import data.parser.BParser;
import data.parser.ParsedEvent;
import models.store.Event;
import models.store.HistoryRecord;
import play.Logger;

import java.util.List;

import static models.store.EventStore.createOrGetEvent;
import static play.Logger.of;

public class EventJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(EventJob.class);
  final BAdapter adapter;
  final String name;
  final UrlFetcher fetcher;
  final BParser parser;

  public EventJob(UrlFetcher fetcher, BParser parser, BAdapter adapter, String name) {
    this.fetcher = fetcher;
    this.parser = parser;
    this.adapter = adapter;
    this.name = name;
  }

  @Override
  public void run() {
    LOG.debug("Running Job: {}", name);

    byte[] fetchResult = fetcher.fetch();

    List<ParsedEvent> parsedEvents = parser.parse(fetchResult);
    for (ParsedEvent parsedEvent : parsedEvents) {
      AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

      Event event = createOrGetEvent(adaptedEvent.date, adaptedEvent.firstSide, adaptedEvent.secondSide, adaptedEvent.code);
      event.addHistory(new HistoryRecord(adaptedEvent.adaptedDate, adaptedEvent.organisation, adaptedEvent.firstKof, adaptedEvent.secondKof));
    }
  }
}