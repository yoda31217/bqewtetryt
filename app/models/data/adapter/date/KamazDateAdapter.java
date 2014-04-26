package models.data.adapter.date;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.format.DateTimeFormatter;

import static org.joda.time.DateTimeZone.UTC;
import static org.joda.time.DateTimeZone.forID;
import static org.joda.time.format.DateTimeFormat.forPattern;

public class KamazDateAdapter implements DateAdapter {

  public static final DateTimeZone      TIME_ZONE = forID("Europe/Kiev");
  public static final DateTimeFormatter FORMATTER = forPattern("dd.MM - HH:mm").withZone(TIME_ZONE);

  @Override
  public DateTime adapt(String dateStr) {
    dateStr = dateStr.trim();
    int currentYear = new DateTime(TIME_ZONE).getYear();
    DateTimeFormatter formatter = FORMATTER.withDefaultYear(currentYear);
    return formatter.parseDateTime(dateStr).withZone(UTC);
  }
}