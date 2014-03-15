package models.job;

import models.event.Event;
import models.event.HistoryRecord;
import models.notification.Twitterer;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;

import java.util.Date;

import static models.calc.CalculariumTests.resetCalcularium;
import static models.event.EventStore.createOrGetEvent;
import static models.event.EventTests.clearEvents;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyZeroInteractions;

public class TwitterNotificationJobTest {

  private Twitterer twittererMock = mock(Twitterer.class);

  @Before
  public void before() {
    clearEvents();
    resetCalcularium();
  }

  @Test
  public void run_newForkEvent_updateStatus()
    throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(createDate1secOld(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    new TwitterNotificationJob(twittererMock).run();

    verify(twittererMock).sendMessage(eq("L BB SIDE1 - SIDE2 1.500,L,1/3.200,V,0 0.667+0.333=0.067 0.688+0.312=0.031"));
  }

  @Test
  public void run_newForkEventRunTwice_updateStatusOnlyOnce()
    throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(createDate1secOld(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    TwitterNotificationJob twitterNotificationJob = new TwitterNotificationJob(twittererMock);
    twitterNotificationJob.run();
    twitterNotificationJob.run();

    verify(twittererMock).sendMessage(anyString());
  }

  @Test
  public void run_newNotForkEvent_notUpdateStatus()
    throws TwitterException {
    Event event = createOrGetEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    event.addHistory(new HistoryRecord(createDate1secOld(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));

    new TwitterNotificationJob(twittererMock).run();

    verifyZeroInteractions(twittererMock);
  }

  @Ignore
  @Test
  public void test()
    throws TwitterException {
    TwitterFactory.getSingleton().updateStatus("test sss1");
  }

  private Date createDate1secOld() {return new Date(new Date().getTime() - 1000);}
}