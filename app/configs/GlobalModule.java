package configs;

import akka.actor.Scheduler;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import controllers.MainController;
import models.event.EventStore;
import models.event.EventType;
import models.event.Sport;
import models.job.EventFilter;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.TwitterNotificationJob;
import models.notification.TwitterNotifier;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import play.Configuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;

import java.util.List;

import static com.google.inject.Scopes.SINGLETON;
import static models.util.Objects2.enumsFromStrings;
import static play.libs.Akka.system;

class GlobalModule extends AbstractModule {

  private final Configuration   configuration;
  private final List<WebDriver> createdWebDrivers;

  public GlobalModule(Configuration configuration, List<WebDriver> createdWebDrivers) {
    this.configuration = configuration;
    this.createdWebDrivers = createdWebDrivers;
  }

  @Override
  protected void configure() {
    bind(EventStore.class).in(SINGLETON);
    bind(Twitter.class).toInstance(TwitterFactory.getSingleton());
  }

  @Provides
  @Singleton
  EventFilter provideEventFilter() {
    List<Sport> allowedSports = enumsFromStrings(Sport.class, configuration.getStringList("betty.job.filter.allowed_sports"));
    List<EventType> allowedTypes = enumsFromStrings(EventType.class, configuration.getStringList("betty.job.filter.allowed_types"));
    return new EventFilter(allowedSports, allowedTypes);
  }

  @Provides
  @Singleton
  MainController provideMainController(EventStore eventStore) {
    return new MainController(eventStore);
  }

  @Provides
  @Singleton
  TwitterNotificationJob provideNotificationJob(Twitter twitter, EventStore eventStore) {
    return new TwitterNotificationJob(new TwitterNotifier(twitter), eventStore);
  }

  @Provides
  @Singleton
  RegularVolvoTennisJob provideRegularVolvoTennisJob(EventStore eventStore, WebDriver webDriver, EventFilter eventFilter) {
    String url = configuration.getString("betty.job.regular_volvo_tennis.url");
    return new RegularVolvoTennisJob(url, eventStore, webDriver, eventFilter);
  }

  @Provides
  @Singleton
  RemoveOldEventJob provideRemoveOldEventJob(EventStore eventStore) {
    long maxLastHistoryRecordAgeInMillis = configuration.getMilliseconds("betty.job.remove_old_event.max_last_history_record_age");
    return new RemoveOldEventJob(maxLastHistoryRecordAgeInMillis, eventStore);
  }

  @Provides
  @Singleton
  RemoveOldHistoryJob provideRemoveOldHistoryJob(EventStore eventStore) {
    return new RemoveOldHistoryJob(configuration.getInt("betty.job.remove_old_history.max_history_count"), eventStore);
  }

  @Provides
  WebDriver provideWebDriver() {
    ChromeDriver chromeDriver = new ChromeDriver();
    createdWebDrivers.add(chromeDriver);
    return chromeDriver;
  }

  @Provides
  @Singleton
  Scheduler provideScheduler() {
    return system().scheduler();
  }
}