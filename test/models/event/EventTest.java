package models.event;

import org.joda.time.DateTime;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;

public class EventTest {

  private Event event = new Event(REGULAR, TENNIS, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2"));

  @Test
  public void addHistory_always_addHistoryRecord() {
    HistoryRecord record = new HistoryRecord(new DateTime(UTC), LANOS, 1.0, 1.5);
    event.addHistory(record);
    assertThat(event.history()).containsOnly(record);
  }

  @Test
  public void history_always_returnCopy() {
    assertThat(event.history()).isNotSameAs(event.history);
  }

  @Test
  public void removeHistory_remove1of1records_remove1record() throws Exception {
    HistoryRecord record = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    event.addHistory(record);

    event.removeHistory(newArrayList(record));

    assertThat(event.history()).hasSize(0);
  }
}