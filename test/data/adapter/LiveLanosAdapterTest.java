package data.adapter;

import data.parser.ParsedEvent;
import org.junit.Test;
import org.junit.runner.RunWith;
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
import static models.store.Sport.TENNIS;
import static models.store.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Date.class, AdaptedEvent.class})
public class LiveLanosAdapterTest {

  @Test
  public void sidesAndKofsAndCodeAndShortEventDate() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipkens, Kirsten", "Hercog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
    assertThat(adaptedEvent.firstSide).isEqualTo("Flipkens, Kirsten");
    assertThat(adaptedEvent.secondSide).isEqualTo("Hercog, Polona");
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.code).isEqualTo("Flipkens, Kirsten_Hercog, Polona");
  }

  @Test
  public void longEventDate() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipkens, Kirsten", "Hercog, Polona", "11 Sep 17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

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
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipkens, Kirsten", "Hercog, Polona", "11 Sep 12:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

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
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Hercog, Polona", "Flipkens, Kirsten", "17:30", "2.92", "1.45");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());
    assertThat(adaptedEvent.firstSide).isEqualTo("Flipkens, Kirsten");
    assertThat(adaptedEvent.secondSide).isEqualTo("Hercog, Polona");
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.code).isEqualTo("Flipkens, Kirsten_Hercog, Polona");
  }

  @Test
  public void sidesAndCodeWithAccents() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.firstSide).isEqualTo("Flipcens, Kirsten");
    assertThat(adaptedEvent.secondSide).isEqualTo("Hercog, Polona");
    assertThat(adaptedEvent.code).startsWith("Flipcens, Kirsten_Hercog, Polona");
  }

  @Test
  public void organisation() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.organisation).isEqualTo(LANOS);
  }

  @Test
  public void type() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.type).isEqualTo(LIVE);
  }

  @Test
  public void adoptedDate()
    throws Exception {
    Date expectedAdaptedDate = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(expectedAdaptedDate);

    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.adoptedDate).isEqualTo(expectedAdaptedDate);
  }

  @Test
  public void sportTennis() {
    ParsedEvent event = new ParsedEvent("Tennis. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(TENNIS);
  }

  @Test
  public void sportUnknown() {
    ParsedEvent event = new ParsedEvent("Tennis1. This is a description.", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }

  @Test
  public void sportUnknownForEmptyDescription() {
    ParsedEvent event = new ParsedEvent("", "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }

  @Test
  public void sportUnknownForNullDescription() {
    ParsedEvent event = new ParsedEvent(null, "Flipčens, Kirsten", "Herčog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LiveLanosAdapter().adapt(event);

    assertThat(adaptedEvent.sport).isEqualTo(UNKNOWN);
  }
}