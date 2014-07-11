package models.data.adapter.sport;

import models.event.Sport;

public interface SportAdapter {

  Sport adapt(String sportStr);
}
