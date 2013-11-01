package data.parser;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import play.Logger;

import javax.annotation.Nullable;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Collections2.transform;
import static com.google.common.collect.Lists.newArrayList;
import static net.htmlparser.jericho.CharacterReference.decodeCollapseWhiteSpace;
import static play.Logger.of;

public class Bet365Parser
  implements BParser {

  private static final Logger.ALogger LOG = of(Bet365Parser.class);
  private static final Charset UTF8 = Charset.forName("UTF-8");
  private static final Splitter EVENT_TITLE_SPLITTER = Splitter.on(" v ").trimResults();

  @Override
  public List<ParsedEvent> parse(byte[] input) {
    String documentPayload = new String(input, UTF8);
    Source doc = new Source(documentPayload);
    List<Element> eventEls = doc.getAllElementsByClass("ti");

    Collection<Element> filteredEventEls = filter(eventEls, new Predicate<Element>() {
      @Override
      public boolean apply(@Nullable Element eventEl) {
        return "tr".equals(eventEl.getName());
      }
    });

    Collection<ParsedEvent> parsedEvents = transform(filteredEventEls, new Function<Element, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable Element eventEl) {
        return buildEvent(eventEl.getChildElements());
      }
    });

    LOG.debug("Parsed Events: {}", parsedEvents.size());

    return newArrayList(parsedEvents);
  }

  private ParsedEvent buildEvent(List<Element> eventElChildren) {
    String date = decodeCollapseWhiteSpace(eventElChildren.get(0).getContent());

    String eventTitle = decodeCollapseWhiteSpace(eventElChildren.get(1).getChildElements().get(0).getChildElements().get(0).getContent());

    Iterator<String> sideNames = EVENT_TITLE_SPLITTER.split(eventTitle).iterator();

    String firstSide = sideNames.next();
    String secondSide = sideNames.next();

    String firstKof = decodeCollapseWhiteSpace(eventElChildren.get(3).getChildElements().get(0).getContent());
    String secondKof = decodeCollapseWhiteSpace(eventElChildren.get(4).getChildElements().get(0).getContent());

    return new ParsedEvent("TENNIS", firstSide, secondSide, date, firstKof, secondKof);
  }
}