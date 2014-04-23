package models.data.adapter.side;

import models.event.Sport;

import java.util.List;

public interface SideCodeAdapter {

  List<List<String>> adapt(String side, Sport sport);

}
