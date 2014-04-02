package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class KamazSideCodeAdapterTest extends BaseSideCoderTest {

  @Before
  public void before() { codeAdapter = new KamazSideCodeAdapter(); }

  @Test
  public void adapt_apostropheAtTheEndTennis_returnWithoutApostrophe() {
    String code = codeAdapter.adapt("word'", TENNIS);
    assertThat(code).isEqualTo("word");
  }

  @Test
  public void adapt_manyWordsTennis_returnLastWord() {
    String code = codeAdapter.adapt("first second third", TENNIS);
    assertThat(code).isEqualTo("third");
  }

  @Test
  public void adapt_2playersTennis_returnFirstWordsCommaSeparated() {
    String code = codeAdapter.adapt("a. bcd / e. fgh", TENNIS);
    assertThat(code).isEqualTo("bcd,fgh");
  }

  @Test
  public void adapt_2playersTennis_returnFirstWordsOrdered() {
    String code = codeAdapter.adapt("a. fff / e. bb", TENNIS);
    assertThat(code).isEqualTo("bb,fff");
  }

  @Test
  public void adapt_playerБраунTennis_returnBraun() {
    String code = codeAdapter.adapt("Браун", TENNIS);
    assertThat(code).isEqualTo("braun");
  }
}