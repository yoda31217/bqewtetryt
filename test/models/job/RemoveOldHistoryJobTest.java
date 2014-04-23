package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldHistoryJobTest {

  private EventStore          eventStore = new EventStore();
  private RemoveOldHistoryJob job        = new RemoveOldHistoryJob(2, eventStore);
  private Event event = eventStore.createOrGetEvent(REGULAR, TENNIS, new Date(), "SIDE1", "SIDE2");

  @Test
  public void run_1record_remains1record() {
    HistoryRecord record = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    event.addHistory(record);

    job.run();

    assertThat(event.history()).containsExactly(record);
  }

  @Test
  public void run_20records_remains2records() {
    for (int i = 0; i < 20; i++) {
      event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.5));
    }

    job.run();

    assertThat(event.history()).hasSize(2);
  }

  @Test
  public void run_2records_remains2records() {
    HistoryRecord firstRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    event.addHistory(firstRecord);
    event.addHistory(secondRecord);

    job.run();

    assertThat(event.history()).containsExactly(firstRecord, secondRecord);
  }

  @Test
  public void run_3records_remains2lastRecords() {
    HistoryRecord firstRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord thirdRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    event.addHistory(firstRecord);
    event.addHistory(secondRecord);
    event.addHistory(thirdRecord);

    job.run();

    assertThat(event.history()).containsExactly(secondRecord, thirdRecord);
  }
}