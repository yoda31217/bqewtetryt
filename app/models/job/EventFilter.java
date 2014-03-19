package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.event.EventType;
import models.event.Sport;

import java.util.EnumSet;
import java.util.List;

public class EventFilter implements Predicate<AdaptedEvent> {

  private EnumSet<Sport>     allowedSports;
  private EnumSet<EventType> allowedTypes;

  public EventFilter(List<Sport> allowedSports, List<EventType> allowedTypes) {
    this.allowedSports = EnumSet.copyOf(allowedSports);
    this.allowedTypes = EnumSet.copyOf(allowedTypes);
  }

  @Override
  public boolean apply(AdaptedEvent event) {
    return allowedTypes.contains(event.type) && allowedSports.contains(event.sport);
  }
}