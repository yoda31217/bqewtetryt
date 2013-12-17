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
    return unmodifiableList(history);
  }

  public void addHistory(HistoryRecord record) {
    history.add(record);
  }

  public void removeHistory(List<HistoryRecord> records) {
    history.removeAll(records);

    //2013-12-16 10:27:46,670 [error] utils.BObjects application-akka.actor.default-dispatcher-5 Unknown exception wrapped and stopped. java.util
    // .ConcurrentModificationException: null
    //	at java.util.concurrent.CopyOnWriteArrayList$COWSubList.checkForComodification(CopyOnWriteArrayList.java:1093) ~[na:1.6.0_65]
    //	at java.util.concurrent.CopyOnWriteArrayList$COWSubList.iterator(CopyOnWriteArrayList.java:1187) ~[na:1.6.0_65]
    //	at java.util.AbstractCollection.contains(AbstractCollection.java:82) ~[na:1.6.0_65]
    //	at java.util.Collections$UnmodifiableCollection.contains(Collections.java:998) ~[na:1.6.0_65]
    //	at java.util.concurrent.CopyOnWriteArrayList.removeAll(CopyOnWriteArrayList.java:620) ~[na:1.6.0_65]
    //	at models.store.Event.removeHistory(Event.java:63) ~[classes/:na]
    //	at jobs.RemoveOldHistoryJob.run(RemoveOldHistoryJob.java:34) ~[classes/:na]
    //	at utils.BObjects$1.run(BObjects.java:40) ~[classes/:na]
    //	at akka.actor.LightArrayRevolverScheduler$$anon$3$$anon$2.run(Scheduler.scala:241) [akka-actor_2.10.jar:2.2.0]
    //	at akka.dispatch.TaskInvocation.run(AbstractDispatcher.scala:42) [akka-actor_2.10.jar:2.2.0]
    //	at akka.dispatch.ForkJoinExecutorConfigurator$AkkaForkJoinTask.exec(AbstractDispatcher.scala:386) [akka-actor_2.10.jar:2.2.0]
    //	at scala.concurrent.forkjoin.ForkJoinTask.doExec(ForkJoinTask.java:260) [scala-library.jar:na]
    //	at scala.concurrent.forkjoin.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1339) [scala-library.jar:na]
    //	at scala.concurrent.forkjoin.ForkJoinPool.runWorker(ForkJoinPool.java:1979) [scala-library.jar:na]
    //	at scala.concurrent.forkjoin.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:107) [scala-library.jar:na]
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