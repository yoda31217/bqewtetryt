package models.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static java.lang.System.currentTimeMillis;

public final class Dates {

  public static final int      SECS_IN_MILLIS  = 1000;
  public static final String[] RUS_MONTH_NAMES = new String[]{"янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"};

  private Dates() {
    throw new UnsupportedOperationException();
  }

  public static Date create1secOldDate() {return new Date(new Date().getTime() - SECS_IN_MILLIS);}

  public static Date create5secsOldDate() {return new Date(new Date().getTime() - 5 * SECS_IN_MILLIS);}

  public static int monthIndexFromRusName(String rusMonthName) {
    for (int i = 0; i < RUS_MONTH_NAMES.length; i++)
      if (RUS_MONTH_NAMES[i].equals(rusMonthName)) return i;

    throw new IllegalArgumentException("Failed to find index for russian month name: " + rusMonthName);
  }

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