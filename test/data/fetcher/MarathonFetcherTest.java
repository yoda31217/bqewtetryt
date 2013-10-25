package data.fetcher;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Spy;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.google.common.collect.Lists.newArrayList;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.MapAssert.entry;
import static org.junit.Assert.fail;
import static org.mockito.AdditionalMatchers.geq;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doNothing;
import static org.powermock.api.mockito.PowerMockito.doThrow;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyPrivate;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;
import static org.powermock.reflect.Whitebox.invokeMethod;

@RunWith(PowerMockRunner.class)
@PrepareForTest({URL.class, MarathonFetcher.class, MarathonFetcherTest.class, Date.class})
public class MarathonFetcherTest {

  @Mock
  private URL urlMock;
  @Mock
  private URLConnection urlConnectionMock;
  private byte[] fakeResponse = {(byte) 'a', (byte) 'b', (byte) 'c', (byte) 'd', (byte) 'e', (byte) 'f'};
  private Map<String, List<String>> fakeCookies = new HashMap<String, List<String>>() {{
    put("Set-Cookie", newArrayList("COOKIE_1=COOKIE_1_VALUE", "COOKIE_2=COOKIE_2_VALUE; _NOISE_; _NOISE_AGAIN_"));
  }};
  @Spy
  private MarathonFetcher fetcher = new MarathonFetcher("FETCH_URL");
  @Spy
  private InputStream inputStream = MarathonFetcher.class.getResourceAsStream("/data/fetcher/fakeResponse.txt.gz");

  @Before
  public void before()
    throws Exception {
    whenNew(URL.class).withArguments("FETCH_URL").thenReturn(urlMock);
    when(urlMock.openConnection()).thenReturn(urlConnectionMock);
    when(urlConnectionMock.getInputStream()).thenReturn(inputStream);
  }

  @Test
  public void fetch()
    throws Exception {
    doNothing().when(fetcher, "waitIfNeeded");

    fetcher.cookies.put("COOKIE_1", "COOKIE_1_VALUE");
    fetcher.cookies.put("COOKIE_2", "COOKIE_2_VALUE");

    byte[] response = fetcher.fetch();

    verifyPrivate(fetcher).invoke("waitIfNeeded");

    ArgumentCaptor<String> argsCaptor = ArgumentCaptor.forClass(String.class);
    verify(urlConnectionMock, times(10)).setRequestProperty(argsCaptor.capture(), argsCaptor.capture());

    assertThat(argsCaptor.getAllValues()).isEqualTo(newArrayList("User-Agent",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36", "Accept",
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp, */*;q=0.8", "Accept-Encoding", "gzip,deflate,sdch", "Accept-Language",
      "en-US,en;q=0.8", "Connection", "keep-alive", "Cache-Control", "no-cache", "Pragma", "no-cache", "Host", "www.marathonbet.com", "Referer",
      "http://www.marathonbet.com/en/betting/Tennis/", "Cookie", "COOKIE_1=COOKIE_1_VALUE; COOKIE_2=COOKIE_2_VALUE; panbet.oddstype=Decimal"));

    assertThat(response).isEqualTo(fakeResponse);

    verify(inputStream).close();
  }

  @Test
  public void cookiesAtStart()
    throws Exception {
    assertThat(fetcher.cookies).includes(entry("panbet.oddstype", "Decimal"));
  }

  @Test
  public void fetchAndSetCookie()
    throws Exception {
    doNothing().when(fetcher, "waitIfNeeded");
    when(urlConnectionMock.getHeaderFields()).thenReturn(fakeCookies);

    fetcher.cookies.put("COOKIE_2", "COOKIE_2_VALUE_OLD");
    fetcher.cookies.put("COOKIE_3", "COOKIE_3_VALUE_OLD");

    fetcher.fetch();

    verifyPrivate(fetcher).invoke("waitIfNeeded");

    assertThat(fetcher.cookies).hasSize(4).includes(entry("COOKIE_1", "COOKIE_1_VALUE"), entry("COOKIE_2", "COOKIE_2_VALUE"), entry("COOKIE_3",
      "COOKIE_3_VALUE_OLD"), entry("panbet.oddstype", "Decimal"));
  }

  @Test
  public void fetchAndSetLastFetchTime()
    throws Exception {
    doNothing().when(fetcher, "waitIfNeeded");

    Date wantedLastFetchTime = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(wantedLastFetchTime);

    fetcher.fetch();

    assertThat(fetcher.lastFetchTimeInMillis).isEqualTo(wantedLastFetchTime.getTime());
  }

  @Test
  public void waitIfNeededNoSleep()
    throws Exception {
    mockStatic(Thread.class);
    doThrow(new AssertionError("Thread.sleep() were invoked, but should not.")).when(Thread.class);
    Thread.sleep(anyLong());

    fetcher.lastFetchTimeInMillis = new Date().getTime() - fetcher.minRequestDelayInMillis - 1;

    invokeMethod(fetcher, "waitIfNeeded");
  }

  @Test
  public void waitIfNeededSleep()
    throws Exception {
    mockStatic(Thread.class);
    doNothing().when(Thread.class);
    Thread.sleep(anyLong());

    fetcher.lastFetchTimeInMillis = new Date().getTime() - fetcher.minRequestDelayInMillis + 100;

    invokeMethod(fetcher, "waitIfNeeded");

    verifyStatic();
    Thread.sleep(geq(90L));
  }

  @Test
  public void waitIfNeededInterruptedSkipped()
    throws Exception {
    mockStatic(Thread.class);
    doThrow(new InterruptedException()).when(Thread.class);
    Thread.sleep(anyLong());

    fetcher.lastFetchTimeInMillis = new Date().getTime() - fetcher.minRequestDelayInMillis + 100;

    invokeMethod(fetcher, "waitIfNeeded");

    verifyStatic();
    Thread.sleep(geq(90L));
  }

  @Test
  public void fetchWithIOException()
    throws Exception {
    doNothing().when(fetcher, "waitIfNeeded");

    IOException ioEx = new IOException("EXCEPTION_MESSAGE");
    when(urlConnectionMock.getInputStream()).thenThrow(ioEx);

    try {
      fetcher.fetch();
      fail("Should throw exception.");

    } catch (RuntimeException e) {
      assertThat(e.getMessage()).isEqualTo("Failed to fetch URL: FETCH_URL");
      assertThat(e.getCause()).isSameAs(ioEx);
    }
  }
}