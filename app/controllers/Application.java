package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.main;

import static models.store.EventStore.events;
import static play.libs.Json.toJson;

public class Application
  extends Controller {

  private Application() {
    throw new UnsupportedOperationException();
  }

  public static Result mainPage() {
    return ok(main.render());
  }

  public static Result getKofs() {
    return ok(toJson(events()));
  }
}
