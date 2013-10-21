package jobs;

import models.store.EventStore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.same;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class, FakeEventJob.class, Date.class})
public class FakeEventJobTest {

  @Test
  public void createFakeEvent()
    throws Exception {
    Date date = new Date();
    String firstPlayer = "first1, second1";
    String secondPlayer = "first2, second2";

    whenNew(Date.class).withNoArguments().thenReturn(date);

    mockStatic(EventStore.class);

    new FakeEventJob().run();

    verifyStatic();
    createOrGetEvent(same(date), eq(firstPlayer), eq(secondPlayer), eq(date.toString() + "_code"));
  }
}