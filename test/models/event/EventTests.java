package models.event;

import models.job.EventJob;

public final class EventTests {

  public static void clearEvents() {
    EventJob.INSTANCE.events.clear();
  }
}