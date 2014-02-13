package models.data.adapter;

import models.data.parser.ParsedEvent;
import models.data.side.SideCoder;
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
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({LiveVolvoAdapter.class, Date.class})
public class LiveVolvoAdapterTest {

  public static final String SIDE_1 = "SIDE1";
  public static final String SIDE_2 = "SIDE2";
  public static final String KOF_1_STR = "1/2";
  public static final String KOF_2_STR = "11/5";
  public static final String SIDE_1_CODE = "SIDE1_CODE";
  public static final String SIDE_2_CODE = "SIDE2_CODE";
  @Mock
  private SideCoder sideCoderMock;
  private LiveVolvoAdapter adapter;

  @Before
  public void before() {
    adapter = new LiveVolvoAdapter(sideCoderMock, TENNIS);
    when(sideCoderMock.buildCode(same(SIDE_1), any(Sport.class))).thenReturn(SIDE_1_CODE);
    when(sideCoderMock.buildCode(same(SIDE_2), any(Sport.class))).thenReturn(SIDE_2_CODE);
  }

  @Test
  public void adapt_checkType() {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));

    assertThat(adaptedEvent.type).isEqualTo(LIVE);
  }

  @Test
  public void adapt_checkDate()
    throws Exception {
    Date eventDate = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(eventDate);

    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));

    assertThat(adaptedEvent.eventDate).isSameAs(eventDate);
  }

  @Test
  public void adapt_checkSport()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent("Tennis", SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.sport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_checkFirstSideName()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.firstSide).isEqualTo(SIDE_1);
  }

  @Test
  public void adapt_checkSecondSideName()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.secondSide).isEqualTo(SIDE_2);
  }

  @Test
  public void adapt_checkFirstKof()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.firstKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkSecondKof()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.secondKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkOrganisation()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.organisation).isEqualTo(VOLVO);
  }

  @Test
  public void adapt_checkCode()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_1_STR, KOF_2_STR));
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }

  @Test
  public void adapt_checkFirstSideName_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_2, SIDE_1, null, KOF_2_STR, KOF_1_STR));
    assertThat(adaptedEvent.firstSide).isEqualTo(SIDE_1);
  }

  @Test
  public void adapt_checkSecondSideName_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_2, SIDE_1, null, KOF_2_STR, KOF_1_STR));
    assertThat(adaptedEvent.secondSide).isEqualTo(SIDE_2);
  }

  @Test
  public void adapt_checkFirstKof_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_1, SIDE_2, null, KOF_2_STR, KOF_1_STR));
    assertThat(adaptedEvent.firstKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkSecondKof_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_2, SIDE_1, null, KOF_2_STR, KOF_1_STR));
    assertThat(adaptedEvent.secondKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkCode_flipped()
    throws Exception {
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, SIDE_2, SIDE_1, null, KOF_2_STR, KOF_1_STR));
    assertThat(adaptedEvent.code).isEqualTo(SIDE_1_CODE + "_" + SIDE_2_CODE);
  }
}