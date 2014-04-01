package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class KamazSideCodeAdapterTest {

  private KamazSideCodeAdapter codeAdapter;

  @Before
  public void before() { codeAdapter = new KamazSideCodeAdapter(); }

  @Test
  public void adapt_always_returnSame() {
    String sideName = "SIDE1";
    String code = codeAdapter.adapt(sideName, null);
    assertThat(code).isSameAs(sideName);
  }
}