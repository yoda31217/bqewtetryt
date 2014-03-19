import akka.actor.Cancellable;
import akka.actor.Scheduler;
import com.google.inject.AbstractModule;
import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.google.inject.name.Named;
import controllers.MainController;
import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.VolvoDateAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.adapter.side.VolvoSideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularVolvoParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.job.EventFilter;
import models.job.EventJob;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import models.notification.TwitterNotifier;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import play.Application;
import play.Configuration;
import play.GlobalSettings;
import scala.concurrent.ExecutionContext;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.inject.Guice.createInjector;
import static com.google.inject.Scopes.NO_SCOPE;
import static com.google.inject.Scopes.SINGLETON;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;
import static models.util.Runnables.createLogExRunnable;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;
import static play.libs.Akka.system;

public class Global extends GlobalSettings {

  private static final String            R_V_TE_J_MARK = "REGULAR_VOLVO_TENNIS_JOB";
  private              List<Cancellable> schedules     = new LinkedList<Cancellable>();
  @Inject private                       RemoveOldEventJob   removeOldEventJob;
  @Inject private                       RemoveOldHistoryJob removeOldHistoryJob;
  @Inject @Named(R_V_TE_J_MARK) private Runnable            regularVolvoTennisJob;
  @Inject private                       NotificationJob     notificationJob;
  private                               Injector            injector;

  @Override
  public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
    return (!MainController.class.equals(controllerClass)) ? super.getControllerInstance(controllerClass) : injector.getInstance(controllerClass);
  }

  private Injector getInjector(Configuration configuration) {
    return createInjector(new AbstractModule() {
      @Override
      protected void configure() {
        bind(EventStore.class).in(SINGLETON);
        bind(Twitter.class).toInstance(TwitterFactory.getSingleton());
        bind(WebDriver.class).to(ChromeDriver.class).in(NO_SCOPE);
      }

      @Provides
      @Singleton
      MainController provideMainController(EventStore eventStore) {
        return new MainController(eventStore);
      }

      @Provides
      @Singleton
      NotificationJob provideNotificationJob(Twitter twitter, EventStore eventStore) {
        return new NotificationJob(new TwitterNotifier(twitter), eventStore);
      }

      @Provides
      @Singleton
      RemoveOldHistoryJob provideRemoveOldHistoryJob(EventStore eventStore) {
        return new RemoveOldHistoryJob(4, eventStore);
      }

      @Provides
      @Singleton
      RemoveOldEventJob provideRemoveOldEventJob(EventStore eventStore) {
        long maxLastHistoryRecordAgeInMillis = Duration.create(2, "min").toMillis();
        return new RemoveOldEventJob(maxLastHistoryRecordAgeInMillis, eventStore);
      }

      @Provides
      @Singleton
      @Named(R_V_TE_J_MARK)
      EventJob provideRegularVolvoTennisJob(EventStore eventStore, WebDriver webDriver) {
        String url = "http://www.bet365.com/lite/?sv=2.3.2.3#!clt=9994;op=4;cid=13;cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0";
        BParser parser = new RegularVolvoParser(url, webDriver);

        int retriesCount = 3;
        parser = new RetryExceptionParser(parser, retriesCount);

        SideCodeAdapter sideCodeAdapter = new VolvoSideCodeAdapter("&");
        DateAdapter dateAdapter = new VolvoDateAdapter();
        BAdapter adapter = new BAdapter(sideCodeAdapter, dateAdapter, REGULAR, VOLVO, TENNIS);

        EventFilter eventFilter = new EventFilter(newArrayList(TENNIS), newArrayList(REGULAR));

        return new EventJob(eventStore, parser, adapter, eventFilter, REGULAR + "_" + VOLVO + "_" + TENNIS);
      }
    });
  }

  @Override
  public Configuration onLoadConfig(Configuration config, File path, ClassLoader classloader) {
    Configuration configuration = super.onLoadConfig(config, path, classloader);

    initWebDriverEnv();

    injector = getInjector(configuration);
    injector.injectMembers(this);

    return configuration;
  }

  @Override
  public void onStart(Application app) {
    super.onStart(app);

    scheduleJob(Duration.create(0, "sec"), Duration.create(1, "min"), removeOldEventJob);
    scheduleJob(Duration.create(27, "sec"), Duration.create(1, "min"), removeOldHistoryJob);
    scheduleJob(Duration.create(7, "sec"), Duration.create(15, "sec"), regularVolvoTennisJob);
    scheduleJob(Duration.create(131, "ms"), Duration.create(300, "ms"), notificationJob);

  }

  @Override
  public void onStop(Application app) {
    super.onStop(app);

    for (Cancellable schedule : schedules) {
      schedule.cancel();
    }
  }

  private boolean scheduleJob(FiniteDuration offset, FiniteDuration delay, Runnable job) {
    Scheduler scheduler = system().scheduler();
    ExecutionContext dispatcher = system().dispatcher();
    Cancellable schedule = scheduler.schedule(offset, delay, createLogExRunnable(job), dispatcher);
    return schedules.add(schedule);
  }
}