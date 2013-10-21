package models.store;

import java.util.Date;

import static models.store.EventStore.EVENTS;
import static models.store.Organisation.MARATHON;

public final class Events {

  public static Player randomPlayer() {
    return new Player(String.valueOf(Math.random()), String.valueOf(Math.random()));
  }

  public static Event randomEvent() {
    return new Event(new Date(), randomPlayer(), randomPlayer());
  }

  public static HistoryRecord randomHistoryRecord() {
    return new HistoryRecord(new Date(), MARATHON, 1.5, 2.5);
  }

  public static void clearEvents() {
    EVENTS.clear();
  }

  public static void addEvent(Event event) {
    EVENTS.put(event, event);
  }
}