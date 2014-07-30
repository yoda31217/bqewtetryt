package models.notification;

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

  public NotificationJob(BNotifier notifier, Calculator calculator) {
    this.notifier = notifier;
    this.calculator = calculator;
  }

  @Override
  public void run() {
    Set<Calculation> previouslyNotifiedCalculations = newHashSet(this.previouslyNotifiedCalculations);
    Set<Calculation> newNotifiableCalculations = getNotifiableCalculations();

    this.previouslyNotifiedCalculations.clear();
    this.previouslyNotifiedCalculations.addAll(newNotifiableCalculations);

    newNotifiableCalculations.removeAll(previouslyNotifiedCalculations);

    for (Calculation calculation : newNotifiableCalculations) {
      log.info("Sending fork Notification: {}", calculation.event.toString());
      notifier.notify(createMessage(calculation));
    }
  }

  private String createMessage(Calculation calculation) {
    @SuppressWarnings("StringBufferReplaceableByString") StringBuilder messageBuilder = new StringBuilder();

    messageBuilder.append(DATE_FORMAT.print(calculation.event.date()));
    messageBuilder.append(" <kbd>");
    messageBuilder.append(calculation.event.type().label);
    messageBuilder.append("</kbd> <span class=\"label label-danger\">");
    messageBuilder.append(calculation.event.sport().label);

    messageBuilder.append("</span>\n<span class=\"text-primary\">");
    messageBuilder.append(calculation.event.side1());
    messageBuilder.append("</span> - <span class=\"text-success\">");
    messageBuilder.append(calculation.event.side2());

    messageBuilder.append("</span>\n<span class=\"label label-primary\">");
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

    messageBuilder.append("</strong>\n<strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2));
    messageBuilder.append("</strong> = <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfit));
    messageBuilder.append("</strong>");

    return messageBuilder.toString();
  }

  private Predicate<Calculation> createNotifiableCalculationFilter() {
    final DateTime now = now(UTC);
    return new Predicate<Calculation>() {

      @Override
      public boolean apply(Calculation calculation) {
        long forkStateChangeSecondsAgo = new Duration(calculation.forkStateChangeDate, now).getStandardSeconds();
        return calculation.isFork && (0.02 <= calculation.lowProfit) && (3 <= forkStateChangeSecondsAgo);
      }
    };
  }

  private Set<Calculation> getNotifiableCalculations() {
    return newHashSet(filter(calculator.calculations(), createNotifiableCalculationFilter()));
  }
}