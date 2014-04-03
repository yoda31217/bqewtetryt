package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class NivaSideCodeAdapterTest extends BaseSideCoderTest {

  @Before
  public void before() { codeAdapter = new NivaSideCodeAdapter(); }

  @Test
  public void adapt_2playersTennis_returnFirstWordsCommaSeparated() {
    String code = codeAdapter.adapt("ab de|fg kl", TENNIS);
    assertThat(code).isEqualTo("ab,fg");
  }

  @Test
  public void adapt_2playersTennis_returnFirstWordsOrdered() {
    String code = codeAdapter.adapt("fg de|ab kl", TENNIS);
    assertThat(code).isEqualTo("ab,fg");
  }

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
  public void adapt_wordWithCTennis_returnWordWithS() {
    String code = codeAdapter.adapt("playerc", TENNIS);
    assertThat(code).isEqualTo("players");
  }

  @Test
  public void adapt_wordWithLlTennis_returnWordWithL() {
    String code = codeAdapter.adapt("playerll", TENNIS);
    assertThat(code).isEqualTo("playerl");
  }

  @Test
  public void adapt_wordWithSchTennis_returnWordWithS() {
    String code = codeAdapter.adapt("playersch", TENNIS);
    assertThat(code).isEqualTo("players");
  }

  @Test
  public void adapt_wordWithShTennis_returnWordWithS() {
    String code = codeAdapter.adapt("playersh", TENNIS);
    assertThat(code).isEqualTo("players");
  }

  @Test
  public void adapt_comaSeparatedWordsTennis_reorderAndReturn() {
    String code = codeAdapter.adapt("ab, de", TENNIS);
    assertThat(code).isEqualTo("ab");
  }
}