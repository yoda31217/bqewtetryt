package models.data.adapter;

import models.data.adapter.date.DateAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.ParsedEvent;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static models.util.Conditions.equalToAsString;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AdapterTest {

  private static final Date            ADAPTED_EVENT_DATE  = new Date();
  private              DateAdapter     dateAdapterMock     = mock(DateAdapter.class);
  private              SideCodeAdapter sideCodeAdapterMock = mock(SideCodeAdapter.class);
  private              Adapter         adapter             = new Adapter(sideCodeAdapterMock, dateAdapterMock, LIVE, VOLVO, TENNIS);

  @Before
  public void before() {
    when(sideCodeAdapterMock.adapt(eq("SIDE1"), same(TENNIS))).thenReturn("SIDE1_CODE");
    when(sideCodeAdapterMock.adapt(eq("SIDE2"), same(TENNIS))).thenReturn("SIDE2_CODE");
    when(dateAdapterMock.adapt(eq("EVENT_DATE_TEXT"))).thenReturn(ADAPTED_EVENT_DATE);
  }

  @Test
  public void adapt_eventWithBackwardKofsOrder_adaptEventWIthKofsFlipping() {
    ParsedEvent parsedEvent = new ParsedEvent("SIDE1", "SIDE2", "EVENT_DATE_TEXT", "11/5", "1/2");
    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, "SIDE2", "SIDE1", 1.5, 3.2, VOLVO, ADAPTED_EVENT_DATE, "SIDE2_CODE", "SIDE1_CODE");

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    assertThat(actualAdaptedEvent).is(equalToAsString(expectedAdaptedEvent));
  }

  @Test
  public void adapt_eventWithNormalKofsOrder_adaptEventNormally() {
    ParsedEvent parsedEvent = new ParsedEvent("SIDE1", "SIDE2", "EVENT_DATE_TEXT", "1/2", "11/5");
    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, "SIDE1", "SIDE2", 1.5, 3.2, VOLVO, ADAPTED_EVENT_DATE, "SIDE1_CODE", "SIDE2_CODE");

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    assertThat(actualAdaptedEvent).is(equalToAsString(expectedAdaptedEvent));
  }
}