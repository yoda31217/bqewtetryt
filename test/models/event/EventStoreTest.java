package models.event;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.util.Date;

import static models.event.EventTests.randomSide;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static models.util.BObjects.callConstructor;
import static org.fest.assertions.Assertions.assertThat;

public class EventStoreTest {

  @Before
  public void before() {
    EventStore.INSTANCE.events.clear();
  }

  @Test
  public void checkFieldsAfterCreate() {
    Date date = new Date();
    String side1 = randomSide();
    String side2 = randomSide();

    Event event = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, date, side1, side2, "code_1");
    assertThat(event).isNotNull();
    assertThat(event.date()).isEqualTo(date);
    assertThat(event.side1()).isEqualTo(side1);
    assertThat(event.side2()).isEqualTo(side2);
    assertThat(event.code()).isEqualTo("code_1");
    assertThat(event.history()).isEmpty();
  }

  @Ignore
  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported() throws Exception {
    callConstructor(EventStore.class);
  }

  @Test
  public void create2eventsWithDiffSports() {
    Date date = new Date();
    String side1 = randomSide();
    String side2 = randomSide();

    Event firstEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, date, side1, side2, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).hasSize(1).containsOnly(firstEvent);

    Event secondEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, BASKETBALL, date, side1, side2, "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).hasSize(2).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void create2eventsWithDiffTypes() {
    Date date = new Date();
    String side1 = randomSide();
    String side2 = randomSide();

    Event firstEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, date, side1, side2, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).hasSize(1).containsOnly(firstEvent);

    Event secondEvent = EventStore.INSTANCE.createOrGetEvent(LIVE, TENNIS, date, side1, side2, "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).hasSize(2).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void create3events() {
    Event firstEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_2");
    assertThat(firstEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).containsOnly(firstEvent);
    Event secondEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).contains(secondEvent, firstEvent);
    Event thirdEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_3");
    assertThat(thirdEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).contains(secondEvent, firstEvent, thirdEvent);
  }

  @Test
  public void createAndGetEvent() {
    Date date = new Date();
    String side1 = randomSide();
    String side2 = randomSide();

    Event firstEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, date, side1, side2, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(EventStore.INSTANCE.events()).containsOnly(firstEvent);

    Event secondEvent = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, date, side1, side2, "code_1");
    assertThat(secondEvent).isSameAs(firstEvent);
    assertThat(EventStore.INSTANCE.events()).containsOnly(firstEvent);
  }

  @Test
  public void noEventsAtStart() {
    assertThat(EventStore.INSTANCE.events()).isEmpty();
  }

  @Test
  public void remove_event_remove() {
    Event event = EventStore.INSTANCE.createOrGetEvent(REGULAR, TENNIS, new Date(new Date().getTime() - 200L), randomSide(), randomSide(), "code_1");
    EventStore.INSTANCE.remove(event);
    assertThat(EventStore.INSTANCE.events()).isEmpty();
  }
}
