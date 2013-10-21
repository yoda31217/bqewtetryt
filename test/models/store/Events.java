package models.store;

import java.util.Date;

import static java.lang.Math.random;
import static models.store.EventStore.EVENTS;
import static models.store.Organisation.MARATHON;

public final class Events {

  public static String randomPlayer() {
    return "player_" + random();
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