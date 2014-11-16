package models.data.parser;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Slf4jReporter;
import com.codahale.metrics.jvm.GarbageCollectorMetricSet;
import com.codahale.metrics.jvm.MemoryUsageGaugeSet;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.chrome.ChromeDriver;

import static com.codahale.metrics.Slf4jReporter.forRegistry;
import static java.util.concurrent.TimeUnit.MILLISECONDS;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.slf4j.LoggerFactory.getLogger;

@Ignore
public class LiveFordParser2SpeedTest {

  private MetricRegistry metricRegistry;
  private Slf4jReporter  metricReporter;

  @BeforeClass
  public static void setUpClass() throws Exception {
    System.setProperty("webdriver.chrome.driver", System.getenv("WEB_DRIVER"));
  }

  @Before
  public void setUp() throws Exception {
    metricRegistry = new MetricRegistry();
    metricRegistry.registerAll(new GarbageCollectorMetricSet());
    metricRegistry.registerAll(new MemoryUsageGaugeSet());

    metricReporter = forRegistry(metricRegistry).outputTo(getLogger("com.example.metrics")).convertRatesTo(SECONDS).convertDurationsTo(MILLISECONDS).build();
    metricReporter.start(5, SECONDS);
  }

  @After
  public void tearDown() throws Exception {
    Thread.sleep(10_000L);
    metricReporter.stop();
  }

  @Test
  public void parse() throws InterruptedException {
    ChromeDriver chromeDriver = new ChromeDriver();

    LiveFordParser2 parser = new LiveFordParser2(chromeDriver, metricRegistry);

    Thread.sleep(10_000L);

    for (int i = 0; i < 10_000; i++) {
      parser.parse();
    }

    chromeDriver.close();

  }
}