package models.job;

import models.event.Event;
import models.event.HistoryRecord;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventTests.clearEvents;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldHistoryJobTest {

  private Event               event;
  private RemoveOldHistoryJob jobToRemoveAllExcept2records;

  @Before
  public void before() {
    clearEvents();
    event = EventJob.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(), "SIDE1", "SIDE2", "code_2");

    jobToRemoveAllExcept2records = new RemoveOldHistoryJob(2);
  }

  @Test
  public void run_1historyRecord_remains1record() {
    HistoryRecord record = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    event.addHistory(record);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(record);
  }

  @Test
  public void run_20historyRecords_remains2records() {
    for (int i = 0; i < 20; i++) {
      event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.5));
    }

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).hasSize(2);
  }

  @Test
  public void run_2historyRecords_remains2records() {
    HistoryRecord firstRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);

    event.addHistory(firstRecord);
    event.addHistory(secondRecord);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(firstRecord, secondRecord);
  }

  @Test
  public void run_3historyRecords_remains2lastRecords() {
    HistoryRecord firstRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord secondRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);
    HistoryRecord thirdRecord = new HistoryRecord(new Date(), LANOS, 1.5, 2.5);

    event.addHistory(firstRecord);
    event.addHistory(secondRecord);
    event.addHistory(thirdRecord);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(secondRecord, thirdRecord);
  }
}