package models.data.adapter.kof;

import org.fest.assertions.Assertions;
import org.junit.Before;
import org.junit.Test;

public class DecimalKofAdapterTest {

  private DecimalKofAdapter kofAdapter;

  @Before
  public void before() throws Exception {
    kofAdapter = new DecimalKofAdapter();
  }

  @Test
  public void adapt_always_returnParsedDouble() {
    double actualResult = kofAdapter.adapt("1.5");
    Assertions.assertThat(actualResult).isEqualTo(1.5);
  }
}