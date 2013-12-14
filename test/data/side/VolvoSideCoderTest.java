package data.side;

import org.junit.Before;
import org.junit.Test;

import static models.store.Sport.TENNIS;
import static models.store.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;

public class VolvoSideCoderTest {

  private VolvoSideCoder coder;

  @Before
  public void before()
    throws Exception {
    coder = new VolvoSideCoder();
  }

  @Test
  public void buildCode_unknownSport_returnUnchanged()
    throws Exception {
    String code = coder.buildCode("Side of Unknown Sport", UNKNOWN);
    assertThat(code).isEqualTo("Side of Unknown Sport");
  }

  @Test
  public void buildCode_sideWithAccents_transformedToEng()
    throws Exception {
    String code = coder.buildCode("firstword withuničode", TENNIS);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void buildCode_onePlayerSide_returnLastWord()
    throws Exception {
    String code = coder.buildCode("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("lastword");
  }

  @Test
  public void buildCode_upperCaseSide_returnInLower()
    throws Exception {
    String code = coder.buildCode("firstword UPPERCASEWORD", TENNIS);
    assertThat(code).isEqualTo("uppercaseword");
  }

  @Test
  public void buildCode_oneWordSide_throwsArgEx()
    throws Exception {
    try {
      coder.buildCode("firstword", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: firstword");
    }
  }

  @Test
  public void buildCode_sideWithOnlyDigits_throwsArgEx()
    throws Exception {
    try {
      coder.buildCode("123", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: 123");
    }
  }

  @Test
  public void buildCode_sideWithOneChar_throwsArgEx()
    throws Exception {
    String code = coder.buildCode("f s", TENNIS);
    assertThat(code).isEqualTo("s");
  }

  @Test
  public void buildCode_twoPlayersSide_returnLastWordsWithComa()
    throws Exception {
    String code = coder.buildCode("firstword secondword & thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }
}