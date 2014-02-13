package models.data.parser;

public class ParsedEvent {

  public final String sportDescr;
  public final String firstSide;
  public final String secondSide;
  public final String date;
  public final String firstKof;
  public final String secondKof;

  public ParsedEvent(String sportDescr, String firstSide, String secondSide, String date, String firstKof, String secondKof) {
    this.sportDescr = sportDescr;
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.date = date;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
  }

  @Override
  public String toString() {
    return "ParsedEvent{" +
      "sportDescr='" + sportDescr + '\'' +
      ", firstSide='" + firstSide + '\'' +
      ", secondSide='" + secondSide + '\'' +
      ", date='" + date + '\'' +
      ", firstKof='" + firstKof + '\'' +
      ", secondKof='" + secondKof + '\'' +
      '}';
  }
}