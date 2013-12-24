package models.data.fetcher;

import models.web_driver.WebDriverKeeper;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.nio.charset.Charset;

import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({})
public class LiveFetcherTest {

  public static final String OUTER_HTML_TEXT = "OUTER_HTML_TEXT";
  public static final Charset UTF8 = Charset.forName("UTF-8");
  @Mock
  private ChromeDriver webDriverMock;
  @Mock
  private WebDriverKeeper webDriverKeeperMock;
  @Mock
  private WebElement webElementMock;

  @Before
  public void before()
    throws Exception {
    when(webDriverKeeperMock.acquire()).thenReturn(webDriverMock);
    when(webDriverMock.findElementByTagName("html")).thenReturn(webElementMock);
    when(webElementMock.getAttribute("outerHTML")).thenReturn(OUTER_HTML_TEXT);
  }

  @Test
  public void fetch()
    throws Exception {
    LiveFetcher fetcher = new LiveFetcher(webDriverKeeperMock);

    byte[] fetchResult = fetcher.fetch();

    assertThat(fetchResult).isEqualTo(OUTER_HTML_TEXT.getBytes(UTF8));

    verify(webDriverKeeperMock).acquire();
    verify(webDriverKeeperMock).release();
  }

  @Test
  @Ignore
  public void fetchRealData()
    throws Exception {
    LiveFetcher fetcher = new LiveFetcher(new WebDriverKeeper(10L,
      "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/live.htm"));
    fetcher.fetch();
  }
}