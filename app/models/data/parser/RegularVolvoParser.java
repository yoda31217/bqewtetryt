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

public class RegularVolvoParser implements BParser {

  private static final Splitter SIDES_SPLITTER = Splitter.on(" v ").trimResults().omitEmptyStrings();
  private final WebDriver webDriver;

  public RegularVolvoParser(String url, WebDriver webDriver) {
    this.webDriver = webDriver;

    this.webDriver.get(url);
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  @Override
  public List<ParsedEvent> parse() {
    List<WebElement> eventEls = webDriver.findElements(cssSelector("div.cpn-body > table.tab-typ-h > tbody > tr.ti"));

    List<ParsedEvent> parsedEvents = transform(eventEls, createElToEventTransformer());
    return newArrayList(filter(parsedEvents, createNullEventFilter()));
  }

  private Function<WebElement, ParsedEvent> createElToEventTransformer() {
    return new Function<WebElement, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable WebElement eventEl) {
        String date = findElTextOrNull(eventEl, "td.c1", 0);
        if (null == date) return null;

        String sidesText = findElTextOrNull(eventEl, "td.c2 > a.ti > span", 0);
        if (null == sidesText) return null;

        ArrayList<String> sides = newArrayList(SIDES_SPLITTER.split(sidesText));
        if (2 > sides.size()) return null;

        String side1 = sides.get(0);
        String side2 = sides.get(1);

        String lowKof = findElTextOrNull(eventEl, "td.c4.ti.tis > a", 0);
        if (null == lowKof) return null;

        String highKof = findElTextOrNull(eventEl, "td.c5.ti.tis > a", 0);
        if (null == highKof) return null;

        return new ParsedEvent(side1, side2, date, lowKof, highKof);
      }

    };
  }

  private Predicate<ParsedEvent> createNullEventFilter() {
    return new Predicate<ParsedEvent>() {
      @Override
      public boolean apply(@Nullable ParsedEvent parsedEvent) {
        return null != parsedEvent;
      }
    };
  }

  private String findElTextOrNull(WebElement rootEl, String selector, int index) {
    List<WebElement> els = rootEl.findElements(cssSelector(selector));
    if (els.isEmpty() || els.size() <= index) return null;

    WebElement el = els.get(index);
    String text = el.getText();

    return isNullOrEmpty(text) ? null : text;
  }
}