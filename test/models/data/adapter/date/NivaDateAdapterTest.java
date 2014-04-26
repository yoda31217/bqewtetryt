package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;

public class NivaDateAdapterTest {

  private NivaDateAdapter adapter;

  @Before
  public void before() { adapter = new NivaDateAdapter(); }

  @Test
  public void adapt_dateInSecsStr_returnDate() {
    DateTime now = new DateTime(DateTimeZone.forID("Europe/Kiev")).withMillisOfSecond(0);
    DateTime actualDate = adapter.adapt(String.valueOf(now.getMillis() / 1000L));
    assertThat(actualDate).isEqualTo(now.withZone(UTC));
  }
}