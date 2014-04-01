package models.event;

public enum Sport {
  UNKNOWN("UK", "Unknown"),
  TENNIS("TE", "Tennis"),
  VOLLEYBALL("VB", "Volleyball"),
  TABLE_TENNIS("TT", "Table Tennis"),
  BASKETBALL("BB", "Basketball");

  public final  String label;
  private final String engName;

  Sport(String label, String engName) {
    this.label = label;
    this.engName = engName;
  }

  public static Sport sportFromEngName(String engName) {
    for (Sport sport : values()) {
      if (sport.engName.equals(engName)) return sport;
    }
    return UNKNOWN;
  }
}
