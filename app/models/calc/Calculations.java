package models.calc;

import com.google.common.base.Function;
import models.event.Event;

import java.util.List;

import static com.google.common.collect.Lists.transform;

public final class Calculations {

  private Calculations() {
    throw new UnsupportedOperationException();
  }

  public static List<Calculation> eventsToCalculations(List<Event> events) { return transform(events, createEventToCalculationTransformer()); }

  private static Function<Event, Calculation> createEventToCalculationTransformer() {
    return new Function<Event, Calculation>() {
      @Override
      public Calculation apply(Event event) {
        return new Calculation(event);
      }
    };
  }
}