package data.fetcher;

import org.openqa.selenium.firefox.FirefoxDriver;
import web_driver.WebDriverKeeper;

import java.nio.charset.Charset;

public class LiveMarathonFetcher
  implements BFetcher {

  public static final Charset UTF8 = Charset.forName("UTF-8");
  private final WebDriverKeeper webDriverKeeper;

  public LiveMarathonFetcher(WebDriverKeeper webDriverKeeper) {
    this.webDriverKeeper = webDriverKeeper;
  }

  @Override
  public byte[] fetch() {
    FirefoxDriver webDriver = webDriverKeeper.acquireMarathonDriver();
    try {
      String contentStr = webDriver.findElementByTagName("html").getAttribute("outerHTML");
      return contentStr.getBytes(UTF8);

    } finally {
      webDriverKeeper.releaseMarathonDriver();
    }
  }
}