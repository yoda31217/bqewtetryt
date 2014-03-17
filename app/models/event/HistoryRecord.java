package models.event;

import java.util.Date;

import static com.google.common.base.Preconditions.checkArgument;

public final class HistoryRecord {

  final Date         date;
  final double       highKof;
  final double       lowKof;
  final Organisation organisation;

  public HistoryRecord(Date date, Organisation organisation, double lowKof, double highKof) {
    checkArgument(lowKof <= highKof, "First kof cannot be greater than second: %s, %s", lowKof, highKof);

    this.date = date;
    this.organisation = organisation;
    this.lowKof = lowKof;
    this.highKof = highKof;
  }

  public Date date() {
    return date;
  }

  public double highKof() {
    return highKof;
  }

  public double lowKof() {
    return lowKof;
  }

  public Organisation organisation() {
    return organisation;
  }
}