package models.job;

import com.google.common.base.Predicate;
import models.calc.Calculation;
import models.notification.Twitterer;

import java.text.DecimalFormat;
import java.util.Set;

import static com.google.common.collect.Sets.filter;
import static com.google.common.collect.Sets.newHashSet;
import static java.util.Collections.emptySet;
import static models.calc.Calcularium.calcularium;
import static models.util.Dates.secsFromNow;

public class TwitterNotificationJob implements Runnable {

  public static final Predicate<Calculation> IS_FORK_FILTER   = new Predicate<Calculation>() {
    @Override
    public boolean apply(Calculation calculation) {
      return calculation.isFork();
    }
  };
  public static final DecimalFormat          NUMBER_FORMAT    = new DecimalFormat("0.000");
  private             Set<Calculation>       forkCalculations = emptySet();
  private final Twitterer twitterer;

  public TwitterNotificationJob(Twitterer twitterer) {
    this.twitterer = twitterer;
  }

  @Override
  public void run() {
    Set<Calculation> oldForkCalculations = forkCalculations;

    forkCalculations = filter(calcularium().createCalculations(), IS_FORK_FILTER);

    Set<Calculation> newestForkCalculations = newHashSet(forkCalculations);
    newestForkCalculations.removeAll(oldForkCalculations);

    for (Calculation calculation : newestForkCalculations) {
      postTwit(calculation);
    }
  }

  private String buildTwit(Calculation calculation) {
    StringBuilder twitBuilder = new StringBuilder();

    twitBuilder.append(calculation.type().label);
    twitBuilder.append(" ");
    twitBuilder.append(calculation.sport().label);
    twitBuilder.append(" ");

    twitBuilder.append(calculation.side1());
    twitBuilder.append(" - ");
    twitBuilder.append(calculation.side2());
    twitBuilder.append(" ");

    twitBuilder.append(NUMBER_FORMAT.format(calculation.lowForkKof()));
    twitBuilder.append(",");
    twitBuilder.append(calculation.lowForkKofOrganisation().label);
    twitBuilder.append(",");
    twitBuilder.append(secsFromNow(calculation.lowForkKofDate()));
    twitBuilder.append("/");

    twitBuilder.append(NUMBER_FORMAT.format(calculation.highForkKof()));
    twitBuilder.append(",");
    twitBuilder.append(calculation.highForkKofOrganisation().label);
    twitBuilder.append(",");
    twitBuilder.append(secsFromNow(calculation.highForkKofDate()));
    twitBuilder.append(" ");

    twitBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney1()));
    twitBuilder.append("+");
    twitBuilder.append(NUMBER_FORMAT.format(calculation.highProfitMoney2()));
    twitBuilder.append("=");
    twitBuilder.append(NUMBER_FORMAT.format(calculation.highProfit()));
    twitBuilder.append(" ");

    twitBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1()));
    twitBuilder.append("+");
    twitBuilder.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2()));
    twitBuilder.append("=");
    twitBuilder.append(NUMBER_FORMAT.format(calculation.lowProfit()));

    return twitBuilder.toString();
  }

  private void postTwit(Calculation calculation) {
    twitterer.sendMessage(buildTwit(calculation));
  }
}