package controllers;

import models.calc.Calculation;
import models.event.EventStore;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.main;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.google.common.base.Strings.padEnd;
import static java.util.Collections.sort;
import static models.calc.Calculations.eventsToCalculations;
import static models.util.Dates.toSecsFromNow;
import static play.Logger.of;

public class Application extends Controller {

  public static final  SimpleDateFormat DATE_FORMAT   = new SimpleDateFormat("dd-MM hh:mm");
  public static final  DecimalFormat    NUMBER_FORMAT = new DecimalFormat("0.000");
  public static final  EventStore       INSTANCE      = new EventStore();
  private static final Logger.ALogger   LOG           = of(Application.class);

  private Application() {
    throw new UnsupportedOperationException();
  }

  public static Result getCalculations() {
    Set<Calculation> calculations = eventsToCalculations(INSTANCE.events());

    //    LOG.trace("API: getCalculations: {}", calculations.size());

    List<String> responseLines = buildResponseLines(calculations);
    sort(responseLines);

    StringBuilder response = new StringBuilder();
    for (String responseLine : responseLines) {
      response.append(responseLine);
    }

    return ok(response.toString());
  }

  public static Result mainPage() {
    LOG.trace("API: mainPage");
    return ok(main.render());
  }

  private static StringBuilder appendCode(StringBuilder response, Calculation calculation) {
    String code = calculation.code();
    return response.append(padEnd(code, 50, ' '));
  }

  private static StringBuilder appendDate(StringBuilder response, Calculation calculation) {
    String formattedDate = DATE_FORMAT.format(calculation.date());
    return response.append(padEnd(formattedDate, 13, ' '));
  }

  private static void appendForkKofs(StringBuilder response, Calculation calculation) {
    response.append(padEnd(NUMBER_FORMAT.format(calculation.lowForkKof()), 7, ' '));
    response.append(",");
    response.append(calculation.lowForkKofOrganisation().label);
    response.append(",");
    response.append(padEnd(toSecsFromNow(calculation.lowForkKofDate()) + "", 5, ' '));
    response.append("/");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.highForkKof()), 7, ' '));
    response.append(",");
    response.append(calculation.highForkKofOrganisation().label);
    response.append(",");
    response.append(padEnd(toSecsFromNow(calculation.highForkKofDate()) + "", 5, ' '));
    response.append("  ");
  }

  private static void appendHighProfitInfo(StringBuilder response, Calculation calculation) {
    response.append(NUMBER_FORMAT.format(calculation.highProfitMoney1()));
    response.append("+");
    response.append(NUMBER_FORMAT.format(calculation.highProfitMoney2()));
    response.append("=");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.highProfit()), 7, ' '));
    response.append("  ");
  }

  private static void appendIsFork(StringBuilder response, Calculation calculation) {
    String forkChar = calculation.isFork() ? "+" : "-";
    response.append(forkChar).append("  ");
  }

  private static void appendLowProfitInfo(StringBuilder response, Calculation calculation) {
    response.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1()));
    response.append("+");
    response.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2()));
    response.append("=");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.lowProfit()), 7, ' '));
  }

  private static StringBuilder appendSides(StringBuilder response, Calculation calculation) {
    String sidesText = calculation.side1() + " - " + calculation.side2();
    return response.append(padEnd(sidesText, 85, ' '));
  }

  private static StringBuilder appendSport(StringBuilder response, Calculation calculation) {
    return response.append(calculation.sport().label + "  ");
  }

  private static void appendType(StringBuilder response, Calculation calculation) {
    response.append(calculation.type().label + "  ");
  }

  private static List<String> buildResponseLines(Set<Calculation> calculations) {
    List<String> responseLines = new ArrayList<String>(100);

    for (Calculation calculation : calculations) {

      StringBuilder responseLine = new StringBuilder();
      appendIsFork(responseLine, calculation);
      appendType(responseLine, calculation);
      appendSport(responseLine, calculation);
      appendDate(responseLine, calculation);
      appendCode(responseLine, calculation);
      appendSides(responseLine, calculation);
      appendForkKofs(responseLine, calculation);
      appendHighProfitInfo(responseLine, calculation);
      appendLowProfitInfo(responseLine, calculation);
      responseLine.append("\n");

      responseLines.add(responseLine.toString());
    }
    return responseLines;
  }
}
