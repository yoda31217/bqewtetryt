package data;

import data.adapter.AdaptedEvent;
import org.junit.Test;

import static models.store.EventType.LIVE;
import static models.store.EventType.REGULAR;
import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TENNIS;
import static models.store.Sport.VALLEYBALL;
import static org.fest.assertions.Assertions.assertThat;

public class EventFilterTest {

  @Test
  public void apply_regularEvent_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, TENNIS, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }

  @Test
  public void apply_tennisLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, TENNIS, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isTrue();
  }

  @Test
  public void apply_valleyballLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, VALLEYBALL, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isTrue();
  }

  @Test
  public void apply_basketballLiveEvent_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(LIVE, BASKETBALL, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }
}