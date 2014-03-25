package controllers;

import models.event.Event;
import models.event.EventStore;
import models.event.HistoryRecord;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.GlobalSettings;
import play.mvc.Result;
import play.test.FakeApplication;
import views.html.main;

import java.util.Date;

import static models.event.EventType.REGULAR;
import static models.event.Organisation.LANOS;
import static models.event.Sport.TENNIS;
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

public class MainControllerTest {

  private static Date            eventDate;
  private static FakeApplication fakeApplication;

  @AfterClass
  public static void afterClass() {
    stop(fakeApplication);
  }

  @BeforeClass
  public static void beforeClass() {
    EventStore eventStore = new EventStore();
    MainController mainController = new MainController(eventStore);

    fakeApplication = createFakeApplication(mainController);
    start(fakeApplication);

    eventDate = new Date();
    Event event = eventStore.createOrGetEvent(REGULAR, TENNIS, eventDate, "SIDE1", "SIDE2", "CODE");
    HistoryRecord record = new HistoryRecord(eventDate, LANOS, 1.1, 2.1);
    event.addHistory(record);
  }

  private static FakeApplication createFakeApplication(final MainController mainController) {
    return fakeApplication(new GlobalSettings() {
      @Override
      public <A> A getControllerInstance(Class<A> controllerClass) throws Exception {
        //noinspection unchecked
        return (A) mainController;
      }
    });
  }

  @Test
  public void getCalculations_always_returnFormatedCalculations() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(contentAsString(result)).contains("SIDE1 - SIDE2");
  }

  @Test
  public void getCalculations_always_returnOkStatus() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(status(result)).isEqualTo(OK);
  }

  @Test
  public void getCalculations_always_returnTextPlain() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(contentType(result)).isEqualTo("text/plain");
  }

  @Test
  public void getCalculations_always_returnUtf8() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(charset(result)).isEqualTo("utf-8");
  }

  @Test
  public void getRoot_always_returnMainPage() {
    Result result = route(fakeRequest(GET, "/"));

    String expectedResultBody = main.render().body();
    assertThat(contentAsString(result)).isEqualTo(expectedResultBody);
  }

  @Test
  public void getRoot_always_returnOkStatus() {
    Result result = route(fakeRequest(GET, "/"));
    assertThat(status(result)).isEqualTo(OK);
  }

  @Test
  public void getRoot_always_returnTextHtml() {
    Result result = route(fakeRequest(GET, "/"));
    assertThat(contentType(result)).isEqualTo("text/html");
  }

  @Test
  public void getRoot_always_returnUtf8() {
    Result result = route(fakeRequest(GET, "/"));
    assertThat(charset(result)).isEqualTo("utf-8");
  }
}