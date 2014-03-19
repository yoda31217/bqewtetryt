package models.util;

import com.google.common.base.Function;

import java.util.List;

import static com.google.common.collect.Lists.transform;

public class Objects2 {

  public static <T extends Enum<T>> List<T> enumsFromStrings(final Class<T> enumCLass, List<String> enumStrings) {
    return transform(enumStrings, new Function<String, T>() {
      @Override
      public T apply(String enumString) {
        return Enum.valueOf(enumCLass, enumString);
      }
    });
  }
}