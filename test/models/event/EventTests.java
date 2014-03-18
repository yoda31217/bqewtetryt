package models.event;

import controllers.Application;

public final class EventTests {

  public static void clearEvents() {
    Application.INSTANCE.events.clear();
  }
}