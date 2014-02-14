package models.util;

import java.util.Date;

import static java.lang.System.currentTimeMillis;

public class Dates {

  public static long secsFromNow(Date date) {
    return millisFromNow(date) / 1000L;
  }

  public static long millisFromNow(Date date) {
    return currentTimeMillis() - date.getTime();
  }
}