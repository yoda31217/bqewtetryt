package models.job;

import models.event.Event;
import models.event.EventStore;
import models.event.EventType;
import models.event.Sport;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.event.EventStore.createOrGetEvent;
import static models.event.EventType.REGULAR;
import static models.event.Sport.TENNIS;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.same;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class, FakeEventJob.class, Date.class})
public class FakeEventJobTest {

  @Test
  public void createFakeEvent()
    throws Exception {
    Date date = new Date();
    String firstSide = "first1, second1";
    String secondSide = "first2, second2";

    whenNew(Date.class).withNoArguments().thenReturn(date);

    mockStatic(EventStore.class);
    when(createOrGetEvent(any(EventType.class), any(Sport.class), any(Date.class), anyString(), anyString(), anyString())).thenReturn(mock(Event.class));

    new FakeEventJob().run();

    verifyStatic();
    createOrGetEvent(same(REGULAR), same(TENNIS), same(date), eq(firstSide), eq(secondSide), eq(date.toString() + "_code"));
  }
}