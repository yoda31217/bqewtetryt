package jobs;

import data.AdaptedEvent;
import data.adapter.BAdapter;
import data.fetcher.UrlFetcher;
import data.parser.BParser;
import data.parser.ParsedEvent;
import models.store.Event;
import models.store.EventStore;
import models.store.HistoryRecord;

import java.util.List;

public class EventJob
  implements Runnable {

  final BAdapter adapter;
  final UrlFetcher fetcher;
  final BParser parser;

  public EventJob(UrlFetcher fetcher, BParser parser, BAdapter adapter) {
    this.fetcher = fetcher;
    this.parser = parser;
    this.adapter = adapter;
  }

  @Override
  public void run() {
    byte[] fetchResult = fetcher.fetch();

    List<ParsedEvent> parsedEvents = parser.parse(fetchResult);
    for (ParsedEvent parsedEvent : parsedEvents) {
      AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

      Event event = EventStore.createOrGetEvent(adaptedEvent.date, adaptedEvent.firstPlayer, adaptedEvent.secondPlayer, adaptedEvent.code);
      event.addHistory(new HistoryRecord(adaptedEvent.adaptedDate, adaptedEvent.organisation, adaptedEvent.firstKof, adaptedEvent.secondKof));
    }
  }
}