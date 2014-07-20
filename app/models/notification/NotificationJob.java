package models.notification;

import models.calc.Calculation;
import models.calc.Calculator;
import org.joda.time.Duration;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import play.Logger;

import java.text.DecimalFormat;

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

  public NotificationJob(BNotifier notifier, Calculator calculator) {
    this.notifier = notifier;
    this.calculator = calculator;
  }

  @Override
  public void run() {
    for (Calculation calculation : calculator.calculations()) {
      if (calculation.isFork && new Duration(calculation.forkStateChangeDate, now(UTC)).getStandardSeconds() >= 3) {
        log.info("Sending fork Notification: {}", calculation.event.toString());
        notifier.notify(createMessage(calculation));
      }
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
}