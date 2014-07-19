package models.data.adapter.sport;

import models.event.EventSport;
import org.junit.Test;

import static models.event.EventSport.TENNIS;
import static models.event.EventSport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;

public class EngTextSportAdapterTest {

  @Test
  public void adapt_tennisText_returnTennis() {
    EventSport actualSport = new EngTextSportAdapter().adapt("Tennis");
    assertThat(actualSport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_unknownText_returnUnknown() {
    EventSport actualSport = new EngTextSportAdapter().adapt("SOME_UNKNOWN_TEXT");
    assertThat(actualSport).isEqualTo(UNKNOWN);
  }

  @Test
  public void adapt_nullText_returnUnknown() {
    EventSport actualSport = new EngTextSportAdapter().adapt(null);
    assertThat(actualSport).isEqualTo(UNKNOWN);
  }
}