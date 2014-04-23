package models.data.adapter;

import models.data.adapter.date.DateAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.parser.ParsedEvent;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static models.util.Conditions.equalToAsString;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BAdapterTest {

  private static final Date        ADAPTED_EVENT_DATE = new Date();
  private              DateAdapter dateAdapterMock    = mock(DateAdapter.class);
  private              KofAdapter  kofAdapterMock     = mock(KofAdapter.class);
  private BAdapter adapter = new BAdapter(" / ", dateAdapterMock, kofAdapterMock, LIVE, VOLVO, TENNIS);

  @Before
  public void before() {
    when(dateAdapterMock.adapt(eq("EVENT_DATE_TEXT"))).thenReturn(ADAPTED_EVENT_DATE);
    when(kofAdapterMock.adapt(eq("1.5"))).thenReturn(1.5);
    when(kofAdapterMock.adapt(eq("3.0"))).thenReturn(3.0);
  }

  @Test
  public void adapt_eventWithBackwardKofsOrder_adaptEventWIthKofsFlipping() {
    ParsedEvent parsedEvent = new ParsedEvent("SIDE1", "SIDE2", "EVENT_DATE_TEXT", "3.0", "1.5");
    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, newArrayList("SIDE2"), newArrayList("SIDE1"), 1.5, 3.0, VOLVO, ADAPTED_EVENT_DATE);

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    assertThat(actualAdaptedEvent).is(equalToAsString(expectedAdaptedEvent));
  }

  @Test
  public void adapt_eventWithNormalKofsOrder_adaptEventNormally() {
    ParsedEvent parsedEvent = new ParsedEvent("SIDE1", "SIDE2", "EVENT_DATE_TEXT", "1.5", "3.0");
    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, newArrayList("SIDE1"), newArrayList("SIDE2"), 1.5, 3.0, VOLVO, ADAPTED_EVENT_DATE);

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    assertThat(actualAdaptedEvent).is(equalToAsString(expectedAdaptedEvent));
  }
}