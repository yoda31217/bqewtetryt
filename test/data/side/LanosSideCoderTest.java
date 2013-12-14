package data.side;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class LanosSideCoderTest {

  private LanosSideCoder coder;
  private static final String SIDE = "Flipčens, Kirsten";

  @Before
  public void before()
    throws Exception {
    coder = new LanosSideCoder();
  }

  @Test
  public void buildCode_sideWithAccents_transformedToEng()
    throws Exception {

    String code = coder.buildCode(SIDE);
    assertThat(code).isEqualTo("Flipcens, Kirsten");
  }
}