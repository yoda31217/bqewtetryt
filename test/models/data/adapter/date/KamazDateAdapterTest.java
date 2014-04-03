package models.data.adapter.date;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.fest.assertions.Assertions.assertThat;

public class KamazDateAdapterTest {

  private KamazDateAdapter adapter;

  @Before
  public void before() { adapter = new KamazDateAdapter(); }

  @Test
  public void adapt_kamazDate_returnDateWithoutHours() {
    Date actualDate = adapter.adapt("02.04 - 04:05");
    assertThat(actualDate).isEqualTo(new Date(new Date().getYear(), 3, 2));
  }

  @Test
  public void adapt_spacedKamazDate_returnDate() {
    adapter.adapt("     02.04 - 04:05     ");
  }
}