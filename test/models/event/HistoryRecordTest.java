package models.event;

import org.joda.time.DateTime;
import org.junit.Test;

import static models.event.Organisation.LANOS;
import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.fail;

public class HistoryRecordTest {

  @Test
  public void new_lowKofGreaterThanHighKof_throwIllegalArgEx() {
    try {
      new HistoryRecord(new DateTime(), LANOS, 3.2, 1.5);
      fail();

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("First kof cannot be greater than second: 3.2, 1.5");
    }
  }
}