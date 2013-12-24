package models.test;

import org.fest.assertions.Condition;
import org.mockito.internal.matchers.apachecommons.ReflectionEquals;

public class BMatchers {

  private BMatchers() {
    throw new UnsupportedOperationException();
  }

  public static Condition<Object> reflectionEq(final Object wanted) {
    return new Condition<Object>("reflection equality to " + wanted.toString()) {

      @Override
      public boolean matches(Object actual) {
        return new ReflectionEquals(wanted).matches(actual);
      }
    };
  }
}