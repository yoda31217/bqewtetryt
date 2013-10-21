package models.store;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static java.util.Collections.unmodifiableList;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Event {

  final Date date;
  final String firstPlayer;
  final String secondPlayer;
  final String code;
  final List<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();

  Event(Date date, String firstPlayer, String secondPlayer, String code) {
    this.date = date;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
    this.code = code;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    return code.equals(event.code);

  }

  @Override
  public int hashCode() {
    return code.hashCode();
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

  public String firstPlayer() {
    return firstPlayer;
  }

  public String secondPlayer() {
    return secondPlayer;
  }
}