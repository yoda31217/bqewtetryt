package jobs;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import web_driver.WebDriverKeeper;

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