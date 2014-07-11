package models.util;

import static play.Logger.ALogger;
import static play.Logger.of;

public final class Runnables {

  private Runnables() {
    throw new UnsupportedOperationException();
  }

  public static Runnable wrapLogExRunnable(Runnable runnable) {
    return new LogExRunnable(runnable);
  }

  static class LogExRunnable implements Runnable {

    ALogger log = of(LogExRunnable.class);
    private final Runnable runnable;

    public LogExRunnable(Runnable runnable) {
      this.runnable = runnable;
    }

    @Override
    public void run() {
      try {
        runnable.run();

      } catch (RuntimeException ex) {
        log.error("Unknown exception wrapped and propagation stopped.", ex);
      }
    }
  }
}