package jobs;

import models.store.Event;
import play.Logger;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static models.store.EventType.REGULAR;
import static play.Logger.of;

public class FakeEventJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(FakeEventJob.class);

  @Override
  public void run() {
    Event newEvent = createOrGetEvent(REGULAR, new Date(), "first1, second1", "first2, second2", new Date().toString() + "_code");

    LOG.debug("Adding fake Event with Code: {}", newEvent.code());
  }
}