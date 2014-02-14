package models.data.parser;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;
import play.Logger;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static com.google.common.base.Strings.isNullOrEmpty;
import static net.htmlparser.jericho.CharacterReference.decodeCollapseWhiteSpace;
import static play.Logger.of;

public class LiveVolvoParser
  implements BParser {

  public static final Pattern ACTIVE_SPORT_EL_PATTERN = Pattern.compile("Classification\\ssport_[0-9]+\\son");
  private static final Logger.ALogger LOG = of(LiveVolvoParser.class);
  private static final Charset UTF8 = Charset.forName("UTF-8");

  @Override
  public List<ParsedEvent> parse(byte[] input) {
    String documentPayload = new String(input, UTF8);
    Source doc = new Source(documentPayload);
    doc.fullSequentialParse();

    String sportDescr = parseSportDescr(doc);

    List<ParsedEvent> parsedEvents = new ArrayList<ParsedEvent>();
    for (Element eventEl : doc.getAllElements("class", "Fixture", true)) {
      ParsedEvent event = buildEvent(eventEl.getChildElements(), sportDescr);

      if (null == event) continue;

      parsedEvents.add(event);
    }
    //    LOG.debug("Parsed Events: {}", parsedEvents.size());

    return parsedEvents;
  }

  private String parseSportDescr(Source doc) {
    Element activeSportEl = doc.getFirstElement("class", ACTIVE_SPORT_EL_PATTERN);
    return decodeCollapseWhiteSpace(activeSportEl.getChildElements().get(1).getContent());
  }

  private ParsedEvent buildEvent(List<Element> eventElChildren, String sportDescr) {
    String firstSide = decodeCollapseWhiteSpace(eventElChildren.get(0).getFirstElement("class", "Row", true).getChildElements().get(1).getContent());
    String secondSide = decodeCollapseWhiteSpace(eventElChildren.get(0).getAllElements("class", "Row", true).get(1).getChildElements().get(1).getContent());

    if (2 > eventElChildren.get(1).getChildElements().size()) return null;

    Element firstKofContainer = eventElChildren.get(1).getChildElements().get(0);
    if (firstKofContainer.getChildElements().isEmpty()) return null;
    String firstKof = decodeCollapseWhiteSpace(firstKofContainer.getChildElements().get(1).getContent());
    if (isNullOrEmpty(firstKof)) return null;
    if ("SP".equalsIgnoreCase(firstKof)) return null;

    Element secondKofContainer = eventElChildren.get(1).getChildElements().get(1);
    if (secondKofContainer.getChildElements().isEmpty()) return null;
    String secondKof = decodeCollapseWhiteSpace(secondKofContainer.getChildElements().get(1).getContent());
    if (isNullOrEmpty(secondKof)) return null;
    if ("SP".equalsIgnoreCase(secondKof)) return null;

    return new ParsedEvent(sportDescr, firstSide, secondSide, null, firstKof, secondKof);
  }
}