package models.data.parser;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.File;
import java.util.List;

import static models.web_driver.WebDriverKeeper.getChromeWebDriverPath;
import static org.fest.assertions.Assertions.assertThat;
import static org.openqa.selenium.remote.DesiredCapabilities.chrome;

@Ignore
public class LiveVolvoParser2Test {

  private static ChromeDriverService webDriverService;

  private LiveVolvoParser2 parser;
  private WebDriver webDriver;
  private List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass()
    throws Exception {
    File webDriverFile = new File(getChromeWebDriverPath());
    webDriverService = new ChromeDriverService.Builder().usingDriverExecutable(webDriverFile).usingAnyFreePort().build();
    webDriverService.start();
  }

  @AfterClass
  public static void afterClass()
    throws Exception {
    webDriverService.stop();
  }

  @Before
  public void before() {
    webDriver = new RemoteWebDriver(webDriverService.getUrl(), chrome());
    String url = getClass().getResource("/models/data/parser/LiveVolvoParser2Test/bet365 Sports.html").toString();

    parser = new LiveVolvoParser2(url, webDriver);
    parsedEvents = parser.parse(null);
  }

  @After
  public void after() {
    webDriver.quit();
  }

  @Test
  public void parse_events_returnWithData() {
    assertThat(parsedEvents).hasSize(6);
  }

  @Test
  public void parse_firstSideNotEmpty_returnWithFirstSide() {
    List<ParsedEvent> parsedEvents = parser.parse(null);
    assertThat(parsedEvents.get(0).firstSide).isEqualTo("GAEL MONFILS");
  }

  @Test
  public void parse_secondSideNotEmpty_returnWithSecondSide() {
    List<ParsedEvent> parsedEvents = parser.parse(null);
    assertThat(parsedEvents.get(0).secondSide).isEqualTo("FABIO FOGNINI");
  }

  @Test
  public void parse_sportDescr_returnTennis() {
    List<ParsedEvent> parsedEvents = parser.parse(null);
    assertThat(parsedEvents.get(0).sportDescr).isEqualTo("Tennis");
  }

  @Test
  public void parse_firstKofNotEmpty_returnWithFirstKof() {
    List<ParsedEvent> parsedEvents = parser.parse(null);
    assertThat(parsedEvents.get(0).firstKof).isEqualTo("21/20");
  }

  @Test
  public void parse_secondKofNotEmpty_returnWithSecondKof() {
    List<ParsedEvent> parsedEvents = parser.parse(null);
    assertThat(parsedEvents.get(0).secondKof).isEqualTo("7/10");
  }
}