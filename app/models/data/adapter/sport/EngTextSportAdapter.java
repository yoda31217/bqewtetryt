package models.data.adapter.sport;

import models.event.EventSport;

import static models.event.EventSport.sportFromEngName;

public class EngTextSportAdapter implements SportAdapter {

  @Override
  public EventSport adapt(String sportStr) {
    return sportFromEngName(sportStr);
  }
}