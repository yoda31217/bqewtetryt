package models.store;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.store.EventStore.EVENTS;
import static models.store.EventStore.createOrGetEvent;
import static models.store.EventStore.events;
import static models.store.EventStore.removeEventsOlderThan;
import static models.store.Events.randomPlayer;
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
    Event firstEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer(), "code_2");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);
    Event secondEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer(), "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent);
    Event thirdEvent = createOrGetEvent(new Date(), randomPlayer(), randomPlayer(), "code_3");
    assertThat(thirdEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent, thirdEvent);
  }

  @Test
  public void createAndGetEvent() {
    Date date = new Date();
    String firstPlayer = randomPlayer();
    String secondPlayer = randomPlayer();

    Event firstEvent = createOrGetEvent(date, firstPlayer, secondPlayer, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);

    Event secondEvent = createOrGetEvent(date, firstPlayer, secondPlayer, "code_1");
    assertThat(secondEvent).isSameAs(firstEvent);
    assertThat(events()).containsOnly(firstEvent);
  }

  @Test
  public void checkFieldsAfterCreate() {
    Date date = new Date();
    String firstPlayer = randomPlayer();
    String secondPlayer = randomPlayer();

    Event event = createOrGetEvent(date, firstPlayer, secondPlayer, "code_1");
    assertThat(event).isNotNull();
    assertThat(event.date()).isEqualTo(date);
    assertThat(event.firstPlayer()).isEqualTo(firstPlayer);
    assertThat(event.secondPlayer()).isEqualTo(secondPlayer);
    assertThat(event.history()).isEmpty();
  }

  @Test
  public void checkClear() {
    createOrGetEvent(new Date(new Date().getTime() - 200L), randomPlayer(), randomPlayer(), "code_1");
    removeEventsOlderThan(100L);

    assertThat(events()).isEmpty();
  }

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported()
    throws Exception {
    callConstructor(EventStore.class);
  }
}
