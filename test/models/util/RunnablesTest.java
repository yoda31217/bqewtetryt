package models.util;

import com.codahale.metrics.MetricRegistry;
import org.junit.Test;

import static models.util.Runnables.LogExRunnable;
import static models.util.Runnables.wrapLogExRunnable;
import static models.util.Tests.callPrivateConstructor;
import static org.mockito.Mockito.mock;

public class RunnablesTest {

  private LoggerMock logMock = new LoggerMock();

  @Test(expected = UnsupportedOperationException.class)
  public void constructor_private_throwUnsupportedEx() throws Exception {
    callPrivateConstructor(Runnables.class);
  }

  @Test
  public void wrapLogExRunnable_doNotThrowExInRun_logNothing() {
    Runnable runnable = wrapLogExRunnable(new Runnable() {
      @Override
      public void run() {
      }
    }, mock(MetricRegistry.class));
    ((LogExRunnable) runnable).log = logMock;
    runnable.run();

    logMock.verifyNoInteractions();
  }

  @Test
  public void wrapLogExRunnable_throwExInRun_logEx() {
    final RuntimeException exception = new RuntimeException("Test exception to log and stop.");

    Runnable runnable = wrapLogExRunnable(new Runnable() {
      @Override
      public void run() {
        throw exception;
      }
    }, mock(MetricRegistry.class));
    ((LogExRunnable) runnable).log = logMock;
    runnable.run();

    logMock.verifyError("Unknown exception wrapped and propagation stopped.", exception);
  }
}