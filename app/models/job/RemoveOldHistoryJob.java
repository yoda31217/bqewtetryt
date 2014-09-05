package models.job;

import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventStore;
import play.Logger;

import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static play.Logger.of;

public class RemoveOldHistoryJob implements Runnable {

  Logger.ALogger log = of(RemoveOldHistoryJob.class);
  private final EventStore eventStore;
  private final int        maxHistoryCount;
  private final Meter historyMeterMetric;
  private final Timer timerMetric;

  public RemoveOldHistoryJob(int maxHistoryCount, EventStore eventStore, MetricRegistry metricRegistry) {
    this.maxHistoryCount = maxHistoryCount;
    this.eventStore = eventStore;
    this.historyMeterMetric = metricRegistry.meter(name(this.getClass(), "history", "meter"));
    this.timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  @Override
  public void run() {
    Timer.Context context = timerMetric.time();
    try {
      doRun();

    } finally {
      context.stop();
    }
  }

  private void doRun() {
    int removedCount = 0;

    for (Event event : eventStore.events()) {
      List<EventHistoryRecord> history = event.history();

      if (maxHistoryCount > history.size()) continue;

      List<EventHistoryRecord> oldRecordsToRemove = history.subList(0, history.size() - maxHistoryCount);
      eventStore.removeHistory(event, oldRecordsToRemove);

      historyMeterMetric.mark(oldRecordsToRemove.size());
      removedCount += oldRecordsToRemove.size();
    }

    if (0 < removedCount) log.debug("Removed {} old History Records.", removedCount);
  }

}