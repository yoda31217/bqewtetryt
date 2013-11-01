package controllers;

import models.store.Event;
import models.store.HistoryRecord;
import models.store.Organisation;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import play.GlobalSettings;
import play.mvc.Result;
import play.test.FakeApplication;
import views.html.main;

import java.util.Date;

import static models.store.EventStore.createOrGetEvent;
import static models.store.EventType.REGULAR;
import static models.store.Events.clearEvents;
import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.GET;
import static play.test.Helpers.OK;
import static play.test.Helpers.charset;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.contentType;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.fakeRequest;
import static play.test.Helpers.route;
import static play.test.Helpers.start;
import static play.test.Helpers.status;
import static play.test.Helpers.stop;
import static utils.BObjects.callConstructor;

public class ApplicationTest {

  private Date date;
  private FakeApplication fakeApplication;

  @Before
  public void before() {
    fakeApplication = fakeApplication(new GlobalSettings());
    start(fakeApplication);

    clearEvents();

    date = new Date();

    Event event = createOrGetEvent(REGULAR, date, "firstSide", "secondSide", "eventCode");
    HistoryRecord record = new HistoryRecord(date, Organisation.MARATHON, 1.1, 2.1);
    event.addHistory(record);
  }

  @After
  public void after() {
    stop(fakeApplication);
  }

  @Test(expected = UnsupportedOperationException.class)
  public void constructorUnsupported()
    throws Exception {
    callConstructor(Application.class);
  }

  @Test
  public void mainPage() {
    Result result = route(fakeRequest(GET, "/"));
    String expectedResultBody = main.render().body();

    assertThat(status(result)).isEqualTo(OK);
    assertThat(charset(result)).isEqualTo("utf-8");
    assertThat(contentType(result)).isEqualTo("text/html");
    assertThat(contentAsString(result)).isEqualTo(expectedResultBody);
  }

  @Test
  public void getKofs() {
    Result result = route(fakeRequest(GET, "/get_kofs"));

    assertThat(status(result)).isEqualTo(OK);
    assertThat(charset(result)).isEqualTo("utf-8");
    assertThat(contentType(result)).isEqualTo("application/json");
    assertThat(contentAsString(result)).isEqualTo("[{\"date\":" + date.getTime() +
      ",\"firstSide\":\"firstSide\",\"secondSide\":\"secondSide\",\"code\":\"eventCode\",\"history\":[{\"date\":" + date.getTime() +
      ",\"organisation\":\"MARATHON\",\"firstKof\":1.1,\"secondKof\":2.1}],\"type\":\"REGULAR\"}]");
  }
}
