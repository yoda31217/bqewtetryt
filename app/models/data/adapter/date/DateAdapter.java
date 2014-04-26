package models.data.adapter.date;

import org.joda.time.DateTime;

public interface DateAdapter {

  DateTime adapt(String dateText);
}
