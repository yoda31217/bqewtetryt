package models.data.adapter;

import models.data.adapter.date.DateAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.ParsedEvent;
import models.event.Sport;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.event.EventType.LIVE;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.same;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({VolvoAdapter2.class, Date.class})
public class VolvoAdapter2Test {

  public static final String SIDE_1 = "SIDE1";
  public static final String SIDE_2 = "SIDE2";
  public static final String LOW_KOF_STR = "1/2";
  public static final String HIGH_KOF_STR = "11/5";
  public static final String SIDE_1_CODE = "SIDE1_CODE";
  public static final String SIDE_2_CODE = "SIDE2_CODE";
  public static final String EVENT_DATE_TEXT = "EVENT_DATE_TEXT";
  public static final Date ADAPTED_EVENT_DATE = new Date();
  @Mock
  private SideCodeAdapter sideCodeAdapterMock;
  private DateAdapter dateAdapterMock = mock(DateAdapter.class);
  private VolvoAdapter2 adapter;

  @Before
  public void before() {
    adapter = new VolvoAdapter2(sideCodeAdapterMock, dateAdapterMock, LIVE);
    when(sideCodeAdapterMock.adapt(same(SIDE_1), any(Sport.class))).thenReturn(SIDE_1_CODE);
    when(sideCodeAdapterMock.adapt(same(SIDE_2), any(Sport.class))).thenReturn(SIDE_2_CODE);
    when(dateAdapterMock.adapt(same(EVENT_DATE_TEXT))).thenReturn(ADAPTED_EVENT_DATE);
  }

  @Test
  public void adapt_checkType() {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));

    assertThat(adaptedEvent.type).isEqualTo(LIVE);
  }

  @Test
  public void adapt_dateTextNotNull_returnAdaptedDate()
  throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_2, SIDE_1, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.eventDate).isSameAs(ADAPTED_EVENT_DATE);
  }

  @Test
  public void adapt_checkSport()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.sport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_checkSide1Name()
  throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.side1).isEqualTo(SIDE_1);
  }

  @Test
  public void adapt_checkSide2Name()
  throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.side2).isEqualTo(SIDE_2);
  }

  @Test
  public void adapt_checkLowKof()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.lowKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkHighKof()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.highKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkOrganisation()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.organisation).isEqualTo(VOLVO);
  }

  @Test
  public void adapt_checkCode()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, LOW_KOF_STR, HIGH_KOF_STR));
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }

  @Test
  public void adapt_checkSide1Name_flipped()
  throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_2, SIDE_1, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.side1).isEqualTo(SIDE_1);
  }

  @Test
  public void adapt_checkSide2Name_flipped()
  throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_2, SIDE_1, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.side2).isEqualTo(SIDE_2);
  }

  @Test
  public void adapt_checkLowKof_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.lowKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkHighKof_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_2, SIDE_1, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.highKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkCode_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_2, SIDE_1, EVENT_DATE_TEXT, HIGH_KOF_STR, LOW_KOF_STR));
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }
}