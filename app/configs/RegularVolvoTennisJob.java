package configs;

import models.data.adapter.BAdapter;
import models.data.adapter.date.DateAdapter;
import models.data.adapter.date.VolvoDateAdapter;
import models.data.adapter.kof.FractionalKofAdapter;
import models.data.adapter.kof.KofAdapter;
import models.data.adapter.side.SideCodeAdapter;
import models.data.adapter.side.VolvoSideCodeAdapter;
import models.data.parser.BParser;
import models.data.parser.RegularVolvoParser;
import models.data.parser.RetryExceptionParser;
import models.event.EventStore;
import models.job.EventFilter;
import models.job.EventJob;
import org.openqa.selenium.WebDriver;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.VOLVO;
import static models.event.Sport.TENNIS;

public class RegularVolvoTennisJob implements Runnable {

  private final Runnable delegate;

  public RegularVolvoTennisJob(String url, EventStore eventStore, WebDriver webDriver, EventFilter eventFilter) {
    BParser parser = new RegularVolvoParser(url, webDriver);
    parser = new RetryExceptionParser(parser, 3);

    SideCodeAdapter sideCodeAdapter = new VolvoSideCodeAdapter("&");
    DateAdapter dateAdapter = new VolvoDateAdapter();
    KofAdapter kofAdapter = new FractionalKofAdapter();
    BAdapter adapter = new BAdapter(sideCodeAdapter, dateAdapter, kofAdapter, REGULAR, VOLVO, TENNIS);

    delegate = new EventJob(eventStore, parser, adapter, eventFilter);
  }

  @Override
  public void run() {
    delegate.run();
  }
}