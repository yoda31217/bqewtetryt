package models.event;

import java.util.Date;

import static java.lang.Math.random;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;

public final class EventTests {

  public static String randomSide() {
    return "side_" + random();
  }

  public static HistoryRecord randomHistoryRecord() {
    return new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
  }

  public static void clearEvents() {
    EventStore.INSTANCE.events.clear();
  }

  public static Event createEvent(EventType type, Sport sport, Date date, String side1, String side2, String code) {
    return new Event(type, sport, date, side1, side2, code);
  }

  public static Event createAnyEvent() {
    return new Event(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "event_code");
  }
}