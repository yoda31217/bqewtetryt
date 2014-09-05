package models.util;

import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;

import static com.codahale.metrics.MetricRegistry.name;
import static play.Logger.ALogger;
import static play.Logger.of;

public final class Runnables {

  private Runnables() {
    throw new UnsupportedOperationException();
  }

  public static Runnable wrapLogExRunnable(Runnable runnable, MetricRegistry metricRegistry) {
    return new LogExRunnable(runnable, metricRegistry);
  }

  static class LogExRunnable implements Runnable {

    ALogger log = of(LogExRunnable.class);
    private final Runnable runnable;
    private final Meter exceptionMeterMetric;

    public LogExRunnable(Runnable runnable, MetricRegistry metricRegistry) {
      this.runnable = runnable;
      exceptionMeterMetric = metricRegistry.meter(name(this.getClass(), "exception", "meter"));
    }

    @Override
    public void run() {
      try {
        runnable.run();

      } catch (RuntimeException ex) {
        exceptionMeterMetric.mark();
        log.error("Unhandled exception wrapped and propagation stopped.", ex);
      }
    }
  }
}