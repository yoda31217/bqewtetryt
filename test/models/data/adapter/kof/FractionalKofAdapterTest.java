package models.data.adapter.kof;

import org.fest.assertions.Assertions;
import org.junit.Before;
import org.junit.Test;

public class FractionalKofAdapterTest {

  private FractionalKofAdapter kofAdapter;

  @Before
  public void before() throws Exception {
    kofAdapter = new FractionalKofAdapter();
  }

  @Test
  public void adapt_always_returnDividedPlusOne() {
    double actualResult = kofAdapter.adapt("1/2");
    Assertions.assertThat(actualResult).isEqualTo(1.5);
  }
}