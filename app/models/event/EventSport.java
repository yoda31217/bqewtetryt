package models.event;

public enum EventSport {
  UNKNOWN("UK", "unknown"),
  BADMINTON("BT", "badminton"),
  TENNIS("TE", "tennis"),
  BASEBALL("BL", "baseball"),
  VOLLEYBALL("VB", "volleyball"),
  BEACH_VOLLEYBALL("BV", "beach volleyball"),
  TABLE_TENNIS("TT", "table tennis"),
  BASKETBALL("BB", "basketball");

  public final  String label;
  private final String engName;

  EventSport(String label, String engName) {
    this.label = label;
    this.engName = engName;
  }

  public static EventSport sportFromEngName(String unknownSportEngName) {
    if (null == unknownSportEngName) return UNKNOWN;

    unknownSportEngName = unknownSportEngName.trim().toLowerCase();

    for (EventSport sportCandidate : values())
      if (sportCandidate.engName.equals(unknownSportEngName)) return sportCandidate;

    return UNKNOWN;
  }
}
