import akka.actor.Cancellable;
import akka.actor.Scheduler;
import models.job.FakeEventJob;
import models.job.FakeHistoryRecordJob;
import models.job.RemoveOldEventJob;
import play.Application;
import play.Configuration;
import play.GlobalSettings;
import play.Logger;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.job.Jobs.LANOS_SPORT_SELECTION_JOB;
import static models.job.Jobs.LIVE_LANOS_JOB;
import static models.job.Jobs.LIVE_VOLVO_BASKETBALL_JOB;
import static models.job.Jobs.LIVE_VOLVO_TABLE_TENNIS_JOB;
import static models.job.Jobs.LIVE_VOLVO_TENNIS_JOB;
import static models.job.Jobs.LIVE_VOLVO_VOLLEYBALL_JOB;
import static models.job.Jobs.NOTIFICATION_JOB;
import static models.job.Jobs.REMOVE_OLD_EVENT_JOB;
import static models.job.Jobs.REMOVE_OLD_HISTORY_JOB;
import static models.util.BObjects.logAndStopExceptions;
import static play.Logger.of;
import static play.Play.isProd;
import static play.libs.Akka.system;

public class Global
  extends GlobalSettings {

  private static final Logger.ALogger LOG = of(GlobalSettings.class);
  private List<Cancellable> schedules = new LinkedList<Cancellable>();

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    Scheduler scheduler = system().scheduler();
    ExecutionContext defaultDispatcher = (ExecutionContext) system().dispatcher();

    if (isProd()) {
      LOG.info("Starting real Jobs.");

      FiniteDuration oldEventOffset = Duration.create(20, "ms");
      FiniteDuration oldEventDelay = Duration.create(1, "min");
      schedules.add(scheduler.schedule(oldEventOffset, oldEventDelay, logAndStopExceptions(REMOVE_OLD_EVENT_JOB), defaultDispatcher));

      FiniteDuration oldHistoryOffset = Duration.create(30, "ms");
      FiniteDuration oldHistoryDelay = Duration.create(1, "min");
      schedules.add(scheduler.schedule(oldHistoryOffset, oldHistoryDelay, logAndStopExceptions(REMOVE_OLD_HISTORY_JOB), defaultDispatcher));

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
      schedules.add(scheduler.schedule(lanosSportSelectionOffset, lanosSportSelectionDelay, logAndStopExceptions(LANOS_SPORT_SELECTION_JOB),
        defaultDispatcher));

      FiniteDuration liveLanosOffset = Duration.create(70, "ms");
      FiniteDuration liveLanosDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(liveLanosOffset, liveLanosDelay, logAndStopExceptions(LIVE_LANOS_JOB), defaultDispatcher));

      FiniteDuration liveVolvoTennisOffset = Duration.create(110, "ms");
      FiniteDuration liveVolvoTennisDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(liveVolvoTennisOffset, liveVolvoTennisDelay, logAndStopExceptions(LIVE_VOLVO_TENNIS_JOB), defaultDispatcher));

      FiniteDuration liveVolvoVolleyballOffset = Duration.create(130, "ms");
      FiniteDuration liveVolvoVolleyballDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(liveVolvoVolleyballOffset, liveVolvoVolleyballDelay, logAndStopExceptions(LIVE_VOLVO_VOLLEYBALL_JOB),
        defaultDispatcher));

      FiniteDuration liveVolvoBasketballOffset = Duration.create(170, "ms");
      FiniteDuration liveVolvoBasketballDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(liveVolvoBasketballOffset, liveVolvoBasketballDelay, logAndStopExceptions(LIVE_VOLVO_BASKETBALL_JOB),
        defaultDispatcher));

      FiniteDuration liveVolvoTableTennisOffset = Duration.create(190, "ms");
      FiniteDuration liveVolvoTableTennisDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(liveVolvoTableTennisOffset, liveVolvoTableTennisDelay, logAndStopExceptions(LIVE_VOLVO_TABLE_TENNIS_JOB),
        defaultDispatcher));

      FiniteDuration notificationOffset = Duration.create(230, "ms");
      FiniteDuration notificationDelay = Duration.create(300, "ms");
      schedules.add(scheduler.schedule(notificationOffset, notificationDelay, logAndStopExceptions(NOTIFICATION_JOB), defaultDispatcher));

    } else {
      LOG.info("Starting fake Jobs.");

      FiniteDuration offset = Duration.create(0, "ms");
      FiniteDuration delay = Duration.create(10, "sec");
      long oldEventAge = Duration.create(20, "sec").toMillis();

      schedules.add(scheduler.schedule(offset, delay, logAndStopExceptions(new RemoveOldEventJob(oldEventAge)), defaultDispatcher));
      schedules.add(scheduler.schedule(offset, delay, logAndStopExceptions(new FakeEventJob()), defaultDispatcher));
      schedules.add(scheduler.schedule(offset, delay, logAndStopExceptions(new FakeHistoryRecordJob(VOLVO)), defaultDispatcher));
      schedules.add(scheduler.schedule(offset, delay, logAndStopExceptions(new FakeHistoryRecordJob(LANOS)), defaultDispatcher));
    }

  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    for (Cancellable schedule : schedules) {
      schedule.cancel();
    }
  }

  @Override
  public Configuration onLoadConfig(Configuration config, File path, ClassLoader classloader) {
    return super.onLoadConfig(config, path, classloader);
  }
}