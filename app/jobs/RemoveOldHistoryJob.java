package jobs;

import models.store.Event;
import models.store.EventStore;
import models.store.HistoryRecord;
import play.Logger;

import java.util.List;

import static play.Logger.of;

public class RemoveOldHistoryJob
  implements Runnable {

  private static final Logger.ALogger LOG = of(RemoveOldHistoryJob.class);
  private final int historyCount;

  public RemoveOldHistoryJob(int historyCount) {
    this.historyCount = historyCount;
  }

  @Override
  public void run() {
    LOG.debug("Removing old History");

    int count = 0;
    for (Event event : EventStore.events()) {
      List<HistoryRecord> history = event.history();

      for (int i = 0; i < history.size() - historyCount; i++) {
        event.removeHistory(history.get(i));
        count++;
      }
    }

    LOG.debug("Removed {} History Records", count);
  }
}