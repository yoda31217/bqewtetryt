package models.data.adapter;

import models.data.adapter.date.DateAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.sport.SportAdapter;
import models.data.parser.ParsedEvent;
import org.joda.time.DateTime;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeUtils.setCurrentMillisFixed;
import static org.joda.time.DateTimeUtils.setCurrentMillisSystem;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class BAdapterTest {

  private static final DateTime     EVENT_DATE       = new DateTime(UTC);
  private              DateAdapter  dateAdapterMock  = mock(DateAdapter.class);
  private              KofAdapter   kofAdapterMock   = mock(KofAdapter.class);
  private              SportAdapter sportAdapterMock = mock(SportAdapter.class);
  private              BAdapter     adapter          = new BAdapter(" / ", dateAdapterMock, kofAdapterMock, sportAdapterMock, LIVE, VOLVO);

  @Before
  public void before() {
    when(dateAdapterMock.adapt(eq("EVENT_DATE_TEXT"))).thenReturn(EVENT_DATE);
    when(kofAdapterMock.adapt(eq("1.5"))).thenReturn(1.5);
    when(kofAdapterMock.adapt(eq("3.0"))).thenReturn(3.0);
    when(sportAdapterMock.adapt(eq("TENNIS"))).thenReturn(TENNIS);
  }

  @After
  public void after() {
    setCurrentMillisSystem();
  }

  @Test
  public void adapt_eventWith2playersSide1_splitPlayers() {
    ParsedEvent parsedEvent = new ParsedEvent("SIDE1 PLAYER1 / SIDE1 PLAYER2", "SIDE2", "EVENT_DATE_TEXT", "1.5", "3.0");
    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);
    assertThat(actualAdaptedEvent.side1).isEqualTo(newArrayList("SIDE1 PLAYER1", "SIDE1 PLAYER2"));
  }

  @Test
  public void adapt_eventWithBackwardKofsOrder_adaptFieldsWithKofsFlipping() {
    setCurrentMillisFixed(new DateTime(UTC).getMillis());
    ParsedEvent parsedEvent = new ParsedEvent("TENNIS", "SIDE1", "SIDE2", "EVENT_DATE_TEXT", "3.0", "1.5");

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, newArrayList("SIDE2"), newArrayList("SIDE1"), 1.5, 3.0, VOLVO, EVENT_DATE);
    assertThat(actualAdaptedEvent.toString()).isEqualTo(expectedAdaptedEvent.toString());
  }

  @Test
  public void adapt_eventWithNormalKofsOrder_adaptFieldsNormally() {
    setCurrentMillisFixed(new DateTime(UTC).getMillis());
    ParsedEvent parsedEvent = new ParsedEvent("TENNIS", "SIDE1", "SIDE2", "EVENT_DATE_TEXT", "1.5", "3.0");

    AdaptedEvent actualAdaptedEvent = adapter.adapt(parsedEvent);

    AdaptedEvent expectedAdaptedEvent = new AdaptedEvent(LIVE, TENNIS, newArrayList("SIDE1"), newArrayList("SIDE2"), 1.5, 3.0, VOLVO, EVENT_DATE);
    assertThat(actualAdaptedEvent.toString()).isEqualTo(expectedAdaptedEvent.toString());
  }
}