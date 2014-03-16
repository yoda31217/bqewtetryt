package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;

public class VolvoSideCodeAdapterTest extends BaseSideCoderTest {

  @Before
  public void before() {
    coder = new VolvoSideCodeAdapter("/");
  }

  @Test
  public void adapt_basketballWithDigit2_removeDigit2() {
    String code = coder.adapt("team 2", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }

  @Test
  public void adapt_basketballWithWomen_removeWomen() {
    String code = coder.adapt("team women", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }

  @Test
  public void adapt_onePlayerTableTennis_returnLastWord() {
    String code = coder.adapt("firstword lastword", TABLE_TENNIS);
    assertThat(code).isEqualTo("lastword");
  }

  @Test
  public void adapt_onePlayerTennis_returnLastWord() {
    String code = coder.adapt("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("lastword");
  }

  @Test
  public void adapt_oneWordTennis_returnWord() {
    String code = coder.adapt("firstword", TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void adapt_tennisWithOneChar_returnOneLastCharCode() {
    String code = coder.adapt("f s", TENNIS);
    assertThat(code).isEqualTo("s");
  }

  @Test
  public void adapt_tennisWithOnlyDigits_throwsArgEx() {
    try {
      coder.adapt("123", TENNIS);
      fail();

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Failed to get last word from side: [123]");
    }
  }

  @Test
  public void adapt_twoPlayersTennis_returnLastWordsWithComa() {
    String code = coder.adapt("firstword secondword / thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }
}