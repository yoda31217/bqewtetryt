package models.data.adapter.kof;

import com.google.common.base.Splitter;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static java.lang.Double.parseDouble;

public class FractionalKofAdapter implements KofAdapter {

  public static final Splitter SPLITTER = Splitter.on('/').trimResults().omitEmptyStrings();

  @Override
  public double adapt(String kofStr) {
    List<String> kofStrs = newArrayList(SPLITTER.split(kofStr));
    double firstKofPart = parseDouble(kofStrs.get(0));
    double secondKofPart = parseDouble(kofStrs.get(1));
    return firstKofPart / secondKofPart + 1.0;
  }
}