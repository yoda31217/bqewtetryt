
name := """betty"""

version := "3.3.0-snapshot"

libraryDependencies ++= Seq(
  "com.codahale.metrics" % "metrics-core" % "3.0.2",
  "com.google.inject" % "guice" % "3.0",
  "org.twitter4j" % "twitter4j-core" % "3.0.5",
  "org.powermock" % "powermock-module-junit4" % "1.5.1",
  "org.powermock" % "powermock-api-mockito" % "1.5.1",
  "org.mockito" % "mockito-all" % "1.9.5",
  "org.jsoup" % "jsoup" % "1.7.3",
  "org.seleniumhq.selenium" % "selenium-java" % "2.32.0",
  "joda-time" % "joda-time" % "2.3",
  "org.webjars" %% "webjars-play" % "2.2.0",
  "org.webjars" % "bootstrap" % "2.3.1")

javaOptions in Test += "-XX:MaxPermSize=1000M"

playJavaSettings
