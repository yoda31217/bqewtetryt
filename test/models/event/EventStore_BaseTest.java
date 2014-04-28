package models.event;

import org.joda.time.DateTime;
import org.junit.Test;

import java.util.ArrayList;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.junit.Assert.fail;

public class EventStore_BaseTest {

  private DateTime   eventDate  = new DateTime(UTC);
  private EventStore eventStore = new EventStore();

  @Test
  public void createOrFindEvent_2eventsWithDiffSide1_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideThree"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSide2_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideThree"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSidePlayersCount_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOnePOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOnePOne", "SideOnePTwo"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSports_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, BASKETBALL, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffTypes_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(LIVE, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithLess2hoursDiffDates_create1event_1() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC).plusSeconds(1), newArrayList("SideOne"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithLess2hoursDiffDates_create1event_2() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC).minusSeconds(1), newArrayList("SideOne"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithMore2hoursDiffDates_create2event_1() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC).plusHours(2).plusSeconds(1), newArrayList("SideOne"), newArrayList(
      "SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithMore2hoursDiffDates_create2event_2() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(UTC).minusHours(2).minusSeconds(1), newArrayList("SideOne"), newArrayList(
      "SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithSame2playersFlipped_create1event() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOneP1", "SideOneP2"), newArrayList("SideTwo"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOneP2", "SideOneP1"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithSame2players_create1event() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOneP1", "SideOneP2"), newArrayList("SideTwo"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOneP1", "SideOneP2"), newArrayList("SideTwo"));

    assertThat(eventStore.events()).containsExactly(firstEvent);
  }

  @Test
  public void createOrFindEvent_2sameEvents_create1event() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    assertThat(eventStore.events()).containsExactly(event);
  }

  @Test
  public void createOrFindEvent_eventSide1with0players_throwEx() {
    try {
      eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, new ArrayList<String>(), newArrayList("SideTwo"));
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Side 1 of size 1 or 2 is required: [].");
    }
  }

  @Test
  public void createOrFindEvent_eventSide1with3players_throwEx() {
    try {
      eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOnePOne", "SideOnePTwo", "SideOnePThree"), newArrayList("SideTwo"));
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Side 1 of size 1 or 2 is required: [SideOnePOne, SideOnePTwo, SideOnePThree].");
    }
  }

  @Test
  public void createOrFindEvent_eventSide2with0players_throwEx() {
    try {
      eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), new ArrayList<String>());
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Side 2 of size 1 or 2 is required: [].");
    }
  }

  @Test
  public void createOrFindEvent_eventSide2with3players_throwEx() {
    try {
      eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwoPOne", "SideTwoPTwo", "SideTwoPThree"));
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Side 2 of size 1 or 2 is required: [SideTwoPOne, SideTwoPTwo, SideTwoPThree].");
    }
  }

  @Test
  public void createOrFindEvent_newEvent_createWithSameFields() {
    Event actualEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    assertThat(actualEvent.toString()).isEqualTo(new Event(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo")).toString());
  }

  @Test
  public void events_atStart_returnEmpty() {
    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void remove_createdEvent_removeEvent() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.remove(event);
    assertThat(eventStore.events()).isEmpty();
  }
}
