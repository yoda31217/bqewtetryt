package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.joda.time.DateTime;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;

public class RemoveOldHistoryJobTest {

  private EventStore          eventStore = new EventStore();
  private RemoveOldHistoryJob job        = new RemoveOldHistoryJob(2, eventStore);
  private Event               event      = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2"));

  @Test
  public void run_1record_remains1record() {
    HistoryRecord record = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    event.addHistory(record);

    job.run();

    assertThat(event.history()).containsExactly(record);
  }

  @Test
  public void run_20records_remains2records() {
    for (int i = 0; i < 20; i++) {
      event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5));
    }

    job.run();

    assertThat(event.history()).hasSize(2);
  }

  @Test
  public void run_2records_remains2records() {
    HistoryRecord firstRecord = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    event.addHistory(firstRecord);
    event.addHistory(secondRecord);

    job.run();

    assertThat(event.history()).containsExactly(firstRecord, secondRecord);
  }

  @Test
  public void run_3records_remains2lastRecords() {
    HistoryRecord firstRecord = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    HistoryRecord thirdRecord = new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    event.addHistory(firstRecord);
    event.addHistory(secondRecord);
    event.addHistory(thirdRecord);

    job.run();

    assertThat(event.history()).containsExactly(secondRecord, thirdRecord);
  }
}