package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import play.Logger;

import static models.util.Dates.toMillisFromNow;
import static play.Logger.of;

public class RemoveOldEventJob implements Runnable {

  private static final Logger.ALogger LOG = of(RemoveOldEventJob.class);
  private final long maxSilenceDelayInMillis;

  public RemoveOldEventJob(long maxSilenceDelayInMillis) {
    this.maxSilenceDelayInMillis = maxSilenceDelayInMillis;
  }

  @Override
  public void run() {
    //    LOG.debug("Removing old Events");

    for (Event event : EventStore.INSTANCE.events()) {

      HistoryRecord lastHistoryRecord = event.history().get(event.history().size() - 1);

      boolean isLastHistoryRecordOld = toMillisFromNow(lastHistoryRecord.date()) > maxSilenceDelayInMillis;
      if (isLastHistoryRecordOld) EventStore.INSTANCE.remove(event);
    }
  }
}