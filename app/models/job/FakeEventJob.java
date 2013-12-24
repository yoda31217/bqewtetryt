package models.job;

import models.event.Event;
import play.Logger;

import java.util.Date;

import static models.event.EventStore.createOrGetEvent;
import static models.event.EventType.REGULAR;
import static models.event.Sport.TENNIS;
import static play.Logger.of;

public class FakeEventJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(FakeEventJob.class);

  @Override
  public void run() {
    Event newEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), "first1, second1", "first2, second2", new Date().toString() + "_code");

    LOG.debug("Adding fake Event with Code: {}", newEvent.code());
  }
}