package jobs;

import models.store.Event;
import models.store.HistoryRecord;
import org.junit.Test;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static models.store.Events.randomHistoryRecord;
import static models.store.Events.randomPlayer;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldHistoryJobTest {

  @Test
  public void run() {
    HistoryRecord firstRecord = randomHistoryRecord();
    HistoryRecord secondRecord = randomHistoryRecord();
    HistoryRecord thirdRecord = randomHistoryRecord();

    Event firstEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer());
    firstEvent.addHistory(firstRecord);
    firstEvent.addHistory(secondRecord);

    Event secondEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer());
    secondEvent.addHistory(firstRecord);
    secondEvent.addHistory(secondRecord);
    secondEvent.addHistory(thirdRecord);

    Event thirdEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer());
    thirdEvent.addHistory(firstRecord);

    new RemoveOldHistoryJob(2).run();

    assertThat(firstEvent.history()).containsExactly(firstRecord, secondRecord);
    assertThat(secondEvent.history()).containsExactly(secondRecord, thirdRecord);
    assertThat(thirdEvent.history()).containsExactly(firstRecord);
  }
}