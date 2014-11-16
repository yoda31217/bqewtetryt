package models.event;

import com.codahale.metrics.MetricRegistry;
import models.calc.Calculator;
import org.joda.time.DateTime;
import play.Logger;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.collect.Lists.newArrayList;
import static play.Logger.of;

public class EventStore {

  Logger.ALogger log = of(EventStore.class);
  final List<Event> events = new CopyOnWriteArrayList<Event>();
  private final EventStoreFinder eventStoreFinder;
  private final Calculator       calculator;

  public EventStore(Calculator calculator, MetricRegistry metricRegistry) {
    this.calculator = calculator;
    eventStoreFinder = new EventStoreFinder(events, metricRegistry);
  }

  public void addHistory(Event event, DateTime date, EventOrganisation organisation, double lowKof, double highKof) {
    EventHistoryRecord historyRecord = new EventHistoryRecord(date, organisation, lowKof, highKof);
    event.addHistory(historyRecord);
    calculator.notifyEventHistoryAdded(event, historyRecord);
  }

  public Event createOrFindEvent(String externalId, EventType type, EventSport sport, DateTime date, List<String> side1, List<String> side2) {
    checkArgument(!side1.isEmpty() && side1.size() <= 2, "Side 1 of size 1 or 2 is required: %s.", side1);
    checkArgument(!side2.isEmpty() && side2.size() <= 2, "Side 2 of size 1 or 2 is required: %s.", side2);

    Event oldEvent = eventStoreFinder.findEvent(externalId, type, sport, date, side1, side2);

    if (null != oldEvent) return oldEvent;

    Event newEvent = new Event(type, sport, date, side1, side2);
    log.debug("Adding new Event: {}.", newEvent.toString());
    events.add(newEvent);
    calculator.notifyEventAdded(newEvent);

    return newEvent;
  }

  public List<Event> events() { return newArrayList(events); }

  public void remove(Event event) {
    events.remove(event);
    calculator.notifyEventRemoved(event);
  }

  public void removeHistory(Event event, List<EventHistoryRecord> records) {event.removeHistory(records);}
}