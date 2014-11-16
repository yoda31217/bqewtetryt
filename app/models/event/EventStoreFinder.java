package models.event;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.Period;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static com.codahale.metrics.MetricRegistry.name;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static java.lang.Math.max;
import static org.apache.commons.lang3.StringUtils.getLevenshteinDistance;
import static org.apache.commons.lang3.StringUtils.stripAccents;

public class EventStoreFinder {

  private static final Splitter PLAYER_NAME_SPLITTER = Splitter.on(Pattern.compile("[^a-z]+")).omitEmptyStrings();
  private static final Duration ALLOWED_DURATION     = new Period().withHours(4).toStandardDuration();
  private final List<Event> events;
  private final Timer       timerMetric;

  public EventStoreFinder(List<Event> events, MetricRegistry metricRegistry) {
    this.events = events;
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
  }

  Event findEvent(EventType type, EventSport sport, DateTime date, List<String> side1, List<String> side2) {
    Timer.Context context = timerMetric.time();
    try {
      return doFindEvent(type, sport, date, side1, side2);

    } finally {
      context.stop();
    }
  }

  private boolean areDatesSimilar(DateTime date, Event event) {
    Duration currentDuration = date.isBefore(event.date) ? new Duration(date, event.date) : new Duration(event.date, date);
    return currentDuration.compareTo(ALLOWED_DURATION) <= 0;
  }

  private boolean areTypeAndSportEqual(EventType type, EventSport sport, Event event) {return event.type.equals(type) && event.sport.equals(sport);}

  private int calculatePlayerSimilarity(String player, String eventPlayer) {
    List<String> normalizedEventPlayerParts = normalizePlayer(eventPlayer);
    List<String> normalizedPlayerParts = normalizePlayer(player);

    int similarity = 0;

    for (String normalizedEventPlayerPart : normalizedEventPlayerParts)
      for (String normalizedPlayerPart : normalizedPlayerParts)
        if (isPlayerPartSimilar(normalizedEventPlayerPart, normalizedPlayerPart)) similarity += normalizedEventPlayerPart.length();

    return similarity;
  }

  private int calculateSideSimilarity(List<String> side, List<String> eventSide) {
    if (eventSide.size() != side.size()) return 0;

    if (1 == eventSide.size()) return calculatePlayerSimilarity(side.get(0), eventSide.get(0));

    int normalStrategySimilarity = calculatePlayerSimilarity(side.get(0), eventSide.get(0)) + calculatePlayerSimilarity(side.get(1), eventSide.get(1));
    int flippedStrategySimilarity = calculatePlayerSimilarity(side.get(0), eventSide.get(1)) + calculatePlayerSimilarity(side.get(1), eventSide.get(0));
    return max(normalStrategySimilarity, flippedStrategySimilarity);
  }

  private int calculateSidesSimilarity(List<String> side1, List<String> side2, Event event) {
    int side1similarity = calculateSideSimilarity(side1, event.side1);
    int side2similarity = calculateSideSimilarity(side2, event.side2);
    return (0 == side1similarity || 0 == side2similarity) ? 0 : side1similarity + side2similarity;
  }

  private Event doFindEvent(EventType type, EventSport sport, DateTime date, List<String> side1, List<String> side2) {
    Event candidateEvent = null;
    int candidateEventSimilarity = 0;

    for (Event newCandidateEvent : events) {
      if (!areTypeAndSportEqual(type, sport, newCandidateEvent) || !areDatesSimilar(date, newCandidateEvent)) continue;

      int newCandidateEventSimilarity = calculateSidesSimilarity(side1, side2, newCandidateEvent);

      if (newCandidateEventSimilarity > candidateEventSimilarity) {
        candidateEvent = newCandidateEvent;
        candidateEventSimilarity = newCandidateEventSimilarity;
      }
    }

    return 0 == candidateEventSimilarity ? null : candidateEvent;
  }

  private boolean isPlayerPartSimilar(String eventPlayerPart, String playerPart) {
    if (eventPlayerPart.equals(playerPart)) return true;

    int levenshteinDistance = getLevenshteinDistance(eventPlayerPart, playerPart);
    return eventPlayerPart.length() >= 6 && levenshteinDistance <= 1 || eventPlayerPart.length() >= 8 && levenshteinDistance <= 2;
  }

  private List<String> normalizePlayer(String player) {
    player = player.toLowerCase();
    player = stripAccents(player);
    player = transliterate(player);
    player = simplify(player);
    player = player.replaceAll("([a-z])\\1+", "$1");

    ArrayList<String> playerParts = newArrayList(PLAYER_NAME_SPLITTER.split(player));
    return newArrayList(filter(playerParts, new Predicate<String>() {
      @Override
      public boolean apply(String playerPart) {
        return playerPart.length() > 1;
      }
    }));
  }

  private String simplify(String text) {
    return text.replaceAll("sch", "s").replaceAll("ch", "s").replaceAll("sh", "s").replaceAll("yu", "u").replaceAll("ya", "a").replaceAll("ye", "e") //
      .replaceAll("ia", "a").replaceAll("iu", "u").replaceAll("ie", "e").replaceAll("q", "k").replaceAll("w", "v").replaceAll("y", "i").replaceAll("j", "s")
      .replaceAll("z", "s").replaceAll("c", "s").replaceAll("g", "h").replaceAll("x", "k").replaceAll("f", "v");
  }

  private String transliterate(String text) {
    StringBuilder transliteratedText = new StringBuilder(text.length());
    for (int i = 0; i < text.length(); i++) {

      switch (text.charAt(i)) {
        case 'а':
          transliteratedText.append('a');
          break;
        case 'б':
          transliteratedText.append('b');
          break;
        case 'в':
          transliteratedText.append('v');
          break;
        case 'г':
          transliteratedText.append('h');
          break;
        case 'д':
          transliteratedText.append('d');
          break;
        case 'е':
          transliteratedText.append('e');
          break;
        case 'ё':
          transliteratedText.append('e');
          break;
        case 'ж':
          transliteratedText.append('s');
          break;
        case 'з':
          transliteratedText.append('s');
          break;
        case 'и':
          transliteratedText.append('i');
          break;
        case 'й':
          transliteratedText.append('i');
          break;
        case 'к':
          transliteratedText.append('k');
          break;
        case 'л':
          transliteratedText.append('l');
          break;
        case 'м':
          transliteratedText.append('m');
          break;
        case 'н':
          transliteratedText.append('n');
          break;
        case 'о':
          transliteratedText.append('o');
          break;
        case 'п':
          transliteratedText.append('p');
          break;
        case 'р':
          transliteratedText.append('r');
          break;
        case 'с':
          transliteratedText.append('s');
          break;
        case 'т':
          transliteratedText.append('t');
          break;
        case 'у':
          transliteratedText.append('u');
          break;
        case 'ф':
          transliteratedText.append('v');
          break;
        case 'х':
          transliteratedText.append('h');
          break;
        case 'ц':
          transliteratedText.append('s');
          break;
        case 'ч':
          transliteratedText.append("s");
          break;
        case 'ш':
          transliteratedText.append("s");
          break;
        case 'щ':
          transliteratedText.append("s");
          break;
        case 'ь':
          transliteratedText.append("i");
          break;
        case 'ы':
          transliteratedText.append('i');
          break;
        case 'ъ':
          break;
        case 'э':
          transliteratedText.append('e');
          break;
        case 'ю':
          transliteratedText.append("u");
          break;
        case 'я':
          transliteratedText.append("a");
          break;
        default:
          transliteratedText.append(text.charAt(i));
          break;
      }
    }

    return transliteratedText.toString();
  }
}