package models.job;

import models.data.adapter.AdaptedEvent;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;

public class EventFilterTest {

  private final EventFilter eventFilter = new EventFilter(newArrayList(TENNIS, TABLE_TENNIS), newArrayList(REGULAR));

  @Test
  public void apply_firstSport_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, TABLE_TENNIS, null, null, 1.0, 1.0, null, null);
    assertThat(eventFilter.apply(event)).isTrue();
  }

  @Test
  public void apply_notSameType_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(LIVE, TENNIS, null, null, 1.0, 1.0, null, null);
    assertThat(eventFilter.apply(event)).isFalse();
  }

  @Test
  public void apply_otherSport_returnFalse() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, UNKNOWN, null, null, 1.0, 1.0, null, null);
    assertThat(eventFilter.apply(event)).isFalse();
  }

  @Test
  public void apply_sameType_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, TENNIS, null, null, 1.0, 1.0, null, null);
    boolean isApplied = eventFilter.apply(event);
    assertThat(isApplied).isTrue();
  }

  @Test
  public void apply_secondSport_returnTrue() {
    AdaptedEvent event = new AdaptedEvent(REGULAR, TENNIS, null, null, 1.0, 1.0, null, null);
    assertThat(eventFilter.apply(event)).isTrue();
  }
}