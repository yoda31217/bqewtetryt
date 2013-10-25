package jobs;

import data.AdaptedEvent;
import data.adapter.BAdapter;
import data.fetcher.UrlFetcher;
import data.parser.BParser;
import data.parser.ParsedEvent;
import models.store.Event;
import models.store.EventStore;
import models.store.HistoryRecord;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;
import static models.store.EventStore.createOrGetEvent;
import static models.store.Organisation.BET365;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.refEq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class})
public class EventJobTest {

  @Mock
  private UrlFetcher fetcher;
  @Mock
  private BParser parser;
  @Mock
  private BAdapter adapter;
  private byte[] FetchResult = new byte[0];
  @Mock
  private ParsedEvent parsedEvent = new ParsedEvent("fp", "sp", "DATE_STRING", "1.1", "2.2");
  @Mock
  private AdaptedEvent adaptedEvent = new AdaptedEvent("side1", "side", 1.1, 2.2, BET365, new Date(), "side1_code", "side2_code");
  @Mock
  private Event event;

  @Test
  public void run() {
    PowerMockito.mockStatic(EventStore.class);
    PowerMockito.when(EventStore.createOrGetEvent(any(Date.class), any(String.class), any(String.class), any(String.class))).thenReturn(event);

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
    createOrGetEvent(adaptedEvent.date, adaptedEvent.firstSide, adaptedEvent.secondSide, adaptedEvent.code);

    verify(event).addHistory(refEq(new HistoryRecord(adaptedEvent.adaptedDate, adaptedEvent.organisation, adaptedEvent.firstKof, adaptedEvent.secondKof)));
  }

  @Test
  @Ignore
  public void realMarathonRun() {
    //    EventJob job = new EventJob(new MarathonFetcher("htp://www.marathonbet.com/en/betting/Tennis/"), new MarathonParser(), new MarathonAdapter());
    //    job.run();
    //    job.run();
  }

  @Test
  @Ignore
  public void realBet365Run() {
    //    EventJob job = new EventJob(new Bet365Fetcher(
    //      "http://www.bet365.com/Lite/cache/api/?clt=9994&op=4&cid=13&cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0&cf=N&lng=1&cty=195&fm=1&tzi=1&oty=2
    // &hd=N"),
    //      new Bet365Parser(), new Bet365Adapter());
    //    job.run();
    //    job.run();
  }
}