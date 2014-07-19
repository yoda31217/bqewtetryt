package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.event.EventSport;
import models.event.EventType;

import java.util.EnumSet;
import java.util.List;

public class EventFilter implements Predicate<AdaptedEvent> {

  private EnumSet<EventSport> allowedSports;
  private EnumSet<EventType>  allowedTypes;

  public EventFilter(List<EventSport> allowedSports, List<EventType> allowedTypes) {
    this.allowedSports = EnumSet.copyOf(allowedSports);
    this.allowedTypes = EnumSet.copyOf(allowedTypes);
  }

  @Override
  public boolean apply(AdaptedEvent event) {
    return allowedTypes.contains(event.type) && allowedSports.contains(event.sport);
  }
}