package models.calc;

import models.event.Event;
import models.event.EventType;
import models.event.HistoryRecord;
import models.event.Organisation;
import models.event.Sport;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Calculation {

  private final Event event;

  private boolean isFork;
  private Organisation forkOrganisation2;
  private Organisation forkOrganisation1;
  private double forkKof1;
  private double forkKof2;

  public Calculation(Event event) {
    this.event = event;
    update();
  }

  public Sport sport() {
    return event.sport();
  }

  public EventType type() {
    return event.type();
  }

  public Date date() {
    return event.date();
  }

  public String code() {
    return event.code();
  }

  public String side2() {
    return event.secondSide();
  }

  public String side1() {
    return event.firstSide();
  }

  public void update() {
    isFork = false;
    forkOrganisation1 = null;
    forkOrganisation2 = null;
    forkKof1 = 0.0;
    forkKof2 = 0.0;

    Map<Organisation, HistoryRecord> organisation2lastRecord = new HashMap<Organisation, HistoryRecord>();

    for (HistoryRecord historyRecord : event.history()) {
      organisation2lastRecord.put(historyRecord.organisation(), historyRecord);
    }

    for (HistoryRecord organisationLastRecord : organisation2lastRecord.values()) {

      if ((null == forkOrganisation1) || (organisationLastRecord.firstKof() > forkKof1)) {
        forkKof1 = organisationLastRecord.firstKof();
        forkOrganisation1 = organisationLastRecord.organisation();
      }

      if ((null == forkOrganisation2) || (organisationLastRecord.secondKof() > forkKof2)) {
        forkKof2 = organisationLastRecord.secondKof();
        forkOrganisation2 = organisationLastRecord.organisation();
      }
    }

    isFork = ((1.0 / (forkKof1 - 1.0) + 1.0) < forkKof2);
  }

  public boolean isFork() {
    return isFork;
  }

  public Organisation getForkOrganisation2() {
    return forkOrganisation2;
  }

  public Organisation getForkOrganisation1() {
    return forkOrganisation1;
  }

  public double getForkKof1() {
    return forkKof1;
  }

  public double getForkKof2() {
    return forkKof2;
  }
}