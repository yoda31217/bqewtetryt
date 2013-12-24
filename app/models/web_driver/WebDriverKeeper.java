package models.web_driver;

import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.Semaphore;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class WebDriverKeeper {

  static {
    System.setProperty("webdriver.chrome.driver", "/Users/yoda31217/projects/niknik/betty/conf/chromedriver");
  }

  private final Semaphore lanosDriverSemaphore = new Semaphore(1, true);
  private final long timeoutInMillis;
  private final ChromeDriver driver;

  public WebDriverKeeper(long timeoutInMillis, String url) {
    this.timeoutInMillis = timeoutInMillis;

    driver = new ChromeDriver();
    driver.get(url);
  }

  public ChromeDriver acquire() {
    try {
      boolean wasAcquired = lanosDriverSemaphore.tryAcquire(timeoutInMillis, MILLISECONDS);
      if (wasAcquired) {
        return driver;
      }

    } catch (InterruptedException skipped) {
    }

    throw new IllegalStateException("Failed to acquire Lanos Web Driver.");
  }

  public void release() {
    lanosDriverSemaphore.release();
  }
}