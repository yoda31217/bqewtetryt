package models.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static java.lang.System.currentTimeMillis;

// todo: tests
public class Dates {

  public static long secsFromNow(Date date) {
    return millisFromNow(date) / 1000L;
  }

  public static long millisFromNow(Date date) {
    return currentTimeMillis() - date.getTime();
  }

  public static Date parseDate(String dateText, SimpleDateFormat format) {
    try {
      return format.parse(dateText);

    } catch (ParseException ex) {
      throw new IllegalArgumentException("Failed to parse date string: " + dateText, ex);
    }
  }
}