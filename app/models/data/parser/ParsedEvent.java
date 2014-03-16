package models.data.parser;

public class ParsedEvent {

  public final String sportDescr;
  public final String side1;
  public final String side2;
  public final String date;
  public final String firstKof;
  public final String secondKof;

  public ParsedEvent(String sportDescr, String side1, String side2, String date, String firstKof, String secondKof) {
    this.sportDescr = sportDescr;
    this.side1 = side1;
    this.side2 = side2;
    this.date = date;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
  }

  @Override
  public String toString() {
    return "ParsedEvent{" +
      "sportDescr='" + sportDescr + '\'' +
      ", side1='" + side1 + '\'' +
      ", side2='" + side2 + '\'' +
      ", date='" + date + '\'' +
      ", firstKof='" + firstKof + '\'' +
      ", secondKof='" + secondKof + '\'' +
      '}';
  }
}