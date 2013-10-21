import play.Project._

name := """betty"""

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
	"org.powermock" % "powermock-module-junit4" % "1.5.1",
	"org.powermock" % "powermock-api-mockito" % "1.5.1",
	"org.mockito" % "mockito-all" % "1.9.5",
	"net.htmlparser.jericho" % "jericho-html" % "3.3",
	"org.webjars" %% "webjars-play" % "2.2.0",
	"org.webjars" % "bootstrap" % "2.3.1")

playJavaSettings
