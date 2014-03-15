package models.util;

import org.fest.assertions.Condition;

import java.util.Date;

public class Conditions {

  public static final long ONE_SEC_IN_MILLIS = 1000L;

  public static Condition<Object> dateOneSecOld() {
    return createGeDateCondition(new Date().getTime() - 1 * ONE_SEC_IN_MILLIS);
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