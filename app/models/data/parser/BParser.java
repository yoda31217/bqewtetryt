package models.data.parser;

import java.util.List;

public interface BParser {

  List<ParsedEvent> parse(byte[] input);
}
