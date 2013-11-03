package jobs;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import web_driver.LanosWebDriverKeeper;

public class LiveLanosSportSelectionJob
  implements Runnable {

  private final LanosWebDriverKeeper webDriverKeeper;

  public LiveLanosSportSelectionJob(LanosWebDriverKeeper webDriverKeeper) {
    this.webDriverKeeper = webDriverKeeper;
  }

  @Override
  public void run() {
    FirefoxDriver webDriver = webDriverKeeper.acquire();

    try {
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
}