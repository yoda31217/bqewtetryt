package models.data.adapter.date;

import java.util.Date;

import static java.lang.Integer.parseInt;

public class KamazDateAdapter implements DateAdapter {

  @Override
  public Date adapt(String dateStr) {
    dateStr = dateStr.trim();
    String dayStr = dateStr.substring(0, 2);
    String monthStr = dateStr.substring(3, 5);
    String hourStr = dateStr.substring(8, 10);
    String minStr = dateStr.substring(11, 13);

    return new Date(new Date().getYear(), parseInt(monthStr) - 1, parseInt(dayStr), parseInt(hourStr), parseInt(minStr), 0);
  }
}