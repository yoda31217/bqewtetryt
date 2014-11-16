package models.util;

import com.yahoo.platform.yui.compressor.JavaScriptCompressor;
import org.mozilla.javascript.ErrorReporter;
import org.mozilla.javascript.EvaluatorException;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;

import static com.google.common.base.Strings.isNullOrEmpty;
import static java.lang.String.format;

public class JavaScripts {

  private static final int     LINEBREAK                    = -1;
  private static final boolean IS_MUNGE                     = true;
  private static final boolean IS_VERBOSE                   = false;
  private static final boolean IS_ALL_SEMI_COLONS_PRESERVED = false;
  private static final boolean IS_OPTIMIZATIONS_DISABLED    = false;

  public static String compressJavaScript(String script) {
    if (isNullOrEmpty(script)) return script;

    StringWriter writer = new StringWriter();
    StringReader reader = new StringReader(script);

    doCompress(writer, reader);

    return writer.toString();
  }

  private static ErrorReporter createErrorReporter() {
    return new ErrorReporter() {
      @Override
      public void error(String s, String s1, int i, String s2, int i1) {
        throw new IllegalStateException(format("Failed to compress Java Script: %s, %s, %d, %s, %d.", s, s1, i, s2, i1));
      }

      @Override
      public EvaluatorException runtimeError(String s, String s1, int i, String s2, int i1) {
        throw new IllegalStateException(format("Failed to compress Java Script: %s, %s, %d, %s, %d.", s, s1, i, s2, i1));
      }

      @Override
      public void warning(String s, String s1, int i, String s2, int i1) {
        throw new IllegalStateException(format("Failed to compress Java Script: %s, %s, %d, %s, %d.", s, s1, i, s2, i1));
      }
    };
  }

  private static void doCompress(StringWriter writer, StringReader reader) {
    try {
      JavaScriptCompressor javaScriptCompressor = new JavaScriptCompressor(reader, createErrorReporter());
      javaScriptCompressor.compress(writer, LINEBREAK, IS_MUNGE, IS_VERBOSE, IS_ALL_SEMI_COLONS_PRESERVED, IS_OPTIMIZATIONS_DISABLED);

    } catch (IOException e) {
      throw new IllegalStateException("Failed to compress Java Script.", e);
    }
  }
}