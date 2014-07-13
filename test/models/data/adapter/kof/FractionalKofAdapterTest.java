package models.data.adapter.kof;

import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class FractionalKofAdapterTest {

  @Test
  public void adapt_always_returnParsedAndConvertedValue() {
    double actualResult = new FractionalKofAdapter().adapt("1/2");
    assertThat(actualResult).isEqualTo(1.5);
  }
}