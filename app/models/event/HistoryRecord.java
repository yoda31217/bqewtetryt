package models.event;

import java.util.Date;

import static com.google.common.base.Preconditions.checkArgument;

public final class HistoryRecord {

  final Date date;
  final Organisation organisation;
  final double firstKof;
  final double secondKof;

  public HistoryRecord(Date date, Organisation organisation, double firstKof, double secondKof) {
    checkArgument(firstKof <= secondKof, "First kof cannot be greater than second: %s, %s", firstKof, secondKof);

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