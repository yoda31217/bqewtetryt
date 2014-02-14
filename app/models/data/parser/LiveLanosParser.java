package models.data.parser;

import com.google.common.base.Function;
import com.google.common.base.Predicate;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import play.Logger;

import javax.annotation.Nullable;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.transform;
import static net.htmlparser.jericho.CharacterReference.decodeCollapseWhiteSpace;
import static play.Logger.of;

public class LiveLanosParser
  implements BParser {

  public static final Predicate<ParsedEvent> NOT_NULL_EVENT_FILTER = new Predicate<ParsedEvent>() {
    @Override
    public boolean apply(@Nullable ParsedEvent event) {
      return null != event;
    }
  };
  private static final Logger.ALogger LOG = of(LiveLanosParser.class);
  private static final Charset UTF8 = Charset.forName("UTF-8");

  @Override
  public List<ParsedEvent> parse(byte[] input) {
    String documentPayload = new String(input, UTF8);
    Source doc = new Source(documentPayload);
    doc.fullSequentialParse();

    List<ParsedEvent> parsedEvents = new ArrayList<ParsedEvent>();

    Element rootEl = doc.getElementById("container_EVENTS");
    for (Element eventBlockSportDescrEl : rootEl.getAllElementsByClass("opened-live-event")) {

      String sportDescr = decodeCollapseWhiteSpace(eventBlockSportDescrEl.getContent());
      sportDescr = sportDescr.replaceAll("\\<.*?\\>", "").trim();

      Element eventBlockEl = eventBlockSportDescrEl.getParentElement();
      List<Element> eventEls = eventBlockEl.getAllElementsByClass("event-header");

      parsedEvents.addAll(filter(transform(eventEls, createElToEventTransformer(sportDescr)), NOT_NULL_EVENT_FILTER));
    }

    //    LOG.debug("Parsed Events: {}", parsedEvents.size());

    return parsedEvents;
  }

  private Function<Element, ParsedEvent> createElToEventTransformer(final String sportDescr) {
    return new Function<Element, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable Element eventEl) {
        return transformToEvent(sportDescr, eventEl.getChildElements());
      }
    };
  }

  private ParsedEvent transformToEvent(String sportDescr, List<Element> eventElChildren) {
    Element nameEl = eventElChildren.get(0);

    List<Element> sideNameEls = nameEl.getAllElementsByClass("live-today-member-name");

    String firstSide = decodeCollapseWhiteSpace(sideNameEls.get(0).getContent());
    String secondSide = decodeCollapseWhiteSpace(sideNameEls.get(1).getContent());

    String firstKof = decodeCollapseWhiteSpace(eventElChildren.get(1).getChildElements().get(0).getContent());
    if (isNullOrEmpty(firstKof)) return null;

    String secondKof = decodeCollapseWhiteSpace(eventElChildren.get(2).getChildElements().get(0).getContent());
    if (isNullOrEmpty(secondKof)) return null;

    return new ParsedEvent(sportDescr, firstSide, secondSide, null, firstKof, secondKof);
  }
}