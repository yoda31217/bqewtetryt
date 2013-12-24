package models.data.fetcher;

import com.google.common.base.Joiner;
import scala.concurrent.duration.Duration;

import java.net.URLConnection;
import java.util.List;
import java.util.Map;

import static com.google.common.base.Joiner.MapJoiner;
import static com.google.common.base.Objects.firstNonNull;
import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.collect.Maps.newConcurrentMap;
import static models.util.BObjects.emptyStringList;

public class LanosFetcher
  extends GzipUrlFetcher {

  private static final MapJoiner COOKIE_JOINER = Joiner.on("; ").withKeyValueSeparator("=");
  final Map<String, String> cookies = newConcurrentMap();

  public LanosFetcher(String url) {
    super(url, Duration.create(5, "sec"));
    cookies.put("panbet.oddstype", "Decimal");
  }

  @Override
  protected void afterRequest(URLConnection conn) {
    List<String> rawCookies = conn.getHeaderFields().get("Set-Cookie");
    rawCookies = firstNonNull(rawCookies, emptyStringList());

    for (String rawCookie : rawCookies) {
      if (isNullOrEmpty(rawCookie)) continue;

      int semicolonIdx = rawCookie.indexOf(';');
      if (-1 < semicolonIdx) rawCookie = rawCookie.substring(0, semicolonIdx);

      int equalIdx = rawCookie.indexOf('=');
      if (-1 < equalIdx) {
        String[] rawCookieParts = rawCookie.split("=");
        cookies.put(rawCookieParts[0], rawCookieParts[1]);
      }
    }
  }

  @Override
  protected void beforeRequest(URLConnection conn) {
    conn.setRequestProperty("User-Agent",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36");
    conn.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp, */*;q=0.8");
    conn.setRequestProperty("Accept-Encoding", "gzip,deflate,sdch");
    conn.setRequestProperty("Accept-Language", "en-US,en;q=0.8");
    conn.setRequestProperty("Connection", "keep-alive");
    conn.setRequestProperty("Cache-Control", "no-cache");
    conn.setRequestProperty("Pragma", "no-cache");

    conn.setRequestProperty("Host", "www.lanosbet.com");
    conn.setRequestProperty("Referer", "http://www.lanosbet.com/en/betting/Tennis/");

    conn.setRequestProperty("Cookie", COOKIE_JOINER.join(cookies));
  }
}