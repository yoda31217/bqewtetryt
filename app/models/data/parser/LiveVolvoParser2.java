package models.data.parser;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import javax.annotation.Nullable;
import java.util.Collection;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Lists.transform;
import static java.util.Collections.EMPTY_LIST;
import static org.openqa.selenium.By.cssSelector;

public class LiveVolvoParser2
  implements BParser {

  private static final Predicate<ParsedEvent> NOT_NULL_FILTER = new Predicate<ParsedEvent>() {
    @Override
    public boolean apply(@Nullable ParsedEvent parsedEvent) {
      return null != parsedEvent;
    }
  };

  private final WebDriver webDriver;

  public LiveVolvoParser2(String url, WebDriver webDriver) {
    this.webDriver = webDriver;

    this.webDriver.get(url);
    this.webDriver.manage().window().setSize(new Dimension(1800, 1000));
  }

  private static Function<WebElement, ParsedEvent> createElToEventTransformer(final String sportDescr) {
    return new Function<WebElement, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable WebElement eventEl) {
        String side1 = findElTextOrNull(eventEl, ".RowContainer .Row .teams", 0);
        if (null == side1) return null;

        String side2 = findElTextOrNull(eventEl, ".RowContainer .Row .teams", 1);
        if (null == side2) return null;

        String lowKof = findElTextOrNull(eventEl, ".OverviewMarket .Participant .Odds", 0);
        if (null == lowKof) return null;

        String highKof = findElTextOrNull(eventEl, ".OverviewMarket .Participant .Odds", 1);
        if (null == highKof) return null;

        return new ParsedEvent(sportDescr, side1, side2, null, lowKof, highKof);
      }

    };
  }

  public static String findElTextOrNull(WebElement rootEl, String selector, int index) {
    List<WebElement> els = rootEl.findElements(cssSelector(selector));
    if (els.isEmpty() || els.size() <= index) return null;

    WebElement el = els.get(index);
    String text = el.getText();

    return isNullOrEmpty(text) ? null : text;
  }

  @Override
  public List<ParsedEvent> parse() {
    List<WebElement> sportDescrEls = webDriver.findElements(cssSelector(".ClassificationMenu .Classification.on span.title"));
    if (sportDescrEls.isEmpty()) return EMPTY_LIST;

    String sportDescr = sportDescrEls.get(0).getText();

    List<WebElement> eventEls = webDriver.findElements(cssSelector(".Overview .FixtureList .Fixture"));

    Collection<ParsedEvent> parsedEvents = transform(eventEls, createElToEventTransformer(sportDescr));
    return newArrayList(filter(parsedEvents, NOT_NULL_FILTER));
  }
}