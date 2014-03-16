package models.calc;

import models.event.Event;
import models.event.EventType;
import models.event.HistoryRecord;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static models.event.Organisation.UNKNOWN;

public class Calculation {

  private final Event        event;
  private       boolean      isFork;
  private       Organisation lowForkKofOrganisation;
  private       Organisation highForkKofOrganisation;
  private       double       lowForkKof;
  private       double       highForkKof;
  private       Date         lowForkKofDate;
  private       Date         highForkKofDate;
  private       double       highProfitMoney1;
  private       double       highProfitMoney2;
  private       double       lowProfitMoney1;
  private       double       lowProfitMoney2;
  private       double       highProfit;
  private       double       lowProfit;

  public Calculation(Event event) {
    this.event = event;

    isFork = false;

    lowForkKof = 0.0;
    lowForkKofDate = new Date();
    lowForkKofOrganisation = UNKNOWN;

    highForkKof = 0.0;
    highForkKofDate = new Date();
    highForkKofOrganisation = UNKNOWN;

    highProfitMoney1 = 0.0;
    highProfitMoney2 = 0.0;
    highProfit = 0.0;

    lowProfitMoney1 = 0.0;
    lowProfitMoney2 = 0.0;
    lowProfit = 0.0;

    if (event.history().isEmpty()) return;

    Map<Organisation, HistoryRecord> organisation2lastRecord = calculateOrganisation2lastRecord();
    calculateForkKofsAndOrganisations(organisation2lastRecord);
    calculateIsFork();
    calculateProfitMoneys();
    calculateProfits();
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
    return event.side2();
  }

  public String side1() {
    return event.side1();
  }

  public boolean isFork() { return isFork; }

  public Organisation highForkKofOrganisation() { return highForkKofOrganisation; }

  public Organisation lowForkKofOrganisation() { return lowForkKofOrganisation; }

  public double lowForkKof() { return lowForkKof; }

  public double highForkKof() { return highForkKof; }

  public double highProfitMoney1() { return highProfitMoney1; }

  public double highProfitMoney2() { return highProfitMoney2; }

  public double lowProfitMoney1() { return lowProfitMoney1; }

  public double lowProfitMoney2() { return lowProfitMoney2; }

  public double highProfit() { return highProfit; }

  public double lowProfit() { return lowProfit; }

  public Date lowForkKofDate() { return lowForkKofDate; }

  public Date highForkKofDate() { return highForkKofDate; }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Calculation that = (Calculation) o;

    if (!event.equals(that.event)) return false;

    return true;
  }

  @Override
  public int hashCode() {
    return event.hashCode();
  }

  private void calculateProfits() {
    highProfit = highProfitMoney2 * highForkKof - 1.0;
    lowProfit = lowProfitMoney1 * lowForkKof - 1.0;
  }

  private void calculateProfitMoneys() {
    highProfitMoney1 = 1.0 / lowForkKof;
    highProfitMoney2 = (lowForkKof - 1.0) / lowForkKof;
    lowProfitMoney1 = (highForkKof - 1.0) / highForkKof;
    lowProfitMoney2 = 1.0 / highForkKof;
  }

  private void calculateIsFork() {isFork = ((1.0 / (lowForkKof - 1.0) + 1.0) < highForkKof);}

  private void calculateForkKofsAndOrganisations(Map<Organisation, HistoryRecord> organisation2lastRecord) {
    for (HistoryRecord organisationLastRecord : organisation2lastRecord.values()) {

      if ((null == lowForkKofOrganisation) || (organisationLastRecord.lowKof() > lowForkKof)) {
        lowForkKof = organisationLastRecord.lowKof();
        lowForkKofOrganisation = organisationLastRecord.organisation();
        lowForkKofDate = organisationLastRecord.date();
      }

      if ((null == highForkKofOrganisation) || (organisationLastRecord.highKof() > highForkKof)) {
        highForkKof = organisationLastRecord.highKof();
        highForkKofOrganisation = organisationLastRecord.organisation();
        highForkKofDate = organisationLastRecord.date();
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
}