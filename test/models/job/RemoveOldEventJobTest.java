package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldEventJobTest {

  private EventStore eventStore = new EventStore();

  @Test
  public void run_eventWith5secOldHistory_removeEventsOlderThan4Sec() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(), newArrayList("SIDE1"), newArrayList("SIDE2"));
    event.addHistory(new HistoryRecord(new DateTime().minusSeconds(5), LANOS, 1.5, 2.9));

    new RemoveOldEventJob(Duration.standardSeconds(4).getMillis(), eventStore).run();

    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void run_eventWithNoRecords_removeEvent() {
    eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(), newArrayList("SIDE1"), newArrayList("SIDE2"));
    new RemoveOldEventJob(0, eventStore).run();
    assertThat(eventStore.events()).isEmpty();
  }
}