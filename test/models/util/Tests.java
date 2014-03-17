package models.util;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

public class Tests {

  private Tests() {
    throw new UnsupportedOperationException();
  }

  public static <T> T callConstructor(Class<T> clazz) throws Exception {
    Constructor<T> constructor = clazz.getDeclaredConstructor();
    constructor.setAccessible(true);
    try {
      return constructor.newInstance();

    } catch (InvocationTargetException e) {
      throw (Exception) e.getCause();
    }
  }
}