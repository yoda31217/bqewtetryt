package models.data.adapter.date;

import java.util.Date;

import static models.util.Dates.monthIndexFromRusName;

public class NivaDateAdapter implements DateAdapter {

  @Override
  public Date adapt(String dateText) {
    String[] dateTextParts = dateText.trim().split(" ");
    int monthIndex = monthIndexFromRusName(dateTextParts[1]);
    int dayIndex = Integer.parseInt(dateTextParts[0]);
    return new Date(new Date().getYear(), monthIndex, dayIndex);
  }
}