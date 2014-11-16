package models.job;

import com.codahale.metrics.MetricRegistry;
import models.calc.Calculator;
import models.event.Event;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventOrganisation.LANOS;
import static models.event.EventSport.TENNIS;
import static models.event.EventTests.addHistory;
import static models.event.EventType.REGULAR;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Mockito.mock;

public class RemoveOldEventJobTest {

  private EventStore eventStore = new EventStore(mock(Calculator.class), mock(MetricRegistry.class));

  @Test
  public void run_eventWith5secOldHistory_removeEventsOlderThan4Sec() {
    Event event = eventStore.createOrFindEvent(null, REGULAR, TENNIS, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2"));
    addHistory(event, new DateTime(UTC).minusSeconds(5), LANOS, 1.5, 2.9);

    new RemoveOldEventJob(Duration.standardSeconds(4).getMillis(), eventStore, mock(MetricRegistry.class)).run();

    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void run_eventWithNoRecords_removeEvent() {
    eventStore.createOrFindEvent(null, REGULAR, TENNIS, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2"));
    new RemoveOldEventJob(0, eventStore, mock(MetricRegistry.class)).run();
    assertThat(eventStore.events()).isEmpty();
  }
}