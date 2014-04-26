package models.data.adapter.date;

import org.joda.time.DateTime;

import static java.lang.Long.parseLong;

public class NivaDateAdapter implements DateAdapter {

  @Override
  public DateTime adapt(String dateText) {
    return new DateTime(parseLong(dateText) * 1000L);
  }
}