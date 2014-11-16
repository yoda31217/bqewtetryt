package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Splitter;
import com.google.common.io.Resources;
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

public class LiveVolvoParser2 implements BParser {

  private static final Splitter EVENT_SPLITTER      = Splitter.on("@#").omitEmptyStrings().trimResults();
  private static final Splitter EVENT_ATTR_SPLITTER = Splitter.on("^#").omitEmptyStrings().trimResults();
  private static final String EVENTS_FETCHER_JAVA_SCRIPT;
  private final        String sportSelectorJavaScript;

  static {
    try {
      URL javaScriptResource = getResource(LiveVolvoParser2.class, "LiveVolvoParser2.js");
      EVENTS_FETCHER_JAVA_SCRIPT = "return " + compressJavaScript(Resources.toString(javaScriptResource, CHARSET));

    } catch (IOException e) {
      throw new ExceptionInInitializerError(e);
    }
  }

  private final ChromeDriver webDriver;
  private final Timer        timerMetric;

  public LiveVolvoParser2(ChromeDriver webDriver, String sportCode, MetricRegistry metricRegistry) {
    this.webDriver = webDriver;

    this.webDriver.get("http://www.bet365.com/lite/#!in-play/overview/");
    this.webDriver.manage().window().setSize(new Dimension(50, 50));

    sportSelectorJavaScript = readSportSelectorJavaScript(sportCode);

    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  @Override
  public List<ParsedEvent> parse() {
    boolean isSportSelected = isSportSelectedAndSelectIfNeededAndPossible();

    if (!isSportSelected) {
      return emptyList();
    }

    Timer.Context timer = timerMetric.time();
    try {
      String eventsStr = (String) webDriver.executeScript(EVENTS_FETCHER_JAVA_SCRIPT);
      return parseEvents(eventsStr);

    } finally {
      timer.stop();
    }
  }

  private boolean isSportSelectedAndSelectIfNeededAndPossible() {
    return (boolean) webDriver.executeScript(sportSelectorJavaScript);
  }

  private void parseEvent(List<ParsedEvent> events, String eventStr) {
    List<String> eventAttrs = newArrayList(EVENT_ATTR_SPLITTER.split(eventStr));

    String date = null;
    String externalId = eventAttrs.get(0);
    String side1 = eventAttrs.get(1);
    String side2 = eventAttrs.get(2);
    String lowKof = eventAttrs.get(3);
    if ("SP".equals(lowKof)) return;
    String highKof = eventAttrs.get(4);
    if ("SP".equals(highKof)) return;

    events.add(new ParsedEvent(externalId, side1, side2, date, lowKof, highKof));
  }

  private List<ParsedEvent> parseEvents(String eventsStr) {
    List<ParsedEvent> events = newArrayList();

    for (String eventStr : EVENT_SPLITTER.split(eventsStr)) {
      parseEvent(events, eventStr);
    }
    return events;
  }

  private String readSportSelectorJavaScript(String sportCode) {
    try {
      URL javaScriptResource = getResource(LiveVolvoParser2.class, "LiveVolvoParser2SportSelector.js");
      String javaScript = Resources.toString(javaScriptResource, CHARSET);
      javaScript = javaScript.replace("SPORT_CODE", sportCode);
      return "return " + compressJavaScript(javaScript);

    } catch (Exception e) {
      throw new RuntimeException("Failed to read Java Script resource: LiveVolvoParser2SportSelector.js.");
    }
  }
}