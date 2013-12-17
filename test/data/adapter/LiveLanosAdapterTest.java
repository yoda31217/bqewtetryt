package data.adapter;

import data.parser.ParsedEvent;
import data.side.SideCoder;
import models.store.Sport;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Calendar;
import java.util.Date;

import static java.util.Calendar.DAY_OF_MONTH;
import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.MONTH;
import static java.util.Calendar.SECOND;
import static java.util.Calendar.SEPTEMBER;
import static java.util.TimeZone.getTimeZone;
import static models.store.EventType.LIVE;
import static models.store.Organisation.LANOS;
import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TABLE_TENNIS;
import static models.store.Sport.TENNIS;
import static models.store.Sport.UNKNOWN;
import static models.store.Sport.VOLLEYBALL;
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
  public static final String KOF_1 = "1.45";
  public static final String KOF_2 = "2.92";
  public static final String SHORT_DATE = "17:30";
  public static final String SIDE_1_CODE = "SIDE_2_CODE";
  public static final String SIDE_2_CODE = "SIDE_1_CODE";
  @Mock
  private SideCoder sideCoderMock;
  private LiveLanosAdapter adapter;

  @Before
  public void before() {
    adapter = new LiveLanosAdapter(sideCoderMock);
    when(sideCoderMock.buildCode(same(SIDE_1), any(Sport.class))).thenReturn(SIDE_1_CODE);
    when(sideCoderMock.buildCode(same(SIDE_2), any(Sport.class))).thenReturn(SIDE_2_CODE);
  }

  @Test
  public void sidesAndKofsAndCodeAndShortEventDate() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
    assertThat(adaptedEvent.firstSide).isEqualTo(SIDE_1);
    assertThat(adaptedEvent.secondSide).isEqualTo(SIDE_2);
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }

  @Test
  public void longEventDate() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, "11 Sep 17:30", KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(MONTH, SEPTEMBER);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
  }

  @Test
  public void eventDate24hours() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, "11 Sep 12:30", KOF_1, KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(MONTH, SEPTEMBER);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 12);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
  }

  @Test
  public void sidesAndKofsAndCodeAndDateWithChangedOrder() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_2, SIDE_1, SHORT_DATE, KOF_2, KOF_1);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
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

  @Test
  public void adapt_firstKofInFraction_dividedPlusOne() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, "1/2", KOF_2);
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.firstKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_secondKofInFraction_dividedPlusOne() {
    ParsedEvent event = new ParsedEvent(DESCRIPTION, SIDE_1, SIDE_2, SHORT_DATE, KOF_1, "3/2");
    AdaptedEvent adaptedEvent = adapter.adapt(event);

    assertThat(adaptedEvent.secondKof).isEqualTo(2.5);
  }
}