package models.notification;

import com.google.common.base.Predicate;
import models.calc.Calculation;
import models.event.EventStore;
import play.Logger;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Set;

import static com.google.common.collect.Sets.filter;
import static com.google.common.collect.Sets.newCopyOnWriteArraySet;
import static com.google.common.collect.Sets.newHashSet;
import static models.calc.Calculations.eventsToCalculations;
import static models.util.Dates.toSecsFromNow;
import static play.Logger.of;

public class NotificationJob implements Runnable {

  Logger.ALogger log = of(NotificationJob.class);
  private static final DecimalFormat NUMBER_FORMAT = new DecimalFormat("0.000");
  public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd-MM");
  private final EventStore eventStore;
  private final Set<Calculation> lastForkCalculations = newCopyOnWriteArraySet();
  private final TwitterNotifier notifier;

  public NotificationJob(TwitterNotifier notifier, EventStore eventStore) {
    this.notifier = notifier;
    this.eventStore = eventStore;
  }

  @Override
  public void run() {
    Set<Calculation> oldForkCalculations = newHashSet(lastForkCalculations);
    lastForkCalculations.clear();

    Set<Calculation> currentForkCalculations = createCurrentForkCalculations();
    lastForkCalculations.addAll(currentForkCalculations);

    currentForkCalculations.removeAll(oldForkCalculations);

    for (Calculation calculation : currentForkCalculations) {

      String message = createMessage(calculation);
      log.info("Sending Notification: {}", message);
      notifier.notify(message);
    }
  }

  private Set<Calculation> createCurrentForkCalculations() {
    Set<Calculation> calculations = eventsToCalculations(eventStore.events());
    return filter(calculations, createIsForkFilter());
  }

  private Predicate<Calculation> createIsForkFilter() {
    return new Predicate<Calculation>() {
      @Override
      public boolean apply(Calculation calculation) {
        return calculation.isFork();
      }
    };
  }

  private String createMessage(Calculation calculation) {
    @SuppressWarnings("StringBufferReplaceableByString") StringBuilder messageBuilder = new StringBuilder();

    messageBuilder.append(DATE_FORMAT.format(calculation.date()));
    messageBuilder.append(" ");
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
}