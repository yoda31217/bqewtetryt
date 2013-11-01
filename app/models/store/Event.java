package models.store;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static java.util.Collections.unmodifiableList;

@JsonAutoDetect(fieldVisibility = ANY)
public class Event {

  final Date date;
  final String firstSide;
  final String secondSide;
  final String code;
  final List<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();
  final EventType type;

  Event(EventType type, Date date, String firstSide, String secondSide, String code) {
    this.date = date;
    this.firstSide = firstSide;
    this.secondSide = secondSide;
    this.code = code;
    this.type = type;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    if (!code.equals(event.code)) return false;
    if (type != event.type) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = code.hashCode();
    result = 31 * result + type.hashCode();
    return result;
  }

  public List<HistoryRecord> history() {
    return unmodifiableList(history);
  }

  public void addHistory(HistoryRecord record) {
    history.add(record);
  }

  public void removeHistory(HistoryRecord record) {
    history.remove(record);
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