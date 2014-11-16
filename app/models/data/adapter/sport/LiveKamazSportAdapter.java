package models.data.adapter.sport;

import models.event.EventSport;

import static models.event.EventSport.BASKETBALL;
import static models.event.EventSport.TENNIS;
import static models.event.EventSport.UNKNOWN;
import static models.event.EventSport.VOLLEYBALL;

public class LiveKamazSportAdapter implements SportAdapter {

  @Override
  public EventSport adapt(String sportStr) {
    switch (sportStr) {
      case "51":
        return VOLLEYBALL;

      case "2":
        return TENNIS;

      case "23":
        return BASKETBALL;

      default:
        return UNKNOWN;
    }
  }
}