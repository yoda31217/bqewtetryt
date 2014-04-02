package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class NivaSideCodeAdapterTest extends BaseSideCoderTest {

  @Before
  public void before() { codeAdapter = new NivaSideCodeAdapter(); }

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
    String code = codeAdapter.adapt("aaa bcd|eee fgh", TENNIS);
    assertThat(code).isEqualTo("aaa,eee");
  }

  @Test
  public void adapt_2playersTennis_returnFirstWordsOrdered() {
    String code = codeAdapter.adapt("ee bcd|aaa fgh", TENNIS);
    assertThat(code).isEqualTo("aaa,ee");
  }
}