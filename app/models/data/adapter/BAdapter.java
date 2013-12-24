package models.data.adapter;

import models.data.parser.ParsedEvent;

public interface BAdapter {

  AdaptedEvent adapt(ParsedEvent parsedEvent);
}
