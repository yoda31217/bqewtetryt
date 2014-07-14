package models.notification;

import com.google.common.base.Predicate;
import models.calc.Calculation;
import models.event.EventStore;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import play.Logger;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Set;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newCopyOnWriteArraySet;
import static com.google.common.collect.Sets.newHashSet;
import static models.calc.Calculations.eventsToCalculations;
import static org.joda.time.DateTimeZone.forID;
import static play.Logger.of;

public class NotificationJob implements Runnable {

  public static final  DateTimeFormatter DATE_FORMAT   = DateTimeFormat.forPattern("dd-MM HH:mm").withZone(forID("Europe/Kiev"));
  private static final DecimalFormat     NUMBER_FORMAT = new DecimalFormat("0.000");
  Logger.ALogger log = of(NotificationJob.class);
  private final EventStore eventStore;
  private final Set<Calculation> lastForkCalculations = newCopyOnWriteArraySet();
  private final BNotifier notifier;

  public NotificationJob(BNotifier notifier, EventStore eventStore) {
    this.notifier = notifier;
    this.eventStore = eventStore;
  }

  @Override
  public void run() {
    Set<Calculation> oldForkCalculations = newHashSet(lastForkCalculations);
    lastForkCalculations.clear();

    List<Calculation> currentForkCalculations = createCurrentForkCalculations();
    lastForkCalculations.addAll(currentForkCalculations);

    currentForkCalculations.removeAll(oldForkCalculations);

    for (Calculation calculation : currentForkCalculations) {

      String message = createMessage(calculation);
      log.info("Sending Notification: {}", message);
      notifier.notify(message);
    }
  }

  private List<Calculation> createCurrentForkCalculations() {
    List<Calculation> calculations = eventsToCalculations(eventStore.events());
    return newArrayList(filter(calculations, createIsForkFilter()));
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

    messageBuilder.append(DATE_FORMAT.print(calculation.date()));
    messageBuilder.append(" <kbd>");
    messageBuilder.append(calculation.type().label);
    messageBuilder.append("</kbd> <span class=\"label label-danger\">");
    messageBuilder.append(calculation.sport().label);

    messageBuilder.append("</span>\n<span class=\"text-primary\">");
    messageBuilder.append(calculation.side1());
    messageBuilder.append("</span> - <span class=\"text-success\">");
    messageBuilder.append(calculation.side2());

    messageBuilder.append("</span>\n<span class=\"label label-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowForkKof()));
    messageBuilder.append("</span> <span class=\"label label-primary\">");
    messageBuilder.append(calculation.lowForkKofOrganisation().label);
    messageBuilder.append("</span> - <span class=\"label label-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highForkKof()));
    messageBuilder.append("</span> <span class=\"label label-success\">");
    messageBuilder.append(calculation.highForkKofOrganisation().label);

    messageBuilder.append("</span>\n<strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney1()));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney2()));
    messageBuilder.append("</strong> = <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.highProfit()));

    messageBuilder.append("</strong>\n<strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1()));
    messageBuilder.append("</strong> + <strong class=\"text-success\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2()));
    messageBuilder.append("</strong> = <strong class=\"text-primary\">");
    messageBuilder.append(NUMBER_FORMAT.format(calculation.lowProfit()));
    messageBuilder.append("</strong>");

    return messageBuilder.toString();
  }
}