package models.data.parser;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static org.fest.assertions.Assertions.assertThat;

@Ignore
public class LiveLanosParser2Test {

  private static LiveLanosParser2 parser;
  private static WebDriver webDriver;
  private static List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass()
    throws Exception {
    initWebDriverEnv();
    webDriver = new ChromeDriver();
    String url = LiveLanosParser2Test.class.getResource(
      "/models/data/parser/LiveLanosParser2Test/Live betting   Sportsbook and online sports betting from MARATHON.html").toString();

    parser = new LiveLanosParser2(url, webDriver);
    parsedEvents = parser.parse();

    webDriver.quit();
  }

  @Test
  public void parse_events_returnWithData() {
    assertThat(parsedEvents).hasSize(17);
  }

  @Test
  public void parse_side1NotEmpty_returnWithSide1() {
    assertThat(parsedEvents.get(0).side1).isEqualTo("Flamengo");
  }

  @Test
  public void parse_side2NotEmpty_returnWithSide2() {
    assertThat(parsedEvents.get(0).side2).isEqualTo("Limeira");
  }

  @Test
  public void parse_sportDescr_returnTennis() {
    assertThat(parsedEvents.get(0).sportDescr).startsWith("Basketball");
  }

  @Test
  public void parse_firstKofNotEmpty_returnWithFirstKof() {
    assertThat(parsedEvents.get(0).firstKof).isEqualTo("1/25");
  }

  @Test
  public void parse_secondKofNotEmpty_returnWithSecondKof() {
    assertThat(parsedEvents.get(0).secondKof).isEqualTo("19/2");
  }
}