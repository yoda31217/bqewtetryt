package models.data.adapter.kof;

import static java.lang.Double.parseDouble;

public class DecimalKofAdapter implements KofAdapter {

  @Override
  public double adapt(String kofStr) {
    return parseDouble(kofStr);
  }
}