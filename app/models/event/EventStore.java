package models.event;

import org.joda.time.DateTime;
import play.Logger;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.common.collect.Lists.newArrayList;
import static play.Logger.of;

public class EventStore {

  Logger.ALogger log = of(EventStore.class);
  final List<Event> events = new CopyOnWriteArrayList<Event>();

  public EventStore() {
  }

  public Event createOrFindEvent(EventType type, Sport sport, DateTime date, List<String> side1, List<String> side2) {
    Event oldEvent = findEvent(type, sport, date, side1, side2);

    if (null != oldEvent) return oldEvent;

    Event newEvent = new Event(type, sport, date, side1, side2);
    log.info("Adding new Event: {}.", newEvent.toString());
    events.add(newEvent);
    return newEvent;
  }

  public List<Event> events() { return newArrayList(events); }

  public void remove(Event event) {
    events.remove(event);
  }

  private Event findEvent(EventType type, Sport sport, DateTime date, List<String> side1, List<String> side2) {
    for (Event event : events)
      if (event.type.equals(type) && event.sport.equals(sport) && event.date.equals(date) && event.side1.equals(side1) && event.side2.equals(side2))
        return event;

    return null;
  }
}