package models.calc;

import models.event.Event;
import org.junit.Before;
import org.junit.Test;

import java.util.Set;

import static models.calc.Calcularium.calcularium;
import static models.event.EventTests.createAnyEvent;
import static org.fest.assertions.Assertions.assertThat;

public class CalculariumTest {

  @Before
  public void before() {
    Calcularium.setCalcularium(new Calcularium());
  }

  @Test
  public void createCalculations_atStart_returnEmpty() {
    Set<Calculation> calculations = calcularium().createCalculations();
    assertThat(calculations).isEmpty();
  }

  @Test
  public void createCalculations_registerEvent_returnOne() {
    calcularium().registerEvent(createAnyEvent());
    Set<Calculation> calculations = calcularium().createCalculations();
    assertThat(calculations).hasSize(1);
  }

  @Test
  public void createCalculations_registerEventTwice_returnOne() {
    Event event = createAnyEvent();
    calcularium().registerEvent(event);
    calcularium().registerEvent(event);

    Set<Calculation> calculations = calcularium().createCalculations();

    assertThat(calculations).hasSize(1);
  }

  @Test
  public void createCalculations_registerEvent_returnCalculationForEvent() {
    Event event = createAnyEvent();
    calcularium().registerEvent(event);

    Set<Calculation> calculations = calcularium().createCalculations();

    Calculation firstCalculation = calculations.iterator().next();
    assertThat(firstCalculation.code()).isEqualTo(event.code());
  }
}