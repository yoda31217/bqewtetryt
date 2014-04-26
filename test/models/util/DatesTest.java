package models.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.junit.Test;

import static models.util.Dates.monthIndexFromRusName;
import static models.util.Dates.parseDate;
import static models.util.Dates.toSecsFromNow;
import static models.util.Tests.callConstructor;
import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.fail;

public class DatesTest {

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callConstructor(Dates.class);
  }

  @Test
  public void monthIndexFromRusName_novName_return10() {
    int actualMonthIndex = monthIndexFromRusName("ноя");
    assertThat(actualMonthIndex).isEqualTo(10);
  }

  @Test
  public void monthIndexFromRusName_wrongName_throwEx() {
    try {
      monthIndexFromRusName("123");
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Failed to find index for russian month name: 123");
    }
  }

  @Test
  public void parseDate_wrongDateText_throwArgEx() {
    try {
      parseDate("WRONG_DATE_TEXT", DateTimeFormat.forPattern("dd-MMM-yy hh:mm:ss"));
      fail("Should not reach this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Invalid format: \"WRONG_DATE_TEXT\"");
      //      assertThat(ex.getCause()).isInstanceOf(ParseException.class);
    }
  }

  @Test
  public void secsFromNow_10secsOldDate_return10() {
    DateTime tenSecOldDate = new DateTime().minusSeconds(10);
    long delayInSec = toSecsFromNow(tenSecOldDate);
    assertThat(delayInSec).isEqualTo(10L);
  }
}