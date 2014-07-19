package models.data.adapter.sport;

import models.event.EventSport;

public class ConstantSportAdapter implements SportAdapter {

  private final EventSport sport;

  public ConstantSportAdapter(EventSport sport) {
    this.sport = sport;
  }

  @Override
  public EventSport adapt(String sportStr) {
    return sport;
  }
}