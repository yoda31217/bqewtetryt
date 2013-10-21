package data;

import models.store.Organisation;
import models.store.Player;

import java.text.SimpleDateFormat;
import java.util.Date;

public class AdaptedEvent {

  static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");

  public final Player firstPlayer;
  public final Player secondPlayer;
  public final double firstKof;
  public final double secondKof;
  public final Organisation organisation;
  public final Date date;
  public final Date adaptedDate;
  public final String code;

  public AdaptedEvent(Player firstPlayer, Player secondPlayer, double firstKof, double secondKof, Organisation organisation, Date date, Object firstPlayerCode,
                      String secondPlayerCode) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
    this.organisation = organisation;
    this.date = date;
    this.adaptedDate = new Date();
    this.code = DATE_FORMAT.format(date) + "_" + firstPlayerCode + "_" + secondPlayerCode;
  }
}