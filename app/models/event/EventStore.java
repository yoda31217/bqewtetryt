package models.event;

import com.google.common.base.Predicate;
import com.google.common.base.Splitter;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.Period;
import play.Logger;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.regex.Pattern;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Lists.newLinkedList;
import static org.apache.commons.lang3.StringUtils.getLevenshteinDistance;
import static org.apache.commons.lang3.StringUtils.stripAccents;
import static play.Logger.of;

public class EventStore {

  public static final  Splitter PLAYER_NAME_SPLITTER = Splitter.on(Pattern.compile("[^a-z]+")).omitEmptyStrings();
  private static final Duration ALLOWED_DURATION     = new Period().withHours(2).toStandardDuration();
  Logger.ALogger log = of(EventStore.class);
  final List<Event> events = new CopyOnWriteArrayList<Event>();

  public EventStore() {
  }

  public Event createOrFindEvent(EventType type, Sport sport, DateTime date, List<String> side1, List<String> side2) {
    checkArgument(!side1.isEmpty() && side1.size() <= 2, "Side 1 of size 1 or 2 is required: %s.", side1);
    checkArgument(!side2.isEmpty() && side2.size() <= 2, "Side 2 of size 1 or 2 is required: %s.", side2);

    Event oldEvent = findEvent(type, sport, date, side1, side2);

    if (null != oldEvent) return oldEvent;

    Event newEvent = new Event(type, sport, date, side1, side2);
    log.info("Adding new Event: {}.", newEvent.toString());
    events.add(newEvent);

    return newEvent;
  }

  public List<Event> events() { return newArrayList(events); }

  public void remove(Event event) {
    events.remove(event);
  }

  private boolean areDatesSimilar(DateTime date, Event event) {
    Duration currentDuration = date.isBefore(event.date) ? new Duration(date, event.date) : new Duration(event.date, date);
    return currentDuration.compareTo(ALLOWED_DURATION) <= 0;
  }

  private boolean areSidesSimilar(List<String> side1, List<String> side2, Event event) {
    return isSideSimilar(side1, event.side1) && isSideSimilar(side2, event.side2);
  }

  private boolean areTypeAndSportEqual(EventType type, Sport sport, Event event) {return event.type.equals(type) && event.sport.equals(sport);}

  private Event findEvent(EventType type, Sport sport, DateTime date, List<String> side1, List<String> side2) {
    for (Event event : events)
      if (areTypeAndSportEqual(type, sport, event) && areDatesSimilar(date, event) && areSidesSimilar(side1, side2, event)) return event;

    return null;
  }

  private boolean isPlayerPartSimilar(String eventPlayerPart, String playerPart) {
    if (eventPlayerPart.equals(playerPart)) return true;

    int levenshteinDistance = getLevenshteinDistance(eventPlayerPart, playerPart);
    return eventPlayerPart.length() >= 6 && levenshteinDistance <= 1 || eventPlayerPart.length() >= 8 && levenshteinDistance <= 2;
  }

  private boolean isPlayerSimilar(String player, String eventPlayer) {
    List<String> normalizedEventPlayerParts = normalizePlayer(eventPlayer);
    List<String> normalizedPlayerParts = normalizePlayer(player);

    for (String normalizedEventPlayerPart : normalizedEventPlayerParts) {
      for (String normalizedPlayerPart : normalizedPlayerParts) {
        if (isPlayerPartSimilar(normalizedEventPlayerPart, normalizedPlayerPart)) return true;
      }
    }
    return false;
  }

  private boolean isSideSimilar(List<String> side, List<String> eventSide) {
    if (eventSide.size() != side.size()) return false;

    if (1 == eventSide.size()) return isPlayerSimilar(side.get(0), eventSide.get(0));

    return (isPlayerSimilar(side.get(0), eventSide.get(0)) && isPlayerSimilar(side.get(1), eventSide.get(1))) || //
           (isPlayerSimilar(side.get(0), eventSide.get(1)) && isPlayerSimilar(side.get(1), eventSide.get(0)));
  }

  private List<String> normalizePlayer(String player) {
    player = player.toLowerCase();
    player = stripAccents(player);
    player = transliterate(player);
    player = simplify(player);
    player = player.replaceAll("([a-z])\\1+", "$1");

    return newLinkedList(filter(newArrayList(PLAYER_NAME_SPLITTER.split(player)), new Predicate<String>() {
      @Override
      public boolean apply(String playerPart) {
        return playerPart.length() > 2;
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