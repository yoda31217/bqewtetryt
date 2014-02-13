package controllers;

import models.event.Event;
import models.event.HistoryRecord;
import models.event.Organisation;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import play.GlobalSettings;
import play.mvc.Result;
import play.test.FakeApplication;
import views.html.main;

import java.util.Date;

import static models.event.EventStore.createOrGetEvent;
import static models.event.EventTests.clearEvents;
import static models.event.EventType.REGULAR;
import static models.event.Sport.TENNIS;
import static models.util.BObjects.callConstructor;
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

@Ignore
public class ApplicationTest {

  private Date date;
  private FakeApplication fakeApplication;

  @Before
  public void before() {
    fakeApplication = fakeApplication(new GlobalSettings());
    start(fakeApplication);

    clearEvents();

    date = new Date();

    Event event = createOrGetEvent(REGULAR, TENNIS, date, "firstSide", "secondSide", "eventCode");
    HistoryRecord record = new HistoryRecord(date, Organisation.LANOS, 1.1, 2.1);
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
    Result result = route(fakeRequest(GET, "/get_calculations"));

    assertThat(status(result)).isEqualTo(OK);
    assertThat(charset(result)).isEqualTo("utf-8");
    assertThat(contentType(result)).isEqualTo("application/json");
    assertThat(contentAsString(result)).isEqualTo("[{\"date\":" + date.getTime() +
      ",\"firstSide\":\"firstSide\",\"secondSide\":\"secondSide\",\"code\":\"eventCode\",\"history\":[{\"date\":" + date.getTime() +
      ",\"organisation\":\"LANOS\",\"firstKof\":1.1,\"secondKof\":2.1}],\"type\":\"REGULAR\",\"sport\":\"TENNIS\",\"removed\":false}]");
  }
}
