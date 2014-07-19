package models.notification;

import models.event.Event;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import twitter4j.TwitterException;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventOrganisation.LANOS;
import static models.event.EventOrganisation.VOLVO;
import static models.event.EventSport.BASKETBALL;
import static models.event.EventTests.addHistory;
import static models.event.EventType.LIVE;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

public class NotificationJobTest {

  private EventStore      eventStoreMock = mock(EventStore.class);
  private BNotifier       notifierMock   = mock(BNotifier.class);
  private NotificationJob job            = new NotificationJob(notifierMock, eventStoreMock);
  private DateTime        eventDate      = new DateTime(2014, 4, 26, 8, 20, UTC);
  private Event           event          = new Event(LIVE, BASKETBALL, eventDate, newArrayList("SIDE1"), newArrayList("SIDE2"));

  @Before
  public void before() throws Exception {
    when(eventStoreMock.events()).thenReturn(newArrayList(event));
  }

  @Test
  public void run_newForkEventRunTwice_notifyOnlyOnce() throws TwitterException {
    addHistory(event, new DateTime(UTC), LANOS, 1.5, 2.9);
    addHistory(event, new DateTime(UTC), VOLVO, 1.4, 3.2);

    job.run();
    job.run();

    verify(notifierMock).notify(anyString());
  }

  @Test
  @Ignore
  public void run_newForkEvent_notifyWithCorrectMessage() throws TwitterException {
    addHistory(event, new DateTime(UTC).minusSeconds(1), LANOS, 1.5, 2.9);
    addHistory(event, new DateTime(UTC), VOLVO, 1.4, 3.2);

    job.run();

    verify(notifierMock).notify(eq("26-04 11:20 L BB [SIDE1] - [SIDE2] 1.500,L,1/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newNotForkEvent_notNotify() throws TwitterException {
    addHistory(event, new DateTime(UTC), LANOS, 1.5, 2.9);
    addHistory(event, new DateTime(UTC), VOLVO, 1.4, 2.9);

    job.run();

    verifyZeroInteractions(notifierMock);
  }
}