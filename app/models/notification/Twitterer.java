package models.notification;

import play.Logger;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import static play.Logger.of;

public class Twitterer {

  private final Twitter twitter;
  Logger.ALogger log = of(Twitterer.class);

  public Twitterer(Twitter twitter) {
    this.twitter = twitter;
  }

  public void sendMessage(String twit) {
    try {
      twitter.updateStatus(twit);

    } catch (TwitterException ex) {
      log.warn("Failed to update status with twit: {}. Error message: {}.", twit, ex.getMessage());
    }
  }
}