package models.job;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LiveLanosSportSelectionJob
  implements Runnable {

  private final ChromeDriver webDriver;

  public LiveLanosSportSelectionJob(ChromeDriver webDriver) {
    this.webDriver = webDriver;
  }

  @Override
  public void run() {
    scrollToTop(webDriver);

    boolean uncheckedEventsFound = false;

    for (WebElement element : webDriver.findElementsByClassName("group-selection")) {
      if (!element.isSelected()) {
        element.click();
        uncheckedEventsFound = true;
      }
    }

    if (uncheckedEventsFound) webDriver.findElementByClassName("but-show").click();
  }

  private void scrollToTop(ChromeDriver webDriver) {webDriver.executeScript("document.getElementById(\"body_content\").scrollByLines(-1000000)");}
}