package web_driver;

import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.Semaphore;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class LanosWebDriverKeeper {

  private final Semaphore lanosDriverSemaphore = new Semaphore(1, true);
  private final long timeoutInMillis;
  private final FirefoxDriver lanosDriver;

  public LanosWebDriverKeeper(long timeoutInMillis) {
    this.timeoutInMillis = timeoutInMillis;

    lanosDriver = new FirefoxDriver();
    lanosDriver.get("http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/live.htm");
  }

  public FirefoxDriver acquire() {
    try {
      boolean wasAcquired = lanosDriverSemaphore.tryAcquire(timeoutInMillis, MILLISECONDS);
      if (wasAcquired) {
        return lanosDriver;
      }

    } catch (InterruptedException skipped) {
    }

    throw new IllegalStateException("Failed to acquire Lanos Web Driver.");
  }

  public void release() {
    lanosDriverSemaphore.release();
  }
}