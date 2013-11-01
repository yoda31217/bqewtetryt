package data.fetcher;

import scala.concurrent.duration.Duration;

import java.net.URLConnection;

public class VolvoFetcher
  extends UrlFetcher {

  public VolvoFetcher(String url) {
    super(url, Duration.create(5, "sec"));
  }

  @Override
  protected void afterRequest(URLConnection conn) {
  }

  @Override
  protected void beforeRequest(URLConnection conn) {
    conn.setRequestProperty("User-Agent",
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25");
    conn.setRequestProperty("Host", "www.volvo.com");
    conn.setRequestProperty("Connection", "keep-alive");
    conn.setRequestProperty("Accept", "*/*");
    conn.setRequestProperty("X-Requested-With", "XMLHttpRequest");
    conn.setRequestProperty("Referer", "http://www.volvo.com/lite/");
    conn.setRequestProperty("Accept-Encoding", "gzip,deflate,sdch");
    conn.setRequestProperty("Accept-Language", "en-US,en;q=0.8");
  }
}