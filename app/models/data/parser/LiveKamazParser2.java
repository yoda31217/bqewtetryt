package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Splitter;
import com.google.common.io.Resources;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.chrome.ChromeDriver;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import static com.codahale.metrics.MetricRegistry.name;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.io.Resources.getResource;
import static java.util.Collections.emptyList;
import static models.util.JavaScripts.compressJavaScript;
import static models.util.Texts.CHARSET;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;
import static org.joda.time.Duration.standardMinutes;

public class LiveKamazParser2 implements BParser {

  private static final Splitter EVENT_SPLITTER          = Splitter.on("@#").omitEmptyStrings().trimResults();
  private static final Splitter EVENT_ATTR_SPLITTER     = Splitter.on("^#").omitEmptyStrings().trimResults();
  private static final long     REFRESH_DELAY_IN_MILLIS = standardMinutes(10).getMillis();
  private static final String JAVA_SCRIPT;

  static {
    try {
      URL javaScriptResource = getResource(LiveKamazParser2.class, "LiveKamazParser2.js");
      JAVA_SCRIPT = "return " + compressJavaScript(Resources.toString(javaScriptResource, CHARSET));

    } catch (IOException e) {
      throw new ExceptionInInitializerError(e);
    }
  }

  private final    ChromeDriver webDriver;
  private volatile DateTime     lastRefreshDate;
  private final    Timer        timerMetric;

  public LiveKamazParser2(ChromeDriver webDriver, MetricRegistry metricRegistry) {
    this.webDriver = webDriver;

    this.webDriver.get("https://www.favbet.com/en/live/");

    Cookie langCookie = new Cookie("LANG", "en", "www.favbet.com", "/", now().plusYears(10).toDate());
    this.webDriver.manage().addCookie(langCookie);

    this.webDriver.get("https://www.favbet.com/en/live/");

    this.webDriver.manage().window().setSize(new Dimension(50, 50));

    this.lastRefreshDate = now(UTC);
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  @Override
  public List<ParsedEvent> parse() {
    if (refreshIfNeeded()) {
      return emptyList();
    }

    Timer.Context timer = timerMetric.time();
    try {
      String eventsStr = (String) webDriver.executeScript(JAVA_SCRIPT);
      return parseEvents(eventsStr);

    } finally {
      timer.stop();
    }
  }

  private void parseEvent(List<ParsedEvent> events, String eventStr) {
    List<String> eventAttrs = newArrayList(EVENT_ATTR_SPLITTER.split(eventStr));

    String date = null;
    String externalId = eventAttrs.get(0);
    String side1 = eventAttrs.get(1);
    String side2 = eventAttrs.get(2);
    String lowKof = eventAttrs.get(3);
    String highKof = eventAttrs.get(4);
    String sport = eventAttrs.get(5);

    events.add(new ParsedEvent(externalId, sport, side1, side2, date, lowKof, highKof));
  }

  private List<ParsedEvent> parseEvents(String eventsStr) {
    List<ParsedEvent> events = newArrayList();

    for (String eventStr : EVENT_SPLITTER.split(eventsStr)) {
      parseEvent(events, eventStr);
    }
    return events;
  }

  private boolean refreshIfNeeded() {
    DateTime now = now(UTC);
    boolean isRefreshNeeded = REFRESH_DELAY_IN_MILLIS <= new Duration(lastRefreshDate, now).getMillis();

    if (isRefreshNeeded) {
      webDriver.navigate().refresh();
      lastRefreshDate = now;
    }
    return isRefreshNeeded;
  }
}