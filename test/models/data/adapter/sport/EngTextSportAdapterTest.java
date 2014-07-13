package models.data.adapter.sport;

import models.event.Sport;
import org.junit.Test;

import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;

public class EngTextSportAdapterTest {

  @Test
  public void adapt_tennisText_returnTennis() {
    Sport actualSport = new EngTextSportAdapter().adapt("Tennis");
    assertThat(actualSport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_unknownText_returnUnknown() {
    Sport actualSport = new EngTextSportAdapter().adapt("SOME_UNKNOWN_TEXT");
    assertThat(actualSport).isEqualTo(UNKNOWN);
  }

  @Test
  public void adapt_nullText_returnUnknown() {
    Sport actualSport = new EngTextSportAdapter().adapt(null);
    assertThat(actualSport).isEqualTo(UNKNOWN);
  }
}