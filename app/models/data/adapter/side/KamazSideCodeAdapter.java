package models.data.adapter.side;

import models.event.Sport;

public class KamazSideCodeAdapter implements SideCodeAdapter {

  @Override
  public String adapt(String side, Sport sport) {
    return side;
  }
}