package configs;

import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.KamazDateAdapter;
import models.data.adapter.kof.DecimalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.side.KamazSideCodeAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularKamazParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.job.EventFilter;
import models.job.EventJob;
import org.openqa.selenium.chrome.ChromeDriver;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.KAMAZ;
import static models.event.Sport.VOLLEYBALL;

public class RegularKamazVolleyballJob implements Runnable {

  private final Runnable delegate;

  public RegularKamazVolleyballJob(String url, EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    BParser parser = new RegularKamazParser(url, webDriver, "sport51");
    parser = new RetryExceptionParser(parser, 3);

    SideCodeAdapter sideCodeAdapter = new KamazSideCodeAdapter();
    DateAdapter dateAdapter = new KamazDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    BAdapter adapter = new BAdapter(sideCodeAdapter, dateAdapter, kofAdapter, REGULAR, KAMAZ, VOLLEYBALL);

    delegate = new EventJob(eventStore, parser, adapter, eventFilter);
  }

  @Override
  public void run() {
    delegate.run();
  }
}