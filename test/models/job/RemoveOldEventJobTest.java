package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static models.util.Dates.SECS_IN_MILLIS;
import static models.util.Dates.create5secsOldDate;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldEventJobTest {

  private EventStore eventStore = new EventStore();

  @Test
  public void run_eventWith5secOldHistory_removeEventsOlderThan4Sec() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, new Date(), "SIDE1", "SIDE2");
    event.addHistory(new HistoryRecord(create5secsOldDate(), LANOS, 1.5, 2.9));

    long maxSilenceDelayInMillis = 4 * SECS_IN_MILLIS;
    new RemoveOldEventJob(maxSilenceDelayInMillis, eventStore).run();

    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void run_eventWithNoRecords_removeEvent() {
    eventStore.createOrFindEvent(REGULAR, TENNIS, new Date(), "SIDE1", "SIDE2");
    new RemoveOldEventJob(0, eventStore).run();
    assertThat(eventStore.events()).isEmpty();
  }
}