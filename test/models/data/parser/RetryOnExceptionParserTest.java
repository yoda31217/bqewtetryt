package models.data.parser;

import models.util.LoggerMock;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class RetryOnExceptionParserTest {

  private ArrayList<ParsedEvent> parsedEventsStub = new ArrayList<ParsedEvent>();
  private BParser delegateMock = mock(BParser.class);
  private LoggerMock logMock = new LoggerMock();

  @Before
  public void before() {
    when(delegateMock.parse()).thenReturn(parsedEventsStub);
  }

  @Test
  public void parse_noExceptionInDelegate_returnedResultFromDelegate() {
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);
    List<ParsedEvent> actualParsedEvents = parser.parse();
    assertThat(actualParsedEvents).isSameAs(parsedEventsStub);
  }

  @Test
  public void parse_1ExceptionInDelegate_returnedResultFromDelegate() {
    when(delegateMock.parse()).thenThrow(new RuntimeException()).thenReturn(parsedEventsStub);
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);

    List<ParsedEvent> actualParsedEvents = parser.parse();

    assertThat(actualParsedEvents).isSameAs(parsedEventsStub);
  }

  @Test
  public void parse_1ExceptionInDelegate_2DelegateParseCalls() {
    when(delegateMock.parse()).thenThrow(new RuntimeException()).thenReturn(parsedEventsStub);
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);

    parser.parse();

    verify(delegateMock, times(2)).parse();
  }

  @Test
  public void parse_2ExceptionsInDelegate_2DelegateParseCalls() {
    when(delegateMock.parse()).thenThrow(new RuntimeException(), new RuntimeException());
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);

    try {
      parser.parse();
      fail("Should never get to this line.");

    } catch (Exception ex) {
      verify(delegateMock, times(2)).parse();
    }
  }

  @Test
  public void parse_2ExceptionsInDelegate_throwExWithCauseAndMsg() {
    RuntimeException firstEx = new RuntimeException();
    RuntimeException secondEx = new RuntimeException();
    when(delegateMock.parse()).thenThrow(firstEx, secondEx);
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);

    try {
      parser.parse();
      fail("Should never get to this line.");

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(RuntimeException.class).hasMessage("All retries to parser delegate had failed.");
      assertThat(ex.getCause()).isSameAs(secondEx);
    }
  }

  @Test
  public void parse_1ExceptionsInDelegate_logException() {
    when(delegateMock.parse()).thenThrow(new RuntimeException("INNER_MESSAGE")).thenReturn(parsedEventsStub);
    RetryOnExceptionParser.log = logMock;
    RetryOnExceptionParser parser = new RetryOnExceptionParser(delegateMock, 2);

    parser.parse();

    logMock.verifyWarn("Parser delegate call failed. Exception: java.lang.RuntimeException: INNER_MESSAGE.");
  }
}