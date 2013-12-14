package data.adapter;

import com.google.common.base.Splitter;
import data.parser.ParsedEvent;
import data.side.SideCoder;

import java.util.Date;
import java.util.Iterator;

import static java.lang.Double.parseDouble;
import static models.store.EventType.LIVE;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;

public class LiveVolvoAdapter
  implements BAdapter {

  public static final Splitter KOF_SPLITTER = Splitter.on("/").omitEmptyStrings().trimResults();
  private final SideCoder sideCoder;

  public LiveVolvoAdapter(SideCoder sideCoder) {
    this.sideCoder = sideCoder;
  }

  @Override
  public AdaptedEvent adapt(ParsedEvent parsedEvent) {
    String firstSide = parsedEvent.firstSide;
    String secondSide = parsedEvent.secondSide;

    double firstKof = adaptKof(parsedEvent.firstKof);
    double secondKof = adaptKof(parsedEvent.secondKof);

    if (firstKof > secondKof) {
      double swapKof = firstKof;
      firstKof = secondKof;
      secondKof = swapKof;

      String swapSide = firstSide;
      firstSide = secondSide;
      secondSide = swapSide;
    }

    String firstSideCode = sideCoder.buildCode(firstSide);
    String secondSideCode = sideCoder.buildCode(secondSide);

    AdaptedEvent adoptedEvent = new AdaptedEvent(LIVE, TENNIS, firstSide, secondSide, firstKof, secondKof, VOLVO, new Date(), firstSideCode, secondSideCode);
    return adoptedEvent;
  }

  private double adaptKof(String kofStr) {
    Iterator<String> kofParts = KOF_SPLITTER.split(kofStr).iterator();
    return 1 + parseDouble(kofParts.next()) / parseDouble(kofParts.next());
  }
}