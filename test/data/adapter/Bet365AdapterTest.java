package data.adapter;

import data.AdaptedEvent;
import data.parser.ParsedEvent;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Calendar;
import java.util.Date;

import static java.util.Calendar.DAY_OF_MONTH;
import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.OCTOBER;
import static java.util.Calendar.SECOND;
import static java.util.TimeZone.getTimeZone;
import static models.store.Organisation.BET365;
import static org.fest.assertions.Assertions.assertThat;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Date.class, AdaptedEvent.class})
public class Bet365AdapterTest {

  @Test
  public void parse()
    throws Exception {
    Date adaptedDate = new Date();
    PowerMockito.whenNew(Date.class).withNoArguments().thenReturn(adaptedDate);

    ParsedEvent event = new ParsedEvent("Florian Mayer", "Kristina Mladenovic & Flavia Pennetta", "11 Oct 07:30", "3.50", "1.28");
    AdaptedEvent adaptedEvent = new Bet365Adapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(OCTOBER, 11);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 7);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);
    assertThat(adaptedEvent.date).isEqualTo(calendar.getTime());

    assertThat(adaptedEvent.organisation).isEqualTo(BET365);
    assertThat(adaptedEvent.firstPlayer.firstName).isEqualTo("Florian");
    assertThat(adaptedEvent.firstPlayer.secondName).isEqualTo("Mayer");
    assertThat(adaptedEvent.secondPlayer.firstName).isEqualTo("Kristina Mladenovic");
    assertThat(adaptedEvent.secondPlayer.secondName).isEqualTo("Flavia Pennetta");
    assertThat(adaptedEvent.firstKof).isEqualTo(3.5);
    assertThat(adaptedEvent.secondKof).isEqualTo(1.28);
    assertThat(adaptedEvent.adaptedDate).isSameAs(adaptedDate);
  }

  @Test
  public void date24hours()
    throws Exception {
    ParsedEvent event = new ParsedEvent("Florian Mayer", "Kristina Mladenovic & Flavia Pennetta", "11 Oct 12:30", "3.50", "1.28");
    AdaptedEvent adaptedEvent = new Bet365Adapter().adapt(event);

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(OCTOBER, 11);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 12);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);
    assertThat(adaptedEvent.date).isEqualTo(calendar.getTime());
  }
}