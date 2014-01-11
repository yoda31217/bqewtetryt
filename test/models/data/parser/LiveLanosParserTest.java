package models.data.parser;

import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.apache.commons.io.IOUtils.toByteArray;
import static org.fest.assertions.Assertions.assertThat;

public class LiveLanosParserTest {

  @Test
  public void parse_events_sizeAndFieldsAreCorrect()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveLanosParserTest.html"));

    List<ParsedEvent> events = new LiveLanosParser().parse(input);

    assertThat(events).hasSize(5);

    ParsedEvent firstEvent = events.get(0);
    assertThat(firstEvent.sportDescr).startsWith("Tennis");
    assertThat(firstEvent.firstSide).isEqualTo("Lajovic, Dusan");
    assertThat(firstEvent.secondSide).isEqualTo("Wu, Di");
    assertThat(firstEvent.date).isEqualTo("02:00");
    assertThat(firstEvent.firstKof).isEqualTo("1.59");
    assertThat(firstEvent.secondKof).isEqualTo("2.375");
  }

  @Test
  public void parse_eventDateWithInjectedTag_parseDateWithoutTag()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveLanosParserTest.html"));

    List<ParsedEvent> events = new LiveLanosParser().parse(input);

    ParsedEvent secondEvent = events.get(1);
    assertThat(secondEvent.date).isEqualTo("02:05");
  }

  @Test
  public void parse_1eventWithEmptyFirstKof_zeroEvents()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveLanosParserTest_parse_1eventWithEmptyFirstKof_zeroEvents.html"));

    List<ParsedEvent> events = new LiveLanosParser().parse(input);

    assertThat(events).hasSize(0);
  }

  @Test
  public void parse_1eventWithEmptySecondKof_zeroEvents()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/models/data/parser/LiveLanosParserTest_parse_1eventWithEmptySecondKof_zeroEvents.html"));

    List<ParsedEvent> events = new LiveLanosParser().parse(input);

    assertThat(events).hasSize(0);
  }
}