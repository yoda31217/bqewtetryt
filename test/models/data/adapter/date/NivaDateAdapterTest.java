package models.data.adapter.date;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.fest.assertions.Assertions.assertThat;

public class NivaDateAdapterTest {

  private NivaDateAdapter adapter;

  @Before
  public void before() { adapter = new NivaDateAdapter(); }

  @Test
  public void adapt_dayAndMonth_returnCurrentYearDateMidnight() {
    Date actualDate = adapter.adapt("11 окт");
    assertThat(actualDate).isEqualTo(new Date(new Date().getYear(), 9, 11));
  }
}