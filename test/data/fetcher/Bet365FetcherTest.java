package data.fetcher;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.net.URLConnection;
import java.util.List;

import static org.fest.assertions.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.forClass;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(PowerMockRunner.class)
@PrepareForTest({})
public class Bet365FetcherTest {

  Bet365Fetcher fetcher = new Bet365Fetcher("URL");
  @Mock
  private URLConnection urlConnectionMock;

  @Test
  public void beforeRequest() {
    fetcher.beforeRequest(urlConnectionMock);

    ArgumentCaptor<String> argsCaptor = forClass(String.class);
    verify(urlConnectionMock, times(8)).setRequestProperty(argsCaptor.capture(), argsCaptor.capture());
    List args = argsCaptor.getAllValues();

    assertThat(args).containsExactly("User-Agent",
      "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25", "Host",
      "www.bet365.com", "Connection", "keep-alive", "Accept", "*/*", "X-Requested-With", "XMLHttpRequest", "Referer", "http://www.bet365.com/lite/",
      "Accept-Encoding", "gzip,deflate,sdch", "Accept-Language", "en-US,en;q=0.8");
  }
}