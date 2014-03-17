package models.calc;

import org.junit.Test;

import static models.util.BObjects.callConstructor;

public class CalculationsTest {

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported() throws Exception {
    callConstructor(Calculations.class);
  }
}