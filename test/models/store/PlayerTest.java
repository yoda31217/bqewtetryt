package models.store;

import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class PlayerTest {

  @Test
  public void checkEqualsWithDifferentCases() {
    assertThat(new Player(" aBc", " DeF")).isEqualTo(new Player("AbC ", "dEf "));
  }

  @Test
  public void checkEqualsWithNamesSwapped() {
    assertThat(new Player("abc", "def")).isEqualTo(new Player("def", "abc"));
  }

  @Test
  public void checkNotEquals() {
    assertThat(new Player("abc", "def")).isNotEqualTo(new Player("abb", "def"));
    assertThat(new Player("abc", "def")).isNotEqualTo(new Player("abc", "ddf"));
  }
}