package models.event;

import org.junit.Test;

import java.util.Date;

import static models.event.Organisation.LANOS;
import static org.fest.assertions.Assertions.assertThat;
import static org.junit.Assert.fail;

public class HistoryRecordTest {

  @Test
  public void new_firstKofGreaterThanSecond_throwIllegalArgEx() {
    try {
      new HistoryRecord(new Date(), LANOS, 3.2, 1.5);
      fail();

    } catch (IllegalArgumentException ex) {
      assertThat(ex).hasMessage("First kof cannot be greater than second: 3.2, 1.5");
    }
  }
}