package models.notification;

import play.Logger;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import static play.Logger.of;

public class TwitterNotifier {

  Logger.ALogger log = of(TwitterNotifier.class);
  private final Twitter twitter;

  public TwitterNotifier(Twitter twitter) {
    this.twitter = twitter;
  }

  public void notify(String message) {
    try {
      twitter.updateStatus(message);

    } catch (TwitterException ex) {
      log.warn("Failed to update status with twit: {}. Error message: {}.", message, ex.getMessage());
    }
  }
}