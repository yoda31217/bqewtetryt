package models.util;

import org.junit.Test;

import java.util.Date;

import static models.util.Dates.toSecsFromNow;
import static org.fest.assertions.Assertions.assertThat;

public class DatesTest {

  @Test
  public void secsFromNow_10secsOldDate_return10() {
    Date oldDate = new Date(new Date().getTime() - 10 * 1000);
    long delayInSec = toSecsFromNow(oldDate);
    assertThat(delayInSec).isEqualTo(10L);
  }
}