package data.fetcher;

import org.openqa.selenium.firefox.FirefoxDriver;
import web_driver.LanosWebDriverKeeper;

import java.nio.charset.Charset;

public class LiveLanosFetcher
  implements BFetcher {

  public static final Charset UTF8 = Charset.forName("UTF-8");
  private final LanosWebDriverKeeper webDriverKeeper;

  public LiveLanosFetcher(LanosWebDriverKeeper webDriverKeeper) {
    this.webDriverKeeper = webDriverKeeper;
  }

  @Override
  public byte[] fetch() {
    FirefoxDriver webDriver = webDriverKeeper.acquire();
    try {
      String contentStr = webDriver.findElementByTagName("html").getAttribute("outerHTML");
      return contentStr.getBytes(UTF8);

    } finally {
      webDriverKeeper.release();
    }
  }
}