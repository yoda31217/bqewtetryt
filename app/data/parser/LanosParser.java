package data.parser;

import com.google.common.base.Function;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import play.Logger;

import javax.annotation.Nullable;
import java.nio.charset.Charset;
import java.util.List;

import static com.google.common.collect.Lists.transform;
import static net.htmlparser.jericho.CharacterReference.decodeCollapseWhiteSpace;
import static play.Logger.of;

public class LanosParser
  implements BParser {

  private static final Logger.ALogger LOG = of(LanosParser.class);
  private static final Charset UTF8 = Charset.forName("UTF-8");

  @Override
  public List<ParsedEvent> parse(byte[] input) {
    String documentPayload = new String(input, UTF8);
    Source doc = new Source(documentPayload);
    List<Element> eventEls = doc.getAllElementsByClass("event-header");

    List<ParsedEvent> parsedEvents = transform(eventEls, new Function<Element, ParsedEvent>() {

      @Nullable
      @Override
      public ParsedEvent apply(@Nullable Element eventEl) {
        return buildEvent(eventEl.getChildElements());
      }
    });

    LOG.debug("Parsed Events: {}", parsedEvents.size());

    return parsedEvents;
  }

  private ParsedEvent buildEvent(List<Element> eventElChildren) {
    Element nameEl = eventElChildren.get(0);

    String date = decodeCollapseWhiteSpace(nameEl.getFirstElementByClass("date").getContent());

    List<Element> sideNameEls = nameEl.getAllElementsByClass("today-member-name");
    if (0 == sideNameEls.size()) sideNameEls = nameEl.getAllElementsByClass("member-name");

    String firstSide = decodeCollapseWhiteSpace(sideNameEls.get(0).getContent());
    String secondSide = decodeCollapseWhiteSpace(sideNameEls.get(1).getContent());

    String firstKof = decodeCollapseWhiteSpace(eventElChildren.get(1).getChildElements().get(0).getContent());
    String secondKof = decodeCollapseWhiteSpace(eventElChildren.get(2).getChildElements().get(0).getContent());

    return new ParsedEvent("TENNIS", firstSide, secondSide, date, firstKof, secondKof);
  }
}
