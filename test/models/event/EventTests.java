package models.event;

import org.joda.time.DateTime;

public class EventTests {

  public static void addHistory(Event event, DateTime date, EventOrganisation organisation, double lowKof, double highKof) {
    event.addHistory(new EventHistoryRecord(date, organisation, lowKof, highKof));
  }

  public static void addHistory(Event event, EventHistoryRecord record) {
    event.addHistory(record);
  }
}