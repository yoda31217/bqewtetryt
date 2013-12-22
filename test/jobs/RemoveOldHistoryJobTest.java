package jobs;

import models.store.Event;
import models.store.HistoryRecord;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static models.store.EventType.REGULAR;
import static models.store.Events.clearEvents;
import static models.store.Events.randomHistoryRecord;
import static models.store.Events.randomSide;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldHistoryJobTest {

  private RemoveOldHistoryJob jobToRemoveAllExcept2records;
  private Event event;

  @Before
  public void before() {
    clearEvents();
    event = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_2");

    jobToRemoveAllExcept2records = new RemoveOldHistoryJob(2);
  }

  @Test
  public void run_3historyRecords_remains2lastRecords() {
    HistoryRecord firstRecord = randomHistoryRecord();
    HistoryRecord secondRecord = randomHistoryRecord();
    HistoryRecord thirdRecord = randomHistoryRecord();

    event.addHistory(firstRecord);
    event.addHistory(secondRecord);
    event.addHistory(thirdRecord);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(secondRecord, thirdRecord);
  }

  @Test
  public void run_2historyRecords_remains2records() {
    HistoryRecord firstRecord = randomHistoryRecord();
    HistoryRecord secondRecord = randomHistoryRecord();

    event.addHistory(firstRecord);
    event.addHistory(secondRecord);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(firstRecord, secondRecord);
  }

  @Test
  public void run_1historyRecord_remains1record() {
    HistoryRecord record = randomHistoryRecord();
    event.addHistory(record);

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).containsExactly(record);
  }

  @Test
  public void run_20historyRecords_remains2records() {
    for (int i = 0; i < 20; i++) {
      event.addHistory(randomHistoryRecord());
    }

    jobToRemoveAllExcept2records.run();

    assertThat(event.history()).hasSize(2);
  }
}