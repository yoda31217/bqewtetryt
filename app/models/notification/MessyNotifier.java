package models.notification;

import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import play.Logger;

import static com.codahale.metrics.MetricRegistry.name;
import static play.Logger.of;

public class MessyNotifier implements BNotifier {

  Logger.ALogger    log        = of(MessyNotifier.class);
  DefaultHttpClient httpClient = new DefaultHttpClient();
  private final Timer timerMetric;
  private final Meter exceptionMeterMetric;

  public MessyNotifier(MetricRegistry metricRegistry) {
    timerMetric = metricRegistry.timer(name(this.getClass(), "timer"));
    exceptionMeterMetric = metricRegistry.meter(name(this.getClass(), "exception", "meter"));
  }

  @Override
  public void notify(String message) {
    Timer.Context context = timerMetric.time();
    try {
      HttpPost post = new HttpPost("http://messy-app.appspot.com/post_message");
      post.setEntity(new StringEntity(message));
      httpClient.execute(post);
      post.reset();

    } catch (Exception ex) {
      exceptionMeterMetric.mark();
      log.warn("Failed to send message to Messy-app: {}. Error message: {}.", message, ex.getMessage());

    } finally {
      context.stop();
    }
  }
}