package models.store;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.store.EventStore.EVENTS;
import static models.store.EventStore.createOrGetEvent;
import static models.store.EventStore.events;
import static models.store.EventStore.removeEventsOlderThan;
import static models.store.Events.randomSide;
import static org.fest.assertions.Assertions.assertThat;
import static utils.BObjects.callConstructor;

public class EventStoreTest {

  @Before
  public void before() {
    EVENTS.clear();
  }

  @Test
  public void noEventsAtStart() {
    assertThat(events()).isEmpty();
  }

  @Test
  public void create3events() {
    Event firstEvent = createOrGetEvent(new Date(), randomSide(), randomSide(), "code_2");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);
    Event secondEvent = createOrGetEvent(new Date(), randomSide(), randomSide(), "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent);
    Event thirdEvent = createOrGetEvent(new Date(), randomSide(), randomSide(), "code_3");
    assertThat(thirdEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent, thirdEvent);
  }

  @Test
  public void createAndGetEvent() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event firstEvent = createOrGetEvent(date, firstSide, secondSide, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);

    Event secondEvent = createOrGetEvent(date, firstSide, secondSide, "code_1");
    assertThat(secondEvent).isSameAs(firstEvent);
    assertThat(events()).containsOnly(firstEvent);
  }

  @Test
  public void checkFieldsAfterCreate() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event event = createOrGetEvent(date, firstSide, secondSide, "code_1");
    assertThat(event).isNotNull();
    assertThat(event.date()).isEqualTo(date);
    assertThat(event.firstSide()).isEqualTo(firstSide);
    assertThat(event.secondSide()).isEqualTo(secondSide);
    assertThat(event.history()).isEmpty();
  }

  @Test
  public void checkClear() {
    createOrGetEvent(new Date(new Date().getTime() - 200L), randomSide(), randomSide(), "code_1");
    removeEventsOlderThan(100L);

    assertThat(events()).isEmpty();
  }

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported()
    throws Exception {
    callConstructor(EventStore.class);
  }
}
