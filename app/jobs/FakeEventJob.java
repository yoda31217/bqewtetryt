package jobs;

import models.store.Player;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;

public class FakeEventJob
  implements Runnable {

  @Override
  public void run() {
    createOrGetEvent(new Date(), new Player("first1", "second1"), new Player("first2", "second2"));
  }
}