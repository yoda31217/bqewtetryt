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
public class RegularVolvoParserTest {

  private static RegularVolvoParser parser;
  private static WebDriver         webDriver;
  private static List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass() throws Exception {
    initWebDriverEnv();

    webDriver = new ChromeDriver();
    String url = RegularVolvoParserTest.class.getResource("/models/data/parser/RegularVolvoParserTest/Tennis Full List - Match Coupon   bet365 Sports.html")
                                             .toString();

    parser = new RegularVolvoParser(url, "Tennis", webDriver);
    parsedEvents = parser.parse();
    webDriver.quit();
  }

  @Test
  public void parse_events_returnWithData() {
    assertThat(parsedEvents).hasSize(75);
  }

  @Test
  public void parse_dateNotEmpty_returnWithDate() {
    assertThat(parsedEvents.get(0).date).isEqualTo("14 Mar 22:30");
  }

  @Test
  public void parse_side1NotEmpty_returnWithSide1() {
    assertThat(parsedEvents.get(0).side1).isEqualTo("John Isner");
  }

  @Test
  public void parse_side2NotEmpty_returnWithSide2() {
    assertThat(parsedEvents.get(0).side2).isEqualTo("Ernests Gulbis");
  }

  @Test
  public void parse_sportDescr_returnTennis() {
    assertThat(parsedEvents.get(0).sportDescr).isEqualTo("Tennis");
  }

  @Test
  public void parse_lowKofNotEmpty_returnWithLowKof() {
    assertThat(parsedEvents.get(0).lowKof).isEqualTo("11/8");
  }

  @Test
  public void parse_highKofNotEmpty_returnWithHighKof() {
    assertThat(parsedEvents.get(0).highKof).isEqualTo("4/7");
  }
}