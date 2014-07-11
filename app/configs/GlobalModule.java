package configs;

import akka.actor.Scheduler;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import controllers.MainController;
import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.KamazDateAdapter;
import models.data.adapter.date.NivaDateAdapter;
import models.data.adapter.kof.DecimalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.sport.ConstantSportAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularKamazParser;
import models.data.parser.RegularNivaParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.event.EventType;
import models.event.Sport;
import models.job.EventFilter;
import models.job.EventJob;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.NotificationJob;
import models.notification.TwitterNotifier;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import play.Configuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;

import javax.inject.Named;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.inject.Scopes.SINGLETON;
import static models.event.EventType.REGULAR;
import static models.event.Organisation.KAMAZ;
import static models.event.Organisation.NIVA;
import static models.event.Sport.BASEBALL;
import static models.event.Sport.TENNIS;
import static models.event.Sport.VOLLEYBALL;
import static models.util.Objects2.enumsFromStrings;
import static play.libs.Akka.system;

class GlobalModule extends AbstractModule {

  private final Configuration configuration;
  private final List<WebDriver> createdWebDrivers = new CopyOnWriteArrayList<WebDriver>();

  public GlobalModule(Configuration configuration) {
    this.configuration = configuration;
  }

  public void destroy() {
    for (WebDriver webDriver : createdWebDrivers) {
      webDriver.close();
    }
  }

  @Override
  protected void configure() {
    bind(EventStore.class).in(SINGLETON);
    bind(Twitter.class).toInstance(TwitterFactory.getSingleton());
    bind(Scheduler.class).toInstance(system().scheduler());
  }

  @Provides
  @Singleton
  EventFilter provideEventFilter() {
    List<Sport> allowedSports = enumsFromStrings(Sport.class, configuration.getStringList("betty.jobs.filter.allowed-sports"));
    List<EventType> allowedTypes = enumsFromStrings(EventType.class, configuration.getStringList("betty.jobs.filter.allowed-types"));
    return new EventFilter(allowedSports, allowedTypes);
  }

  @Provides
  @Singleton
  @Named("live-kamaz")
  Runnable provideLiveKamazJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    //    BParser parser = new RegularKamazParser("https://www.favbet.com/ru/bets/", webDriver, "sport51");
    //    parser = new RetryExceptionParser(parser, 3);
    //
    //    DateAdapter dateAdapter = new KamazDateAdapter();
    //    KofAdapter kofAdapter = new DecimalKofAdapter();
    //    BAdapter adapter = new BAdapter(" / ", dateAdapter, kofAdapter, sportAdapterMock, REGULAR, KAMAZ, VOLLEYBALL);
    //
    //    return new EventJob(eventStore, parser, adapter, eventFilter);
    return null;
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
  @Named("regular-kamaz-baseball")
  Runnable provideRegularKamazBaseballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, BASEBALL, "sport26");
  }

  @Provides
  @Singleton
  @Named("regular-kamaz-tennis")
  Runnable provideRegularKamazTennisJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, TENNIS, "sport2");
  }

  @Provides
  @Singleton
  @Named("regular-kamaz-volleyball")
  Runnable provideRegularKamazVolleyballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, VOLLEYBALL, "sport51");
  }

  @Provides
  @Singleton
  @Named("regular-niva-baseball")
  Runnable provideRegularNivaBaseballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Baseball", BASEBALL);
  }

  @Provides
  @Singleton
  @Named("regular-niva-tennis")
  Runnable provideRegularNivaTennisJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Tennis", TENNIS);
  }

  @Provides
  @Singleton
  @Named("regular-niva-volleyball")
  Runnable provideRegularNivaVolleyballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Volleyball", VOLLEYBALL);
  }

  @Provides
  @Singleton
  RemoveOldEventJob provideRemoveOldEventJob(EventStore eventStore) {
    long maxLastHistoryRecordAgeInMillis = configuration.getMilliseconds("betty.jobs.remove-old-event.max-last-history-record-age");
    return new RemoveOldEventJob(maxLastHistoryRecordAgeInMillis, eventStore);
  }

  @Provides
  @Singleton
  RemoveOldHistoryJob provideRemoveOldHistoryJob(EventStore eventStore) {
    Integer maxHistoryCount = configuration.getInt("betty.jobs.remove-old-history.max-history-count");
    return new RemoveOldHistoryJob(maxHistoryCount, eventStore);
  }

  @Provides
  ChromeDriver provideWebDriver() {
    ChromeDriver chromeDriver = new ChromeDriver();
    createdWebDrivers.add(chromeDriver);
    return chromeDriver;
  }

  private Runnable createRegularKamazJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, Sport sport, String sportStyleName) {
    BParser parser = new RegularKamazParser("https://www.favbet.com/ru/bets/", webDriver, sportStyleName);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new KamazDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    ConstantSportAdapter sportAdapter = new ConstantSportAdapter(sport);
    BAdapter adapter = new BAdapter(" / ", dateAdapter, kofAdapter, sportAdapter, REGULAR, KAMAZ);

    return new EventJob(eventStore, parser, adapter, eventFilter);
  }

  private Runnable createRegularNivaJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, String urlPart, Sport sport) {
    BParser parser = new RegularNivaParser("https://igra.msl.ua/sportliga/uk/sports/" + urlPart, webDriver, sport);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NivaDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    ConstantSportAdapter sportAdapter = new ConstantSportAdapter(sport);
    BAdapter adapter = new BAdapter("|", dateAdapter, kofAdapter, sportAdapter, REGULAR, NIVA);

    return new EventJob(eventStore, parser, adapter, eventFilter);
  }
}