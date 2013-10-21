package jobs;

import models.store.EventStore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static models.store.EventStore.removeEventsOlderThan;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EventStore.class)
public class RemoveOldEventJobTest {

  @Test
  public void removeOld() {
    long maxAgeInMillis = 100L;

    mockStatic(EventStore.class);

    new RemoveOldEventJob(maxAgeInMillis).run();

    verifyStatic();
    removeEventsOlderThan(maxAgeInMillis);
  }
}