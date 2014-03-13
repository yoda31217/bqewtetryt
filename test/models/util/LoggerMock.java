package models.util;

import ch.qos.logback.classic.Level;
import play.Logger;

import java.util.ArrayList;
import java.util.List;

import static ch.qos.logback.classic.Level.WARN;
import static org.slf4j.helpers.MessageFormatter.arrayFormat;
import static org.slf4j.helpers.MessageFormatter.format;

public class LoggerMock
  extends Logger.ALogger {

  private List<String> messages;
  private List<Level> levels;

  public LoggerMock() {
    super(null);

    messages = new ArrayList<String>();
    levels = new ArrayList<Level>();
  }

  @Override
  public void error(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public org.slf4j.Logger underlying() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isTraceEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isDebugEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isInfoEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isWarnEnabled() {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public boolean isErrorEnabled() {
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
  public void debug(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
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
  public void info(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void info(String message, Object... args) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void info(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void warn(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void warn(String message, Object... args) {
    String fullMessage = arrayFormat(message, args).getMessage();
    addLogRecord(fullMessage, WARN);
  }

  private void addLogRecord(String message, Level level) {
    messages.add(message);
    levels.add(level);
  }

  public void verifyWarn(String message) {
    for (int i = 0; i < messages.size(); i++) {
      if ((WARN.equals(levels.get(i))) && (message.equals(messages.get(i)))) return;
    }

    throw new AssertionError(format("Expected, but not invoked logger for level={} and message={}.", WARN, message));
  }

  @Override
  public void warn(String message, Throwable error) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void error(String message) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }

  @Override
  public void error(String message, Object... args) {
    throw new UnsupportedOperationException("Please initialise this method of " + LoggerMock.class);
  }
}