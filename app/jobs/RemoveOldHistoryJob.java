package jobs;

import models.store.Event;
import models.store.HistoryRecord;
import play.Logger;

import java.util.List;

import static models.store.EventStore.events;
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

    int removedHistoryCount = 0;
    for (Event event : events()) {
      List<HistoryRecord> history = event.history();

      if (historyCount > history.size()) continue;

      List<HistoryRecord> historyToRemove = history.subList(0, history.size() - historyCount);
      removedHistoryCount += historyToRemove.size();
      event.removeHistory(historyToRemove);
    }

    LOG.debug("Removed {} History Records", removedHistoryCount);
  }
}