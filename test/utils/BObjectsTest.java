package utils;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import play.Logger;

import java.util.Date;

import static java.util.Collections.emptyList;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.powermock.reflect.Whitebox.setInternalState;
import static utils.BObjects.callConstructor;
import static utils.BObjects.logAndStopExceptions;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Logger.class})
public class BObjectsTest {

  private Logger.ALogger logMock;

  @Before
  public void before() {
    logMock = mock(Logger.ALogger.class);
    setInternalState(BObjects.class, Logger.ALogger.class, logMock);
  }

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported()
    throws Exception {
    callConstructor(BObjects.class);
  }

  @Test
  public void constructorSupported()
    throws Exception {
    Date date = callConstructor(Date.class);
    assertThat(date).isNotNull();
  }

  @Test
  public void emptyStringList()
    throws Exception {
    assertThat(BObjects.emptyStringList()).isSameAs(emptyList());
  }

  @Test
  public void logAndStopAllExceptions() {
    final RuntimeException exception = new RuntimeException("Test exception to log and stop.");

    logAndStopExceptions(new Runnable() {
      @Override
      public void run() {
        throw exception;
      }
    }).run();

    verify(logMock).error(eq("Unknown exception wrapped and stopped."), same(exception));
  }

  @Test
  public void logAndStopExceptionsNoException() {
    logAndStopExceptions(new Runnable() {
      @Override
      public void run() {
      }
    }).run();

    verifyNoMoreInteractions(logMock);
  }
}