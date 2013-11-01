package models.store;

import java.util.Date;

import static java.lang.Math.random;
import static models.store.EventStore.EVENTS;
import static models.store.Organisation.LANOS;

public final class Events {

  public static String randomSide() {
    return "side_" + random();
  }

  public static HistoryRecord randomHistoryRecord() {
    return new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
  }

  public static void clearEvents() {
    EVENTS.clear();
  }
}