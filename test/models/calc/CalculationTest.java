package models.calc;

import models.event.Event;
import models.event.EventHistoryRecord;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static models.calc.Calculation.calculate;
import static models.event.EventOrganisation.KAMAZ;
import static models.event.EventOrganisation.LANOS;
import static models.event.EventSport.UNKNOWN;
import static models.event.EventType.LIVE;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeUtils.setCurrentMillisFixed;
import static org.joda.time.DateTimeUtils.setCurrentMillisSystem;
import static org.joda.time.DateTimeZone.UTC;

public class CalculationTest {

  private final Event event = new Event(LIVE, UNKNOWN, now(UTC), newArrayList("player1"), newArrayList("player2"));

  @BeforeClass
  public static void setUpClass() throws Exception {
    setCurrentMillisFixed(now(UTC).getMillis());
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    setCurrentMillisSystem();
  }

  @Test
  public void calculate_from2newHistoryRecord_returnNewForkCalculation() {
    Calculation calculation = calculate(event);
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), KAMAZ, 1.85, 1.85));
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), LANOS, 1.5, 3.85));
    assertThat(toString(calculation)).isEqualTo("Calculation2{, highForkKof=3.85, highForkKofDate=" + now(UTC) +
                                                ", highForkKofOrganisation=LANOS, highProfit=0.768918918918919, highProfitMoney1=0.5405405405405405, " +
                                                "highProfitMoney2=0.4594594594594595, isFork=true, lowForkKof=1.85, lowForkKofDate=" + now(UTC) +
                                                ", lowForkKofOrganisation=KAMAZ, lowProfit=0.3694805194805195, lowProfitMoney1=0.7402597402597403, " +
                                                "lowProfitMoney2=0.2597402597402597, forkStateChangeDate=" + now(UTC) + "}");
  }

  @Test
  public void calculate_fromEvent_returnEmptyCalculation() {
    assertThat(toString(calculate(event))).isEqualTo("Calculation2{, highForkKof=0.0, highForkKofDate=" + now(UTC) +
                                                     ", highForkKofOrganisation=UNKNOWN, highProfit=0.0, highProfitMoney1=0.0, highProfitMoney2=0.0, " +
                                                     "isFork=false, lowForkKof=0.0, lowForkKofDate=" + now(UTC) +
                                                     ", lowForkKofOrganisation=UNKNOWN, lowProfit=0.0, lowProfitMoney1=0.0, lowProfitMoney2=0.0, " +
                                                     "forkStateChangeDate=" + now(UTC) + "}");
  }

  @Test
  public void calculate_fromNewHistoryRecordWithSmallKof_returnNewCalculationWithKofFromPreviousOrganisation() {
    Calculation calculation = calculate(event);
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), KAMAZ, 1.5, 1.85));
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), LANOS, 1.4, 3.85));
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), LANOS, 1.4, 1.6));
    assertThat(toString(calculation)).isEqualTo("Calculation2{, highForkKof=1.85, highForkKofDate=" + now(UTC) +
                                                ", highForkKofOrganisation=KAMAZ, highProfit=-0.3833333333333333, highProfitMoney1=0.6666666666666666, " +
                                                "highProfitMoney2=0.3333333333333333, isFork=false, lowForkKof=1.5, lowForkKofDate=" +
                                                now(UTC) +
                                                ", lowForkKofOrganisation=KAMAZ, lowProfit=-0.31081081081081074, lowProfitMoney1=0.4594594594594595, " +
                                                "lowProfitMoney2=0.5405405405405405, forkStateChangeDate=" +
                                                now(UTC) + "}");
  }

  @Test
  public void calculate_fromNewHistoryRecord_returnNewNotForkCalculation() {
    Calculation calculation = calculate(event);
    calculation = calculation.calculate(new EventHistoryRecord(now(UTC), KAMAZ, 1.85, 1.85));
    assertThat(toString(calculation)).isEqualTo("Calculation2{, highForkKof=1.85, highForkKofDate=" + now(UTC) +
                                                ", highForkKofOrganisation=KAMAZ, highProfit=-0.1499999999999999, highProfitMoney1=0.5405405405405405, " +
                                                "highProfitMoney2=0.4594594594594595, isFork=false, lowForkKof=1.85, lowForkKofDate=" + now(UTC) +
                                                ", lowForkKofOrganisation=KAMAZ, lowProfit=-0.1499999999999999, lowProfitMoney1=0.4594594594594595, " +
                                                "lowProfitMoney2=0.5405405405405405, forkStateChangeDate=" + now(UTC) + "}");
  }

  public String toString(Calculation calculation) {
    return "Calculation2{" +
           ", highForkKof=" + calculation.highForkKof +
           ", highForkKofDate=" + calculation.highForkKofDate +
           ", highForkKofOrganisation=" + calculation.highForkKofOrganisation +
           ", highProfit=" + calculation.highProfit +
           ", highProfitMoney1=" + calculation.highProfitMoney1 +
           ", highProfitMoney2=" + calculation.highProfitMoney2 +
           ", isFork=" + calculation.isFork +
           ", lowForkKof=" + calculation.lowForkKof +
           ", lowForkKofDate=" + calculation.lowForkKofDate +
           ", lowForkKofOrganisation=" + calculation.lowForkKofOrganisation +
           ", lowProfit=" + calculation.lowProfit +
           ", lowProfitMoney1=" + calculation.lowProfitMoney1 +
           ", lowProfitMoney2=" + calculation.lowProfitMoney2 +
           ", forkStateChangeDate=" + calculation.notifiableStateChangeDate +
           '}';
  }
}