package models.data.adapter.date;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class NivaDateAdapterTest {

  private NivaDateAdapter adapter;

  @Before
  public void before() { adapter = new NivaDateAdapter(); }

  @Test
  public void adapt_dateInSecsStr_returnDate() {
    DateTime dateNow = new DateTime().withMillisOfSecond(0);
    long inputDateInSecs = dateNow.getMillis() / 1000L;

    DateTime actualDate = adapter.adapt(String.valueOf(inputDateInSecs));

    assertThat(actualDate).isEqualTo(dateNow);
  }
}