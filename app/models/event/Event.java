package models.event;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.common.collect.Lists.newArrayList;

public class Event {

  final Date   date;
  final String side1;
  final String side2;
  final String code;
  final CopyOnWriteArrayList<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();
  final   EventType type;
  final   Sport     sport;
  private boolean   removed;

  Event(EventType type, Sport sport, Date date, String side1, String side2, String code) {
    this.type = type;
    this.sport = sport;
    this.date = date;
    this.side1 = side1;
    this.side2 = side2;
    this.code = code;
    removed = false;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    if (removed != event.removed) return false;
    if (!code.equals(event.code)) return false;
    if (date != null ? !date.equals(event.date) : event.date != null) return false;
    if (sport != event.sport) return false;
    if (type != event.type) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = date != null ? date.hashCode() : 0;
    result = 31 * result + code.hashCode();
    result = 31 * result + type.hashCode();
    result = 31 * result + sport.hashCode();
    result = 31 * result + (removed ? 1 : 0);
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

  public String side1() {
    return side1;
  }

  public String side2() {
    return side2;
  }

  public String code() {
    return code;
  }

  public EventType type() {
    return type;
  }

  public Sport sport() {
    return sport;
  }

  public boolean isRemoved() {
    return removed;
  }

  void markRemoved() {
    removed = true;
  }
}