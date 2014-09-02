package models.event;

public enum EventOrganisation {
  LANOS("L"),
  VOLVO("V"),
  NIVA("N"),
  KAMAZ("K"),
  FORD("F"),
  UNKNOWN("U");

  public final String label;

  EventOrganisation(String label) {
    this.label = label;
  }
}
