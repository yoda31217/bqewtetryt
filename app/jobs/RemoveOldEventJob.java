package jobs;

import static models.store.EventStore.removeEventsOlderThan;

public class RemoveOldEventJob
  implements Runnable {

  private final long maxAgeInMillis;

  public RemoveOldEventJob(long maxAgeInMillis) {
    this.maxAgeInMillis = maxAgeInMillis;
  }

  @Override
  public void run() {
    removeEventsOlderThan(maxAgeInMillis);
  }
}