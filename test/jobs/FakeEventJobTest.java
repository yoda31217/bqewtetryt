package jobs;

import models.store.EventStore;
import models.store.Player;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static org.mockito.Matchers.same;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyNew;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({EventStore.class, FakeEventJob.class, Player.class, Date.class})
public class FakeEventJobTest {

  @Test
  public void createFakeEvent()
    throws Exception {
    Date date = new Date();
    Player firstPlayer = new Player("first1", "second1");
    Player secondPlayer = new Player("first2", "second2");

    whenNew(Date.class).withNoArguments().thenReturn(date);
    whenNew(Player.class).withArguments("first1", "second1").thenReturn(firstPlayer);
    whenNew(Player.class).withArguments("first2", "second2").thenReturn(secondPlayer);

    mockStatic(EventStore.class);

    new FakeEventJob().run();

    verifyNew(Player.class).withArguments("first1", "second1");

    verifyStatic();
    createOrGetEvent(same(date), same(firstPlayer), same(secondPlayer));
  }
}