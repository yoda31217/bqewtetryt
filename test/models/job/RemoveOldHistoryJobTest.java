package models.job;

import models.calc.Calculator;
import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventOrganisation.LANOS;
import static models.event.EventSport.TENNIS;
import static models.event.EventTests.addHistory;
import static models.event.EventType.REGULAR;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Mockito.mock;

public class RemoveOldHistoryJobTest {

  private EventStore          eventStore = new EventStore(mock(Calculator.class));
  private RemoveOldHistoryJob job        = new RemoveOldHistoryJob(2, eventStore);
  private Event               event      = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2"));

  @Test
  public void run_1record_remains1record() {
    EventHistoryRecord record = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    addHistory(event, record);

    job.run();

    assertThat(event.history()).containsExactly(record);
  }

  @Test
  public void run_20records_remains2records() {
    for (int i = 0; i < 20; i++) {
      addHistory(event, new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5));
    }

    job.run();

    assertThat(event.history()).hasSize(2);
  }

  @Test
  public void run_2records_remains2records() {
    EventHistoryRecord firstRecord = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    EventHistoryRecord secondRecord = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    addHistory(event, firstRecord);
    addHistory(event, secondRecord);

    job.run();

    assertThat(event.history()).containsExactly(firstRecord, secondRecord);
  }

  @Test
  public void run_3records_remains2lastRecords() {
    EventHistoryRecord firstRecord = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    EventHistoryRecord secondRecord = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    EventHistoryRecord thirdRecord = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.5);
    addHistory(event, firstRecord);
    addHistory(event, secondRecord);
    addHistory(event, thirdRecord);

    job.run();

    assertThat(event.history()).containsExactly(secondRecord, thirdRecord);
  }
}