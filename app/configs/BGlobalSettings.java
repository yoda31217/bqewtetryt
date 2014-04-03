package configs;

import akka.actor.Cancellable;
import akka.actor.Scheduler;
import com.google.inject.Inject;
import com.google.inject.Injector;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import org.openqa.selenium.WebDriver;
import play.Application;
import play.GlobalSettings;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.inject.Guice.createInjector;
import static java.lang.System.getenv;
import static java.lang.System.setProperty;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static models.util.Runnables.createLogExRunnable;
import static play.libs.Akka.system;

public class BGlobalSettings extends GlobalSettings {

  @Inject RemoveOldEventJob     removeOldEventJob;
  @Inject RemoveOldHistoryJob   removeOldHistoryJob;
  @Inject RegularNivaTennisJob  regularNivaTennisJob;
  @Inject RegularKamazTennisJob regularKamazTennisJob;
  @Inject NotificationJob       notificationJob;
  @Inject Scheduler             scheduler;
  Injector injector;
  List<Cancellable> jobSchedules      = new LinkedList<Cancellable>();
  List<WebDriver>   createdWebDrivers = new CopyOnWriteArrayList<WebDriver>();

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return injector.getInstance(controllerClass);
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    setProperty("webdriver.chrome.driver", getenv("WEB_DRIVER"));

    injector = createInjector(new GlobalModule(app.configuration(), createdWebDrivers));
    injector.injectMembers(this);

    scheduleJob(app, "betty.job.remove_old_history.offset", "betty.job.remove_old_history.delay", removeOldHistoryJob);
    scheduleJob(app, "betty.job.remove_old_event.offset", "betty.job.remove_old_event.delay", removeOldEventJob);
    scheduleJob(app, "betty.job.notification.offset", "betty.job.notification.delay", notificationJob, "contexts.notification");

    scheduleJob(app, "betty.job.regular_niva_tennis.offset", "betty.job.regular_niva_tennis.delay", regularNivaTennisJob, "contexts.fetch-regular-niva-tennis");

    scheduleJob(app, "betty.job.regular_kamaz_tennis.offset", "betty.job.regular_kamaz_tennis.delay", regularKamazTennisJob,
                "contexts.fetch-regular-kamaz-tennis");
  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    for (Cancellable schedule : jobSchedules) {
      schedule.cancel();
    }

    for (WebDriver webDriver : createdWebDrivers) {
      webDriver.close();
    }
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job, ExecutionContext dispatcher) {
    FiniteDuration offset = Duration.create(app.configuration().getMilliseconds(offsetConfigKey), MILLISECONDS);
    FiniteDuration delay = Duration.create(app.configuration().getMilliseconds(delayConfigKey), MILLISECONDS);

    Cancellable jobSchedule = scheduler.schedule(offset, delay, createLogExRunnable(job), dispatcher);
    jobSchedules.add(jobSchedule);
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job) {
    scheduleJob(app, offsetConfigKey, delayConfigKey, job, system().dispatcher());
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job, String dispatcherId) {
    scheduleJob(app, offsetConfigKey, delayConfigKey, job, system().dispatchers().lookup(dispatcherId));
  }
}