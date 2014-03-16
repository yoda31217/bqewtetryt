package models.data.adapter.date;

import org.junit.Before;
import org.junit.Test;

import java.util.Calendar;
import java.util.Date;

import static java.util.Calendar.DAY_OF_MONTH;
import static java.util.Calendar.HOUR_OF_DAY;
import static java.util.Calendar.MILLISECOND;
import static java.util.Calendar.MINUTE;
import static java.util.Calendar.MONTH;
import static java.util.Calendar.OCTOBER;
import static java.util.Calendar.SECOND;
import static java.util.TimeZone.getTimeZone;
import static org.fest.assertions.Assertions.assertThat;

public class VolvoDateAdapterTest {

  private VolvoDateAdapter adapter;

  @Before
  public void before() {
    adapter = new VolvoDateAdapter();
  }

  @Test
  public void adapt_ddMMMhhmmText_returnDate() {
    Date actualDate = adapter.adapt("11 Oct 12:30");

    Calendar calendar = Calendar.getInstance(getTimeZone("GMT+1"));
    calendar.set(MONTH, OCTOBER);
    calendar.set(DAY_OF_MONTH, 11);
    calendar.set(HOUR_OF_DAY, 12);
    calendar.set(MINUTE, 30);
    calendar.set(SECOND, 0);
    calendar.set(MILLISECOND, 0);

    assertThat(actualDate).isEqualTo(calendar.getTime());
  }

  @Test
  public void adapt_nullText_returnNull() {
    Date actualDate = adapter.adapt(null);
    assertThat(actualDate).isEqualTo(null);
  }
}