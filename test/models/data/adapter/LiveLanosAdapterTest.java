package models.data.adapter;

import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.ParsedEvent;
import models.event.Sport;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Calendar;
import java.util.Date;

import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.SECOND;
import static java.util.TimeZone.getTimeZone;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.VOLLEYBALL;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.same;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Date.class, AdaptedEvent.class})
public class LiveLanosAdapterTest {

  public static final String DESCRIPTION = "Tennis. This is a description.";
  public static final String SIDE_1 = "SIDE_1";
  public static final String SIDE_2 = "SIDE_2";
  public static final String KOF_1 = "9/20";
  public static final String KOF_2 = "96/50";
  public static final String SHORT_DATE = "17:30";
  public static final String SIDE_1_CODE = "SIDE_2_CODE";
  public static final String SIDE_2_CODE = "SIDE_1_CODE";
  @Mock
  private SideCodeAdapter sideCodeAdapterMock;
  private LiveLanosAdapter adapter;

  @Before
  public void before() {
    adapter = new LiveLanosAdapter(sideCodeAdapterMock);
    when(sideCodeAdapterMock.adapt(same(SIDE_1), any(Sport.class))).thenReturn(SIDE_1_CODE);
    when(sideCodeAdapterMock.adapt(same(SIDE_2), any(Sport.class))).thenReturn(SIDE_2_CODE);
  }

  @Test
  public void sidesAndKofsAndCodeAndDate() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.eventDate).isNull();
    assertThat(adaptedEvent.firstSide).isEqualTo(SIDE_1);
    assertThat(adaptedEvent.secondSide).isEqualTo(SIDE_2);
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }

  @Test
  public void sidesAndKofsAndCodeWithChangedOrder() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_2, SIDE_1, SHORT_DATE, KOF_2, KOF_1);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.firstSide).isEqualTo(SIDE_1);
    assertThat(adaptedEvent.secondSide).isEqualTo(SIDE_2);
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }

  @Test
  public void organisation() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.organisation).isEqualTo(LANOS);
  }

  @Test
  public void type() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.type).isEqualTo(LIVE);
  }

  @Test
  public void adoptedDate()
    throws Exception {
    Date expectedAdaptedDate = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(expectedAdaptedDate);

    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.adoptedDate).isEqualTo(expectedAdaptedDate);
  }

  @Test
  public void sportTennis() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_volleyballdescription_returnVolleyballEvent() {
    ParsedEvent event = new ParsedEvent("Volleyball. Some another description.", SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(VOLLEYBALL);
  }

  @Test
  public void adapt_volleyballdescription_returnTableTennisEvent() {
    ParsedEvent event = new ParsedEvent("Table Tennis. Some another description.", SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(TABLE_TENNIS);
  }

  @Test
  public void adapt_volleyballdescription_returnBasketballEvent() {
    ParsedEvent event = new ParsedEvent("Basketball. Some another description.", SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(BASKETBALL);
  }

  @Test
  public void sportUnknown() {
    ParsedEvent event = new ParsedEvent("Tennis1. This is a description.", SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }

  @Test
  public void sportUnknownForEmptyDescription() {
    ParsedEvent event = new ParsedEvent("", SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }

  @Test
  public void sportUnknownForNullDescription() {
    ParsedEvent event = new ParsedEvent(null, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }
}