package models.notification;

import models.util.LoggerMock;
import org.junit.Before;
import org.junit.Test;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class TwitterNotifierTest {

  private LoggerMock      logMock         = new LoggerMock();
  private Twitter         twitterMock     = mock(Twitter.class);
  private TwitterNotifier twitterNotifier = new TwitterNotifier(twitterMock);

  @Before
  public void before() {
    twitterNotifier.log = logMock;
  }

  @Test
  public void notify_twitterThrowRuntimeEx_propagatedToUpperLevel() throws TwitterException {
    RuntimeException expectedEx = new RuntimeException();
    doThrow(expectedEx).when(twitterMock).updateStatus("MESSAGE");

    try {
      twitterNotifier.notify("MESSAGE");
      fail("Not reachable.");

    } catch (Exception actualEx) {
      assertThat(actualEx).isSameAs(expectedEx);
    }
  }

  @Test
  public void notify_twitterThrowTwitterEx_logWarn() throws TwitterException {
    TwitterException twitterException = new TwitterException("EX_MESSAGE");
    doThrow(twitterException).when(twitterMock).updateStatus("MESSAGE");

    twitterNotifier.notify("MESSAGE");

    logMock.verifyWarn("Failed to update status with twit: MESSAGE. Error message: EX_MESSAGE.");
  }

  @Test
  public void notify_withoutEx_passedToTwitter() throws TwitterException {
    twitterNotifier.notify("MESSAGE");
    verify(twitterMock).updateStatus("MESSAGE");
  }
}