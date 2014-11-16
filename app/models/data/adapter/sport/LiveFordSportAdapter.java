package models.data.adapter.sport;

import models.event.EventSport;

import static models.event.EventSport.BASKETBALL;
import static models.event.EventSport.TENNIS;
import static models.event.EventSport.UNKNOWN;
import static models.event.EventSport.VOLLEYBALL;

public class LiveFordSportAdapter implements SportAdapter {

  @Override
  public EventSport adapt(String sportStr) {
    switch (sportStr) {
      case "30":
        return VOLLEYBALL;

      case "24":
        return TENNIS;

      case "27":
        return BASKETBALL;

      default:
        return UNKNOWN;
    }
  }
}