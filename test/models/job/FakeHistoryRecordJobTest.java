package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventStore.events;
import static models.event.Organisation.LANOS;
import static models.event.Organisation.VOLVO;
import static org.mockito.Matchers.refEq;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({FakeHistoryRecordJob.class, Date.class, Math.class, EventStore.class})
public class FakeHistoryRecordJobTest {

  @Test
  public void createRecords()
    throws Exception {
    Event firstEventMock = mock(Event.class);
    Event secondEventMock = mock(Event.class);

    mockStatic(EventStore.class);
    when(events()).thenReturn(newArrayList(firstEventMock, secondEventMock));

    Date firstDate = new Date();
    Date secondDate = new Date();

    whenNew(Date.class).withNoArguments().thenReturn(firstDate).thenReturn(secondDate);

    mockStatic(Math.class);
    when(Math.random()).thenReturn(0.5);

    new FakeHistoryRecordJob(LANOS).run();

    verify(firstEventMock).addHistory(refEq(new HistoryRecord(firstDate, LANOS, 1.5, 4.0)));
    verify(secondEventMock).addHistory(refEq(new HistoryRecord(secondDate, LANOS, 1.5, 4.0)));
  }

  @Test
  public void createRecordsWithOtherValues()
    throws Exception {
    Event eventMock = mock(Event.class);

    mockStatic(EventStore.class);
    when(events()).thenReturn(newArrayList(eventMock));

    Date date = new Date();

    whenNew(Date.class).withNoArguments().thenReturn(date);

    mockStatic(Math.class);
    when(Math.random()).thenReturn(0.1);

    new FakeHistoryRecordJob(VOLVO).run();

    verify(eventMock).addHistory(refEq(new HistoryRecord(date, VOLVO, 1.1, 2.4)));
  }
}