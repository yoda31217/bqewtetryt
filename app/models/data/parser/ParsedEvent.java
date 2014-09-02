package models.data.parser;

public class ParsedEvent {

  public final String date;
  public final String highKof;
  public final String lowKof;
  public final String side1;
  public final String side2;
  public final String sport;
  public final String externalId;

  public ParsedEvent(String externalId, String side1, String side2, String date, String lowKof, String highKof) {
    this(externalId, null, side1, side2, date, lowKof, highKof);
  }

  public ParsedEvent(String externalId, String sport, String side1, String side2, String date, String lowKof, String highKof) {
    this.sport = sport;
    this.side1 = side1;
    this.side2 = side2;
    this.date = date;
    this.lowKof = lowKof;
    this.highKof = highKof;
    this.externalId = externalId;
  }

  @Override
  public String toString() {
    return "ParsedEvent{" +
           "externalId='" + externalId + '\'' +
           ", sport='" + sport + '\'' +
           ", side1='" + side1 + '\'' +
           ", side2='" + side2 + '\'' +
           ", date='" + date + '\'' +
           ", lowKof='" + lowKof + '\'' +
           ", highKof='" + highKof + '\'' +
           '}';
  }
}