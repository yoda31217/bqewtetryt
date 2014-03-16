package models.job;

import models.event.Event;
import models.event.HistoryRecord;
import play.Logger;

import java.util.List;

import static models.event.EventStore.events;
import static play.Logger.of;

public class RemoveOldHistoryJob implements Runnable {

  private static final Logger.ALogger LOG = of(RemoveOldHistoryJob.class);
  private final int newHistoryCount;

  public RemoveOldHistoryJob(int newHistoryCount) {
    this.newHistoryCount = newHistoryCount;
  }

  @Override
  public void run() {
    //    LOG.debug("Removing old History");

    int removedHistoryCount = 0;
    for (Event event : events()) {
      List<HistoryRecord> history = event.history();

      if (newHistoryCount > history.size()) continue;

      removedHistoryCount += event.removeOldHistory(newHistoryCount);
    }

    LOG.debug("Removed {} History Records", removedHistoryCount);
  }
}