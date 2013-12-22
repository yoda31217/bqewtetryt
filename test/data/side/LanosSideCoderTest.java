package data.side;

import org.junit.Before;
import org.junit.Test;

import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TABLE_TENNIS;
import static models.store.Sport.TENNIS;
import static models.store.Sport.UNKNOWN;
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
  public void buildCode_tennisWithAccents_transformedToEng()
  throws Exception {
    String code = coder.buildCode("withuničode secondword", TENNIS);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void buildCode_onePlayerTennis_returnfirstWord()
  throws Exception {
    String code = coder.buildCode("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void buildCode_onePlayerTableTennis_returnfirstWord()
  throws Exception {
    String code = coder.buildCode("firstword lastword", TABLE_TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void buildCode_upperCaseTennis_returnInLower()
  throws Exception {
    String code = coder.buildCode("UPPERCASEWORD lastword", TENNIS);
    assertThat(code).isEqualTo("uppercaseword");
  }

  @Test
  public void buildCode_oneWordTennis_throwsArgEx()
  throws Exception {
    try {
      coder.buildCode("firstword", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: [firstword]");
    }
  }

  @Test
  public void buildCode_tennisWithOnlyDigits_throwsArgEx()
  throws Exception {
    try {
      coder.buildCode("123", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: [123]");
    }
  }

  @Test
  public void buildCode_tennisWithOneChar_returnOneCharCode()
  throws Exception {
    String code = coder.buildCode("f s", TENNIS);
    assertThat(code).isEqualTo("f");
  }

  @Test
  public void buildCode_twoPlayersTennis_returnLastWordsWithComa()
  throws Exception {
    String code = coder.buildCode("firstword secondword / thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }

  @Test
  public void buildCode_anySport_toLowerCase()
    throws Exception {
    String code = coder.buildCode("UPPERCASE", UNKNOWN);
    assertThat(code).isEqualTo("uppercase");
  }

  @Test
  public void buildCode_anySport_transformedToEng()
    throws Exception {
    String code = coder.buildCode("withuničode", UNKNOWN);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void buildCode_anySport_removeHyphens()
    throws Exception {
    String code = coder.buildCode("with-many-huphens", UNKNOWN);
    assertThat(code).isEqualTo("with many huphens");
  }

  @Test
  public void buildCode_anySport_strip2spaces()
    throws Exception {
    String code = coder.buildCode("with 2  spaces", UNKNOWN);
    assertThat(code).isEqualTo("with 2 spaces");
  }

  @Test
  public void buildCode_anySport_strip3spaces()
    throws Exception {
    String code = coder.buildCode("with 3   spaces", UNKNOWN);
    assertThat(code).isEqualTo("with 3 spaces");
  }

  @Test
  public void buildCode_anySport_trimSpaces()
    throws Exception {
    String code = coder.buildCode(" not trimmed ", UNKNOWN);
    assertThat(code).isEqualTo("not trimmed");
  }

  @Test
  public void buildCode_basketball_removeDigit2()
    throws Exception {
    String code = coder.buildCode("team 2", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }

  @Test
  public void buildCode_basketball_removeJunior()
    throws Exception {
    String code = coder.buildCode("team junior", BASKETBALL);
    assertThat(code).isEqualTo("team");
  }
}