package models.notification;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import play.Logger;

import static play.Logger.of;

public class MessyNotifier implements BNotifier {

  Logger.ALogger    log        = of(MessyNotifier.class);
  DefaultHttpClient httpClient = new DefaultHttpClient();

  public MessyNotifier() {
  }

  @Override
  public void notify(String message) {
    try {
      HttpPost post = new HttpPost("http://messy-app.appspot.com/post_message");
      post.setEntity(new StringEntity(message));
      httpClient.execute(post);
      post.reset();

    } catch (Exception ex) {
      log.warn("Failed to send message to Messy-app: {}. Error message: {}.", message, ex.getMessage());
    }
  }
}