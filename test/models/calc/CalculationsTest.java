package models.calc;

import org.junit.Test;

import static models.util.Tests.callConstructor;

public class CalculationsTest {

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callConstructor(Calculations.class);
  }
}