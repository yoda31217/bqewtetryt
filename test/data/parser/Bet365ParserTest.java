package data.parser;

import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.apache.commons.io.IOUtils.toByteArray;
import static org.fest.assertions.Assertions.assertThat;

public class Bet365ParserTest {

  @Test
  public void parse()
    throws IOException {
    byte[] input = toByteArray(this.getClass().getResourceAsStream("/data/parser/Bet365ParserTest.html"));

    List<ParsedEvent> events = new Bet365Parser().parse(input);

    assertThat(events).hasSize(58);

    ParsedEvent firstEvent = events.get(0);
    assertThat(firstEvent.sportDescr).isEqualTo("TENNIS");
    assertThat(firstEvent.firstSide).isEqualTo("Flovian Mayer");
    assertThat(firstEvent.secondSide).isEqualTo("Jo-Wilfried Tsonga");
    assertThat(firstEvent.date).isEqualTo("11 Oct 07:00");
    assertThat(firstEvent.firstKof).isEqualTo("3.50");
    assertThat(firstEvent.secondKof).isEqualTo("1.28");
  }
}