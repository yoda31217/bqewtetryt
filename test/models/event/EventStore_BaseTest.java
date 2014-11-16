package models.event;

import com.codahale.metrics.MetricRegistry;
import models.calc.Calculator;
import org.joda.time.DateTime;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventOrganisation.UNKNOWN;
import static models.event.EventSport.TENNIS;
import static models.event.EventType.REGULAR;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class EventStore_BaseTest {

  private final DateTime   eventDate      = new DateTime(UTC);
  private final Calculator calculatorMock = mock(Calculator.class);
  private final EventStore eventStore     = new EventStore(calculatorMock, mock(MetricRegistry.class));

  @Test
  public void addHistory_toEvent_notifyEventHistoryAddedToCalculator() {
    Event event = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.addHistory(event, now(), UNKNOWN, 1.1, 2.2);
    verify(calculatorMock).notifyEventHistoryAdded(same(event), same(event.history().get(event.history().size() - 1)));
  }

  @Test
  public void createOrFindEvent_newEvent_createWithSameFields() {
    Event actualEvent = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    assertThat(actualEvent.toString()).isEqualTo(new Event(REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo")).toString());
  }

  @Test
  public void createOrFindEvent_newEvent_notifyEventAddedToCalculator() {
    Event event = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    verify(calculatorMock).notifyEventAdded(same(event));
  }

  @Test
  public void events_atStart_returnEmpty() {
    assertThat(eventStore.events()).isEmpty();
  }

  @Test
  public void remove_createdEvent_notifyEventRemovedToCalculator() {
    Event event = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.remove(event);
    verify(calculatorMock).notifyEventRemoved(same(event));
  }

  @Test
  public void remove_createdEvent_removeEvent() {
    Event event = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList("SideOne"), newArrayList("SideTwo"));
    eventStore.remove(event);
    assertThat(eventStore.events()).isEmpty();
  }
}
