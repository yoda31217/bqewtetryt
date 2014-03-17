package models.util;

import static play.Logger.ALogger;
import static play.Logger.of;

public final class Runnables {

  private Runnables() {
    throw new UnsupportedOperationException();
  }

  public static Runnable createLogExRunnable(final Runnable runnable) {
    return new LogExRunnable(runnable);
  }

  static class LogExRunnable implements Runnable {

    ALogger log;
    private final Runnable runnable;

    public LogExRunnable(Runnable runnable) {
      this.runnable = runnable;
      log = of(LogExRunnable.class);
    }

    @Override
    public void run() {
      try {
        runnable.run();

      } catch (RuntimeException ex) {
        log.error("Unknown exception wrapped and stopped.", ex);
      }
    }
  }
}