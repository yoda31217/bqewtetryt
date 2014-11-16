package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Splitter;
import com.google.common.io.Resources;
import org.joda.time.DateTime;
import org.joda.time.Duration;
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

public class LiveFordParser2 implements BParser {

  private static final Splitter EVENT_SPLITTER          = Splitter.on("@#").omitEmptyStrings().trimResults();
  private static final Splitter EVENT_ATTR_SPLITTER     = Splitter.on("^#").omitEmptyStrings().trimResults();
  private static final long     REFRESH_DELAY_IN_MILLIS = standardMinutes(10).getMillis();
  private static final String JAVA_SCRIPT;

  static {
    try {
      URL javaScriptResource = getResource(LiveFordParser2.class, "LiveFordParser2.js");
      JAVA_SCRIPT = "return " + compressJavaScript(Resources.toString(javaScriptResource, CHARSET));

    } catch (IOException e) {
      throw new ExceptionInInitializerError(e);
    }
  }

  private final    ChromeDriver webDriver;
  private volatile DateTime     lastRefreshDate;
  private final    Timer        timerMetric;

  public LiveFordParser2(ChromeDriver webDriver, MetricRegistry metricRegistry) {
    this.webDriver = webDriver;

    this.webDriver.get("http://sports.williamhill.com/bet/en-gb/betlive/all");
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

    String externalIdStr = eventAttrs.get(0);
    String[] externalIdStrParts = externalIdStr.split("_");

    String externalId = externalIdStrParts[externalIdStrParts.length - 1];

    String sidesStr = eventAttrs.get(1);
    String[] sides = sidesStr.split("( v | @ )");
    if (2 > sides.length) return;

    String side1 = sides[0];
    String side2 = sides[1];

    String lowKof = eventAttrs.get(2);
    if ("EVS".equals(lowKof)) return;

    String highKof = eventAttrs.get(3);
    if ("EVS".equals(highKof)) return;

    String sport = eventAttrs.get(4);

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