package models.data.adapter.date;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class KamazDateAdapterTest {

  private KamazDateAdapter adapter;

  @Before
  public void before() { adapter = new KamazDateAdapter(); }

  @Test
  public void adapt_kamazDateStr_returnDate() {
    DateTime actualDate = adapter.adapt("02.04 - 14:05");
    assertThat(actualDate).isEqualTo(new DateTime(new DateTime().getYear(), 4, 2, 14, 5, 0));
  }

  @Test
  public void adapt_spacedKamazDate_returnDate() {
    adapter.adapt("     02.04 - 04:05     ");
  }
}