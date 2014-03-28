package models.data.adapter.side;

import org.junit.Test;

import static models.event.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;

public abstract class BaseSideCoderTest {

  protected SideCodeAdapter codeAdapter;

  @Test
  public void adapt_anySport_stripUpperCase() {
    String code = codeAdapter.adapt("UPPERCASE", UNKNOWN);
    assertThat(code).isEqualTo("uppercase");
  }

  @Test
  public void adapt_anySport_stripAccents() {
    String code = codeAdapter.adapt("withuničode", UNKNOWN);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void adapt_anySport_stripHyphens() {
    String code = codeAdapter.adapt("with-many-huphens", UNKNOWN);
    assertThat(code).isEqualTo("with many huphens");
  }

  @Test
  public void adapt_anySport_strip2spaces() {
    String code = codeAdapter.adapt("with 2  spaces", UNKNOWN);
    assertThat(code).isEqualTo("with 2 spaces");
  }

  @Test
  public void adapt_anySport_strip3spaces() {
    String code = codeAdapter.adapt("with 3   spaces", UNKNOWN);
    assertThat(code).isEqualTo("with 3 spaces");
  }

  @Test
  public void adapt_anySport_trimSpaces() {
    String code = codeAdapter.adapt(" not trimmed ", UNKNOWN);
    assertThat(code).isEqualTo("not trimmed");
  }
}