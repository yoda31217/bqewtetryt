package jobs;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;

public class FakeEventJob
  implements Runnable {

  @Override
  public void run() {
    createOrGetEvent(new Date(), "first1, second1", "first2, second2", new Date().toString() + "_code");
  }
}