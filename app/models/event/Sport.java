package models.event;

public enum Sport {
  UNKNOWN("UK"),
  TENNIS("TE"),
  VOLLEYBALL("VB"),
  TABLE_TENNIS("TT"),
  BASKETBALL("BB");

  public final String label;

  Sport(String label) {
    this.label = label;
  }
}
