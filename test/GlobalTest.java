import akka.actor.ActorSystem;
import akka.actor.Cancellable;
import akka.actor.Scheduler;
import akka.dispatch.Dispatchers;
import akka.dispatch.MessageDispatcher;
import controllers.Application;
import models.job.RemoveOldEventJob;
import models.util.Runnables;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import play.Play;
import play.libs.Akka;
import play.test.FakeApplication;
import scala.concurrent.ExecutionContext;
import scala.concurrent.ExecutionContextExecutor;
import scala.concurrent.duration.Duration;
import scala.concurrent.duration.FiniteDuration;

import java.util.List;

import static models.test.BMatchers.reflectionEq;
import static models.util.Runnables.createLogExRunnable;
import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.forClass;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.refEq;
import static org.mockito.Matchers.same;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static play.Play.isProd;
import static play.test.Helpers.fakeApplication;
import static play.test.Helpers.start;
import static play.test.Helpers.stop;

// TODO: logic of this class is too complex.
@Ignore
@RunWith(PowerMockRunner.class)
@PrepareForTest({GlobalTest.class, Global.class, Akka.class, ExecutionContext.class, Runnables.class, Play.class})
@PowerMockIgnore("org.apache.http.conn.ssl.*")
public class GlobalTest {

  @Mock
  private ActorSystem              actorSystemMock;
  @Mock
  private ExecutionContextExecutor defaultDispatcherMock;
  @Mock
  private Dispatchers              dispatchersMock;
  @Mock
  private FakeApplication          fakeApplication;
  @Mock
  private MessageDispatcher        lanosFetchingDispatcherMock;
  @Mock
  private Cancellable              scheduleMock;
  @Mock
  private Scheduler                schedulerMock;
  @Mock
  private MessageDispatcher        volvoFetchingDispatcherMock;
  @Mock
  private Runnable                 wrappedRunnableMock;

  @Before
  public void before() throws Exception {
    mockStatic(Akka.class);
    when(Akka.system()).thenReturn(actorSystemMock);

    when(actorSystemMock.scheduler()).thenReturn(schedulerMock);

    when(actorSystemMock.dispatchers()).thenReturn(dispatchersMock);

    when(actorSystemMock.dispatcher()).thenReturn(defaultDispatcherMock);
    when(dispatchersMock.lookup("contexts.fetch-volvo")).thenReturn(volvoFetchingDispatcherMock);
    when(dispatchersMock.lookup("contexts.fetch-lanos")).thenReturn(lanosFetchingDispatcherMock);

    when(schedulerMock.schedule(any(FiniteDuration.class), any(FiniteDuration.class), any(Runnable.class), any(ExecutionContext.class))).thenReturn(
      scheduleMock);

    mockStatic(Runnables.class);
    when(Runnables.createLogExRunnable(any(Runnable.class))).thenReturn(wrappedRunnableMock);

    fakeApplication = fakeApplication(new Global());
  }

  @Test
  public void startAndStopDevMode() throws InterruptedException {
    mockStatic(Play.class);
    when(isProd()).thenReturn(false);

    start(fakeApplication);

    FiniteDuration offset = Duration.create(0, "ms");
    FiniteDuration delay = Duration.create(10, "sec");
    long maxSilenceDelayInMillis = Duration.create(20, "sec").toMillis();

    verifyStatic();
    isProd();

    ArgumentCaptor<Runnable> argsCaptor = forClass(Runnable.class);
    verifyStatic(times(4));
    createLogExRunnable(argsCaptor.capture());
    List args = argsCaptor.getAllValues();

    assertThat(args.get(0)).satisfies(reflectionEq(new RemoveOldEventJob(maxSilenceDelayInMillis, Application.INSTANCE)));

    verify(schedulerMock, times(4)).schedule(refEq(offset), refEq(delay), same(wrappedRunnableMock), same(defaultDispatcherMock));

    stop(fakeApplication);

    verify(scheduleMock, times(4)).cancel();
  }

