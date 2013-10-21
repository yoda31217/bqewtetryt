package jobs;

import models.store.Event;
import models.store.EventStore;
import models.store.HistoryRecord;

import java.util.List;

public class RemoveOldHistoryJob
  implements Runnable {

  private final int historyCount;

  public RemoveOldHistoryJob(int historyCount) {
    this.historyCount = historyCount;
  }

  @Override
  public void run() {
    for (Event event : EventStore.events()) {
      List<HistoryRecord> history = event.history();

      for (int i = 0; i < history.size() - historyCount; i++) {
        event.removeHistory(history.get(i));
      }
    }
  }
}