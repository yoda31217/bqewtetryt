package jobs;

import data.adapter.AdaptedEvent;
import data.adapter.BAdapter;
import data.fetcher.BFetcher;
import data.parser.BParser;
import data.parser.ParsedEvent;
import models.store.Event;
import models.store.EventStore;
import models.store.EventType;
import models.store.HistoryRecord;
import models.store.Sport;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;
import static models.store.EventStore.createOrGetEvent;
import static models.store.EventType.REGULAR;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.refEq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class})
public class EventJobTest {

  @Mock
  private BFetcher fetcher;
  @Mock
  private BParser parser;
  @Mock
  private BAdapter adapter;
  private byte[] FetchResult = new byte[0];
  @Mock
  private ParsedEvent parsedEvent = new ParsedEvent("TENNIS", "fp", "sp", "DATE_STRING", "1.1", "2.2");
  @Mock
  private AdaptedEvent adaptedEvent = new AdaptedEvent(REGULAR, TENNIS, "side1", "side", 1.1, 2.2, VOLVO, new Date(), "side1_code", "side2_code");
  @Mock
  private Event event;

  @Test
  public void run() {
    mockStatic(EventStore.class);
    when(EventStore.createOrGetEvent(any(EventType.class), any(Sport.class), any(Date.class), any(String.class), any(String.class), any(String.class)))
      .thenReturn(event);

    when(fetcher.fetch()).thenReturn(FetchResult);
    when(parser.parse(same(FetchResult))).thenReturn(newArrayList(parsedEvent));
    when(adapter.adapt(parsedEvent)).thenReturn(adaptedEvent);

    EventJob job = new EventJob(fetcher, parser, adapter, "JOB_NAME");
    job.run();

    assertThat(job.name).isEqualTo("JOB_NAME");

    verify(fetcher).fetch();
    verify(parser).parse(same(FetchResult));
    verify(adapter).adapt(same(parsedEvent));

    verifyStatic();
    createOrGetEvent(adaptedEvent.type, adaptedEvent.sport, adaptedEvent.eventDate, adaptedEvent.firstSide, adaptedEvent.secondSide, adaptedEvent.code);

    verify(event).addHistory(refEq(new HistoryRecord(adaptedEvent.adoptedDate, adaptedEvent.organisation, adaptedEvent.firstKof, adaptedEvent.secondKof)));
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