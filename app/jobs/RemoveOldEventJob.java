package jobs;

import play.Logger;

import static models.store.EventStore.removeEventsOlderThan;
import static play.Logger.of;

public class RemoveOldEventJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(RemoveOldEventJob.class);
  private final long maxAgeInMillis;

  public RemoveOldEventJob(long maxAgeInMillis) {
    this.maxAgeInMillis = maxAgeInMillis;
  }

  @Override
  public void run() {
    LOG.debug("Removing old Events");

    removeEventsOlderThan(maxAgeInMillis);
  }
}