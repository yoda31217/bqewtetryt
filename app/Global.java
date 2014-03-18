import akka.actor.Cancellable;
import akka.actor.Scheduler;
import com.google.common.base.Predicate;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.BAdapter;
import models.data.adapter.date.VolvoDateAdapter;
import models.data.adapter.side.VolvoSideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularVolvoParser;
import models.data.parser.RetryExceptionParser;
import models.job.EventFilter;
import models.job.EventJob;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import models.notification.TwitterNotifier;
import org.openqa.selenium.chrome.ChromeDriver;
import play.Application;
import play.Configuration;
import play.GlobalSettings;
import play.Logger;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import twitter4j.TwitterFactory;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static models.util.Runnables.createLogExRunnable;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static play.Logger.of;
import static play.libs.Akka.system;

public class Global extends GlobalSettings {

  static {
    initWebDriverEnv();

    EVENT_FILTER = new EventFilter(newArrayList(TENNIS), newArrayList(REGULAR));

    REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(4, controllers.Application.INSTANCE);
    REMOVE_OLD_EVENT_JOB = new RemoveOldEventJob(Duration.create(2, "min").toMillis(), controllers.Application.INSTANCE);

    NOTIFICATION_JOB = new NotificationJob(new TwitterNotifier(TwitterFactory.getSingleton()), controllers.Application.INSTANCE);

    REGULAR_VOLVO_TENNIS_JOB = createRegularVolvoTennisJob();
  }

  public static final  Runnable                NOTIFICATION_JOB;
  public static final  EventJob                REGULAR_VOLVO_TENNIS_JOB;
  public static final  RemoveOldEventJob       REMOVE_OLD_EVENT_JOB;
  public static final  Runnable                REMOVE_OLD_HISTORY_JOB;
  private static final Predicate<AdaptedEvent> EVENT_FILTER;
  private static final Logger.ALogger    LOG       = of(GlobalSettings.class);
  private              List<Cancellable> schedules = new LinkedList<Cancellable>();

  private static EventJob createRegularVolvoTennisJob() {
    BParser parser = new RegularVolvoParser(getVolvoSite() + "/lite/?sv=2.3.2.3#!clt=9994;op=4;cid=13;cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0",
                                            new ChromeDriver());
    parser = new RetryExceptionParser(parser, 3);
    BAdapter adapter = new BAdapter(new VolvoSideCodeAdapter("&"), new VolvoDateAdapter(), REGULAR, VOLVO, TENNIS);
    return new EventJob(controllers.Application.INSTANCE, parser, adapter, EVENT_FILTER, REGULAR + "_" + VOLVO + "_" + TENNIS);
  }

