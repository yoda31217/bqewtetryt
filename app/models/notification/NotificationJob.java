package models.notification;

import com.codahale.metrics.Histogram;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import com.google.common.base.Predicate;
import models.calc.Calculation;
import models.calc.Calculator;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import play.Logger;

import java.text.DecimalFormat;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import static com.codahale.metrics.MetricRegistry.name;
import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Sets.newHashSet;
import static org.joda.time.DateTime.now;
import static org.joda.time.DateTimeZone.UTC;
import static org.joda.time.DateTimeZone.forID;
import static play.Logger.of;

public class NotificationJob implements Runnable {

  private static final DateTimeFormatter DATE_FORMAT   = DateTimeFormat.forPattern("dd-MM HH:mm").withZone(forID("Europe/Kiev"));
  private static final DecimalFormat     NUMBER_FORMAT = new DecimalFormat("0.000");
  Logger.ALogger log = of(NotificationJob.class);
  private final BNotifier  notifier;
  private final Calculator calculator;
  private final Set<Calculation> previouslyNotifiedCalculations = new CopyOnWriteArraySet<Calculation>();
  private final Timer     timerMetric;
  private final Histogram forkLowProfitHistogramMetric;
  private final Histogram forkHighProfitHistogramMetric;

  public NotificationJob(BNotifier notifier, Calculator calculator, MetricRegistry metricRegistry) {
    this.notifier = notifier;
    this.calculator = calculator;
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
    forkLowProfitHistogramMetric = metricRegistry.histogram(name(this.getClass(), "fork", "low_profit", "histogram"));
    forkHighProfitHistogramMetric = metricRegistry.histogram(name(this.getClass(), "fork", "high_profit", "histogram"));
  }

  @Override
  public void run() {
    Timer.Context context = timerMetric.time();
    try {
      doRun();

    } finally {
      context.stop();
    }
  }

  private String createMessage(Calculation calculation) {
    @SuppressWarnings("StringBufferReplaceableByString") StringBuilder messageBuilder = new StringBuilder();

    messageBuilder.append(DATE_FORMAT.print(calculation.event.date()));
    messageBuilder.append(" <kbd>");
    messageBuilder.append(calculation.event.type().label);
    messageBuilder.append("</kbd> <span class=\"label label-danger\">");
    messageBuilder.append(calculation.event.sport().label);

    messageBuilder.append("</span>\n<button type=\"button\" class=\"btn btn-warning\" messy-type=\"event-sides\" messy-data=\"");
    messageBuilder.append(calculation.event.sport().label);
    messageBuilder.append(':');
    messageBuilder.append(calculation.lowForkKofOrganisation.label);
    messageBuilder.append(':');
    messageBuilder.append(calculation.event.getExternalId(calculation.lowForkKofOrganisation));
    messageBuilder.append(':');
    messageBuilder.append(calculation.highForkKofOrganisation.label);
    messageBuilder.append(':');
    messageBuilder.append(calculation.event.getExternalId(calculation.highForkKofOrganisation));
    messageBuilder.append("\">");
    messageBuilder.append(calculation.event.side1());
    messageBuilder.append(" - ");
    messageBuilder.append(calculation.event.side2());

    messageBuilder.append("</button>\n<span class=\"label label-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowForkKof));
    messageBuilder.append("</span> <span class=\"label label-primary\">");
    messageBuilder.append(calculation.lowForkKofOrganisation.label);
    messageBuilder.append("</span> - <span class=\"label label-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highForkKof));
    messageBuilder.append("</span> <span class=\"label label-success\">");
    messageBuilder.append(calculation.highForkKofOrganisation.label);

    messageBuilder.append("</span>\n<strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney1));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney2));
    messageBuilder.append("</strong> = <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfit));

    messageBuilder.append("</strong>   <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highRoundedProfitMoney1));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highRoundedProfitMoney2));
    messageBuilder.append("</strong> = <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highRoundedProfit1));
    messageBuilder.append("</strong> + <span class=\"label label-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highRoundedProfit2));

    messageBuilder.append("</span>\n<strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2));
    messageBuilder.append("</strong> = <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfit));

    messageBuilder.append("</strong>   <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowRoundedProfitMoney1));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowRoundedProfitMoney2));
    messageBuilder.append("</strong> = <span class=\"label label-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowRoundedProfit1));
    messageBuilder.append("</span> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowRoundedProfit2));

    messageBuilder.append("</strong>");

    return messageBuilder.toString();
  }

  private Predicate<Calculation> createNotifiableCalculationFilter() {
    final DateTime now = now(UTC);
    return new Predicate<Calculation>() {

      @Override
      public boolean apply(Calculation calculation) {
        long notifiableStateChangeMillisAgo = new Duration(calculation.notifiableStateChangeDate, now).getMillis();
        return calculation.isNotifiable && (3_000 <= notifiableStateChangeMillisAgo);
      }
    };
  }

  private void doRun() {
    Set<Calculation> previouslyNotifiedCalculations = newHashSet(this.previouslyNotifiedCalculations);
    Set<Calculation> newNotifiableCalculations = getNotifiableCalculations();

    this.previouslyNotifiedCalculations.clear();
    this.previouslyNotifiedCalculations.addAll(newNotifiableCalculations);

    newNotifiableCalculations.removeAll(previouslyNotifiedCalculations);

    for (Calculation calculation : newNotifiableCalculations) {

      log.info("Sending fork Notification: {}", calculation.event.toString());
      forkLowProfitHistogramMetric.update((int) (calculation.lowProfit * 1000.0));
      forkHighProfitHistogramMetric.update((int) (calculation.highProfit * 1000.0));

      notifier.notify(createMessage(calculation));
    }
  }

  private Set<Calculation> getNotifiableCalculations() {
    return newHashSet(filter(calculator.calculations(), createNotifiableCalculationFilter()));
  }
}