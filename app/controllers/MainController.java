package controllers;

import models.calc.Calculation;
import models.event.EventStore;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.main;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static com.google.common.base.Strings.padEnd;
import static com.google.common.collect.Lists.newArrayList;
import static java.util.Collections.sort;
import static models.calc.Calculations.eventsToCalculations;
import static org.joda.time.DateTimeZone.UTC;
import static org.joda.time.DateTimeZone.forID;

public class MainController extends Controller {

  public static final DateTimeFormatter DATE_FORMAT   = DateTimeFormat.forPattern("dd-MM HH:mm").withZone(forID("Europe/Kiev"));
  public static final DecimalFormat     NUMBER_FORMAT = new DecimalFormat("0.000");
  public final EventStore eventStore;

  public MainController(EventStore eventStore) {
    this.eventStore = eventStore;
  }

  public Result getCalculations() {
    List<Calculation> calculations = newArrayList(eventsToCalculations(eventStore.events()));
    sort(calculations, createCalculationComparator());

    List<String> responseLines = buildResponseLines(calculations);

    StringBuilder response = new StringBuilder();
    for (String responseLine : responseLines) {
      response.append(responseLine);
    }

    return ok(response.toString());
  }

  public Result mainPage() {
    return ok(main.render());
  }

  private StringBuilder appendDate(StringBuilder response, Calculation calculation) {
    String formattedDate = DATE_FORMAT.print(calculation.date());
    return response.append(padEnd(formattedDate, 13, ' '));
  }

  private void appendForkKofs(StringBuilder response, Calculation calculation) {
    response.append(padEnd(NUMBER_FORMAT.format(calculation.lowForkKof()), 7, ' '));
    response.append(",");
    response.append(calculation.lowForkKofOrganisation().label);
    response.append(",");
    response.append(padEnd(new Duration(calculation.lowForkKofDate(), new DateTime(UTC)).getStandardSeconds() + "", 5, ' '));
    response.append("/");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.highForkKof()), 7, ' '));
    response.append(",");
    response.append(calculation.highForkKofOrganisation().label);
    response.append(",");
    response.append(padEnd(new Duration(calculation.highForkKofDate(), new DateTime(UTC)).getStandardSeconds() + "", 5, ' '));
    response.append("  ");
  }

  private void appendHighProfitInfo(StringBuilder response, Calculation calculation) {
    response.append(NUMBER_FORMAT.format(calculation.highProfitMoney1()));
    response.append("+");
    response.append(NUMBER_FORMAT.format(calculation.highProfitMoney2()));
    response.append("=");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.highProfit()), 7, ' '));
    response.append("  ");
  }

  private void appendIsForkOrOrganisationsCount(StringBuilder response, Calculation calculation) {
    String forkChar = calculation.isFork() ? "+" : String.valueOf(calculation.organisationsCountInHistory());
    response.append(forkChar).append("  ");
  }

  private void appendLowProfitInfo(StringBuilder response, Calculation calculation) {
    response.append(NUMBER_FORMAT.format(calculation.lowProfitMoney1()));
    response.append("+");
    response.append(NUMBER_FORMAT.format(calculation.lowProfitMoney2()));
    response.append("=");
    response.append(padEnd(NUMBER_FORMAT.format(calculation.lowProfit()), 7, ' '));
  }

  private StringBuilder appendSides(StringBuilder response, Calculation calculation) {
    String sidesText = calculation.side1() + " - " + calculation.side2();
    return response.append(padEnd(sidesText, 125, ' '));
  }

  private StringBuilder appendSport(StringBuilder response, Calculation calculation) {
    return response.append(calculation.sport().label).append("  ");
  }

  private void appendType(StringBuilder response, Calculation calculation) {
    response.append(calculation.type().label).append("  ");
  }

  private List<String> buildResponseLines(List<Calculation> calculations) {
    List<String> responseLines = new ArrayList<String>(100);

    for (Calculation calculation : calculations) {

      StringBuilder responseLine = new StringBuilder();
      appendIsForkOrOrganisationsCount(responseLine, calculation);
      appendType(responseLine, calculation);
      appendSport(responseLine, calculation);
      appendDate(responseLine, calculation);
      appendSides(responseLine, calculation);
      appendForkKofs(responseLine, calculation);
      appendHighProfitInfo(responseLine, calculation);
      appendLowProfitInfo(responseLine, calculation);
      responseLine.append("\n");

      responseLines.add(responseLine.toString());
    }
    return responseLines;
  }

  private Comparator<Calculation> createCalculationComparator() {
    return new Comparator<Calculation>() {
      @Override
      public int compare(Calculation calc1, Calculation calc2) {
        if (calc1.isFork() != calc2.isFork()) return calc1.isFork() ? -1 : +1;

        if (calc1.organisationsCountInHistory() != calc2.organisationsCountInHistory())
          return calc2.organisationsCountInHistory() - calc1.organisationsCountInHistory();

        if (null != calc1.date() && null != calc2.date()) if (!calc1.date().equals(calc2.date())) return calc1.date().compareTo(calc2.date());

        if (!calc1.type().equals(calc2.type())) return calc1.type().compareTo(calc2.type());

        if (!calc1.sport().equals(calc2.sport())) return calc1.sport().compareTo(calc2.sport());

        return 0;
      }
    };
  }
}
