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
  public void adapt_dateInSecsStr_returnDate() {
    Date dateNow = new Date();
    long inputDateInSecs = dateNow.getTime() / 1000L;

    Date actualDate = adapter.adapt(String.valueOf(inputDateInSecs));

    Date expectedDate = new Date(dateNow.getYear(), dateNow.getMonth(), dateNow.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());
    assertThat(actualDate).isEqualTo(expectedDate);
  }
}