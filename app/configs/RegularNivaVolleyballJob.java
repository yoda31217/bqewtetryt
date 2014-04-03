package configs;

import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.NivaDateAdapter;
import models.data.adapter.kof.DecimalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.side.NivaSideCodeAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularNivaParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.job.EventFilter;
import models.job.EventJob;
import org.openqa.selenium.chrome.ChromeDriver;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.NIVA;
import static models.event.Sport.VOLLEYBALL;

public class RegularNivaVolleyballJob implements Runnable {

  private final Runnable delegate;

  public RegularNivaVolleyballJob(String url, EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    BParser parser = new RegularNivaParser(url, webDriver, VOLLEYBALL);
    parser = new RetryExceptionParser(parser, 3);

    SideCodeAdapter sideCodeAdapter = new NivaSideCodeAdapter();
    DateAdapter dateAdapter = new NivaDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    BAdapter adapter = new BAdapter(sideCodeAdapter, dateAdapter, kofAdapter, REGULAR, NIVA, VOLLEYBALL);

    delegate = new EventJob(eventStore, parser, adapter, eventFilter);
  }

  @Override
  public void run() {
    delegate.run();
  }
}