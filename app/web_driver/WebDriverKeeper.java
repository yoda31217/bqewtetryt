package web_driver;

import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.Semaphore;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class WebDriverKeeper {

  private final Semaphore marathonDriverSemaphore = new Semaphore(1, true);
  private final long timeoutInMillis;
  private final FirefoxDriver marathonDriver;

  public WebDriverKeeper(long timeoutInMillis) {
    this.timeoutInMillis = timeoutInMillis;

    marathonDriver = new FirefoxDriver();
    marathonDriver.get("http://www.marathonbet.com/en/live.htm");
  }

  public FirefoxDriver acquireMarathonDriver() {
    try {
      boolean wasAcquired = marathonDriverSemaphore.tryAcquire(timeoutInMillis, MILLISECONDS);
      if (wasAcquired) {
        return marathonDriver;
      }

    } catch (InterruptedException skipped) {
    }

    throw new IllegalStateException("Failed to acquire Marathon Web Driver.");
  }

  public void releaseMarathonDriver() {
    marathonDriverSemaphore.release();
  }
}