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
  public void createAndGetEvent_2sameEventsWithNullDate_create1event() {
    Event event = eventStore.createOrGetEvent(REGULAR, TENNIS, null, "SIDE1", "SIDE2", "CODE");
    eventStore.createOrGetEvent(REGULAR, TENNIS, null, "SIDE1", "SIDE2", "CODE");
    assertThat(eventStore.events()).containsOnly(event);
  }

  @Test
  public void createAndGetEvent_2sameEvents_create1event() {
    Event event = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    assertThat(eventStore.events()).containsOnly(event);
  }

  @Test
  public void createOrGetEvent_2eventsWithDiffCodes_create2events() {
    Event firstEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "code_2");
    Event secondEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");

    assertThat(eventStore.events()).contains(secondEvent, firstEvent);
  }

  @Test
  public void createOrGetEvent_2eventsWithDiffDates_create2events() {
    Event firstEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "code_2");
    Event secondEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, ONE_SEC_OLD_DATE, "SIDE1", "SIDE2", "CODE");

    assertThat(eventStore.events()).contains(secondEvent, firstEvent);
  }

  @Test
  public void createOrGetEvent_2eventsWithDiffSports_create2events() {
    Event firstEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    Event secondEvent = eventStore.createOrGetEvent(REGULAR, BASKETBALL, NOW_DATE, "SIDE1", "SIDE2", "CODE");

    assertThat(eventStore.events()).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void createOrGetEvent_2eventsWithDiffTypes_create2events() {
    Event firstEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    Event secondEvent = eventStore.createOrGetEvent(LIVE, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    assertThat(eventStore.events()).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void createOrGetEvent_newEvent_createWithSameFields() {
    Event actualEvent = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");

    Event expectedEvent = new Event(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    assertThat(actualEvent).is(equalToAsString(expectedEvent));
  }

  @Test
  public void events_atStart_returnEmpty() {
    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void remove_createdEvent_removeEvent() {
    Event event = eventStore.createOrGetEvent(REGULAR, TENNIS, NOW_DATE, "SIDE1", "SIDE2", "CODE");
    eventStore.remove(event);
    assertThat(eventStore.events()).isEmpty();
  }
}
