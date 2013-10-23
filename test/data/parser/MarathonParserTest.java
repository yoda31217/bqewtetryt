package data.parser;

import org.apache.commons.io.IOUtils;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.fest.assertions.Assertions.assertThat;

public class MarathonParserTest {

  @Test
  public void parse()
    throws InterruptedException, IOException {
    byte[] input = IOUtils.toByteArray(this.getClass().getResourceAsStream("/data/parser/MarathonParserTest.html"));

    List<ParsedEvent> events = new MarathonParser().parse(input);

    assertThat(events).hasSize(109);

    ParsedEvent firstEvent = events.get(0);
    assertThat(firstEvent.firstSide).isEqualTo("Flipkens, Kirsten");
    assertThat(firstEvent.secondSide).isEqualTo("Hercog, Polona");
    assertThat(firstEvent.date).isEqualTo("17:30");
    assertThat(firstEvent.firstKof).isEqualTo("1.45");
    assertThat(firstEvent.secondKof).isEqualTo("2.92");

    ParsedEvent seventhEvent = events.get(6);
    assertThat(seventhEvent.date).isEqualTo("11 Sep 14:00");
  }
}