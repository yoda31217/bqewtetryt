package models.util;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormatter;

import static java.lang.System.currentTimeMillis;

public final class Dates {

  public static final int      SECS_IN_MILLIS  = 1000;
  public static final String[] RUS_MONTH_NAMES = new String[]{"янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"};

  private Dates() {
    throw new UnsupportedOperationException();
  }

  public static DateTime create1secOldDate() {return new DateTime().minusSeconds(1);}

  public static DateTime create5secsOldDate() {return new DateTime().minusSeconds(5);}

  public static int monthIndexFromRusName(String rusMonthName) {
    for (int i = 0; i < RUS_MONTH_NAMES.length; i++)
      if (RUS_MONTH_NAMES[i].equals(rusMonthName)) return i;

    throw new IllegalArgumentException("Failed to find index for russian month name: " + rusMonthName);
  }

  public static DateTime parseDate(String dateText, DateTimeFormatter format) {
    return format.parseDateTime(dateText);
  }

  public static long toMillisFromNow(DateTime date) {
    return currentTimeMillis() - date.getMillis();
  }

  public static long toSecsFromNow(DateTime date) {
    return toMillisFromNow(date) / 1000L;
  }
}