  private static String getVolvoSite() {return "http://www." + "b" + "e" + "t" + "3" + "6" + "5" + ".com";}

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return super.getControllerInstance(controllerClass);
  }

  @Override
  public Configuration onLoadConfig(Configuration config, File path, ClassLoader classloader) {
    return super.onLoadConfig(config, path, classloader);
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    Scheduler scheduler = system().scheduler();
    ExecutionContext defaultDispatcher = (ExecutionContext) system().dispatcher();

    LOG.info("Starting real Jobs.");

    FiniteDuration oldEventOffset = Duration.create(20, "ms");
    FiniteDuration oldEventDelay = Duration.create(1, "min");
    schedules.add(scheduler.schedule(oldEventOffset, oldEventDelay, createLogExRunnable(REMOVE_OLD_EVENT_JOB), defaultDispatcher));

    FiniteDuration oldHistoryOffset = Duration.create(30, "ms");
    FiniteDuration oldHistoryDelay = Duration.create(1, "min");
    schedules.add(scheduler.schedule(oldHistoryOffset, oldHistoryDelay, createLogExRunnable(REMOVE_OLD_HISTORY_JOB), defaultDispatcher));

    //            FiniteDuration lanosOffset = Duration.create(20, "sec");
    //            FiniteDuration lanosDelay = Duration.create(1, "min");
    //            MessageDispatcher lanosFetchingDispatcher = system().dispatchers().lookup("contexts.fetch-lanos");
    //            schedules.add(scheduler.schedule(lanosOffset, lanosDelay, logAndStopExceptions(LANOS_JOB), lanosFetchingDispatcher));
    //
    //            FiniteDuration volvoOffset = Duration.create(30, "sec");
    //            FiniteDuration volvoDelay = Duration.create(1, "min");
    //            MessageDispatcher volvoFetchingDispatcher = system().dispatchers().lookup("contexts.fetch-volvo");
    //            schedules.add(scheduler.schedule(volvoOffset, volvoDelay, logAndStopExceptions(VOLVO_JOB), volvoFetchingDispatcher));

    FiniteDuration lanosSportSelectionOffset = Duration.create(50, "ms");
    FiniteDuration lanosSportSelectionDelay = Duration.create(1, "min");
    //      schedules.add(scheduler.schedule(lanosSportSelectionOffset, lanosSportSelectionDelay, logAndStopExceptions(LANOS_SPORT_SELECTION_JOB),
    //        defaultDispatcher));

    FiniteDuration liveLanosOffset = Duration.create(70, "ms");
    FiniteDuration liveLanosDelay = Duration.create(10000, "ms");
    //      schedules.add(scheduler.schedule(liveLanosOffset, liveLanosDelay, logAndStopExceptions(LIVE_LANOS_JOB), defaultDispatcher));

    FiniteDuration liveVolvoTennisOffset = Duration.create(110, "ms");
    FiniteDuration liveVolvoTennisDelay = Duration.create(10000, "ms");
    //      schedules.add(scheduler.schedule(liveVolvoTennisOffset, liveVolvoTennisDelay, logAndStopExceptions(LIVE_VOLVO_TENNIS_JOB), defaultDispatcher));

    FiniteDuration regularVolvoTennisOffset = Duration.create(110, "ms");
    FiniteDuration regularVolvoTennisDelay = Duration.create(15000, "ms");
    schedules.add(scheduler.schedule(regularVolvoTennisOffset, regularVolvoTennisDelay, createLogExRunnable(REGULAR_VOLVO_TENNIS_JOB), defaultDispatcher));

    FiniteDuration liveVolvoVolleyballOffset = Duration.create(130, "ms");
    FiniteDuration liveVolvoVolleyballDelay = Duration.create(10000, "ms");
    //      schedules.add(scheduler.schedule(liveVolvoVolleyballOffset, liveVolvoVolleyballDelay, logAndStopExceptions(LIVE_VOLVO_VOLLEYBALL_JOB),
    //        defaultDispatcher));

    FiniteDuration liveVolvoBasketballOffset = Duration.create(170, "ms");
    FiniteDuration liveVolvoBasketballDelay = Duration.create(10000, "ms");
    //      schedules.add(scheduler.schedule(liveVolvoBasketballOffset, liveVolvoBasketballDelay, logAndStopExceptions(LIVE_VOLVO_BASKETBALL_JOB),
    //        defaultDispatcher));

    FiniteDuration liveVolvoTableTennisOffset = Duration.create(190, "ms");
    FiniteDuration liveVolvoTableTennisDelay = Duration.create(10000, "ms");
    //      schedules.add(scheduler.schedule(liveVolvoTableTennisOffset, liveVolvoTableTennisDelay, logAndStopExceptions(LIVE_VOLVO_TABLE_TENNIS_JOB),
    //        defaultDispatcher));

    FiniteDuration notificationOffset = Duration.create(230, "ms");
    FiniteDuration notificationDelay = Duration.create(300, "ms");
    schedules.add(scheduler.schedule(notificationOffset, notificationDelay, createLogExRunnable(NOTIFICATION_JOB), defaultDispatcher));

  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    for (Cancellable schedule : schedules) {
      schedule.cancel();
    }
  }
}