package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.parser.BParser;
import models.data.parser.ParsedEvent;
import models.event.Event;
import models.event.EventStore;
import models.event.EventType;
import models.event.HistoryRecord;
import models.event.Sport;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventStore.createOrGetEvent;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.refEq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class})
public class EventJobTest {

  @Mock
  private BParser parser;
  @Mock
  private BAdapter adapter;
  @Mock
  private ParsedEvent parsedEvent = new ParsedEvent("TENNIS", "fp", "sp", "DATE_STRING", "1.1", "2.2");
  @Mock
  private AdaptedEvent adaptedEvent = new AdaptedEvent(REGULAR, TENNIS, "side1", "side", 1.1, 2.2, VOLVO, new Date(), "side1_code", "side2_code");
  @Mock
  private Event event;
  @Mock
  private Predicate<AdaptedEvent> eventFilter;

  @Test
  public void run_regularEvent_parsedAndAdaptedAndRecorded() {
    mockStatic(EventStore.class);
    when(EventStore.createOrGetEvent(any(EventType.class), any(Sport.class), any(Date.class), any(String.class), any(String.class), any(String.class)))
      .thenReturn(event);

    when(parser.parse()).thenReturn(newArrayList(parsedEvent));
    when(adapter.adapt(parsedEvent)).thenReturn(adaptedEvent);
    when(eventFilter.apply(same(adaptedEvent))).thenReturn(true);

    EventJob job = new EventJob(parser, adapter, eventFilter, "JOB_NAME");
    job.run();

    assertThat(job.name).isEqualTo("JOB_NAME");

    verify(parser).parse();
    verify(adapter).adapt(same(parsedEvent));

    verifyStatic();
    createOrGetEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.side1, adaptedEvent.side2, adaptedEvent.code);

    verify(event).addHistory(refEq(new HistoryRecord(adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.lowKof, adaptedEvent.highKof)));
  }

  @Test
  public void run_filterNotApply_eventNotAddedToStore() {
    mockStatic(EventStore.class);

    when(parser.parse()).thenReturn(newArrayList(parsedEvent));
    when(adapter.adapt(parsedEvent)).thenReturn(adaptedEvent);
    when(eventFilter.apply(same(adaptedEvent))).thenReturn(false);

    EventJob job = new EventJob(parser, adapter, eventFilter, "JOB_NAME");
    job.run();

    verifyStatic(never());
    createOrGetEvent(any(EventType.class), any(Sport.class), any(Date.class), any(String.class), any(String.class), any(String.class));
  }

  @Test
  public void run_adapterThrowEx_catchAndAdaptNext() {
    mockStatic(EventStore.class);

    when(parser.parse()).thenReturn(newArrayList(parsedEvent, parsedEvent));
    when(adapter.adapt(parsedEvent)).thenThrow(new RuntimeException()).thenReturn(adaptedEvent);
    when(eventFilter.apply(same(adaptedEvent))).thenReturn(false);

    EventJob job = new EventJob(parser, adapter, eventFilter, "JOB_NAME");
    job.run();

    verify(adapter, times(2)).adapt(same(parsedEvent));
  }

  @Test
  @Ignore
  public void realLanosRun() {
    //        Jobs.LIVE_VOLVO_JOB.run();
    //
    //    EventJob job = new EventJob(new LanosFetcher("htp://www.lanosbet.com/en/betting/Tennis/"), new LanosParser(), new LanosAdapter());
    //    job.run();
    //    job.run();
  }

  @Test
  @Ignore
  public void realVolvoRun() {
    //    EventJob job = new EventJob(new VolvoFetcher(
    //      "http://www.volvo.com/Lite/cache/api/?clt=9994&op=4&cid=13&cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0&cf=N&lng=1&cty=195&fm=1&tzi=1&oty=2
    // &hd=N"),
    //      new VolvoParser(), new VolvoAdapter());
    //    job.run();
    //    job.run();
  }
}