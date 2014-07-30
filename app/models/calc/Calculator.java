package models.calc;

import models.event.Event;
import models.event.EventHistoryRecord;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static models.calc.Calculation.calculate;

public class Calculator {

  final List<Calculation> calculations = new ArrayList<Calculation>(200);

  public synchronized Set<Calculation> calculations() {
    return new HashSet<Calculation>(calculations);
  }

  public synchronized void notifyEventAdded(Event event) {
    calculations.add(calculate(event));
  }

  public synchronized void notifyEventHistoryAdded(Event event, EventHistoryRecord historyRecord) {
    for (int i = 0; i < calculations.size(); i++) {
      if (calculations.get(i).event.equals(event)) {
        calculations.set(i, calculations.get(i).calculate(historyRecord));
        return;
      }
    }
  }

  public synchronized void notifyEventRemoved(Event event) {
    for (Calculation calculation : calculations) {
      if (calculation.event.equals(event)) {
        calculations.remove(calculation);
        return;
      }
    }
  }
}