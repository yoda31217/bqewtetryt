package models.calc;

import models.event.Event;
import models.event.HistoryRecord;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.LIVE;
import static models.event.Events.createEvent;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static org.fest.assertions.Assertions.assertThat;

public class CalculationTest {

  @Test
  public void type_anyEvent_typeFromEvent() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.type()).isEqualTo(LIVE);
  }

  @Test
  public void sport_anyEvent_sportFromEvent() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.sport()).isEqualTo(BASKETBALL);
  }

  @Test
  public void date_anyEvent_dateFromEvent() {
    Date eventDate = new Date();
    Event event = createEvent(LIVE, BASKETBALL, eventDate, "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.date()).isEqualTo(eventDate);
  }

  @Test
  public void side1_anyEvent_side1FromEvent() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side1()).isEqualTo("SIDE1");
  }

  @Test
  public void side2_anyEvent_side2FromEvent() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.side2()).isEqualTo("SIDE2");
  }

  @Test
  public void code_anyEvent_codeFromEvent() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);
    assertThat(calculation.code()).isEqualTo("CODE");
  }

  @Test
  public void isFork_newEvent_isForkFalse() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void getForkOrganisation1_newEvent_null() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    assertThat(calculation.getForkOrganisation1()).isEqualTo(null);
  }

  @Test
  public void getForkOrganisation2_newEvent_null() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    assertThat(calculation.getForkOrganisation2()).isEqualTo(null);
  }

  @Test
  public void getForkKof1_newEvent_0() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    assertThat(calculation.getForkKof1()).isEqualTo(0.0);
  }

  @Test
  public void getForkKof2_newEvent_0() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    assertThat(calculation.getForkKof2()).isEqualTo(0.0);
  }

  @Test
  public void isFork_forkEventWithoutUpdate_isForkFalse() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void isFork_forkEventWithUpdate_isForkTrue() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(true);
  }

  @Test
  public void isFork_notForkEventWithUpdate_isForkFalse() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));

    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(false);
  }

  @Test
  public void getForkOrganisation1_forkEventWithUpdate_organisation1lanos() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    assertThat(calculation.getForkOrganisation1()).isEqualTo(LANOS);
  }

  @Test
  public void getForkOrganisation2_forkEventWithUpdate_organisation2volvo() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    assertThat(calculation.getForkOrganisation2()).isEqualTo(VOLVO);
  }

  @Test
  public void getForkKof1_forkEventWithUpdate_kof1lanos() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    assertThat(calculation.getForkKof1()).isEqualTo(1.5);
  }

  @Test
  public void getForkKof2_forkEventWithUpdate_kof2volvo() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.9));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    assertThat(calculation.getForkKof2()).isEqualTo(3.2);
  }

  @Test
  public void isFork_forkThenNotForkEventWithUpdate_isForkFalse() {
    Event event = createEvent(LIVE, BASKETBALL, new Date(), "SIDE1", "SIDE2", "CODE");
    Calculation calculation = new Calculation(event);

    event.addHistory(new HistoryRecord(new Date(), LANOS, 1.5, 2.8));
    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 3.2));

    calculation.update();

    event.addHistory(new HistoryRecord(new Date(), VOLVO, 1.4, 2.9));

    calculation.update();

    assertThat(calculation.isFork()).isEqualTo(false);
  }

}