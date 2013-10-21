package data.adapter;

import data.AdaptedEvent;
import data.parser.ParsedEvent;

public interface BAdapter {

  AdaptedEvent adapt(ParsedEvent parsedEvent);
}
