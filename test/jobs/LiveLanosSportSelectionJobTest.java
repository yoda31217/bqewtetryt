package jobs;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.powermock.modules.junit4.PowerMockRunner;
import web_driver.LanosWebDriverKeeper;

import static com.google.common.collect.Lists.newArrayList;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.verifyNoMoreInteractions;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class LiveLanosSportSelectionJobTest {

  @Mock
  private FirefoxDriver webDriver;
  @Mock
  private LanosWebDriverKeeper webDriverKeeper;
  @Mock
  private WebElement selectedSportElement;
  @Mock
  private WebElement unselectedSportElement;
  @Mock
  private WebElement anotherSelectedSportElement;
  @Mock
  private WebElement showSelectionsButtonElement;

  @Before
  public void before() {
    when(webDriverKeeper.acquire()).thenReturn(webDriver);

    when(selectedSportElement.isSelected()).thenReturn(true);
    when(unselectedSportElement.isSelected()).thenReturn(false);
    when(anotherSelectedSportElement.isSelected()).thenReturn(true);

    when(webDriver.findElementByClassName("but-show")).thenReturn(showSelectionsButtonElement);
  }

  @After
  public void after() {
  }

  @Test
  public void runWithOneUnselectedSport() {
    when(webDriver.findElementsByClassName("group-selection")).thenReturn(newArrayList(selectedSportElement, unselectedSportElement,
      anotherSelectedSportElement));

    new LiveLanosSportSelectionJob(webDriverKeeper).run();

    verify(selectedSportElement, never()).click();
    verify(unselectedSportElement).click();
    verify(anotherSelectedSportElement, never()).click();

    verify(showSelectionsButtonElement).click();
  }

  @Test
  public void runWithAllSelectedSports() {
    when(webDriver.findElementsByClassName("group-selection")).thenReturn(newArrayList(selectedSportElement, anotherSelectedSportElement));

    new LiveLanosSportSelectionJob(webDriverKeeper).run();

    verify(selectedSportElement, never()).click();
    verify(anotherSelectedSportElement, never()).click();

    verify(showSelectionsButtonElement, never()).click();
  }

  @Test
  public void acquireAndRelease() {
    InOrder inOrder = inOrder(webDriverKeeper);
    when(webDriver.findElementsByClassName("group-selection")).thenThrow(new RuntimeException("Somme inner exception for testing purposes."));

    try {
      new LiveLanosSportSelectionJob(webDriverKeeper).run();
      fail("Should not get here. Should throw exception.");

    } catch (Exception skipped) {} finally {
      inOrder.verify(webDriverKeeper).acquire();
      inOrder.verify(webDriverKeeper).release();
      verifyNoMoreInteractions(webDriverKeeper);
    }
  }

  @Ignore
  @Test
  public void realRun() {
    //    FirefoxDriver webDriver = new WebDriverKeeper(100).acquireLanosDriver();
    //
    //    boolean uncheckedEventsFound = false;
    //
    //    for (WebElement element : webDriver.findElementsByClassName("group-selection")) {
    //      if (!element.isSelected()) {
    //        element.click();
    //        uncheckedEventsFound = true;
    //      }
    //    }
    //
    //    if (uncheckedEventsFound) webDriver.findElementByClassName("but-show").click();
  }
}