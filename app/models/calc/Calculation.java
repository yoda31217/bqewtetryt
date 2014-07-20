package models.calc;

import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventOrganisation;
import org.joda.time.DateTime;

import java.util.HashMap;
import java.util.Map;

import static java.util.Collections.emptyMap;
import static java.util.Collections.unmodifiableMap;
import static models.event.EventOrganisation.UNKNOWN;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;

public final class Calculation {

  public final Event                                      event;
  public final double                                     highForkKof;
  public final DateTime                                   highForkKofDate;
  public final EventOrganisation                          highForkKofOrganisation;
  public final double                                     highProfit;
  public final double                                     highProfitMoney1;
  public final double                                     highProfitMoney2;
  public final boolean                                    isFork;
  public final double                                     lowForkKof;
  public final DateTime                                   lowForkKofDate;
  public final EventOrganisation                          lowForkKofOrganisation;
  public final double                                     lowProfit;
  public final double                                     lowProfitMoney1;
  public final double                                     lowProfitMoney2;
  public final Map<EventOrganisation, EventHistoryRecord> organisation2lastHistoryRecord;
  public final DateTime                                   forkStateChangeDate;

  public Calculation(Calculation calculation, EventHistoryRecord historyRecord) {
    event = calculation.event;

    this.organisation2lastHistoryRecord = updateOrganisation2lastHistoryRecord(calculation, historyRecord);

    double lowForkKof = 0.0;
    EventOrganisation lowForkKofOrganisation = null;
    DateTime lowForkKofDate = null;
    double highForkKof = 0.0;
    EventOrganisation highForkKofOrganisation = null;
    DateTime highForkKofDate = null;

    for (EventHistoryRecord organisationLastRecord : organisation2lastHistoryRecord.values()) {

      if (organisationLastRecord.lowKof() > lowForkKof) {
        lowForkKof = organisationLastRecord.lowKof();
        lowForkKofOrganisation = organisationLastRecord.organisation();
        lowForkKofDate = organisationLastRecord.date();
      }

      if (organisationLastRecord.highKof() > highForkKof) {
        highForkKof = organisationLastRecord.highKof();
        highForkKofOrganisation = organisationLastRecord.organisation();
        highForkKofDate = organisationLastRecord.date();
      }
    }

    this.lowForkKof = lowForkKof;
    this.lowForkKofDate = lowForkKofDate;
    this.lowForkKofOrganisation = lowForkKofOrganisation;
    this.highForkKof = highForkKof;
    this.highForkKofDate = highForkKofDate;
    this.highForkKofOrganisation = highForkKofOrganisation;

    lowProfitMoney1 = (highForkKof - 1.0) / highForkKof;
    lowProfitMoney2 = 1.0 / highForkKof;
    highProfitMoney1 = 1.0 / lowForkKof;
    highProfitMoney2 = (lowForkKof - 1.0) / lowForkKof;

    lowProfit = lowProfitMoney1 * lowForkKof - 1.0;
    highProfit = highProfitMoney2 * highForkKof - 1.0;

    isFork = ((1.0 / (lowForkKof - 1.0) + 1.0) < highForkKof);

    if (calculation.isFork != isFork) forkStateChangeDate = historyRecord.date();
    else forkStateChangeDate = calculation.forkStateChangeDate;
  }

  private Calculation(Event event) {
    this.event = event;

    lowForkKof = 0.0;
    lowForkKofDate = now(UTC);
    lowForkKofOrganisation = UNKNOWN;

    highForkKof = 0.0;
    highForkKofDate = now(UTC);
    highForkKofOrganisation = UNKNOWN;

    highProfitMoney1 = 0.0;
    highProfitMoney2 = 0.0;
    highProfit = 0.0;

    lowProfitMoney1 = 0.0;
    lowProfitMoney2 = 0.0;
    lowProfit = 0.0;

    isFork = false;

    organisation2lastHistoryRecord = emptyMap();
    forkStateChangeDate = now(UTC);
  }

  public static Calculation calculate(Event event) {
    return new Calculation(event);
  }

  public Calculation calculate(EventHistoryRecord historyRecord) {
    return new Calculation(this, historyRecord);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Calculation that = (Calculation) o;

    if (!event.equals(that.event)) return false;
    if (!organisation2lastHistoryRecord.equals(that.organisation2lastHistoryRecord)) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = event.hashCode();
    result = 31 * result + organisation2lastHistoryRecord.hashCode();
    return result;
  }

  private Map<EventOrganisation, EventHistoryRecord> updateOrganisation2lastHistoryRecord(Calculation calculation, EventHistoryRecord historyRecord) {
    Map<EventOrganisation, EventHistoryRecord> organisation2lastHistoryRecord = new HashMap<EventOrganisation, EventHistoryRecord>(
      calculation.organisation2lastHistoryRecord);
    organisation2lastHistoryRecord.put(historyRecord.organisation(), historyRecord);
    return unmodifiableMap(organisation2lastHistoryRecord);
  }
}