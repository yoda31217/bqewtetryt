package models.event;

import play.Logger;

import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.google.common.collect.Lists.newArrayList;
import static models.calc.Calcularium.calcularium;
import static play.Logger.of;

public class EventStore {

  static final         ConcurrentMap<Event, Event> EVENTS = new ConcurrentHashMap<Event, Event>();
  private static final Logger.ALogger              LOG    = of(EventStore.class);

  private EventStore() {
    throw new UnsupportedOperationException();
  }

  public static List<Event> events() {
    return newArrayList(EVENTS.keySet());
  }

  public static Event createOrGetEvent(EventType type, Sport sport, Date date, String side1, String side2, String code) {
    Event newEvent = new Event(type, sport, date, side1, side2, code);
    Event oldEvent = EVENTS.putIfAbsent(newEvent, newEvent);

    if (null != oldEvent) return oldEvent;

    LOG.debug("Adding new Event with Code: {}", newEvent.code());
    calcularium().registerEvent(newEvent);
    return newEvent;

  }

  public static void remove(Event event) {
    EVENTS.remove(event);
    event.markRemoved();
    LOG.debug("Removing old Event with Code: {}", event.code());
  }
}