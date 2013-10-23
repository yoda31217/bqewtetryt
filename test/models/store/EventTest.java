package models.store;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static models.store.Events.randomHistoryRecord;
import static models.store.Events.randomSide;
import static org.fest.assertions.Assertions.assertThat;

public class EventTest {

  private Event event;

  @Before
  public void before()
    throws Exception {
    event = new Event(new Date(), randomSide(), randomSide(), "event_code");
  }

  @Test
  public void historyCollectionCopyCheck() {
    assertThat(event.history()).isNotSameAs(event.history);
  }

  @Test
  public void addHistory() {
    Date date = new Date();
    Organisation organisation = Organisation.MARATHON;
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
  public void removeHistory()
    throws Exception {
    HistoryRecord record = randomHistoryRecord();

    event.addHistory(record);
    assertThat(event.history()).containsExactly(record);

    event.removeHistory(record);
    assertThat(event.history()).hasSize(0);
  }
}