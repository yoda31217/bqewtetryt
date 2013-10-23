package data.parser;

public class ParsedEvent {

  public final String firstSide;
  public final String secondSide;
  public final String date;
  public final String firstKof;
  public final String secondKof;

  public ParsedEvent(String firstSide, String secondSide, String date, String firstKof, String secondKof) {
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.date = date;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
  }
}