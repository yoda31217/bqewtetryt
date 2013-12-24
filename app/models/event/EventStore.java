package models.event;

import play.Logger;

import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.google.common.base.Objects.firstNonNull;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.Collections.sort;
import static play.Logger.of;

public class EventStore {

  static final ConcurrentMap<Event, Event> EVENTS = new ConcurrentHashMap<Event, Event>();
  private static final Logger.ALogger LOG = of(EventStore.class);
  private static final Comparator<Event> EVENT_COMPARATOR = new Comparator<Event>() {
    @Override
    public int compare(Event event1, Event event2) {
      return event1.code.compareTo(event2.code);
    }
  };

  private EventStore() {
    throw new UnsupportedOperationException();
  }

  public static List<Event> events() {
    List<Event> events = newArrayList(EVENTS.keySet());
    sort(events, EVENT_COMPARATOR);
    return events;
  }

  public static Event createOrGetEvent(EventType type, Sport sport, Date date, String firstSide, String secondSide, String code) {
    Event newEvent = new Event(type, sport, date, firstSide, secondSide, code);
    Event event = EVENTS.putIfAbsent(newEvent, newEvent);

    if (null == event) {
      LOG.debug("Adding new Event with Code: {}", newEvent.code());
      return firstNonNull(event, newEvent);

    } else return event;
  }

  public static void removeEventsOlderThan(long ageInMillis) {
    long now = new Date().getTime();

    for (Iterator<Event> iterator = EVENTS.keySet().iterator(); iterator.hasNext(); ) {
      Event event = iterator.next();

      if (now - event.date().getTime() > ageInMillis) {
        LOG.debug("Removing old Event with Code: {}", event.code());
        iterator.remove();
      }
    }
  }
}