package models.notification;

import models.util.LoggerMock;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;

public class TwittererTest {

  private Twitter    twitterMock = Mockito.mock(Twitter.class);
  private Twitterer  twitterer   = new Twitterer(twitterMock);
  private LoggerMock logMock     = new LoggerMock();

  @Before
  public void before() {
    twitterer.log = logMock;
  }

  @Test
  public void sendMessage_withoutEx_passedToTwitter() throws TwitterException {
    twitterer.sendMessage("MESSAGE");
    verify(twitterMock).updateStatus("MESSAGE");
  }

  @Test
  public void sendMessage_twitterThrowRuntimeEx_propagatedToUpperLevel() throws TwitterException {
    RuntimeException expectedException = new RuntimeException();
    doThrow(expectedException).when(twitterMock).updateStatus(anyString());

    try {
      twitterer.sendMessage("MESSAGE");
      fail("Not reachable.");

    } catch (Exception actualEx) {
      assertThat(actualEx).isSameAs(expectedException);
    }
  }

  @Test
  public void sendMessage_twitterThrowTwitterEx_logWarn() throws TwitterException {
    TwitterException twitterException = new TwitterException("EX_MESSAGE");
    doThrow(twitterException).when(twitterMock).updateStatus(anyString());

    twitterer.sendMessage("MESSAGE");

    logMock.verifyWarn("Failed to update status with twit: MESSAGE. Error message: EX_MESSAGE.");
  }
}