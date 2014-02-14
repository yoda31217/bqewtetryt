package models.job;

import com.google.common.base.Predicate;
import models.calc.Calculation;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import javax.annotation.Nullable;
import java.text.DecimalFormat;
import java.util.Set;

import static com.google.common.collect.Sets.filter;
import static com.google.common.collect.Sets.newHashSet;
import static java.util.Collections.EMPTY_SET;
import static models.calc.Calcularium.calcularium;
import static models.util.Dates.secsFromNow;

public class TwitterNotificationJob
  implements Runnable {

  public static final DecimalFormat NUMBER_FORMAT = new DecimalFormat("0.000");
  public static final Predicate<Calculation> IS_FORK_FILTER = new Predicate<Calculation>() {
    @Override
    public boolean apply(@Nullable Calculation calculation) {
      return calculation.isFork();
    }
  };
  private final Twitter twitter;
  private Set<Calculation> forkCalculations = EMPTY_SET;

  public TwitterNotificationJob(Twitter twitter) {
    this.twitter = twitter;
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

  private void postTwit(Calculation calculation) {
    try {

      //    System.out.println("--------------------------- " + buildTwit(calculation));
      twitter.updateStatus(buildTwit(calculation));

    } catch (TwitterException e) {
      throw new RuntimeException(e);
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

    twitBuilder.append(NUMBER_FORMAT.format(calculation.forkKof1()));
    twitBuilder.append(",");
    twitBuilder.append(calculation.forkOrganisation1().label);
    twitBuilder.append(",");
    twitBuilder.append(secsFromNow(calculation.forkDate1()));
    twitBuilder.append("/");

    twitBuilder.append(NUMBER_FORMAT.format(calculation.forkKof2()));
    twitBuilder.append(",");
    twitBuilder.append(calculation.forkOrganisation2().label);
    twitBuilder.append(",");
    twitBuilder.append(secsFromNow(calculation.forkDate2()));
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
}