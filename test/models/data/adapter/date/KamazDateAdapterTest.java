package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.joda.time.DateTimeZone.forID;

public class KamazDateAdapterTest {

  private KamazDateAdapter adapter;

  @Before
  public void before() { adapter = new KamazDateAdapter(); }

  @Test
  public void adapt_kamazDateStr_returnDate() {
    DateTime actualDate = adapter.adapt("02.04 - 14:05");

    DateTimeZone kamazTimeZone = forID("Europe/Kiev");
    int currentYear = new DateTime(kamazTimeZone).getYear();
    assertThat(actualDate).isEqualTo(new DateTime(currentYear, 4, 2, 14, 5, 0, kamazTimeZone).withZone(UTC));
  }

  @Test
  public void adapt_spacedKamazDate_returnDate() {
    adapter.adapt("     02.04 - 04:05     ");
  }
}