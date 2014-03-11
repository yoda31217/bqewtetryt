package models.job;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.powermock.modules.junit4.PowerMockRunner;

import static com.google.common.collect.Lists.newArrayList;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class LiveLanosSportSelectionJobTest {

  @Mock
  private ChromeDriver webDriverMock;
  @Mock
  private WebElement selectedSportElementMock;
  @Mock
  private WebElement unselectedSportElementMock;
  @Mock
  private WebElement anotherSelectedSportElementMock;
  @Mock
  private WebElement showSelectionsButtonElementMock;

  @Before
  public void before() {
    when(selectedSportElementMock.isSelected()).thenReturn(true);
    when(unselectedSportElementMock.isSelected()).thenReturn(false);
    when(anotherSelectedSportElementMock.isSelected()).thenReturn(true);

    when(webDriverMock.findElementByClassName("but-show")).thenReturn(showSelectionsButtonElementMock);
  }

  @After
  public void after() {
  }

  @Test
  public void runWithOneUnselectedSport() {
    when(webDriverMock.findElementsByClassName("group-selection")).thenReturn(newArrayList(selectedSportElementMock, unselectedSportElementMock,
      anotherSelectedSportElementMock));

    new LiveLanosSportSelectionJob(webDriverMock).run();

    verify(selectedSportElementMock, never()).click();
    verify(unselectedSportElementMock).click();
    verify(anotherSelectedSportElementMock, never()).click();

    verify(showSelectionsButtonElementMock).click();
  }

  @Test
  public void runWithAllSelectedSports() {
    when(webDriverMock.findElementsByClassName("group-selection")).thenReturn(newArrayList(selectedSportElementMock, anotherSelectedSportElementMock));

    new LiveLanosSportSelectionJob(webDriverMock).run();

    verify(selectedSportElementMock, never()).click();
    verify(anotherSelectedSportElementMock, never()).click();

    verify(showSelectionsButtonElementMock, never()).click();
  }

  @Test
  public void run_always_pageUpPressed() {
    new LiveLanosSportSelectionJob(webDriverMock).run();
    verify(webDriverMock).executeScript("document.getElementById(\"body_content\").scrollByLines(-1000000)");
  }

  @Ignore
  @Test
  public void realRun() {
    //    FirefoxDriver webDriverMock = new WebDriverKeeper(100).acquireLanosDriver();
    //
    //    boolean uncheckedEventsFound = false;
    //
    //    for (WebElement element : webDriverMock.findElementsByClassName("group-selection")) {
    //      if (!element.isSelected()) {
    //        element.click();
    //        uncheckedEventsFound = true;
    //      }
    //    }
    //
    //    if (uncheckedEventsFound) webDriverMock.findElementByClassName("but-show").click();
  }
}