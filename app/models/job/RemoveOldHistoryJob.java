package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import play.Logger;

import java.util.List;

import static play.Logger.of;

public class RemoveOldHistoryJob implements Runnable {

  Logger.ALogger log = of(RemoveOldHistoryJob.class);
  private final EventStore eventStore;
  private final int        maxHistoryCount;

  public RemoveOldHistoryJob(int maxHistoryCount, EventStore eventStore) {
    this.maxHistoryCount = maxHistoryCount;
    this.eventStore = eventStore;
  }

  @Override
  public void run() {
    int removedHistoryCount = 0;

    for (Event event : eventStore.events()) {
      List<HistoryRecord> history = event.history();

      if (maxHistoryCount > history.size()) continue;

      List<HistoryRecord> oldRecordsToRemove = history.subList(0, history.size() - maxHistoryCount);
      event.removeHistory(oldRecordsToRemove);

      removedHistoryCount += oldRecordsToRemove.size();
    }

    log.debug("Removed {} History Records", removedHistoryCount);
  }
}