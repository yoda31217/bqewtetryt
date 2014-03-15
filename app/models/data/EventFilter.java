package models.data;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.event.Sport;

import java.util.EnumSet;

import static models.event.EventType.REGULAR;
import static models.event.Sport.TENNIS;

public class EventFilter
  implements Predicate<AdaptedEvent> {

  public static final EnumSet<Sport> ALLOWED_LIVE_SPORTS = EnumSet.of(TENNIS);

  @Override
  public boolean apply(AdaptedEvent event) {
    return REGULAR.equals(event.type) && ALLOWED_LIVE_SPORTS.contains(event.sport);
  }
}