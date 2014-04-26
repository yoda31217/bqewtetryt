package models.data.adapter;

import models.event.EventType;
import models.event.Organisation;
import models.event.Sport;
import org.joda.time.DateTime;

import java.util.List;

import static org.joda.time.DateTimeZone.UTC;

public class AdaptedEvent {

  public final DateTime     adoptedDate;
  public final DateTime     eventDate;
  public final double       highKof;
  public final double       lowKof;
  public final Organisation organisation;
  public final List<String> side1;
  public final List<String> side2;
  public final Sport        sport;
  public final EventType    type;

  public AdaptedEvent(EventType type, Sport sport, List<String> side1, List<String> side2, double lowKof, double highKof, Organisation organisation,
                      DateTime eventDate) {
    this.type = type;
    this.sport = sport;
    this.side1 = side1;
    this.side2 = side2;
    this.lowKof = lowKof;
    this.highKof = highKof;
    this.organisation = organisation;
    this.eventDate = eventDate;
    this.adoptedDate = new DateTime(UTC);
  }

  @Override
  public String toString() {
    return "AdaptedEvent{" +
           "adoptedDate=" + adoptedDate +
           ", eventDate=" + eventDate +
           ", highKof=" + highKof +
           ", lowKof=" + lowKof +
           ", organisation=" + organisation +
           ", side1='" + side1 + '\'' +
           ", side2='" + side2 + '\'' +
           ", sport=" + sport +
           ", type=" + type +
           '}';
  }
}