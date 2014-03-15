package models.data.adapter.date;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static java.util.Calendar.YEAR;
import static java.util.TimeZone.getTimeZone;
import static models.util.Dates.parseDate;

public class VolvoDateAdapter
  implements DateAdapter {

  static final SimpleDateFormat LONG_DATE_FORMAT = new SimpleDateFormat("yyyy dd MMM HH:mm Z");

  @Override
  public Date adapt(String dateText) {
    if (null == dateText) return null;

    String normalizedDateText = Calendar.getInstance(getTimeZone("GMT")).get(YEAR) + " " + dateText + " +0100";
    return parseDate(normalizedDateText, LONG_DATE_FORMAT);
  }
}