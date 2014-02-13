package models.util;

import java.util.Date;

import static java.lang.System.currentTimeMillis;

public class Dates {

  public static long secsFromNow(Date date) {
    long nowInMillis = currentTimeMillis();
    long delayInMillis = nowInMillis - date.getTime();
    return delayInMillis / 1000L;
  }
}