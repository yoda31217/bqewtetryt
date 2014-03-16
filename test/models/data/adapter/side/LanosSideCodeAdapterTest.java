package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static models.event.Sport.BASKETBALL;
import static models.event.Sport.TABLE_TENNIS;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;

public class LanosSideCodeAdapterTest extends BaseSideCoderTest {

  @Before
  public void before() {
    coder = new LanosSideCodeAdapter();
  }

  @Test
  public void adapt_onePlayerTennis_returnFirstWord() {
    String code = coder.adapt("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void adapt_onePlayerTableTennis_returnFirstWord() {
    String code = coder.adapt("firstword lastword", TABLE_TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void adapt_oneWordTennis_throwsArgEx() {
    try {
      coder.adapt("firstword", TENNIS);
      fail();

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Failed to get first word from side: [firstword]");
    }
  }

  @Test
  public void adapt_tennisWithOnlyDigits_throwsArgEx() {
    try {
      coder.adapt("123", TENNIS);
      fail();

    } catch (Exception ex) {
      assertThat(ex).isInstanceOf(IllegalArgumentException.class).hasMessage("Failed to get first word from side: [123]");
    }
  }

  @Test
  public void adapt_tennisWithOneChar_returnOneCharCode() {
    String code = coder.adapt("f s", TENNIS);
    assertThat(code).isEqualTo("f");
  }

  @Test
  public void adapt_twoPlayersTennis_returnLastWordsWithComa() {
    String code = coder.adapt("firstword secondword / thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }

  @Test
  public void adapt_basketball_removeDigit2() {
    String code = coder.adapt("team 2", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }

  @Test
  public void adapt_basketball_removeJunior() {
    String code = coder.adapt("team junior", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }
}