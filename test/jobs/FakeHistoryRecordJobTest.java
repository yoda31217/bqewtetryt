package jobs;

import models.store.Event;
import models.store.Events;
import models.store.HistoryRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.store.Organisation.BET365;
import static models.store.Organisation.MARATHON;
import static org.mockito.Matchers.refEq;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({FakeHistoryRecordJob.class, Date.class, Math.class})
public class FakeHistoryRecordJobTest {

  @Test
  public void createRecords()
    throws Exception {
    Event firstEventMock = mock(Event.class);
    Event secondEventMock = mock(Event.class);
    Events.addEvent(firstEventMock);
    Events.addEvent(secondEventMock);

    Date firstDate = new Date();
    Date secondDate = new Date();

    whenNew(Date.class).withNoArguments().thenReturn(firstDate).thenReturn(secondDate);

    mockStatic(Math.class);
    when(Math.random()).thenReturn(0.5);

    new FakeHistoryRecordJob(MARATHON).run();

    verify(firstEventMock).addHistory(refEq(new HistoryRecord(firstDate, MARATHON, 1.5, 4.0)));
    verify(secondEventMock).addHistory(refEq(new HistoryRecord(secondDate, MARATHON, 1.5, 4.0)));
  }

  @Test
  public void createRecordsWithOtherValues()
    throws Exception {
    Event eventMock = mock(Event.class);
    Events.addEvent(eventMock);

    Date date = new Date();

    whenNew(Date.class).withNoArguments().thenReturn(date);

    mockStatic(Math.class);
    when(Math.random()).thenReturn(0.1);

    new FakeHistoryRecordJob(BET365).run();

    verify(eventMock).addHistory(refEq(new HistoryRecord(date, BET365, 1.1, 2.4)));
  }
}