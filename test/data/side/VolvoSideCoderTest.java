package data.side;

import org.junit.Before;
import org.junit.Test;

import static org.fest.assertions.Assertions.assertThat;

public class VolvoSideCoderTest {

  private VolvoSideCoder coder;
  private static final String SIDE = "Kristina Mladenovič";

  @Before
  public void before()
    throws Exception {
    coder = new VolvoSideCoder();
  }

  @Test
  public void buildCode_sideWithAccents_transformedToEng()
    throws Exception {

    String code = coder.buildCode(SIDE);
    assertThat(code).isEqualTo("Kristina Mladenovic");
  }

}