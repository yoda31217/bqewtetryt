package models.store;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.google.common.base.Objects.firstNonNull;
import static java.util.Collections.unmodifiableSet;

public class EventStore {

  private EventStore() {
    throw new UnsupportedOperationException();
  }

  static final ConcurrentMap<Event, Event> EVENTS = new ConcurrentHashMap<Event, Event>();

  public static Set<Event> events() {
    return unmodifiableSet(EVENTS.keySet());
  }

  public static Event createOrGetEvent(Date date, String firstPlayer, String secondPlayer, String code) {
    Event newEvent = new Event(date, firstPlayer, secondPlayer, code);
    Event event = EVENTS.putIfAbsent(newEvent, newEvent);
    return firstNonNull(event, newEvent);
  }

  public static void removeEventsOlderThan(long ageInMillis) {
    long now = new Date().getTime();

    for (Iterator<Event> iterator = EVENTS.keySet().iterator(); iterator.hasNext(); ) {
      Event event = iterator.next();

      if (now - event.date().getTime() > ageInMillis) iterator.remove();
    }
  }
}