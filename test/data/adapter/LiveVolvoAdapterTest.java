package data.adapter;

import data.parser.ParsedEvent;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Date;

import static models.store.EventType.LIVE;
import static models.store.Organisation.VOLVO;
import static models.store.Sport.TENNIS;
import static org.fest.assertions.Assertions.assertThat;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({LiveVolvoAdapter.class, Date.class})
public class LiveVolvoAdapterTest {

  @Test
  public void adapt_checkType() {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.type).isEqualTo(LIVE);
  }

  @Test
  public void adapt_checkDate()
    throws Exception {
    Date eventDate = new Date();
    whenNew(Date.class).withNoArguments().thenReturn(eventDate);

    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.eventDate).isSameAs(eventDate);
  }

  @Test
  public void adapt_checkSport()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.sport).isEqualTo(TENNIS);
  }

  @Test
  public void adapt_checkFirstSideName()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.firstSide).isEqualTo("Florian Mayer");
  }

  @Test
  public void adapt_checkFirstSideNameAccents()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayerč", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.firstSide).isEqualTo("Florian Mayerc");
  }

  @Test
  public void adapt_checkSecondSideName()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.secondSide).isEqualTo("Kristina Mladenovic");
  }

  @Test
  public void adapt_checkSecondSideNameAccents()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovič", null, "3/2", "16/5"));

    assertThat(adaptedEvent.secondSide).isEqualTo("Kristina Mladenovic");
  }

  @Test
  public void adapt_checkFirstKof()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayerč", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.firstKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkSecondKof()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.secondKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkOrganisation()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.organisation).isEqualTo(VOLVO);
  }

  @Test
  public void adapt_checkCode()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayer", "Kristina Mladenovic", null, "3/2", "16/5"));

    assertThat(adaptedEvent.code).isEqualTo("Florian Mayer_Kristina Mladenovic");
  }

  @Test
  public void adapt_checkFirstSideName_flipped()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Kristina Mladenovic", "Florian Mayer", null, "16/5", "3/2"));

    assertThat(adaptedEvent.firstSide).isEqualTo("Florian Mayer");
  }

  @Test
  public void adapt_checkSecondSideName_flipped()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Kristina Mladenovic", "Florian Mayer", null, "16/5", "3/2"));

    assertThat(adaptedEvent.secondSide).isEqualTo("Kristina Mladenovic");
  }

  @Test
  public void adapt_checkFirstKof_flipped()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Florian Mayerč", "Kristina Mladenovic", null, "16/5", "3/2"));

    assertThat(adaptedEvent.firstKof).isEqualTo(1.5);
  }

  @Test
  public void adapt_checkSecondKof_flipped()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Kristina Mladenovic", "Florian Mayer", null, "16/5", "3/2"));

    assertThat(adaptedEvent.secondKof).isEqualTo(3.2);
  }

  @Test
  public void adapt_checkCode_flipped()
    throws Exception {
    LiveVolvoAdapter adapter = new LiveVolvoAdapter();
    AdaptedEvent adaptedEvent = adapter.adapt(new ParsedEvent(null, "Kristina Mladenovic", "Florian Mayer", null, "16/5", "3/2"));

    assertThat(adaptedEvent.code).isEqualTo("Florian Mayer_Kristina Mladenovic");
  }
}