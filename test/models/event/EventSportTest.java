package models.event;

import org.junit.Test;

import static models.event.EventSport.BEACH_VOLLEYBALL;
import static models.event.EventSport.TENNIS;
import static models.event.EventSport.UNKNOWN;
import static models.event.EventSport.sportFromEngName;
import static org.fest.assertions.Assertions.assertThat;

public class EventSportTest {

  @Test
  public void sportFromEngName_beachVolleyballSportName_returnBeachVolleyball() {
    assertThat(sportFromEngName("Beach Volleyball")).isSameAs(BEACH_VOLLEYBALL);
  }

  @Test
  public void sportFromEngName_engSportName_returnSport() {
    assertThat(sportFromEngName("Tennis")).isSameAs(TENNIS);
  }

  @Test
  public void sportFromEngName_nullSportName_returnUnknown() {
    assertThat(sportFromEngName(null)).isSameAs(UNKNOWN);
  }

  @Test
  public void sportFromEngName_wrongEngSportName_returnUnknown() {
    assertThat(sportFromEngName("Wrong Eng Sport Name")).isSameAs(UNKNOWN);
  }

  //  @Test
  //  public void test1() {
  //    System.setProperty("webdriver.chrome.driver", System.getenv("WEB_DRIVER"));
  //
  //    ChromeOptions options = new ChromeOptions();
  //    options.addArguments(
  //      "--user-agent=Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53");
  //    ChromeDriver chromeDriver = new ChromeDriver(options);
  //
  //    LiveVolvoParser parser = new LiveVolvoParser(chromeDriver, "sport_13");
  //    List<ParsedEvent> parsedEvents = parser.parse();
  //          parsedEvents = parser.parse();
  //    //      parsedEvents = parser.parse();
  //    chromeDriver.close();
  //  }

  //  @Test
  //  public void test2() {
  //    System.setProperty("webdriver.chrome.driver", System.getenv("WEB_DRIVER"));
  //
  //    ChromeOptions options = new ChromeOptions();
  //    //    options.addArguments(
  //    //      "--user-agent=Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53");
  //    ChromeDriver chromeDriver = new ChromeDriver(options);
  //
  //    LiveKamazParser parser = new LiveKamazParser(chromeDriver);
  //    List<ParsedEvent> parsedEvents = parser.parse();
  //    //      parsedEvents = parser.parse();
  //    //      parsedEvents = parser.parse();
  //    chromeDriver.close();
  //  }

  //  @Test
  //  public void test3() {
  //    System.setProperty("webdriver.chrome.driver", System.getenv("WEB_DRIVER"));
  //
  //    ChromeOptions options = new ChromeOptions();
  //    ChromeDriver chromeDriver = new ChromeDriver(options);
  //
  //    LiveFordParser parser = new LiveFordParser(chromeDriver);
  //    List<ParsedEvent> parsedEvents = parser.parse();
  //          parsedEvents = parser.parse();
  //          parsedEvents = parser.parse();
  //    chromeDriver.close();
  //  }
}