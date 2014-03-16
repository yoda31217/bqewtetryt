package models.notification;

import com.google.common.base.Predicate;
import models.calc.Calcularium;
import models.calc.Calculation;

import java.text.DecimalFormat;
import java.util.Set;

import static com.google.common.collect.Sets.filter;
import static com.google.common.collect.Sets.newCopyOnWriteArraySet;
import static com.google.common.collect.Sets.newHashSet;
import static models.util.Dates.toSecsFromNow;

public class NotificationJob implements Runnable {

  private static final DecimalFormat NUMBER_FORMAT = new DecimalFormat("0.000");
  private final Calcularium calcularium;
  private final Set<Calculation> lastForkCalculations = newCopyOnWriteArraySet();
  private final TwitterNotifier notifier;

  public NotificationJob(TwitterNotifier notifier, Calcularium calcularium) {
    this.notifier = notifier;
    this.calcularium = calcularium;
  }

  @Override
  public void run() {
    Set<Calculation> oldForkCalculations = newHashSet(lastForkCalculations);
    lastForkCalculations.clear();

    Set<Calculation> currentForkCalculations = filter(calcularium.createCalculations(), createIsForkFilter());
    lastForkCalculations.addAll(currentForkCalculations);

    Set<Calculation> newestForkCalculations = newHashSet(currentForkCalculations);
    newestForkCalculations.removeAll(oldForkCalculations);

    for (Calculation calculation : newestForkCalculations) {
      notifier.notify(buildMessage(calculation));
    }
  }

  private String buildMessage(Calculation calculation) {
    @SuppressWarnings("StringBufferReplaceableByString") StringBuilder messageBuilder = new StringBuilder();

    messageBuilder.append(calculation.type().label);
    messageBuilder.append(" ");
    messageBuilder.append(calculation.sport().label);
    messageBuilder.append(" ");

    messageBuilder.append(calculation.side1());
    messageBuilder.append(" - ");
    messageBuilder.append(calculation.side2());
    messageBuilder.append(" ");

    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowForkKof()));
    messageBuilder.append(",");
    messageBuilder.append(calculation.lowForkKofOrganisation().label);
    messageBuilder.append(",");
    messageBuilder.append(toSecsFromNow(calculation.lowForkKofDate()));
    messageBuilder.append("/");

    messageBuilder.append(NUMBER_FORMAT.format(calculation.highForkKof()));
    messageBuilder.append(",");
    messageBuilder.append(calculation.highForkKofOrganisation().label);
    messageBuilder.append(",");
    messageBuilder.append(toSecsFromNow(calculation.highForkKofDate()));
    messageBuilder.append(" ");

    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney1()));
    messageBuilder.append("+");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney2()));
    messageBuilder.append("=");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfit()));
    messageBuilder.append(" ");

    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1()));
    messageBuilder.append("+");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2()));
    messageBuilder.append("=");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfit()));

    return messageBuilder.toString();
  }

  private Predicate<Calculation> createIsForkFilter() {
    return new Predicate<Calculation>() {
      @Override
      public boolean apply(Calculation calculation) {
        return calculation.isFork();
      }
    };
  }
}