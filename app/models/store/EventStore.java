package models.store;

import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static com.google.common.base.Objects.firstNonNull;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.Collections.sort;

public class EventStore {

  static final ConcurrentMap<Event, Event> EVENTS = new ConcurrentHashMap<Event, Event>();
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