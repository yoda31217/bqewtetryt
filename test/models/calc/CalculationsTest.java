package models.calc;

import org.junit.Test;

import static models.util.Tests.callPrivateConstructor;

public class CalculationsTest {

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callPrivateConstructor(Calculations.class);
  }
}