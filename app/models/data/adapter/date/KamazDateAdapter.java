package models.data.adapter.date;

import org.joda.time.DateTime;

import static java.lang.Integer.parseInt;

public class KamazDateAdapter implements DateAdapter {

  @Override
  public DateTime adapt(String dateStr) {
    dateStr = dateStr.trim();
    String dayStr = dateStr.substring(0, 2);
    String monthStr = dateStr.substring(3, 5);
    String hourStr = dateStr.substring(8, 10);
    String minStr = dateStr.substring(11, 13);

    return new DateTime(new DateTime().getYear(), parseInt(monthStr), parseInt(dayStr), parseInt(hourStr), parseInt(minStr), 0);
  }
}