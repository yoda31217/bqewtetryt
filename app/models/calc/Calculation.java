package models.calc;

import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventOrganisation;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.unmodifiableMap;
import static models.event.EventOrganisation.UNKNOWN;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;

public final class Calculation {

  public static final ArrayList<Double> ROUNDED_MONEYS = newArrayList(0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8,
                                                                      0.85, 0.9, 0.95);
  public final Event                                      event;
  public final double                                     highForkKof;
  public final DateTime                                   highForkKofDate;
  public final EventOrganisation                          highForkKofOrganisation;
  public final double                                     highProfit;
  public final double                                     highRoundedProfit1;
  public final double                                     highRoundedProfit2;
  public final double                                     highProfitMoney1;
  public final double                                     highProfitMoney2;
  public final double                                     highRoundedProfitMoney1;
  public final double                                     highRoundedProfitMoney2;
  public final boolean                                    isFork;
  public final double                                     lowForkKof;
  public final DateTime                                   lowForkKofDate;
  public final EventOrganisation                          lowForkKofOrganisation;
  public final double                                     lowProfit;
  public final double                                     lowRoundedProfit1;
  public final double                                     lowRoundedProfit2;
  public final double                                     lowProfitMoney1;
  public final double                                     lowProfitMoney2;
  public final double                                     lowRoundedProfitMoney1;
  public final double                                     lowRoundedProfitMoney2;
  public final Map<EventOrganisation, EventHistoryRecord> organisation2lastHistoryRecord;
  public final DateTime                                   notifiableStateChangeDate;
  public final boolean                                    isNotifiable;

  public Calculation(Calculation calculation, EventHistoryRecord historyRecord) {
    event = calculation.event;

    this.organisation2lastHistoryRecord = calculateOrganisation2lastHistoryRecord(event);

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

    if (isFork) {
      lowRoundedProfitMoney1 = calculateLowRoundedProfitMoney1(highProfitMoney1, lowProfitMoney1);

      if (0.0 < lowRoundedProfitMoney1) {
        lowRoundedProfitMoney2 = 1.0 - lowRoundedProfitMoney1;
        lowRoundedProfit1 = lowRoundedProfitMoney1 * lowForkKof - 1.0;
        lowRoundedProfit2 = lowRoundedProfitMoney2 * highForkKof - 1.0;

        highRoundedProfitMoney1 = calculateHighRoundedProfitMoney1(highProfitMoney1, lowProfitMoney1);
        highRoundedProfitMoney2 = 1.0 - highRoundedProfitMoney1;
        highRoundedProfit1 = highRoundedProfitMoney1 * lowForkKof - 1.0;
        highRoundedProfit2 = highRoundedProfitMoney2 * highForkKof - 1.0;

      } else {
        lowRoundedProfitMoney2 = 0.0;
        lowRoundedProfit1 = 0.0;
        lowRoundedProfit2 = 0.0;

        highRoundedProfitMoney1 = 0.0;
        highRoundedProfitMoney2 = 0.0;
        highRoundedProfit1 = 0.0;
        highRoundedProfit2 = 0.0;
      }

    } else {
      lowRoundedProfitMoney1 = 0.0;
      lowRoundedProfitMoney2 = 0.0;
      lowRoundedProfit1 = 0.0;
      lowRoundedProfit2 = 0.0;

      highRoundedProfitMoney1 = 0.0;
      highRoundedProfitMoney2 = 0.0;
      highRoundedProfit1 = 0.0;
      highRoundedProfit2 = 0.0;
    }

    isNotifiable = isFork && (0.02 <= lowProfit);

    if (calculation.isNotifiable != isNotifiable) notifiableStateChangeDate = historyRecord.date();
    else notifiableStateChangeDate = calculation.notifiableStateChangeDate;
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

    lowRoundedProfitMoney1 = 0.0;
    lowRoundedProfitMoney2 = 0.0;
    lowRoundedProfit1 = 0.0;
    lowRoundedProfit2 = 0.0;

    highRoundedProfitMoney1 = 0.0;
    highRoundedProfitMoney2 = 0.0;
    highRoundedProfit1 = 0.0;
    highRoundedProfit2 = 0.0;

    isNotifiable = false;

    organisation2lastHistoryRecord = emptyMap();
    notifiableStateChangeDate = now(UTC);
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

    return true;
  }

  @Override
  public int hashCode() {
    return event.hashCode();
  }

  private double calculateHighRoundedProfitMoney1(double highProfitMoney1, double lowProfitMoney1) {
    for (Double roundedMoney : ROUNDED_MONEYS) {
      if (roundedMoney >= highProfitMoney1 && roundedMoney <= lowProfitMoney1) return roundedMoney;
    }
    return 0.0;
  }

  private double calculateLowRoundedProfitMoney1(double highProfitMoney1, double lowProfitMoney1) {
    double result = 0.0;
    for (Double roundedMoney : ROUNDED_MONEYS) {
      if (roundedMoney >= highProfitMoney1 && roundedMoney <= lowProfitMoney1) result = roundedMoney;
    }
    return result;
  }

  private Map<EventOrganisation, EventHistoryRecord> calculateOrganisation2lastHistoryRecord(Event event) {
    Map<EventOrganisation, EventHistoryRecord> organisation2lastHistoryRecord = new HashMap<EventOrganisation, EventHistoryRecord>();
    for (EventHistoryRecord historyRecord : event.history()) {
      organisation2lastHistoryRecord.put(historyRecord.organisation(), historyRecord);
    }
    return unmodifiableMap(organisation2lastHistoryRecord);
  }
}