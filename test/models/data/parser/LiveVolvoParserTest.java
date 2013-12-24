package models.data.parser;

import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.apache.commons.io.IOUtils.toByteArray;
import static org.fest.assertions.Assertions.assertThat;

public class LiveVolvoParserTest {

  @Test
  public void parse_events_sizeAndFieldsAreCorrect()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveVolvoParserTest.html"));

    List<ParsedEvent> events = new LiveVolvoParser().parse(input);

    assertThat(events).hasSize(8);

    ParsedEvent firstEvent = events.get(0);
    assertThat(firstEvent.sportDescr).isEqualTo(null);
    assertThat(firstEvent.firstSide).isEqualTo("Ao Gai");
    assertThat(firstEvent.secondSide).isEqualTo("Vivian Heisen");
    assertThat(firstEvent.date).isEqualTo(null);
    assertThat(firstEvent.firstKof).isEqualTo("21.00");
    assertThat(firstEvent.secondKof).isEqualTo("1.006");
  }

  @Test
  public void parse_1eventWithEmptyFirstKof_zeroEvents()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveVolvoParserTest_parse_1eventWithEmptyFirstKof_zeroEvents.html"));

    List<ParsedEvent> events = new LiveVolvoParser().parse(input);

    assertThat(events).hasSize(0);
  }

  @Test
  public void parse_1eventWithEmptySecondKof_zeroEvents()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveVolvoParserTest_parse_1eventWithEmptySecondKof_zeroEvents.html"));

    List<ParsedEvent> events = new LiveVolvoParser().parse(input);

    assertThat(events).hasSize(0);
  }
}