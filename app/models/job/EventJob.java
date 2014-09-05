package models.job;

import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.EventOrganisation;
import models.event.EventStore;
import models.event.EventType;
import play.Logger;

import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static play.Logger.of;

public class EventJob implements Runnable {

  Logger.ALogger log = of(EventJob.class);
  private final BAdapter                adapter;
  private final BParser                 parser;
  private final EventStore              eventStore;
  private final Predicate<AdaptedEvent> filter;
  private final Meter                   processedEventMeterMetric;
  private final Meter                   parsedEventMeterMetric;
  private final Meter                   processEventExceptionMeterMetric;
  private final Timer                   timerMetric;

  public EventJob(EventStore eventStore, BParser parser, BAdapter adapter, Predicate<AdaptedEvent> filter, MetricRegistry metricRegistry,
                  EventType eventType, EventOrganisation eventOrganisation) {
    this.eventStore = eventStore;
    this.parser = parser;
    this.adapter = adapter;
    this.filter = filter;
    this.processedEventMeterMetric = metricRegistry.meter(name(this.getClass(), "event", "processed", "meter"));
    this.parsedEventMeterMetric = metricRegistry.meter(name(this.getClass(), "event", "parsed", "meter"));
    this.processEventExceptionMeterMetric = metricRegistry.meter(name(this.getClass(), "event", "process_exception", "meter"));
    this.timerMetric = metricRegistry.timer(name(this.getClass(), eventType.toString(), eventOrganisation.toString(), "timer"));
  }

  @Override
  public void run() {
    Timer.Context context = timerMetric.time();
    try {
      doRun();

    } finally {
      context.stop();
    }
  }

  private void doRun() {
    List<ParsedEvent> parsedEvents = parser.parse();

    parsedEventMeterMetric.mark(parsedEvents.size());

    for (ParsedEvent parsedEvent : parsedEvents) {
      processParsedEvent(parsedEvent);
    }
  }

  private void processParsedEvent(ParsedEvent parsedEvent) {
    try {
      AdaptedEvent adaptedEvent = adapter.adapt(parsedEvent);

      if (!filter.apply(adaptedEvent)) return;

      Event event = eventStore.createOrFindEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.side1, adaptedEvent.side2);
      eventStore.addHistory(event, adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.lowKof, adaptedEvent.highKof);
      event.registerExternalId(adaptedEvent.organisation, adaptedEvent.externalId);

      processedEventMeterMetric.mark();

    } catch (Exception e) {
      processEventExceptionMeterMetric.mark();
      log.error("Failed to process parsed event: {}.", parsedEvent.toString());
      log.error("Cause.", e);
    }
  }
}