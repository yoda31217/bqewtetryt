package data.side;

import org.junit.Before;
import org.junit.Test;

import static models.store.Sport.BASKETBALL;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.fest.assertions.Fail.fail;

public class VolvoSideCoderTest {

  private VolvoSideCoder coder;

  @Before
  public void before()
    throws Exception {
    coder = new VolvoSideCoder();
  }

  @Test
  public void buildCode_basketballSport_returnUnchanged()
    throws Exception {
    String code = coder.buildCode("Side of Unknown Sport", BASKETBALL);
    assertThat(code).isEqualTo("Side of Unknown Sport");
  }

  @Test
  public void buildCode_tennisSideWithAccents_transformedToEng()
    throws Exception {
    String code = coder.buildCode("firstword withuničode", TENNIS);
    assertThat(code).isEqualTo("withunicode");
  }

  @Test
  public void buildCode_onePlayerTennisSide_returnLastWord()
    throws Exception {
    String code = coder.buildCode("firstword lastword", TENNIS);
    assertThat(code).isEqualTo("lastword");
  }

  @Test
  public void buildCode_upperCaseTennisSide_returnInLower()
    throws Exception {
    String code = coder.buildCode("firstword UPPERCASEWORD", TENNIS);
    assertThat(code).isEqualTo("uppercaseword");
  }

  @Test
  public void buildCode_oneWordTennisSide_returnThisWord()
    throws Exception {
    String code = coder.buildCode("firstword", TENNIS);
    assertThat(code).isEqualTo("firstword");
  }

  @Test
  public void buildCode_tennisSideWithOnlyDigits_throwsArgEx()
    throws Exception {
    try {
      coder.buildCode("123", TENNIS);
      fail();

    } catch (IllegalArgumentException e) {
      assertThat(e).hasMessage("Failed to build code for side: 123");
    }
  }

  @Test
  public void buildCode_tennisSideWithOneChar_returnOneCharCode()
    throws Exception {
    String code = coder.buildCode("f s", TENNIS);
    assertThat(code).isEqualTo("s");
  }

  @Test
  public void buildCode_twoPlayersTennisSide_returnLastWordsWithComa()
    throws Exception {
    String code = coder.buildCode("firstword secondword / thidrword fourthword", TENNIS);
    assertThat(code).isEqualTo("secondword,fourthword");
  }

  //  @Test
  //  public void zxc()
  //    throws Exception {
  //    System.setProperty("webdriver.chrome.driver", "/Users/yoda31217/projects/niknik/betty/conf/chromedriver");
  //
  //    ChromeDriver driver = new ChromeDriver();
  //    driver.get("http://google.com");
  //
  //    driver.findElementByTagName("body").sendKeys(Keys.PAGE_UP);
  //
  ////    openNewBrowserTab(driver, "http://ya.ru");
  //  }
  //
  //  private void openNewBrowserTab(ChromeDriver driver, String url) {
  //    String createAnchorElScript = "var anchor=document.createElement('a');anchor.target='_blank';anchor.href='%s';anchor.innerHTML='.';document.body
  // .appendChild(anchor);return anchor";
  //    String removeAnchorElScript = "var a=arguments[0];a.parentNode.removeChild(a);";
  //
  //    WebElement anchorEl = (WebElement) driver.executeScript(format(createAnchorElScript, url));
  //    anchorEl.click();
  //    driver.executeScript(removeAnchorElScript, anchorEl);
  //  }
}