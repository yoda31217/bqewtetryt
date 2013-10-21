package utils;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import static java.util.Collections.emptyList;
import static play.Logger.ALogger;
import static play.Logger.of;

public final class BObjects {

  private static ALogger LOG = of(BObjects.class);

  private BObjects() {
    throw new UnsupportedOperationException();
  }

  public static List<String> emptyStringList() {return emptyList();}

  public static <T> T callConstructor(Class<T> clazz)
    throws Exception {
    Constructor<T> constructor = clazz.getDeclaredConstructor();
    constructor.setAccessible(true);
    try {
      return constructor.newInstance();

    } catch (InvocationTargetException e) {
      Exception cause = (Exception) e.getCause();
      throw cause;
    }
  }

  public static Runnable logAndStopExceptions(final Runnable runnable) {
    return new Runnable() {

      @Override
      public void run() {
        try {
          runnable.run();
        } catch (RuntimeException e) {
          LOG.error("Unknown exception wrapped and stoped.", e);
        }
      }
    };
  }
}