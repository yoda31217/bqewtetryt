package models.event;

import org.junit.Test;

import static models.event.Sport.BEACH_VOLLEYBALL;
import static models.event.Sport.TENNIS;
import static models.event.Sport.UNKNOWN;
import static models.event.Sport.sportFromEngName;
import static org.fest.assertions.Assertions.assertThat;

public class SportTest {

  @Test
  public void sportFromEngName_engSportName_returnSport() {
    assertThat(sportFromEngName("Tennis")).isSameAs(TENNIS);
  }

  @Test
  public void sportFromEngName_wrongEngSportName_returnUnknown() {
    assertThat(sportFromEngName("Wrong Eng Sport Name")).isSameAs(UNKNOWN);
  }

  @Test
  public void sportFromEngName_BeachVolleyballSportName_returnBeachVolleyball() {
    assertThat(sportFromEngName("Beach Volleyball")).isSameAs(BEACH_VOLLEYBALL);
  }

  @Test
  public void sportFromEngName_nullSportName_returnUnknown() {
    assertThat(sportFromEngName(null)).isSameAs(UNKNOWN);
  }
}