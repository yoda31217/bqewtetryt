package models.calc;

import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventOrganisation;
import models.event.EventSport;
import models.event.EventType;
import org.joda.time.DateTime;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static models.event.EventOrganisation.UNKNOWN;
import static org.joda.time.DateTimeZone.UTC;

public class Calculation {

  private final Event             event;
  private       double            highForkKof;
  private       DateTime          highForkKofDate;
  private       EventOrganisation highForkKofOrganisation;
  private       double            highProfit;
  private       double            highProfitMoney1;
  private       double            highProfitMoney2;
  private       boolean           isFork;
  private       double            lowForkKof;
  private       DateTime          lowForkKofDate;
  private       EventOrganisation lowForkKofOrganisation;
  private       double            lowProfit;
  private       double            lowProfitMoney1;
  private       double            lowProfitMoney2;
  private       int               organisationsCountInHistory;

  public Calculation(Event event) {
    this.event = event;

    organisationsCountInHistory = 0;

    isFork = false;

    lowForkKof = 0.0;
    lowForkKofDate = new DateTime(UTC);
    lowForkKofOrganisation = UNKNOWN;

    highForkKof = 0.0;
    highForkKofDate = new DateTime(UTC);
    highForkKofOrganisation = UNKNOWN;

    highProfitMoney1 = 0.0;
    highProfitMoney2 = 0.0;
    highProfit = 0.0;

    lowProfitMoney1 = 0.0;
    lowProfitMoney2 = 0.0;
    lowProfit = 0.0;

    if (event.history().isEmpty()) return;

    Map<EventOrganisation, EventHistoryRecord> organisation2lastRecord = buildOrganisation2lastRecord();
    organisationsCountInHistory = organisation2lastRecord.keySet().size();

    calculateForkKofsAndOrganisations(organisation2lastRecord);
    calculateIsFork();
    calculateProfitMoneys();
    calculateProfits();
  }

  public DateTime date() { return event.date(); }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Calculation that = (Calculation) o;

    return event.equals(that.event);
  }

  @Override
  public int hashCode() { return event.hashCode(); }

  public double highForkKof() { return highForkKof; }

  public DateTime highForkKofDate() { return highForkKofDate; }

  public EventOrganisation highForkKofOrganisation() { return highForkKofOrganisation; }

  public double highProfit() { return highProfit; }

  public double highProfitMoney1() { return highProfitMoney1; }

  public double highProfitMoney2() { return highProfitMoney2; }

  public boolean isFork() { return isFork; }

  public double lowForkKof() { return lowForkKof; }

  public DateTime lowForkKofDate() { return lowForkKofDate; }

  public EventOrganisation lowForkKofOrganisation() { return lowForkKofOrganisation; }

  public double lowProfit() { return lowProfit; }

  public double lowProfitMoney1() { return lowProfitMoney1; }

  public double lowProfitMoney2() { return lowProfitMoney2; }

  public int organisationsCountInHistory() { return organisationsCountInHistory; }

  public List<String> side1() { return event.side1(); }

  public List<String> side2() { return event.side2(); }

  public EventSport sport() { return event.sport(); }

  public EventType type() { return event.type(); }

  private Map<EventOrganisation, EventHistoryRecord> buildOrganisation2lastRecord() {
    Map<EventOrganisation, EventHistoryRecord> organisation2lastRecord = new HashMap<EventOrganisation, EventHistoryRecord>();
    for (EventHistoryRecord historyRecord : event.history()) {
      organisation2lastRecord.put(historyRecord.organisation(), historyRecord);
    }
    return organisation2lastRecord;
  }

  private void calculateForkKofsAndOrganisations(Map<EventOrganisation, EventHistoryRecord> organisation2lastRecord) {
    for (EventHistoryRecord organisationLastRecord : organisation2lastRecord.values()) {

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

  private void calculateIsFork() {isFork = ((1.0 / (lowForkKof - 1.0) + 1.0) < highForkKof);}

  private void calculateProfitMoneys() {
    highProfitMoney1 = 1.0 / lowForkKof;
    highProfitMoney2 = (lowForkKof - 1.0) / lowForkKof;
    lowProfitMoney1 = (highForkKof - 1.0) / highForkKof;
    lowProfitMoney2 = 1.0 / highForkKof;
  }

  private void calculateProfits() {
    highProfit = highProfitMoney2 * highForkKof - 1.0;
    lowProfit = lowProfitMoney1 * lowForkKof - 1.0;
  }
}