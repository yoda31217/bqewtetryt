package models.notification;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.junit.Before;
import org.junit.Test;
import twitter4j.TwitterException;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

public class NotificationJobTest {

  private EventStore      eventStoreMock = mock(EventStore.class);
  private TwitterNotifier notifierMock   = mock(TwitterNotifier.class);
  private NotificationJob job            = new NotificationJob(notifierMock, eventStoreMock);
  private Event           event          = new Event(LIVE, BASKETBALL, new DateTime(), newArrayList("SIDE1"), newArrayList("SIDE2"));

  @Before
  public void before() throws Exception {
    when(eventStoreMock.events()).thenReturn(newArrayList(event));
  }

  @Test
  public void run_newForkEventRunTwice_notifyOnlyOnce() throws TwitterException {
    event.addHistory(new HistoryRecord(new DateTime(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(), VOLVO, 1.4, 3.2));

    job.run();
    job.run();

    String expectedMessageDatePrefix = DateTimeFormat.forPattern("dd-MM").print(new DateTime());
    verify(notifierMock).notify(eq(expectedMessageDatePrefix + " L BB [SIDE1] - [SIDE2] 1.500,L,0/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newForkEvent_notify() throws TwitterException {
    event.addHistory(new HistoryRecord(new DateTime().minusSeconds(1), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(), VOLVO, 1.4, 3.2));

    job.run();

    String expectedMessageDatePrefix = DateTimeFormat.forPattern("dd-MM").print(new DateTime());
    verify(notifierMock).notify(eq(expectedMessageDatePrefix + " L BB [SIDE1] - [SIDE2] 1.500,L,1/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newNotForkEvent_notNotify() throws TwitterException {
    event.addHistory(new HistoryRecord(new DateTime(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(), VOLVO, 1.4, 2.9));

    job.run();

    verifyZeroInteractions(notifierMock);
  }
}