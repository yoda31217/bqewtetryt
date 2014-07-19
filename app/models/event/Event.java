package models.event;

import org.joda.time.DateTime;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.google.common.collect.Lists.newArrayList;

public class Event {

  final DateTime date;
  final CopyOnWriteArrayList<EventHistoryRecord> history = new CopyOnWriteArrayList<EventHistoryRecord>();
  final List<String> side1;
  final List<String> side2;
  final EventSport   sport;
  final EventType    type;

  public Event(EventType type, EventSport sport, DateTime date, List<String> side1, List<String> side2) {
    this.type = type;
    this.sport = sport;
    this.date = date;
    this.side1 = side1;
    this.side2 = side2;
  }

  public DateTime date() { return date; }

  public List<EventHistoryRecord> history() {
    return newArrayList(history);
  }

  public List<String> side1() {
    return side1;
  }

  public List<String> side2() {
    return side2;
  }

  public EventSport sport() {
    return sport;
  }

  @Override
  public String toString() {
    return "Event{" +
           "date='" + date + '\'' +
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

  void addHistory(EventHistoryRecord record) { history.add(record); }

  void removeHistory(List<EventHistoryRecord> recordsToRemove) {history.removeAll(recordsToRemove);}
}