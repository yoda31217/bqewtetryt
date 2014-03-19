package configs;

import akka.actor.Cancellable;
import akka.actor.Scheduler;
import com.google.inject.Inject;
import com.google.inject.Injector;
import controllers.MainController;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import play.Application;
import play.Configuration;
import play.GlobalSettings;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import static com.google.inject.Guice.createInjector;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static models.util.Runnables.createLogExRunnable;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static play.libs.Akka.system;

public class Global extends GlobalSettings {

  private List<Cancellable> schedules = new LinkedList<Cancellable>();
  private @Inject RemoveOldEventJob     removeOldEventJob;
  private @Inject RemoveOldHistoryJob   removeOldHistoryJob;
  private @Inject RegularVolvoTennisJob regularVolvoTennisJob;
  private @Inject NotificationJob       notificationJob;
  private         Injector              injector;

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return (!MainController.class.equals(controllerClass)) ? super.getControllerInstance(controllerClass) : injector.getInstance(controllerClass);
  }

  @Override
  public Configuration onLoadConfig(Configuration config, File path, ClassLoader classloader) {
    initWebDriverEnv();

    injector = createInjector(new GlobalModule(config));
    injector.injectMembers(this);

    return config;
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

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
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job) {
    Scheduler scheduler = system().scheduler();
    ExecutionContext dispatcher = system().dispatcher();

    FiniteDuration offsetDuration = Duration.create(app.configuration().getMilliseconds(offsetConfigKey), MILLISECONDS);
    FiniteDuration delayDuration = Duration.create(app.configuration().getMilliseconds(delayConfigKey), MILLISECONDS);

    Cancellable schedule = scheduler.schedule(offsetDuration, delayDuration, createLogExRunnable(job), dispatcher);

    schedules.add(schedule);
  }
}