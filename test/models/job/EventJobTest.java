package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import models.util.LoggerMock;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.powermock.api.mockito.PowerMockito.when;

public class EventJobTest {

  private DateTime                eventDate       = new DateTime();
  private Event                   event           = new Event(LIVE, TENNIS, eventDate, newArrayList("SIDE1"), newArrayList("SIDE2"));
  private AdaptedEvent            adaptedEvent    = new AdaptedEvent(LIVE, TENNIS, newArrayList("SIDE1"), newArrayList("SIDE2"), 1.1, 2.2, VOLVO, eventDate);
  private ParsedEvent             parsedEvent     = new ParsedEvent("SIDE1", "SIDE2", "DATE_STRING", "1.1", "2.2");
  private BParser                 parserMock      = mock(BParser.class);
  private BAdapter                adapterMock     = mock(BAdapter.class);
  private Predicate<AdaptedEvent> eventFilterMock = mock(Predicate.class);
  private EventStore              eventStoreMock  = mock(EventStore.class);
  private EventJob                job             = new EventJob(eventStoreMock, parserMock, adapterMock, eventFilterMock);
  private LoggerMock              logMock         = new LoggerMock();

  @Before
  public void before() throws Exception {
    when(parserMock.parse()).thenReturn(newArrayList(parsedEvent));
    when(adapterMock.adapt(parsedEvent)).thenReturn(adaptedEvent);
    when(eventFilterMock.apply(same(adaptedEvent))).thenReturn(true);
    when(eventStoreMock.createOrFindEvent(same(LIVE), same(TENNIS), eq(eventDate), eq(newArrayList("SIDE1")), eq(newArrayList("SIDE2")))).thenReturn(event);
    job.log = logMock;
  }

  @Test
  public void run_adapterThrowExFor2events_adapt2events() {
    when(parserMock.parse()).thenReturn(newArrayList(parsedEvent, parsedEvent));
    when(adapterMock.adapt(parsedEvent)).thenThrow(new RuntimeException());

    job.run();

    verify(adapterMock, times(2)).adapt(same(parsedEvent));
  }

  @Test
  public void run_adapterThrowEx_logEx() {
    RuntimeException exception = new RuntimeException();
    when(adapterMock.adapt(parsedEvent)).thenThrow(exception);

    job.run();

    logMock.verifyError("Failed to process parsed event: " + parsedEvent.toString() + ".");
    logMock.verifyError("Cause.", exception);
  }

  @Test
  public void run_filterNotApply_notAddEventToStore() {
    when(eventFilterMock.apply(same(adaptedEvent))).thenReturn(false);
    job.run();
    verifyNoMoreInteractions(eventStoreMock);
  }

  @Test
  public void run_regularEvent_historyAdded() {
    job.run();
    assertThat(event.history().toString()).isEqualTo(newArrayList(new HistoryRecord(adaptedEvent.adoptedDate, VOLVO, 1.1, 2.2)).toString());
  }
}