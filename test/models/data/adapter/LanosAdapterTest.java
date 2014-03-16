package models.data.adapter;

import models.data.parser.ParsedEvent;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.io.IOException;
import java.text.ParseException;
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
import static models.event.Organisation.LANOS;
import static org.fest.assertions.Assertions.assertThat;
import static org.powermock.api.mockito.PowerMockito.whenNew;
import static org.powermock.reflect.Whitebox.invokeMethod;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Date.class, AdaptedEvent.class})
public class LanosAdapterTest {

  @Test
  public void parse()
    throws Exception {
    Date adaptedDate = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(adaptedDate);

    ParsedEvent event = new ParsedEvent("TENNIS", "Flipkens, Kirsten", "Hercog, Polona", "17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);
    assertThat(adaptedEvent.eventDate).isEqualTo(calendar.getTime());

    assertThat(adaptedEvent.organisation).isEqualTo(LANOS);
    assertThat(adaptedEvent.side1).isEqualTo("Flipkens, Kirsten");
    assertThat(adaptedEvent.side2).isEqualTo("Hercog, Polona");
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
    assertThat(adaptedEvent.adoptedDate).isSameAs(adaptedDate);
  }

  @Test
  public void nunUnicodeCharacters()
    throws Exception {
    ParsedEvent event = new ParsedEvent("TENNIS", "Florian Hradečka", "Kristina Hradečka", "11 Oct 07:30", "1.50", "3.28");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

    assertThat(adaptedEvent.side1).isEqualTo("Florian Hradecka");
    assertThat(adaptedEvent.side2).isEqualTo("Kristina Hradecka");
  }

  @Test
  public void codeAndOrder()
    throws Exception {
    ParsedEvent event = new ParsedEvent("TENNIS", "Flipkens, Kirsten", "J.Murray / J.Peers", "11 Sep 17:30", "2.92", "1.45");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(MONTH, SEPTEMBER);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 17);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    String eventCode = "murray,peers_flipkens";

    assertThat(adaptedEvent.code).isEqualTo(eventCode);
  }

  @Test
  public void order()
    throws Exception {
    ParsedEvent event = new ParsedEvent("TENNIS", "Hercog, Polona", "Flipkens, Kirsten", "17:30", "2.92", "1.45");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

    assertThat(adaptedEvent.side1).isEqualTo("Flipkens, Kirsten");
    assertThat(adaptedEvent.side2).isEqualTo("Hercog, Polona");
    assertThat(adaptedEvent.firstKof).isEqualTo(1.45);
    assertThat(adaptedEvent.secondKof).isEqualTo(2.92);
  }

  @Test
  public void date24hours()
    throws InterruptedException, IOException {
    ParsedEvent event = new ParsedEvent("TENNIS", "Flipkens, Kirsten", "Hercog, Polona", "11 Sep 12:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

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
  public void longDate()
    throws InterruptedException, IOException {
    ParsedEvent event = new ParsedEvent("TENNIS", "Flipkens, Kirsten", "Hercog, Polona", "11 Sep 17:30", "1.45", "2.92");
    AdaptedEvent adaptedEvent = new LanosAdapter().adapt(event);

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
  public void adoptLongDateParseException()
    throws Exception {
    try {
      invokeMethod(new LanosAdapter(), "adaptLongDate", "WRONG_DATE_STRING");

    } catch (RuntimeException ex) {
      assertThat(ex.getCause()).isInstanceOf(ParseException.class);
      assertThat(ex.getMessage()).isEqualTo("Cannot adopt Event Date string: WRONG_DATE_STRING");
    }
  }
}