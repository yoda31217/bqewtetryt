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
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.inject.Guice.createInjector;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static models.util.Runnables.createLogExRunnable;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static play.libs.Akka.system;

public class BGlobalSettings extends GlobalSettings {

  @Inject RemoveOldEventJob     removeOldEventJob;
  @Inject RemoveOldHistoryJob   removeOldHistoryJob;
  @Inject RegularVolvoTennisJob regularVolvoTennisJob;
  @Inject NotificationJob       notificationJob;
  @Inject Scheduler             scheduler;
  Injector injector;
  List<Cancellable> schedules         = new LinkedList<Cancellable>();
  List<WebDriver>   createdWebDrivers = new CopyOnWriteArrayList<WebDriver>();

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return injector.getInstance(controllerClass);
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    initWebDriverEnv();

    injector = createInjector(new GlobalModule(app.configuration(), createdWebDrivers));
    injector.injectMembers(this);

    scheduleJob(app, "betty.job.remove_old_history.offset", "betty.job.remove_old_history.delay", removeOldHistoryJob);
    scheduleJob(app, "betty.job.remove_old_event.offset", "betty.job.remove_old_event.delay", removeOldEventJob);
    scheduleJob(app, "betty.job.notification.offset", "betty.job.notification.delay", notificationJob);
    scheduleJob(app, "betty.job.regular_volvo_tennis.offset", "betty.job.regular_volvo_tennis.delay", regularVolvoTennisJob);
  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    for (Cancellable schedule : schedules) {
      schedule.cancel();
    }

    for (WebDriver webDriver : createdWebDrivers) {
      webDriver.close();
    }
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job) {
    FiniteDuration offset = Duration.create(app.configuration().getMilliseconds(offsetConfigKey), MILLISECONDS);
    FiniteDuration delay = Duration.create(app.configuration().getMilliseconds(delayConfigKey), MILLISECONDS);

    Cancellable jobSchedule = system().scheduler().schedule(offset, delay, createLogExRunnable(job), system().dispatcher());
    schedules.add(jobSchedule);
  }
}