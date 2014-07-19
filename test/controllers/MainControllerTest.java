package controllers;

import models.calc.Calculator;
import models.event.Event;
import models.event.EventHistoryRecord;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import play.GlobalSettings;
import play.mvc.Result;
import play.test.FakeApplication;
import views.html.main;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventOrganisation.LANOS;
import static models.event.EventSport.TENNIS;
import static models.event.EventTests.addHistory;
import static models.event.EventType.REGULAR;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Mockito.mock;
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

  private static FakeApplication fakeApplication;

  @AfterClass
  public static void afterClass() {
    stop(fakeApplication);
  }

  @BeforeClass
  public static void beforeClass() {
    EventStore eventStore = new EventStore(mock(Calculator.class));
    MainController mainController = new MainController(eventStore);

    fakeApplication = createFakeApplication(mainController);
    start(fakeApplication);

    DateTime eventDate = new DateTime(2014, 4, 26, 8, 20, UTC);
    Event event = eventStore.createOrFindEvent(REGULAR, TENNIS, eventDate, newArrayList("SIDE1"), newArrayList("SIDE2"));
    EventHistoryRecord record = new EventHistoryRecord(new DateTime(UTC), LANOS, 1.1, 2.1);
    addHistory(event, record);
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
  public void getCalculations_always_returnFormatedCalculationsDates() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(contentAsString(result)).contains("26-04 11:20");
  }

  @Test
  public void getCalculations_always_returnFormatedCalculationsSides() {
    Result result = route(fakeRequest(GET, "/get_calculations"));
    assertThat(contentAsString(result)).contains("[SIDE1] - [SIDE2]");
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
