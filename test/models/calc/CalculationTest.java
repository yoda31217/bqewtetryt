package models.calc;

import models.event.Event;
import models.event.HistoryRecord;
import org.joda.time.DateTime;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.UNKNOWN;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeUtils.setCurrentMillisFixed;
import static org.joda.time.DateTimeUtils.setCurrentMillisSystem;
import static org.joda.time.DateTimeZone.UTC;

public class CalculationTest {

  private Event event;

  @Before
  public void before() { event = new Event(LIVE, BASKETBALL, new DateTime(UTC), newArrayList("SIDE1"), newArrayList("SIDE2")); }

  @After
  public void after() throws Exception {
    setCurrentMillisSystem();
  }

  @Test
  public void date_anyEvent_dateFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.date()).isEqualTo(event.date());
  }

  @Test
  public void highForkKofDate_eventWithoutHistory_returnNow() {
    setCurrentMillisFixed(new DateTime(UTC).getMillis());
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highForkKofDate()).isEqualTo(new DateTime(UTC));
  }

  @Test
  public void highForkKofDate_forkEvent_highForkKofDateVolvo() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    DateTime volvoRecordDate = new DateTime(UTC);
    event.addHistory(new HistoryRecord(volvoRecordDate, VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highForkKofDate()).isSameAs(volvoRecordDate);
  }

  @Test
  public void highForkKofOrganisation_eventWithoutHistory_returnUnknown() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highForkKofOrganisation()).isSameAs(UNKNOWN);
  }

  @Test
  public void highForkKofOrganisation_forkEvent_highForkKofOrganisationVolvo() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highForkKofOrganisation()).isEqualTo(VOLVO);
  }

  @Test
  public void highForkKof_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highForkKof()).isEqualTo(0.0);
  }

  @Test
  public void highForkKof_forkEvent_highForkKofVolvo() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highForkKof()).isEqualTo(3.2);
  }

  @Test
  public void highProfitMoney1_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highProfitMoney1()).isEqualTo(0.0);
  }

  @Test
  public void highProfitMoney1_forkEvent_highProfitMoney1() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfitMoney1()).isEqualTo(1.0 / 1.5);
  }

  @Test
  public void highProfitMoney2_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highProfitMoney2()).isEqualTo(0.0);
  }

  @Test
  public void highProfitMoney2_forkEvent_highProfitMoney2() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfitMoney2()).isEqualTo(0.5 / 1.5);
  }

  @Test
  public void highProfit_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.highProfit()).isEqualTo(0.0);
  }

  @Test
  public void highProfit_forkEvent_highProfit() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.highProfit()).isEqualTo(0.5 / 1.5 * 3.2 - 1.0);
  }

  @Test
  public void isFork_forkEvent_isForkTrue() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isTrue();
  }

  @Test
  public void isFork_forkThenNotForkEvent_isForkFalse() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 2.9));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isFalse();
  }

  @Test
  public void isFork_notForkEvent_isForkFalse() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 2.9));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isFalse();
  }

  @Test
  public void lowForkKofDate_eventWithoutHistory_returnNow() {
    setCurrentMillisFixed(new DateTime(UTC).getMillis());
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowForkKofDate()).isEqualTo(new DateTime(UTC));
  }

  @Test
  public void lowForkKofDate_forkEvent_lowForkKofDateLanos() {
    DateTime lanosRecordDate = new DateTime(UTC);
    event.addHistory(new HistoryRecord(lanosRecordDate, LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowForkKofDate()).isSameAs(lanosRecordDate);
  }

  @Test
  public void lowForkKofOrganisation_eventWithoutHistory_returnUnknown() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowForkKofOrganisation()).isSameAs(UNKNOWN);
  }

  @Test
  public void lowForkKofOrganisation_forkEvent_lowForkKofOrganisationLanos() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowForkKofOrganisation()).isEqualTo(LANOS);
  }

  @Test
  public void lowForkKof_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowForkKof()).isEqualTo(0.0);
  }

  @Test
  public void lowForkKof_forkEvent_lowForkKofLanos() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowForkKof()).isEqualTo(1.5);
  }

  @Test
  public void lowProfitMoney1_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowProfitMoney1()).isEqualTo(0.0);
  }

  @Test
  public void lowProfitMoney1_forkEvent_lowProfitMoney1() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfitMoney1()).isEqualTo(2.2 / 3.2);
  }

  @Test
  public void lowProfitMoney2_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowProfitMoney2()).describedAs("lowProfitMoney2").isEqualTo(0.0);
  }

  @Test
  public void lowProfitMoney2_forkEvent_lowProfitMoney2() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfitMoney2()).isEqualTo(1.0 / 3.2);
  }

  @Test
  public void lowProfit_eventWithoutHistory_returnZero() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.lowProfit()).isEqualTo(0.0);
  }

  @Test
  public void lowProfit_forkEvent_lowProfit() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.lowProfit()).isEqualTo(2.2 / 3.2 * 1.5 - 1.0);
  }

  @Test
  public void organisationsCountInHistory_eventWith2organisationsInHistory_return2() {
    event.addHistory(new HistoryRecord(new DateTime(UTC), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new DateTime(UTC), VOLVO, 1.4, 3.2));

    Calculation calculation = new Calculation(event);

    assertThat(calculation.organisationsCountInHistory()).isEqualTo(2);
  }

  @Test
  public void organisationsCountInHistory_eventWithoutHistory_return0() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.organisationsCountInHistory()).isZero();
  }

  @Test
  public void side1_anyEvent_side1FromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side1()).isEqualTo(newArrayList("SIDE1"));
  }

  @Test
  public void side2_anyEvent_side2FromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side2()).isEqualTo(newArrayList("SIDE2"));
  }

  @Test
  public void sport_anyEvent_sportFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.sport()).isEqualTo(BASKETBALL);
  }

  @Test
  public void type_anyEvent_typeFromEvent() {
    Calculation calculation = new Calculation(event);
    assertThat(calculation.type()).isEqualTo(LIVE);
  }
}