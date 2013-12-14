package data.fetcher;

import org.openqa.selenium.chrome.ChromeDriver;
import web_driver.WebDriverKeeper;

import java.nio.charset.Charset;

public class LiveFetcher
  implements BFetcher {

  public static final Charset UTF8 = Charset.forName("UTF-8");
  private final WebDriverKeeper webDriverKeeper;

  public LiveFetcher(WebDriverKeeper webDriverKeeper) {
    this.webDriverKeeper = webDriverKeeper;
  }

  @Override
  public byte[] fetch() {
    ChromeDriver webDriver = webDriverKeeper.acquire();
    try {
      String contentStr = webDriver.findElementByTagName("html").getAttribute("outerHTML");
      return contentStr.getBytes(UTF8);

    } finally {
      webDriverKeeper.release();
    }
  }
}