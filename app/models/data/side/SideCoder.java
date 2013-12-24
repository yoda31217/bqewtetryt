package models.data.side;

import models.event.Sport;

public interface SideCoder {

  String buildCode(String side, Sport sport);

}
