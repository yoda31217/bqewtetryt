package models.util;

import models.event.Sport;
import org.junit.Test;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TENNIS;
import static models.util.Objects2.enumsFromStrings;
import static models.util.Tests.callPrivateConstructor;
import static org.fest.assertions.Assertions.assertThat;

public class Objects2Test {

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callPrivateConstructor(Objects2.class);
  }

  @Test
  public void enumsFromStrings_always_returnEnumsInOrder() {
    List<Sport> actualEnums = enumsFromStrings(Sport.class, newArrayList(TENNIS.toString(), BASKETBALL.toString()));
    assertThat(actualEnums).containsExactly(TENNIS, BASKETBALL);
  }
}