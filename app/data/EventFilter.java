package data;

import com.google.common.base.Predicate;
import data.adapter.AdaptedEvent;

import javax.annotation.Nullable;
import java.util.EnumSet;

import static models.store.EventType.LIVE;
import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TABLE_TENNIS;
import static models.store.Sport.TENNIS;
import static models.store.Sport.VOLLEYBALL;

public class EventFilter
  implements Predicate<AdaptedEvent> {

  public static final EnumSet<models.store.Sport> ALLOWED_LIVE_SPORTS = EnumSet.of(TENNIS, TABLE_TENNIS, VOLLEYBALL, BASKETBALL);

  @Override
  public boolean apply(@Nullable AdaptedEvent event) {
    return LIVE.equals(event.type) && ALLOWED_LIVE_SPORTS.contains(event.sport);
  }
}