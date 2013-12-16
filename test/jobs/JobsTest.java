package jobs;

import data.EventFilter;
import data.adapter.AdaptedEvent;
import org.junit.Test;

import java.util.Date;

import static models.store.EventType.LIVE;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class JobsTest {

  private EventFilter eventFilter = new EventFilter();

  @Test
  public void eventFilter_tennisLiveEvent_applied() {
    AdaptedEvent event = new AdaptedEvent(LIVE, TENNIS, "side1", "side", 1.1, 2.2, VOLVO, new Date(), "side1_code", "side2_code");
    assertThat(eventFilter.apply(event)).isTrue();
  }

  @Test
  public void eventFilter_basketballLiveEvent_notApplied() {
    AdaptedEvent event = new AdaptedEvent(LIVE, BASKETBALL, "side1", "side", 1.1, 2.2, VOLVO, new Date(), "side1_code", "side2_code");
    assertThat(eventFilter.apply(event)).isFalse();
  }
}