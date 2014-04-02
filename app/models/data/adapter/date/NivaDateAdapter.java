package models.data.adapter.date;

import java.util.Date;

import static java.lang.Long.parseLong;

public class NivaDateAdapter implements DateAdapter {

  @Override
  public Date adapt(String dateText) {
    Date parsedDate = new Date(parseLong(dateText) * 1000L);
    return new Date(parsedDate.getYear(), parsedDate.getMonth(), parsedDate.getDate());
  }
}