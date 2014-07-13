package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

public class NowDateAdapter implements DateAdapter {

  @Override
  public DateTime adapt(String dateText) {
    return new DateTime(DateTimeZone.forID("Europe/Kiev"));
  }
}