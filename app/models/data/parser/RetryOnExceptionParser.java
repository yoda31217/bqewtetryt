package models.data.parser;

import play.Logger;

import java.util.List;

import static play.Logger.of;

public class RetryOnExceptionParser
  implements BParser {

  static Logger.ALogger log = of(RetryOnExceptionParser.class);
  private final BParser delegate;
  private final int retriesCount;

  public RetryOnExceptionParser(BParser delegate, int retriesCount) {
    this.delegate = delegate;
    this.retriesCount = retriesCount;
  }

  @Override
  public List<ParsedEvent> parse() {
    Exception lastEx = null;

    for (int i = 0; i < retriesCount; i++) {
      try {
        return delegate.parse();

      } catch (Exception ex) {
        lastEx = ex;
        log.warn("Parser delegate call failed. Exception: {}.", ex.toString());
      }
    }

    throw new RuntimeException("All retries to parser delegate had failed.", lastEx);
  }
}