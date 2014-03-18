package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;

import java.util.List;

import static models.util.Dates.toMillisFromNow;

public class RemoveOldEventJob implements Runnable {

  private final EventStore eventStore;
  private final long       maxLastHistoryRecordAgeInMillis;

  public RemoveOldEventJob(long maxLastHistoryRecordAgeInMillis, EventStore eventStore) {
    this.maxLastHistoryRecordAgeInMillis = maxLastHistoryRecordAgeInMillis;
    this.eventStore = eventStore;
  }

  @Override
  public void run() {
    for (Event event : eventStore.events()) {

      List<HistoryRecord> history = event.history();
      if (history.isEmpty()) {
        eventStore.remove(event);
        continue;
      }

      HistoryRecord lastHistoryRecord = history.get(history.size() - 1);

      boolean isLastHistoryRecordOld = toMillisFromNow(lastHistoryRecord.date()) > maxLastHistoryRecordAgeInMillis;
      if (isLastHistoryRecordOld) eventStore.remove(event);
    }
  }
}