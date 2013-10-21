package data.parser;

public class ParsedEvent {

  public final String firstPlayer;
  public final String secondPlayer;
  public final String date;
  public final String firstKof;
  public final String secondKof;

  public ParsedEvent(String firstPlayer, String secondPlayer, String date, String firstKof, String secondKof) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.date = date;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
  }
}