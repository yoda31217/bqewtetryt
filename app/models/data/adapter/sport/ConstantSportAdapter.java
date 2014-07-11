package models.data.adapter.sport;

import models.event.Sport;

public class ConstantSportAdapter implements SportAdapter {

  private final Sport sport;

  public ConstantSportAdapter(Sport sport) {
    this.sport = sport;
  }

  @Override
  public Sport adapt(String sportStr) {
    return sport;
  }
}