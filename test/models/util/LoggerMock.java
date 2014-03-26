package models.util;

import ch.qos.logback.classic.Level;
import play.Logger;

import java.util.ArrayList;
import java.util.List;

import static ch.qos.logback.classic.Level.DEBUG;
import static ch.qos.logback.classic.Level.ERROR;
import static ch.qos.logback.classic.Level.INFO;
import static ch.qos.logback.classic.Level.WARN;
import static org.junit.Assert.fail;
import static org.slf4j.helpers.MessageFormatter.arrayFormat;

public class LoggerMock extends Logger.ALogger {

  private List<Throwable> errors;
  private List<Level>     levels;
  private List<String>    messages;

  public LoggerMock() {
    super(null);

    messages = new ArrayList<String>();
    levels = new ArrayList<Level>();
    errors = new ArrayList<Throwable>();
  }

  @Override
  public void debug(String message) {
    addLogRecord(message, DEBUG, null);
  }

  @Override
  public void debug(String message, Object... args) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void debug(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void error(String message, Throwable error) {
    addLogRecord(message, ERROR, error);
  }

  @Override
  public void error(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void error(String message, Object... args) {
    String fullMessage = arrayFormat(message, args).getMessage();
    addLogRecord(fullMessage, ERROR, null);
  }

  @Override
  public void info(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void info(String message, Object... args) {
    String fullMessage = arrayFormat(message, args).getMessage();
    addLogRecord(fullMessage, INFO, null);
  }

  @Override
  public void info(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isDebugEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isErrorEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isInfoEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isTraceEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isWarnEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void trace(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void trace(String message, Object... args) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void trace(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public org.slf4j.Logger underlying() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  public void verifyError(String message, Throwable error) {
    verify(message, ERROR, error);
  }

  public void verifyError(String message) {
    verify(message, ERROR, null);
  }

  public void verifyNoInteractions() {
    if (messages.isEmpty()) return;

    fail("Expected no interactions, but found: " + messages.size());
  }

  public void verifyWarn(String message) {
    verify(message, WARN, null);
  }

  @Override
  public void warn(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void warn(String message, Object... args) {
    String fullMessage = arrayFormat(message, args).getMessage();
    addLogRecord(fullMessage, WARN, null);
  }

  @Override
  public void warn(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  private void addLogRecord(String message, Level level, Throwable error) {
    messages.add(message);
    levels.add(level);
    errors.add(error);
  }

  private void appendLogRecordToFailMessage(Level level, String message, Throwable error, StringBuilder failMessageBuilder) {
    failMessageBuilder.append("\n    level: ");
    failMessageBuilder.append(level);
    failMessageBuilder.append(" and message: ");
    failMessageBuilder.append(message);
    failMessageBuilder.append(" and error: ");
    failMessageBuilder.append(error);
  }

  private void assertFail(Level level, String message, Throwable error) {
    StringBuilder failMessageBuilder = new StringBuilder();

    failMessageBuilder.append("\nExpected, but not invoked logger for:");
    appendLogRecordToFailMessage(level, message, error, failMessageBuilder);

    failMessageBuilder.append("\nBut found invocations:");
    for (int i = 0; i < messages.size(); i++) {
      appendLogRecordToFailMessage(levels.get(i), messages.get(i), error, failMessageBuilder);
    }

    fail(failMessageBuilder.toString());
  }

  private void verify(String message, Level level, Throwable error) {
    for (int i = 0; i < messages.size(); i++) {
      boolean levelEquals = level.equals(levels.get(i));
      boolean messageEquals = message.equals(messages.get(i));
      @SuppressWarnings("ThrowableResultOfMethodCallIgnored") boolean errorIsSame = error == errors.get(i);
      if (levelEquals && messageEquals && errorIsSame) return;
    }

    assertFail(level, message, error);
  }
}