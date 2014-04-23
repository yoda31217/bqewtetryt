package configs;

import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.NivaDateAdapter;
import models.data.adapter.kof.DecimalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularNivaParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.job.EventFilter;
import models.job.EventJob;
import org.openqa.selenium.chrome.ChromeDriver;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.NIVA;
import static models.event.Sport.TENNIS;

public class RegularNivaTennisJob implements Runnable {

  private final Runnable delegate;

  public RegularNivaTennisJob(String url, EventStore eventStore, ChromeDriver webDriver, EventFilter eventFilter) {
    BParser parser = new RegularNivaParser(url, webDriver, TENNIS);
    parser = new RetryExceptionParser(parser, 3);

    DateAdapter dateAdapter = new NivaDateAdapter();
    KofAdapter kofAdapter = new DecimalKofAdapter();
    BAdapter adapter = new BAdapter(dateAdapter, kofAdapter, REGULAR, NIVA, TENNIS);

    delegate = new EventJob(eventStore, parser, adapter, eventFilter);
  }

  @Override
  public void run() {
    delegate.run();
  }
}