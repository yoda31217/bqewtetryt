package models.event;

import org.joda.time.DateTime;

import static com.google.common.base.Preconditions.checkArgument;

public final class HistoryRecord {

  final DateTime     date;
  final double       highKof;
  final double       lowKof;
  final Organisation organisation;

  public HistoryRecord(DateTime date, Organisation organisation, double lowKof, double highKof) {
    checkArgument(lowKof <= highKof, "First kof cannot be greater than second: %s, %s", lowKof, highKof);

    this.date = date;
    this.organisation = organisation;
    this.lowKof = lowKof;
    this.highKof = highKof;
  }

  public DateTime date() { return date; }

  public double highKof() {
    return highKof;
  }

  public double lowKof() {
    return lowKof;
  }

  public Organisation organisation() {
    return organisation;
  }

  @Override
  public String toString() {
    return "HistoryRecord{" +
           "date=" + date +
           ", highKof=" + highKof +
           ", lowKof=" + lowKof +
           ", organisation=" + organisation +
           '}';
  }
}