package models.data.parser;

import models.util.SlowTestJUnit4Runner;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import static java.lang.System.getenv;
import static java.lang.System.setProperty;
import static models.util.Conditions.equalToAsString;
import static org.fest.assertions.Assertions.assertThat;

@RunWith(SlowTestJUnit4Runner.class)
public class RegularVolvoParserTest {

  private static List<ParsedEvent> parsedEvents;

  @BeforeClass
  public static void beforeClass() throws Exception {
    setProperty("webdriver.chrome.driver", getenv("WEB_DRIVER"));

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
    assertThat(parsedEvents.get(0)).is(equalToAsString(expectedParsedEvent));
  }

  @Test
  public void parse_realDoc_eventsSizeParsed() {
    assertThat(parsedEvents).hasSize(75);
  }
}