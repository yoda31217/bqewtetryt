package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import views.html.index;

import static models.store.EventStore.events;
import static play.libs.Json.toJson;

public class Application
  extends Controller {

  private Application() {
    throw new UnsupportedOperationException();
  }

  public static Result index() {
    return ok(index.render());
  }

  // TODO: gzip
  public static Result getKofs() {
    return ok(toJson(events()));

    //    try {
    //      response().setContentType("application/json; charset=utf-8");
    //      response().setHeader("Content-Encoding", "gzip");
    //
    //      String resultPayload = toJson(events()).toString();
    //
    //
    //      ByteArrayOutputStream out = new ByteArrayOutputStream();
    //      GZIPOutputStream gzip = new GZIPOutputStream(out);
    //      gzip.write(resultPayload.getBytes(Charset.forName("UTF-8")));
    //      gzip.close();
    //      out.toByteArray();
    //
    //
    //      return ok(new ByteArrayInputStream(out.toByteArray()));
    //    } catch (IOException e) {
    //      e.printStackTrace();
    //
    //      return internalServerError();
    //
    //    }
  }
}
