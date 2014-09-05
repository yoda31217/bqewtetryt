package models.job;

import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import play.Logger;

import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static org.joda.time.DateTimeZone.UTC;
import static play.Logger.of;

public class RemoveOldEventJob implements Runnable {

  Logger.ALogger log = of(RemoveOldEventJob.class);
  private final EventStore eventStore;
  private final long       maxLastHistoryRecordAgeInMillis;
  private final Meter eventMeterMetric;
  private final Timer timerMetric;

  public RemoveOldEventJob(long maxLastHistoryRecordAgeInMillis, EventStore eventStore, MetricRegistry metricRegistry) {
    this.maxLastHistoryRecordAgeInMillis = maxLastHistoryRecordAgeInMillis;
    this.eventStore = eventStore;
    this.eventMeterMetric = metricRegistry.meter(name(this.getClass(), "event", "meter"));
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

      if (history.isEmpty()) {
        eventStore.remove(event);
        eventMeterMetric.mark();
        removedCount++;
        continue;
      }

      EventHistoryRecord lastHistoryRecord = history.get(history.size() - 1);
      boolean isLastHistoryRecordOld = new Duration(lastHistoryRecord.date(), new DateTime(UTC)).getMillis() > maxLastHistoryRecordAgeInMillis;

      if (isLastHistoryRecordOld) {
        eventStore.remove(event);
        eventMeterMetric.mark();
        removedCount++;
      }
    }

    if (0 < removedCount) log.debug("Removed {} old Events.", removedCount);
  }
}