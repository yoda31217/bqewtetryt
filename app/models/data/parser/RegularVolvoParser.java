package models.data.parser;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Lists.transform;
import static org.openqa.selenium.By.cssSelector;

public class RegularVolvoParser
  implements BParser {

  public static final String SIDES_SEPARATOR = " v ";
  public static final Splitter SEDES_SPLITTER = Splitter.on(SIDES_SEPARATOR).trimResults().omitEmptyStrings();
  private static final Predicate<ParsedEvent> NOT_NULL_FILTER = new Predicate<ParsedEvent>() {
    @Override
    public boolean apply(@Nullable ParsedEvent parsedEvent) {
      return null != parsedEvent;
    }
  };
  private final String sportDescr;
  private final WebDriver webDriver;

  public RegularVolvoParser(String url, String sportDescr, WebDriver webDriver) {
    this.sportDescr = sportDescr;
    this.webDriver = webDriver;

    this.webDriver.get(url);
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  private static Function<WebElement, ParsedEvent> createElToEventTransformer(final String sportDescr) {
    return new Function<WebElement, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable WebElement eventEl) {
        String date = findElTextOrNull(eventEl, "td.c1", 0);
        if (null == date) return null;

        String sidesText = findElTextOrNull(eventEl, "td.c2 > a.ti > span", 0);
        if (null == sidesText) return null;

        ArrayList<String> sides = newArrayList(SEDES_SPLITTER.split(sidesText));
        if (2 > sides.size()) return null;

        String firstSide = sides.get(0);
        String secondSide = sides.get(1);

        String firstKof = findElTextOrNull(eventEl, "td.c4.ti.tis > a", 0);
        if (null == firstKof) return null;

        String secondKof = findElTextOrNull(eventEl, "td.c5.ti.tis > a", 0);
        if (null == secondKof) return null;

        return new ParsedEvent(sportDescr, firstSide, secondSide, date, firstKof, secondKof);
      }

    };
  }

  private static String findElTextOrNull(WebElement rootEl, String selector, int index) {
    List<WebElement> els = rootEl.findElements(cssSelector(selector));
    if (els.isEmpty() || els.size() <= index) return null;

    WebElement el = els.get(index);
    String text = el.getText();

    return isNullOrEmpty(text) ? null : text;
  }

  @Override
  public List<ParsedEvent> parse() {
    List<WebElement> eventEls = webDriver.findElements(cssSelector("div.cpn-body > table.tab-typ-h > tbody > tr.ti"));

    List<ParsedEvent> parsedEvents = transform(eventEls, createElToEventTransformer(sportDescr));
    return newArrayList(filter(parsedEvents, NOT_NULL_FILTER));
  }
}