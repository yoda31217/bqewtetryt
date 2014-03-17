package models.util;

import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static models.util.Dates.parseDate;
import static models.util.Dates.toSecsFromNow;
import static models.util.Tests.callConstructor;
import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.fail;

public class DatesTest {

  public static final int MILLIS_IN_ONE_SEC = 1000;

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callConstructor(Dates.class);
  }

  @Test
  public void parseDate_wrongDateText_throwArgEx() {
    try {
      parseDate("WRONG_DATE_TEXT", new SimpleDateFormat("dd-MMM-yy hh:mm:ss"));
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Failed to parse date string: WRONG_DATE_TEXT");
      assertThat(ex.getCause()).isInstanceOf(ParseException.class);
    }
  }

  @Test
  public void secsFromNow_10secsOldDate_return10() {
    Date tenSecOldDate = new Date(new Date().getTime() - 10 * MILLIS_IN_ONE_SEC);
    long delayInSec = toSecsFromNow(tenSecOldDate);
    assertThat(delayInSec).isEqualTo(10L);
  }
}