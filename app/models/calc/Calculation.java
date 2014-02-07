package models.calc;

import models.event.Event;
import models.event.EventType;
import models.event.HistoryRecord;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Calculation {

  private final Event event;

  private boolean isFork;
  private Organisation forkOrganisation2;
  private Organisation forkOrganisation1;
  private double forkKof1;
  private double forkKof2;
  private double highProfitMoney1;
  private double highProfitMoney2;
  private double lowProfitMoney1;
  private double lowProfitMoney2;
  private double highProfit;
  private double lowProfit;

  public Calculation(Event event) {
    this.event = event;
    update();
  }

  public Sport sport() {
    return event.sport();
  }

  public EventType type() {
    return event.type();
  }

  public Date date() {
    return event.date();
  }

  public String code() {
    return event.code();
  }

  public String side2() {
    return event.secondSide();
  }

  public String side1() {
    return event.firstSide();
  }

  public void update() {
    isFork = false;
    forkOrganisation1 = null;
    forkOrganisation2 = null;
    forkKof1 = 0.0;
    forkKof2 = 0.0;

    Map<Organisation, HistoryRecord> organisation2lastRecord = calculateOrganisation2lastRecord();
    calculateForkKofsAndOrganisations(organisation2lastRecord);
    calculateIsFork();
    calculateProfitMoneys();
    calculateProfits();
  }

  private void calculateProfits() {
    highProfit = highProfitMoney2 * forkKof2 - 1.0;
    lowProfit = lowProfitMoney1 * forkKof1 - 1.0;
  }

  private void calculateProfitMoneys() {
    highProfitMoney1 = 1.0 / forkKof1;
    highProfitMoney2 = (forkKof1 - 1.0) / forkKof1;
    lowProfitMoney1 = (forkKof2 - 1.0) / forkKof2;
    lowProfitMoney2 = 1.0 / forkKof2;
  }

  private void calculateIsFork() {isFork = ((1.0 / (forkKof1 - 1.0) + 1.0) < forkKof2);}

  private void calculateForkKofsAndOrganisations(Map<Organisation, HistoryRecord> organisation2lastRecord) {
    for (HistoryRecord organisationLastRecord : organisation2lastRecord.values()) {

      if ((null == forkOrganisation1) || (organisationLastRecord.firstKof() > forkKof1)) {
        forkKof1 = organisationLastRecord.firstKof();
        forkOrganisation1 = organisationLastRecord.organisation();
      }

      if ((null == forkOrganisation2) || (organisationLastRecord.secondKof() > forkKof2)) {
        forkKof2 = organisationLastRecord.secondKof();
        forkOrganisation2 = organisationLastRecord.organisation();
      }
    }
  }

  private Map<Organisation, HistoryRecord> calculateOrganisation2lastRecord() {
    Map<Organisation, HistoryRecord> organisation2lastRecord = new HashMap<Organisation, HistoryRecord>();
    for (HistoryRecord historyRecord : event.history()) {
      organisation2lastRecord.put(historyRecord.organisation(), historyRecord);
    }
    return organisation2lastRecord;
  }

  public boolean isFork() { return isFork; }

  public Organisation forkOrganisation2() { return forkOrganisation2; }

  public Organisation forkOrganisation1() { return forkOrganisation1; }

  public double forkKof1() { return forkKof1; }

  public double forkKof2() { return forkKof2; }

  public double highProfitMoney1() { return highProfitMoney1; }

  public double highProfitMoney2() { return highProfitMoney2; }

  public double lowProfitMoney1() { return lowProfitMoney1; }

  public double lowProfitMoney2() { return lowProfitMoney2; }

  public double highProfit() { return highProfit; }

  public double lowProfit() { return lowProfit; }
}