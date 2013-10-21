package assets.javascripts;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class GetKofsJavascriptTest {

  //  private FakeApplication application;
  //
  //  private static LongAssert assertThatNotOlder(Date date, long ageInMs) {
  //    return assertThat(date.getTime() - new Date().getTime()).isLessThan(ageInMs);
  //  }

  @Before
  public void before() {
    //    application = fakeApplication(new GlobalSettings());
    //    start(application);

    //    clearEvents();
  }

  @After
  public void after() {
    //    stop(application);
  }

  @Test
  public void buildKofs()
    throws InterruptedException {
    //    event(new Date(), new Player("qwe", "asd"), new Player("zxc", "rty"));
    //    event(new Date(), new Player("1qwe", "asd"), new Player("zxc", "rty"));
    //
    //    running(testServer(3333, fakeApplication(new GlobalSettings())), FIREFOX, new Callback<TestBrowser>() {
    //      public void invoke(TestBrowser browser) throws InterruptedException {
    //        browser.goTo("http://localhost:3333") ;
    ////        browser.await();
    //
    //        assertThat(browser.$("body.container-fluid")).hasSize(1);
    //        assertThat(browser.$("table")).hasSize(2);
    //        assertThat(browser.$("table>caption").)..hasSize(2);
    ////        assertThat(browser.$("#title").getTexts().get(0)).isEqualTo("Hello Guest");
    ////        browser.$("a").click();
    ////        assertThat(browser.url()).isEqualTo("http://localhost:3333/Coco");
    ////        assertThat(browser.$("#title", 0).getText()).isEqualTo("Hello Coco");
    //      }
    //    });

    //    assertThat(events()).isNotEmpty();
    //    assertThat(events()).hasSize(1);
    //
    //    for (Event event : events()) {
    //      assertThatNotOlder(event.date(), 50L);
    //      assertThat(event.firstPlayer()).isEqualTo(new Player("first1", "second1"));
    //      assertThat(event.secondPlayer()).isEqualTo(new Player("first2", "second2"));
    //      assertThat(event.history()).isNotEmpty();
    //
    //      for (HistoryRecord record : event.history()) {
    //        assertThatNotOlder(record.date(), 50L);
    //        assertThat(record.organisation()).isEqualTo(MARATHON);
    //        assertThat(record.firstKof()).isGreaterThanOrEqualTo(1);
    //        assertThat(record.firstKof()).isLessThanOrEqualTo(2);
    //        assertThat(record.secondKof()).isGreaterThanOrEqualTo(2);
    //        assertThat(record.secondKof()).isLessThanOrEqualTo(6);
  }
}
