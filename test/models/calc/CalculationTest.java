package models.calc;

import models.event.Event;
import models.event.HistoryRecord;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.LIVE;
import static models.event.Events.createEvent;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.fest.assertions.Assertions.assertThat;

public class CalculationTest {

  private Event event;
  private Calculation calculation;

  @Before
  public void createEventAndCalculation() {
    event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    calculation = new Calculation(event);
  }

  @Test
  public void type_anyEvent_typeFromEvent() {
    assertThat(calculation.type()).isEqualTo(LIVE);
  }

  @Test
  public void sport_anyEvent_sportFromEvent() {
    assertThat(calculation.sport()).isEqualTo(BASKETBALL);
  }

  @Test
  public void date_anyEvent_dateFromEvent() {
    assertThat(calculation.date()).isEqualTo(event.date());
  }

  @Test
  public void side1_anyEvent_side1FromEvent() {
    assertThat(calculation.side1()).isEqualTo("SIDE1");
  }

  @Test
  public void side2_anyEvent_side2FromEvent() {
    assertThat(calculation.side2()).isEqualTo("SIDE2");
  }

  @Test
  public void code_anyEvent_codeFromEvent() {
    assertThat(calculation.code()).isEqualTo("CODE");
  }

  @Test
  public void isFork_newEvent_isForkFalse() {
    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void forkOrganisation1_newEvent_nullForkOrganisation1() {
    assertThat(calculation.forkOrganisation1()).isEqualTo(null);
  }

  @Test
  public void forkOrganisation2_newEvent_nullForkOrganisation2() {
    assertThat(calculation.forkOrganisation2()).isEqualTo(null);
  }

  @Test
  public void forkKof1_newEvent_0ForkKof1() {
    assertThat(calculation.forkKof1()).isEqualTo(0.0);
  }

  @Test
  public void forkKof2_newEvent_0ForkKof2() {
    assertThat(calculation.forkKof2()).isEqualTo(0.0);
  }

  @Test
  public void isFork_forkEventWithoutUpdate_isForkFalse() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void isFork_forkEventWithUpdate_isForkTrue() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(true);
  }

  @Test
  public void isFork_notForkEventWithUpdate_isForkFalse() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));
    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void forkOrganisation1_forkEventWithUpdate_organisation1lanos() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.forkOrganisation1()).isEqualTo(LANOS);
  }

  @Test
  public void forkOrganisation2_forkEventWithUpdate_organisation2volvo() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.forkOrganisation2()).isEqualTo(VOLVO);
  }

  @Test
  public void forkKof1_forkEventWithUpdate_kof1lanos() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.forkKof1()).isEqualTo(1.5);
  }

  @Test
  public void forkKof2_forkEventWithUpdate_kof2volvo() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.forkKof2()).isEqualTo(3.2);
  }

  @Test
  public void isFork_forkThenNotForkEventWithUpdate_isForkFalse() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));
    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void highProfitMoney1_fork_highProfitMoney1() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.highProfitMoney1()).isEqualTo(1.0 / 1.5);
  }

  @Test
  public void highProfitMoney2_fork_highProfitMoney2() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.highProfitMoney2()).isEqualTo(0.5 / 1.5);
  }

  @Test
  public void lowProfitMoney1_fork_lowProfitMoney1() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.lowProfitMoney1()).isEqualTo(2.2 / 3.2);
  }

  @Test
  public void lowProfitMoney2_fork_lowProfitMoney2() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.lowProfitMoney2()).isEqualTo(1.0 / 3.2);
  }

  @Test
  public void highProfit_fork_highProfit() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.highProfit()).isEqualTo(0.5 / 1.5 * 3.2 - 1.0);
  }

  @Test
  public void lowProfit_fork_lowProfit() {
    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));
    calculation.update();

    assertThat(calculation.lowProfit()).isEqualTo(2.2 / 3.2 * 1.5 - 1.0);
  }
}