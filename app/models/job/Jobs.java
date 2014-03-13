package models.job;

import com.google.common.base.Predicate;
import models.data.EventFilter;
import models.data.adapter.AdaptedEvent;
import models.data.adapter.LiveLanosAdapter;
import models.data.adapter.LiveVolvoAdapter;
import models.data.parser.BParser;
import models.data.parser.LiveLanosParser2;
import models.data.parser.LiveVolvoParser2;
import models.data.parser.RetryOnExceptionParser;
import models.data.side.LanosSideCoder;
import models.data.side.VolvoSideCoder;
import models.web_driver.WebDriverKeeper;
import org.openqa.selenium.chrome.ChromeDriver;
import scala.concurrent.duration.Duration;
import twitter4j.TwitterFactory;

import static models.event.EventType.LIVE;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static models.event.Sport.VOLLEYBALL;
import static models.web_driver.WebDriverKeeper.initWebDriverEnv;

public final class Jobs {

  public static final Runnable REMOVE_OLD_HISTORY_JOB;
  public static final RemoveOldEventJob REMOVE_OLD_EVENT_JOB;
  public static final Runnable NOTIFICATION_JOB;
  //  public static final WebDriverKeeper LANOS_WEB_DRIVER_KEEPER;
  public static final LiveLanosSportSelectionJob LANOS_SPORT_SELECTION_JOB;
  public static final EventJob LIVE_LANOS_JOB;
  //  public static final WebDriverKeeper VOLVO_TENNIS_WEB_DRIVER_KEEPER;
  public static final EventJob LIVE_VOLVO_TENNIS_JOB;
  //  public static final WebDriverKeeper VOLVO_VOLLEYBALL_WEB_DRIVER_KEEPER;
  public static final EventJob LIVE_VOLVO_VOLLEYBALL_JOB;
  //  public static final WebDriverKeeper VOLVO_BASKETBALL_WEB_DRIVER_KEEPER;
  public static final EventJob LIVE_VOLVO_BASKETBALL_JOB;
  //  public static final WebDriverKeeper VOLVO_TABLE_TENNIS_WEB_DRIVER_KEEPER;
  public static final EventJob LIVE_VOLVO_TABLE_TENNIS_JOB;
  private static final Predicate<AdaptedEvent> EVENT_FILTER;

  static {
    initWebDriverEnv();

    EVENT_FILTER = new EventFilter();

    REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(4);
    REMOVE_OLD_EVENT_JOB = new RemoveOldEventJob(Duration.create(2, "min").toMillis());

    NOTIFICATION_JOB = new TwitterNotificationJob(TwitterFactory.getSingleton());

    //    LANOS_WEB_DRIVER_KEEPER = createLanosWebDriverKeeper();
    ChromeDriver webDriver = new ChromeDriver();
    LANOS_SPORT_SELECTION_JOB = new LiveLanosSportSelectionJob(webDriver);
    LIVE_LANOS_JOB = createLiveLanosJob(webDriver);

    //    VOLVO_TENNIS_WEB_DRIVER_KEEPER = createVolvoTennisWebDriverKeeper();
    LIVE_VOLVO_TENNIS_JOB = createLiveVolvoTennisJob();

    //    VOLVO_VOLLEYBALL_WEB_DRIVER_KEEPER = createVolvoVolleyballWebDriverKeeper();
    LIVE_VOLVO_VOLLEYBALL_JOB = createLiveVolvoVolleyballJob();

    //    VOLVO_BASKETBALL_WEB_DRIVER_KEEPER = createVolvoBasketballWebDriverKeeper();
    LIVE_VOLVO_BASKETBALL_JOB = createLiveVolvoBasketballJob();

    //    VOLVO_TABLE_TENNIS_WEB_DRIVER_KEEPER = createVolvoTableTennisWebDriverKeeper();
    LIVE_VOLVO_TABLE_TENNIS_JOB = createLiveVolvoTableTennisJob();
  }

  private Jobs() {
    throw new UnsupportedOperationException();
  }

  private static WebDriverKeeper createLanosWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getLanosSite() + "/en/live.htm");
  }

  private static WebDriverKeeper createVolvoTennisWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!in-play/overview/");
  }

  private static WebDriverKeeper createVolvoVolleyballWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!in-play/overview/");
  }

  private static EventJob createLiveVolvoTennisJob() {
    BParser parser = new LiveVolvoParser2(getVolvoSite() + "/Lite/#!in-play/overview/", new ChromeDriver());
    parser = new RetryOnExceptionParser(parser, 3);
    LiveVolvoAdapter adapter = new LiveVolvoAdapter(new VolvoSideCoder(), TENNIS);
    return new EventJob(parser, adapter, EVENT_FILTER, LIVE + "_" + VOLVO + "_" + TENNIS);
  }

  private static EventJob createLiveVolvoVolleyballJob() {
    BParser parser = new LiveVolvoParser2(getVolvoSite() + "/Lite/#!in-play/overview/", new ChromeDriver());
    parser = new RetryOnExceptionParser(parser, 3);
    LiveVolvoAdapter adapter = new LiveVolvoAdapter(new VolvoSideCoder(), VOLLEYBALL);
    return new EventJob(parser, adapter, EVENT_FILTER, LIVE + "_" + VOLVO + "_" + VOLLEYBALL);
  }

  private static EventJob createLiveLanosJob(ChromeDriver webDriver) {
    BParser parser = new LiveLanosParser2(getLanosSite() + "/en/live.htm", webDriver);
    parser = new RetryOnExceptionParser(parser, 3);
    LiveLanosAdapter adapter = new LiveLanosAdapter(new LanosSideCoder());
    return new EventJob(parser, adapter, EVENT_FILTER, LIVE + "_" + LANOS);
  }

  private static EventJob createLiveVolvoTableTennisJob() {
    BParser parser = new LiveVolvoParser2(getVolvoSite() + "/Lite/#!in-play/overview/", new ChromeDriver());
    parser = new RetryOnExceptionParser(parser, 3);
    LiveVolvoAdapter adapter = new LiveVolvoAdapter(new VolvoSideCoder(), TABLE_TENNIS);
    return new EventJob(parser, adapter, EVENT_FILTER, LIVE + "_" + VOLVO + "_" + TABLE_TENNIS);
  }

  private static WebDriverKeeper createVolvoTableTennisWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!in-play/overview/");
  }

  private static EventJob createLiveVolvoBasketballJob() {
    BParser parser = new LiveVolvoParser2(getVolvoSite() + "/Lite/#!in-play/overview/", new ChromeDriver());
    parser = new RetryOnExceptionParser(parser, 3);
    LiveVolvoAdapter adapter = new LiveVolvoAdapter(new VolvoSideCoder(), BASKETBALL);
    return new EventJob(parser, adapter, EVENT_FILTER, LIVE + "_" + VOLVO + "_" + BASKETBALL);
  }

  private static WebDriverKeeper createVolvoBasketballWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!in-play/overview/");
  }

  private static String getVolvoSite() {return "http://www." + "b" + "e" + "t" + "3" + "6" + "5" + ".com";}

  private static String getLanosSite() {return "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com";}
}