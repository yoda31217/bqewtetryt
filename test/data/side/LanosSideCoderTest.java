package data.side;

import org.junit.Before;
import org.junit.Test;

import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;

public class LanosSideCoderTest {

  private LanosSideCoder coder;

  @Before
  public void before()
    throws Exception {
    coder = new LanosSideCoder();
  }

  @Test
  public void buildCode_basketballSport_returnUnchanged()
    throws Exception {
    String code = coder.buildCode("Side of Unknown Sport", BASKETBALL);
    assertThat(code).isEqualTo("Side of Unknown Sport");
  }

  @Test
  public void buildCode_tennisSideWithAccents_transformedToEng()
    throws Exception {
    String code = coder.buildCode("withuničode secondword", TENNIS);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void buildCode_onePlayerTennisSide_returnfirstWord()
    throws Exception {
    String code = coder.buildCode("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void buildCode_upperCaseTennisSide_returnInLower()
    throws Exception {
    String code = coder.buildCode("UPPERCASEWORD lastword", TENNIS);
    assertThat(code).isEqualTo("uppercaseword");
  }

  @Test
  public void buildCode_oneWordTennisSide_throwsArgEx()
    throws Exception {
    try {
      coder.buildCode("firstword", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: firstword");
    }
  }

  @Test
  public void buildCode_tennisSideWithOnlyDigits_throwsArgEx()
    throws Exception {
    try {
      coder.buildCode("123", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: 123");
    }
  }

  @Test
  public void buildCode_tennisSideWithOneChar_returnOneCharCode()
    throws Exception {
    String code = coder.buildCode("f s", TENNIS);
    assertThat(code).isEqualTo("f");
  }

  @Test
  public void buildCode_twoPlayersTennisSide_returnLastWordsWithComa()
    throws Exception {
    String code = coder.buildCode("firstword secondword / thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }
}