package web_driver;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({FirefoxDriver.class, WebDriverKeeperTest.class, WebDriverKeeper.class})
public class WebDriverKeeperTest {

  @Mock
  private FirefoxDriver webDriverMock;
  private WebDriverKeeper keeper;

  @Before
  public void before()
    throws Exception {
    whenNew(FirefoxDriver.class).withNoArguments().thenReturn(webDriverMock);

    keeper = new WebDriverKeeper(10);

    verify(webDriverMock).get("http://www.marathonbet.com/en/live.htm");
  }

  @After
  public void after()
    throws Exception {

  }

  @Test
  public void acquireMarathonDriver()
    throws Exception {
    WebDriver driver = keeper.acquireMarathonDriver();

    assertThat(driver).isEqualTo(webDriverMock);
  }

  @Test
  public void secondAcquireTimeoutException()
    throws Exception {
    keeper.acquireMarathonDriver();

    try {
      keeper.acquireMarathonDriver();
      fail("Web Driver should be locked.");

    } catch (IllegalStateException e) {
      assertThat(e).hasMessage("Failed to acquire Marathon Web Driver.");
    }
  }

  @Test
  public void acquireReleaseAcquireTimeoutException()
    throws Exception {
    keeper.acquireMarathonDriver();
    keeper.releaseMarathonDriver();
    keeper.acquireMarathonDriver();
  }
}