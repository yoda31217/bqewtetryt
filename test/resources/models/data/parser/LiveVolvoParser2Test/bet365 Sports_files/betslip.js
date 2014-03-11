function BetSlipKeyPadController(n, t, i, r, u, f, e, o, s) {
  var h, l;
  this._bsController = s;
  this._jqOwner = $(n);
  this._scrollerId = t;
  this._jqTarget = null;
  h = null;
  this._kpCurs = $(".kpCursor", this._jqOwner);
  var v = $.proxy(r, i), y = $.proxy(u, i), a = $.proxy(f, i), c = null;
  this._isItalianDomain = window.location.host.split(".").pop() == "it";
  typeof e != "undefined"
    ? c = $.proxy(e, i)
    : ($(document.getElementById("maxBet")).addClass("hidden").prop("disabled", "true"), $(document.getElementById("keys")).addClass("no-bet-max"));
  l = this;
  this._defaultOffsetProvider = function () {
    return{cursorVerticalOffset: 0, cursorHorizontalOffset: 2, keyPadVerticalOffset: 9, keyPadHorizontalOffset: 0}
  };
  this._offsetProvider = null;
  this._offsetProvider = typeof o != "undefined"
    ? $.proxy(o, i)
    : l._defaultOffsetProvider;
  this.BindKeyPadEvents();
  $(document.body).click(function () {
    l._hideKeyPad()
  });
  this._setBetMaxState = function () {
    this._jqTarget.attr("data-nbm") != undefined || c == null
      ? ($(document.getElementById("maxBet")).addClass("hidden").prop("disabled", "true"), $(document.getElementById("keys")).addClass("no-bet-max"))
      : ($(document.getElementById("maxBet")).removeClass("hidden").removeProp("disabled"), $(document.getElementById("keys")).removeClass("no-bet-max"))
  };
  this._resizeContainer = function (n, t, i, r) {
    var u = n + t * 2 - i;
    u > 0 && !r && (this._jqOwner.data("data-kpmh", this._jqOwner.css("min-height")), this._jqOwner.css("min-height", String(i + u) + "px"))
  };
  this._positionKeyPad = function (n, t) {
    var u = $(document.getElementById("keyPad")), tt = u.attr("data-item-key"), l, p, w, b, k;
    if (tt != t && (typeof a == "undefined" || a(n))) {
      this._hideKeyPad();
      h = n;
      this._jqTarget = $(h, this._jqOwner);
      this._setBetMaxState();
      var f = $(this._scrollerId), d = {wrapperW: this._jqOwner.outerWidth(!0), wrapperH: this._jqOwner.outerHeight(!0)}, i = {y: f.scrollTop(), wrapperW: f.outerWidth(!0), wrapperH: f.outerHeight(!0)}, e = this._jqTarget.position();
      this._positionCursor(f);
      this._setNumericKeysOnOff();
      var g = e.top + i.y, o = g + this._jqTarget.outerHeight(), v = o +
        u.height(), y = u.outerWidth(), s = !1, nt = this._offsetProvider(this._bsController), r = e.left -
        (e.left + y / 2 - (e.left + $(n).outerWidth() / 2)) + nt.keyPadHorizontalOffset, c = nt.keyPadVerticalOffset;
      r + y > i.wrapperW && (r = r - (r + y - i.wrapperW) - 5);
      l = !1;
      p = i.wrapperH;
      i.wrapperH + i.y <= v && (w = e.top - u.height() + i.y, w < 0
        ? l = !0
        : (s = !0, c = c * -1, o = w));
      d.wrapperH <= v && !l && (p = d.wrapperH, l = !0);
      r < 0 && (r = 0);
      this._jqTarget.addClass("key-pad-active");
      this._kpCurs.show();
      l && this._resizeContainer(v, c, p, s);
      b = $(document.getElementById("streamContainer"));
      k = b.is(":visible");
      k && o + c < b.outerHeight() && (o = g + $(n).height() + 18, s = !1);
      u.attr("data-item-key", t).css({top: o + c + "px", left: r + "px"}).addClass("active" + (s
        ? " above"
        : "")).show();
      !s && k && f.scrollTop(i.y + u.height() + 3)
    }
  };
  this._positionCursor = function (n) {
    var t = this._jqTarget.position(), i = this._offsetProvider(this._bsController), r = t.top + n.scrollTop() +
      (this._jqTarget[0].offsetHeight - this._kpCurs.outerHeight()) / 2 + i.cursorVerticalOffset, u = t.left + i.cursorHorizontalOffset +
      this._jqTarget.width();
    this._kpCurs.css({top: r + "px", left: u + "px"})
  };
  this._fixAlignment = function () {
    this._jqTarget.val().endsWith(".")
      ? this._jqTarget.removeClass("dir-rtl")
      : this._jqTarget.addClass("dir-rtl")
  };
  this._hideKeyPad = function () {
    var n = $(document.getElementById("keyPad"));
    n.hasClass("active") && (this._kpCurs.hide(), n.removeClass("active above").hide().attr("data-item-key", ""), this._jqOwner.data("data-kpmh") &&
      (this._jqOwner.css("min-height", this._jqOwner.data("data-kpmh")), this._jqOwner.removeData("data-kpmh")), h != null &&
      (this._jqTarget.removeClass("key-pad-active dir-rtl"), h = null), $(document).trigger("resizelayout", [!1, null, !0]))
  };
  this._setNumericKeysOnOff = function () {
    var n = $(document.getElementById("keyPad")).find("span"), t = this._jqTarget.val(), i = t.indexOf("."), r = i > -1, u = r && t.length - i == 3;
    u
      ? n.filter(".num").find("a").addClass("disabled")
      : r
      ? (n.filter(":not(.decimalpoint)").find("a").removeClass("disabled"), n.filter(".decimalpoint").find("a").addClass("disabled"))
      : n.find("a").removeClass("disabled");
    this._disableDecimalPoint()
  };
  this._disableDecimalPoint = function () {
    var n, t, i, u, r;
    this._isItalianDomain &&
    (n = this._jqTarget[0].attributes["data-inp-type"], t = this._jqTarget[0].attributes["data-system"], i = this._jqTarget.val(), u = this._bsController._bsInst.getSlipType() ==
      this._bsController._bsInst.slipBanker, (typeof n == "undefined" || n.value !== "mltstk" ||
      typeof t != "undefined" && n.value === "mltstk" && t.value == "true" || u) &&
      (r = i.indexOf("."), r > 0 && this._jqTarget.val(i.substring(0, r)), $(document.getElementById("keyPad")).find("span.decimalpoint a",
        this._jqOwner).addClass("disabled")))
  };
  this._handleBackSpace = function () {
    var t = "", n = this._jqTarget.val();
    t = h.selectionStart != h.selectionEnd
      ? n.slice(0, h.selectionStart) + n.slice(h.selectionEnd, n.length)
      : n.substring(0, n.length - 1);
    this._jqTarget.val(t)
  };
  this._handleNumericKey = function (n) {
    var t = "", r = $(h), i;
    h.selectionStart != h.selectionEnd
      ? (i = r.val(), t = i.slice(0, h.selectionStart) + n.text() + i.slice(h.selectionEnd, i.length))
      : t = r.val() + n.text();
    t == "." && (t = "0.");
    r.val(t)
  };
  this._handleKeyPress = function (n) {
    (n = $(n), n.hasClass("disabled")) || (n.text() === "x"
      ? this._handleBackSpace()
      : n.hasClass("done") || n.hasClass("maxbet")
      ? (this._hideKeyPad(), n.hasClass("maxbet") && c != null && c(this._jqTarget[0]))
      : this._handleNumericKey(n), n.hasClass("done") || (y(h), this._fixAlignment(), this._setNumericKeysOnOff()))
  };
  this._showKeyPad = function (n) {
    this._positionKeyPad(n, v(n))
  };
  this._initKeyPad = function () {
    this._hideKeyPad();
    var n = this, t = function (t) {
      t.stopPropagation();
      n._showKeyPad(this)
    };
    $("input:text", this._jqOwner).attr("readonly", "readonly");
    this._jqOwner.on("click", "input:text", t)
  }
}
function BetSlipDelegates(n) {
  this._bsContext = n
}
function BetSlipController(n, t) {
  var i = this;
  this._bsInst = n;
  this._dlg = null;
  this._bsContext = t;
  this._delegates = new BetSlipDelegates(t);
  this._instanceEventAttacher = new b365.Ui.Betslip.InstanceEventAttacher(this._bsInst, i);
  i._instanceEventAttacher.attach();
  new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle();
  this._suspendSelections = function () {
    $(".bsSusp").parents(".bs-item-container").addClass("bsSusp").find(".bsSusp").removeClass("bsSusp")
  }
}
(function (n) {
  n.fn.disableElement = function () {
    return this.each(function () {
      n(this).attr("_disabled") === undefined && n(this).attr("_disabled", n(this).prop("disabled")
        ? n(this).prop("disabled")
        : "false");
      n(this).prop("href") && (n(this).attr("_href", n(this).prop("href")), n(this).removeProp("href"));
      n(this).prop("disabled") || n(this).attr("_tab") || (n(this).attr("_tab", n(this).prop("tabIndex")), n(this).prop("tabIndex", "-1"));
      n(this).prop("disabled", !0).addClass("disabled")
    })
  };
  n.fn.enableElement = function () {
    return this.each(function () {
      if (n(this).removeProp("disabled").removeAttr("disabled").removeAttr("_disabled").removeClass("disabled"), n(this).attr("_href")) {
        var t = n(this).html();
        n(this).prop("href", n(this).attr("_href"));
        n(this).removeAttr("_href");
        n(this).html(t)
      }
      n(this).attr("_tab") && (n(this).prop("tabIndex", n(this).attr("_tab")), n(this).removeAttr("_tab"))
    })
  }
})(jQuery), function (n) {
  n.fn.increments = function (t, i, r, u) {
    var e = {callback: r !== "undefined"
      ? r
      : function () {
    }}, o = t, s = i, f = [], h = u !== "undefined"
      ? u
      : "number";
    return this.each(function () {
      var t = n(this), i, r, u;
      if (!(t.next(".plusIcon").length > 0)) {
        i = t.clone(!0).attr("type", h);
        t.replaceWith(i);
        t = i;
        r = n("<input type='button' class='plusIcon'>").fastClick(function () {
          t.val(c(t.val(), 1, t.attr("data-inp-type"), t.attr("data-system")));
          e.callback(t.get(0))
        });
        u = n("<input type='button' class='minusIcon'>").fastClick(function () {
          t.val(c(t.val(), -1, t.attr("data-inp-type"), t.attr("data-system")));
          e.callback(t.get(0))
        });
        t.before(u);
        t.after(r);
        var c = function (n, t, i, r) {
          return n = n == ""
            ? 0
            : n, n == 0 && t == -1 || (n = a(n, t, i, r)), n
        }, a = function (n, t, i, r) {
          var c, v;
          f.length == 0 && (f = o.split("#"));
          f = i == "mltstk" && r == "false"
            ? s.split("#")
            : o.split("#");
          var e = f[0].split("*"), u = e[1], h = e[0].split("-")[0] == 0
            ? 0
            : u, y = [], p = 0, a = 0;
          for (c = 0; c < f.length; ++c)if (e = f[c].split("*"), y = e[0].split("-"), p = e[1], a = y[0], t == 1 && parseFloat(n) >= parseFloat(a) ||
            t == -1 && parseFloat(n) > parseFloat(a))u = p * parseFloat(t);
          else break;
          return h = isNaN(h)
            ? 0
            : h, u = isNaN(u) || parseFloat(u) == 0
            ? 1
            : u, v = l(n % Math.abs(u)), n = parseFloat(n) - parseFloat(v), v > 0 && t == -1 || (n = n + parseFloat(u)), n = l(n), n < parseFloat(h) &&
            t == -1 && (n = h), n
        }, l = function (n) {
          return Math.round(n * 100) / 100
        }
      }
    })
  }
}(jQuery), function (n, t) {
  function i(n, t, i, r, u, f, e) {
    this._dataUrl = n;
    this._contentXML = "";
    this._dataEvent = t;
    this._errorEvent = i;
    this._arguments = arguments;
    this._timer = null;
    this._timeOut = r;
    this._timeOutEvent = u;
    this._breakCache = f;
    this._reqInstanceId = e
  }

  i.prototype.Load = function (n) {
    r(this);
    n || (n = "GET");
    this._timeOut > 0 && (this._timer = setTimeout(Function.createDelegate(this, this.OnTimeOutAction), this._timeOut));
    this._httpRequest = t.ajax({type: n, url: this._dataUrl, beforeSend: function (n) {
      n.overrideMimeType("text/plain")
    }, complete: Function.createDelegate(this, this.OnData)})
  };
  i.prototype.Post = function (n) {
    r(this);
    this._timeOut > 0 && (this._timer = setTimeout(Function.createDelegate(this, this.OnTimeOutAction), this._timeOut));
    this._httpRequest = t.ajax({type: "POST", url: this._dataUrl, data: n, beforeSend: function (t) {
      t.setRequestHeader("Content-type", "application/x-wwww-form-urlencoded");
      t.setRequestHeader("Content-length", n.length);
      t.setRequestHeader("Connection", "close");
      t.overrideMimeType("text/plain")
    }, complete: Function.createDelegate(this, this.OnData)});
    this.OnData(this._arguments)
  };
  i.prototype.LoadSynchronous = function () {
    r(this);
    this._timeOut > 0 && (this._timer = setTimeout(Function.createDelegate(this, this.OnTimeOutAction), this._timeOut));
    this._httpRequest = t.ajax({type: "POST", url: this._dataUrl, async: !1, beforeSend: function (n) {
      n.overrideMimeType("text/plain")
    }});
    this.OnData(this._arguments);
    return
  };
  i.prototype.OnTimeOutAction = function () {
    this.Abort();
    typeof this._timeOutEvent != "undefined" && this._timeOutEvent != null && this._timeOutEvent(this._reqInstanceId)
  };
  i.prototype.OnData = function () {
    try {
      if (this._httpRequest != null && (this._httpRequest.readyState == 4 || this._httpRequest.readyState == "complete"))if (this._timer &&
        clearTimeout(this._timer), this._httpRequest.status == 200 && this._httpRequest.statusText == "OK") {
        if (typeof this._dataEvent != "undefined" && this._dataEvent != null) {
          var n = this._httpRequest.responseText;
          this._httpRequest.responseText.search(/SERVER_ERROR/) > -1 &&
          (this._arguments[7][this._arguments[7].length] = this._arguments[7][0], this._arguments[7].length++, this._arguments[7][0] = 99, n = this._httpRequest.responseText.replace(/SERVER_ERROR/,
            ""));
          this._dataEvent(n, this._arguments)
        }
      }
      else this._httpRequest.status != 0 && typeof this._errorEvent != "undefined" && this._errorEvent != null &&
        this._errorEvent(this._httpRequest.status, this._httpRequest.statusText, this._reqInstanceId)
    }
    catch (t) {
      typeof this._errorEvent != "undefined" && this._errorEvent != null && this._errorEvent(0, "", this._reqInstanceId)
    }
  };
  i.prototype.Abort = function () {
    this._httpRequest != null && (this._timer && clearTimeout(this._timer), this._httpRequest.onreadystatechange = function () {
    }, this._httpRequest.abort())
  };
  var r = function (n) {
    if (typeof n._breakCache != "undefined" && n._breakCache == !0) {
      var t = +new Date;
      n._dataUrl = n._dataUrl.indexOf("?", 0) == -1
        ? n._dataUrl + "?timestamp=" + t
        : n._dataUrl + "&timestamp=" + t
    }
  };
  n.b365BsAJAX = i
}(window, jQuery);
b365.Ui.BetSlipLib = function () {
  this._alwaysInclude = "*~"
};
b365.Ui.BetSlipLib.prototype = {calcTotalStake: function (n, t) {
  var e = 0, r = 0, u, f;
  for (t = t
    ? t
    : "st", i = 0; i < n.length; i++)r = Number(n[i].getStItem(t)
    ? n[i].getStItem(t)
    : ""), u = n[i].getStItem("ew") == "1", isNaN(r) === !1 && (r = r * 100, f = Number(n[i].getCnItem("bc")
    ? n[i].getCnItem("bc")
    : n[i].getStItem("bc")
    ? n[i].getStItem("bc")
    : "1"), e += f > 1 || u
    ? Number(String(r * (u
    ? 2
    : 1) * f))
    : r);
  return this.pad2DP(String(e / 100))
}, isDuplicate: function (n, t) {
  var r = !1, f = t.getCnItem("pt"), u = function (n, t) {
    return n.getCnItem("spt") === t.getCnItem("spt") && n.getCnItem("cm") === t.getCnItem("cm") && n.getCnItem("ct") === t.getCnItem("ct") &&
      n.getCnItem("f") === t.getCnItem("f") && n.getCnItem("fp") === t.getCnItem("fp")
  };
  for (i = 0; !r && i < n.length; i++)switch (f) {
    case"S":
      r = n[i].getCnItem("pid") === t.getCnItem("pid") && n[i].getCnItem("mid") === t.getCnItem("mid");
      break;
    case"CB":
      r = u(t, n[i]);
      break;
    case"TB":
      switch (t.type) {
        case bs.betTypeToteCast:
        case bs.betTypeUsToteCast:
        case bs.betTypeEToteCast:
        case bs.betTypeToteNonCast:
        case bs.betTypeUsToteNonCast:
        case bs.betTypeEToteNonCast:
          r = u(t, n[i])
      }
      break;
    default:
      n[i].getCnItem("fp") === t.getCnItem("fp") && n[i].getCnItem("f") == t.getCnItem("f") && (r = n[i].getCnItem("Inc") == t.getCnItem("Inc")
        ? !0
        : !1)
  }
  return r
}, getItemOdds: function (n, t) {
  var r, i;
  switch (n) {
    case bs.betTypeCast:
    case bs.itemTypeCast:
      r = t.getStItem;
      break;
    default:
      r = t.getCnItem
  }
  return i = r("BOdds"), i || (i = r("o")), i || (i = ""), i
}, to2DP: function (n, t) {
  var r, i;
  return t = t || ".", r = t === "."
    ? ","
    : ".", n = n.replace(new RegExp("\\" + r, "g"), t), i = n.indexOf(t), i != -1 && n.length - i > 3 && (n = n.substr(0, i + 3)), n
}, pad2DP: function (n, t) {
  var u, i, r;
  return t = t || ".", u = t === "."
    ? ","
    : ".", n = n.replace(new RegExp("\\" + u, "g"), t), n = n.trim(), n === t || n === ""
    ? n = "0" + t + "00"
    : (n = this.to2DP(n, t), i = n.indexOf(t), i == -1
    ? n += t + "00"
    : (r = n.length - (i + 1), r == 0
    ? n += "00"
    : r == 1 && (n += "0"))), n
}, roundDecimal: function (n, t) {
  var u, i, r;
  return t = t || ".", u = t === "."
    ? ","
    : ".", n = n.replace(new RegExp("\\" + u, "g"), t), n = n.trim(), n === t || n === ""
    ? n = "0" + t + "00"
    : (n = this.roundValue(n, t), i = n.indexOf(t), i == -1
    ? n += t + "00"
    : (r = n.length - (i + 1), r == 0
    ? n += "00"
    : r == 1 && (n += "0"))), n
}, roundValue: function (n, t) {
  var s, f, e, i, r, u, o;
  if (t = t || ".", s = t === "."
    ? ","
    : ".", n = n.trim(), f = "0", n != "NaN" && n.indexOf(t) >= 0) {
    if (e = n.split(t), i = e[0], r = e[1], r.trim().length == 0)return n;
    r = r.length > 4
      ? r.substring(0, 3)
      : r;
    u = r.substring(2, 3);
    Number(u) >= 5
      ? (u = r.substring(1, 2), Number(u) == 9
      ? (o = r.substring(0, 1), Number(o) == 9
      ? (i = Number(i) + 1, f = String(i))
      : (u = Number(o) + 1, i = i + t + u, f = String(i)))
      : (u = Number(u) + 1, u = String(r.substring(0, 1)) + String(u), i = i + t + u, f = i))
      : r.length == 1
      ? (i = i + t + r, f = i)
      : (i = i + t + r.substring(0, 2), f = i)
  }
  else f = n === "" || n == "NaN"
    ? ""
    : isNaN(n)
    ? n
    : n;
  return f
}, riskToWin: function (n, t, i, r, u, f) {
  var e = Function.createDelegate(this, f || f == undefined
    ? this.pad2DP
    : this.roundDecimal), o = isNaN(n)
    ? 0
    : n * 1, s = eval(t), h;
  return(u = u || isNaN(s), !u)
    ? r
    ? e(String(o * 2))
    : (h = o * s / 1, e(String(h)))
    : ""
}, winToRisk: function (n, t, i, r) {
  var u = 0;
  if (r)u = Math.round(n * 50) / 100;
  else {
    u = isNaN(n)
      ? 0
      : n / eval(t);
    u = Number(this.roundValue(String(u)));
    for (var f = u * 1, e = 1 + eval(t), o = Math.round(f * (e - 1) * 100) / 100; o < n;)u = u + .01, f = u * 1, e = 1 + eval(t), o = Math.round(f * (e - 1) *
      100) / 100
  }
  return this.roundValue(String(u))
}, isDecimal: function (n) {
  return(n.indexOf(",") !== -1 && (n = n.replace(/,/g, ".")), String(n).trim() === "0." || String(n).trim() === "." || n === "")
    ? !0
    : isNaN(Number(n)) == !0
    ? !1
    : !0
}, getMaxStake: function () {
  return 999999999
}, getMaxToWin: function () {
  var n = $get("bs", $get("bsDiv")), t = 99999999;
  return n && n.getAttribute("data-mtwin") && Number(n.getAttribute("data-mtwin")) > 0 && (t = Number(n.getAttribute("data-mtwin"))), t
}, doBetMax: function (n, t, i, r, u) {
  return lgh.isAuthenticated()
    ? (u.req(bs.reqTypeMaxBet, "key=" + n + "-" + String(t) + "-" + i + "-" + r), !0)
    : !1
}, alwaysShowToolTipItem: function (n) {
  return n.startsWith(this._alwaysInclude)
}, formatAlwaysShowToolTip: function (n) {
  return n.replace(this._alwaysInclude, "")
}, numDecPlcs: function (n) {
  var t = String(n), i = ".";
  return t.indexOf(i) > -1
    ? t.length - t.indexOf(i) - 1
    : 0
}};
$blib = new b365.Ui.BetSlipLib;
b365.Ui.BetDTO = function (n) {
  this.type = n;
  var r = [], t = [], u, f, e, o = function (n, t) {
    u = t.split("#");
    for (f in u)u[f].length > 0 && (e = u[f].split("="), n[e[0]] = e[1])
  };
  this.parse = function (n) {
    var i = n.split("|"), u, f;
    t = [];
    r = [];
    u = r;
    for (f in i)i[f].length > 0 && o(u, i[f]), u = t
  };
  this.toString = function () {
    var r = "", i = "", n;
    r = this.getCn();
    for (n in t)n == "st" && (t[n] = t[n] !== ""
      ? t[n].toString().replace(",", ".")
      : ""), i += n + "=" + t[n] + "#";
    return r + (i === ""
      ? ""
      : "|") + i
  };
  this.getCn = function () {
    var n = "", t;
    for (t in r)n = n + t + "=" + r[t] + "#";
    return n
  };
  this.getCnItem = function (n) {
    return r[n]
  };
  this.setCnItem = function (n, t) {
    r[n] = t
  };
  this.getStItem = function (n) {
    return t[n]
  };
  this.setStItem = function (n, i) {
    t[n] = i
  };
  this.parseCookieString = function (n, t) {
    var r = n.split("||"), f = [], u, i;
    if (n.length > 0)for (u in r)r[u].length > 0 &&
    (i = new b365.Ui.BetDTO(t), i.parse(r[u]), t != bs.betTypeMultiple && (i.setStItem("es", 1), i.setStItem("FO", "False")), Array.add(f, i));
    return f
  };
  this.serialize = function (n) {
    var t = "";
    for (i = 0; i < n.length; i++)t += n[i].toString() + "||";
    return t
  };
  this.getTopic = function () {
    return this.getTopicItem(0)
  };
  this.getOddsOverride = function () {
    return this.getTopicItem(1)
  };
  this.getDecimalPlaces = function () {
    return this.getTopicItem(2)
  };
  this.getTopicItem = function (n) {
    var t = (this.getStItem("TP") || "").split("x");
    return t.length > n
      ? t[n]
      : ""
  }
};
$bto = new b365.Ui.BetDTO;
b365.Ui.BetSlipAPI = function (n) {
  this._events = new Sys.EventHandlerList;
  this._b365BsAJAX = null;
  this._lock = !1;
  this._betSlipCookieKey = n;
  this._betSlipCookieBackup = null;
  this._betItems = [];
  this._betMltItems = [];
  this._betCastItems = [];
  this._clearOnAdd = !1;
  this._pollTime = null;
  this._pollInterval = null;
  this._pollForceStop = !1;
  this._pollReference = null;
  this._pollRequestParams = null;
  this._pollCount = 0;
  this._pollReqType = 0;
  this._betSlipModeBetSlip = 1;
  this._betSlipModeConfirm = 2;
  this._betSlipModeReceipt = 3;
  this._dialogModeConfirmation = 1;
  this._dialogModeDialog = 2;
  this.betTypeAll = -1;
  this.betTypeNormal = 0;
  this.betTypeMultiple = 1;
  this.betTypeLotto = 2;
  this.betTypeCast = 3;
  this.betTypeToteCast = 4;
  this.betTypeToteNonCast = 5;
  this.betTypeToteAll = 6;
  this.betTypeUsToteCast = 7;
  this.betTypeUsToteNonCast = 8;
  this.betTypeUsToteAll = 9;
  this.betTypeParlayTeaser = 10;
  this.betTypeAllAccept = 11;
  this.betTypeEToteCast = 12;
  this.betTypeEToteNonCast = 13;
  this.betTypeTotePot = 14;
  this.betTypeUsTotePot = 15;
  this.betTypeETotePot = 16;
  this.betTypeFrgnToteCast = 17;
  this.betTypeFrgnToteNonCast = 18;
  this.betTypeFrgnTotePot = 19;
  this.betTypeTotePotAus = 20;
  this.betTypeLottoFrame = 21;
  this.reqTypeRefreshSlip = 0;
  this.reqTypeAddItems = 1;
  this.reqTypePlaceBet = 2;
  this.reqTypeRefreshLottoSlip = 3;
  this.reqTypePlaceLottoBet = 4;
  this.reqTypeMaxBet = 5;
  this.reqTypeBetBrk = 7;
  this.reqTypePitcher = 8;
  this.reqTypeRefreshAccept = 9;
  this.reqTypeReferBet = 10;
  this.reqTypePollReferredBet = 11;
  this.reqTypePollDistributedPlaceBet = 12;
  this.reqTypeConfirmBet = 13;
  this.reqTypePollDistributedConfirmBet = 14;
  this.reqTypeConstructAndAddItems = 15;
  this.reqTypeShowRules = 16;
  this.reqTypePhoneBet = 17;
  this.reqTypeLoadMobileLottoBetslip = 18;
  this.reqTypePlaceMobileLottoBet = 19;
  this.reqTypePollTempBetReceipt = 20;
  this.slipStandard = "1";
  this.slipBanker = "2";
  this.slipIF = "3";
  this.slipReverseIF = "4";
  this.slipFixedTeaser = "5";
  this.slipParlayTeaserCard = "6";
  this.slipNumbers = "7";
  this.slipUKTote = "8";
  this.slipUSTote = "9";
  this.slipETote = "10";
  this.slipFinancials = 100;
  this.slipFinancialsblank = 9997;
  this.toteTypeNotTote = "0";
  this.toteTypeUKTote = "1";
  this.toteTypeETote = "2";
  this.toteTypeUSTote = "3";
  this.toteTypeForeignTote = "4";
  this.toteTypeAustralianTote = "5";
  this.itemTypeSingle = "single";
  this.itemTypeToteSingle = "tote-single";
  this.itemTypeCast = "cast";
  this.itemTypeToteCast = "tote-cast";
  this.itemTypeTotePot = "tote-pot";
  this.itemTypeMultiple = "multiple";
  this.itemTypeAll = "all";
  this.betSource = "";
  this.showStreaming = !1;
  this.showFullTextMode = !1;
  this.showFixtureDate = !1;
  this.footerLinks = null;
  this.keyboardType = null;
  this.refreshUserBalance = !0;
  this.isoCode = ""
};
b365.Ui.BetSlipAPI.prototype = {pageLoad: function () {
  var n = this.getHandler("onpageload");
  n && n(this)
}, addBet: function () {
  try {
    var n = this.getHandler("onaddbet");
    if (n && this._lock === !1) {
      try {
        trk && trk.send(null, EnumRegionID.Right, -1, EnumEventsOrPageTypes.Click, EnumPodID.Coupon, -1, arguments[0])
      }
      catch (i) {
      }
      n(this, arguments)
    }
  }
  catch (t) {
    this.displayError(t.message)
  }
}, refresh: function (n, t) {
  try {
    if (this._lock === !1)switch (n) {
      case this.betTypeLottoFrame:
        this.req(this.reqTypeRefreshLottoSlip, t);
        break;
      case this.betTypeLotto:
      case this.betTypeParlayTeaser:
        this.req(this.reqTypeRefreshSlip, t);
        break;
      case this.betTypeAllAccept:
        this.req(this.reqTypeRefreshAccept, t);
        break;
      case this.reqTypePhoneBet:
        this.req(this.reqTypePhoneBet, t);
        break;
      default:
        this.req(this.reqTypeRefreshSlip, t)
    }
  }
  catch (i) {
    this.displayError(i.message)
  }
}, updateState: function () {
  var n = this.getHandler("onupdatestate");
  n && n(this)
}, onPBetError: function () {
  var n = this.getHandler("onpbeterror");
  n && n(this)
}, clearBets: function (n) {
  try {
    this.setValueInBSCookie("", "");
    this._betItems = [];
    this._betMltItems = [];
    this._betCastItems = [];
    n && this.req(this.reqTypeRefreshSlip)
  }
  catch (t) {
    this.displayError(t.message)
  }
}, confirmBets: function () {
  try {
    var n = this.getHandler("onconfirmbet");
    n && this._lock === !1 && n(this)
  }
  catch (t) {
    this.displayError(t.message)
  }
}, placeBets: function () {
  try {
    var n = this.getHandler("onplacebet");
    n && this._lock === !1 && (this.updateState(), n(this))
  }
  catch (t) {
    this.displayError(t.message)
  }
}, referBets: function () {
  try {
    this.resetPoll();
    var n = this.getHandler("onreferbet");
    n && this._lock === !1 && n(this)
  }
  catch (t) {
    this.displayError(t.message)
  }
}, pollBet: function (n, t, i, r, u) {
  this.setPollTimeSettings(i, r);
  this._pollCount < this._pollTime / this._pollInterval && !this._pollForceStop
    ? (this._pollReqType = n, this._pollReference = t, this._pollRequestParams = u, this._pollCount++, this._pollForceStop = !1, setTimeout(Function.createDelegate(this,
    this.execPoll), this._pollInterval * 1e3))
    : this.execPollExpired()
}, execPoll: function () {
  var t, n;
  try {
    t = this.getHandler("onpoll");
    t && this._lock === !1 && (n = [], Array.add(n, this._pollReqType), Array.add(n, this._pollReference), Array.add(n, this._pollRequestParams), t(this, n))
  }
  catch (i) {
    this.resetPoll();
    this.displayError(i.message)
  }
}, execPollExpired: function () {
  var t, n;
  try {
    t = this.getHandler("onpollexpired");
    t && this._lock === !1 && (n = [], Array.add(n, this._pollReqType), Array.add(n, this._pollForceStop), t(this, n))
  }
  catch (i) {
    this.displayError(i.message)
  }
}, pollInProgress: function () {
  return this._pollReference !== null || this._pollRequestParams !== null
}, resetPoll: function () {
  this._pollReqType = 0;
  this._pollReference = null;
  this._pollRequestParams = null;
  this._pollCount = 0;
  this._pollForceStop = !1
}, setPollTimeSettings: function (n, t) {
  n && t && (this._pollTime = n, this._pollInterval = t)
}, deleteItem: function () {
  try {
    var n = this.getHandler("ondeleteitem");
    n && this._lock === !1 && n(this, arguments)
  }
  catch (t) {
    this.displayError(t.message)
  }
}, getBetItems: function (n) {
  switch (n) {
    case this.betTypeCast:
    case this.betTypeToteCast:
    case this.betTypeUsToteCast:
    case this.betTypeTotePot:
    case this.betTypeUsTotePot:
    case this.betTypeEToteCast:
    case this.betTypeETotePot:
    case this.betTypeFrgnToteCast:
    case this.betTypeFrgnTotePot:
    case this.betTypeTotePotAus:
    case this.itemTypeCast:
    case this.itemTypeTotePot:
    case this.itemTypeToteCast:
      return this._betCastItems;
    case this.betTypeMultiple:
    case this.itemTypeMultiple:
      return this._betMltItems;
    case this.betTypeAll:
    case this.itemTypeAll:
      return this._betItems.concat(this._betCastItems).concat(this._betMltItems);
    default:
      return this._betItems
  }
}, getBetItemById: function (n, t) {
  var r, i;
  switch (n) {
    case this.betTypeToteNonCast:
    case this.betTypeEToteNonCast:
    case this.betTypeUsToteNonCast:
    case this.betTypeFrgnToteNonCast:
    case this.betTypeNormal:
    case this.itemTypeSingle:
    case this.itemTypeToteSingle:
      r = this._betItems[t];
      break;
    case this.betTypeCast:
    case this.betTypeToteCast:
    case this.betTypeUsToteCast:
    case this.betTypeTotePot:
    case this.betTypeUsTotePot:
    case this.betTypeEToteCast:
    case this.betTypeETotePot:
    case this.betTypeFrgnToteCast:
    case this.betTypeFrgnTotePot:
    case this.betTypeTotePotAus:
    case this.itemTypeCast:
    case this.itemTypeTotePot:
    case this.itemTypeToteCast:
      r = this._betCastItems[t];
      break;
    case this.betTypeParlayTeaser:
      for (i = 0; i < this._betItems.length; i++)if (this._betItems[i].getCnItem("pm") == String(t)) {
        r = this._betItems[i];
        break
      }
      break;
    default:
      for (i = 0; i < this._betMltItems.length; i++)if (this._betMltItems[i].getCnItem("id") == String(t)) {
        r = this._betMltItems[i];
        break
      }
  }
  return r
}, getBetItemByCn: function (n, t, i) {
  for (var f, u = this.getBetItems(n), r = 0; r < u.length; r++)if (u[r].getCnItem(t) == i) {
    f = u[r];
    break
  }
  return f
}, setBetItems: function (n, t) {
  switch (t) {
    case this.betTypeCast:
    case this.betTypeToteCast:
    case this.betTypeUsToteCast:
    case this.betTypeTotePot:
    case this.betTypeUsTotePot:
    case this.betTypeEToteCast:
    case this.betTypeETotePot:
    case this.betTypeFrgnToteCast:
    case this.betTypeFrgnTotePot:
    case this.betTypeTotePotAus:
      this._betCastItems = n;
      break;
    case this.betTypeMultiple:
      this._betMltItems = n;
      break;
    default:
      this._betItems = n
  }
}, getSlipType: function () {
  return this.getValueFromBSCookie("bt").replace(/\|/g, "")
}, isFull: function () {
  return this._betItems.length + this._betCastItems.length >= 14
    ? !0
    : !1
}, okToAdd: function (n) {
  return this._betItems.length + this._betCastItems.length + n <= 14
    ? !0
    : !1
}, numItems: function (n) {
  return n === undefined && (n = !0), this._betItems.length + this._betCastItems.length + (n === !1
    ? 0
    : this._betMltItems.length)
}, isEmpty: function () {
  return this._betItems.length + this._betCastItems.length + this._betMltItems.length === 0
}, setClearOnAdd: function (n) {
  this._clearOnAdd = n
}, getClearOnAdd: function () {
  return this._clearOnAdd
}, addOnAddBet: function (n) {
  this._events.addHandler("onaddbet", n)
}, addOnReqComplete: function (n) {
  this._events.addHandler("onreqcomplete", n)
}, addOnDeleteItem: function (n) {
  this._events.addHandler("ondeleteitem", n)
}, addOnHandleInProg: function (n) {
  this._events.addHandler("oninprogress", n)
}, addOnContentChangedOnClient: function (n) {
  this._events.addHandler("oncontentchangedclient", n)
}, addOnContentLoaded: function (n) {
  this._events.addHandler("oncontentloaded", n)
}, addOnLock: function (n) {
  this._events.addHandler("onlockunlock", n)
}, addOnPageLoad: function (n) {
  this._events.addHandler("onpageload", n)
}, addOnConfirmBet: function (n) {
  this._events.addHandler("onconfirmbet", n)
}, addOnPlaceBet: function (n) {
  this._events.addHandler("onplacebet", n)
}, addOnReferBet: function (n) {
  this._events.addHandler("onreferbet", n)
}, addOnPoll: function (n) {
  this._events.addHandler("onpoll", n)
}, addOnPollExpired: function (n) {
  this._events.addHandler("onpollexpired", n)
}, addOnRestoreState: function (n) {
  this._events.addHandler("onreststate", n)
}, addOnUpdateState: function (n) {
  this._events.addHandler("onupdatestate", n)
}, addOnPBetError: function (n) {
  this._events.addHandler("onpbeterror", n)
}, addScrollToTop: function (n) {
  this._events.addHandler("onscrolltotop", n)
}, addOnBetAdded: function (n) {
  this._events.addHandler("onbetadded", n)
}, addOnEditBet: function (n) {
  this._events.addHandler("oneditbet", n)
}, addOnBetAddedReqComplete: function (n) {
  this._events.addHandler("onbetaddedreqcomplete", n)
}, addOnRefreshReqComplete: function (n) {
  this._events.addHandler("onrefreshreqcomplete", n)
}, addOnBetSlipItemsChanged: function (n) {
  this._events.addHandler("onbetslipitemschanged", n)
}, addOnAcceptChanges: function (n) {
  this._events.addHandler("onacceptchanges", n)
}, addOnBetSlipLoaded: function (n) {
  this._events.addHandler("onbetsliploaded", n)
}, addOnMaxSelections: function (n) {
  this._events.addHandler("onmaxselections", n)
}, addOnBetslipDisplayed: function (n) {
  this._events.addHandler("onbetslipdisplayed", n)
}, addOnPlaceBetSuccess: function (n) {
  this._events.addHandler("onplacebetsuccess", n)
}, addOnAddBetslipFooterLinks: function (n) {
  this._events.addHandler("onaddbetslipfooterlinks", n)
}, addOnAddReceiptFooterLinks: function (n) {
  this._events.addHandler("onaddreceiptfooterlinks", n)
}, addOnBetslipError: function (n) {
  this._events.addHandler("onbetsliperror", n)
}, addOnShowBetSlip: function (n) {
  this._events.addHandler("onshowbetslip", n)
}, addOnHideBetSlip: function (n) {
  this._events.addHandler("onhidebetslip", n)
}, addOnChangeBetslipHeight: function (n) {
  this._events.addHandler("onchangebetslipheight", n)
}, removeOnBetSlipLoaded: function (n) {
  this._events.removeHandler("onbetsliploaded", n)
}, ScrollToTop: function () {
  var n = this.getHandler("onscrolltotop");
  n && n(this)
}, betAdded: function () {
  var n = this.getHandler("onbetadded");
  n && n(this)
}, betAddedReqComplete: function () {
  var n = this.getHandler("onbetaddedreqcomplete");
  n && n(this)
}, editBet: function () {
  var n = this.getHandler("oneditbet");
  n && n(this)
}, refreshReqComplete: function () {
  var n = this.getHandler("onrefreshreqcomplete");
  n && n(this)
}, betSlipItemsChanged: function () {
  var n = this.getHandler("onbetslipitemschanged");
  n && n(this)
}, acceptChanges: function () {
  var n = this.getHandler("onacceptchanges");
  n && n(this)
}, betSlipLoaded: function () {
  var n = this.getHandler("onbetsliploaded");
  n && n(this)
}, maxSelections: function () {
  var n = this.getHandler("onmaxselections");
  n && n(this)
}, betSlipDisplayed: function () {
  var n = this.getHandler("onbetslipdisplayed");
  n && n(this)
}, placeBetSuccess: function () {
  var n = this.getHandler("onplacebetsuccess");
  n && n(this)
}, addBetslipFooterLinks: function () {
  var n = this.getHandler("onaddbetslipfooterlinks");
  n && n(this)
}, addReceiptFooterLinks: function () {
  var n = this.getHandler("onaddreceiptfooterlinks");
  n && n(this)
}, betslipError: function () {
  var n = this.getHandler("onbetsliperror");
  n && n(this)
}, showBetSlip: function () {
  var n = this.getHandler("onshowbetslip");
  n && n(this)
}, hideBetSlip: function () {
  var n = this.getHandler("onhidebetslip");
  n && n(this)
}, changeBetslipHeight: function () {
  var n = this.getHandler("onchangebetslipheight");
  n && n(this)
}, restoreState: function () {
  var n = this.getHandler("onreststate");
  n && n(this)
}, lock: function () {
  this._lock = !0;
  this.lockEvent()
}, unlock: function () {
  this._lock = !1;
  this.lockEvent()
}, locked: function () {
  return this._lock
}, lockEvent: function () {
  var n = this.getHandler("onlockunlock");
  n && n(this, this._lock)
}, req: function (n, t, i) {
  var r = !0, f;
  if (i = i && i != ""
    ? i
    : ".betslipWrapper>ul", this._lock === !1) {
    this.lock();
    this._b365BsAJAX !== null && (this._b365BsAJAX = null);
    var e = this.betSource.length > 0
      ? "&betsource=" + this.betSource
      : "", o = "&streaming=" + Number(this.showStreaming), s = "&fulltext=" + Number(this.showFullTextMode), h = "&refreshbal=" +
      Number(this.refreshUserBalance), c = "&isocode=" + this.isoCode, l = "&qb=" + (typeof this.isQuickBet == "undefined"
      ? 0
      : Number(this.isQuickBet())), u = "";
    (n == this.reqTypePlaceBet || n == this.reqTypePlaceMobileLottoBet) && (u += "&betguid=" + $(i).attr("data-betguid"));
    f = "../betslip/?op=" + n + "&ck=" + this._betSlipCookieKey + (t && t.length > 0
      ? "&" + t
      : "") + e + o + s + u + h + c + l;
    this._ajaxInstId = (new Date).getTime();
    this._b365BsAJAX = new b365BsAJAX(f, Function.createDelegate(this, this.reqComplete), Function.createDelegate(this, this.reqError), 3e4,
      Function.createDelegate(this, this.reqTimeout), !0, this._ajaxInstId, arguments);
    this.handleInProg("show");
    this._b365BsAJAX.Load("POST")
  }
  else r = !1;
  return r
}, reqComplete: function () {
  this.unlock();
  delete this._b365BsAJAX;
  this._b365BsAJAX = null;
  this.restoreState();
  var n = this.getHandler("onreqcomplete");
  n
    ? n(this, arguments)
    : this.handleInProg("hide", "")
}, reqTimeout: function (n) {
  this.displayError(betSlipML.timeout, n)
}, reqError: function (n, t, i) {
  this.displayError(betSlipML.error, i, "error")
}, displayError: function (n, t, i) {
  this._ajaxInstId == t && (this.setClearOnAdd(!1), this.resetPoll(), this.unlock(), this.handleInProg("hide", n, typeof i != "undefined"
    ? i
    : "alert"), this._b365BsAJAX = null)
}, handleInProg: function (n, t, i) {
  var u = this.getHandler("oninprogress"), r = -1;
  this._b365BsAJAX && this._b365BsAJAX._arguments.length > 7 && (r = this._b365BsAJAX._arguments[7][0]);
  ((r == this.reqTypePlaceBet || r == this.reqTypeConfirmBet) && t || t == betSlipML.pleasecheckmembers) &&
  (t = betSlipML.pleasecheckmembers, this.onPBetError());
  u && u(this, [n, t, r, typeof i != "undefined"
    ? i
    : "alert"])
}, contentChangedOnClient: function () {
  var n = this.getHandler("oncontentchangedclient");
  n && n(this)
}, contentLoaded: function () {
  var n = this.getHandler("oncontentloaded");
  n && n(this)
}, getHandler: function (n) {
  return this._events.getHandler(n)
}, setValueInBSCookie: function (n, t) {
  $bSys.setValueInCookie(this._betSlipCookieKey, n, t, !0)
}, getValueFromBSCookie: function (n, t) {
  return $bSys.getValueFromCookie(this._betSlipCookieKey, n, t)
}, readBSCookieValue: function (n) {
  return $bSys.readCookie(n)
}, backupBSCookieValue: function (n) {
  this._betSlipCookieBackup = this.readBSCookieValue(n)
}, restoreBSCookieValue: function (n, t) {
  $bSys.setCookieValue(n, t)
}};
var bs = new b365.Ui.BetSlipAPI("bs");
Sys.Application.add_load(Function.createDelegate(bs, bs.pageLoad));
BetSlipKeyPadController.prototype.init = function () {
  this._initKeyPad()
};
BetSlipKeyPadController.prototype.BindKeyPadEvents = function () {
  var n = this;
  $(document.getElementById("keyPad")).find("a").fastClick(function (t) {
    t.preventDefault();
    n._handleKeyPress(this)
  })
};
BetSlipKeyPadController.prototype.detach = function () {
  this._jqOwner.off("click", "input:text")
};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.KeyPadOffSetProvider = function (n) {
  return n._delegates.isPortraitMode() && n._delegates.isPrematch()
    ? {cursorVerticalOffset: -5, cursorHorizontalOffset: -5, keyPadVerticalOffset: 8, keyPadHorizontalOffset: -15}
    : {cursorVerticalOffset: 0, cursorHorizontalOffset: 2, keyPadVerticalOffset: 9, keyPadHorizontalOffset: 0}
};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.StakeEntryKeyboard = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._validTarget = function (n) {
    return n.target.tagName == "INPUT" && (n.target.type == "text" || n.target.type == "number" || n.target.type == "tel")
  };
  this._isItalianDomain = window.location.host.split(".").pop() == "it"
};
b365.Ui.Betslip.StakeEntryKeyboard.prototype = {init: function () {
  if (this._isValid()) {
    var n = this;
    if (navigator.userAgent.toLowerCase().indexOf("blackberry") >= 0 && navigator.userAgent.toLowerCase().indexOf("webkit") >= 0 ||
      navigator.userAgent.toLowerCase().search("(bb)([1-9][0-9]).*(mobile)") > -1)$(".betslipWrapper").off("keydown").on("keydown", function (t) {
      var i, r;
      n._validTarget(t) && (i = t.target.value, i = i.replace(",", "."), i = i.replace("..", "."), i &&
        (r = new b365.Ui.Formatter, $blib.isDecimal(i) && (t.target.value = r.roundValue(i))), window.setTimeout(function () {
        new b365.Ui.Betslip.StakeChangedHandler(n._bsInst).handle(t.target)
      }, 0))
    });
    $(".betslipWrapper").off("keyup").on("keyup", function (t) {
      if (n._validTarget(t)) {
        var i = event.keyCode
          ? event.keyCode
          : event.charCode;
        i == 13 && ((navigator.userAgent.toLowerCase().indexOf("blackberry") >= 0 && navigator.userAgent.toLowerCase().indexOf("webkit") >= 0 ||
          navigator.userAgent.toLowerCase().search("(bb)([1-9][0-9]).*(mobile)") > -1) &&
          $(".betslipWrapper").off("keydown"), document.activeElement.blur(), n._bsInst.placeBets());
        n._isItalianDomain && n._validTarget(t) && (i == 110 || i == 188 || i == 190) && n.roundItalianEntries(t.target, !0)
      }
    });
    $(".betslipWrapper input").on("blur", function (t) {
      var i, r;
      if (navigator.userAgent.toLowerCase().indexOf("blackberry") >= 0 && navigator.userAgent.toLowerCase().indexOf("webkit") >= 0 ||
        navigator.userAgent.toLowerCase().search("(bb)([1-9][0-9]).*(mobile)") > -1) {
        $(".betslipWrapper").off("keydown");
        return
      }
      n._validTarget(t) && (i = t.target.value, i = i.replace(",", "."), i = i.replace("..", "."), i && (r = new b365.Ui.Formatter, $blib.isDecimal(i) &&
        (t.target.value = r.roundValue(i), n.roundItalianEntries(t.target, !1))), new b365.Ui.Betslip.StakeChangedHandler(n._bsInst).handle(t.target))
    })
  }
}, detach: function () {
  this._isValid()
}, roundItalianEntries: function (n, t) {
  var i, r, u, f, e;
  this._isItalianDomain && (i = n.value, i = i.replace(",", "."), i = i.replace("..", "."), r = this._bsInst.getSlipType() == this._bsInst.slipBanker, i &&
    (u = typeof n.attributes["data-inp-type"] != "undefined" && n.attributes["data-inp-type"].value != "mltstk", e = n.className == "stk" &&
      typeof n.attributes.id != "undefined" && n.attributes.id.value == "mltsngstk", f = typeof n.attributes["data-system"] != "undefined" &&
      n.attributes["data-system"].value == "true", (u || e || f || r) && (n.value = Math.floor(Number(i)))), t &&
    new b365.Ui.Betslip.StakeChangedHandler(this._bsInst).handle(n))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.StakeEntryIncrements = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._initialised = !1;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._onBetSlipContentLoaded = function (n) {
    var i = new b365.Ui.Betslip.StakeChangedHandler(n);
    $(".betslipWrapper").addClass("stakeincrements");
    $(".stk").increments($(".betslipWrapper>ul").attr("data-stk-inc"), $(".betslipWrapper>ul").attr("data-stk-mlt-inc"), $.proxy(i.handle, i),
      t._delegates._bsContext.KeyboardType());
    new b365.Ui.Betslip.StakeEntryKeyboard(n).init()
  }
};
b365.Ui.Betslip.StakeEntryIncrements.prototype = {init: function () {
  var n = this;
  n._isValid() && !n._initialised && (n._bsInst.addOnBetSlipLoaded(n._onBetSlipContentLoaded), n._initialised = !0)
}, detach: function () {
  if (this._isValid()) {
    var n = this;
    n._bsInst.removeOnBetSlipLoaded(n._onBetSlipContentLoaded);
    $(".betslipWrapper").removeClass("stakeincrements")
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DisplayFormatter = function () {
  this._isItalianDomain = window.location.host.split(".").pop() == "it"
};
b365.Ui.Betslip.DisplayFormatter.prototype = {format: function () {
  $(".footer .placeBet .isocode").text($(".betslipWrapper>ul:first-child").attr("data-isocode"));
  this._isItalianDomain && $(".stk[data-inp-type=sngstk]").val(function (n, t) {
    var i = Math.floor(t);
    return i == 0
      ? ""
      : i
  })
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ModeResolver = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ModeResolver.prototype = {resolve: function () {
  if (this._isValid()) {
    var n = this, t = n._bsInst._betSlipModeBetSlip;
    return $(".betslipWrapper>ul:first").hasClass("betReceipt") && (t = n._bsInst._betSlipModeReceipt), t
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ItemDeleteExecutor = function (n, t, i, r) {
  this._bsInst = n;
  this._bsController = t;
  this._itemIndex = i;
  this._itemType = r;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._itemIndex != "undefined" && typeof this._itemType != "undefined"
  };
  this._deleteItem = function () {
    var n = this._bsInst.getBetItems(this._itemType), t = n[parseInt(this._itemIndex)];
    return n.splice(parseInt(this._itemIndex),
      1), this._bsInst.updateState(), this._bsInst.betSlipItemsChanged(), $(".betslipWrapper").trigger("b365.Ui.Betslip.deleting", t), t
  }
};
b365.Ui.Betslip.ItemDeleteExecutor.prototype = {execute: function () {
  if (this._isValid() && (!this._bsController.isReqOnBetDeletedEnabled() || !this._bsInst.locked())) {
    var n = this._deleteItem();
    (!this._bsController.isReqOnBetDeletedEnabled() || this._bsInst.req(this._bsInst.reqTypeRefreshSlip)) && this._bsController.itemsRemoved(n.getCnItem("fp"))
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ItemInformation = function (n) {
  this._ele = n;
  this._isValid = function () {
    return typeof this._ele != "undefined"
  };
  this._isValid() &&
  (this._parent = $(this._ele).parents("li[data-item-id]:first"), this._itemType = [this._parent.attr("data-item-id"), this._parent.attr("data-item-type")])
};
b365.Ui.Betslip.ItemInformation.prototype = {itemIndexAndType: function () {
  return this._isValid()
    ? this._itemType
    : null
}, itemIndex: function () {
  return this._isValid()
    ? this._itemType[0]
    : null
}, itemType: function () {
  return this._isValid()
    ? this._itemType[1]
    : null
}, itemElement: function () {
  return $(this._ele).parents("li[data-item-id]:first")
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToggleMultiples = function (n) {
  this._bsInst = n;
  this._showingVal = "1";
  this._showingCSS = "open";
  this._hidingVal = "0";
  this._hidingCSS = "closed";
  this._multiplesStateCookieKey = "mo";
  this._cookieValSeparator = "||";
  this._multiplesHdr = $(".betslipWrapper ul:not(.betReceipt) li.multiple-section ul:first-child");
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._isValid() &&
  (this._isCurrentlyShowing = this._bsInst.getValueFromBSCookie(this._multiplesStateCookieKey).replace(this._cookieValSeparator, "") == this._showingVal);
  this._setTriggerClass = function (n) {
    var t = "show-mrc";
    $(".betslipWrapper .betReceipt").length == 0 && n
      ? $(".betslipWrapper>ul:first-child").addClass(t)
      : $(".betslipWrapper>ul:first-child").removeClass(t)
  }
};
b365.Ui.Betslip.ToggleMultiples.prototype = {toggle: function () {
  this._isValid() && $(".betslipWrapper .betReceipt").length == 0 && (this._isCurrentlyShowing
    ? this._multiplesHdr.removeClass(this._showingCSS).addClass(this._hidingCSS)
    : this._multiplesHdr.removeClass(this._hidingCSS).addClass(this._showingCSS), this._bsInst.setValueInBSCookie(this._multiplesStateCookieKey,
    this._isCurrentlyShowing
      ? this._hidingVal
      : this._showingVal), this._setTriggerClass(!this._isCurrentlyShowing), this._bsInst.changeBetslipHeight(), $(document).trigger("mbsmultopenclose"))
}, reset: function () {
  this._isCurrentlyShowing
    ? this._multiplesHdr.removeClass(this._hidingCSS).addClass(this._showingCSS)
    : this._multiplesHdr.removeClass(this._showingCSS).addClass(this._hidingCSS);
  this._setTriggerClass(this._isCurrentlyShowing)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetslipClickHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.BetslipClickHandler.prototype = {handle: function (n) {
  var o;
  if (typeof n != "undefined" && n) {
    var u = n.target, i = !1, t = $(u);
    if (t.prop("disabled") || t.parents().prop("disabled"))i = !0;
    else {
      this._bsInst._pollReqType === this._bsInst.reqTypePollTempBetReceipt && this._bsInst.resetPoll();
      var e = new b365.Ui.Betslip.ItemInformation(u), r = e.itemIndexAndType(), f = e.itemElement();
      $(f).hasClass("suspended") && !t.hasClass("remove")
        ? i = !0
        : t.hasClass("remove")
        ? (r[1] == "tote-pot-leg"
        ? new b365.Ui.Betslip.TotePotLegDeleteExecutor(this._bsInst, f[0], r[0], r[1]).execute()
        : new b365.Ui.Betslip.ItemDeleteExecutor(this._bsInst, this._bsController, r[0], r[1]).execute(), i = !0)
        : t.hasClass("removeAll")
        ? (new b365.Ui.Betslip.RemoveAllItemsRequestDespatcher(this._bsInst, this._bsController).despatch(u), i = !0)
        : t.attr("data-inp-type") == "ewcb" || t.parent().attr("data-inp-type") == "ewcb"
        ? new b365.Ui.Betslip.EachWayClickHandler(this._bsInst, r[0], r[1], f).handle(n)
        : t.attr("data-inp-type") == "nrcb" || t.parent().attr("data-inp-type") == "nrcb"
        ? new b365.Ui.Betslip.NoReservesClickHandler(this._bsInst, r[0], r[1], f).handle(n)
        : t.hasClass("rctrs")
        ? (new b365.Ui.Betslip.RetainSelectionsRequestDespatcher(this._bsInst).despatch(u), i = !0)
        : t.hasClass("ebet")
        ? (new b365.Ui.Betslip.EditSelectionsRequestDespatcher(this._bsInst).despatch(u), i = !0)
        : t.hasClass("acceptChanges")
        ? (new b365.Ui.Betslip.ItemSubscriptionManager(this._bsInst).unsubscribe(), new b365.Ui.Betslip.AcceptChangesRequestDespatcher(this._bsInst,
        this._bsController).despatch(u), i = !0)
        : t.hasClass("mlthd")
        ? (new b365.Ui.Betslip.ToggleMultiples(this._bsInst).toggle(), i = !0)
        : t.hasClass("placeBet") || t.parent().hasClass("placeBet")
        ? (u = t.hasClass("placeBet")
        ? u
        : t.parent(), new b365.Ui.Betslip.PlaceBetClickHandler(this._bsInst, this._bsController).handle(u), i = !0)
        : t.hasClass("rptStake")
        ? (new b365.Ui.Betslip.RepeatStakeClickHandler(this._bsInst, r[0], r[1], f).handle(n), i = !0)
        : t.hasClass("sngbrk") || t.parents().hasClass("sngbrk")
        ? (new b365.Ui.Betslip.SingleBreakdownRequestDespatcher(this._bsInst).despatch(r[0]), i = !0)
        : t.hasClass("mltbrk") || t.parents().hasClass("mltbrk")
        ? (new b365.Ui.Betslip.MultiBreakdownRequestDespatcher(this._bsInst).despatch(r[0]), i = !0)
        : t.hasClass("cstBrkDwn") || t.parents().hasClass("mltbrk")
        ? (new b365.Ui.Betslip.CastBreakdownRequestDespatcher(this._bsInst).despatch(r[0]), i = !0)
        : t.hasClass("banker") && u.tagName == "A"
        ? (new b365.Ui.Betslip.BankerToggleRequestDespatcher(this._bsInst).despatch(n), i = !0)
        : t.hasClass("sngPD")
        ? (new b365.Ui.Betslip.PitcherDetailsRequestDespatcher(this._bsInst).despatch(n), i = !0)
        : t.attr("id") == "bsjn"
        ? (this._bsController.joinNow(), i = !0)
        : t.hasClass("minusIcon") || t.hasClass("plusIcon")
        ? (new b365.Ui.Betslip.StakeChangedHandler(this._bsInst).handle(t.siblings(".stk").get(0)), i = !0)
        : t.hasClass("watch")
        ? (new b365.Ui.Betslip.OnStreamingClickHandler(this._bsInst, this._bsController).click(t), i = !0)
        : t.hasClass("ausHelp") && (o = {Target: u, Content: t.parent().attr("data-tooltip")}, this._bsController._delegates.showTooltip(o))
    }
    i && n.preventDefault()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetslipChangeHandler = function (n, t) {
  this._bsInst = n;
  this._controller = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._controller != "undefined"
  }
};
b365.Ui.Betslip.BetslipChangeHandler.prototype = {handle: function (n) {
  var i, t;
  if (typeof n != "undefined" && n) {
    if (i = !1, t = $(n.target), t.prop("disabled") || t.parents().prop("disabled") || t.parents().attr("suspended"))i = !0;
    else {
      var u = new b365.Ui.Betslip.ItemInformation(n.target), r = u.itemIndexAndType(), f = u.itemElement();
      t.hasClass("bet-slip-type")
        ? (new b365.Ui.Betslip.BetslipTypeChangeHandler(this._bsInst, this._controller).handle(n.target), i = !0)
        : t.hasClass("mlthd")
        ? (new b365.Ui.Betslip.ToggleMultiples(this._bsInst).toggle(), i = !0)
        : t.hasClass("teaserSel")
        ? (new b365.Ui.Betslip.TeaserChangeHandler(this._bsInst).handle(n), i = !0)
        : t.hasClass("pitcher-sel")
        ? (new b365.Ui.Betslip.PitcherChangeHandler(this._bsInst).handle(n), i = !0)
        : t.hasClass("ifbetaction")
        ? (new b365.Ui.Betslip.IfBetActionChangeHandler(this._bsInst).handle(r[0], n.target), i = !0)
        : t.hasClass("odds")
        ? (new b365.Ui.Betslip.OddsChangeHandler(this._bsInst).handle(n, r[0]), i = !0)
        : t.hasClass("aus-tote") && (new b365.Ui.Betslip.AusToteChangeHandler(this._bsInst).handle(n, r[0], r[1]), i = !0)
    }
    i && n.preventDefault()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetslipTypeChangeHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._clearCasts = function (n) {
    (n == this._bsInst.slipIF || n == this._bsInst.slipReverseIF || n == this._bsInst.slipFixedTeaser || n == this._bsInst.slipBanker) &&
    this._bsInst.setBetItems([], this._bsInst.betTypeCast)
  };
  this._resetStakesAndEW = function (n) {
    var i, t;
    if (n == this._bsInst.slipIF || n == this._bsInst.slipReverseIF || n == this._bsInst.slipBanker || n == this._bsInst.slipFixedTeaser ||
      n == this._bsInst.slipStandard) {
      for (i = this._bsInst.getBetItems(this._bsInst.betTypeNormal), t = 0; t < i.length; t++)i[t].setStItem("ust", "0"), i[t].setStItem("st",
        "0"), i[t].setStItem("tr", "0"), i[t].setStItem("ust", "0"), i[t].setStItem("ac", ""), n != this._bsInst.slipBanker && i[t].setStItem("ew", "0");
      if (n != this._bsInst.slipBanker)for (i = this._bsInst.getBetItems(this._bsInst.betTypeMultiple), t = 0; t < i.length; t++)i[t].setStItem("ew", "0")
    }
  };
  this._setSlipType = function (n) {
    this._bsInst.setValueInBSCookie("bt", n);
    this._clearCasts(n);
    this._resetStakesAndEW(n);
    this._bsInst.updateState();
    this._bsInst.refresh(this.betTypeAll)
  }
};
b365.Ui.Betslip.BetslipTypeChangeHandler.prototype = {handle: function (n) {
  typeof n != "undefined" && n && this._setSlipType(n.value)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PitcherChangeHandler = function (n) {
  this._bsInst = n;
  this._baseBallFixtureParticipantCookieKey = "bbfp";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._updateCustomDropdownAttribute = function (n) {
    $(n).parent(".betslip-select").attr("data-text", $(n).find("option:selected").text())
  }
};
b365.Ui.Betslip.PitcherChangeHandler.prototype = {handle: function (n) {
  var t = n.target, u = new b365.Ui.Betslip.ItemInformation(t), i = u.itemIndexAndType(), r = this._bsInst.getBetItemById(i[1], i[0]);
  r && (r.setStItem(this._baseBallFixtureParticipantCookieKey, t.value), this._updateCustomDropdownAttribute(t), this._bsInst.updateState());
  t.options[0].selected
    ? $(t).parent().next("span").addClass("hidden")
    : $(t).parent().next("span").removeClass("hidden")
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.EachWayClickHandler = function (n, t, i, r) {
  this._bsInst = n;
  this._itemIndex = t;
  this._itemType = i;
  this._itemElement = r;
  this._eachWayCookieKey = "ew";
  this._showLinesLabel = $(".betslipWrapper>ul").attr("data-tcm") == "2";
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._itemIndex != "undefined" && typeof this._itemType != "undefined" &&
      typeof this._itemElement != "undefined"
  };
  this._updateStakeLabel = function (n) {
    this._showLinesLabel || this._itemType == this._bsInst.itemTypeMultiple || this._itemElement.find(".stake>.divLblWrap label").text(n
      ? betSlipML.unitstake
      : betSlipML.stake)
  }
};
b365.Ui.Betslip.EachWayClickHandler.prototype = {handle: function (n) {
  var t, i, r;
  typeof n != "undefined" && n && this._isValid() && (t = n.target, t.tagName !== "INPUT" && (t = $(t).attr("data-inp-type")
    ? $(t).find("input[data-inp-type='ewcb']")[0]
    : $(t).parent().find("input[data-inp-type='ewcb']")[0], t.checked = !t.checked), i = t.checked, r = this._bsInst.getBetItemById(this._itemType,
    this._itemIndex), r && (r.setStItem(this._eachWayCookieKey, i
    ? "1"
    : "0"), this._bsInst.updateState(), this._updateStakeLabel(i), new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate()))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.TotalsCalculator = function (n) {
  this._bsInst = n;
  this._ttTotalsEle = $(".betslipWrapper .totals");
  this._ttStkEle = $(".betslipWrapper .totals .totalStake .total, .betslipWrapper .placeBet .totalStake");
  this._ttTrCntEle = $(".betslipWrapper .totals .totalReturn");
  this._taxWarnEle = $(".betslipWrapper .totals .tax-warning");
  this._formatter = new b365.Ui.Formatter;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._calcTotalStake = function (n, t, i) {
    var o = 0, u, r, f, e;
    for (t = t
      ? t
      : "st", r = 0; r < n.length; r++)u = Number(n[r].getStItem(t)
      ? n[r].getStItem(t)
      : ""), f = n[r].getStItem("ew") == "1", isNaN(u) === !1 && (u = u * 100, e = Number(n[r].getCnItem("bc")
      ? n[r].getCnItem("bc")
      : n[r].getStItem("bc")
      ? n[r].getStItem("bc")
      : "1"), o += e > 1 || f
      ? Number(String(u * (f
      ? 2
      : 1) * e))
      : u);
    return $blib.pad2DP(String(o / 100), i)
  };
  this._updateIfReveseIfTotals = function (n) {
    var t = bs.getBetItems(bs.betTypeNormal), i = t[0].getStItem("st"), r = 0;
    t.length > 0 && typeof i != "undefined" && (r = $blib.roundDecimal(String(Number(i) * (bs.getSlipType() == bs.slipReverseIF
      ? 2
      : 1))));
    (bs.getSlipType() == bs.slipIF || bs.getSlipType() == bs.slipReverseIF) && this._setTotalToWin();
    this._ttStkEle.text($blib.pad2DP(String(r), n))
  };
  this._hideReturnElements = function () {
    this._ttTrCntEle.addClass("hidden");
    this._taxWarnEle.addClass("hidden");
    this._ttTotalsEle.addClass("empty")
  };
  this._showReturnElements = function () {
    this._ttTrCntEle.removeClass("hidden");
    this._taxWarnEle.removeClass("hidden");
    this._ttTotalsEle.removeClass("empty")
  };
  this._setTotalToWin = function () {
    var n = {}, t;
    this._initParams(n);
    this._hasMultiplesWithStake()
      ? this._hideReturnElements()
      : (this._totalSingleItems(n), n.someSp || this._totalCastItems(n), !(n.numStakes > 0) || n.someSp || n.someEW || n.someRelated && n.numStakes > 1
      ? this._hideReturnElements()
      : (t = this._bsInst.getSlipType() == this._bsInst.slipReverseIF
      ? n.totTw * 2
      : n.totTw, t = parseFloat(Math.floor(t * 100) /
      100), this._ttTrCntEle.find(".total").html(this._formatter.roundDecimal(String(t))), this._showReturnElements()))
  };
  this._initParams = function (n) {
    n.numStakes = 0;
    n.totTw = 0;
    n.someSp = !1;
    n.someEW = !1;
    n.someRelated = !1;
    n.totStk = isNaN(this._ttStkEle.text())
      ? 0
      : Number(this._ttStkEle.text())
  };
  this._totalSingleItems = function (n) {
    for (var o = new b365.Ui.Betslip.TaxCalculator(this._bsInst), f = 0, e = 0, u = this._bsInst.getBetItems(this._bsInst.betTypeNormal), r, t, i = 0; i <
      u.length && !n.someSp; i++)r = $blib.getItemOdds(this._bsInst.ItemTypeNormal, u[i]), t = u[i].getStItem("st"), t && parseFloat(t) != NaN &&
      parseFloat(t) > 0 && (n.someSp = n.someSp || r == "" || r == "0" || r == "0/0" || u[i].getStItem("sp") == "1", n.someEW = n.someEW ||
      u[i].getStItem("ew") == "1", n.numStakes++, (this._bsInst.getSlipType() == this._bsInst.slipIF ||
      this._bsInst.getSlipType() == this._bsInst.slipReverseIF) && n.numStakes == 1 && (n.totStk = Number(t)), n.someRelated ||
      (n.someRelated = $('#bsDiv li[data-item-id="' + i + '"][data-item-type="single"]').hasClass("restrictedCong"))), n.someSp || n.someEW ||
      (t = $.isNumeric(t)
        ? Number(t)
        : 0, e = Number($blib.riskToWin(t, r, 0, !1, n.someSp, !1)), f = this._totalSlipItem(o, i, e, t, r), n.totTw += Number(f))
  };
  this._totalSlipItem = function (n, t, i, r, u) {
    var f = n.calcReturnsByLine(r, u);
    switch (this._bsInst.getSlipType()) {
      case this._bsInst.slipReverseIF:
      case this._bsInst.slipIF:
        t !== 0 && (f = this._formatter.roundFixed(f, 2) - this._formatter.roundFixed(r, 2))
    }
    return f
  };
  this._totalCastItems = function (n) {
    for (var e = new b365.Ui.Betslip.TaxCalculator(this._bsInst), u = this._bsInst.getBetItems(this._bsInst.betTypeCast), i, r, f, t = 0; t < u.length &&
      !n.someSp; t++)i = $blib.getItemOdds(this._bsInst.betTypeCast, u[t]), r = u[t].getStItem("st"), r && parseFloat(r) != NaN && parseFloat(r) > 0 &&
      (n.numStakes++, n.someSp = n.someSp || i == "" || i == "0" || i == "0/0" || u[t].getStItem("sp") == "1", n.someRelated ||
        (n.someRelated = $('#bsDiv li[data-item-id="' + t + '"][data-item-type="cast"]').hasClass("restrictedCong"))), n.someSp ||
      (f = e.calcReturnsByLine(r, i), n.totTw += f)
  };
  this._hasMultiplesWithStake = function () {
    for (var r = this._bsInst.getBetItems(this._bsInst.itemTypeMultiple), i = !1, t, n = 0; n < r.length && !i; n++)t = r[n].getStItem("st"), t &&
      parseFloat(t) != NaN && parseFloat(t) > 0 && (i = !0);
    return i
  }
};
b365.Ui.Betslip.TotalsCalculator.prototype = {calculate: function () {
  if (this._isValid()) {
    var n = this._ttStkEle.parents(".betReceipt:first").data("num-dec-sep");
    switch (this._bsInst.getSlipType()) {
      case this._bsInst.slipReverseIF:
      case this._bsInst.slipIF:
        this._updateIfReveseIfTotals(n);
        break;
      case this._bsInst.slipBanker:
        this._ttStkEle.text(this._calcTotalStake(this._bsInst.getBetItems(this._bsInst.betTypeMultiple), undefined, n));
        break;
      default:
        this._ttStkEle.text(this._calcTotalStake(this._bsInst.getBetItems(this._bsInst.betTypeAll), undefined, n));
        this._setTotalToWin()
    }
    this._bsInst.contentChangedOnClient()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MultipleStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.MultipleStakeChangedHandler.prototype = {handle: function (n, t) {
  var i, r;
  n >= 0 && (i = this._bsInst.getBetItemById(this._bsInst.itemTypeMultiple, n), $blib.isDecimal(t.value) == !0
    ? (r = $blib.to2DP(t.value), Number(r) > $blib.getMaxStake() && (t.value = String($blib.getMaxStake())))
    : t.value = "", i.setStItem("st", t.value), i.setStItem("ust", t.value), this._bsInst.updateState())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.SingleStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._isItalianDomain = window.location.host.split(".").pop() == "it"
};
b365.Ui.Betslip.SingleStakeChangedHandler.prototype = {updateAllStakes: function (n, t) {
  var r, u, f, i;
  for (this._isValid(), r = $('.betslipWrapper li[data-item-type="single"]'), u = $blib.pad2DP(String(n)), this._isItalianDomain &&
    (u = Math.floor(Number(n))), f = new b365.Ui.Betslip.ToReturnCalculator(this._bsInst), i = t; i < r.length; i++)$(r[i]).find(".stake .stk").attr("value",
    u), this._bsInst.getBetItems(this._bsInst.itemTypeSingle)[i].setStItem("st", n), f.calculate(i, this._bsInst.itemTypeSingle, $(r[i]).find(".stake .stk")[0])
}, handle: function (n, t, i) {
  if (this._isValid()) {
    $("#mltsngstk").val("");
    switch (this._bsInst.getSlipType()) {
      case this._bsInst.slipIF:
        new b365.Ui.Betslip.IFBetStakeChangedHandler(this._bsInst).handle(n, i);
        break;
      case this._bsInst.slipReverseIF:
        new b365.Ui.Betslip.ReverseIfBetStakeChangedHandler(this._bsInst).handle(n, i);
        break;
      default:
        new b365.Ui.Betslip.ToReturnCalculator(this._bsInst).calculate(n, t, i)
    }
    new b365.Ui.Betslip.RepeatStakeVisibilitySetter(this._bsInst).set(n, i)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.CastStakeChangedHandler.prototype = {handle: function (n, t, i) {
  var f, r, u, e;
  this._isValid() && (f = new b365.Ui.Formatter, r = this._bsInst.getBetItemById(t, n), i.value = $blib.isDecimal(i.value)
    ? f.roundValue(i.value)
    : "", r.setStItem("st", i.value), u = parseInt(r.getStItem("bc"), 10), !isNaN(u) && u > 1 &&
    (e = new b365.Ui.Betslip.ItemInformation(i).itemElement, $(".totestkbc", e).text(f.roundDecimal(Number(i.value) * u)), r.setStItem("gst",
      i.value), r.setStItem("gust", i.value)), this._bsInst.updateState());
  new b365.Ui.Betslip.ToReturnCalculator(this._bsInst).calculate(n, t, i);
  new b365.Ui.Betslip.RepeatStakeVisibilitySetter(this._bsInst).set(n, i)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.IFBetStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._setMaxStake = function (n, t) {
    if (t > 0) {
      var i = this._bsInst.getBetItemById(this._bsInst.itemTypeSingle, t - 1), r = i.getStItem("st")
        ? $blib.roundValue(i.getStItem("st"))
        : 0;
      if (Number(r) < Number(n))return r
    }
    return n
  }
};
b365.Ui.Betslip.IFBetStakeChangedHandler.prototype = {handle: function (n, t) {
  var i, u;
  if (this._isValid()) {
    var r = this._bsInst.getBetItemById(this._bsInst.itemTypeSingle, n), f = $blib.getItemOdds(this._bsInst.itemTypeSingle, r), e = r.getStItem("sp") == "1" ||
      f == "" || f == "0/0";
    $blib.isDecimal(t.value) == !1 && (t.value = "");
    i = $blib.roundValue(t.value);
    u = this._setMaxStake(i, n);
    Number(u) < Number(i) && (t.value = u, i = u);
    new b365.Ui.Betslip.ToReturnCalculator(this._bsInst).calculate(n, this._bsInst.itemTypeSingle, t);
    r.setStItem("st", i);
    r.setStItem("ust", i);
    new b365.Ui.Betslip.SingleStakeChangedHandler(this._bsInst).updateAllStakes("", Number(n) + 1);
    this._bsInst.updateState()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ReverseIfBetStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._setMaxStake = function (n, t) {
    if (t > 0) {
      var i = this._bsInst.getBetItemById(this._bsInst.itemTypeSingle, t - 1), r = i.getStItem("st")
        ? $blib.roundValue(i.getStItem("st"))
        : 0;
      return r < n
        ? r
        : n
    }
  }
};
b365.Ui.Betslip.ReverseIfBetStakeChangedHandler.prototype = {handle: function (n, t) {
  var i;
  if (this._isValid()) {
    $blib.isDecimal(t.value) == !1 && (t.value = "");
    var r = this._bsInst.getBetItems(this._bsInst.itemTypeSingle);
    for (i = 0; i < r.length; i++)r[i].setStItem("st", t.value), r[i].setStItem("ust", t.value);
    this._bsInst.updateState()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.StakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.StakeChangedHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    var i = new b365.Ui.Betslip.ItemInformation(n), t = i.itemIndexAndType(), r = i.itemElement();
    switch (t[1]) {
      case"single":
        new b365.Ui.Betslip.SingleStakeChangedHandler(this._bsInst).handle(t[0], t[1], n);
        break;
      case"tote-single":
      case"tote-cast":
      case"tote-pot":
        new b365.Ui.Betslip.ToteStakeChangedHandler(this._bsInst).handle(n);
        break;
      case"cast":
        new b365.Ui.Betslip.CastStakeChangedHandler(this._bsInst).handle(t[0], t[1], n);
        break;
      case"multiple":
        t[0] != "-1"
          ? new b365.Ui.Betslip.MultipleStakeChangedHandler(this._bsInst).handle(t[0], n)
          : new b365.Ui.Betslip.SingleStakeChangedHandler(this._bsInst).updateAllStakes(n.value, 0)
    }
    new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToReturnCalculator = function (n) {
  this._bsInst = n;
  this._eachWayCookieKey = "ew";
  this._taxRates = $(".betslipWrapper>ul").attr("data-txr");
  this._taxCalculationMethod = $(".betslipWrapper>ul").attr("data-tcm");
  this._WinRateIndex = 3;
  this._ReturnRateIndex = 4;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ToReturnCalculator.prototype = {calculate: function (n, t, i) {
  var u, e, o;
  if (n >= 0) {
    var s = new b365.Ui.Formatter, r = this._bsInst.getBetItems(t)[n], h = r.getStItem(this._eachWayCookieKey) == "1"
      ? !0
      : !1, c = $blib.getMaxToWin(), f = $blib.getItemOdds(t, r), l = f == "" || f == "0/0" || f == "0.0" || f == "0" || r.getStItem("sp") == "1";
    $blib.isDecimal(i.value) == !0
      ? (u = $blib.to2DP(i.value), Number(u) > $blib.getMaxStake() && (u = String($blib.getMaxStake())), r.setStItem("st", u), r.setStItem("ust",
      u), e = new b365.Ui.Betslip.TaxCalculator(this._bsInst), o = e.calcReturnsByLine(Number(u), f), r.setStItem("tr", o))
      : (i.value = "", r.setStItem("st", ""), r.setStItem("tr", ""));
    this._bsInst.updateState()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToolTipHtmlBuilder = function (n) {
  this._ele = n;
  this._isValid = function () {
    return typeof this._ele != "undefined"
  }
};
b365.Ui.Betslip.ToolTipHtmlBuilder.prototype = {getHtml: function () {
  var t = "", i = $(this._ele).parents("[data-tooltip]:first"), n, r, u;
  if (i.length ==
    1)if (i = $(i[0]), n = i.attr("data-tooltip").split("|"), $(this._ele).hasClass("ausHelp"))t = (new b365.Ui.Betslip.AusToteToolTipHtmlBuilder).getHtml(n[0]);
  else {
    r = i.parents("[data-item-id]:first");
    u = r.attr("data-item-type");
    switch (u) {
      case"single":
        t = (new b365.Ui.Betslip.SingleToolTipHtmlBuilder).getHtml(r, n);
        break;
      case"tote-single":
        t = (new b365.Ui.Betslip.ToteSingleToolTipHtmlBuilder).getHtml(n);
        break;
      case"tote-cast":
        t = (new b365.Ui.Betslip.ToteCastToolTipHtmlBuilder).getHtml(this._ele, n);
        break;
      case"tote-pot":
        t = (new b365.Ui.Betslip.TotePotToolTipHtmlBuilder).getHtml(n);
        break;
      case"cast":
        t = $(this._ele).parents().hasClass("toteLeg")
          ? (new b365.Ui.Betslip.TotePotToolTipHtmlBuilder).getHtml(n)
          : (new b365.Ui.Betslip.CastToolTipHtmlBuilder).getHtml(r, n)
    }
  }
  return t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.StakeToolTipHtmlBuilder = function (n) {
  this._ele = n;
  this._isValid = function () {
    return typeof this._ele != "undefined"
  }
};
b365.Ui.Betslip.StakeToolTipHtmlBuilder.prototype = {getStakeHtml: function (n, t) {
  var r = "", i = $(this._ele).parents("[data-tooltip]:first"), t;
  return i.length == 1 && (i = $(i[0]), t = i.attr("data-tooltip"), r = "<label class='ttHead'>" + t + "<\/label><br />"), r
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PlaceBetClickHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PlaceBetClickHandler.prototype = {handle: function (n) {
  var i, t;
  this._isValid() && (i = new b365.Ui.Betslip.Validation.PlaceBetValidator(this._bsInst, this._bsController), $(n).hasClass("disabled") ||
    (t = $(n).attr("data-atype"), t == "cnf"
      ? (typeof window.MyBetsController != "undefined" && window.MyBetsController.isInitialised() &&
      window.MyBetsController.disableButtonEvents(), this._bsInst.confirmBets())
      : t == "cnf-ref"
      ? (typeof window.MyBetsController != "undefined" && window.MyBetsController.isInitialised() &&
      window.MyBetsController.disableButtonEvents(), this._bsInst.referBets())
      : t == "clr"
      ? this._bsInst.refresh()
      : i.validate() && (typeof window.MyBetsController != "undefined" && window.MyBetsController.isInitialised() &&
      window.MyBetsController.disableButtonEvents(), this._bsInst.placeBets())))
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.PlaceBetValidator = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._noStakeCssClass = "errStk";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._defaultValidator = function () {
    var n = "", t;
    return this._bsController._delegates.isAuthenticated()
      ? (t = Number($(".betslipWrapper .footer .totalStake").text()), (isNaN(t) || t == 0) &&
      (n = betSlipML.pleaseenterstake, context = this, $(".betslipWrapper input:text[data-inp-type]").each(function () {
        var n = new b365.Ui.Betslip.ItemInformation($(this)).itemElement();
        n.addClass(context._noStakeCssClass)
      })))
      : n = betSlipML.logintoplacebet, n
  }
};
b365.Ui.Betslip.Validation.PlaceBetValidator.prototype = {validate: function () {
  var n = this._defaultValidator(this._bsInst);
  if (n == "")switch (this._bsInst.getSlipType()) {
    case this._bsInst.slipIF:
      n = new b365.Ui.Betslip.Validation.IfPlaceBetValidator(this._bsInst).validate();
      break;
    case this._bsInst.slipUSTote:
      n = new b365.Ui.Betslip.Validation.UsTotePlaceBetValidator(this._bsInst).validate();
      break;
    case this._bsInst.slipUKTote:
      n = new b365.Ui.Betslip.Validation.UkTotePlaceBetValidator(this._bsInst).validate();
      break;
    case this._bsInst.slipETote:
      n = new b365.Ui.Betslip.Validation.ETotePlaceBetValidator(this._bsInst).validate()
  }
  if (n == "")switch (window.location.host.split(".").pop()) {
    case"it":
      n = new b365.Ui.Betslip.Validation.ItalyBetValidator(this._bsInst).validate()
  }
  return n != "" && (new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(n), this._bsInst.changeBetslipHeight()), n == ""
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.ETotePlaceBetValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.Validation.ETotePlaceBetValidator.prototype = {validate: function () {
  var f = "", n, i, s, r;
  if (this._isValid()) {
    var t = !0, e = this._bsInst._betItems, u = e.length - 1, o = betSlipML.etoteinvalidstake;
    for (n = u; n > -1 && t; n--)i = e[n].getStItem("gst"), isNaN(i) || i == "" || (t = Number(i) > 0
      ? /^([1]\d+|[1-9]\d*)(\.[0-9]{2}?)?$/.test(i)
      : !1);
    if (t) {
      for (u = this._bsInst._betCastItems.length - 1, s = this._bsInst._betCastItems, n = u; n > -1 && t; n--)r = Number(s[n].getStItem("gst")), !isNaN(r) &&
        Number(r) > 0 && (t = /^([1]\d+|[1-9]\d*)(\.[0-9]{2}?)?$/.test(r));
      t || (o = betSlipML.exactainvalidstake)
    }
    t || (f = o)
  }
  return f
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.IfPlaceBetValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.Validation.IfPlaceBetValidator.prototype = {validate: function () {
  var i = "", t, n, r;
  if (this._isValid())if (t = this._bsInst.getBetItems(this._bsInst.itemTypeSingle), t.length < 2)i = betSlipML.ifbetminselections;
  else for (n = 1; n < t.length; n++)r = t[n].getStItem("st"), (isNaN(r) || Number(r) == 0) &&
      (i = betSlipML.pleaseenterstakeorrisk, $(".betslipWrapper li[data-item-id='" + n + "'] input:text[data-inp-type]").addClass(this._noStakeCssClass));
  return i
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.UkTotePlaceBetValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.Validation.UkTotePlaceBetValidator.prototype = {validate: function () {
  var t = "", i, u, e, r, f, o;
  if (this._isValid()) {
    var n = !0, h = this._bsInst._betItems, s = h.length - 1;
    for (i = s; i > -1 && n; i--)u = h[i].getStItem("gst"), isNaN(u) || u == "" || (n = Number(u) > 0
      ? /^([1]\d+|[2-9]\d*)(\.[0-9]{1}0?)?$/.test(u)
      : !1);
    if (n) {
      for (s = this._bsInst._betCastItems.length - 1, e = this._bsInst._betCastItems, i = s; i > -1 &&
        n; i--)if (r = Number(e[i].getStItem("gst")), !isNaN(r) && Number(r) > 0) {
        f = Number(e[i].getStItem("bc"));
        f = isNaN(f)
          ? 1
          : f;
        o = $blib.roundDecimal(String(r * f));
        switch (e[i].getCnItem("cm")) {
          case"6":
          case"7":
            n = /^2(\.00?)?$/.test(r);
            t = n
              ? t
              : betSlipML.toteperunitstake;
            break;
          case"U":
          case"P":
            n = /^[0-9]\d*(\.[0-9]{1}0?)?$/.test($blib.roundDecimal(String(r))) && /^[1-9]\d*(\.[0-9]{1}0?)?$/.test(o);
            t = n
              ? t
              : betSlipML.toteinvalidstake;
            break;
          case"J":
            n = /^[1-9]\d*(\.[05]{1}0?)?$/.test(o);
            t = n
              ? t
              : betSlipML.totejackpotinvalidstake;
            break;
          default:
            n = /^[0-9]\d*(\.(([1-9]{1}0?)|00))?$/.test(r);
            n && (n = /^([1]\d+|[2-9])\d*(\.[0-9]{1}0?)?$/.test(o));
            t = n
              ? t
              : betSlipML.minstaketote
        }
      }
    }
    else t = betSlipML.minstaketote
  }
  return t
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.UsTotePlaceBetValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.Validation.UsTotePlaceBetValidator.prototype = {validate: function () {
  var r = "", n, u, o, e;
  if (this._isValid()) {
    var t = !0, i = this._bsInst._betItems, f = i.length - 1;
    for (n = f; n > -1 && t; n--)u = i[n].getStItem("gst"), isNaN(u) || u == "" || (t = /^0|[2-9]\d*\.?([0]*)?$/.test(u));
    if (t)for (i = this._bsInst._betCastItems, f = i.length - 1, n = f; n > -1 && t; n--)o = i[n], e = i[n].getStItem("gust"), isNaN(e) ||
      (t = /^0|[2-9]\d*\.?([0]*)?$/.test(e), r = t
        ? ""
        : r = betSlipML.ustotecastsinvalid);
    else r = betSlipML.ustotesinglesinvalid
  }
  return r
}};
Type.registerNamespace("b365.Ui.Betslip.Validation");
b365.Ui.Betslip.Validation.ItalyBetValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.Validation.ItalyBetValidator.prototype = {validate: function () {
  var h = "", r, n, u, c, i, l, t, f, e, o, a, s, v;
  if (this._isValid()) {
    for (o = /^([1]\d+|[2-9]\d*)(\.00?)?$/, a = /^(\d+?)(\.(25|50?|75|00?))?$/, r = !0, u = this._bsInst._betItems, c = u.length -
      1, v = this._bsInst.getSlipType() == this._bsInst.slipBanker, t = c; t > -1 && r; t--)(n = u[t].getStItem("st"), typeof n != "undefined") &&
    (n = n.replace(",", "."), n = n.replace("..", "."), isNaN(n) || n == "" || n == "0" || (r = Number(n) > 1
      ? o.test(Number(n))
      : !1));
    for (i = this._bsInst._betMltItems, l = i.length - 1, t = l; t > -1 && r; t--)(n = i[t].getStItem("st"), typeof n != "undefined") &&
    (n = n.replace(",", "."), n = n.replace("..", "."), f = Number(i[t].getCnItem("bc")
      ? i[t].getCnItem("bc")
      : i[t].getStItem("bc")
      ? i[t].getStItem("bc")
      : "1"), f > 1 && !v
      ? (e = Number(String(n * f)), s = a)
      : (e = Number(n), s = o), isNaN(n) || n == "" || n == "0" || (r = Number(n) >= .25 && Number(e) >= 2
      ? s.test(Number(n))
      : !1));
    r || (h = betSlipML.minstakeitaly)
  }
  return h
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MessageDisplayHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.MessageDisplayHandler.prototype = {showMsg: function (n, t) {
  if (this._isValid()) {
    typeof t == "undefined" && (t = "alert");
    var r = $(".bsError"), i = $("li", r);
    i.addClass(t);
    i.html("<div>" + n + "<\/div>");
    $(".icon", i).length === 0 && i.prepend('<div class="icon"><\/div>');
    $(document).trigger("bsInfoMessage", n);
    r.removeClass("hidden");
    this._bsInst.contentChangedOnClient()
  }
}, hideMsg: function () {
  this._isValid && ($(".bsError").addClass("hidden").find("li").removeClass("alert"), this._bsInst.contentChangedOnClient())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PlaceBetRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PlaceBetRequestDespatcher.prototype = {despatch: function () {
  this._isValid() && new b365.Ui.Betslip.Validation.PlaceBetValidator(this._bsInst, this._bsController).validate() &&
  this._bsInst.req(this._bsInst.reqTypePlaceBet)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ReferBetRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ReferBetRequestDespatcher.prototype = {despatch: function () {
  this._isValid() && new b365.Ui.Betslip.Validation.PlaceBetValidator(this._bsInst, this._bsController).validate() &&
  this._bsInst.req(this._bsInst.reqTypeReferBet)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MaxBetReqCompleteHandler = function (n) {
  this._bsInst = n;
  this._serverErrorReqType = 99;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.MaxBetReqCompleteHandler.prototype = {handle: function (n) {
  var r;
  if (this._isValid()) {
    var u = n[0], i = n[1][7][1].split("=")[1].split("-"), t = u.split("|");
    if (t[1] != "" && t[0] != "E" && new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(t[1]), t[0] != "E" && t[0] != "L") {
      r = $blib.pad2DP(t[0]);
      switch (i[0]) {
        case"M":
          new b365.Ui.Betslip.MultiplesMaxBetReqCompleteHandler(this._bsInst).handle(i[1], r);
          break;
        case"N":
          $("#mltsngstk").val("");
          new b365.Ui.Betslip.SinglesMaxBetReqCompleteHandler(this._bsInst).handle(i[1], r);
          break;
        case"C":
          new b365.Ui.Betslip.CastMaxBetReqCompleteHandler(this._bsInst).handle(i[1], r)
      }
    }
    else t[0] == "E" && new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(betSlipML.pleaselogin);
    new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MultiplesMaxBetReqCompleteHandler = function (n) {
  this._bsInst = n;
  this._serverErrorReqType = 99;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.MultiplesMaxBetReqCompleteHandler.prototype = {handle: function (n, t) {
  if (this._isValid()) {
    var i = $("li[data-item-type='multiple'][data-item-id='" + n + "'] input[data-inp-type='mltstk']");
    i.length > 0 && (i[0].value = t, this._bsInst.getBetItemById(this._bsInst.itemTypeMultiple, n).setStItem("st", t), this._bsInst.updateState())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.SinglesMaxBetReqCompleteHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.SinglesMaxBetReqCompleteHandler.prototype = {handle: function (n, t) {
  if (this._isValid()) {
    var i = $("li[data-item-type='single'][data-item-id='" + n + "'] input[data-inp-type='sngstk']");
    i.length > 0 && (i[0].value = t, this._bsInst.getBetItemById(this._bsInst.itemTypeSingle, n).setStItem("st",
      t), new b365.Ui.Betslip.StakeChangedHandler(this._bsInst).handle(i[0]), this._bsInst.updateState())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastMaxBetReqCompleteHandler = function (n) {
  this._bsInst = n;
  this._serverErrorReqType = 99;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.CastMaxBetReqCompleteHandler.prototype = {handle: function (n, t) {
  if (this._isValid()) {
    var i = $("li[data-item-type='cast'][data-item-id='" + n + "'] input[data-inp-type='cststk']");
    i.length > 0 && (i[0].value = t, this._bsInst.getBetItemById(this._bsInst.itemTypeCast, n).setStItem("st", t), this._bsInst.updateState())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.InstanceEventAttacher = function (n, t) {
  this._bsInst = n;
  this._controller = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._controller != "undefined"
  }
};
b365.Ui.Betslip.InstanceEventAttacher.prototype = {attach: function () {
  if (this._isValid()) {
    var n = this, t = $(".betslipWrapper");
    t.change(function (t) {
      new b365.Ui.Betslip.BetslipChangeHandler(n._bsInst, n._controller).handle(t)
    });
    t.click(function (t) {
      new b365.Ui.Betslip.BetslipClickHandler(n._bsInst, n._controller).handle(t)
    });
    this._bsInst.addOnHandleInProg(function (n, t) {
      new b365.Ui.Betslip.InProgressDisplayHandler(n).handle(t)
    });
    this._bsInst.addOnPBetError(function (n) {
      new b365.Ui.Betslip.PlaceBetErrorHandler(n).handle()
    });
    this._bsInst.addOnAddBet(function (t, i) {
      new b365.Ui.Betslip.AddBetHandler(t, n._controller).handle(i)
    });
    this._bsInst.addOnPlaceBet(function (t, i) {
      new b365.Ui.Betslip.PlaceBetRequestDespatcher(t, n._controller).despatch(i)
    });
    this._bsInst.addOnLock(function (t, i) {
      new b365.Ui.Betslip.LockUnlockHandler(t, n._controller).handle(i)
    });
    this._bsInst.addOnReqComplete(function (t, i) {
      new b365.Ui.Betslip.ReqCompleteHandler(t, n._controller).handle(i, n._controller)
    });
    this._bsInst.addOnConfirmBet(function (t) {
      new b365.Ui.Betslip.ConfirmBetRequestDespatcher(t, n._controller).despatch()
    });
    this._bsInst.addOnContentLoaded(function (t, i) {
      n._controller.OnBetslipContentLoaded(i)
    });
    this._bsInst.addOnUpdateState(function (n, t) {
      new b365.Ui.Betslip.UpdateStateHandler(n).handle(t)
    });
    this._bsInst.addOnRestoreState(function (n, t) {
      new b365.Ui.Betslip.RestoreStateHandler(n).handle(t)
    });
    $("#bsDlg").on("click", function (t) {
      new b365.Ui.Betslip.DialogClickHandler(n._bsInst, n._controller).handle(t)
    });
    $("#bsCD").on("click", function (t) {
      new b365.Ui.Betslip.ConfirmationDialog(n._bsInst, n._controller).handleClick(t)
    });
    this._bsInst.addOnPoll(function (n, t) {
      new b365.Ui.Betslip.PollBetRequestDespatcher(n).despatch(t)
    });
    this._bsInst.addOnPollExpired(function (t, i) {
      new b365.Ui.Betslip.PollingExpiredHandler(t, n._controller).handle(i)
    });
    this._bsInst.addOnReferBet(function (t, i) {
      new b365.Ui.Betslip.ReferBetRequestDespatcher(t, n._controller).despatch(i)
    });
    $("#BetSlipForm").submit(function (t) {
      var i = t.keyCode
        ? t.keyCode
        : t.charCode;
      i == 13
        ? n._controller.placeBet()
        : t.preventDefault
        ? t.preventDefault()
        : t.returnValue = !1
    });
    this._bsInst.addOnHideBetSlip(function (t) {
      new b365.Ui.Betslip.ItemSubscriptionManager(t).unsubscribe();
      $(".betslipWrapper .betReceipt").length > 0 && n._controller.itemsRemoved()
    })
  }
}, addOnBetAdded: function (n) {
  this._bsInst.addOnBetAdded(function (t) {
    n(t)
  })
}, addOnBetAddedReqComplete: function (n) {
  this._bsInst.addOnBetAddedReqComplete(function (t) {
    n(t)
  })
}, addOnEditBet: function (n) {
  this._bsInst.addOnEditBet(function (t) {
    n(t)
  })
}, addOnRefreshReqComplete: function (n) {
  this._bsInst.addOnRefreshReqComplete(function (t) {
    n(t)
  })
}, addOnBetSlipItemsChanged: function (n) {
  this._bsInst.addOnBetSlipItemsChanged(function (t) {
    n(t)
  })
}, addOnAcceptChanges: function (n) {
  this._bsInst.addOnAcceptChanges(function (t) {
    n(t)
  })
}, addOnBetSlipLoaded: function (n) {
  this._bsInst.addOnBetSlipLoaded(function (t) {
    n(t)
  })
}, addOnMaxSelections: function (n) {
  this._bsInst.addOnMaxSelections(function (t) {
    n(t)
  })
}, addOnBetslipDisplayed: function (n) {
  this._bsInst.addOnBetslipDisplayed(function (t) {
    n(t)
  })
}, addOnPlaceBet: function (n) {
  this._bsInst.addOnPlaceBet(function (t) {
    n(t)
  })
}, addOnPlaceBetSuccess: function (n) {
  this._bsInst.addOnPlaceBetSuccess(function (t) {
    n(t)
  })
}, addOnAddBetslipFooterLinks: function (n) {
  this._bsInst.addOnAddBetslipFooterLinks(function (t) {
    n(t)
  })
}, addOnAddReceiptFooterLinks: function (n) {
  this._bsInst.addOnAddReceiptFooterLinks(function (t) {
    n(t)
  })
}, addOnBetslipError: function (n) {
  this._bsInst.addOnBetslipError(function (t) {
    n(t)
  })
}, addOnShowBetSlip: function (n) {
  this._bsInst.addOnShowBetSlip(function (t) {
    n(t)
  })
}, addOnHideBetSlip: function (n) {
  this._bsInst.addOnHideBetSlip(function (t) {
    n(t)
  })
}, addOnChangeBetslipHeight: function (n) {
  this._bsInst.addOnChangeBetslipHeight(function (t) {
    n(t)
  })
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ReqCompleteHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._serverErrorReqType = 99;
  this._betSlipDialogIndicator = "BET_SLIP_DIALOG";
  this._showDlg = !1;
  this._resetButtonState = !0;
  this._hideInProg = !0;
  this._dlg = null;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._handleServerError = function (n) {
    $(".betslipWrapper").html(n[0])
  };
  this._handleDialogReqComplete = function (n) {
    n[0] = n[0].replace(this._betSlipDialogIndicator, "");
    this._showDlg = !0;
    this._dlg = new b365.Ui.Betslip.DialogReqCompleteHandler(this._bsInst, this._bsController).handle(n)
  };
  this._pollingContinuesHandler = function (n, t) {
    this._resetButtonState = !1;
    var i = new b365.Ui.Betslip.PollingContinuesReqCompleteHandler(this._bsInst).handle(n, t);
    this._hideInProg = i.pollStatus !== b365.Ui.BetslipAPI.Polling.PollStatusEnum.StartOrContinue
  };
  this._defaultHandler = function (n) {
    $(".betslipWrapper").html(n[0]);
    this._resetButtonState = !1;
    this._checkLoginStatus()
  };
  this._checkLoginStatus = function () {
    var n = $(".betslipWrapper>ul:first").attr("data-bsuis");
    this._bsController._delegates.isAuthenticated() && n == "0" && window.location.reload()
  };
  this._customerDialogHandler = function (n) {
    this._resetButtonState = !0;
    new b365.Ui.Betslip.CustomerReqCompleteHandler(this._bsInst, this._bsController).handle(n)
  };
  this._betPlacementAttempt = function (n) {
    if (n) {
      var t = window.location.host.split(".").pop() === "it";
      t || this._bsInst.placeBetSuccess();
      this._bsInst.setValueInBSCookie("processed", "true");
      this._bsInst.backupBSCookieValue(this._bsInst._betSlipCookieKey)
    }
  };
  this._addFooterLinks = function (n) {
    n
      ? (this._bsInst.addReceiptFooterLinks(), new b365.Ui.Betslip.FooterLinksReceiptRender(this._bsInst).render())
      : (this._bsInst.betSlipDisplayed(), this._bsInst.addBetslipFooterLinks(), new b365.Ui.Betslip.FooterLinksSlipRender(this._bsInst, $(".footer")).render())
  }
};
b365.Ui.Betslip.Request = {getTypeId: function (n) {
  return n[1][7][0]
}, getResponse: function (n) {
  return n[0]
}};
b365.Ui.Betslip.ReqCompleteHandler.prototype = {handle: function (n) {
  function c(n, t, i) {
    var r = n;
    return n && i > 0 && t >= 0 && (r = n.substr(0, t) + n.substr(t + i)), r
  }

  var u, e, o, t, i;
  if (this._isValid()) {
    o = !1;
    this._resetButtonState = !0;
    this._hideInProg = !0;
    t = b365.Ui.Betslip.Request.getTypeId(n);
    i = b365.Ui.Betslip.Request.getResponse(n);
    this._receiptContext = i.indexOf("betReceipt") > -1;
    var s = this._bsInst.getValueFromBSCookie("processed").replace("||", ""), h = i.indexOf("DepositMessage") > -1 ||
      i.indexOf("CustomerMessage") > -1, f = b365.Ui.BetslipAPI.Polling.getInstructionSubStringInfo(i), r = null;
    if (f && (r = f.content, this._receiptContext && (i = c(i, f.sourceStartIndex, f.length), n[0] = i)), t ==
      this._serverErrorReqType)this._handleServerError(n);
    else if (t == this._bsInst.reqTypeMaxBet)new b365.Ui.Betslip.MaxBetReqCompleteHandler(this._bsInst).handle(n);
    else if (t == this._bsInst.reqTypeBetBrk || t == this._bsInst.reqTypePitcher ||
      i.indexOf(this._betSlipDialogIndicator) != -1)this._handleDialogReqComplete(n);
    else if (i.indexOf("DUPLICATE_BET") > -1)new b365.Ui.Betslip.DuplicateBetHandler(this._bsInst).handle(), this._hideInProg = !0;
    else if (!(i.indexOf("LOCKED") > -1)) {
      if (t == this._bsInst.reqTypePhoneBet) {
        new b365.Ui.Betslip.PhoneBetHandler(this._bsInst, this._bsController).displayPopup(i);
        return
      }
      r && !this._receiptContext
        ? this._pollingContinuesHandler(t, r)
        : b365.Ui.BetslipAPI.Polling.isPollingRequestType(t)
        ? (t !== this._bsInst.reqTypePollTempBetReceipt && (new b365.Ui.Betslip.PollingFinishedReqCompleteHandler(this._bsInst,
        this._bsController).handle(n), this._betPlacementAttempt(this._receiptContext), this._addFooterLinks(this._receiptContext)), r &&
        this._pollingContinuesHandler(t, r))
        : h
        ? this._customerDialogHandler(n)
        : (new b365.Ui.Betslip.ItemSubscriptionManager(this._bsInst).detach(), o = !0, this._defaultHandler(n), this._receiptContext || s != "true"
        ? t == this._bsInst.reqTypeRefreshSlip
        ? this._bsInst.refreshReqComplete()
        : t == this._bsInst.reqTypeAddItems || t == this._bsInst.reqTypeConstructAndAddItems
        ? (this._bsInst.betAddedReqComplete(), $(document).trigger("bsInfoMessage", n[0].toUpperCase().indexOf("ALREADY ADDED") > -1
        ? betSlipML.duplicateselection
        : betSlipML.addedtobetslip), u = $("#QBAddToBetslip"), u.length > 0 &&
        (e = n[0].match(/class=\"[\w\s]*acceptChanges[\w\s]*\"/i), e.length > 0 && n[0].indexOf("oddsChange") < 0 && (e[0].toLowerCase().indexOf("hidden") < 0
          ? $("a", u).addClass("disabled").attr("data-nav", "")
          : $("a", u).removeClass("disabled").attr("data-nav", "AddToBetSlip"))))
        : t == this._bsInst.reqTypePlaceBet || t == this._bsInst.reqTypeConfirmBet
        ? this._betPlacementAttempt(this._receiptContext)
        : t == this._bsInst.reqTypeRefreshAccept && ($(".betslipWrapper").trigger("b365.Ui.Betslip.acceptingchanges"), this._bsInst.acceptChanges())
        : new b365.Ui.Betslip.ViewResetter(this._bsInst).reset(), this._addFooterLinks(this._receiptContext), r && this._pollingContinuesHandler(t, r))
    }
    new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate();
    new b365.Ui.Betslip.LockUnlockHandler(this._bsInst, this._bsController).handle(!1, this._resetButtonState);
    this._hideInProg && this._bsInst.handleInProg("hide", "");
    this._bsInst.contentLoaded();
    o && new b365.Ui.Betslip.ItemSubscriptionManager(this._bsInst).attach(this._bsController);
    this._receiptContext && this._bsInst.ScrollToTop();
    typeof window.MyBetsController != "undefined" && window.MyBetsController.isInitialised() && window.MyBetsController.bindButtonEvents()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CustomerReqCompleteHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.CustomerReqCompleteHandler.prototype = {handle: function (n) {
  var i = this, r, t = n[0].split("|");
  t.splice(0, 1);
  r = {userBalance: t[0], totalStake: t[1], is3dSecure: t[2], isQuickDeposit: t[3]};
  i._bsController.deposit(r);
  r.isQuickDeposit === "1" && new b365.Ui.Betslip.MessageDisplayHandler(i._bsInst).showMsg(betSlipML.insufficientfunds);
  new b365.Ui.Betslip.LockUnlockHandler(i._bsInst, i._bsController).handle(!1, !0)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DialogReqCompleteHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._titleMarker = "|title";
  this._messageMarker = "|message";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.DialogReqCompleteHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    var i = this, u = n[0], r, f, e, o, s, h, t, c;
    u.length > 0 && (t = $(u), c = t.attr("data-renderstyle") ===
      "confirmation", r = t.children("#title").html(), f = t.children("#message").html(), e = t.children("#button1Text").html(), o = t.children("#button2Text").html(), s = t.children("#button1Action").html(), h = t.children("#button2Action").html(), r ||
      c
      ? i._bsController.showConfirmation(i, r, f, e, s, o, h)
      : i._bsController.showDialog(i, t))
  }
}, setDialog: function (n) {
  var t = this;
  t._bsController.SetCurrentDialogRef(n)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.LockUnlockHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.LockUnlockHandler.prototype = {handle: function (n, t) {
  var f, e, r;
  if (this._isValid()) {
    var u = $(".betslipWrapper a.placeBet"), o = $(".betslipWrapper select.bet-slip-type"), i = $(".betslipWrapper ul>li");
    typeof t == "undefined" && (t = !0);
    f = this._bsInst._pollReqType === this._bsInst.reqTypePollTempBetReceipt;
    n = n || this._bsInst.pollInProgress() && !f;
    u.length > 0 && (n || this._bsInst.numItems == 0
      ? (u.disableElement("disabled"), o.disableElement())
      : t && (e = $(".betslipWrapper a.acceptChanges"), !this._bsInst.isEmpty() && this._bsController._delegates.isAuthenticated() &&
      (e.length == 0 || e.hasClass("hidden")) && u.enableElement("disabled"), o.enableElement()));
    n == !0
      ? i.find("input").disableElement()
      : i.find("input").enableElement();
    n == !0
      ? i.find("select").disableElement()
      : i.find("select").enableElement();
    r = i.find("a:not(.placeBet)");
    (f || this._bsInst.reqType === this._bsInst.reqTypePollTempBetReceipt) && (r = r.filter(function () {
      if (!this.parentElement)return!0;
      var n = $(this.parentElement);
      return!(n.hasClass("footer") || n.hasClass("footerLinks"))
    }));
    n == !0
      ? r.disableElement()
      : r.enableElement()
  }
}};
Type.registerNamespace("b365.Ui.BetslipAPI"), function (n) {
  var i = "BET_POLL", t = "ENDPOLLDATA", r = "PS=", u = "RDAT=", f = "NPRP=";
  n.PollStatusEnum = {StartOrContinue: 0, Succeeded: 1, Failed: 2};
  n.getInstructionSubStringInfo = function (n) {
    var u, r = n.indexOf(i), f;
    return r < 0
      ? null
      : (f = n.indexOf(t, r + i.length), u = f > -1
      ? n.substring(r, f + t.length)
      : n.substring(r), {content: u, sourceStartIndex: r, length: u.length})
  };
  n.boundedSubString = function (n, t, i) {
    var r, u;
    return!n || !t || !i || n.length < t.length + i.length
      ? null
      : (r = n.indexOf(t), r <= -1)
      ? null
      : (r += t.length, u = n.indexOf(i, r), u < r)
      ? null
      : n.substring(r, u)
  };
  n.parsePollInfo = function (e) {
    var s = n.boundedSubString(e, i, t), o, h = null;
    return s && (o = s.split("|"), h = {reqType: o.length > 1
      ? Number(o[1])
      : null, referenceId: o.length > 2
      ? o[2]
      : "", time: o.length > 3
      ? o[3]
      : null, interval: o.length > 4
      ? o[4]
      : null, pollStatus: n.PollStatusEnum.StartOrContinue, nextPollRequestParams: null, responseData: null}, s.indexOf(r) > 0 &&
      (h.pollStatus = Number(n.boundedSubString(s, r, f)), h.nextPollRequestParams = n.boundedSubString(s, f, u), h.responseData = n.boundedSubString(e, u,
        t))), h
  };
  n.isPollingRequestType = function (n) {
    return n === bs.reqTypePollReferredBet || n === bs.reqTypePollDistributedPlaceBet || n === bs.reqTypePollDistributedConfirmBet ||
      n === bs.reqTypePollTempBetReceipt
  }
}(window.b365.Ui.BetslipAPI.Polling = window.b365.Ui.BetslipAPI.Polling || {});
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PollingContinuesReqCompleteHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return this._bsInst !== undefined
  }
};
b365.Ui.Betslip.PollingContinuesReqCompleteHandler.prototype = {handle: function (n, t) {
  var i = null;
  if (this._isValid()) {
    if ((i = b365.Ui.BetslipAPI.Polling.parsePollInfo(t), !i) ||
      (n = Number(n), b365.Ui.BetslipAPI.Polling.isPollingRequestType(n) === i.reqType && this._bsInst._pollReqType === 0))return null;
    n === this._bsInst.reqTypePollTempBetReceipt && this.handleTempReceiptData(i);
    i.pollStatus === b365.Ui.BetslipAPI.Polling.PollStatusEnum.StartOrContinue &&
    this._bsInst.pollBet(i.reqType, i.referenceId, i.time, i.interval, i.nextPollRequestParams)
  }
  return i
}, handleTempReceiptData: function (n) {
  var t = n.responseData, r, o, i, u, f, e;
  if (n.pollStatus !== b365.Ui.BetslipAPI.Polling.PollStatusEnum.Failed && t && t.length !== 0 && (t = JSON.parse(t), t)) {
    for (o = t.BetList.length, r = 0; r < o; r += 1)i = t.BetList[r], i.Status === 1
      ? (u = "accepted", e = i.PSQFReference, $("#tempbetstatus_reference_" + i.TempBettingSlipId).text(i.BetReference).prev().show())
      : (u = "rejected", e = betSlipML.aamsrejected), f = $("#tempbetstatus_title_" +
      i.TempBettingSlipId), f.text(e), f.removeClass("pending").addClass(u), $("#tempbetstatus_desc_" + i.TempBettingSlipId).hide();
    n.pollStatus === b365.Ui.BetslipAPI.Polling.PollStatusEnum.Succeeded && t.UserBalanceDisplayValue.length > 0 &&
    ($(".betslipWrapper > ul:first-child").attr("data-ub", t.UserBalanceDisplayValue), this._bsInst.placeBetSuccess())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PollingFinishedReqCompleteHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PollingFinishedReqCompleteHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    this._bsInst.resetPoll();
    var t = n[0].indexOf("DepositMessage") > -1 || n[0].indexOf("CustomerMessage") > -1;
    t
      ? new b365.Ui.Betslip.CustomerReqCompleteHandler(this._bsInst, this._bsController).handle(n)
      : $(".betslipWrapper").html(n[0])
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MultiBreakdownRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.MultiBreakdownRequestDespatcher.prototype = {despatch: function (n) {
  this._isValid() && this._bsInst.req(this._bsInst.reqTypeBetBrk,
    new b365.Ui.Betslip.BetBreakdownKeyGenerator(this._bsInst, this._bsInst.getBetItemById(this._bsInst.itemTypeMultiple, n), this._bsInst.itemTypeMultiple,
      n).generate())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.RemoveAllItemsRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._closeBetSlip = function () {
    var n = this;
    n._bsInst.hideBetSlip()
  }
};
b365.Ui.Betslip.RemoveAllItemsRequestDespatcher.prototype = {despatch: function (n) {
  this._isValid() && !$(n).hasClass("disabled") &&
  (this._closeBetSlip(), this._bsInst.clearBets(!0), this._bsController.itemsRemoved(), $(".betslipWrapper").trigger("b365.Ui.Betslip.removingall"))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.EditSelectionsRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.EditSelectionsRequestDespatcher.prototype = {despatch: function () {
  this._isValid() && (this._bsInst.editBet(), this._bsInst.setClearOnAdd(!1), this._bsInst.setValueInBSCookie("processed",
    "false"), this._bsInst.refresh(this._bsInst.betTypeNormal))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DialogClickHandler = function (n, t) {
  this._bsInst = n;
  this._controller = t;
  this._closeAction = "close";
  this._referAction = "refer";
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._controller.GetCurrentDialogRef() != "undefined"
  };
  this._handleRefer = function () {
    new b365.Ui.Betslip.ReferBetRequestDespatcher(this._bsInst, this._controller).despatch()
  };
  this._hideDialog = function () {
    this._controller._dlg && this._controller._dlg.hideDialog()
  }
};
b365.Ui.Betslip.DialogClickHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    n.preventDefault();
    var t = n.target;
    ($(t).attr("data-action") == this._closeAction || $(t).parents().attr("data-action") == this._closeAction) && this._hideDialog();
    ($(t).attr("data-action") == this._referAction || $(t).parents().attr("data-action") == this._referAction) && (this._hideDialog(), this._handleRefer())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DialogCloser = function (n, t) {
  this._controller = n;
  this._dialogContainer = $(t);
  this._isValid = function () {
    return typeof this._controller != "undefined" && typeof this._dialogContainer != "undefined"
  }
};
b365.Ui.Betslip.DialogCloser.prototype = {closeDialog: function () {
  this._isValid() && (this._dialogContainer.addClass("hidden"), $(".centergreyout").remove())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.RetainSelectionsRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.RetainSelectionsRequestDespatcher.prototype = {despatch: function (n) {
  var i, t;
  if (this._isValid() && !$(n).hasClass("disabled")) {
    for (this._bsInst.restoreBSCookieValue("bs", this._bsInst._betSlipCookieBackup), this._bsInst.setValueInBSCookie("processed",
      "false"), new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle(), this._bsInst.setClearOnAdd(!1), new b365.Ui.Betslip.UpdateStateHandler(this._bsInst).handle(), i = this._bsInst.getBetItems(this._bsInst.itemTypeAll), t = 0; t <
           i.length; t++)i[t].setStItem("st", ""), i[t].setStItem("ust", ""), i[t].setStItem("gust", ""), i[t].setStItem("gst", ""), i[t].setStItem("tr", "");
    this._bsInst.updateState();
    this._bsInst.refresh(this._bsInst.betTypeNormal)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.SingleBreakdownRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.SingleBreakdownRequestDespatcher.prototype = {despatch: function (n) {
  this._isValid() && this._bsInst.req(this._bsInst.reqTypeBetBrk,
    new b365.Ui.Betslip.BetBreakdownKeyGenerator(this._bsInst, this._bsInst.getBetItemById(this._bsInst.itemTypeSingle, n), this._bsInst.itemTypeSingle,
      n).generate())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.RepeatStakeClickHandler = function (n, t, i, r) {
  this._bsInst = n;
  this._itemIndex = t;
  this._itemType = i;
  this._itemElement = r;
  this._isItalianDomain = window.location.host.split(".").pop() == "it";
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._itemIndex != "undefined" && typeof this._itemType != "undefined" &&
      typeof this._itemElement != "undefined"
  };
  this._isValidRepeatStake = function (n) {
    return n != "" && Number(n) > 0
  };
  this._repeatStake = function (n, t, i) {
    var f, e, r, u;
    if (this._isValid()) {
      for (f = this._bsInst.getBetItems(t), e = new b365.Ui.Betslip.StakeChangedHandler(this._bsInst), r = i; r < f.length; r++)u = $(".betslipWrapper " +
        (t == this._bsInst.itemTypeSingle
          ? ".single-section"
          : ".cast-section") + " li[data-item-id='" + r + "']:not(.suspended) .stk"), u.length > 0 && (f[r].setStItem("st", n), u[0].value = n, e.handle(u[0]));
      this._bsInst.updateState()
    }
  }
};
b365.Ui.Betslip.RepeatStakeClickHandler.prototype = {handle: function (n) {
  if (typeof n != "undefined" && n && this._isValid()) {
    var r = n.target, i = $(this._itemElement).find(".stk:first"), t = (new b365.Ui.Formatter).padStringTo2DP(i[0].value);
    this._isItalianDomain && (t = Math.floor(Number(t)));
    i[0].value = t;
    this._isValidRepeatStake(t) && (this._itemType == this._bsInst.itemTypeSingle
      ? (this._repeatStake(t, this._bsInst.itemTypeSingle, Number(this._itemIndex) + 1), this._repeatStake(t, this._bsInst.itemTypeCast, 0))
      : this._itemType == this._bsInst.itemTypeCast &&
      this._repeatStake(t, this._bsInst.itemTypeCast, Number(this._itemIndex) + 1), new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate())
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.RepeatStakeVisibilitySetter = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.RepeatStakeVisibilitySetter.prototype = {set: function (n, t) {
  this._isValid() && n == 0 && $blib.isDecimal(t.value) === !0 && $(".rptStake").removeClass("hidden")
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.NoReservesClickHandler = function (n, t, i, r) {
  this._bsInst = n;
  this._itemIndex = t;
  this._itemType = i;
  this._itemElement = r;
  this._noReservesCookieKey = "nr";
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._itemIndex != "undefined" && typeof this._itemType != "undefined" &&
      typeof this._itemElement != "undefined"
  };
  this._updateSelectionLabel = function (n) {
    var t = $(this._itemElement).find(".no-reserves-hidden").text().split("|");
    this._itemElement.find(".selection>div>ul>li:first-child").text(n
      ? t[1]
      : t[0])
  }
};
b365.Ui.Betslip.NoReservesClickHandler.prototype = {handle: function (n) {
  var t, i, r;
  typeof n != "undefined" && n && this._isValid() && (t = n.target, t.tagName !== "INPUT" && (t = $(t).attr("data-inp-type")
    ? $(t).find("input[data-inp-type='nrcb']")[0]
    : $(t).parent().find("input[data-inp-type='nrcb']")[0], t.checked = !t.checked), i = t.checked, r = this._bsInst.getBetItemById(this._itemType,
    this._itemIndex), r && (r.setStItem(this._noReservesCookieKey, i
    ? "1"
    : "0"), this._bsInst.updateState(), this._updateSelectionLabel(i)))
}};
b365.Ui.Formatter = function () {
  this._to2DP = function (n) {
    n = n.replace(",", ".");
    var t = n.indexOf(".");
    return t != -1 && n.length - t > 3 && (n = n.substr(0, t + 3)), n
  }
};
b365.Ui.Formatter.prototype = {padStringTo2DP: function (n) {
  var t, i;
  return typeof n != "string" && (n = String(n)), n = n.replace(/,/g, "."), n = n.trim(), n === "." || n === ""
    ? n = "0.00"
    : (n = this._to2DP(n), t = n.indexOf("."), t == -1
    ? n += ".00"
    : (i = n.length - (t + 1), i == 0
    ? n += "00"
    : i == 1 && (n += "0"))), n
}, numDecPlcs: function (n) {
  typeof n != "string" && (n = String(n));
  var t = ".";
  return n.indexOf(t) > -1
    ? n.length - n.indexOf(t) - 1
    : 0
}, roundValue: function (n) {
  var u, f, t, i, r, e;
  if (typeof n != "string" && (n = String(n)), n = n.trim(), u = "0", n != "NaN" && n.indexOf(".") >= 0) {
    if (f = n.split("."), t = f[0], i = f[1], i.trim().length == 0)return n;
    i = i.length > 4
      ? i.substring(0, 3)
      : i;
    r = i.substring(2, 3);
    Number(r) >= 5
      ? (r = i.substring(1, 2), Number(r) == 9
      ? (e = i.substring(0, 1), Number(e) == 9
      ? (t = Number(t) + 1, u = t)
      : (r = Number(e) + 1, t = t + "." + r, u = t))
      : (r = Number(r) + 1, r = String(i.substring(0, 1)) + String(r), t = t + "." + r, u = t))
      : i.length == 1
      ? (t = t + "." + i, u = t)
      : (t = t + "." + i.substring(0, 2), u = t)
  }
  else u = n === "" || n == "NaN"
    ? ""
    : isNaN(n)
    ? n
    : n;
  return u
}, roundDecimal: function (n) {
  return typeof n != "string" && (n = String(n)), n = n.replace(/,/g, "."), n = n.trim(), n === "." || n === ""
    ? "0.00"
    : this.padStringTo2DP(this.roundValue(n))
}, round: function (n, t) {
  return Math.round(parseFloat(n) * Math.pow(10, t)) / Math.pow(10, t)
}, roundFixed: function (n, t) {
  return this.round(n, t).toFixed(t)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AcceptChangesRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AcceptChangesRequestDespatcher.prototype = {despatch: function () {
  if (this._isValid()) {
    for (var t = this._bsInst.getBetItems(this._bsInst.betTypeAll), i, e, r, u, f, n = 0; n < t.length; n++)(t[n].getStItem("olc") !== undefined ||
      t[n].getStItem("rs") !== undefined) && (t[n].getStItem("rs") && t[n].getStItem("rs").length > 0 &&
      (i = t[n].getStItem("rs"), t[n].setStItem("st", i), t[n].setStItem("rs", ""), t[n].getStItem("ust") && t[n].setStItem("ust", i)), t[n].getStItem("olc") &&
      t[n].setStItem("olc", "0"), i = t[n].getStItem("st"), e = t[n].getStItem("ew"), r = $blib.getItemOdds(bs.betTypeNormal,
      t[n]), u = new b365.Ui.Betslip.TaxCalculator(this._bsInst), f = u.calcReturnsByLine(i, r), t[n].setStItem("tr", f)), t[n].getCnItem("fp") &&
      t[n].getStItem("_s") !== undefined && t[n].getStItem("_s") == "1" && this._bsController.itemsRemoved(t[n].getCnItem("fp"), !0);
    this._bsInst.updateState();
    this._bsInst.betSlipItemsChanged();
    this._bsInst.refresh(this._bsInst.betTypeAllAccept)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetConstructDecoder = function (n, t) {
  this._bsInst = n;
  this._construct = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._construct != "undefined"
  };
  this._getSpecificType = function (n, t) {
    switch (n) {
      case this._bsInst.toteTypeUKTote:
        return t == this._bsInst.betTypeToteNonCast
          ? this._bsInst.betTypeToteNonCast
          : t == this._bsInst.betTypeTotePot
          ? this._bsInst.betTypeTotePot
          : this._bsInst.betTypeToteCast;
      case this._bsInst.toteTypeETote:
        return t == this._bsInst.betTypeToteNonCast
          ? this._bsInst.betTypeEToteNonCast
          : t == this._bsInst.betTypeTotePot
          ? this._bsInst.betTypeETotePot
          : this._bsInst.betTypeEToteCast;
      case this._bsInst.toteTypeUSTote:
        return t == this._bsInst.betTypeToteNonCast
          ? this._bsInst.betTypeUsToteNonCast
          : t == this._bsInst.betTypeTotePot
          ? this._bsInst.betTypeUsTotePot
          : this._bsInst.betTypeUsToteCast;
      default:
        return t == this._bsInst.betTypeToteNonCast
          ? this._bsInst.betTypeFrgnToteNonCast
          : t == this._bsInst.betTypeTotePot
          ? this._bsInst.betTypeFrgnTotePot
          : this._bsInst.betTypeFrgnToteCast
    }
  }
};
b365.Ui.Betslip.AddBetConstructDecoder.prototype = {betType: function () {
  var t = bs.betTypeNormal, i, r, n;
  if (this._isValid())if ($.isArray(this._construct)) {
    if (this._construct[0].stype && this._construct[0].cmask) {
      i = this._construct[0].stype;
      r = this._construct[0].ttype;
      switch (i) {
        case"N":
          t = this._bsInst.betTypeCast;
          break;
        case"A":
        case"O":
          n = new b365.Ui.Betslip.CastMaskInfo(this._construct[0].cmask);
          t = n.isToteCast(i)
            ? this._bsInst.betTypeCast
            : n.isTotePot()
            ? this._bsInst.betTypeTotePotAus
            : this._bsInst.betTypeCast;
          break;
        case"T":
        case"R":
        case"J":
        case"E":
          n = new b365.Ui.Betslip.CastMaskInfo(this._construct[0].cmask);
          t = n.isToteCast(i)
            ? this._getSpecificType(r, this._bsInst.betTypeToteCast)
            : n.isTotePot()
            ? this._getSpecificType(r, this._bsInst.betTypeTotePot)
            : this._getSpecificType(r, this._bsInst.betTypeToteNonCast)
      }
    }
  }
  else this._construct.indexOf("bc=") > -1 && (t = bs.betTypeMultiple);
  return t
}}, function () {
  Type.registerNamespace("b365.Ui.Betslip");
  b365.Ui.Betslip.AddBetHandler = function (n, t) {
    typeof $displayHelper != "undefined" &&
    (n._betItems.length == 0 && $displayHelper.isPortraitMode() && $displayHelper.isPrematch() && window.MyBetsController.isInitialised()
      ? window.MyBetsController.showBetSlip()
      : $displayHelper.isPortraitMode() && !$displayHelper.isPrematch() && window.MyBetsController.isInitialised()
      ? window.MyBetsController.showBetSlip()
      : !$displayHelper.isPortraitMode() && window.MyBetsController.isInitialised() && window.MyBetsController.showBetSlip());
    this._bsInst = n;
    this._controller = t;
    this._isValid = function () {
      return typeof this._bsInst != "undefined" && typeof this._controller != "undefined"
    };
    this._getConstruct = function (n) {
      var t = n;
      return typeof n == "string" || $.isArray(n) || (t = Array.prototype.slice.call(n)[0]), t
    };
    this._failedToAddBet = function (n, t) {
      t === this._bsInst.betTypeNormal && n.length > 0 && $(".betslipWrapper").trigger("b365.Ui.Betslip.failedtoaddbet", n[0])
    };
    this._duplicateCheck = function (n) {
      for (var r = new b365.Ui.Betslip.DuplicateItemValidator(this._bsInst), i = !1, t = 0; t < n.length && !i; t++)i = r.isDuplicate(n[t]);
      return i
    }
  };
  b365.Ui.Betslip.AddBetHandler.prototype = {handle: function (n, t) {
    if (this._isValid()) {
      var r = [], u = [], f = this._getConstruct(n), i = new b365.Ui.Betslip.AddBetConstructDecoder(this._bsInst, f), e, o, s, h = !0;
      if (this._bsInst.setClearOnAdd(t === !0 || $(".betslipWrapper .betReceipt").length > 0), e = this._bsInst.getClearOnAdd(), e ||
        new b365.Ui.Betslip.AddBetTypeValidator(this._bsInst).validate(i.betType())) {
        if (this._bsInst._pollReqType === this._bsInst.reqTypePollTempBetReceipt && this._bsInst.resetPoll(), i.betType() ===
          this._bsInst.betTypeFrgnToteCast && (f = new b365.Ui.Betslip.ForeignToteConstructCorrector(this._bsInst,
          f).GetCorrectedConstruct()), r = new b365.Ui.Betslip.AddBetItemsBuilder(this._bsInst, f).betItems(i.betType()), e ||
          (o = this._bsInst.okToAdd(r.length))) {
          if (s = e, e) {
            for (var c = 0, l = this._bsInst.getBetItems(i.betType()), a = l.length; c < a; c++)this._controller.itemsRemoved(l[c].getCnItem("fp"));
            this._bsInst.clearBets(!1);
            o = this._bsInst.okToAdd(r.length)
          }
          else u = this._bsInst.getBetItems(i.betType()), s = !this._duplicateCheck(r);
          s && o
            ? (u.length === 0 &&
            (new b365.Ui.Betslip.DefaultSlipTypeSetter(this._bsInst).setSlipType(i.betType()), this._bsInst.showBetSlip()), this._controller.isReqOnBetAddedEnabled() &&
            this._bsInst.locked() || (u = u.concat(r), this._bsInst.setBetItems(u,
            i.betType()), this._bsInst.updateState(), this._bsInst.betAdded(), this._bsInst.betSlipItemsChanged()), this._controller.isReqOnBetAddedEnabled() &&
            (this._bsInst.req(this._bsInst.reqTypeAddItems) || (this._failedToAddBet(r, i.betType()), h = !1)))
            : s || (this._bsInst.unlock(), new b365.Ui.Betslip.InProgressDisplayHandler(this._bsInst).handle(["hide", betSlipML.duplicateselection]), h = !1)
        }
        o || (this._bsInst.unlock(), new b365.Ui.Betslip.InProgressDisplayHandler(this._bsInst).handle(["hide", i.betType() == this._bsInst.betTypeCast
          ? betSlipML.tomanyselection
          : betSlipML.maxselections]), this._bsInst.maxSelections(), this._duplicateCheck(r) || (this._failedToAddBet(r, i.betType()), h = !1));
        h || this._controller.itemsRemoved(r[0].getCnItem("fp"))
      }
      else new b365.Ui.Betslip.ConfirmationDialog(this._bsInst, this._controller).showIncompatibleSelectionsDialog(f)
    }
  }}
}(), function () {
  Type.registerNamespace("b365.Ui.Betslip");
  b365.Ui.Betslip.DeleteBetHandler = function (n, t) {
    this._bsInst = n;
    this._controller = t;
    this._isValid = function () {
      return typeof this._bsInst != "undefined" && typeof this._controller != "undefined"
    };
    this._getItemIndex = function (n) {
      var u = -1, r = new b365.Ui.BetDTO, i, t, f;
      for (r.parse(n), i = this._bsInst.getBetItems(), t = 0, f = i.length; t < f; t++)if (i[t].getCnItem("fp") === r.getCnItem("fp") &&
        i[t].getCnItem("f") == r.getCnItem("f")) {
        u = t;
        break
      }
      return u
    }
  };
  b365.Ui.Betslip.DeleteBetHandler.prototype = {handle: function (n) {
    if (this._isValid()) {
      var t = this._getItemIndex(n);
      t != -1 && new b365.Ui.Betslip.ItemDeleteExecutor(this._bsInst, this._controller, t, this._bsInst.betTypeNormal).execute()
    }
  }}
}();
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetItemsBuilder = function (n, t) {
  this._bsInst = n;
  this._construct = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._construct != "undefined"
  }
};
b365.Ui.Betslip.AddBetItemsBuilder.prototype = {betItems: function (n) {
  var t = [];
  if (this._isValid())switch (n) {
    case this._bsInst.betTypeCast:
    case this._bsInst.betTypeToteCast:
    case this._bsInst.betTypeUsToteCast:
    case this._bsInst.betTypeEToteCast:
    case this._bsInst.betTypeFrgnToteCast:
      t = new b365.Ui.Betslip.CastBetItemsBuilder(this._bsInst, this._construct).betItems();
      break;
    case this._bsInst.betTypeToteNonCast:
    case this._bsInst.betTypeUsToteNonCast:
    case this._bsInst.betTypeEToteNonCast:
    case this._bsInst.betTypeTotePot:
    case this._bsInst.betTypeUsTotePot:
    case this._bsInst.betTypeETotePot:
    case this._bsInst.betTypeFrgnToteNonCast:
    case this._bsInst.betTypeFrgnTotePot:
    case this._bsInst.betTypeTotePotAus:
      t = new b365.Ui.Betslip.ToteBetItemsBuilder(this._bsInst, this._construct).betItems();
      break;
    case this._bsInst.betTypeNormal:
      t.push(new b365.Ui.BetDTO);
      t[0].parse(this._construct)
  }
  return t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeEToteValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeEToteValidator.prototype = {validate: function (n) {
  var t = !1;
  return this._isValid() && (t = n == this._bsInst.betTypeEToteCast || n == this._bsInst.betTypeEToteNonCast || n == this._bsInst.betTypeETotePot), t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeIfRevIfBankerTeaserValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeIfRevIfBankerTeaserValidator.prototype = {validate: function (n) {
  var t = !1;
  return this._isValid() && (t = n == this._bsInst.betTypeNormal), t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeStandardValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeStandardValidator.prototype = {validate: function (n) {
  var i = !0, t = this._bsInst.getBetItems(this._bsInst.betTypeTotePotAus);
  return n == this._bsInst.betTypeTotePotAus
    ? i = t.length > 0 && (t[0].getCnItem("spt") == "A" || t[0].getCnItem("spt") == "O") && new b365.Ui.Betslip.CastMaskInfo(t[0].getCnItem("cm")).isTotePot()
    : (i = !(t.length > 0 && (t[0].getCnItem("spt") == "A" || t[0].getCnItem("spt") == "O") &&
    new b365.Ui.Betslip.CastMaskInfo(t[0].getCnItem("cm")).isTotePot()), i &&
    (i = n == this._bsInst.betTypeNormal || n == this._bsInst.betTypeCast || n == bs.betTypeFrgnToteCast || n == bs.betTypeFrgnToteNonCast ||
      n == bs.betTypeFrgnTotePot)), i
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeUkToteValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeUkToteValidator.prototype = {validate: function (n) {
  var t = !1;
  return this._isValid() && (t = n == this._bsInst.betTypeToteCast || n == this._bsInst.betTypeToteNonCast || n == this._bsInst.betTypeTotePot), t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeUsToteValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeUsToteValidator.prototype = {validate: function (n) {
  var t = !1;
  return this._isValid() && (t = n == this._bsInst.betTypeUsToteCast || n == this._bsInst.betTypeUsToteNonCast || n == this._bsInst.betTypeUsTotePot), t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AddBetTypeValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AddBetTypeValidator.prototype = {validate: function (n) {
  var t = !0;
  if (this._bsInst.numItems() > 0)switch (this._bsInst.getSlipType()) {
    case this._bsInst.slipStandard:
      t = new b365.Ui.Betslip.AddBetTypeStandardValidator(this._bsInst).validate(n);
      break;
    case this._bsInst.slipBanker:
    case this._bsInst.slipIF:
    case this._bsInst.slipReverseIF:
    case this._bsInst.slipFixedTeaser:
      t = new b365.Ui.Betslip.AddBetTypeIfRevIfBankerTeaserValidator(this._bsInst).validate(n);
      n == this._bsInst.slipFixedTeaser || t || n != this._bsInst.betTypeCast || (this._bsInst.setValueInBSCookie("bt", this._bsInst.slipStandard), t = !0);
      break;
    case this._bsInst.slipUKTote:
      t = new b365.Ui.Betslip.AddBetTypeUkToteValidator(this._bsInst).validate(n);
      break;
    case this._bsInst.slipUSTote:
      t = new b365.Ui.Betslip.AddBetTypeUsToteValidator(this._bsInst).validate(n);
      break;
    case this._bsInst.slipETote:
      t = new b365.Ui.Betslip.AddBetTypeEToteValidator(this._bsInst).validate(n)
  }
  return t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastMaskInfo = function (n) {
  this._castmask = n;
  this._isValid = function () {
    return typeof this._castmask != "undefined"
  }
};
b365.Ui.Betslip.CastMaskInfo.prototype = {isToteCast: function (n) {
  return n == "J" && this._castmask != "D"
    ? !0
    : this._castmask == "E" || this._castmask == "T" || this._castmask == "W" || this._castmask == "S" || this._castmask == "Q"
}, isTotePot: function () {
  return this._castmask == "P" || this._castmask == "U" || this._castmask == "J" || this._castmask == "6" || this._castmask == "7" || this._castmask == "2" ||
    this._castmask == "3" || this._castmask == "4"
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastBetItemsBuilder = function (n, t) {
  this._bsInst = n;
  this._construct = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._construct != "undefined"
  };
  this._getTotePotItemConstructs = function (n, t) {
    for (var f = [], e = "#fp=", u, r, i = 0; i < t.valuelist.length; i++)for (u = 0; u < t.valuelist[i].length; u++)r = t.valuelist[i][u].split(":"), i ===
      0 && u === 0 && (n += "#cm=" + r[2] + "#tmn=" + r[4] + "#tmi=" + r[3]), e += r[5] + ":" + r[0] + ":" + r[6] + ":" + r[1] +
      (i == t.valuelist.length - 1 && u == t.valuelist[i].length - 1
        ? ""
        : ",");
    return f.push(n + e + (t.mediaType !== ""
      ? "|#mt=" + t.mediaType + "#"
      : "")), f
  };
  this._getCombinations = function (n, t) {
    for (var r = [], u = t[0], f, i = 0; i < u.length; i++)n.indexOf(u[i]) == -1 && (f = n + (n === ""
      ? ""
      : ",") + u[i], t.length > 1 && t[1]
      ? r = r.concat(this._getCombinations(f, t.slice(1)))
      : r.push(f));
    return r
  };
  this._getNoneTotePotItemConstructs = function (n, t) {
    var u = [], r = "#fp=", f, i;
    if (t.ctype == "C" || t.cmask == "Q") {
      for (i = 0; i < t.valuelist[0].length; i++)r += t.valuelist[0][i] + (i == t.valuelist[0].length - 1
        ? ""
        : ",");
      u.push(n + r)
    }
    else if (t.ctype == "B") {
      for (r += t.valuelist[0], i = 1; i < t.valuelist.length; i++)t.valuelist[i] && (r += "," + t.valuelist[i].toString());
      u.push(n + r + (t.mediaType !== ""
        ? "|#mt=" + t.mediaType + "#"
        : ""))
    }
    else for (f = this._getCombinations("", t.valuelist), i = 0; i < f.length; i++)u.push(n + r + f[i] + (t.mediaType !== ""
        ? "|#mt=" + t.mediaType + "#"
        : ""));
    return u
  };
  this._getAusCastItemConstructs = function (n, t) {
    for (var u = [], r = "#fp=", i = 0; i < t.valuelist.length; i++)t.valuelist[i] && (r += t.valuelist[i].join(",")), i != t.valuelist.length - 1 &&
      t.valuelist[i + 1] && (r += "~");
    return u.push(n + r + "|#atc=" + t.atcValue + "#" + (t.mediaType !== ""
      ? "mt=" + t.mediaType + "#"
      : "")), u
  }
};
b365.Ui.Betslip.CastBetItemsBuilder.prototype = {betItems: function () {
  for (var o = [], t = "", n, u, i, f, e, r = 0; r < this._construct.length; r++) {
    if (n = this._construct[r], t === "")switch (n.ttype) {
      case this._bsInst.toteTypeUKTote:
        t = this._bsInst.betTypeToteCast;
        break;
      case this._bsInst.toteTypeETote:
        t = this._bsInst.betTypeEToteCast;
        break;
      case this._bsInst.toteTypeUSTote:
        t = this._bsInst.betTypeUsToteCast;
        break;
      case this._bsInst.toteTypeForeignTote:
        t = this._bsInst.toteTypeForeignTote;
        break;
      default:
        t = this._bsInst.betTypeCast
    }
    u = "pt=" + (t == this._bsInst.betTypeCast
      ? "C"
      : "T") + "B#spt=" + n.stype + (n.cmask == "P"
      ? ""
      : "#cm=" + n.cmask) + "#ct=" + n.ctype + (n.c2ID
      ? "#c2=" + n.c2ID
      : "#f=" + n.fixid);
    switch (n.cmask) {
      case"P":
        i = this._getTotePotItemConstructs(u, n);
        break;
      default:
        switch (n.stype) {
          case"A":
          case"O":
            i = this._getAusCastItemConstructs(u, n);
            break;
          default:
            i = this._getNoneTotePotItemConstructs(u, n)
        }
    }
    for (f = 0; f < i.length; f++)e = new b365.Ui.BetDTO(t), e.parse(i[f]), o.push(e)
  }
  return o
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToteBetItemsBuilder = function (n, t) {
  this._bsInst = n;
  this._construct = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._construct != "undefined"
  };
  this._addWinEwPlBet = function (n, t, i) {
    var f, r;
    n += "#f=" + t.fixid;
    n += t.stype == "J"
      ? "#o=0/0"
      : "";
    var e = t.ctype == "E" || t.ctype == "H", o = e
      ? ":"
      : ",", u = "#fp=";
    if (t.stype == "J")i.push(n + u + t.valuelist[0].slice(o)[0]);
    else if (e)for (r = 0; r < t.valuelist[0].length; r++)i.push(n + u + t.valuelist[0][r]);
    else for (f = t.valuelist[0].slice(o), r = 0; r < f.length; r++)i.push(n + u + f[r])
  };
  this._addPotBet = function (n, t, i, r) {
    n += "#tmn=" + t.totemn + "#tmi=" + t.totemi + "#c2=" + t.c2ID;
    i.push(n + this._getTotePotFp(t) + (r == bs.betTypeTotePotAus
      ? "|#atc=" + t.atcValue
      : ""))
  };
  this._getTotePotFp = function (n) {
    for (var t = "#fp=", r, i = 0; i < n.valuelist.length; i++) {
      for (r = 0; r < n.valuelist[i].length; r++)t += n.valuelist[i][r] + "-";
      t.endsWith("-") && (t = t.substring(0, t.lastIndexOf("-")));
      t += ","
    }
    return t.endsWith(",") && (t = t.substring(0, t.lastIndexOf(","))), t
  };
  this._getTotePotFp = function (n) {
    for (var t = "#fp=", r, i = 0; i < n.valuelist.length; i++) {
      for (r = 0; r < n.valuelist[i].length; r++)t += n.valuelist[i][r] + "-";
      t.endsWith("-") && (t = t.substring(0, t.lastIndexOf("-")));
      t += ","
    }
    return t.endsWith(",") && (t = t.substring(0, t.lastIndexOf(","))), t
  }
};
b365.Ui.Betslip.ToteBetItemsBuilder.prototype = {betItems: function (n) {
  var o = [], r, t, u, i, f, e;
  if (this._isValid())for (r = 0; r < this._construct.length; r++) {
    t = this._construct[r];
    t.stype != "T" && t.stype != "E" && t.ctype == "E" && (t.ctype = "H");
    u = "pt=TB#spt=" + t.stype + "#cm=" + t.cmask;
    i = [];
    switch (t.cmask) {
      case"D":
        u += "#ct=" + t.ctype;
        this._addWinEwPlBet(u, t, i);
        break;
      default:
        this._addPotBet(u, t, i, n)
    }
    for (f = 0; f < i.length; f++)e = new b365.Ui.BetDTO(n), e.parse(i[f]), o.push(e)
  }
  return o
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DefaultSlipTypeSetter = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.DefaultSlipTypeSetter.prototype = {setSlipType: function (n) {
  if (this._isValid()) {
    var t = this._bsInst.slipStandard;
    switch (n) {
      case this._bsInst.betTypeToteCast:
      case this._bsInst.betTypeToteNonCast:
      case this._bsInst.betTypeTotePot:
        t = this._bsInst.slipUKTote;
        break;
      case this._bsInst.betTypeUsToteCast:
      case this._bsInst.betTypeUsToteNonCast:
      case this._bsInst.betTypeUsTotePot:
        t = this._bsInst.slipUSTote;
        break;
      case this._bsInst.betTypeEToteCast:
      case this._bsInst.betTypeEToteNonCast:
      case this._bsInst.betTypeETotePot:
        t = this._bsInst.slipETote
    }
    this._bsInst.setValueInBSCookie("bt", t)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DuplicateItemValidator = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.DuplicateItemValidator.prototype = {isDuplicate: function (n) {
  var r = !1, t;
  if (this._isValid()) {
    var i = this._bsInst.getBetItems(n.type), f = n.getCnItem("pt"), u = function (n, t) {
      return n.getCnItem("spt") === t.getCnItem("spt") && n.getCnItem("cm") === t.getCnItem("cm") && n.getCnItem("ct") === t.getCnItem("ct") &&
        n.getCnItem("f") === t.getCnItem("f") && n.getCnItem("fp") === t.getCnItem("fp")
    };
    for (t = 0; !r && t < i.length; t++)switch (f) {
      case"S":
        r = i[t].getCnItem("pid") === n.getCnItem("pid") && i[t].getCnItem("mid") === n.getCnItem("mid");
        break;
      case"CB":
        r = u(n, i[t]);
        break;
      case"TB":
        switch (n.type) {
          case bs.betTypeToteCast:
          case bs.betTypeUsToteCast:
          case bs.betTypeEToteCast:
          case bs.betTypeToteNonCast:
          case bs.betTypeUsToteNonCast:
          case bs.betTypeEToteNonCast:
            r = u(n, i[t])
        }
        break;
      default:
        i[t].getCnItem("fp") === n.getCnItem("fp") && i[t].getCnItem("f") == n.getCnItem("f") && (r = i[t].getCnItem("Inc") == n.getCnItem("Inc")
          ? !0
          : !1)
    }
  }
  return r
}}, function () {
  var n;
  Type.registerNamespace("b365.Ui.Betslip");
  b365.Ui.Betslip.InProgressDisplayHandler = function (n) {
    this._bsInst = n;
    this._isValid = function () {
      return typeof this._bsInst != "undefined"
    };
    this._setText = function (n) {
      $(".betslipWrapper #pro>ul>li .progressMsg").html(n)
    }
  };
  b365.Ui.Betslip.InProgressDisplayHandler.prototype = {handle: function (t) {
    if (this._isValid()) {
      var r = t[0], i = t[1], u = t.length > 3
        ? t[3]
        : "alert";
      r == "show"
        ? (t[2] == this._bsInst.reqTypeReferBet || t[2] == this._bsInst.reqTypePollReferredBet
        ? this._setText(betSlipML.processingbet + "<br/><br/>" + betSlipML.additionalstakereferred)
        : (t[2] == this._bsInst.reqTypePollDistributedPlaceBet || t[2] == this._bsInst.reqTypePollDistributedConfirmBet ||
        t[2] == this._bsInst.reqTypePollTempBetReceipt) && this._setText(betSlipML.processingbet), n = setTimeout(Function.createDelegate(this, function () {
        $(".betslipWrapper .bsError").addClass("hidden");
        $(".betslipWrapper #pro").removeClass("hidden")
      }), 1e3))
        : (n && clearTimeout(n), $(".betslipWrapper #pro").addClass("hidden"), i && new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(i, u));
      this._bsInst.contentChangedOnClient()
    }
  }}
}(), function () {
  Type.registerNamespace("b365.Ui.Betslip");
  var n;
  b365.Ui.Betslip.ConfirmationDialog = function (t, i) {
    this._bsInst = t;
    this._controller = i;
    this._closeAction = "close";
    this._referAction = "refer";
    this._clearAndAddAction = "clearAndAdd";
    this._isValid = function () {
      return typeof this._bsInst != "undefined"
    };
    this._clearDialogAndConstruct = function () {
      n = null;
      this._controller.ClearCurrentDialogRef()
    };
    this._handleCancel = function () {
      this._hideDialog();
      this._clearDialogAndConstruct()
    };
    this._handleClearAndAdd = function () {
      var t = n;
      this._hideDialog();
      this._clearDialogAndConstruct();
      new b365.Ui.Betslip.AddBetHandler(this._bsInst, this._controller).handle(t, !0)
    };
    this._hideDialog = function () {
      this._controller._dlg && this._controller._dlg.hideDialog()
    };
    this._handleRefer = function () {
      this._hideDialog();
      new b365.Ui.Betslip.ReferBetRequestDespatcher(this._bsInst, this._controller).despatch()
    }
  };
  b365.Ui.Betslip.ConfirmationDialog.prototype = {showIncompatibleSelectionsDialog: function (t) {
    var i = this;
    typeof t != "undefined" && t &&
    (n = t, i._controller.showConfirmation(i, betSlipML.incompatibleselectionstitle, betSlipML.incompatibleselectionsclear, betSlipML.ok,
      this._clearAndAddAction, betSlipML.cancel, this._closeAction))
  }, handleClick: function (n) {
    var i = n.target, t;
    n.preventDefault();
    t = $(i).attr("data-action");
    t == this._closeAction
      ? this._handleCancel()
      : t == this._clearAndAddAction
      ? this._handleClearAndAdd()
      : t == this._referAction && this._handleRefer()
  }, setDialog: function (n) {
    this._controller.SetCurrentDialogRef(n)
  }}
}();
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetMaxRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._maxBetKeySingles = "N";
  this._maxBetKeyCasts = "C";
  this._maxBetKeyMultiples = "M";
  this._maxBetItemTypeSingle = "1";
  this._maxBetItemTypeCast = "50";
  this._getKey = function (n) {
    return n == this._bsInst.itemTypeSingle
      ? this._maxBetKeySingles
      : n == this._bsInst.itemTypeCast
      ? this._maxBetKeyCasts
      : this._maxBetKeyMultiples
  };
  this._getMaxBetItemType = function (n, t) {
    return n == this._bsInst.itemTypeSingle
      ? this._maxBetItemTypeSingle
      : n == this._bsInst.itemTypeCast
      ? this._maxBetItemTypeCast
      : this._bsInst.getBetItemById(this._bsInst.itemTypeMultiple, t).getCnItem("id")
  };
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._getMaxBetType = function (n) {
    return n == this._bsInst.itemTypeSingle
      ? this._bsInst.betTypeNormal
      : n == this._bsInst.itemTypeCast
      ? this._bsInst.betTypeCast
      : this._bsInst.betTypeMultiple
  }
};
b365.Ui.Betslip.BetMaxRequestDespatcher.prototype = {despatch: function (n) {
  if (this._isValid())if (this._bsController._delegates.isAuthenticated()) {
    var i = new b365.Ui.Betslip.ItemInformation(n), t = i.itemIndexAndType();
    this._bsInst.req(this._bsInst.reqTypeMaxBet,
      "key=" + this._getKey(t[1]) + "-" + t[0] + "-" + this._getMaxBetItemType(t[1], t[0]) + "-" + this._getMaxBetType(t[1]))
  }
  else new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(betSlipML.pleaselogin)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.IfBetActionChangeHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.IfBetActionChangeHandler.prototype = {handle: function (n, t) {
  var u, i;
  if (n > 0)u = this._bsInst.getBetItemById(this._bsInst.betTypeNormal, n), u.setStItem("ac", t.value);
  else {
    var f = this._bsInst.getBetItems(this._bsInst.betTypeNormal), r = $(".betslipWrapper .ifbetaction"), e = $(t).find("option:selected").text();
    for (i = 0; i < f.length; i++)f[i].setStItem("ac", t.value), r[i].selectedIndex = t.value == r[i].options[0].value
      ? 0
      : 1, $(r[i]).parent(".betslip-select").attr("data-text", e)
  }
  this._bsInst.updateState()
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BankerToggleRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.BankerToggleRequestDespatcher.prototype = {despatch: function (n) {
  if (this._isValid()) {
    var t = new b365.Ui.Betslip.ItemInformation(n.target), i = t.itemIndexAndType(), r = this._bsInst.getBetItemById(this._bsInst.betTypeNormal, i[0]);
    r.setStItem("bk", $(n.target).hasClass("selected")
      ? "0"
      : "1");
    this._bsInst.updateState();
    this._bsInst.refresh(this._bsInst.betTypeAll)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.OddsChangeHandler = function (n) {
  this._bsInst = n;
  this._serverErrorReqType = 99;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.OddsChangeHandler.prototype = {handle: function (n, t) {
  if (this._isValid()) {
    var i = n.target, r = this._bsInst.getBetItemById(this._bsInst.betTypeNormal, t);
    i.value == "SP"
      ? (r.setStItem("sp", "1"), r.setStItem("tr", ""))
      : r.setStItem("sp", "0");
    $(i).parent(".betslip-select").attr("data-text", $(i).find("option:selected").text());
    this._bsInst.updateState();
    new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.UpdateStateHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.UpdateStateHandler.prototype = {handle: function () {
  this._isValid() &&
  (this._bsInst.setValueInBSCookie("ns", $bto.serialize(this._bsInst.getBetItems(this._bsInst.betTypeNormal))), this._bsInst.setValueInBSCookie("ms",
    $bto.serialize(this._bsInst.getBetItems(this._bsInst.betTypeMultiple))), this._bsInst.setValueInBSCookie("cs",
    $bto.serialize(this._bsInst.getBetItems(this._bsInst.betTypeCast))))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.RestoreStateHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.RestoreStateHandler.prototype = {handle: function () {
  this._isValid() && (this._bsInst.setBetItems($bto.parseCookieString(this._bsInst.getValueFromBSCookie("ns", ""), this._bsInst.betTypeNormal),
    this._bsInst.betTypeNormal), this._bsInst.setBetItems($bto.parseCookieString(this._bsInst.getValueFromBSCookie("ms", ""), this._bsInst.betTypeMultiple),
    this._bsInst.betTypeMultiple), this._bsInst.setBetItems($bto.parseCookieString(this._bsInst.getValueFromBSCookie("cs", ""), this._bsInst.betTypeCast),
    this._bsInst.betTypeCast), this._bsInst.betSlipItemsChanged())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PlaceBetErrorHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PlaceBetErrorHandler.prototype = {handle: function () {
  this._isValid() &&
  ($(".emptyBetslip").hide(), $(".placeBet").hide(), this._bsInst.betslipError(), new b365.Ui.Betslip.ViewResetter(this._bsInst).reset(), this._bsInst.addReceiptFooterLinks(), new b365.Ui.Betslip.FooterLinksSlipRender(this._bsInst,
    $(".footer")).render())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastBreakdownRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.CastBreakdownRequestDespatcher.prototype = {despatch: function (n) {
  this._isValid() && this._bsInst.req(this._bsInst.reqTypeBetBrk,
    new b365.Ui.Betslip.BetBreakdownKeyGenerator(this._bsInst, this._bsInst.getBetItemById(this._bsInst.itemTypeCast, n), this._bsInst.itemTypeCast,
      n).generate())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AusToteToolTipHtmlBuilder = function () {
};
b365.Ui.Betslip.AusToteToolTipHtmlBuilder.prototype = {getHtml: function (n) {
  return"<span>" + n + "<\/span>"
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.SingleToolTipHtmlBuilder = function () {
  this._alwaysInclude = "*~"
};
b365.Ui.Betslip.SingleToolTipHtmlBuilder.prototype = {getHtml: function (n, t) {
  var r = n.find("input[data-inp-type='ewcb']").length > 0 || t.length >= 3 && t[2].startsWith(this._alwaysInclude), u, i;
  return r && (t[2] = t[2].replace(this._alwaysInclude, "")), u = n.hasClass("hdCap"), i = "<label class='ttHead'>" + t[0] + "<\/label><br />", i += t[1] &&
    t[1].length > 0
    ? "<label>" + t[1] + "<\/label><br />"
    : "", i += "<label>", i += $(".betslipWrapper .betReceipt").length == 0 && n.children("div.pitcher").length > 0
    ? n.find("div.pitcher").find(".pitcher-sel")[0].options[0].selected
    ? t[3]
    : "(" + n.find("div.pitcher .pitcher-sel>option:selected").text() + ")"
    : t[3] && t[3].length > 0
    ? t[3]
    : "", i += (u
    ? " " + n.find(".hdCapDisplay").text()
    : "") + "<\/label><br/>", t.length == 5 && t[4] != "" && (i += "<label>" + t[4] + "<\/label><br />"), r && (i += t[2]), i
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToteSingleToolTipHtmlBuilder = function () {
};
b365.Ui.Betslip.ToteSingleToolTipHtmlBuilder.prototype = {getHtml: function (n) {
  var t = "", r;
  return n.length > 2 && n[2].length > 0 && n[2].indexOf("#") > -1 &&
    (r = n[i].split("#"), t += "<br /><label>" + r[0] + " (" + r[1] + ")<\/label>"), t += "<br /><label>" + n[3] + "<\/label>", "<label class='ttHead'>" +
    n[0] + "<\/label><br /><label>" + n[1] + "<\/label>" + t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.UKToteBetStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._stakeCookieKey = "st";
  this._eachWayCookieKey = "ew";
  this._betCountCookieKey = "bc";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.UKToteBetStakeChangedHandler.prototype = {handle: function (n) {
  var e, o;
  if (this._isValid()) {
    var b = $(n), s = new b365.Ui.Betslip.ItemInformation(n), h = s.itemIndexAndType(), c = s.itemElement();
    $blib.isDecimal(n.value) == !1 && (n.value = "");
    var w = n.getAttribute("data-no-convert")
      ? !0
      : !1, t = new b365.Ui.Formatter, i = Number($(".betslipWrapper>ul:first-child").attr("data-xrte"));
    (i == 0 || w == !0) && (i = 1);
    var l = Math.pow(10, t.numDecPlcs(i)), r = this._bsInst.getBetItemById(h[1], h[0]), u = r.getStItem(this._betCountCookieKey);
    typeof u == "undefined" && (u = 1);
    r.getStItem(this._eachWayCookieKey) == "1" && (u = u * 2);
    var f = t.roundValue(n.value), a = Math.pow(10, t.numDecPlcs(f)), v = t.roundDecimal(String(u * f)), y = $(".totestkbc", c), p = $(".totestkuc", c);
    y.length > 0 || p.length > 0
      ? (e = i == 0
      ? 0
      : t.roundDecimal(String(Number(f) * a * i * l / l / a)), o = i == 0
      ? 0
      : t.roundDecimal(String(e * u)), p.text(o == "0"
      ? ""
      : o), r.setStItem("st", e), y.text(v == "0"
      ? ""
      : v))
      : r.setStItem("st", f);
    r.setStItem("gust", f);
    r.setStItem("gst", f)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.USToteBetStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._stakeCookieKey = "st";
  this._eachWayCookieKey = "ew";
  this._betCountCookieKey = "bc";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.USToteBetStakeChangedHandler.prototype = {handle: function (n) {
  var o, e, s, h;
  if (this._isValid()) {
    var d = $(n), c = new b365.Ui.Betslip.ItemInformation(n), l = c.itemIndexAndType(), a = c.itemElement();
    $blib.isDecimal(n.value) == !1 && (n.value = "");
    var v = n.getAttribute("data-no-convert")
      ? !0
      : !1, t = new b365.Ui.Formatter, i = Number($(".betslipWrapper>ul:first-child").attr("data-xrte"));
    (i == 0 || v == !0) && (i = 1);
    o = Math.pow(10, t.numDecPlcs(i));
    e = Number($(".betslipWrapper>ul:first-child").attr("data-xrte-us"));
    (e == 0 || v == !0) && (e = 1);
    var y = Math.pow(10, t.numDecPlcs(e)), r = this._bsInst.getBetItemById(l[1], l[0]), u = r.getStItem(this._betCountCookieKey);
    typeof u == "undefined" && (u = 1);
    r.getStItem(this._eachWayCookieKey) == "1" && (u = u * 2);
    var f = t.roundValue(n.value), p = Math.pow(10, t.numDecPlcs(f)), w = t.roundDecimal(String(u * f)), b = $(".totestkbc", a), k = $(".totestkuc", a);
    b.length > 0 || k.length > 0
      ? (s = i == 0
      ? 0
      : t.roundDecimal(String(Number(f) * p * e * y / y / p * i * o / o)), h = i == 0
      ? 0
      : t.roundDecimal(String(s * u)), k.text(h == "0"
      ? ""
      : h), r.setStItem("st", s), b.text(w == "0"
      ? ""
      : w))
      : r.setStItem("st", f);
    r.setStItem("gust", f);
    r.setStItem("gst", f)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToteStakeChangedHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ToteStakeChangedHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    switch (this._bsInst.getSlipType()) {
      case this._bsInst.slipUKTote:
        new b365.Ui.Betslip.UKToteBetStakeChangedHandler(this._bsInst).handle(n);
        break;
      case this._bsInst.slipUSTote:
        new b365.Ui.Betslip.USToteBetStakeChangedHandler(this._bsInst).handle(n);
        break;
      default:
        new b365.Ui.Betslip.UKToteBetStakeChangedHandler(this._bsInst).handle(n)
    }
    this._bsInst.updateState()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ToteCastToolTipHtmlBuilder = function () {
};
b365.Ui.Betslip.ToteCastToolTipHtmlBuilder.prototype = {getHtml: function (n, t) {
  return"<label class='ttHead'>" + t[0] + "<\/label><br /><label>" + t[1] + "<\/label><br/>" + $(n).closest(".bs-tt").html()
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.TotePotToolTipHtmlBuilder = function () {
};
b365.Ui.Betslip.TotePotToolTipHtmlBuilder.prototype = {getHtml: function (n) {
  return"<label class='ttHead'>" + n[0] + "<\/label><br /><label>" + n[1] + "<\/label><br /><label>" + n[2] + "<\/label>"
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.TotePotLegDeleteExecutor = function (n, t, i, r) {
  this._bsInst = n;
  this._legIndex = i;
  this._legType = r;
  this._legEle = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._legIndex != "undefined" && typeof this._legType != "undefined" &&
      typeof this._legEle != "undefined"
  }
};
b365.Ui.Betslip.TotePotLegDeleteExecutor.prototype = {execute: function () {
  var n, r, i, u;
  if (this._isValid()) {
    var c = new b365.Ui.Betslip.ItemInformation(this._legEle.parentNode), s = c.itemIndexAndType(), h = this._bsInst.getBetItemById(s[1],
      s[0]), f = this._legIndex.split(":"), e = h.getCnItem("fp").split(","), t = e[f[0] - 1].split("-"), l = t.length, o = -1;
    for (n = l - 1; o < 0; n--)o = t[n].startsWith(f[1])
      ? n
      : -1;
    for (t.splice(o, 1), r = "", n = 0; n < e.length; n++) {
      if (i = e[n], n == f[0] - 1)for (i = "", u = 0; u < t.length; u++)i += (i.length > 0
        ? "-"
        : "") + t[u];
      r += (r.length > 0
        ? ","
        : "") + i
    }
    h.setCnItem("fp", r);
    this._bsInst.updateState();
    this._bsInst.req(this._bsInst.reqTypeRefreshSlip)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ConfirmBetRequestDespatcher = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ConfirmBetRequestDespatcher.prototype = {despatch: function () {
  this._isValid() && new b365.Ui.Betslip.Validation.PlaceBetValidator(this._bsInst, this._bsController).validate() &&
  this._bsInst.req(this._bsInst.reqTypeConfirmBet)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PitcherDetailsRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PitcherDetailsRequestDespatcher.prototype = {despatch: function (n) {
  if (this._isValid()) {
    var t = n.target;
    t.tagName == "A" && this._bsInst.req(this._bsInst.reqTypePitcher, "key=B-" + t.href.split("_")[1])
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.CastToolTipHtmlBuilder = function () {
};
b365.Ui.Betslip.CastToolTipHtmlBuilder.prototype = {getHtml: function (n, t) {
  return"<label class='ttHead'>" + t[0] + "<\/label><br /><label>" + t[1] + "<\/label><br />" + $(n).find(".bs-tt").html()
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.TeaserChangeHandler = function (n) {
  this._bsInst = n;
  this._teaserItemCookieKey = "ti";
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.TeaserChangeHandler.prototype = {handle: function (n) {
  if (this._isValid()) {
    var t = n.target;
    bs.setValueInBSCookie("ti", t.options[t.selectedIndex].value);
    bs.updateState();
    bs.refresh(bs.betTypeAll)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.AusToteChangeHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.AusToteChangeHandler.prototype = {handle: function (n, t, i) {
  if (this._isValid()) {
    console.log(1);
    var r = $(n.target), f = this._bsInst.getBetItemById(i, t), u = $(r).find("option:selected");
    f.setStItem("atc", u.val());
    $(r).parent(".betslip-select").attr("data-text", u.text());
    this._bsInst.updateState()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ForeignToteConstructCorrector = function (n, t) {
  this._bsInst = n;
  this._construct = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._construct != "undefined"
  }
};
b365.Ui.Betslip.ForeignToteConstructCorrector.prototype = {GetCorrectedConstruct: function () {
  if ($.isArray(this._construct))for (var n = 0; n < this._construct.length; n++)(this._construct[n].cmask == "1" || this._construct[n].cmask == "2" ||
    this._construct[n].cmask == "3" || this._construct[n].cmask == "4") && (this._construct[n].ctype = "C");
  return this._construct
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PollingExpiredHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PollingExpiredHandler.prototype = {handle: function (n) {
  this._isValid() && (n[0] === this._bsInst.reqTypePollTempBetReceipt &&
    $("#bsDiv").find("[id^=tempbetstatus_title_].pending").removeClass("pending").addClass("timedout"), this._bsInst.resetPoll(), new b365.Ui.Betslip.LockUnlockHandler(this._bsInst,
    this._bsController).handle(!1, !1), new b365.Ui.Betslip.InProgressDisplayHandler(this._bsInst).handle(["hide", betSlipML.pleasecheckmembers]))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PollBetRequestDespatcher = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.PollBetRequestDespatcher.prototype = {despatch: function (n) {
  if (this._isValid()) {
    var t = "";
    n[1] && n[1].length > 0 && (t = "br=" + n[1]);
    n.length > 2 && n[2] && n[2].length > 0 && (t.length > 0 && (t += "&"), t += n[2]);
    this._bsInst.req(n[0], t)
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetBreakdownKeyGenerator = function (n, t, i, r) {
  this._bsInst = n;
  this._item = t;
  this._itemType = i;
  this._itemIndex = r;
  this._betTypeIDCookieKey = "id";
  this._eachWayCookieKey = "ew";
  this._fixtureCookieKey = "f";
  this._fixtureParticipantCookieKey = "fp";
  this._stakeCookieKey = "st";
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._item != "undefined" && typeof this._itemType != "undefined" &&
      typeof this._itemIndex != "undefined"
  };
  this._getStake = function () {
    return this._item.getStItem(this._stakeCookieKey) === undefined
      ? "0"
      : String(parseInt(this._item.getStItem(this._stakeCookieKey) * 100))
  };
  this._isEachWay = function () {
    return this._item.getStItem(this._eachWayCookieKey) && this._item.getStItem(this._eachWayCookieKey) == "1"
      ? !0
      : !1
  };
  this._getCastKey = function () {
    return"key=C-" + (this._getStake(this._item) + "-" + String(Number(this._itemIndex) + 1) + "-0")
  };
  this._getMultiplesKey = function () {
    return"key=M-" + (this._getStake(this._item) + "-" + this._item.getCnItem(this._betTypeIDCookieKey) + "-" + (this._isEachWay()
      ? "1"
      : "0"))
  };
  this._getSingleKey = function () {
    return"key=N-" +
      (this._getStake(this._item) + "-" + this._item.getCnItem(this._fixtureCookieKey) + "-" + this._item.getCnItem(this._fixtureParticipantCookieKey) + "-" +
        (this._isEachWay()
          ? "1"
          : "0"))
  }
};
b365.Ui.Betslip.BetBreakdownKeyGenerator.prototype = {generate: function () {
  var n = null;
  if (this._isValid())switch (this._itemType) {
    case this._bsInst.itemTypeMultiple:
      n = this._getMultiplesKey();
      break;
    case this._bsInst.itemTypeCast:
      n = this._getCastKey();
      break;
    default:
      n = this._getSingleKey()
  }
  return n
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.BetSlipPopUpMessageController = function (n) {
  this._bsContext = n;
  this._messageTimeout = function () {
    window.clearTimeout(this._autoCloseTimer);
    this.HideMessage()
  };
  this._clearPopUpShowingClass = function () {
    $(".showing-fade-popup").removeClass("showing-fade-popup")
  };
  this._eventTargetElement = $(".betSlipPopupHeader>a>span:first-child");
  $(document).on("bsInfoMessage", $.proxy(this.ShowMessage, this));
  $(document).on("HideBsInfoMessage", $.proxy(this.HideMessage, this))
};
b365.Ui.Betslip.BetSlipPopUpMessageController.prototype = {ShowMessage: function (n, t, i) {
  var r = this, u, s, h;
  if (r._bsContext.IsPortraitMode() && r._bsContext.IsPrematch() && !$(".betslipWrapper").is(":visible")) {
    r._eventTargetElement = typeof window.MyBetsController != "undefined" && window.MyBetsController.isInitialised()
      ? $("#myBetsHeader>ul>li:first-child")
      : $(".betSlipPopupHeader>a>span:first-child");
    u = $("#ttDivFade");
    u.removeClass("ttHidden");
    r._autoCloseTimer != -1 && r._messageTimeout();
    r._clearPopUpShowingClass();
    r._eventTargetElement.addClass("showing-fade-popup");
    i || (i = 140);
    $.isNumeric(i) || (i = parseInt(i.replace(/px/g, "").replace(/;/g, "")));
    u.find(".cnt").html(t).css("max-width", i).css("width", i);
    var f = 10, e = r._eventTargetElement.offset(), o = r._eventTargetElement.outerHeight(!0);
    o && (f = o);
    s = e.top + f + 4;
    h = e.left + r._eventTargetElement.outerWidth(!0) / 2 - i / 2;
    u.css("top", s).css("left", h).css("max-width", i + "px").css("width", i + "px");
    u.fadeIn();
    this._autoCloseTimer = window.setTimeout(Function.createDelegate(r, r._messageTimeout), 3500)
  }
  n.stopPropagation()
}, HideMessage: function () {
  this._clearPopUpShowingClass();
  $("#ttDivFade").fadeOut().addClass("ttHidden")
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.TaxCalculator = function (n) {
  this._bsInst = n;
  this._taxRates = 0;
  this._taxCalculationMethod = "";
  var t = $(".betslipWrapper>ul").attr("data-txr"), i = $(".betslipWrapper>ul").attr("data-tcm");
  typeof t != "undefined" && (this._taxRates = t);
  typeof i != "undefined" && (this._taxCalculationMethod = i);
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.TaxCalculator.prototype = {getstakeToTax: function (n, t, i) {
  return t == -1
    ? i - n
    : i <= t
    ? i - n
    : t - n
}, parseTaxRateForStakeAndCalculateTotalReturns: function (n, t) {
  for (var p = new b365.Ui.Formatter, r = 0, u = 0, s = 0, w = this._taxRates.toString(), e = w.split("#"), b = Number(p.roundValue(String(n))), l = t *
    b, a = Number(0), v = Number(0), i, f, o, y, h, c, r = 0; r < e.length; r++)i = e[r].split(","), i.length > 4 &&
    (f = Number(i[0]), o = Number(i[1]), y = Number(i[2]), h = Number(i[3]), c = Number(i[4]), l > f && (a = this.getstakeToTax(f, o, l), u = u + a * h));
  for (u = u + n, r = 0; r < e.length; r++)i = e[r].split(","), i.length > 4 &&
    (f = Number(i[0]), o = Number(i[1]), y = Number(i[2]), h = Number(i[3]), c = Number(i[4]), u > f && (v = this.getstakeToTax(f, o, u), s = s + v * c));
  return s
}, calcReturnsByLine: function (n, t) {
  n = isNaN(n)
    ? 0
    : Number(n);
  var i = 0, u = eval(t), r;
  return isNaN(u)
    ? 0
    : (this._taxCalculationMethod == 2
    ? (r = n * 100 % 100, r > 0 && (r = r / 100, i = this.parseTaxRateForStakeAndCalculateTotalReturns(r, u)), n = Math.floor(n), i = i +
    n * this.parseTaxRateForStakeAndCalculateTotalReturns(1, u))
    : i = this.parseTaxRateForStakeAndCalculateTotalReturns(n, u), parseFloat((Math.floor(i * 100) / 100).toFixed(2)))
}};
BetSlipDelegates.prototype.isPortraitMode = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsPortraitMode
    ? n._bsContext.IsPortraitMode()
    : !1
};
BetSlipDelegates.prototype.isPrematch = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsPrematch
    ? n._bsContext.IsPrematch()
    : !1
};
BetSlipDelegates.prototype.isKeyPadSupported = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsKeyPadSupported
    ? n._bsContext.IsKeyPadSupported()
    : !1
};
BetSlipDelegates.prototype.isAuthenticated = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsAuthenticated
    ? n._bsContext.IsAuthenticated()
    : !1
};
BetSlipDelegates.prototype.updateBalance = function () {
  var n = this;
  n._bsContext && n._bsContext.UpdateBalance && n._bsContext.UpdateBalance()
};
BetSlipDelegates.prototype.showOverlay = function () {
  var n = this;
  n._bsContext && n._bsContext.ShowPleaseWaitSpinner && n._bsContext.ShowPleaseWaitSpinner()
};
BetSlipDelegates.prototype.hideOverlay = function () {
  var n = this;
  n._bsContext && n._bsContext.HidePleaseWaitSpinner && n._bsContext.HidePleaseWaitSpinner()
};
BetSlipDelegates.prototype.showTooltip = function (n) {
  var t = this;
  t._bsContext && t._bsContext.ShowTooltip && t._bsContext.ShowTooltip(n)
};
BetSlipDelegates.prototype.hideTooltip = function () {
  var n = this;
  n._bsContext && n._bsContext.HideTooltip && n._bsContext.HideTooltip()
};
BetSlipDelegates.prototype.showLoginPage = function () {
  var n = this;
  n._bsContext && n._bsContext.ShowLoginPage && n._bsContext.ShowLoginPage()
};
BetSlipController.prototype.GetBetSlipMode = function () {
  var n = this;
  return new b365.Ui.Betslip.ModeResolver(n._bsInst).resolve()
};
BetSlipController.prototype.SetBetSlipTextBoxMinValues = function () {
  this._setTextBoxesMinNumeric()
};
BetSlipController.prototype.OnItemBetMax = function (n) {
  new b365.Ui.Betslip.BetMaxRequestDespatcher(this._bsInst, this).despatch(n)
};
BetSlipController.prototype.OnItemStakeChanged = function (n) {
  new b365.Ui.Betslip.StakeChangedHandler(this._bsInst).handle(n)
};
BetSlipController.prototype.SetCurrentDialogRef = function (n) {
  this._dlg = n
};
BetSlipController.prototype.GetCurrentDialogRef = function () {
  return this._dlg
};
BetSlipController.prototype.ClearCurrentDialogRef = function () {
  this._dlg = null
};
BetSlipController.prototype.HideBetSlipKeyPad = function () {
  this._delegates.isKeyPadSupported() && this._stakeEntryHander._hideKeyPad()
};
BetSlipController.prototype.CloseCurrentDialogClearRef = function () {
  if (this._dlg !== null) {
    try {
      this._dlg.hideDialog()
    }
    catch (n) {
    }
    this._dlg = null
  }
};
BetSlipController.prototype.OnBetslipContentLoaded = function () {
  new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle();
  new b365.Ui.Betslip.ToggleMultiples(this._bsInst).reset();
  this._suspendSelections();
  typeof this._stakeEntryHander != "undefined" && this._stakeEntryHander.init();
  $(".betslipWrapper .betslip-select select").on("click change customselect",function () {
    $(this).parent().attr("data-text", $(this).find(":selected").text())
  }).trigger("customselect");
  (new b365.Ui.Betslip.DisplayFormatter).format();
  this._delegates.updateBalance();
  $(".betslipWrapper").trigger("b365.Ui.Betslip.contentloaded");
  this._bsInst.betSlipLoaded()
};
BetSlipController.prototype.initialiseWithParticipantInformation = function (n) {
  var i = this, t = "";
  t += "participantid=" + (n.id
    ? n.id
    : "") + "&";
  t += "pcode=" + (n.code
    ? n.code
    : "") + "&";
  t += "ptype=" + (n.type
    ? n.type
    : "") + "&";
  t += "odds=" + (n.odds
    ? n.odds
    : "") + "&";
  i.initialise();
  i._bsInst.req(i._bsInst.reqTypeConstructAndAddItems, t)
};
BetSlipController.prototype.initialise = function () {
  var n = this, t;
  n.initialiseStakeEntry();
  n._bsInst.betSource = n.betSource();
  n._bsInst.showStreaming = n.showStreaming();
  n._bsInst.isQuickBet = n._bsContext.IsQuickBetMethod || function () {
    return!1
  };
  n._bsInst.showFullTextMode = n.showFullTextMode();
  n._bsInst.showFixtureDate = n.showFixtureDate();
  n._bsInst.keyboardType = n.getKeyboardType();
  n._bsInst.refreshUserBalance = n.getRefreshUserBalance();
  n._bsInst.isoCode = n.getIsoCode();
  t = n._bsInst.getValueFromBSCookie("processed").replace("||", "");
  t == "true" && new b365.Ui.Betslip.ViewResetter(n._bsInst).reset()
};
BetSlipController.prototype.initialiseStakeEntry = function () {
  var n = this;
  typeof this._stakeEntryHander != "undefined" && this._stakeEntryHander.detach();
  this._stakeEntryHander = n._delegates.isKeyPadSupported()
    ? new BetSlipKeyPadController("#sbRMN", "#RHSScroller", this, function (n) {
    return new b365.Ui.Betslip.ItemInformation(n).itemIndex()[0]
  }, this.OnItemStakeChanged, function (n) {
    return $(n).prop("disabled") || $(n).parents().hasClass("suspended")
      ? !1
      : !0
  }, this.OnItemBetMax, b365.Ui.Betslip.KeyPadOffSetProvider, n)
    : n.isStakeIncrementSupported()
    ? new b365.Ui.Betslip.StakeEntryIncrements(n._bsInst, n)
    : new b365.Ui.Betslip.StakeEntryKeyboard(n._bsInst)
};
BetSlipController.prototype.addBet = function (n) {
  new b365.Ui.Betslip.AddBetHandler(this._bsInst, this).handle(n)
};
BetSlipController.prototype.deleteBet = function (n) {
  new b365.Ui.Betslip.DeleteBetHandler(this._bsInst, this).handle(n)
};
BetSlipController.prototype.placeBet = function () {
  var n = this;
  n._bsInst.req(n._bsInst.reqTypePlaceBet)
};
BetSlipController.prototype.removeBets = function () {
  var n = this;
  new b365.Ui.Betslip.RemoveAllItemsRequestDespatcher(n._bsInst, n).despatch(null)
};
BetSlipController.prototype.loadAddedItems = function () {
  var n = this;
  n._bsInst.req(n._bsInst.reqTypeAddItems)
};
BetSlipController.prototype.refreshBetslip = function () {
  var n = this;
  n._bsInst.req(n._bsInst.reqTypeRefreshSlip)
};
BetSlipController.prototype.initiatePhoneBetRequest = function (n) {
  new b365.Ui.Betslip.PhoneBetHandler(this._bsInst, this).initiate(n)
};
BetSlipController.prototype.hideBetSlip = function () {
  var n = this;
  n._bsInst.hideBetSlip()
};
BetSlipController.prototype.joinNow = function () {
  var n = this;
  n._bsContext && n._bsContext.JoinNow && n._bsContext.JoinNow()
};
BetSlipController.prototype.deposit = function (n) {
  var t = this;
  t._bsContext && t._bsContext.Deposit && t._bsContext.Deposit(n)
};
BetSlipController.prototype.onStreamingClick = function (n) {
  var t = this;
  t._bsContext && t._bsContext.OnStreamingClick && t._bsContext.OnStreamingClick(n)
};
BetSlipController.prototype.isStakeIncrementSupported = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsStakeIncrementSupported
    ? n._bsContext.IsStakeIncrementSupported()
    : !1
};
BetSlipController.prototype.isReqOnBetAddedEnabled = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsReqOnBetAddedEnabled
    ? n._bsContext.IsReqOnBetAddedEnabled()
    : !0
};
BetSlipController.prototype.isReqOnBetDeletedEnabled = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsReqOnBetDeletedEnabled
    ? n._bsContext.IsReqOnBetDeletedEnabled()
    : !0
};
BetSlipController.prototype.showConfirmation = function (n, t, i, r, u, f, e) {
  var s = {Controller: n, Title: t, Msg: i, Button1Text: r, Button1Action: u, Button2Text: f, Button2Action: e}, o = this;
  o._bsContext && o._bsContext.ShowConfirmation && o._bsContext.ShowConfirmation(s)
};
BetSlipController.prototype.showDialog = function (n, t) {
  var r = {Controller: n, MarkUp: t}, i = this;
  i._bsContext && i._bsContext.ShowDialog && i._bsContext.ShowDialog(r)
};
BetSlipController.prototype.betSource = function () {
  var n = this;
  return n._bsContext && n._bsContext.BetSource
    ? n._bsContext.BetSource()
    : ""
};
BetSlipController.prototype.showFullTextMode = function () {
  var n = this;
  return n._bsContext && n._bsContext.ShowFullTextMode
    ? n._bsContext.ShowFullTextMode()
    : !1
};
BetSlipController.prototype.showFixtureDate = function () {
  var n = this;
  return n._bsContext && n._bsContext.ShowFixtureDate
    ? n._bsContext.ShowFixtureDate()
    : !1
};
BetSlipController.prototype.showStreaming = function () {
  var n = this;
  return n._bsContext && n._bsContext.ShowStreaming
    ? n._bsContext.ShowStreaming()
    : !1
};
BetSlipController.prototype.getRefreshUserBalance = function () {
  var n = this;
  return n._bsContext && n._bsContext.RefreshUserBalance
    ? n._bsContext.RefreshUserBalance()
    : !0
};
BetSlipController.prototype.getIsoCode = function () {
  var n = this;
  return n._bsContext && n._bsContext.IsoCode
    ? n._bsContext.IsoCode()
    : ""
};
BetSlipController.prototype.getKeyboardType = function () {
  var n = this;
  return n._bsContext && n._bsContext.KeyboardType
    ? n._bsContext.KeyboardType()
    : ""
};
BetSlipController.prototype.itemsRemoved = function (n, t) {
  var r = {Id: n
    ? n
    : null, CheckSuspended: t
    ? t
    : null}, i = this;
  i._bsContext && i._bsContext.ItemsRemoved && i._bsContext.ItemsRemoved(r)
};
BetSlipController.prototype.addOnBetSlipLoaded = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetSlipLoaded(n)
};
BetSlipController.prototype.addOnBetAdded = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetAdded(n)
};
BetSlipController.prototype.addOnBetAddedReqComplete = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetAddedReqComplete(n)
};
BetSlipController.prototype.addOnEditBet = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnEditBet(n)
};
BetSlipController.prototype.addOnRefreshReqComplete = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnRefreshReqComplete(n)
};
BetSlipController.prototype.addOnBetSlipItemsChanged = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetSlipItemsChanged(n)
};
BetSlipController.prototype.addOnAcceptChanges = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnAcceptChanges(n)
};
BetSlipController.prototype.addOnMaxSelections = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnMaxSelections(n)
};
BetSlipController.prototype.addOnBetslipDisplayed = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetslipDisplayed(n)
};
BetSlipController.prototype.addOnPlaceBet = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnPlaceBet(n)
};
BetSlipController.prototype.addOnPlaceBetSuccess = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnPlaceBetSuccess(n)
};
BetSlipController.prototype.addOnAddBetslipFooterLinks = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnAddBetslipFooterLinks(n)
};
BetSlipController.prototype.addOnAddReceiptFooterLinks = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnAddReceiptFooterLinks(n)
};
BetSlipController.prototype.addOnBetslipError = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnBetslipError(n)
};
BetSlipController.prototype.addOnShowBetSlip = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnShowBetSlip(n)
};
BetSlipController.prototype.addOnHideBetSlip = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnHideBetSlip(n)
};
BetSlipController.prototype.addOnChangeBetslipHeight = function (n) {
  var t = this;
  t._instanceEventAttacher.addOnChangeBetslipHeight(n)
};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.FooterLinksReceiptRender = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._footerLinks = this._bsInst.footerLinks
};
b365.Ui.Betslip.FooterLinksReceiptRender.prototype = {render: function () {
  var t, n, i;
  if (this._isValid && this._footerLinks && this._footerLinks.length > 0)for (t = 0; t < this._footerLinks.length; t++)n = this._footerLinks[t], i = $("<a/>",
    {"class": n.cssClass, html: n.text}), n.handler && i.click(n.handler), i.appendTo(".footerLinks");
  this._bsInst.footerLinks = null
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.FooterLinksSlipRender = function (n, t) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  };
  this._footerLinks = this._bsInst.footerLinks;
  this._targetElem = t
};
b365.Ui.Betslip.FooterLinksSlipRender.prototype = {render: function () {
  var t, n, i;
  if (this._isValid && this._footerLinks && this._footerLinks.length > 0)for (t = 0; t < this._footerLinks.length; t++)n = this._footerLinks[t], i = $("<a/>",
    {"class": n.cssClass, html: n.text}), n.handler && i.click(n.handler), i.appendTo(this._targetElem);
  this._bsInst.footerLinks = null
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.OnStreamingClickHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.OnStreamingClickHandler.prototype = {click: function (n) {
  var t = {cId: n.attr("data-cid"), mediaId: n.attr("data-mediaid"), fixtureId: n.attr("data-fixid"), streamProvId: n.attr("data-stpid")};
  this._bsController.onStreamingClick(t)
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.DuplicateBetHandler = function (n) {
  this._bsInst = n;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.DuplicateBetHandler.prototype = {handle: function () {
  this._isValid && (new b365.Ui.Betslip.ViewResetter(this._bsInst).reset(), new b365.Ui.Betslip.InProgressDisplayHandler(this._bsInst).handle(
    ["hide", betSlipML.pleasecheckmembers]))
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ViewResetter = function (n) {
  this._bsInst = n;
  this._bsWrapper = $(".betslipWrapper");
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ViewResetter.prototype = {reset: function () {
  this._isValid() &&
  (this._bsInst.clearBets(!1), new b365.Ui.Betslip.UpdateStateHandler(this._bsInst).handle(), new b365.Ui.Betslip.LockUnlockHandler(this._bsInst,
    this._bsController).handle(!1, !1), $(".emptyBetslip", this._bsWrapper).removeClass("hidden"), $(".single-section, .multiple-section, .cast-section",
    this._bsWrapper).remove(), $("a.placeBet", this._bsWrapper).disableElement("disabled"), $("select.bet-slip-type",
    this._bsWrapper).disableElement(), $(".totals", this._bsWrapper).hide())
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.PhoneBetHandler = function (n, t) {
  this._bsInst = n;
  this._controller = t;
  this._popup = null;
  this._isValid = function () {
    return typeof this._bsInst != "undefined" && typeof this._controller != "undefined"
  }
};
b365.Ui.Betslip.PhoneBetHandler.prototype = {initiate: function (n) {
  $("#phoneBetOverlay").length == 0 && (this.addOverlay(), this._bsInst.refresh(this._bsInst.reqTypePhoneBet, "cs=" + encodeURIComponent(n)))
}, displayPopup: function (n) {
  n && this.addPopup(n)
}, addPopup: function (n) {
  this._popup = $(n);
  this._popup.css({top: this.getPopupTopPosition()});
  this.addPopupListeners();
  $("body").append(this._popup)
}, addPopupListeners: function () {
  $("#closeIcon", this._popup).on("click", $.proxy(function () {
    this.removePopup();
    this.removeOverlay()
  }, this));
  var n = this;
  $(window).off("resize.phonepopup").on("resize.phonepopup", function () {
    n._popup.css({top: n.getPopupTopPosition(0)})
  })
}, addOverlay: function () {
  var n = $("<div/>", {id: "phoneBetOverlay", css: {height: document.body.scrollHeight}});
  $("body").append(n)
}, removePopup: function () {
  this._popup.remove()
}, removeOverlay: function () {
  $("#phoneBetOverlay").remove()
}, getPopupTopPosition: function (n) {
  var t = typeof n != "undefined"
    ? n
    : $(window).scrollTop();
  return Math.round($(window).height() * .15) + t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.MaintenanceMessageHandler = function () {
  this._popup = null;
  this._isValid = function () {
    return!0
  }
};
b365.Ui.Betslip.MaintenanceMessageHandler.prototype = {displayPopup: function (n) {
  n && (this.addOverlay(), this.addPopup(n))
}, addPopup: function (n) {
  var t = '<div class="popupContainer maintenanceMessage"><div class="popupHeader"><\/div><div class="popupText"><div>' + n +
    '<\/div><div class="greenButton" id="okButton">OK<\/div><\/div><\/div>';
  this._popup = $(t);
  this._popup.css({top: this.getPopupTopPosition()});
  this.addPopupListeners();
  $("body").append(this._popup)
}, addPopupListeners: function () {
  $("#okButton", this._popup).on("click", $.proxy(function () {
    this.removePopup();
    this.removeOverlay()
  }, this));
  var n = this;
  $(window).off("resize.maintenancepopup").on("resize.maintenancepopup", function () {
    n._popup.css({top: n.getPopupTopPosition(0)})
  })
}, addOverlay: function () {
  var n = $("<div/>", {id: "maintenanceMessageOverlay", css: {height: document.body.scrollHeight}});
  $("body").append(n)
}, removePopup: function () {
  this._popup.remove()
}, removeOverlay: function () {
  $("#maintenanceMessageOverlay").remove()
}, getPopupTopPosition: function (n) {
  var t = typeof n != "undefined"
    ? n
    : $(window).scrollTop();
  return Math.round($(window).height() * .15) + t
}};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ParlayTeaserBetSlipClickHandler = function (n, t) {
  this._bsController = n;
  this._bsInst = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipClickHandler.prototype = {handle: function (n) {
  var r = n.target, i = !1, t = $(r);
  this._isValid() && (t.attr("id") == "srules"
    ? ($("#srules").hide(), $("#hrules").show(), t.parents(".bdr").next().show(), i = !0)
    : t.attr("id") == "hrules"
    ? ($("#srules").show(), $("#hrules").hide(), t.parents(".bdr").next().hide(), i = !0)
    : t.attr("class") == "removeAll"
    ? (this._bsInst.clearBets(!1), $(".ptbswrapper").trigger("b365.Ui.Betslip.removingall"), i = !0)
    : t.attr("id") == "ptpbet"
    ? t.hasClass("disabled")
    ? this._bsController.totalStake() > 0 && !this._bsController._delegates.isAuthenticated() &&
    (this._bsController.showMessage(betSlipML.logintoplacebet), i = !0)
    : (this._bsInst.setClearOnAdd(!0), this._bsController._delegates.showOverlay(), this._bsController.loadBetReceipt($("#ptbetslip").attr("data-sportskey")))
    : t.attr("id") == "ptcbet"
    ? (this._bsController._delegates.showOverlay(), this._bsController.onContinueBetting(), i = !0)
    : t.attr("id") == "bmlnk" && (this._bsController.getBetMax(t.attr("data-bettypeid")), i = !0));
  i && (n.stopPropagation(), n.preventDefault())
}};
b365.Ui.Betslip.ParlayTeaserBetSlipController = function (n, t) {
  var i = this;
  this._bsInst = n;
  this._dlg = null;
  this._bsContext = t;
  this._delegates = new BetSlipDelegates(t);
  this._events = new Sys.EventHandlerList;
  this._bsInst.addOnReqComplete(function (n, t) {
    i._OnContentLoaded(n, t)
  });
  this._bsInst.addOnUpdateState(function (n, t) {
    new b365.Ui.Betslip.UpdateStateHandler(n).handle(t)
  });
  new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle();
  this._keyPadOffsetProvider = function () {
    return{cursorVerticalOffset: 6, cursorHorizontalOffset: 0, keyPadVerticalOffset: 12, keyPadHorizontalOffset: 0}
  };
  this.getHandler = function (n) {
    return this._events.getHandler(n)
  };
  this._updateStkTw = function (n) {
    var t = $getItemIdSuffix(n, "mltpt_"), i;
    t >= 0 && (i = this._bsInst.getBetItemById(bs.betTypeMultiple, t), $blib.isDecimal(n.value) == !0 &&
      (n.value = $blib.roundValue(n.value), Number(n.value) > $blib.getMaxStake() && (n.value = String($blib.getMaxStake()))), this._updateMltValues(i, t,
      n.value), this._bsInst.updateState(), this._updateTotals())
  };
  this._updateMltValues = function (n, t, i) {
    var f = $get("mltpt_" + t), e = $get("mstk", f), o = $get("mtowin", f);
    if (e && o) {
      var s = Number(n.getCnItem("bc", "1")), h = Number(n.getStItem("twm", "1")), c = $blib.pad2DP(String(i)), u = Number($blib.pad2DP(String(i *
        s))), r, l = new b365.Ui.Betslip.TaxCalculator(this._bsInst);
      r = l.calcReturnsByLine(u, h);
      r = $blib.pad2DP(String(r));
      e.innerHTML = u > 0
        ? u
        : "";
      o.innerHTML = r > 0
        ? r
        : "";
      n.setStItem("st", u);
      n.setStItem("tr", r);
      n.setStItem("ust", c)
    }
  };
  this._updateTotals = function () {
    for (var r = $get("tstake"), u = $get("twin"), t = this._bsInst.getBetItems(this._bsInst.betTypeMultiple), f = $blib.calcTotalStake(t,
      "ust"), e = 0, i, n = 0; n < t.length; n++)i = Number(t[n].getStItem("tr")), isNaN(i) === !1 && (e += Number(i));
    r && (r.innerHTML = this._formatCurrency(f));
    u && (u.innerHTML = this._formatCurrency(e));
    f > 0 && this._delegates.isAuthenticated()
      ? $remCls($get("ptpbet"), "disabled")
      : $addCls($get("ptpbet"), "disabled")
  };
  this._validateStakeKeyPress = function () {
    return!this._bsInst._lock
  };
  this._keyPadOffsetProvider = function () {
    return{cursorVerticalOffset: 6, cursorHorizontalOffset: 0, keyPadVerticalOffset: 12, keyPadHorizontalOffset: 0}
  };
  this._formatCurrency = function (n) {
    var t = $blib.pad2DP(String(n));
    for (t.indexOf(".") < 0 && (t = t + ".00"); t.indexOf(".") > t.length - 3;)t = t + "0";
    return t
  };
  this._attachEvents = function () {
    var n = $(".ptbswrapper");
    n.click(function (n) {
      new b365.Ui.Betslip.ParlayTeaserBetSlipClickHandler(i, i._bsInst).handle(n)
    })
  };
  this._onMaxBetComplete = function (n) {
    var r = n[0], u = n[1][7][1].split("=")[1].split("-"), f = u[1], t = r.split("|"), i = $get("mustk", $get("mltpt_" + f));
    t[1] != "" && this.showMessage(t[1]);
    t[0] != "E" && t[0] != "L"
      ? (i.value = $blib.pad2DP(t[0]), this._updateStkTw(i))
      : t[0] == "E" && this.showMessage(betSlipML.pleaselogin)
  };
  this._initialiseStakeEntry = function () {
    typeof this._stakeEntryHander != "undefined" && (this._stakeEntryHander.detach(), this._stakeEntryHander = null);
    this._stakeEntryHander = i._delegates.isKeyPadSupported()
      ? new BetSlipKeyPadController("#sbMCN", "#MiddleScroller", i, function (n) {
      return n.id
    }, this._updateStkTw, this._validateStakeKeyPress, null, b365.Ui.Betslip.KeyPadOffSetProvider, i)
      : new b365.Ui.Betslip.StakeEntryKeyboard(this._bsInst);
    this._stakeEntryHander.init()
  };
  this._OnContentLoaded = function (n, t) {
    var r = t[0], f = t[1][7][0], u;
    new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle();
    switch (f) {
      case i._bsInst.reqTypeShowRules:
        i.onRulesLoaded(r);
        break;
      case i._bsInst.reqTypeRefreshSlip:
      case i._bsInst.reqTypePlaceBet:
        if (u = r.indexOf("ptbetreceipt") > -1, u) {
          i.clearBets();
          $bSys.setValueInCookie("ptbts", "", "");
          i.onBetReceiptLoaded(t);
          this._updateTotals()
        }
        else if (r.indexOf("LOCKED") > -1)i._delegates.hideOverlay();
        else {
          i.onBetslipLoaded(t);
          this._initialiseStakeEntry()
        }
        this._delegates.updateBalance();
        this._attachEvents();
        i._delegates.hideOverlay();
        break;
      case i._bsInst.reqTypeMaxBet:
        this._onMaxBetComplete(t)
    }
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.addonBetslipLoaded = function (n) {
  this._events.addHandler("onptbetslipcontentloaded", n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.onBetslipLoaded = function () {
  try {
    var n = this.getHandler("onptbetslipcontentloaded");
    n && n(this, arguments[0])
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.addonBetReceiptLoaded = function (n) {
  this._events.addHandler("onptbetslipreceiptloaded", n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.onBetReceiptLoaded = function () {
  try {
    var n = this.getHandler("onptbetslipreceiptloaded");
    n && n(this, arguments[0])
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.addonRulesLoaded = function (n) {
  this._events.addHandler("onptrules", n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.onRulesLoaded = function () {
  try {
    var n = this.getHandler("onptrules");
    n && n(this, arguments)
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.addonContinueBetting = function (n) {
  this._events.addHandler("oncontinuebetting", n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.onContinueBetting = function () {
  try {
    var n = this.getHandler("oncontinuebetting");
    n && n(this, arguments)
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.getRules = function (n) {
  this._bsInst.req(this._bsInst.reqTypeShowRules, "ccid=" + n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.addBet = function (n) {
  if (!this._bsInst._lock) {
    var t = this._bsInst.getBetItems(this._bsInst.betTypeParlayTeaser), i = new b365.Ui.BetDTO;
    i.parse(n);
    t.push(i);
    this._bsInst.setBetItems(t, this._bsInst.betTypeParlayTeaser);
    this._bsInst.updateState()
  }
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.clearBets = function () {
  this._bsInst.clearBets(!1)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.loadBetSlip = function (n) {
  this._bsInst.refresh(this._bsInst.betTypeParlayTeaser, "key=" + n)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.loadBetReceipt = function (n) {
  this._bsInst.req(this._bsInst.reqTypePlaceBet, "key=" + n, "#ptbetslip")
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.getBetMax = function (n) {
  $blib.doBetMax(this._maxBetKey, n, n, bs.betTypeMultiple, this._bsInst) || this.showMessage(betSlipML.pleaselogin, !1)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.totalStake = function () {
  var n = this._bsInst.getBetItems(this._bsInst.betTypeMultiple);
  return $blib.calcTotalStake(n, "ust")
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.updateState = function () {
  this._bsInst.setValueInBSCookie("ns", $bto.serialize(this._bsInst.getBetItems(this._bsInst.betTypeParlayTeaser)));
  this._bsInst.setValueInBSCookie("ms", $bto.serialize(this._bsInst.getBetItems(this._bsInst.betTypeMultiple)))
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.getBetItems = function () {
  return this._bsInst.getBetItems(this._bsInst.betTypeParlayTeaser)
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.showMessage = function (n, t, i) {
  var u = $get("bsetxt"), r;
  document.all
    ? u.innerText = n
    : u.textContent = n;
  r = $get("acpt");
  t != null && t == !0
    ? ($remCls(r, "hidden"), $addHandler(r, "click", Function.createDelegate(this, i)))
    : $addCls(r, "hidden");
  $remCls($get("pterr"), "hidden")
};
b365.Ui.Betslip.ParlayTeaserBetSlipController.prototype.initialise = function () {
};
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.LottoBetSlipClickHandler = function (n, t) {
  this._bsController = n;
  this._bsInst = t;
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.LottoBetSlipClickHandler.prototype = {handle: function (n) {
  var u = n.target, i = !1, r = !1, t = $(u);
  if (this._bsController._delegates.hideTooltip(), this._isValid())if (t.is(":checkbox") && t.attr("name") === "lotDrw") {
    this.onDrawClick(u);
    i = !0
  }
  else if (t.is(":checkbox") && t.attr("name") === "bin") {
    this.onBinaryOptionClick(u);
    i = !0
  }
  else if (t.hasClass("ball")) {
    this.onBallClick(u);
    i = !0;
    r = !0
  }
  else if (t.attr("id") == "clr")this._bsController.clearBalls(), i = !0, r = !0;
  else if (t.attr("id") == "dip")this.onLuckyDipClick(), i = !0, r = !0;
  else if (t.attr("id") == "addline")this.addBet(u), i = !0, r = !0;
  else if (t.is(":checkbox") && t.attr("id") === "ibb")this._bsController.includeBonusBall(u.checked), i = !0, r = !1;
  else if (t.attr("id") === "showPay" || t.attr("id") === "hidePay")this.showHidePayoutRules(u), i = !0, r = !0;
  else if (t.attr("id") === "lotpbet") {
    this.onPlaceBetClick(u);
    i = !0;
    r = !0
  }
  else t.hasClass("del")
      ? (this.deleteItem(u), i = !0, r = !0)
      : t.attr("id") === "ltcbet" && (i = !0, r = !0, this._bsController.onContinueBetting());
  i && n.stopPropagation();
  r && n.preventDefault()
}, onDrawClick: function (n) {
  this._bsController._delegates.isAuthenticated()
    ? this._bsController.updateSelectedDraws()
    : (n.checked = !1, this._bsController._delegates.showLoginPage())
}, onBallClick: function (n) {
  var t = parseInt(n.innerHTML), u, r, i;
  if (this._bsController.canAddLineForSelection(t)) {
    if (!this._bsController.canAddLine() && this._bsController.isSingleBallGame() && t > 0)this._bsController.showTooltip($get("cbs"), n);
    else if (t > 0) {
      for (u = $get("ball_" + t).firstChild, r = -1, i = 0; i < this._bsController._selectedBalls.length; i++)if (this._bsController._selectedBalls[i] == t) {
        r = i;
        break
      }
      r > -1
        ? (this._bsController._selectedBalls.splice(r, 1), $swpCls(u, "selBall", "unselBall"), this._bsController.lockUnlockAdd())
        : !this._bsController.isSingleBallGame() && this._bsController._selectedBalls.length >= this._bsController._maxSelectedBalls
        ? this._bsController.showTooltip($get("ons"), n)
        : (this._bsController._selectedBalls.push(t), this._bsController._selectedBalls.sort(function (n, t) {
        return n - t
      }), $swpCls(u, "unselBall", "selBall"), this._bsController.lockUnlockAdd(), this._bsController.isSingleBallGame() && !this._bsInst._lock &&
        this._bsController.canAddLine() && this._bsInst.addBet(this._bsController._selectedBalls.toString()))
    }
  }
  else t > 0 && this._bsController.deleteItemBySelection(t)
}, onLuckyDipClick: function () {
  if (this._bsController.canAddLine()) {
    for (this._bsController.clearBalls(); this._bsController._selectedBalls.length < this._bsController._maxSelectedBalls;) {
      var n = Math.ceil(Math.random() * this._bsController._numberOfBalls), t = -1;
      for (i = 0; i < this._bsController._selectedBalls.length; i++)if (this._bsController._selectedBalls[i] == n) {
        t = i;
        break
      }
      t < 0 && (this._bsController._selectedBalls.push(n.toString()), $remCls($get("ball_" + n).firstChild, "unselBall"), $addCls($get("ball_" + n).firstChild,
        "selBall"))
    }
    this._bsController._selectedBalls.sort(function (n, t) {
      return n - t
    });
    this._bsController.lockUnlockAdd();
    this._bsController.isSingleBallGame() && !this._bsInst._lock && this._bsController.canAddLine() &&
    ($addCls($get("ball_" + this._bsController._selectedBalls.toString()).firstChild,
      "selBall"), this._bsInst.addBet(this._bsController._selectedBalls.toString()))
  }
}, addBet: function (n) {
  !this._bsInst._lock && this._bsController.canAddLine() && n.className.indexOf("disabled") == -1
    ? this._bsInst.addBet(this._bsController._selectedBalls.toString())
    : this._bsController._selectedDraws.length == 0 && this._bsController._selectedBalls.length > 0
    ? this._bsController.showTooltip($get("sdf"), n)
    : this._bsController._selectedDraws.length > 0 && !this._bsController.canAddLine() && this._bsController.showTooltip($get("cbs"), n)
}, showHidePayoutRules: function (n) {
  var t = n == $get("showPay"), i = t
    ? $remCls
    : $addCls, r = t
    ? $addCls
    : $remCls;
  r($get("showPay"), "hidden");
  i($get("hidePay"), "hidden");
  i($get("oddsTab"), "hidden")
}, onPlaceBetClick: function (n) {
  if (n.className.indexOf("disabled") == -1) {
    if ($get("lotbinp") && !this._bsController.areBinaryOptionsSet()) {
      this._bsController.showTooltip($get("ons"), n);
      return
    }
    this._bsController._delegates.showOverlay();
    this._bsInst.placeBets()
  }
  else this._bsController._selectedDraws.length == 0 && this._bsController.showTooltip($get("sdf"), n)
}, deleteItem: function (n) {
  if (this._bsInst._betItems.length != 0) {
    var t = n.id.substring(4);
    this._bsController.deleteItemByLineNum(t)
  }
}, onBinaryOptionClick: function (n) {
  var r = n.id.substring(4, 5), u = n.id.substring(6), t = $get("Bin_" + r + "_" + u), i = $get("Bin_" + (1 - r) + "_" + u);
  if (!this._bsController._delegates.isAuthenticated()) {
    t.checked = !1;
    i.checked = !1;
    this._bsController._delegates.showLoginPage();
    return
  }
  t && (t.checked = !0);
  i && (i.checked = !t.checked);
  this._bsController.updateBinaryOptions()
}};
b365.Ui.Betslip.LottoBetSlipController = function (n, t) {
  var i = this;
  this._bsInst = n;
  this._dlg = null;
  this._bsContext = t;
  this._delegates = new BetSlipDelegates(t);
  this._events = new Sys.EventHandlerList;
  this._selectedBalls = [];
  this._selectedDraws = [];
  this._maxSelectedBalls = null;
  this._maxSelectedLines = null;
  this._numberOfBalls = null;
  this._cookieHeaderItem = null;
  this._lastLineNum = null;
  this._pws = null;
  this._msgQue = null;
  this._taxInd = null;
  this._key = null;
  this._bsInst.addOnReqComplete(function (n, t) {
    i._OnContentLoaded(n, t)
  });
  this._bsInst.addOnAddBet(Function.createDelegate(this, this.handleAddBet));
  this._bsInst.addOnPlaceBet(Function.createDelegate(this, this.handlePlaceBet));
  this._bsInst.addOnDeleteItem(Function.createDelegate(this, this.handleDeleteItem));
  new b365.Ui.Betslip.RestoreStateHandler(this._bsInst).handle();
  this._keyPadOffsetProvider = function () {
    return{cursorVerticalOffset: 6, cursorHorizontalOffset: 0, keyPadVerticalOffset: 12, keyPadHorizontalOffset: 0}
  };
  this.getHandler = function (n) {
    return this._events.getHandler(n)
  };
  this._attachEvents = function () {
    var n = $(".lot-body");
    n.click(function (n) {
      new b365.Ui.Betslip.LottoBetSlipClickHandler(i, i._bsInst).handle(n)
    });
    $(".lsplashCont").click(Function.createDelegate(this, function () {
      this.onLottoSplashLoad()
    }))
  };
  this._OnContentLoaded = function (n, t) {
    var u = t[0], e = t[1][7][0], f, r;
    this.restoreState();
    switch (e) {
      case i._bsInst.reqTypeRefreshSlip:
        i.onBetslipLoaded(t);
        this.initialiseStakeEntry();
        this._numberOfBalls = $(".ball", "#lotbp").length;
        this.updateSelectedDraws();
        this._delegates.updateBalance();
        this._lastLineNum = this._bsInst._betItems.length;
        this._attachEvents();
        break;
      case i._bsInst.reqTypePlaceLottoBet:
      case i._bsInst.reqTypeRefreshLottoSlip:
        if (f = u.indexOf("lotRecpt") > -1, f) {
          i.onBetReceiptLoaded(t);
          this.updateTotals();
          this._delegates.updateBalance();
          this._bsInst.setValueInBSCookie("lh", "");
          this._bsInst.setValueInBSCookie("ls", "");
          this._attachEvents()
        }
        else $("#lotbs").html(u), this.restoreState(), this.clearBalls(), this.lockUnlock(!1), r = $("#bsDiv").find("ul.betSlip").attr("data-tcm"), this._taxInd = typeof r !=
          "undefined"
          ? Number(r)
          : 0, this._lastLineNum = this._bsInst._betItems.length, this._stakeEntryHander && this._stakeEntryHander.init();
        break;
      case i._bsInst.reqTypeMaxBet:
        this._onMaxBetComplete(t)
    }
    i._delegates.hideOverlay()
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.initialiseStakeEntry = function () {
  var n = this;
  typeof this._stakeEntryHander != "undefined" && (this._stakeEntryHander.detach(), this._stakeEntryHander = null);
  this._stakeEntryHander = n._delegates.isKeyPadSupported()
    ? new BetSlipKeyPadController("#sbMCN", "#MiddleScroller", n, function (n) {
    return n.id
  }, this.despatchStakeKeyUp, this.validateStakeKeyPress, null, b365.Ui.Betslip.KeyPadOffSetProvider, n)
    : new b365.Ui.Betslip.StakeEntryKeyboard(this._bsInst);
  this._stakeEntryHander.init()
};
b365.Ui.Betslip.LottoBetSlipController.prototype.validateStakeKeyPress = function (n) {
  var t = !0, i = n.id.substring(6);
  return this._bsInst._lock || this.isDummyLine(i)
    ? t = !1
    : n.value !== "." && $get("lotbinp") && !this.areBinaryOptionsSet() && (this.isSingleBallGame()
    ? this.showTooltip($get("ons"), n)
    : this.showTooltip($get("mas"), n), t = !1), t
};
b365.Ui.Betslip.LottoBetSlipController.prototype.areBinaryOptionsSet = function () {
  for (var n = 1; $get("Bin_1_" + n) && $get("Bin_0_" + n); n++)if (!($get("Bin_1_" + n).checked || $get("Bin_0_" + n).checked))return!1;
  return!0
};
b365.Ui.Betslip.LottoBetSlipController.prototype.isSingleBallGame = function () {
  return this._maxSelectedBalls == 1
};
b365.Ui.Betslip.LottoBetSlipController.prototype.isDummyLine = function (n) {
  switch (this._cookieHeaderItem.getCnItem("gid")) {
    case"1":
    case"3":
    case"4":
      return this.getBetItemConstructProperty(n, "sel", "").length == 0;
    default:
      return!1
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.showLottoPopup = function (n, t) {
  this._msgQue.push(t)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.despatchStakeKeyUp = function (n) {
  n.value == "." && (n.value = "0.");
  this.updateStake(n.id.substring(6)) && this.updateTotals();
  this.updateState(this._bsInst)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.updateStake = function (n) {
  var r = $get("Stake_" + n), f = $get("ToWin_" + n), l = $get("TaxInd_" + n), u = $blib.isDecimal($("#lotbs").attr("data-maxret"))
    ? Number($("#lotbs").attr("data-maxret"))
    : 0, e = !1, o, s, v;
  if (r && f && $blib.isDecimal(r.value) == !0) {
    r.value = $blib.roundValue(r.value);
    var y = this.getBetItemConstructProperty(n, "ms", 0).replace(",", "."), h = Number(y), c = this.getBetItemConstructProperty(n, "o",
      ""), t = Number(r.value), p = Number(this.getBetItemConstructProperty(n, "twm", 0)), i = 0, a = new b365.Ui.Betslip.TaxCalculator(this._bsInst);
    this._cookieHeaderItem.getCnItem("gid") == 2
      ? (o = $get("NumBets_" + n), s = $get("ComboStake_" + n), o && s && !isNaN(o.innerHTML) && (v = (t * Number(o.innerHTML)).toFixed(6), t == 0 || t <= h
      ? (s.innerHTML = $blib.pad2DP(String(v)), i = a.calcReturnsByLine((t * p).toFixed(6), c), i = u != 0 && i > u
      ? u
      : i, f.innerHTML = $blib.pad2DP(String(i)), l.innerHTML = this._taxInd == 1
      ? "*"
      : "", this.setBetItemStateProperty(n, "ust", t), this.setBetItemStateProperty(n, "st", t), e = !0)
      : s.innerHTML = ""))
      : (t == 0 || t <= h) && (i = $blib.riskToWin(t, c, h, !1, !1), i = a.calcReturnsByLine(t, c), i = u != 0 && i > u
      ? u
      : i, f.innerHTML = $blib.pad2DP(String(i)), l.innerHTML = this._taxInd == 1
      ? "*"
      : "", this.setBetItemStateProperty(n, "st", t), e = !0)
  }
  return e || (this.setBetItemStateProperty(n, "st", 0), f != null && (f.innerHTML = ""), r != null && (r.value = "")), e
};
b365.Ui.Betslip.LottoBetSlipController.prototype.updateTotals = function () {
  var t = $get("stkpdrw"), u = $get("nodrw"), f = $get("totstk"), i, n, r;
  this.updateState(this._bsInst);
  i = this._selectedDraws.length;
  n = 0;
  n = $blib.calcTotalStake(this._bsInst._betItems);
  n.length == 0 && (n = "0.00");
  r = i * n;
  t && u && f && (t.innerHTML = this.formatCurrency(n,
    (t.attributes["data-num-dec-sep"] || {value: undefined}).value), u.innerHTML = i, f.innerHTML = this.formatCurrency(String(r),
    (t.attributes["data-num-dec-sep"] || {value: undefined}).value));
  r == 0
    ? $addCls($get("lotpbet"), "disabled")
    : $remCls($get("lotpbet"), "disabled")
};
b365.Ui.Betslip.LottoBetSlipController.prototype.updateState = function () {
  this._bsInst.setValueInBSCookie("lh", escape(this._cookieHeaderItem.toString()));
  this._bsInst.setValueInBSCookie("ls", escape($bto.serialize(this._bsInst.getBetItems())))
};
b365.Ui.Betslip.LottoBetSlipController.prototype.addonBetslipLoaded = function (n) {
  this._events.addHandler("onltbetslipcontentloaded", n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.onBetslipLoaded = function () {
  try {
    var n = this.getHandler("onltbetslipcontentloaded");
    n && n(this, arguments[0])
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.addonBetReceiptLoaded = function (n) {
  this._events.addHandler("onltbetslipreceiptloaded", n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.onBetReceiptLoaded = function () {
  try {
    var n = this.getHandler("onltbetslipreceiptloaded");
    n && n(this, arguments[0])
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.addonContinueBetting = function (n) {
  this._events.addHandler("oncontinuebetting", n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.onContinueBetting = function () {
  try {
    var n = this.getHandler("oncontinuebetting");
    n && n(this, arguments)
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.addonLottoSplashLoad = function (n) {
  this._events.addHandler("onlottosplashload", n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.onLottoSplashLoad = function () {
  try {
    var n = this.getHandler("onlottosplashload");
    n && n(this, arguments)
  }
  catch (t) {
    this.displayError(t.message)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.addBet = function (n) {
  if (!this._bsInst._lock) {
    var t = this._bsInst.getBetItems(this._bsInst.betTypeParlayTeaser), i = new b365.Ui.BetDTO;
    i.parse(n);
    t.push(i);
    this._bsInst.setBetItems(t, this._bsInst.betTypeParlayTeaser);
    this._bsInst.updateState()
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.clearBets = function () {
  this._bsInst.clearBets(!1)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.loadBetSlip = function (n) {
  this._key = n;
  this.clearBetslipCookie();
  this._bsInst.refresh(this._bsInst.betTypeLotto, "key=" + n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.clearBetslipCookie = function () {
  $bSys.setValueInCookie("lbts", "lh", "");
  $bSys.setValueInCookie("lbts", "ls", "")
};
b365.Ui.Betslip.LottoBetSlipController.prototype.loadBetReceipt = function (n) {
  this._key = n;
  this._bsInst.req(this._bsInst.reqTypePlaceBet, "key=" + n)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getBetMax = function (n) {
  $blib.doBetMax(this._maxBetKey, n, n, bs.betTypeMultiple, this._bsInst) || this.showMessage(betSlipML.pleaselogin, !1)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.totalStake = function () {
  var n = this._bsInst.getBetItems(this._bsInst.betTypeMultiple);
  return $blib.calcTotalStake(n, "ust")
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getBetItems = function () {
  return this._bsInst.getBetItems(this._bsInst.betTypeParlayTeaser)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.updateSelectedDraws = function () {
  var t, n, i;
  for (this._selectedDraws = [], t = document.getElementsByName("lotDrw"), n = 0; n < t.length; n++)t[n].checked &&
  (i = t[n].id.substring(7), this._selectedDraws.push(i));
  this._cookieHeaderItem && this._cookieHeaderItem.setCnItem("drw", this._selectedDraws.toString());
  this.lockUnlockAdd();
  this.updateTotals();
  this.updateState(this._bsInst)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.lockUnlockAdd = function () {
  this.canAddLine() && this._selectedBalls.length > 0 && this._selectedDraws.length > 0
    ? $remCls($get("addline"), "disabled")
    : $addCls($get("addline"), "disabled")
};
b365.Ui.Betslip.LottoBetSlipController.prototype.canAddLineForSelection = function (n) {
  return!(this.isSingleBallGame() && this.getBetItemBySel(n) != null)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getBetItemBySel = function (n) {
  for (i = 0; i < this._bsInst._betItems.length; i++)if (this._bsInst._betItems[i].getCnItem("sel") == n)return this._bsInst._betItems[i];
  return null
};
b365.Ui.Betslip.LottoBetSlipController.prototype.canAddLine = function () {
  return this._cookieHeaderItem.getCnItem("gid") == 2
    ? !this._cookieHeaderItem.getCnItem("sel") && this._cookieHeaderItem.getCnItem("sel").length == 0
    : !this._bsInst._betItems || this._bsInst._betItems.length == 0 || this._bsInst._betItems[this._bsInst._betItems.length - 1].getCnItem("sel").length == 0
};
b365.Ui.Betslip.LottoBetSlipController.prototype.showMessage = function (n, t, i) {
  var u = $get("bsetxt"), r;
  document.all
    ? u.innerText = n
    : u.textContent = n;
  r = $get("acpt");
  t != null && t == !0
    ? ($remCls(r, "hidden"), $addHandler(r, "click", Function.createDelegate(this, i)))
    : $addCls(r, "hidden");
  $remCls($get("pterr"), "hidden")
};
b365.Ui.Betslip.LottoBetSlipController.prototype.deleteItemBySelection = function (n) {
  var t = this.getBetItemBySel(n);
  t != null && t.getCnItem("sel") && t.getCnItem("sel").length > 0 && this.deleteItemByLineNum(t.getCnItem("lnum"))
};
b365.Ui.Betslip.LottoBetSlipController.prototype.restoreState = function () {
  this._cookieHeaderItem = $bto.parseCookieString(this._bsInst.getValueFromBSCookie("lh", ""), this._bsInst.betTypeLotto)[0];
  this._bsInst.setBetItems($bto.parseCookieString(this._bsInst.getValueFromBSCookie("ls", ""), this._bsInst.betTypeLotto));
  this._cookieHeaderItem
    ? (this._maxSelectedLines = parseInt(this._cookieHeaderItem.getCnItem("ml")), this._maxSelectedBalls = parseInt(this._cookieHeaderItem.getCnItem("mb")))
    : this._cookieHeaderItem = new b365.Ui.BetDTO(this._bsInst.betTypeLotto);
  var n = $get("lotbp");
  n && (this.canAddLine()
    ? $remCls(n, "disabled")
    : $addCls(n, "disabled"));
  this.updateTotals()
};
b365.Ui.Betslip.LottoBetSlipController.prototype.formatCurrency = function (n, t) {
  t = t || ".";
  var i = $blib.roundDecimal(String(n), t);
  for (i.indexOf(t) < 0 && (i = i + t + "00"); i.indexOf(t) > i.length - 3;)i = i + "0";
  return i
};
b365.Ui.Betslip.LottoBetSlipController.prototype.initialise = function () {
  this.restoreState()
};
b365.Ui.Betslip.LottoBetSlipController.prototype.handleAddBet = function (n, t) {
  if (!this._bsInst._lock) {
    var i = t[0];
    this._cookieHeaderItem.getCnItem("gid") == 2
      ? this._cookieHeaderItem.setCnItem("sel", i)
      : this.setBetItemConstructProperty(this._lastLineNum, "sel", i);
    this.updateState();
    this._delegates.showOverlay();
    this._bsInst.refresh(n.betTypeLottoFrame, "key=" + this._key)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.setBetItemConstructProperty = function (n, t, i) {
  var r = this.getBetItem(n);
  r != null && r.setCnItem(t, i)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getBetItem = function (n) {
  for (i = 0; i < this._bsInst._betItems.length; i++)if (this._bsInst._betItems[i].getCnItem("lnum") == n)return this._bsInst._betItems[i];
  return null
};
b365.Ui.Betslip.LottoBetSlipController.prototype.lockUnlock = function (n) {
  var i = $get("addline"), t = $get("place");
  i && $addCls(i, "disabled");
  t && (n || this._bsInst.getBetItems().length == 0
    ? $addCls(t, "disabled")
    : $remCls(t, "disabled"))
};
b365.Ui.Betslip.LottoBetSlipController.prototype.clearBalls = function () {
  var n, t;
  if (this.isSingleBallGame()) {
    this._selectedBalls = [];
    return
  }
  for (n = 0; n < this._selectedBalls.length; n++)t = $get("ball_" + this._selectedBalls[n]), t && $swpCls(t.firstChild, "selBall", "unselBall");
  this._selectedBalls = [];
  this.lockUnlockAdd()
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getBetItemConstructProperty = function (n, t, i) {
  var r = this.getBetItem(n);
  return r != null
    ? r.getCnItem(t)
    ? r.getCnItem(t)
    : i
    : i
};
b365.Ui.Betslip.LottoBetSlipController.prototype.setBetItemStateProperty = function (n, t, i) {
  var r = this.getBetItem(n);
  r != null && r.setStItem(t, i)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.includeBonusBall = function (n) {
  this._cookieHeaderItem.setStItem("ibb", n);
  this.updateState();
  this._bsInst.refresh(this._bsInst.betTypeLottoFrame, "key=" + this._key)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.handlePlaceBet = function () {
  this._bsInst.req(this._bsInst.reqTypePlaceLottoBet, "key=" + this._key)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.deleteItemByLineNum = function (n) {
  this.clearBallByLineNum(n);
  this._bsInst.deleteItem(n, this._bsInst.betTypeLotto)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.clearBallByLineNum = function (n) {
  if (this.isSingleBallGame() && (n--, this._bsInst && this._bsInst._betItems[n])) {
    var i = this._bsInst._betItems[n].getCnItem("sel"), t = $get("ball_" + i);
    t && $addCls(t.firstChild, "unselBall")
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.handleDeleteItem = function (n, t) {
  var r, u, i;
  if (!this._bsInst._lock) {
    if (this._cookieHeaderItem.getCnItem("gid") == 2)this._cookieHeaderItem.setCnItem("sel", "");
    else {
      for (r = -1, u = t[0], i = 0; i < this._bsInst._betItems.length; i++)if (this._bsInst._betItems[i].getCnItem("lnum") == u) {
        r = i;
        break
      }
      r > -1 && this._bsInst._betItems.splice(r, 1)
    }
    this.updateState();
    this._bsInst.refresh(this._bsInst.betTypeLottoFrame, "key=" + this._key)
  }
};
b365.Ui.Betslip.LottoBetSlipController.prototype.getTooltipHTML = function (n) {
  var t = $getElementsByClassName("cnt", n);
  return t[0].innerHTML
};
b365.Ui.Betslip.LottoBetSlipController.prototype.showTooltip = function (n, t) {
  var i = this.getTooltipHTML(n), r = {Target: t, Content: i};
  this._delegates.showTooltip(r)
};
b365.Ui.Betslip.LottoBetSlipController.prototype.updateBinaryOptions = function () {
  for (var t = [], n = 1; $get("Bin_1_" + n) && $get("Bin_0_" + n); n++)$get("Bin_1_" + n).checked
    ? t.push("1")
    : $get("Bin_0_" + n).checked && t.push("0");
  this.setBetItemStateProperty(1, "sel", t.toString());
  this.updateState();
  this._cookieHeaderItem.getCnItem("gid") == "6" && this._bsInst.refresh(this._bsInst.betTypeLottoFrame, "key=" + this._key)
}, function () {
  Type.registerNamespace("b365.Ui.Betslip");
  b365.Ui.Betslip.ItemSubscriptionManager = function (n) {
    this._bsInst = n;
    this._bsController = null;
    this._bsWrapper = $(".betslipWrapper");
    this._subscriptions = [];
    this._isValid = function () {
      return typeof this._bsInst != "undefined" && typeof ns_gen5_util != "undefined"
    }
  };
  b365.Ui.Betslip.ItemSubscriptionManager.prototype = {attach: function (n) {
    this.subscribe(n)
  }, detach: function () {
    this._isValid() && ($('li[data-item-type="single"]', this._bsWrapper).each(function () {
      var n = $(this).get(0), t;
      n && n.wrapper && (t = n.wrapper, t.detatchStem(), Locator.subscriptionManager.unsubscribe(t._topic, !0, !0, !0))
    }), Locator.validationManager.processValidationCycleNow())
  }, subscribe: function (n) {
    var i, r, t;
    if (this._isValid() &&
      this._bsWrapper.find(".betReceipt").length <= 0)for (this._bsController = n, i = this._bsInst.getBetItems(this._bsInst.betTypeNormal), t = 0; t <
      i.length; t++)r = i[t].getTopic(), r &&
      (this._subscriptions[i[t].getCnItem("fp")] = t, Locator.subscriptionManager.subscribe(r, new ns_gen5_util.Delegate(this, this._snapshotHandler), !0, !0,
        null, !0))
  }, unsubscribe: function () {
    var t, n, u, i, r;
    if (this._isValid()) {
      for (t = this._bsInst.getBetItems(), n = 0, u = t.length; n < u; n++)i = $('li[data-item-id="' + n + '"][data-item-type="single"]',
        this._bsWrapper).get(0), i && i.wrapper && i.wrapper.detatchStem(), t[n] && (r = t[n].getTopic()), r &&
        Locator.subscriptionManager.unsubscribe(r, !0, !0, !0);
      Locator.validationManager.processValidationCycleNow()
    }
  }, _snapshotHandler: function (n) {
    var t = Locator.treeLookup.getReference(n.type), u, i, r;
    t && (u = this._subscriptions[t.data.ID], i = $('li[data-item-id="' + u + '"][data-item-type="single"]', this._bsWrapper).get(0), i &&
      (r = new b365.Ui.Betslip.ItemDisplay(i, this._bsInst, this._bsController, n.type), r.stem = t, r.initialize()))
  }}
}();
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.OddsLineChangedHandler = function (n, t) {
  this._bsInst = n;
  this._bsController = t;
  this._bsWrapper = $(".betslipWrapper");
  this._isValid = function () {
    return typeof this._bsInst != "undefined"
  }
};
b365.Ui.Betslip.OddsLineChangedHandler.prototype = {handle: function (n) {
  var t, o, e;
  if (this._isValid()) {
    var r = n || !1, i = this._bsInst.getBetItems(), u = "0", f;
    if (i.length === 0)return;
    if (!r)for (t = 0, o = i.length; t < o; t++)if (u = i[t].getStItem("olc"), f = i[t].getStItem("_s"), u && Number(u) > 0 || f && Number(f) > 0) {
      r = !0;
      break
    }
    e = $("#QBAddToBetslip");
    r
      ? ($(".acceptChanges", this._bsWrapper).removeClass("hidden"), $("a.placeBet", this._bsWrapper).disableElement(), $("a",
      e).addClass("disabled").attr("data-nav", ""), new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(betSlipML.oddsChanged))
      : ($(".acceptChanges", this._bsWrapper).addClass("hidden"), $("a", e).removeClass("disabled").attr("data-nav",
      "AddToBetSlip"), this._bsController._delegates.isAuthenticated()
      ? ($("a.placeBet", this._bsWrapper).enableElement(), new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).hideMsg())
      : new b365.Ui.Betslip.MessageDisplayHandler(this._bsInst).showMsg(this._bsWrapper.attr("data-cus") === "E"
      ? betSlipML.logintoplacebet
      : betSlipML.loginorjoinnow));
    this._bsInst.changeBetslipHeight()
  }
}};
Type.registerNamespace("b365.Ui.Betslip");
typeof ns_gen5_ui != "undefined" && (b365.Ui.Betslip.ItemDisplay = function () {
  function t(n, t, i, r) {
    c.Wrapper.call(this, n);
    this._delegate_renewSubscriptionHandler = new s(this, this._renewSubscriptionHandler);
    this._bsInst = t;
    this._bsController = i;
    this._topic = r;
    this._isValid = function () {
      return typeof this._bsInst != "undefined" && !$(".betReceipt", this._bsWrapper).length > 0 && this.stem && !this._bsInst._lock
    }
  }

  var v = extend(ns_gen5_ui.ComponentStemBase,
    t), f = ns_gen5_ui.TextNode, c = ns_gen5_ui.Component, n = ns_gen5_data.Attribute, r = ns_gen5_util.OddsConverter, e = ns_gen5_util.OddsType, i = ns_gen5_data.StemEvent, o = ns_gen5_data.SubscriptionManagerEvent, s = ns_gen5_util.Delegate, u = "suspended", l = "hcapChange", a = "oddsChange", h;
  return t.prototype._topic = null, t.prototype._oddsTypeOverride = 0, t.prototype.decimalPlaces = 2, t.prototype._hasNormalOdds = !1, t._betSlipWrapper = null, t.prototype.betSlipWrapper = function () {
    return this._betSlipWrapper || (this._betSlipWrapper = $(".betslipWrapper")), this._betSlipWrapper
  }, t.prototype.createChildren = function () {
    var e;
    if (this._isValid()) {
      var t = this.stem.data, r = this.getElementByClassName("hdCapDisplay"), i = this.getElementByClassName("odds");
      this._hasNormalOdds = this._bsInst.getSlipType() !== this._bsInst.slipFixedTeaser;
      i && (i.tagName.toLowerCase() === "select" && (i = i.children[0]), i.firstChild
        ? this._oddsText = new f.Wrapper(i.firstChild)
        : (this._oddsText = new f, i.appendChild(this._oddsText._element)));
      r && (this._handicapText = new f.Wrapper(r.firstChild));
      t && (this._betItem = this._bsInst.getBetItemByCn(this._bsInst.betTypeNormal, "fp", t[n.ID]));
      this._betItem &&
      (this._oddsTypeOverride = this._betItem.getOddsOverride() || this._oddsTypeOverride, this.decimalPlaces = this._betItem.getDecimalPlaces() ||
        this.decimalPlaces, e = this._element.className.indexOf(u) > -1, this._oddsChanged = n.ODDS in t && this._betItem.getCnItem("o") !== t[n.ODDS] &&
        this._hasNormalOdds, this._handicapChanged = n.HANDICAP in t && this._betItem.getCnItem("ln") &&
        parseFloat(this._betItem.getCnItem("ln")) !== parseFloat(t[n.HANDICAP]), this._suspendedChanged = n.SUSPENDED in t &&
        t[n.SUSPENDED] === "1" !== e, this._topic &&
        Locator.subscriptionManager.addEventListener(o.RENEW_SUBSCRIPTION, this._delegate_renewSubscriptionHandler))
    }
  }, t.prototype.commitProperties = function () {
    var s, t, y, f, h;
    if (this._isValid()) {
      var i = this.stem.data, c = this._oddsChanged || this._handicapChanged, v = this._suspendedChanged, o = 0;
      this._oddsChanged && this._handicapChanged
        ? o = 3
        : this._handicapChanged
        ? o = 2
        : this._oddsChanged && (o = 1);
      o > 0 && this._betItem.setStItem("olc", String(o));
      (this._oddsChanged || this._handicapChanged) &&
      (n.HASH in i && this._betItem.setStItem("ix", i[n.HASH]), n.CHANGE_STAMP in i && this._betItem.setCnItem("sa", i[n.CHANGE_STAMP]));
      s = !1;
      this._oddsChanged && this._oddsText && (t = i[n.ODDS], y = this._oddsTypeOverride || Locator.user.oddsTypeId, s = r.AreOddsBelowMinimum(t), s
        ? t = r.NOT_OFFERED
        : t == "0/0"
        ? t = "SP"
        : y == e.DECIMAL
        ? t = r.ConvertOddsDecimal(t, this.decimalPlaces)
        : y == e.AMERICAN && (t = r.ConvertOddsUS(t)), this._oddsText.setText(t || ""), this.addStyle(a), this._betItem.setCnItem("o", i[n.ODDS]));
      this._handicapChanged && this._handicapText && (f = i[n.HANDICAP] || "", f = f.length > 0 && f.indexOf(".") == -1
        ? Number(f).toFixed(1)
        : f, this._bsInst.getSlipType() === this._bsInst.slipFixedTeaser &&
        (f = f.replace("+", "")), this._handicapText.setText(f), this.addStyle(l), this._betItem.setCnItem("ln", i[n.HANDICAP]));
      h = !1;
      this._suspendedChanged && (this._suspendedChanged = !1, i[n.SUSPENDED] === "1"
        ? (this._betItem.setStItem("_s", "1"), h = !0)
        : this._betItem.setStItem("_s", "0"));
      (v || this._oddsChanged) && (h || s
        ? this.addStyle(u)
        : this.removeStyle(u));
      (c || v) && this._bsInst.updateState();
      c && new b365.Ui.Betslip.TotalsCalculator(this._bsInst).calculate();
      (c || v) && new b365.Ui.Betslip.OddsLineChangedHandler(this._bsInst, this._bsController).handle(h)
    }
  }, t.prototype.suspend = function () {
    this.addStyle(u);
    new b365.Ui.Betslip.OddsLineChangedHandler(this._bsInst, this._bsController).handle(!0)
  }, t.prototype.stemUpdateHandler = function (t) {
    var i = t.data;
    this._oddsChanged = this._oddsChanged || n.ODDS in i && this._hasNormalOdds;
    this._handicapChanged = this._handicapChanged ||
      n.HANDICAP in i && this._betItem.getCnItem("ln") && parseFloat(this._betItem.getCnItem("ln")) !== parseFloat(i[n.HANDICAP]);
    this._suspendedChanged = n.SUSPENDED in i;
    this.invalidateProperties()
  }, h = t.prototype.stemDeleteHandler, t.prototype.stemDeleteHandler = function (n) {
    this._isValid() && this.suspend();
    h.call(this, n)
  }, t.prototype.detatchStem = function () {
    Locator.subscriptionManager.removeEventListener(o.RENEW_SUBSCRIPTION, this._delegate_renewSubscriptionHandler);
    this.stem && (this.stem.removeEventListener(i.UPDATE, this.delegate_stemUpdateHandler), this.stem.removeEventListener(i.DELETE,
      this.delegate_stemDeleteHandler), this.stem = null)
  }, t.prototype._renewSubscriptionHandler = function () {
    var n = this;
    this.detatchStem();
    Locator.validationManager.callLater(function () {
      Locator.subscriptionManager.subscribe(n._topic, new s(n, n._snapshotHandler), !0, !0, null, !0)
    })
  }, t.prototype._snapshotHandler = function () {
    var n = this;
    Locator.validationManager.callLater(function () {
      n._reInitialise()
    })
  }, t.prototype._reInitialise = function () {
    var n = Locator.treeLookup.getReference(this._topic);
    n && (this.stem = n, this.initialize(), this.stem.removeEventListener(i.UPDATE, this.delegate_stemUpdateHandler), this.stem.addEventListener(i.UPDATE,
      this.delegate_stemUpdateHandler), this.stem.removeEventListener(i.DELETE, this.delegate_stemDeleteHandler), this.stem.addEventListener(i.DELETE,
      this.delegate_stemDeleteHandler))
  }, t
}())
/*
 //@ sourceMappingURL=betslip.js.map
 */