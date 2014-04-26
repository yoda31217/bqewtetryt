package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import play.Logger;

import java.util.List;

import static play.Logger.of;

public class RemoveOldEventJob implements Runnable {

  Logger.ALogger log = of(RemoveOldEventJob.class);
  private final EventStore eventStore;
  private final long       maxLastHistoryRecordAgeInMillis;

  public RemoveOldEventJob(long maxLastHistoryRecordAgeInMillis, EventStore eventStore) {
    this.maxLastHistoryRecordAgeInMillis = maxLastHistoryRecordAgeInMillis;
    this.eventStore = eventStore;
  }

  @Override
  public void run() {
    int removedCount = 0;

    for (Event event : eventStore.events()) {

      List<HistoryRecord> history = event.history();
      if (history.isEmpty()) {
        eventStore.remove(event);
        removedCount++;
        continue;
      }

      HistoryRecord lastHistoryRecord = history.get(history.size() - 1);
      boolean isLastHistoryRecordOld = new Duration(lastHistoryRecord.date(), new DateTime()).getMillis() > maxLastHistoryRecordAgeInMillis;

      if (isLastHistoryRecordOld) {
        eventStore.remove(event);
        removedCount++;
      }
    }

    if (0 < removedCount) log.info("Removed {} old Events.", removedCount);
  }
}