package models.web_driver;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.Semaphore;

import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class WebDriverKeeper {

  static {
    initWebDriverEnv();
  }

  private final Semaphore lanosDriverSemaphore = new Semaphore(1, true);
  private final long timeoutInMillis;
  private final ChromeDriver driver;

  public WebDriverKeeper(long timeoutInMillis, String url) {
    this.timeoutInMillis = timeoutInMillis;

    driver = new ChromeDriver();
    driver.get(url);
    driver.manage().window().setSize(new Dimension(1800, 1000));
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

  public static void initWebDriverEnv() {
    System.setProperty("webdriver.chrome.driver", getChromeWebDriverPath());
  }

  public static String getChromeWebDriverPath() {return "/Users/yoda31217/projects/niknik/betty/conf/chromedriver";}
}