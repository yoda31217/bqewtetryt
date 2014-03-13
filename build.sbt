import play.Project._

name := """betty"""

version := "2.0.0"

libraryDependencies ++= Seq(
  "org.twitter4j" % "twitter4j-core" % "3.0.5",
  "org.powermock" % "powermock-module-junit4" % "1.5.1",
	"org.powermock" % "powermock-api-mockito" % "1.5.1",
	"org.mockito" % "mockito-all" % "1.9.5",
	"net.htmlparser.jericho" % "jericho-html" % "3.3",
	"org.seleniumhq.selenium" % "selenium-java" % "2.32.0",
	"org.webjars" %% "webjars-play" % "2.2.0",
	"org.webjars" % "bootstrap" % "2.3.1")

javaOptions in (Test) += "-XX:MaxPermSize=1000M"

playJavaSettings
