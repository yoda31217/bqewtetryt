package data.parser;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import play.Logger;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import static net.htmlparser.jericho.CharacterReference.decodeCollapseWhiteSpace;
import static play.Logger.of;

public class LiveVolvoParser
  implements BParser {

  private static final Logger.ALogger LOG = of(LiveVolvoParser.class);
  private static final Charset UTF8 = Charset.forName("UTF-8");

  @Override
  public List<ParsedEvent> parse(byte[] input) {
    String documentPayload = new String(input, UTF8);
    Source doc = new Source(documentPayload);
    doc.fullSequentialParse();

    List<ParsedEvent> parsedEvents = new ArrayList<ParsedEvent>();
    for (Element eventEl : doc.getAllElementsByClass("vx__media-slat")) {
      parsedEvents.add(buildEvent(eventEl.getChildElements()));
    }
    LOG.debug("Parsed Events: {}", parsedEvents.size());

    return parsedEvents;
  }

  private ParsedEvent buildEvent(List<Element> eventElChildren) {
    List<Element> sideNameEls = eventElChildren.get(0).getAllElements("b");

    String firstSide = decodeCollapseWhiteSpace(sideNameEls.get(0).getContent());
    String secondSide = decodeCollapseWhiteSpace(sideNameEls.get(1).getContent());

    String firstKof = decodeCollapseWhiteSpace(eventElChildren.get(1).getChildElements().get(0).getContent());
    String secondKof = decodeCollapseWhiteSpace(eventElChildren.get(2).getChildElements().get(0).getContent());

    return new ParsedEvent(null, firstSide, secondSide, null, firstKof, secondKof);
  }
}