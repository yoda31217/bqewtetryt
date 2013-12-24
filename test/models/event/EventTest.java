package models.event;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.event.EventType.REGULAR;
import static models.event.Events.randomHistoryRecord;
import static models.event.Events.randomSide;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class EventTest {

  private Event event;

  @Before
  public void before()
    throws Exception {
    event = new Event(REGULAR, TENNIS, new Date(), randomSide(), randomSide(), "event_code");
  }

  @Test
  public void historyCollectionCopyCheck() {
    assertThat(event.history()).isNotSameAs(event.history);
  }

  @Test
  public void addHistory() {
    Date date = new Date();
    Organisation organisation = Organisation.LANOS;
    double firstKof = 1.0;
    double secondKof = 1.0;

    HistoryRecord record = new HistoryRecord(date, organisation, firstKof, secondKof);
    event.addHistory(record);

    assertThat(event.history()).containsOnly(record);
    assertThat(date).isEqualTo(record.date());
    assertThat(organisation).isEqualTo(record.organisation());
    assertThat(firstKof).isEqualTo(record.firstKof());
    assertThat(secondKof).isEqualTo(record.secondKof());
  }

  @Test
  public void removeOldHistory()
    throws Exception {
    HistoryRecord record = randomHistoryRecord();

    event.addHistory(record);
    assertThat(event.history()).containsExactly(record);

    event.removeOldHistory(0);
    assertThat(event.history()).hasSize(0);
  }

  @Test
  public void removeOldHistory_1record_return1removedCount()
    throws Exception {
    event.addHistory(randomHistoryRecord());
    int removedCount = event.removeOldHistory(0);
    assertThat(removedCount).isEqualTo(1);
  }
}