package models.job;

import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventStore;
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
    int removedCount = 0;

    for (Event event : eventStore.events()) {
      List<EventHistoryRecord> history = event.history();

      if (maxHistoryCount > history.size()) continue;

      List<EventHistoryRecord> oldRecordsToRemove = history.subList(0, history.size() - maxHistoryCount);
      eventStore.removeHistory(event, oldRecordsToRemove);

      removedCount += oldRecordsToRemove.size();
    }

    if (0 < removedCount) log.info("Removed {} old History Records.", removedCount);
  }

}