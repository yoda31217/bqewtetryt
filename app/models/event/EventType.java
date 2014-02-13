package models.event;

public enum EventType {
  REGULAR("R"),
  LIVE("L");

  public final String label;

  EventType(String label) {
    this.label = label;
  }
}
