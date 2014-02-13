package models.event;

import models.calc.Calcularium;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.calc.CalculariumTests.mockCalcularium;
import static models.event.EventStore.EVENTS;
import static models.event.EventStore.createOrGetEvent;
import static models.event.EventStore.events;
import static models.event.EventStore.removeEventsOlderThan;
import static models.event.EventTests.randomSide;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static models.util.BObjects.callConstructor;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.notNull;
import static org.mockito.Mockito.verify;

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
    Event firstEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_2");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);
    Event secondEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent);
    Event thirdEvent = createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_3");
    assertThat(thirdEvent).isNotNull();
    assertThat(events()).containsExactly(secondEvent, firstEvent, thirdEvent);
  }

  @Test
  public void createAndGetEvent() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event firstEvent = createOrGetEvent(REGULAR, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).containsOnly(firstEvent);

    Event secondEvent = createOrGetEvent(REGULAR, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(secondEvent).isSameAs(firstEvent);
    assertThat(events()).containsOnly(firstEvent);
  }

  @Test
  public void create2eventsWithDiffTypes() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event firstEvent = createOrGetEvent(REGULAR, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).hasSize(1).containsOnly(firstEvent);

    Event secondEvent = createOrGetEvent(LIVE, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(events()).hasSize(2).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void create2eventsWithDiffSports() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event firstEvent = createOrGetEvent(REGULAR, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(firstEvent).isNotNull();
    assertThat(events()).hasSize(1).containsOnly(firstEvent);

    Event secondEvent = createOrGetEvent(REGULAR, BASKETBALL, date, firstSide, secondSide, "code_1");
    assertThat(secondEvent).isNotNull();
    assertThat(events()).hasSize(2).containsOnly(firstEvent, secondEvent);
  }

  @Test
  public void checkFieldsAfterCreate() {
    Date date = new Date();
    String firstSide = randomSide();
    String secondSide = randomSide();

    Event event = createOrGetEvent(REGULAR, TENNIS, date, firstSide, secondSide, "code_1");
    assertThat(event).isNotNull();
    assertThat(event.date()).isEqualTo(date);
    assertThat(event.firstSide()).isEqualTo(firstSide);
    assertThat(event.secondSide()).isEqualTo(secondSide);
    assertThat(event.code()).isEqualTo("code_1");
    assertThat(event.history()).isEmpty();
    assertThat(event.isRemoved()).isFalse();
  }

  @Test
  public void removeEventsOlderThan_registerOldEvent_removed() {
    createOrGetEvent(REGULAR, TENNIS, new Date(new Date().getTime() - 200L), randomSide(), randomSide(), "code_1");
    removeEventsOlderThan(100L);
    assertThat(events()).isEmpty();
  }

  @Test
  public void removeEventsOlderThan_registerOldEvent_markedRemoved() {
    Event event = createOrGetEvent(REGULAR, TENNIS, new Date(new Date().getTime() - 200L), randomSide(), randomSide(), "code_1");
    removeEventsOlderThan(100L);
    assertThat(event.isRemoved()).isTrue();
  }

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported()
    throws Exception {
    callConstructor(EventStore.class);
  }

  @Test
  public void createOrGetEvent_newEvent_registerInCalcularium() {
    Calcularium calculariumMock = mockCalcularium();
    createOrGetEvent(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "code_1");
    verify(calculariumMock).registerEvent(notNull(Event.class));
  }

}
