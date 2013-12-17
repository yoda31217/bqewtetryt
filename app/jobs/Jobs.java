package jobs;

import com.google.common.base.Predicate;
import data.EventFilter;
import data.adapter.AdaptedEvent;
import data.adapter.LanosAdapter;
import data.adapter.LiveLanosAdapter;
import data.adapter.LiveVolvoAdapter;
import data.adapter.VolvoAdapter;
import data.fetcher.LanosFetcher;
import data.fetcher.LiveFetcher;
import data.fetcher.VolvoFetcher;
import data.parser.LanosParser;
import data.parser.LiveLanosParser;
import data.parser.LiveVolvoParser;
import data.parser.VolvoParser;
import data.side.LanosSideCoder;
import data.side.VolvoSideCoder;
import scala.concurrent.duration.Duration;
import web_driver.WebDriverKeeper;

import static models.store.EventType.LIVE;
import static models.store.Organisation.LANOS;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;
import static models.store.Sport.VOLLEYBALL;

public final class Jobs {

  public static final Runnable REMOVE_OLD_HISTORY_JOB;
  public static final RemoveOldEventJob REMOVE_OLD_EVENT_JOB;
  public static final EventJob LANOS_JOB;
  public static final WebDriverKeeper LANOS_WEB_DRIVER_KEEPER;
  public static final LiveLanosSportSelectionJob LANOS_SPORT_SELECTION_JOB;
  public static final EventJob LIVE_LANOS_JOB;
  public static final EventJob VOLVO_JOB;
  public static final WebDriverKeeper VOLVO_TENNIS_WEB_DRIVER_KEEPER;
  public static final WebDriverKeeper VOLVO_VOLLEYBALL_WEB_DRIVER_KEEPER;
  public static final EventJob LIVE_VOLVO_TENNIS_JOB;
  public static final EventJob LIVE_VOLVO_VOLLEYBALL_JOB;

  static {
    EVENT_FILTER = new EventFilter();
    REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(4);
    REMOVE_OLD_EVENT_JOB = new RemoveOldEventJob(Duration.create(12, "hour").toMillis());
    LANOS_JOB = createLanosJob();
    LANOS_WEB_DRIVER_KEEPER = createLanosWebDriverKeeper();
    LANOS_SPORT_SELECTION_JOB = new LiveLanosSportSelectionJob(LANOS_WEB_DRIVER_KEEPER);
    LIVE_LANOS_JOB = createLiveLanosJob();
    VOLVO_JOB = createVolvoJob();
    VOLVO_TENNIS_WEB_DRIVER_KEEPER = createVolvoTennisWebDriverKeeper();
    VOLVO_VOLLEYBALL_WEB_DRIVER_KEEPER = createVolvoVolleyballWebDriverKeeper();
    LIVE_VOLVO_TENNIS_JOB = createLiveVolvoTennisJob();
    LIVE_VOLVO_VOLLEYBALL_JOB = createLiveVolvoVolleyballJob();
  }

  private static final Predicate<AdaptedEvent> EVENT_FILTER;

  private Jobs() {
    throw new UnsupportedOperationException();
  }

  private static WebDriverKeeper createLanosWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getLanosSite() + "/en/live.htm");
  }

  private static WebDriverKeeper createVolvoTennisWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!clt=9994;op=14;cid=13;cpid=13-0-0-0-0-0-0-4-0-0-0-0-0-0-1-0-0-0-0");
  }

  private static WebDriverKeeper createVolvoVolleyballWebDriverKeeper() {
    return new WebDriverKeeper(5000L, getVolvoSite() + "/Lite/#!clt=9994;op=14;cid=91;cpid=91-0-0-0-0-0-0-4-0-0-0-0-0-0-1-0-0-0-0");
  }

  private static EventJob createLiveVolvoTennisJob() {
    return new EventJob(new LiveFetcher(VOLVO_TENNIS_WEB_DRIVER_KEEPER), new LiveVolvoParser(), new LiveVolvoAdapter(new VolvoSideCoder(), TENNIS),
      EVENT_FILTER, LIVE + "_" + VOLVO + "_TENNIS");
  }

  private static EventJob createLiveVolvoVolleyballJob() {
    return new EventJob(new LiveFetcher(VOLVO_VOLLEYBALL_WEB_DRIVER_KEEPER), new LiveVolvoParser(), new LiveVolvoAdapter(new VolvoSideCoder(), VOLLEYBALL),
      EVENT_FILTER, LIVE + "_" + VOLVO + "_VOLLEYBALL");
  }

  private static EventJob createLiveLanosJob() {
    return new EventJob(new LiveFetcher(LANOS_WEB_DRIVER_KEEPER), new LiveLanosParser(), new LiveLanosAdapter(new LanosSideCoder()), EVENT_FILTER,
      LIVE + "_" + LANOS);
  }

  private static EventJob createVolvoJob() {
    return new EventJob(new VolvoFetcher(
      getVolvoSite() + "/Lite/cache/api/?clt=9994&op=4&cid=13&cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0&cf=N&lng=1&cty=195&fm=1&tzi=1&oty=2&hd=N"),
      new VolvoParser(), new VolvoAdapter(), EVENT_FILTER, VOLVO.toString());
  }

  private static EventJob createLanosJob() {
    return new EventJob(new LanosFetcher(getLanosSite() + "/en/betting/Tennis/"), new LanosParser(), new LanosAdapter(), EVENT_FILTER, LANOS.toString());
  }

  private static String getVolvoSite() {return "http://www." + "b" + "e" + "t" + "3" + "6" + "5" + ".com";}

  private static String getLanosSite() {return "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com";}
}