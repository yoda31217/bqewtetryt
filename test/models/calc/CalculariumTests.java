package models.calc;

import static models.calc.Calcularium.setCalcularium;
import static org.mockito.Mockito.mock;

public class CalculariumTests {

  public static Calcularium mockCalcularium() {
    Calcularium calculariumMock = mock(Calcularium.class);
    setCalcularium(calculariumMock);
    return calculariumMock;
  }

  public static Calcularium resetCalcularium() {
    Calcularium newCalcularium = new Calcularium();
    setCalcularium(newCalcularium);
    return newCalcularium;
  }
}