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
public class LiveVolvoParser2Test {

  private static LiveVolvoParser2 parser;
  private static WebDriver webDriver;
  private static List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass()
    throws Exception {
    initWebDriverEnv();

    webDriver = new ChromeDriver();
    String url = LiveVolvoParser2Test.class.getResource("/models/data/parser/LiveVolvoParser2Test/bet365 Sports.html").toString();

    parser = new LiveVolvoParser2(url, webDriver);
    parsedEvents = parser.parse();
    webDriver.quit();
  }

  @Test
  public void parse_events_returnWithData() {
    assertThat(parsedEvents).hasSize(6);
  }

  @Test
  public void parse_side1NotEmpty_returnWithSide1() {
    assertThat(parsedEvents.get(0).side1).isEqualTo("GAEL MONFILS");
  }

  @Test
  public void parse_side2NotEmpty_returnWithSide2() {
    assertThat(parsedEvents.get(0).side2).isEqualTo("FABIO FOGNINI");
  }

  @Test
  public void parse_sportDescr_returnTennis() {
    assertThat(parsedEvents.get(0).sportDescr).isEqualTo("Tennis");
  }

  @Test
  public void parse_lowKofNotEmpty_returnWithLowKof() {
    assertThat(parsedEvents.get(0).lowKof).isEqualTo("21/20");
  }

  @Test
  public void parse_highKofNotEmpty_returnWithHighKof() {
    assertThat(parsedEvents.get(0).highKof).isEqualTo("7/10");
  }
}