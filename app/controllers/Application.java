package controllers;

import models.store.Event;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.main;

import java.util.List;

import static models.store.EventStore.events;
import static play.Logger.of;
import static play.libs.Json.toJson;

public class Application
  extends Controller {

  private static final Logger.ALogger LOG = of(Application.class);

  private Application() {
    throw new UnsupportedOperationException();
  }

  public static Result mainPage() {
    LOG.trace("API: mainPage");
    return ok(main.render());
  }

  public static Result getKofs() {
    List<Event> events = events();
    LOG.trace("API: getKofs: {} events", events.size());
    return ok(toJson(events));
  }
}
