package data;

import models.store.Organisation;
import models.store.Player;

import java.util.Date;

public class AdaptedEvent {

  public final Player firstPlayer;
  public final Player secondPlayer;
  public final double firstKof;
  public final double secondKof;
  public final Organisation organisation;
  public final Date date;
  public final Date adaptedDate;

  public AdaptedEvent(Player firstPlayer, Player secondPlayer, double firstKof, double secondKof, Organisation organisation, Date date) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
    this.organisation = organisation;
    this.date = date;
    this.adaptedDate = new Date();
  }
}