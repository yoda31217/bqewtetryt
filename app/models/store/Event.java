package models.store;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import static java.util.Collections.unmodifiableList;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Event {

  final Date date;
  final Player firstPlayer;
  final Player secondPlayer;
  final List<HistoryRecord> history = new CopyOnWriteArrayList<HistoryRecord>();

  Event(Date date, Player firstPlayer, Player secondPlayer) {
    this.date = date;
    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Event event = (Event) o;

    if (!date.equals(event.date)) return false;
    if (!firstPlayer.equals(event.firstPlayer)) return false;
    if (!secondPlayer.equals(event.secondPlayer)) return false;

    return true;
  }

  @Override
  public int hashCode() {
    int result = date.hashCode();
    result = 31 * result + firstPlayer.hashCode();
    result = 31 * result + secondPlayer.hashCode();
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

  public Player firstPlayer() {
    return firstPlayer;
  }

  public Player secondPlayer() {
    return secondPlayer;
  }
}