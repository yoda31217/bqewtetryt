package models.test;

import org.junit.Test;

import static models.test.BMatchers.reflectionEq;
import static models.util.Tests.callConstructor;
import static org.fest.assertions.Assertions.assertThat;

public class BMatchersTest {

  private int testField;

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported() throws Exception {
    callConstructor(BMatchers.class);
  }

  @Test
  public void refEqReturnsTrue() {
    BMatchersTest expected = new BMatchersTest();
    expected.testField = 1;
    BMatchersTest actual = new BMatchersTest();
    actual.testField = 1;

    assertThat(actual).satisfies(reflectionEq(expected));
  }

  @Test
  public void refEqReturnsFalse() {
    BMatchersTest expected = new BMatchersTest();
    expected.testField = 2;
    BMatchersTest actual = new BMatchersTest();
    actual.testField = 1;

    assertThat(actual).doesNotSatisfy(reflectionEq(expected));
  }
}