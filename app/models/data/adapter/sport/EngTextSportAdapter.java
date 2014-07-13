package models.data.adapter.sport;

import models.event.Sport;

import static models.event.Sport.sportFromEngName;

public class EngTextSportAdapter implements SportAdapter {

  @Override
  public Sport adapt(String sportStr) {
    return sportFromEngName(sportStr);
  }
}