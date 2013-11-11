package jobs;

import data.adapter.LanosAdapter;
import data.adapter.LiveLanosAdapter;
import data.adapter.VolvoAdapter;
import data.fetcher.LanosFetcher;
import data.fetcher.LiveFetcher;
import data.fetcher.VolvoFetcher;
import data.parser.LanosParser;
import data.parser.LiveLanosParser;
import data.parser.VolvoParser;
import scala.concurrent.duration.Duration;
import web_driver.WebDriverKeeper;

import static models.store.EventType.LIVE;
import static models.store.Organisation.LANOS;
import static models.store.Organisation.VOLVO;

public final class Jobs {

  public static final EventJob LANOS_JOB = new EventJob(new LanosFetcher(
    "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/betting/Tennis/"), new LanosParser(), new LanosAdapter(),
    LANOS.toString());
  public static final EventJob VOLVO_JOB = new EventJob(new VolvoFetcher("http://www." + "b" + "e" + "t" + "3" + "6" + "5" +
    ".com/Lite/cache/api/?clt=9994&op=4&cid=13&cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0&cf=N&lng=1&cty=195&fm=1&tzi=1&oty=2&hd=N"), new VolvoParser(),
    new VolvoAdapter(), VOLVO.toString());
  public static final Runnable REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(50);
  public static final RemoveOldEventJob REMOVE_OLD_EVENT_JOB = new RemoveOldEventJob(Duration.create(12, "hour").toMillis());
  public static final WebDriverKeeper LANOS_WEB_DRIVER_KEEPER = new WebDriverKeeper(5000L,
    "http://www." + "m" + "a" + "r" + "a" + "t" + "h" + "o" + "n" + "b" + "e" + "t" + ".com/en/live.htm");
  public static final LiveLanosSportSelectionJob LANOS_SPORT_SELECTION_JOB = new LiveLanosSportSelectionJob(LANOS_WEB_DRIVER_KEEPER);
  public static final EventJob LIVE_LANOS_JOB = new EventJob(new LiveFetcher(LANOS_WEB_DRIVER_KEEPER), new LiveLanosParser(), new LiveLanosAdapter(),
    LIVE + "_" + LANOS);

  private Jobs() {
    throw new UnsupportedOperationException();
  }
}