package models.calc;

import com.google.common.base.Function;
import models.event.Event;

import javax.annotation.Nullable;
import java.util.Set;

import static com.google.common.collect.Iterables.transform;
import static com.google.common.collect.Sets.newCopyOnWriteArraySet;
import static com.google.common.collect.Sets.newHashSet;

public class Calcularium {

  private static Calcularium calcularium = new Calcularium();
  private static final Function<Event, Calculation> CALCULATION_FOR_EVENT_BUILDER = new Function<Event, Calculation>() {

    @Nullable
    @Override
    public Calculation apply(@Nullable Event event) {
      return new Calculation(event);
    }
  };
  private Set<Event> events = newCopyOnWriteArraySet();

  Calcularium() {
  }

  public static Calcularium calcularium() {
    return calcularium;
  }

  static void setCalcularium(Calcularium calcularium) {
    Calcularium.calcularium = calcularium;
  }

  public Set<Calculation> createCalculations() {
    return newHashSet(transform(events, CALCULATION_FOR_EVENT_BUILDER));
  }

  public void registerEvent(Event event) {
    events.add(event);
  }
}