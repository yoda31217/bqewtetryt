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
  public void adapt_dateInSecs_returnDate() {
    long dateInMillis = new Date().getTime();
    long dateInSecs = dateInMillis / 1000L;

    Date actualDate = adapter.adapt(String.valueOf(dateInSecs));

    assertThat(actualDate).isEqualTo(new Date(dateInSecs * 1000L));
  }
}