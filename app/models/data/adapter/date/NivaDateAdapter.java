package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import static java.lang.Long.parseLong;
import static org.joda.time.DateTimeZone.UTC;

public class NivaDateAdapter implements DateAdapter {

  @Override
  public DateTime adapt(String dateText) {
    return new DateTime(parseLong(dateText) * 1000L, DateTimeZone.forID("Europe/Kiev")).withZone(UTC);
  }
}