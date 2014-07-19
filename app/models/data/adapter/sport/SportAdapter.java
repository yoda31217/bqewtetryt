package models.data.adapter.sport;

import models.event.EventSport;

public interface SportAdapter {

  EventSport adapt(String sportStr);
}
