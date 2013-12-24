package models.job;

import models.web_driver.WebDriverKeeper;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LiveLanosSportSelectionJob
  implements Runnable {

  private final WebDriverKeeper webDriverKeeper;

  public LiveLanosSportSelectionJob(WebDriverKeeper webDriverKeeper) {
    this.webDriverKeeper = webDriverKeeper;
  }

  @Override
  public void run() {
    ChromeDriver webDriver = webDriverKeeper.acquire();

    try {
      scrollToTop(webDriver);

      boolean uncheckedEventsFound = false;

      for (WebElement element : webDriver.findElementsByClassName("group-selection")) {
        if (!element.isSelected()) {
          element.click();
          uncheckedEventsFound = true;
        }
      }

      if (uncheckedEventsFound) webDriver.findElementByClassName("but-show").click();

    } finally {
      webDriverKeeper.release();
    }
  }

  private void scrollToTop(ChromeDriver webDriver) {webDriver.executeScript("document.getElementById(\"body_content\").scrollByLines(-1000000)");}
}