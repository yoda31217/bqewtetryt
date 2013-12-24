package models.data.adapter;

import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;

public class AdaptedEvent {

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
    this.code = firstSideCode + "_" + secondSideCode;
  }
}