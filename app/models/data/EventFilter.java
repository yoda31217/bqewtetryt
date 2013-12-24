package models.data;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.event.Sport;

import javax.annotation.Nullable;
import java.util.EnumSet;

import static models.event.EventType.LIVE;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.VOLLEYBALL;

public class EventFilter
  implements Predicate<AdaptedEvent> {

  public static final EnumSet<Sport> ALLOWED_LIVE_SPORTS = EnumSet.of(TENNIS, TABLE_TENNIS, VOLLEYBALL, BASKETBALL);

  @Override
  public boolean apply(@Nullable AdaptedEvent event) {
    return LIVE.equals(event.type) && ALLOWED_LIVE_SPORTS.contains(event.sport);
  }
}