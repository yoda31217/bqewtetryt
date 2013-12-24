package models.event;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.google.common.collect.Lists.newArrayList;

@JsonAutoDetect(fieldVisibility = ANY)
public class Event {

  final Date date;
  final String firstSide;
  final String secondSide;
  final String code;
  final CopyOnWriteArrayList<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();
  final EventType type;
  final Sport sport;

  Event(EventType type, Sport sport, Date date, String firstSide, String secondSide, String code) {
    this.type = type;
    this.sport = sport;
    this.date = date;
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.code = code;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    if (!code.equals(event.code)) return false;
    if (!sport.equals(event.sport)) return false;
    if (type != event.type) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = code.hashCode();
    result = 31 * result + type.hashCode();
    result = 31 * result + sport.hashCode();
    return result;
  }

  public List<HistoryRecord> history() {
    return newArrayList(history);
  }

  public void addHistory(HistoryRecord record) {
    history.add(record);
  }

  public int removeOldHistory(int newSize) {
    if (history.size() <= newSize) return 0;

    List<HistoryRecord> recordsToRemove = newArrayList(history).subList(0, history.size() - newSize);
    history.removeAll(recordsToRemove);
    return recordsToRemove.size();
  }

  public Date date() {
    return date;
  }

  public String firstSide() {
    return firstSide;
  }

  public String secondSide() {
    return secondSide;
  }

  public String code() {
    return code;
  }

  public EventType type() {
    return type;
  }
}