package models.calc;

import com.google.common.base.Function;
import models.event.Event;

import java.util.Set;

import static com.google.common.collect.Collections2.transform;
import static com.google.common.collect.Sets.newHashSet;

public final class Calculations {

  private Calculations() {
    throw new UnsupportedOperationException();
  }

  public static Set<Calculation> eventsToCalculations(Set<Event> events) {
    return newHashSet(transform(events, createEventToCalculationTransformer()));
  }

  private static Function<Event, Calculation> createEventToCalculationTransformer() {
    return new Function<Event, Calculation>() {
      @Override
      public Calculation apply(Event event) {
        return new Calculation(event);
      }
    };
  }
}