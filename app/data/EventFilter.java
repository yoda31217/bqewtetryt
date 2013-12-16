package data;

import com.google.common.base.Predicate;
import data.adapter.AdaptedEvent;

import javax.annotation.Nullable;

import static models.store.EventType.LIVE;
import static models.store.Sport.TENNIS;
import static models.store.Sport.VALLEYBALL;

public class EventFilter
  implements Predicate<AdaptedEvent> {

  @Override
  public boolean apply(@Nullable AdaptedEvent event) {
    if (LIVE.equals(event.type)) {
      return TENNIS.equals(event.sport) || VALLEYBALL.equals(event.sport);
    }
    return false;
  }
}