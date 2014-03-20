package models.util;

import org.junit.runner.notification.RunNotifier;
import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.Statement;

import static com.google.common.base.Objects.firstNonNull;
import static java.lang.Boolean.parseBoolean;

public class SlowTestJUnit4Runner extends BlockJUnit4ClassRunner {

  private final boolean isExecuteSlowTests;

  public SlowTestJUnit4Runner(Class<?> klass) throws InitializationError {
    super(klass);
    String isExecuteSlowTestsStr = System.getProperty("execute_slow_tests");
    isExecuteSlowTestsStr = firstNonNull(isExecuteSlowTestsStr, "true");
    isExecuteSlowTests = parseBoolean(isExecuteSlowTestsStr);
  }

  @Override
  protected void runChild(FrameworkMethod method, RunNotifier notifier) {
    if (isExecuteSlowTests) {
      super.runChild(method, notifier);
      return;
    }
    notifier.fireTestIgnored(describeChild(method));
  }

  @Override
  protected Statement withAfterClasses(Statement statement) {
    if (isExecuteSlowTests) return super.withAfterClasses(statement);

    return statement;
  }

  @Override
  protected Statement withBeforeClasses(Statement statement) {
    if (isExecuteSlowTests) return super.withBeforeClasses(statement);

    return statement;
  }
}