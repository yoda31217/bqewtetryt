package jobs;

import models.store.Event;
import models.store.HistoryRecord;
import org.junit.Test;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static models.store.EventType.REGULAR;
import static models.store.Events.randomHistoryRecord;
import static models.store.Events.randomSide;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldHistoryJobTest {

  @Test
  public void run() {
    HistoryRecord firstRecord = randomHistoryRecord();
    HistoryRecord secondRecord = randomHistoryRecord();
    HistoryRecord thirdRecord = randomHistoryRecord();

    Event firstEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_1");
    firstEvent.addHistory(firstRecord);
    firstEvent.addHistory(secondRecord);

    Event secondEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_2");
    secondEvent.addHistory(firstRecord);
    secondEvent.addHistory(secondRecord);
    secondEvent.addHistory(thirdRecord);

    Event thirdEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_3");
    thirdEvent.addHistory(firstRecord);

    new RemoveOldHistoryJob(2).run();

    assertThat(firstEvent.history()).containsExactly(firstRecord, secondRecord);
    assertThat(secondEvent.history()).containsExactly(secondRecord, thirdRecord);
    assertThat(thirdEvent.history()).containsExactly(firstRecord);
  }
}