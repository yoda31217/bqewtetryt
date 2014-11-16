package configs;

import akka.actor.Scheduler;
import com.codahale.metrics.MetricRegistry;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import controllers.MainController;
import models.calc.Calculator;
import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.KamazDateAdapter;
import models.data.adapter.date.NivaDateAdapter;
import models.data.adapter.date.NowDateAdapter;
import models.data.adapter.kof.DecimalKofAdapter;
import models.data.adapter.kof.FractionalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.sport.ConstantSportAdapter;
import models.data.adapter.sport.LiveFordSportAdapter;
import models.data.adapter.sport.LiveKamazSportAdapter;
import models.data.adapter.sport.SportAdapter;
import models.data.parser.BParser;
import models.data.parser.LiveFordParser2;
import models.data.parser.LiveKamazParser2;
import models.data.parser.LiveVolvoParser2;
import models.data.parser.RegularKamazParser;
import models.data.parser.RegularNivaParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventSport;
import models.event.EventStore;
import models.event.EventType;
import models.job.EventFilter;
import models.job.EventJob;
import models.job.RemoveOldEventJob;
import models.job.RemoveOldHistoryJob;
import models.notification.MessyNotifier;
import models.notification.NotificationJob;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import play.Configuration;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;

import javax.inject.Named;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static models.event.EventOrganisation.FORD;
import static models.event.EventOrganisation.KAMAZ;
import static models.event.EventOrganisation.NIVA;
import static models.event.EventOrganisation.VOLVO;
import static models.event.EventSport.BADMINTON;
import static models.event.EventSport.BASEBALL;
import static models.event.EventSport.BASKETBALL;
import static models.event.EventSport.BEACH_VOLLEYBALL;
import static models.event.EventSport.TABLE_TENNIS;
import static models.event.EventSport.TENNIS;
import static models.event.EventSport.VOLLEYBALL;
import static models.event.EventType.LIVE;
import static models.event.EventType.REGULAR;
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
    bind(Twitter.class).toInstance(TwitterFactory.getSingleton());
    bind(Scheduler.class).toInstance(system().scheduler());
    bind(MetricRegistry.class).toInstance(new MetricRegistry());
  }

  @Provides
  @Singleton
  Calculator provideCalculator(MetricRegistry metricRegistry) {
    return new Calculator(metricRegistry);
  }

  @Provides
  @Singleton
  EventFilter provideEventFilter() {
    List<EventSport> allowedSports = enumsFromStrings(EventSport.class, configuration.getStringList("betty.jobs.filter.allowed-sports"));
    List<EventType> allowedTypes = enumsFromStrings(EventType.class, configuration.getStringList("betty.jobs.filter.allowed-types"));
    return new EventFilter(allowedSports, allowedTypes);
  }

  @Provides
  @Singleton
  EventStore provideEventStore(Calculator calculator, MetricRegistry metricRegistry) {
    return new EventStore(calculator, metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-ford")
  Runnable provideLiveFordJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    BParser parser = new LiveFordParser2(webDriver, metricRegistry);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NowDateAdapter();
    KofAdapter kofAdapter = new FractionalKofAdapter();
    SportAdapter sportAdapter = new LiveFordSportAdapter();
    BAdapter adapter = new BAdapter("/", dateAdapter, kofAdapter, sportAdapter, LIVE, FORD);

    return new EventJob(eventStore, parser, adapter, eventFilter, metricRegistry, LIVE, FORD);
  }

  @Provides
  @Singleton
  @Named("live-kamaz")
  Runnable provideLiveKamazJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    BParser parser = new LiveKamazParser2(webDriver, metricRegistry);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NowDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    SportAdapter sportAdapter = new LiveKamazSportAdapter();
    BAdapter adapter = new BAdapter(" / ", dateAdapter, kofAdapter, sportAdapter, LIVE, KAMAZ);

    return new EventJob(eventStore, parser, adapter, eventFilter, metricRegistry, LIVE, KAMAZ);
  }

  @Provides
  @Singleton
  @Named("live-volvo-badminton")
  Runnable provideLiveVolvoBadmintonJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter,
                                        MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, BADMINTON, "sport_94", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-baseball")
  Runnable provideLiveVolvoBaseballJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, BASEBALL, "sport_16", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-basketball")
  Runnable provideLiveVolvoBasketballJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter,
                                         MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, BASKETBALL, "sport_18", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-beach-volleyball")
  Runnable provideLiveVolvoBeachVolleyballJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter,
                                              MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, BEACH_VOLLEYBALL, "sport_95", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-table-tennis")
  Runnable provideLiveVolvoTableTennisJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter,
                                          MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, TABLE_TENNIS, "sport_92", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-tennis")
  Runnable provideLiveVolvoTennisJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, TENNIS, "sport_13", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("live-volvo-volleyball")
  Runnable provideLiveVolvoVolleyballJob(EventStore eventStore, @Named("mobile") ChromeDriver webDriver, EventFilter eventFilter,
                                         MetricRegistry metricRegistry) {
    return createLiveVolvoJob(eventStore, webDriver, eventFilter, VOLLEYBALL, "sport_91", metricRegistry);
  }

  @Provides
  @Singleton
  MainController provideMainController(Calculator calculator) {
    return new MainController(calculator);
  }

  @Provides
  @Named("mobile")
  ChromeDriver provideMobileWebDriver() {
    ChromeOptions options = new ChromeOptions();
    options.addArguments(
      "--user-agent=Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53");
    ChromeDriver chromeDriver = new ChromeDriver(options);
    createdWebDrivers.add(chromeDriver);
    return chromeDriver;
  }

  @Provides
  @Singleton
  NotificationJob provideNotificationJob(Calculator calculator, MetricRegistry metricRegistry) {
    return new NotificationJob(new MessyNotifier(metricRegistry), calculator, metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-kamaz-baseball")
  Runnable provideRegularKamazBaseballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, BASEBALL, "sport26", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-kamaz-tennis")
  Runnable provideRegularKamazTennisJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, TENNIS, "sport2", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-kamaz-volleyball")
  Runnable provideRegularKamazVolleyballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularKamazJob(eventStore, webDriver, eventFilter, VOLLEYBALL, "sport51", metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-niva-baseball")
  Runnable provideRegularNivaBaseballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Baseball", BASEBALL, metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-niva-tennis")
  Runnable provideRegularNivaTennisJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Tennis", TENNIS, metricRegistry);
  }

  @Provides
  @Singleton
  @Named("regular-niva-volleyball")
  Runnable provideRegularNivaVolleyballJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, MetricRegistry metricRegistry) {
    return createRegularNivaJob(eventStore, webDriver, eventFilter, "Volleyball", VOLLEYBALL, metricRegistry);
  }

  @Provides
  @Singleton
  RemoveOldEventJob provideRemoveOldEventJob(EventStore eventStore, MetricRegistry metricRegistry) {
    long maxLastHistoryRecordAgeInMillis = configuration.getMilliseconds("betty.jobs.remove-old-event.max-last-history-record-age");
    return new RemoveOldEventJob(maxLastHistoryRecordAgeInMillis, eventStore, metricRegistry);
  }

  @Provides
  @Singleton
  RemoveOldHistoryJob provideRemoveOldHistoryJob(EventStore eventStore, MetricRegistry metricRegistry) {
    Integer maxHistoryCount = configuration.getInt("betty.jobs.remove-old-history.max-history-count");
    return new RemoveOldHistoryJob(maxHistoryCount, eventStore, metricRegistry);
  }

  @Provides
  ChromeDriver provideWebDriver() {
    ChromeDriver chromeDriver = new ChromeDriver();
    createdWebDrivers.add(chromeDriver);
    return chromeDriver;
  }

  private Runnable createLiveVolvoJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, EventSport sport, String sportCode,
                                      MetricRegistry metricRegistry) {
    BParser parser = new LiveVolvoParser2(webDriver, sportCode, metricRegistry);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NowDateAdapter();
    KofAdapter kofAdapter = new FractionalKofAdapter();
    SportAdapter sportAdapter = new ConstantSportAdapter(sport);
    BAdapter adapter = new BAdapter("/", dateAdapter, kofAdapter, sportAdapter, LIVE, VOLVO);

    return new EventJob(eventStore, parser, adapter, eventFilter, metricRegistry, LIVE, VOLVO);
  }

  private Runnable createRegularKamazJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, EventSport sport, String sportStyleName,
                                         MetricRegistry metricRegistry) {
    BParser parser = new RegularKamazParser(webDriver, sportStyleName);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new KamazDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    SportAdapter sportAdapter = new ConstantSportAdapter(sport);
    BAdapter adapter = new BAdapter(" / ", dateAdapter, kofAdapter, sportAdapter, REGULAR, KAMAZ);

    return new EventJob(eventStore, parser, adapter, eventFilter, metricRegistry, REGULAR, KAMAZ);
  }

  private Runnable createRegularNivaJob(EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter, String urlPart, EventSport sport,
                                        MetricRegistry metricRegistry) {
    BParser parser = new RegularNivaParser(urlPart, webDriver, sport);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NivaDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    SportAdapter sportAdapter = new ConstantSportAdapter(sport);
    BAdapter adapter = new BAdapter("|", dateAdapter, kofAdapter, sportAdapter, REGULAR, NIVA);

    return new EventJob(eventStore, parser, adapter, eventFilter, metricRegistry, REGULAR, NIVA);
  }
}