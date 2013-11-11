package web_driver;

import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.concurrent.Semaphore;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class WebDriverKeeper {

  private final Semaphore lanosDriverSemaphore = new Semaphore(1, true);
  private final long timeoutInMillis;
  private final FirefoxDriver lanosDriver;

  public WebDriverKeeper(long timeoutInMillis, String url) {
    this.timeoutInMillis = timeoutInMillis;

    lanosDriver = new FirefoxDriver();
    lanosDriver.get(url);
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