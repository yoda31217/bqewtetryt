package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.junit.After;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeUtils.setCurrentMillisFixed;
import static org.joda.time.DateTimeUtils.setCurrentMillisSystem;

public class NowDateAdapterTest {

  @After
  public void after() {
    setCurrentMillisSystem();
  }

  @Test
  public void adapt_always_returnDateNow() {
    DateTime expectedDate = new DateTime(DateTimeZone.forID("Europe/Kiev"));
    setCurrentMillisFixed(expectedDate.getMillis());

    DateTime actualDate = new NowDateAdapter().adapt(null);

    assertThat(actualDate).isEqualTo(expectedDate);
  }
}