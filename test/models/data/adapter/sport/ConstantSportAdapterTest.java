package models.data.adapter.sport;

import org.junit.Test;

import static models.event.EventSport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class ConstantSportAdapterTest {

  @Test
  public void adapt_configureWithTennis_returnTennis() {
    assertThat(new ConstantSportAdapter(TENNIS).adapt(null)).isEqualTo(TENNIS);
  }
}