package models.event;

import org.joda.time.DateTime;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class EventStoreTest {

  public static final DateTime   EVENT_DATE = new DateTime();
  private             EventStore eventStore = new EventStore();

  @Test
  public void createOrFindEvent_2eventsWithDiffDates_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, new DateTime(), newArrayList("SIDE1"), newArrayList("SIDE2"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSide1_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE3"), newArrayList("SIDE2"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSide2_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE3"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffSports_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    Event secondEvent = eventStore.createOrFindEvent(REGULAR, BASKETBALL, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));

    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2eventsWithDiffTypes_create2events() {
    Event firstEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    Event secondEvent = eventStore.createOrFindEvent(LIVE, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    assertThat(eventStore.events()).containsExactly(firstEvent, secondEvent);
  }

  @Test
  public void createOrFindEvent_2sameEvents_create1event() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    assertThat(eventStore.events()).containsExactly(event);
  }

  @Test
  public void createOrFindEvent_newEvent_createWithSameFields() {
    Event actualEvent = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    assertThat(actualEvent.toString()).isEqualTo(new Event(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2")).toString());
  }

  @Test
  public void events_atStart_returnEmpty() {
    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void remove_createdEvent_removeEvent() {
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, EVENT_DATE, newArrayList("SIDE1"), newArrayList("SIDE2"));
    eventStore.remove(event);
    assertThat(eventStore.events()).isEmpty();
  }
}
