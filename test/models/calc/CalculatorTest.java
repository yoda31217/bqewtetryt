package models.calc;

import com.codahale.metrics.MetricRegistry;
import models.event.Event;
import models.event.EventHistoryRecord;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.calc.Calculation.calculate;
import static models.event.EventOrganisation.KAMAZ;
import static models.event.EventSport.UNKNOWN;
import static models.event.EventType.LIVE;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Mockito.mock;

public class CalculatorTest {

  private final Event      event      = new Event(LIVE, UNKNOWN, now(UTC), newArrayList("player1"), newArrayList("player2"));
  private final Calculator calculator = new Calculator(mock(MetricRegistry.class));

  @Test
  public void calculations_always_returnCopy() {
    assertThat(calculator.calculations()).isNotSameAs(calculator.calculations);
  }

  @Test
  public void notifyEventAdded_always_addCalculation() {
    calculator.notifyEventAdded(event);
    assertThat(calculator.calculations()).containsOnly(calculate(event));
  }

  @Test
  public void notifyEventHistoryAdded_always_replaceCalculation() {
    calculator.notifyEventAdded(event);
    EventHistoryRecord historyRecord = new EventHistoryRecord(now(UTC), KAMAZ, 1.85, 1.85);
    calculator.notifyEventHistoryAdded(event, historyRecord);

    Calculation expectedCalculation = calculate(event).calculate(historyRecord);

    assertThat(calculator.calculations()).containsOnly(expectedCalculation);
  }

  @Test
  public void notifyEventRemoved_always_removeCalculation() {
    calculator.notifyEventAdded(event);
    calculator.notifyEventRemoved(event);
    assertThat(calculator.calculations()).isEmpty();
  }
}