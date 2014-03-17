package models.event;

import play.Logger;

import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.google.common.collect.Sets.newHashSet;
import static play.Logger.of;

public class EventStore {

  public static final EventStore INSTANCE = new EventStore();
  Logger.ALogger LOG = of(EventStore.class);
  final ConcurrentMap<Event, Event> events = new ConcurrentHashMap<Event, Event>();

  public EventStore() {
  }

  public Event createOrGetEvent(EventType type, Sport sport, Date date, String side1, String side2, String code) {
    Event newEvent = new Event(type, sport, date, side1, side2, code);
    Event oldEvent = events.putIfAbsent(newEvent, newEvent);

    if (null != oldEvent) return oldEvent;

    LOG.debug("Adding new Event with Code: {}", newEvent.code());
    return newEvent;

  }

  public Set<Event> events() {
    return newHashSet(events.keySet());
  }

  public void remove(Event event) {
    events.remove(event);
    LOG.debug("Removing old Event with Code: {}", event.code());
  }
}