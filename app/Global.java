import akka.actor.Cancellable;
import akka.actor.Scheduler;
import jobs.FakeEventJob;
import jobs.FakeHistoryRecordJob;
import jobs.RemoveOldEventJob;
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

import static jobs.Jobs.LANOS_SPORT_SELECTION_JOB;
import static jobs.Jobs.LIVE_LANOS_JOB;
import static jobs.Jobs.LIVE_VOLVO_TENNIS_JOB;
import static jobs.Jobs.REMOVE_OLD_EVENT_JOB;
import static jobs.Jobs.REMOVE_OLD_HISTORY_JOB;
import static models.store.Organisation.LANOS;
import static models.store.Organisation.VOLVO;
import static play.Logger.of;
import static play.Play.isProd;
import static play.libs.Akka.system;
import static utils.BObjects.logAndStopExceptions;

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

      FiniteDuration oldEventOffset = Duration.create(0, "sec");
      FiniteDuration oldEventDelay = Duration.create(1, "min");
      schedules.add(scheduler.schedule(oldEventOffset, oldEventDelay, logAndStopExceptions(REMOVE_OLD_EVENT_JOB), defaultDispatcher));

      FiniteDuration oldHistoryOffset = Duration.create(10, "sec");
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

      FiniteDuration lanosSportSelectionOffset = Duration.create(40, "sec");
      FiniteDuration lanosSportSelectionDelay = Duration.create(1, "min");
      schedules.add(scheduler.schedule(lanosSportSelectionOffset, lanosSportSelectionDelay, logAndStopExceptions(LANOS_SPORT_SELECTION_JOB),
        defaultDispatcher));

      FiniteDuration liveLanosOffset = Duration.create(50, "sec");
      FiniteDuration liveLanosDelay = Duration.create(10, "sec");
      schedules.add(scheduler.schedule(liveLanosOffset, liveLanosDelay, logAndStopExceptions(LIVE_LANOS_JOB), defaultDispatcher));

      FiniteDuration liveVolvoTennisOffset = Duration.create(20, "sec");
      FiniteDuration liveVolvoTennisDelay = Duration.create(10, "sec");
      schedules.add(scheduler.schedule(liveVolvoTennisOffset, liveVolvoTennisDelay, logAndStopExceptions(LIVE_VOLVO_TENNIS_JOB), defaultDispatcher));

    } else {
      LOG.info("Starting fake Jobs.");

      FiniteDuration offset = Duration.create(0, "ms");
      FiniteDuration delay = Duration.create(30, "sec");
      long oldEventAge = Duration.create(5, "min").toMillis();

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