package models.data.adapter;

import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;

public class AdaptedEvent {

  public final String side1;
  public final String side2;
  public final double firstKof;
  public final double secondKof;
  public final Organisation organisation;
  public final Date eventDate;
  public final Date adoptedDate;
  public final String code;
  public final EventType type;
  public final Sport sport;

  public AdaptedEvent(EventType type, Sport sport, String side1, String side2, double firstKof, double secondKof, Organisation organisation, Date eventDate,
                      Object side1Code, String side2Code) {
    this.type = type;
    this.sport = sport;
    this.side1 = side1;
    this.side2 = side2;
    this.firstKof = firstKof;
    this.secondKof = secondKof;
    this.organisation = organisation;
    this.eventDate = eventDate;
    this.adoptedDate = new Date();
    this.code = side1Code + "_" + side2Code;
  }
}