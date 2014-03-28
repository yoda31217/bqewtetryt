package models.data.adapter.kof;

import com.google.common.base.Splitter;

import java.util.Iterator;

import static java.lang.Double.parseDouble;

public class FractionalKofAdapter implements KofAdapter {

  public static final Splitter KOF_SPLITTER = Splitter.on("/").omitEmptyStrings().trimResults();

  @Override
  public double adapt(String kofStr) {
    Iterator<String> kofParts = KOF_SPLITTER.split(kofStr).iterator();
    return 1 + parseDouble(kofParts.next()) / parseDouble(kofParts.next());
  }
}