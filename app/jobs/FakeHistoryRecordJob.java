package jobs;

import models.store.Event;
import models.store.HistoryRecord;
import models.store.Organisation;

import java.util.Date;

import static models.store.EventStore.events;

public class FakeHistoryRecordJob
  implements Runnable {

  private final Organisation organisation;

  public FakeHistoryRecordJob(Organisation organisation) {
    this.organisation = organisation;
  }

  @Override
  public void run() {
    for (Event event : events()) {
      event.addHistory(new HistoryRecord(new Date(), organisation, 1 + Math.random(), 2 + Math.random() * 4));
    }
  }
}