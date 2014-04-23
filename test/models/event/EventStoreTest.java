package models.event;

import org.junit.Test;

import java.util.Date;

import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static models.util.Conditions.equalToAsString;
import static models.util.Dates.create1secOldDate;
import static org.fest.assertions.Assertions.assertThat;

public class EventStoreTest {

  public static final Date       NOW_DATE         = new Date();
  public static final Date       ONE_SEC_OLD_DATE = create1secOldDate();
  private             EventStore eventStore       = new EventStore();

  @Test
  public void createOrFindEvent_2eventsWithDiffSide1_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, ONE_SEC_OLD_DATE, "SIDE3", "SIDE2");

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSide2_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, ONE_SEC_OLD_DATE, "SIDE1", "SIDE3");

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffDates_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, ONE_SEC_OLD_DATE, "SIDE1", "SIDE2");

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSports_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, BASKETBALL, NOW_DATE, "SIDE1", "SIDE2");

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffTypes_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    Event secondEvent = eventStore.createOrFindEvent(LIVE, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2sameEvents_create1event() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    assertThat(eventStore.events()).containsExactly(event);
  }

  @Test
  public void createOrFindEvent_newEvent_createWithSameFields() {
    Event actualEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");

    Event expectedEvent = new Event(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    assertThat(actualEvent).is(equalToAsString(expectedEvent));
  }

  @Test
  public void events_atStart_returnEmpty() {
    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void remove_createdEvent_removeEvent() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2");
    eventStore.remove(event);
    assertThat(eventStore.events()).isEmpty();
  }
}
