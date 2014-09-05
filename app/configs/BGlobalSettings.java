package configs;

import akka.actor.Cancellable;
import akka.actor.Scheduler;
import akka.dispatch.MessageDispatcher;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Slf4jReporter;
import com.google.inject.Injector;
import com.google.inject.Key;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import org.slf4j.Logger;
import play.Application;
import play.GlobalSettings;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;

import static com.codahale.metrics.Slf4jReporter.forRegistry;
import static com.google.inject.Guice.createInjector;
import static com.google.inject.name.Names.named;
import static java.lang.System.getenv;
import static java.lang.System.setProperty;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.MINUTES;
import static java.util.concurrent.TimeUnit.SECONDS;
import static models.util.Runnables.wrapLogExRunnable;
import static org.slf4j.LoggerFactory.getLogger;
import static play.libs.Akka.system;

public class BGlobalSettings extends GlobalSettings {

  @Inject Scheduler           scheduler;
  @Inject NotificationJob     notificationJob;
  @Inject RemoveOldEventJob   removeOldEventJob;
  @Inject RemoveOldHistoryJob removeOldHistoryJob;
  @Inject MetricRegistry      metricRegistry;
  Injector injector;
  List<Cancellable> jobSchedules = new LinkedList<Cancellable>();
  private GlobalModule  injectorModule;
  private Slf4jReporter metricReporter;

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return injector.getInstance(controllerClass);
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    setProperty("webdriver.chrome.driver", getenv("WEB_DRIVER"));

    initInjection(app);
    initSchedules(app);
    initMetric();
  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    destroyMetric();
    destroySchedules();
    destroyInjection();
  }

  private String buildDelayConfigKey(String configKeyClassifier) {return "betty.jobs." + configKeyClassifier + ".delay";}

  private String buildOffsetConfigKey(String configKeyClassifier) {return "betty.jobs." + configKeyClassifier + ".offset";}

  private void destroyInjection() {injectorModule.destroy();}

  private void destroyMetric() {metricReporter.stop();}

  private void destroySchedules() {
    for (Cancellable schedule : jobSchedules) {
      schedule.cancel();
    }
  }

  private FiniteDuration getDurationFromAppConfig(Application app, String configKey) {
    return Duration.create(app.configuration().getMilliseconds(configKey), MILLISECONDS);
  }

  private Runnable getEventJob(String eventJobName) {return injector.getInstance(Key.get(Runnable.class, named(eventJobName)));}

  private void initInjection(Application app) {
    injectorModule = new GlobalModule(app.configuration());
    injector = createInjector(injectorModule);
    injector.injectMembers(this);
  }

  private void initMetric() {
    Logger metricLog = getLogger("com.example.metrics");
    metricReporter = forRegistry(metricRegistry).outputTo(metricLog).convertRatesTo(SECONDS).convertDurationsTo(MILLISECONDS).build();
    metricReporter.start(1, MINUTES);
  }

  private void initSchedules(Application app) {
    scheduleJobWithSystemDispatcher(app, "remove-old-history", removeOldHistoryJob);
    scheduleJobWithSystemDispatcher(app, "remove-old-event", removeOldEventJob);

    scheduleJobWithCustomDispatcher(app, "notification", notificationJob);

    List<String> enabledEventJobNames = app.configuration().getStringList("betty.jobs.enabled-event-jobs");
    for (String eventJobName : enabledEventJobNames) {
      scheduleJobWithCustomDispatcher(app, eventJobName, getEventJob(eventJobName));
    }
  }

  private void scheduleJob(Application app, String offsetConfigKey, String delayConfigKey, Runnable job, ExecutionContext dispatcher) {
    FiniteDuration offset = getDurationFromAppConfig(app, offsetConfigKey);
    FiniteDuration delay = getDurationFromAppConfig(app, delayConfigKey);

    Cancellable jobSchedule = scheduler.schedule(offset, delay, wrapLogExRunnable(job, metricRegistry), dispatcher);
    jobSchedules.add(jobSchedule);
  }

  private void scheduleJobWithCustomDispatcher(Application app, String eventJobName, Runnable job) {
    String offsetConfigKey = buildOffsetConfigKey(eventJobName);
    String delayConfigKey = buildDelayConfigKey(eventJobName);
    MessageDispatcher dispatcher = system().dispatchers().lookup("contexts." + eventJobName);
    scheduleJob(app, offsetConfigKey, delayConfigKey, job, dispatcher);
  }

  private void scheduleJobWithSystemDispatcher(Application app, String eventJobName, Runnable job) {
    String offsetConfigKey = buildOffsetConfigKey(eventJobName);
    String delayConfigKey = buildDelayConfigKey(eventJobName);
    ExecutionContext dispatcher = system().dispatcher();
    scheduleJob(app, offsetConfigKey, delayConfigKey, job, dispatcher);
  }
}