package models.calc;

import models.event.Event;
import models.event.HistoryRecord;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventTests.createEvent;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.fest.assertions.Assertions.assertThat;

public class CalculationTest {

  private Event event;

  @Before
  public void prepareEvent() {
    event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
  }

  @Test
  public void type_anyEvent_typeFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.type()).isEqualTo(LIVE);
  }

  @Test
  public void sport_anyEvent_sportFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.sport()).isEqualTo(BASKETBALL);
  }

  @Test
  public void date_anyEvent_dateFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.date()).isEqualTo(event.date());
  }

  @Test
  public void side1_anyEvent_side1FromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side1()).isEqualTo("SIDE1");
  }

  @Test
  public void side2_anyEvent_side2FromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side2()).isEqualTo("SIDE2");
  }

  @Test
  public void code_anyEvent_codeFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.code()).isEqualTo("CODE");
  }

  @Test
  public void isFork_forkEvent_isForkTrue() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isEqualTo(true);
  }

  @Test
  public void isFork_notForkEvent_isForkFalse() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void forkOrganisation1_forkEvent_organisation1lanos() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.forkOrganisation1()).isEqualTo(LANOS);
  }

  @Test
  public void forkOrganisation2_forkEvent_organisation2volvo() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.forkOrganisation2()).isEqualTo(VOLVO);
  }

  @Test
  public void forkKof1_forkEvent_kof1lanos() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.forkKof1()).isEqualTo(1.5);
  }

  @Test
  public void forkKof2_forkEvent_kof2volvo() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.forkKof2()).isEqualTo(3.2);
  }

  @Test
  public void isFork_forkThenNotForkEvent_isForkFalse() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void highProfitMoney1_fork_highProfitMoney1() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfitMoney1()).isEqualTo(1.0 / 1.5);
  }

  @Test
  public void highProfitMoney2_fork_highProfitMoney2() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfitMoney2()).isEqualTo(0.5 / 1.5);
  }

  @Test
  public void lowProfitMoney1_fork_lowProfitMoney1() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfitMoney1()).isEqualTo(2.2 / 3.2);
  }

  @Test
  public void lowProfitMoney2_fork_lowProfitMoney2() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfitMoney2()).isEqualTo(1.0 / 3.2);
  }

  @Test
  public void highProfit_fork_highProfit() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfit()).isEqualTo(0.5 / 1.5 * 3.2 - 1.0);
  }

  @Test
  public void lowProfit_fork_lowProfit() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfit()).isEqualTo(2.2 / 3.2 * 1.5 - 1.0);
  }
}