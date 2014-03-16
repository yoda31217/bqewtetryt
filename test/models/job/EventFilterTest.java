package models.job;

import models.data.adapter.AdaptedEvent;
import org.junit.Test;

import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.VOLLEYBALL;
import static org.fest.assertions.Assertions.assertThat;

public class EventFilterTest {

  @Test
  public void apply_regularEvent_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, TENNIS, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isTrue();
  }

  @Test
  public void apply_tennisLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, TENNIS, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }

  @Test
  public void apply_volleyballLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, VOLLEYBALL, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }

  @Test
  public void apply_basketballLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, BASKETBALL, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }

  @Test
  public void apply_tableTennisLiveEvent_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(LIVE, TABLE_TENNIS, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }

  @Test
  public void apply_unknownLiveEvent_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(LIVE, UNKNOWN, null, null, 1.0, 1.0, null, null, null, null);
    assertThat(new EventFilter().apply(event)).isFalse();
  }
}