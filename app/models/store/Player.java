package models.store;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public final class Player {

  public final String firstName;
  public final String secondName;

  public Player(String firstName, String secondName) {
    this.firstName = firstName;
    this.secondName = secondName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Player player = (Player) o;

    String fn = firstName.trim().toLowerCase();
    String sn = secondName.trim().toLowerCase();
    String pfn = player.firstName.trim().toLowerCase();
    String psn = player.secondName.trim().toLowerCase();

    if (((fn.equals(pfn)) && (sn.equals(psn))) || ((fn.equals(psn)) && (sn.equals(pfn)))) return true;

    return false;
  }

  @Override
  public int hashCode() {
    int result = firstName.hashCode();
    result = 31 * result + secondName.hashCode();
    return result;
  }
}