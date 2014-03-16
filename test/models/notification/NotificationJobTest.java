package models.notification;

import models.calc.Calcularium;
import models.calc.Calculation;
import models.event.Event;
import models.event.HistoryRecord;
import org.junit.Test;
import twitter4j.TwitterException;

import java.util.Date;

import static com.google.common.collect.Sets.newHashSet;
import static models.event.EventStore.createOrGetEvent;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static models.util.Dates.create1secOldDate;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;
import static org.mockito.Mockito.when;

public class NotificationJobTest {

  private Calcularium     calculariumMock = mock(Calcularium.class);
  private TwitterNotifier notifierMock    = mock(TwitterNotifier.class);
  private NotificationJob job             = new NotificationJob(notifierMock, calculariumMock);

  @Test
  public void run_newForkEventRunTwice_notifyOnlyOnce() throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(create1secOldDate(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    when(calculariumMock.createCalculations()).thenReturn(newHashSet(new Calculation(event)));

    job.run();
    job.run();

    verify(notifierMock).notify(eq("L BB SIDE1 - SIDE2 1.500,L,1/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newForkEvent_notify() throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(create1secOldDate(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    when(calculariumMock.createCalculations()).thenReturn(newHashSet(new Calculation(event)));

    job.run();

    verify(notifierMock).notify(eq("L BB SIDE1 - SIDE2 1.500,L,1/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newNotForkEvent_notNotify() throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(create1secOldDate(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));
    when(calculariumMock.createCalculations()).thenReturn(newHashSet(new Calculation(event)));

    job.run();

    verifyZeroInteractions(notifierMock);
  }

}