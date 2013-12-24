package models.job;

import models.event.Event;
import models.event.HistoryRecord;
import models.event.Organisation;
import play.Logger;

import java.util.Date;

import static models.event.EventStore.events;
import static play.Logger.of;

public class FakeHistoryRecordJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(FakeHistoryRecordJob.class);

  private final Organisation organisation;

  public FakeHistoryRecordJob(Organisation organisation) {
    this.organisation = organisation;
  }

  @Override
  public void run() {
    for (Event event : events()) {
      LOG.debug("Adding fake History to Event with Code: {}", event.code());
      event.addHistory(new HistoryRecord(new Date(), organisation, 1 + Math.random(), 2 + Math.random() * 4));
    }
  }
}