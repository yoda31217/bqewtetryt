package data.fetcher;

import scala.concurrent.duration.FiniteDuration;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;

import static com.google.common.io.ByteStreams.toByteArray;

public abstract class UrlFetcher
  implements BFetcher {

  protected final long minRequestDelayInMillis;
  protected final String url;
  //  private final Logger.ALogger LOG = of("qweqwe");
  volatile long lastFetchTimeInMillis = 0L;

  protected UrlFetcher(String url, FiniteDuration minRequestDelayInMillis) {
    this.minRequestDelayInMillis = minRequestDelayInMillis.toMillis();
    this.url = url;
  }

  @Override
  public byte[] fetch() {
    waitIfNeeded();

    URLConnection conn;
    InputStream input = null;
    try {
      //      LOG.debug("Fetching Url: {}", url);

      conn = new URL(url).openConnection();

      beforeRequest(conn);

      input = conn.getInputStream();
      byte[] result = toByteArray(input);

      afterRequest(conn);

      //      LOG.debug("Fetched: {}b", result.length);

      return result;

    } catch (IOException e) {
      throw new RuntimeException("Failed to fetch URL: " + url, e);

    } finally {
      if (null != input) try {
        input.close();
      } catch (IOException e) {
        throw new RuntimeException("Failed to close input stream for URL: " + url, e);
      }

      lastFetchTimeInMillis = new Date().getTime();
    }
  }

  private void waitIfNeeded() {
    try {
      long now = new Date().getTime();
      long delay = now - lastFetchTimeInMillis;

      if (minRequestDelayInMillis > delay) {
        //        LOG.debug("Sleeping for: {}", delay);
        Thread.sleep(minRequestDelayInMillis - delay);
      }

    } catch (InterruptedException skipped) {
    }
  }

  protected abstract void afterRequest(URLConnection conn);

  protected abstract void beforeRequest(URLConnection conn);
}