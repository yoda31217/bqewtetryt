package models.data.adapter.side;

import org.junit.Test;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.Sport.UNKNOWN;
import static org.fest.assertions.Assertions.assertThat;

public abstract class BaseSideCodeAdapterTest {

  protected SideCodeAdapter codeAdapter;

  @Test
  public void adapt_anySport_stripAccents() {
    List<List<String>> code = codeAdapter.adapt("withuničode", UNKNOWN);
    assertThat(code).containsExactly(newArrayList("withunicode"));
  }

  @Test
  public void adapt_anySport_stripUpperCase() {
    List<List<String>> code = codeAdapter.adapt("UPPERCASE", UNKNOWN);
    assertThat(code).containsExactly(newArrayList("uppercase"));
  }

  @Test
  public void adapt_anySport_transliterate() {
    List<List<String>> code = codeAdapter.adapt("абвгдеёжзийклмнопрстуфхцчшщьыъэюя", UNKNOWN);
    assertThat(code).containsExactly(newArrayList("abvgdeejziiklmnoprstufhcchshschyeyuya"));
  }
}