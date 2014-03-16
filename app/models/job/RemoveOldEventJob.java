package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import play.Logger;

import static models.event.EventStore.remove;
import static models.util.Dates.millisFromNow;
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

    for (Event event : EventStore.events()) {

      HistoryRecord lastHistoryRecord = event.history().get(event.history().size() - 1);

      boolean isLastHistoryRecordOld = millisFromNow(lastHistoryRecord.date()) > maxSilenceDelayInMillis;
      if (isLastHistoryRecordOld) remove(event);
    }
  }
}