package data.side;

import static org.apache.commons.lang3.StringUtils.stripAccents;

public class LanosSideCoder
  implements SideCoder {

  @Override
  public String buildCode(String side) {
    return stripAccents(side);
  }
}