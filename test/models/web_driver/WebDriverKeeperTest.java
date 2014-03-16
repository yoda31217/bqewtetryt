package models.web_driver;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({FirefoxDriver.class, WebDriverKeeperTest.class, WebDriverKeeper.class})
public class WebDriverKeeperTest {

  @Mock
  private ChromeDriver    webDriverMock;
  private WebDriverKeeper keeper;

  @Before
  public void before() throws Exception {
    whenNew(ChromeDriver.class).withNoArguments().thenReturn(webDriverMock);

    WebDriver.Options optionsMock = mock(WebDriver.Options.class);
    doReturn(optionsMock).when(webDriverMock).manage();
    WebDriver.Window windowMock = mock(WebDriver.Window.class);
    doReturn(windowMock).when(optionsMock).window();

    String url = "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/live.htm";
    keeper = new WebDriverKeeper(10, url);

    verify(webDriverMock).get(url);
    verify(windowMock).setSize(Matchers.refEq(new Dimension(1800, 1000)));
  }

  @After
  public void after() throws Exception {

  }

  @Test
  public void acquireLanosDriver() throws Exception {
    WebDriver driver = keeper.acquire();

    assertThat(driver).isEqualTo(webDriverMock);
  }

  @Test
  public void secondAcquireTimeoutException() throws Exception {
    keeper.acquire();

    try {
      keeper.acquire();
      fail("Web Driver should be locked.");

    } catch (IllegalStateException e) {
      assertThat(e).hasMessage("Failed to acquire Lanos Web Driver.");
    }
  }

  @Test
  public void acquireReleaseAcquire() throws Exception {
    keeper.acquire();
    keeper.release();
    keeper.acquire();
  }
}