package data.adapter;

import models.store.EventType;
import models.store.Organisation;
import models.store.Sport;

import java.text.SimpleDateFormat;
import java.util.Date;

public class AdaptedEvent {

  static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd mm");
  public final String firstSide;
  public final String secondSide;
  public final double firstKof;
  public final double secondKof;
  public final Organisation organisation;
  public final Date eventDate;
  public final Date adoptedDate;
  public final String code;
  public final EventType type;
  public final Sport sport;

  public AdaptedEvent(EventType type, Sport sport, String firstSide, String secondSide, double firstKof, double secondKof, Organisation organisation,
                      Date eventDate, Object firstSideCode, String secondSideCode) {
    this.type = type;
    this.sport = sport;
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
    this.organisation = organisation;
    this.eventDate = eventDate;
    this.adoptedDate = new Date();
    this.code = firstSideCode + "_" + secondSideCode + "_" + DATE_FORMAT.format(eventDate);
  }
}