package models.job;

import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.Adapter;
import models.data.adapter.date.VolvoDateAdapter;
import models.data.adapter.side.VolvoSideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularVolvoParser;
import models.data.parser.RetryExceptionParser;
import models.notification.NotificationJob;
import models.notification.TwitterNotifier;
import org.openqa.selenium.chrome.ChromeDriver;
import scala.concurrent.duration.Duration;
import twitter4j.TwitterFactory;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;

public final class Jobs {

  static {
    initWebDriverEnv();

    EVENT_FILTER = new EventFilter();

    REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(4);
    REMOVE_OLD_EVENT_JOB = new RemoveOldEventJob(Duration.create(2, "min").toMillis());

    NOTIFICATION_JOB = new NotificationJob(new TwitterNotifier(TwitterFactory.getSingleton()), EventJob.INSTANCE);

    REGULAR_VOLVO_TENNIS_JOB = createRegularVolvoTennisJob();
  }

  public static final  Runnable                NOTIFICATION_JOB;
  public static final  EventJob                REGULAR_VOLVO_TENNIS_JOB;
  public static final  RemoveOldEventJob       REMOVE_OLD_EVENT_JOB;
  public static final  Runnable                REMOVE_OLD_HISTORY_JOB;
  private static final Predicate<AdaptedEvent> EVENT_FILTER;

  private Jobs() {
    throw new UnsupportedOperationException();
  }

  private static EventJob createRegularVolvoTennisJob() {
    BParser parser = new RegularVolvoParser(getVolvoSite() + "/lite/?sv=2.3.2.3#!clt=9994;op=4;cid=13;cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0",
                                            new ChromeDriver());
    parser = new RetryExceptionParser(parser, 3);
    Adapter adapter = new Adapter(new VolvoSideCodeAdapter("&"), new VolvoDateAdapter(), REGULAR, VOLVO, TENNIS);
    return new EventJob(parser, adapter, EVENT_FILTER, REGULAR + "_" + VOLVO + "_" + TENNIS);
  }

  private static String getVolvoSite() {return "http://www." + "b" + "e" + "t" + "3" + "6" + "5" + ".com";}
}