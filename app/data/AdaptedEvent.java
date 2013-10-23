package data;

import models.store.Organisation;

import java.text.SimpleDateFormat;
import java.util.Date;

public class AdaptedEvent {

  static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd mm");
  public final String firstPlayer;
  public final String secondPlayer;
  public final double firstKof;
  public final double secondKof;
  public final Organisation organisation;
  public final Date date;
  public final Date adaptedDate;
  public final String code;

  public AdaptedEvent(String firstPlayer, String secondPlayer, double firstKof, double secondKof, Organisation organisation, Date date, Object firstPlayerCode,
                      String secondPlayerCode) {
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
    this.organisation = organisation;
    this.date = date;
    this.adaptedDate = new Date();
    this.code = firstPlayerCode + "_" + secondPlayerCode + "_" + DATE_FORMAT.format(date);
  }
}