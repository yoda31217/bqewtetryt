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
  public void parse_firstSideNotEmpty_returnWithFirstSide() {
    assertThat(parsedEvents.get(0).firstSide).isEqualTo("GAEL MONFILS");
  }

  @Test
  public void parse_secondSideNotEmpty_returnWithSecondSide() {
    assertThat(parsedEvents.get(0).secondSide).isEqualTo("FABIO FOGNINI");
  }

  @Test
  public void parse_sportDescr_returnTennis() {
    assertThat(parsedEvents.get(0).sportDescr).isEqualTo("Tennis");
  }

  @Test
  public void parse_firstKofNotEmpty_returnWithFirstKof() {
    assertThat(parsedEvents.get(0).firstKof).isEqualTo("21/20");
  }

  @Test
  public void parse_secondKofNotEmpty_returnWithSecondKof() {
    assertThat(parsedEvents.get(0).secondKof).isEqualTo("7/10");
  }
}