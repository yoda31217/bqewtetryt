package models.event;

import org.joda.time.DateTime;
import org.junit.Test;

import static models.event.EventOrganisation.LANOS;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.junit.Assert.fail;

public class EventHistoryRecordTest {

  @Test
  public void new_lowKofGreaterThanHighKof_throwIllegalArgEx() {
    try {
      new EventHistoryRecord(new DateTime(UTC), LANOS, 3.2, 1.5);
      fail();

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("First kof cannot be greater than second: 3.2, 1.5");
    }
  }
}