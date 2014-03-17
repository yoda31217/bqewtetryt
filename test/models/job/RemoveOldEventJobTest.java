package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventTests.clearEvents;
import static models.event.EventTests.randomSide;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class RemoveOldEventJobTest {

  @Before
  public void before() {
    clearEvents();
  }

  @Test
  public void run_eventWith1minOldHistory_removeEventsOlderThan50secs() {
    Event event = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_1");
    event.addHistory(new HistoryRecord(createDate1minOld(), LANOS, 1.5, 2.9));

    long maxSilenceDelayInMillis = 50 * 1000L;
    new RemoveOldEventJob(maxSilenceDelayInMillis).run();

    assertThat(EventStore.INSTANCE.events()).isEmpty();
  }

  private Date createDate1minOld() {return new Date(new Date().getTime() - 60 * 1000);}

}