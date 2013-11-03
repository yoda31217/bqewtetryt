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
@PrepareForTest({FirefoxDriver.class, LanosWebDriverKeeperTest.class, LanosWebDriverKeeper.class})
public class LanosWebDriverKeeperTest {

  @Mock
  private FirefoxDriver webDriverMock;
  private LanosWebDriverKeeper keeper;

  @Before
  public void before()
    throws Exception {
    whenNew(FirefoxDriver.class).withNoArguments().thenReturn(webDriverMock);

    keeper = new LanosWebDriverKeeper(10);

    verify(webDriverMock).get("http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/live.htm");
  }

  @After
  public void after()
    throws Exception {

  }

  @Test
  public void acquireLanosDriver()
    throws Exception {
    WebDriver driver = keeper.acquire();

    assertThat(driver).isEqualTo(webDriverMock);
  }

  @Test
  public void secondAcquireTimeoutException()
    throws Exception {
    keeper.acquire();

    try {
      keeper.acquire();
      fail("Web Driver should be locked.");

    } catch (IllegalStateException e) {
      assertThat(e).hasMessage("Failed to acquire Lanos Web Driver.");
    }
  }

  @Test
  public void acquireReleaseAcquire()
    throws Exception {
    keeper.acquire();
    keeper.release();
    keeper.acquire();
  }
}