package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;

public class KamazNivaSideCodeAdapterTest extends BaseSideCodeAdapterTest {

  @Before
  public void before() { codeAdapter = new KamazNivaSideCodeAdapter(" / "); }

  @Test
  public void adapt_apostropheAtTheEnd_returnWithoutApostrophe() {
    List<List<String>> code = codeAdapter.adapt("word'", TENNIS);
    assertThat(code).containsExactly(newArrayList("word"));
  }

  @Test
  public void adapt_playerБраун_returnBraun() {
    List<List<String>> code = codeAdapter.adapt("Браун", TENNIS);
    assertThat(code).containsExactly(newArrayList("braun"));
  }

  @Test
  public void adapt_wordWithC_returnWordWithS() {
    List<List<String>> code = codeAdapter.adapt("playerc", TENNIS);
    assertThat(code).containsExactly(newArrayList("players"));
  }

  @Test
  public void adapt_wordWithLl_returnWordWithL() {
    List<List<String>> code = codeAdapter.adapt("playerll", TENNIS);
    assertThat(code).containsExactly(newArrayList("playerl"));
  }

  @Test
  public void adapt_wordWithSch_returnWordWithS() {
    List<List<String>> code = codeAdapter.adapt("playersch", TENNIS);
    assertThat(code).containsExactly(newArrayList("players"));
  }

  @Test
  public void adapt_wordWithSh_returnWordWithS() {
    List<List<String>> code = codeAdapter.adapt("playersh", TENNIS);
    assertThat(code).containsExactly(newArrayList("players"));
  }
}