  @Test
  public void startProdMode() throws InterruptedException {
    mockStatic(Play.class);
    when(isProd()).thenReturn(true);

    start(fakeApplication);

    ArgumentCaptor<Runnable> jobArgsCaptor = forClass(Runnable.class);
    verifyStatic(times(9));
    createLogExRunnable(jobArgsCaptor.capture());
    List jobs = jobArgsCaptor.getAllValues();

    assertThat(jobs).hasSize(9);
    assertThat(jobs.get(0)).isSameAs(Global.REMOVE_OLD_EVENT_JOB);
    assertThat(jobs.get(1)).isSameAs(Global.REMOVE_OLD_HISTORY_JOB);
    //    assertThat(jobs.get(2)).isSameAs(LANOS_JOB);
    //    assertThat(jobs.get(3)).isSameAs(VOLVO_JOB);
    //    assertThat(jobs.get(2)).isSameAs(LANOS_SPORT_SELECTION_JOB);
    //    assertThat(jobs.get(3)).isSameAs(LIVE_LANOS_JOB);
    //    assertThat(jobs.get(4)).isSameAs(LIVE_VOLVO_TENNIS_JOB);
    //    assertThat(jobs.get(5)).isSameAs(LIVE_VOLVO_VOLLEYBALL_JOB);
    //    assertThat(jobs.get(6)).isSameAs(LIVE_VOLVO_BASKETBALL_JOB);
    //    assertThat(jobs.get(7)).isSameAs(LIVE_VOLVO_TABLE_TENNIS_JOB);
    assertThat(jobs.get(8)).isSameAs(Global.NOTIFICATION_JOB);

    ArgumentCaptor<FiniteDuration> durationArgsCaptor = forClass(FiniteDuration.class);
    ArgumentCaptor<ExecutionContext> executionContextArgsCaptor = forClass(ExecutionContext.class);

    verify(schedulerMock, times(9)).schedule(durationArgsCaptor.capture(), durationArgsCaptor.capture(), same(wrappedRunnableMock),
                                             executionContextArgsCaptor.capture());

    List<FiniteDuration> durations = durationArgsCaptor.getAllValues();

    assertThat(durations).hasSize(18);
    assertThat(durations.get(0)).satisfies(reflectionEq(Duration.create(20, "ms")));
    assertThat(durations.get(1)).satisfies(reflectionEq(Duration.create(1, "min")));

    assertThat(durations.get(2)).satisfies(reflectionEq(Duration.create(30, "ms")));
    assertThat(durations.get(3)).satisfies(reflectionEq(Duration.create(1, "min")));

    //    assertThat(durations.get(4)).satisfies(reflectionEq(Duration.create(20, "sec")));
    //    assertThat(durations.get(5)).satisfies(reflectionEq(Duration.create(1, "min")));
    //
    //    assertThat(durations.get(6)).satisfies(reflectionEq(Duration.create(30, "sec")));
    //    assertThat(durations.get(7)).satisfies(reflectionEq(Duration.create(1, "min")));

    assertThat(durations.get(4)).satisfies(reflectionEq(Duration.create(50, "ms")));
    assertThat(durations.get(5)).satisfies(reflectionEq(Duration.create(1, "min")));

    assertThat(durations.get(6)).satisfies(reflectionEq(Duration.create(70, "ms")));
    assertThat(durations.get(7)).satisfies(reflectionEq(Duration.create(300, "ms")));

    assertThat(durations.get(8)).satisfies(reflectionEq(Duration.create(110, "ms")));
    assertThat(durations.get(9)).satisfies(reflectionEq(Duration.create(300, "ms")));

    assertThat(durations.get(10)).satisfies(reflectionEq(Duration.create(130, "ms")));
    assertThat(durations.get(11)).satisfies(reflectionEq(Duration.create(300, "ms")));

    assertThat(durations.get(12)).satisfies(reflectionEq(Duration.create(170, "ms")));
    assertThat(durations.get(13)).satisfies(reflectionEq(Duration.create(300, "ms")));

    assertThat(durations.get(14)).satisfies(reflectionEq(Duration.create(190, "ms")));
    assertThat(durations.get(15)).satisfies(reflectionEq(Duration.create(300, "ms")));

    assertThat(durations.get(16)).satisfies(reflectionEq(Duration.create(230, "ms")));
    assertThat(durations.get(17)).satisfies(reflectionEq(Duration.create(300, "ms")));

    List<ExecutionContext> executionContexts = executionContextArgsCaptor.getAllValues();
    assertThat(executionContexts).hasSize(9).containsExactly(defaultDispatcherMock, defaultDispatcherMock
                                                             //      , lanosFetchingDispatcherMock, volvoFetchingDispatcherMock
      , defaultDispatcherMock, defaultDispatcherMock, defaultDispatcherMock, defaultDispatcherMock, defaultDispatcherMock, defaultDispatcherMock,
                                                             defaultDispatcherMock);
  }
}
