package models.web_driver;

public class WebDriverKeeper {

  public static void initWebDriverEnv() {
    System.setProperty("webdriver.chrome.driver", "/Users/yoda31217/projects/niknik/betty/conf/chromedriver");
  }
}