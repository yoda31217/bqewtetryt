package models.util;

import org.fest.assertions.Condition;
import org.joda.time.DateTime;

import java.util.List;

public final class Conditions {

  public static final long ONE_SEC_IN_MILLIS = 1000L;

  private Conditions() {
    throw new UnsupportedOperationException();
  }

  public static Condition<Object> equalToAsString(final Object expectedObject) {
    return new Condition<Object>() {
      @Override
      public boolean matches(Object actualObject) {
        return expectedObject.toString().equals(actualObject.toString());
      }
    }.as(expectedObject.toString());
  }

  public static Condition<List<?>> listEqualToAsString(final List<?> expectedObject) {
    return new Condition<List<?>>() {
      @Override
      public boolean matches(List<?> actualObject) {
        return expectedObject.toString().equals(actualObject.toString());
      }
    }.as(expectedObject.toString());
  }

  public static Condition<Object> oneSecOldDate() {
    long oneSecOldMillis = new DateTime().minusSeconds(1).getMillis();
    return createGeDateCondition(oneSecOldMillis).as("1 second old from now as a maximum: " + new DateTime(oneSecOldMillis));
  }

  private static Condition<Object> createGeDateCondition(final long dateFromInMillis) {
    return new Condition<Object>() {
      @Override
      public boolean matches(Object actualDate) {
        return dateFromInMillis <= ((DateTime) actualDate).getMillis();
      }
    };
  }
}