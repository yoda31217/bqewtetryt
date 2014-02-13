package models.event;

public enum Organisation {
  LANOS("L"),
  VOLVO("V"),
  UNKNOWN("U");

  public final String label;

  Organisation(String label) {
    this.label = label;
  }
}
