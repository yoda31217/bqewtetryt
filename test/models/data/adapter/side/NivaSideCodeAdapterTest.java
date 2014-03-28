package models.data.adapter.side;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class NivaSideCodeAdapterTest {

  private NivaSideCodeAdapter codeAdapter;

  @Before
  public void before() { codeAdapter = new NivaSideCodeAdapter(); }

  @Test
  public void adapt_always_returnSame() {
    String sideName = "SIDE1";
    String code = codeAdapter.adapt(sideName, null);
    assertThat(code).isSameAs(sideName);
  }

}