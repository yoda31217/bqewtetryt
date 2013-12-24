package models.data.fetcher;

import scala.concurrent.duration.FiniteDuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;

import static com.google.common.io.ByteStreams.toByteArray;

public abstract class GzipUrlFetcher
  extends UrlFetcher {

  protected GzipUrlFetcher(String url, FiniteDuration minRequestDelayInMillis) {
    super(url, minRequestDelayInMillis);
  }

  @Override
  public byte[] fetch() {
    try {
      return toByteArray(new GZIPInputStream(new ByteArrayInputStream(super.fetch())));

    } catch (IOException e) {
      throw new RuntimeException("Failed to unzip URL: " + url, e);
    }
  }
}