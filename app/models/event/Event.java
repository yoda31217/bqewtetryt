package models.event;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.common.collect.Lists.newArrayList;

public class Event {

  final Date date;
  final CopyOnWriteArrayList<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();
  final String    side1;
  final String    side2;
  final Sport     sport;
  final EventType type;

  public Event(EventType type, Sport sport, Date date, String side1, String side2) {
    this.type = type;
    this.sport = sport;
    this.date = date;
    this.side1 = side1;
    this.side2 = side2;
  }

  public void addHistory(HistoryRecord record) {
    history.add(record);
  }

  public Date date() {
    return date;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    if (date != null ? !date.equals(event.date) : event.date != null) return false;
    if (sport != event.sport) return false;
    return type == event.type;
  }

  @Override
  public int hashCode() {
    int result = date != null ? date.hashCode() : 0;
    result = 31 * result + type.hashCode();
    result = 31 * result + sport.hashCode();
    return result;
  }

  public List<HistoryRecord> history() {
    return newArrayList(history);
  }

  public void removeHistory(List<HistoryRecord> recordsToRemove) {history.removeAll(recordsToRemove);}

  public String side1() {
    return side1;
  }

  public String side2() {
    return side2;
  }

  public Sport sport() {
    return sport;
  }

  @Override
  public String toString() {
    return "Event{" +
           ", date=" + date +
           ", history=" + history +
           ", side1='" + side1 + '\'' +
           ", side2='" + side2 + '\'' +
           ", sport=" + sport +
           ", type=" + type +
           '}';
  }

  public EventType type() {
    return type;
  }
}