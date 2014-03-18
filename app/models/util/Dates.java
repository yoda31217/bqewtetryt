package models.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static java.lang.System.currentTimeMillis;

public final class Dates {

  public static final int SECS_IN_MILLIS = 1000;

  private Dates() {
    throw new UnsupportedOperationException();
  }

  public static Date create1secOldDate() {return new Date(new Date().getTime() - SECS_IN_MILLIS);}

  public static Date create5secsOldDate() {return new Date(new Date().getTime() - 5 * SECS_IN_MILLIS);}

  public static Date parseDate(String dateText, SimpleDateFormat format) {
    try {
      return format.parse(dateText);

    } catch (ParseException ex) {
      throw new IllegalArgumentException("Failed to parse date string: " + dateText, ex);
    }
  }

  public static long toMillisFromNow(Date date) {
    return currentTimeMillis() - date.getTime();
  }

  public static long toSecsFromNow(Date date) {
    return toMillisFromNow(date) / 1000L;
  }
}