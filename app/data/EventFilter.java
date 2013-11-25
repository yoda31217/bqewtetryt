package data;

import com.google.common.base.Predicate;
import data.adapter.AdaptedEvent;

import javax.annotation.Nullable;

import static models.store.Sport.TENNIS;

public class EventFilter
  implements Predicate<AdaptedEvent> {

  @Override
  public boolean apply(@Nullable AdaptedEvent event) {
    return TENNIS.equals(event.sport);
  }
}