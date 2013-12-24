package models.event;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public final class HistoryRecord {

  final Date date;
  final Organisation organisation;
  final double firstKof;
  final double secondKof;

  public HistoryRecord(Date date, Organisation organisation, double firstKof, double secondKof) {
    this.date = date;
    this.organisation = organisation;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
  }

  public Date date() {
    return date;
  }

  public double firstKof() {
    return firstKof;
  }

  public Organisation organisation() {
    return organisation;
  }

  public double secondKof() {
    return secondKof;
  }
}