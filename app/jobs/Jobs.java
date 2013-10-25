package jobs;

import data.adapter.Bet365Adapter;
import data.adapter.MarathonAdapter;
import data.fetcher.Bet365Fetcher;
import data.fetcher.MarathonFetcher;
import data.parser.Bet365Parser;
import data.parser.MarathonParser;

import static models.store.Organisation.BET365;
import static models.store.Organisation.MARATHON;

public final class Jobs {

  public static final EventJob MARATHON_JOB = new EventJob(new MarathonFetcher("http://www.marathonbet.com/en/betting/Tennis/"), new MarathonParser(),
    new MarathonAdapter(), MARATHON.toString());
  public static final EventJob BET365_JOB = new EventJob(new Bet365Fetcher(
    "http://www.bet365.com/Lite/cache/api/?clt=9994&op=4&cid=13&cpid=13-1-50-2-163-0-0-0-1-0-0-4505-0-0-1-0-0-0-0&cf=N&lng=1&cty=195&fm=1&tzi=1&oty=2&hd=N"),
    new Bet365Parser(), new Bet365Adapter(), BET365.toString());
  public static final Runnable REMOVE_OLD_HISTORY_JOB = new RemoveOldHistoryJob(50);

  private Jobs() {
    throw new UnsupportedOperationException();
  }
}