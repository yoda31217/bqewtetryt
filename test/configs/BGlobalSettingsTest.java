package configs;

import controllers.MainController;
import models.util.SlowTestJUnit4Runner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import play.test.FakeApplication;

import static org.fest.assertions.Assertions.assertThat;
import static play.libs.Akka.system;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.start;
import static play.test.Helpers.stop;

@RunWith(SlowTestJUnit4Runner.class)
public class BGlobalSettingsTest {

  private FakeApplication fakeApplication;
  private BGlobalSettings globalSettings;

  @Before
  public void before() {
    globalSettings = new BGlobalSettings();
    fakeApplication = fakeApplication(globalSettings);
  }

  @After
  public void after() throws Exception {
    stop(fakeApplication);
  }

  @Test
  public void getControllerInstance_mainController_returnController() throws Exception {
    start(fakeApplication);
    assertThat(globalSettings.getControllerInstance(MainController.class)).isNotNull();
  }

  @Test
  public void onLoadConfig_always_injectorInjected() {
    start(fakeApplication);
    assertThat(globalSettings.injector).isNotNull();
  }

  @Test
  public void onLoadConfig_always_systemSchedulerInjected() {
    start(fakeApplication);
    assertThat(globalSettings.scheduler).isEqualTo(system().scheduler());
  }
}
