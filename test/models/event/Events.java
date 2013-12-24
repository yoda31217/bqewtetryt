package models.event;

import java.util.Date;

import static java.lang.Math.random;
import static models.event.EventStore.EVENTS;
import static models.event.Organisation.LANOS;

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