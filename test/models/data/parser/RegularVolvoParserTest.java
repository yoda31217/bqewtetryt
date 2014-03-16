package models.data.parser;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import static models.util.Conditions.isEqualToAsString;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static org.fest.assertions.Assertions.assertThat;

public class RegularVolvoParserTest {

  private static List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass() throws Exception {
    initWebDriverEnv();

    WebDriver webDriver = new ChromeDriver();
    String url = RegularVolvoParserTest.class.getResource("/models/data/parser/RegularVolvoParserTest/Tennis Full List - Match Coupon   bet365 Sports.html")
                                             .toString();

    RegularVolvoParser parser = new RegularVolvoParser(url, webDriver);
    parsedEvents = parser.parse();
    webDriver.quit();
  }

  @Test
  public void parse_realDoc_eventAttrsParsed() {
    ParsedEvent expectedParsedEvent = new ParsedEvent("John Isner", "Ernests Gulbis", "14 Mar 22:30", "11/8", "4/7");
    assertThat(parsedEvents.get(0)).is(isEqualToAsString(expectedParsedEvent));
  }

  @Test
  public void parse_realDoc_eventsSizeParsed() {
    assertThat(parsedEvents).hasSize(75);
  }
}