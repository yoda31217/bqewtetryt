(function (a) {
  a.fn.extend({CalendarControl: function () {
    var c = "ALL", d = {weekDayDA: "data-week-day", otherDateDA: "data-other-date", otherDateLabelDA: "data-other-date-label", valueSeparator: ",", valueAttrName: "day", selectItemClassName: "select", valueAllDate: "ALL", autoSubmitForm: false, dateFormat: "dd.MM.yyyy", localization: DatepickerLocalization}, b = {init: function (e) {
      e = a.extend({}, d, e || {});
      return this.each(function () {
        var q = this;
        var n = e.localization.monthsGenitive.split(",");
        var u = a(q).parent("form").get(0);
        if (typeof u === "undefined") {
          e.autoSubmitForm = false;
        }
        var l = a("input[name=" + q.id + "]", u != null
          ? u
          : document).get(0);
        l.getSelectedDates = function () {
          if (l.value != e.valueAllDate && l.value.length > 0) {
            return l.value.split(e.valueSeparator);
          }
          return[];
        };
        l.setSelectedDates = function (i) {
          l.value = i && i.length > 0
            ? i.join(e.valueSeparator)
            : e.valueAllDate;
        };
        var f = a("[" + e.weekDayDA + "]", q), v = f.map(function () {
          var i = a(this).attr(e.valueAttrName);
          return a.dateConverter.parceJavaFormatVal(i, e.dateFormat).valueOf();
        }).get(), x = function () {
          k.call(y);
          f.each(function () {
            w.call(this);
          });
          a(this).addClass(e.selectItemClassName);
          l.setSelectedDates([a(this).attr(e.valueAttrName)]);
        }, w = function () {
          if (a(this).hasClass(e.selectItemClassName)) {
            a(this).removeClass(e.selectItemClassName);
          }
        };
        f.click(function () {
          if (a(q).hasClass("disabled")) {
            return false;
          }
          x.call(this);
          if (e.autoSubmitForm) {
            a(u).submit();
          }
          return false;
        });
        var o = a("[" + e.otherDateDA + "]", q), m = a("img", o), y = a("[" + e.otherDateLabelDA + "] a", q), p = function (D, B) {
          f.each(function () {
            w.call(this);
          });
          l.setSelectedDates([D]);
          var i = e.localization.days[B.getDay()], A = n[B.getMonth()], C = B.getFullYear() == g.getFullYear()
            ? ""
            : " " + B.getFullYear() + " ";
          a(this).attr(e.valueAttrName, D).html(B.getDate() + " " + A + C + "<br>" + i);
          a("[" + e.otherDateLabelDA + "]", q).css("display", "");
        }, k = function () {
          a("[" + e.otherDateLabelDA + "]", q).css("display", "none");
        };
        y.click(function () {
          if (!a(q).hasClass("disabled") && e.autoSubmitForm) {
            a(u).submit();
          }
          return false;
        });
        var z = m.data("available-dates");
        if (typeof(z) != "undefined") {
          z = z.length > 0
            ? z.split(e.valueSeparator)
            : [];
          for (var t = 0; t < z.length; t++) {
            z[t] = a.dateConverter.parceJavaFormatVal(z[t], e.dateFormat).valueOf();
          }
        }
        var s = m.data("max-date");
        if (s) {
          s = a.dateConverter.parceJavaFormatVal(s, e.dateFormat).valueOf();
        }
        var h = m.data("min-date");
        if (h) {
          h = a.dateConverter.parceJavaFormatVal(h, e.dateFormat).valueOf();
        }
        var g = new Date();
        var j = {disabled: false, className: "datepickerSpecial"}, r = {disabled: true};
        m.DatePicker({format: "d.m.Y", date: g, current: g, position: "r", eventName: "showDatePicker", locale: e.localization, onChange: function (D, C, i,
                                                                                                                                                    A) {
          if (A == "datepickerViewDays") {
            m.DatePickerHide();
            var B = a.inArray(C.valueOf(), v);
            if (B > -1) {
              x.apply(f.get(B));
            }
            else {
              p.apply(y, [D, C]);
            }
            if (e.autoSubmitForm) {
              a(u).submit();
            }
          }
        }, onRender: function (B) {
          if (z) {
            for (var C = 0; C < z.length; C++) {
              if (z[C] == B.valueOf()) {
                return j;
              }
            }
          }
          else {
            var A = true;
            if (!((s && s < B.valueOf()) || (h && h > B.valueOf()))) {
              return j;
            }
          }
          return r;
        }}).click(function () {
          if (!a(q).hasClass("disabled")) {
            a(this).trigger("showDatePicker");
          }
          return false;
        });
      });
    }, disabled: function (e) {
      return this.each(function () {
        if (e) {
          a(this).addClass("disabled");
        }
        else {
          a(this).removeClass("disabled");
        }
        a("input[name=" + this.id + "]").prop("disabled", e
          ? "disabled"
          : null);
      });
    }};
    return function (e) {
      if (b[e]) {
        return b[e].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      else {
        if (typeof e === "object" || !e) {
          return b.init.apply(this, arguments);
        }
        else {
          a.error("method: " + e + "  does not exist");
        }
      }
    };
  }()});
  getCalendarControlHelper = function () {
    return{};
  };
})(jQuery);