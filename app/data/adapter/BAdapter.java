package data.adapter;

import data.parser.ParsedEvent;

public interface BAdapter {

  AdaptedEvent adapt(ParsedEvent parsedEvent);
}
