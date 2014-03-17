package models.util;

import org.fest.assertions.Condition;

import java.util.Date;

public class Conditions {

  public static final long ONE_SEC_IN_MILLIS = 1000L;

  public static Condition<Object> isEqualToAsString(final Object expectedObject) {
    return new Condition<Object>() {
      @Override
      public boolean matches(Object actualObject) {
        return expectedObject.toString().equals(actualObject.toString());
      }
    }.as(expectedObject.toString());
  }

  public static Condition<Object> oneSecOldDate() {
    long oneSecOldMillis = new Date().getTime() - 1 * ONE_SEC_IN_MILLIS;
    return createGeDateCondition(oneSecOldMillis).as("1 second old from now as a maximum: " + new Date(oneSecOldMillis));
  }

  private static Condition<Object> createGeDateCondition(final long dateFromInMillis) {
    return new Condition<Object>() {
      @Override
      public boolean matches(Object actualDate) {
        return dateFromInMillis <= ((Date) actualDate).getTime();
      }
    };
  }
}