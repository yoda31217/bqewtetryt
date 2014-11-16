package models.event;

import com.codahale.metrics.MetricRegistry;
import models.calc.Calculator;
import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static models.event.EventSport.TENNIS;
import static models.event.EventType.REGULAR;
import static org.fest.assertions.Assertions.assertThat;
import static org.joda.time.DateTimeZone.UTC;
import static org.mockito.Mockito.mock;

@RunWith(Parameterized.class)
public class EventStore_FinderSimilarPlayerNamesTest {

  private DateTime   eventDate;
  private EventStore eventStore;
  private String     originalPlayer;
  private String     similarPlayer;

  public EventStore_FinderSimilarPlayerNamesTest(String originalPlayer, String similarPlayer) {
    this.originalPlayer = originalPlayer;
    this.similarPlayer = similarPlayer;
  }

  @Before
  public void before() throws Exception {
    eventDate = new DateTime(UTC);
    eventStore = new EventStore(mock(Calculator.class), mock(MetricRegistry.class));
  }

  @Parameterized.Parameters
  public static List<String[]> data() {
    List<String[]> data = newArrayList();
    data.add(new String[]{"PlayerOne", "PlayerOne"});
    data.add(new String[]{"lowercase", "LOWERCASE"});
    data.add(new String[]{"withuničode", "withunicode"});
    data.add(new String[]{"abbbbbbbbbbbbbbbbbc", "abc"});
    data.add(new String[]{"йцукенгшщзхъфывапролджэячсмитьбюё", "isukenhssshvivaproldseassmitibue"});
    data.add(new String[]{"chschshyuyayeiaiuieqhwyjzxcf", "sssuaeauekhvissksv"});

    data.add(new String[]{"Гаэль Монфилс", "Гаэль Монфис"});
    data.add(new String[]{"Шарапова Мария", "Мария Шарапова"});
    data.add(new String[]{"Эррани Сара", "Сара Эррани"});
    data.add(new String[]{"Кеи Нишикори", "Кей Нишикори"});
    data.add(new String[]{"Эрнест Гулбис", "Эрнестc Гулбис"});
    data.add(new String[]{"Ромина Опранди", "Опранди Ромина"});
    data.add(new String[]{"Хантухова Даниэла", "Даниэла Хантухова"});
    data.add(new String[]{"Дукла Либерец", "Либерец"});
    data.add(new String[]{"Чешке Будежовице", "Ческе Будеевице"});
    data.add(new String[]{"Сантьго Хиральдо", "Сантьяго Хиральдо"});
    data.add(new String[]{"Гарбин Мугуруза", "Мугуруса-Бланко Гарбин"});
    data.add(new String[]{"Мария-Тереза ​​Торро-Флор", "Торро-Флор Мария-Тереза"});
    data.add(new String[]{"Закса Кендзежин-Козле", "Кендзежин-Козле"});
    data.add(new String[]{"Ястжебски Вегель", "Ястржебски"});
    data.add(new String[]{"Юрген Мельцер", "Ю.Meльцер"});
    data.add(new String[]{"Ф.Фоньини", "Фабио Фоньни"});
    data.add(new String[]{"Стефан Робер", "С. Робер"});
    data.add(new String[]{"Джесс Хута Галунг", "Д. Хута Галунг"});
    data.add(new String[]{"Дрезднер СК", "Дрезден"});
    data.add(new String[]{"Роут Рабен Фильсбибург", "Вильсбибург"});
    data.add(new String[]{"Безье ВБ", "Безье"});
    data.add(new String[]{"Нант", "Нант Воллей"});
    data.add(new String[]{"Лукаш Лацко", "Лукаш Лачко"});
    data.add(new String[]{"Ребекки Нордмекканича Пьяченца", "Пьяченца"});
    data.add(new String[]{"Бусто Арсизио", "Ямамай Бусто Арсицио"});
    data.add(new String[]{"Париж Воллей", "Пари Волей"});
    data.add(new String[]{"Гфко Аяччо Воллей", "Аяччо"});
    data.add(new String[]{"Политехника Варшава Азс", "Политехника Варшава"});
    data.add(new String[]{"АЗС Увм Ольштын", "Ольштын"});
    data.add(new String[]{"Кай Теруэл", "Теруэл"});
    data.add(new String[]{"Уникаха", "Уникаха Арукасур Альмерия"});
    data.add(new String[]{"Питер К", "К. Питер"});
    data.add(new String[]{"Марина Заневска", "M. Заневська"});
    data.add(new String[]{"Сталь Бельско-Бяла", "Бельско-Бяла"});
    data.add(new String[]{"Мушинянка", "Мушинианка Мушина"});
    data.add(new String[]{"Юе-Юе Ху", "Юе-Юе Ху"});
    return data;
  }

  @Test
  public void createOrFindEvent_2eventsWithSimilarPlayers_create1event() {
    Event originalEvent = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList(originalPlayer), newArrayList("SideTwo"));
    Event similarEvent = eventStore.createOrFindEvent(null, REGULAR, TENNIS, eventDate, newArrayList(similarPlayer), newArrayList("SideTwo"));

    assertThat(similarEvent).isSameAs(originalEvent);
  }
}
