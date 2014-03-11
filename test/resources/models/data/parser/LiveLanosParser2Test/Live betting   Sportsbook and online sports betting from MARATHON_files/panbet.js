(function () {
  window.Hash = {KEY_DELIMITER: "/", VALUE_DELIMITER: ",", get: function () {
    var d = {}, c;
    var a = decodeURIComponent(window.location.hash.substr(1));
    if (a.length == 0) {
      return d;
    }
    else {
      a = a.split(this.KEY_DELIMITER);
    }
    for (var b in a) {
      c = a[b].split("=");
      if (typeof c[1] == "undefined") {
        d.anchor = c[0];
      }
      else {
        d[c[0]] = c[1];
      }
    }
    return d;
  }, getByKey: function (a) {
    return this.get()[a];
  }, set: function (c) {
    var b = "";
    for (var a in c) {
      b += this.KEY_DELIMITER + a + "=" + this.arrayToValue(c[a]);
    }
    window.location.hash = b.substr(1);
  }, add: function (a, c) {
    var b = this.get();
    b[a] = this.arrayToValue(c);
    this.set(b);
  }, remove: function (a) {
    var b = this.get();
    delete b[a];
    this.set(b);
  }, clear: function () {
    window.location.hash = "";
  }, arrayToValue: function (a) {
    if (Object.prototype.toString.call(a) == "[object Array]") {
      return a.join(this.VALUE_DELIMITER);
    }
    return a;
  }, valueToArray: function (a) {
    if (Object.prototype.toString.call(a) == "[object String]") {
      return a.split(this.VALUE_DELIMITER);
    }
    return[];
  }};
}());
(function () {
  var a = false, b = /xyz/.test(function () {
    xyz;
  })
    ? /\b_super\b/
    : /.*/;
  this.Class = function () {
  };
  Class.extend = function (g) {
    var f = this.prototype;
    a = true;
    var e = new this();
    a = false;
    for (var d in g) {
      e[d] = typeof g[d] == "function" && typeof f[d] == "function" && b.test(g[d])
        ? (function (h, j) {
        return function () {
          var l = this._super;
          this._super = f[h];
          var k = j.apply(this, arguments);
          this._super = l;
          return k;
        };
      })(d, g[d])
        : g[d];
    }
    function c() {
      if (!a && this.init) {
        this.init.apply(this, arguments);
      }
    }

    c.prototype = e;
    c.constructor = c;
    c.extend = arguments.callee;
    return c;
  };
})();
(function () {
  try {
    if (Log) {
      return;
    }
  }
  catch (b) {
  }
  function a(d, c) {
    if (((Log.mode & Log.DISABLED) == 0) && Log.USE_STATUS) {
      window.status = "" + d + " " + c;
    }
  }

  Logger = Class.extend({USE_STATUS: false, DISABLED: 0, DEBUG: 1, INFO: 16, WARN: 256, ERROR: 4096, mode: 0, debug: function (f) {
    if (this.isDebugEnabled()) {
      if (console && console.debug) {
        try {
          console.debug.apply(this, arguments);
          return;
        }
        catch (d) {
        }
        try {
          console.debug(f);
          return;
        }
        catch (d) {
        }
      }
      try {
        var c = Array.prototype.slice.call(arguments);
        c.unshift("debug");
        a.apply(this, c);
      }
      catch (d) {
      }
    }
  }, info: function (f) {
    if (this.isInfoEnabled()) {
      if (console && console.info) {
        try {
          console.info.apply(this, arguments);
          return;
        }
        catch (d) {
        }
        try {
          console.info(f);
          return;
        }
        catch (d) {
        }
      }
      try {
        var c = Array.prototype.slice.call(arguments);
        c.unshift("info");
        a.apply(this, c);
      }
      catch (d) {
      }
    }
  }, warn: function (f) {
    if (this.isWarnEnabled()) {
      if (console && console.warn) {
        try {
          console.warn.apply(this, arguments);
          return;
        }
        catch (d) {
        }
        try {
          console.warn(f);
          return;
        }
        catch (d) {
        }
      }
      try {
        var c = Array.prototype.slice.call(arguments);
        c.unshift("warn");
        a.apply(this, c);
      }
      catch (d) {
      }
    }
  }, error: function (g) {
    if (this.isErrorEnabled()) {
      if (console && console.error) {
        try {
          console.error.apply(this, arguments);
          return;
        }
        catch (f) {
        }
        try {
          console.error(g);
          return;
        }
        catch (f) {
        }
      }
      try {
        var c = Array.prototype.slice.call(arguments);
        c.unshift("error");
        a.apply(this, c);
      }
      catch (f) {
        var d = 0;
      }
    }
  }, isDebugEnabled: function () {
    return((this.mode & this.DEBUG) > 0);
  }, isInfoEnabled: function () {
    return((this.mode & this.INFO) > 0);
  }, isWarnEnabled: function () {
    return((this.mode & this.WARN) > 0);
  }, isErrorEnabled: function () {
    return((this.mode & this.ERROR) > 0);
  }});
  window.Log = new Logger();
})();
toc_slip_is_opening = false;
function isTOCSlipVisible() {
  return document.getElementById("toc_slip").style.display !== "none";
}
function showTOCSlip() {
  if (!isTOCSlipVisible()) {
    jQuery("#toc_slip").show();
    toc_slip_is_opening = true;
    var a = jQuery(".toc-slip").position();
    $("#toc_slip").css({left: a.left});
  }
}
function hideTOCSlip() {
  if (!toc_slip_is_opening) {
    if (isTOCSlipVisible()) {
      jQuery("#toc_slip").hide();
    }
  }
  toc_slip_is_opening = false;
}
function $$() {
  var d = new Array();
  for (var b = 0, c = arguments.length; b < c; b++) {
    var a = arguments[b];
    if (typeof a == "string") {
      a = document.getElementById(a);
    }
    if (c == 1) {
      return a;
    }
    d.push(a);
  }
  return d;
}
function pad(a) {
  return a < 10
    ? "0" + a
    : a.toString();
}
function getFormElementsHash(b) {
  var c = {};
  var a = b.getElementsByTagName("*");
  for (i = 0; i < a.length; i++) {
    if (a[i].name) {
      switch (a[i].tagName) {
        case"INPUT":
          switch (a[i].type) {
            case"hidden":
            case"text":
            case"password":
              c[a[i].name] = a[i].value;
              break;
            case"checkbox":
              c[a[i].name] = a[i].checked
                ? 1
                : 0;
              break;
            case"radio":
              if (a[i].checked) {
                c[a[i].name] = a[i].value;
              }
              break;
          }
          break;
        case"TEXTAREA":
          c[a[i].name] = a[i].innerHTML;
          break;
        case"SELECT":
          c[a[i].name] = a[i].value;
      }
    }
  }
  return c;
}
function serializeForm(c) {
  var a = "", d = getFormElementsHash(c);
  for (var b in d) {
    if (a.length > 0) {
      a += "&";
    }
    a += encodeURIComponent(b) + "=" + encodeURIComponent(d[b]);
  }
  return a;
}
showWarnDialog = function (a) {
  $("#" + a).modal({position: ["20%"]});
  $("#" + a).find(".no").focus();
};
showEvents = function (c) {
  var g = HomeHelper.getLiveSelectionIDs(), b = HomeHelper.getSimpleSelectionIDs(), e = g.length > 0, f = e
    ? g
    : b;
  if (f.length > 0) {
    if (e) {
      location.href = getLivesUrl(f, false);
    }
    else {
      var d = ((f.length == HomeHelper.getSimpleSelections().length) || (f.length == 0))
        ? getEventsUrl("all")
        : getEventsUrl(f);
      var a = $(".control-event-period-form");
      if (a.length > 0) {
        a.attr("action", d).submit();
      }
      else {
        location.href = d;
      }
    }
  }
  else {
    if (!!c) {
      showWarnDialog(c);
    }
  }
};
showAllInAllEvents = function () {
  $(".control-event-period-form").attr("action", getEventsUrl("all")).submit();
};
showAll = function () {
  location.href = getEventsUrl("all", HomeHelper.getLiveSelections().length > 0);
};
function getEventsUrl(a, b) {
  a = $.isArray(a)
    ? a
    : [a];
  return b
    ? getLivesUrl(a)
    : initData.base_dir + "/betting/" + a.join(",");
}
function getLivesUrl(a, b) {
  a = $.isArray(a)
    ? a
    : [a];
  return initData.base_dir + "/live" + (b
    ? "/view"
    : "") + "/" + a.join(",");
}
function getValue(a) {
  return a.options[a.selectedIndex].value;
}
function isInternetExplorer() {
  return !!$.browser.msie;
}
Function.prototype.bind = function (c) {
  if (arguments.length < 2 && typeof c == "undefined") {
    return this;
  }
  var a = this, b = Array.prototype.slice.call(arguments);
  b.shift();
  return function () {
    return a.apply(c, b.concat(Array.prototype.slice.call(arguments)));
  };
};
function parseMoneyString(a) {
  var a = a.replace(",", "");
  return parseFloat(a);
}
function getOffset(a) {
  if (a.getBoundingClientRect) {
    return getOffsetRect(a);
  }
  else {
    return getOffsetSum(a);
  }
}
function getOffsetRect(d) {
  var g = d.getBoundingClientRect();
  var h = document.body;
  var b = document.documentElement;
  var a = window.pageYOffset || b.scrollTop || h.scrollTop;
  var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
  var f = b.clientTop || h.clientTop || 0;
  var j = b.clientLeft || h.clientLeft || 0;
  var k = g.top + a - f;
  var c = g.left + e - j;
  return{top: Math.round(k), left: Math.round(c)};
}
function getOffsetSum(a) {
  var c = 0, b = 0;
  while (a) {
    c = c + parseInt(a.offsetTop);
    b = b + parseInt(a.offsetLeft);
    a = a.offsetParent;
  }
  return{top: c, left: b};
}
function filterTopLinks(d) {
  var d = d || "page_content", c = $("#" + d).find("._top"), b = 0;
  for (var a = 0, g = c.length; a < g; a++) {
    var e = $(c[a]), f = e.position().top;
    if (f - b > 500) {
      e.css("visibility", "visible");
      e.addClass(" top");
      b = f;
    }
  }
}
function closeMessengerNote(a) {
  $("#" + a).css("display", "none");
}
function redrawSelectionsButtons(a) {
  if (a) {
    $(".but-clear").css("visibility", "hidden");
    $(".but-show").css("visibility", "hidden");
  }
  else {
    $(".but-clear").css("visibility", "visible");
    $(".but-show").css("visibility", "visible");
  }
}
function redrawTOC(a) {
  $(".toc-page").css("visibility", a
    ? "hidden"
    : "visible");
}
function scrollToEvent(b) {
  hideTOCSlip();
  if (isInternetExplorer()) {
    var a = $('a[name="' + b + '"]');
    if (a.length > 0) {
      $$("body_content").scrollTop = a[0].offsetTop + 30;
    }
  }
  $(window).trigger("onScrollToEvent", [b]);
}
function hideConnextraImage() {
  $("body > img[src*='zz.connextra.com']").hide();
}
PAGES = {JOIN: "join.htm"};
function isPage(a) {
  var b = document.location.pathname;
  return b.indexOf(a, b.length - a.length) !== -1;
}
function panbetValidate(a, c) {
  var b = c || {};
  b.ignore = "";
  b.messages = PanbetBaseMessages;
  b.onfocusout = false;
  b.onkeyup = function (e, f) {
    if (typeof f.keyCode === "undefined" || f.keyCode != 13) {
      this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass);
      this.addWrapper(this.errorsFor(e)).hide();
    }
  };
  b.highlight = function (g, e, f) {
    $(g).addClass(e).removeClass(f);
    if ($(g).hasClass("date")) {
      $(g.parentNode).addClass(e);
    }
  };
  b.unhighlight = function (g, e, f) {
    $(g).removeClass(e).addClass(f);
    if ($(g).hasClass("date")) {
      $(g.parentNode).removeClass(e);
    }
  };
  if (isPage(PAGES.JOIN)) {
    b.onkeyup = function (e, f) {
      if (f.keyCode == 9) {
        return;
      }
    };
    b.onfocusout = function (e) {
      $(e).valid();
    };
    a.find(":input").bind("change", function () {
      $(this).valid();
    });
  }
  b.rules = {confirmpassword: {equalTo: "#form_password"}, aemail2: {equalTo: "#form_aemail"}};
  var d = a.validate(b);
  $.validator.addMethod("panbet-dateISO", function (j, f) {
    var e = $.validator.methods.dateISO.call(this, j, f);
    if (!e) {
      var h = d.settings;
      var g = $(f).parent().find("select");
      h.highlight(g, h.errorClass, h.validClass);
    }
    return e;
  }, PanbetBaseMessages.dateISO);
  return d;
}
function panbetModal(b, a) {
  var a = a || {};
  a.position = ["20%"];
  b.modal(a);
}
function showMessage(c, b) {
  var a = $("#" + c);
  if (b !== undefined && b !== null) {
    a.find("P._message").html(b);
  }
  panbetModal(a);
}
function heightScroll() {
  var a = $$("left_scroll");
  if (a) {
    a.style.height = (($.browser.msie
      ? document.body.clientHeight
      : window.innerHeight) - 84) + "px";
  }
}
function heightContent() {
  var a = document.body.clientHeight - 84;
  $(".body-content").css({height: a + "px"});
}
function showLogin(b, c) {
  $.modal.close();
  panbetModal($("#login"));
  var a = $("#login_form");
  panbetValidate(a, c);
  if (b) {
    a.find('input[name="placebet"]').val(true);
  }
  return a;
}
PROGRESS_DIALOG = (function () {
  var a = false;
  return{show: function () {
    if (a) {
      return;
    }
    else {
      $.modal.close();
      $("#progress_dialog").modal({position: ["20%", ]});
      a = true;
    }
  }, hide: function () {
    if (!a) {
      return;
    }
    else {
      $.modal.close();
      a = false;
    }
  }};
})();
function showProgressModal() {
  PROGRESS_DIALOG.show();
}
function closeModal() {
  PROGRESS_DIALOG.hide();
  $.modal.close();
}
function selectLanguage() {
  $("#language_form").submit();
}
function changeOddsType() {
  $$("oddstype_form").submit();
}
function getBrowserVersion(c) {
  var a = navigator.userAgent;
  try {
    return parseFloat(a.substring(a.indexOf(c) + c.length + 1));
  }
  catch (b) {
    return -1;
  }
}
function convertCurrency(e, d, f) {
  var c = $$(f);
  if (c.className.indexOf("error") != -1) {
    $$(e).innerHTML = "";
    return;
  }
  var a = $$(d);
  var b = a.options[a.selectedIndex].value.split("-");
  $$(e).innerHTML = b[1] + " " + Math.round(b[2] * c.value * 100) / 100;
}
function trimFields() {
  jQuery("input[type='text']").focusout(function () {
    var a = jQuery.trim(this.value);
    jQuery(this).val(a);
  });
}
function updateBalance(b) {
  var a = $$("balance");
  if (a && b) {
    a.innerHTML = b;
  }
}
function getUrlVars() {
  var d = {}, c;
  var a = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
  for (var b = 0; b < a.length; b++) {
    c = a[b].split("=");
    d[c[0]] = c[1];
  }
  return d;
}
function getUrlVar(a) {
  return getUrlVars()[a];
}
function contains(a, c) {
  var b = a.length;
  while (b--) {
    if (a[b] === c) {
      return true;
    }
  }
  return false;
}
function findOffsetTop(a) {
  var b = 0;
  do {
    b += a.offsetTop;
  } while (a = a.offsetParent);
  return b;
}
function queryString() {
  var d = {};
  var c = window.location.search.substring(1);
  var e = c.split("&");
  for (var b = 0; b < e.length; b++) {
    var f = e[b].split("=");
    if (typeof d[f[0]] === "undefined") {
      d[f[0]] = f[1];
    }
    else {
      if (typeof d[f[0]] === "string") {
        var a = [d[f[0]], f[1]];
        d[f[0]] = a;
      }
      else {
        d[f[0]].push(f[1]);
      }
    }
  }
  return d;
}
function removeURLParameter(a, f) {
  var d = a.split("?");
  if (d.length >= 2) {
    var e = encodeURIComponent(f) + "=";
    var c = d[1].split(/[&;]/g);
    for (var b = c.length; b-- > 0;) {
      if (c[b].lastIndexOf(e, 0) !== -1) {
        c.splice(b, 1);
      }
    }
    a = d[0] + ((c.length > 0)
      ? "?" + c.join("&")
      : "");
  }
  return a;
}
function isWideScreen() {
  var a = true;
  try {
    if ($(".sidebar-right").is(":visible")) {
      a == true;
    }
    else {
      if ($("#container_EVENTS").offset()) {
        a = $("#container_EVENTS").offset().left + $("#container_EVENTS").outerWidth() < $("#betslip-content").offset().left;
      }
      else {
        a = $(".main-block-events").offset().left + $(".main-block-events").outerWidth() < $(".main-block-events").offset().left;
      }
    }
  }
  catch (b) {
  }
  return a;
}
(function (c) {
  var b = Class.extend({MAX_REQUEST_ATTEMPTS: 5, PROGRESS_TIMEOUT: 1000, REQUEST_TIMEOUT: 3 * 60 *
    1000, SHOW_PROGRESS: true, QUEUE_NAME: "request_queue", _progressTimers: [], _failedRequests: {}, init: function (d) {
    if (d) {
      for (var f in d) {
        var e = d[f];
        if (!(e instanceof Function)) {
          this[f] = e;
        }
      }
    }
  }, postAndParse: function (d, f, m, l, h, g, e) {
    var j = this._getResponseErrHandler(d, f, m, l, h, g, e);
    var k = (function (n) {
      var p = null;
      try {
        p = JSON.parse(n);
      }
      catch (o) {
        p = {error: "Fail to parse responce."};
      }
      if (p.error) {
        ((h)
          ? h
          : j)(p);
      }
      else {
        m(p);
      }
    });
    this.post(d, f, k, l, h, g, e);
  }, post: function (f, h, k, g, e, j, d) {
    this.showProgress(j);
    this._post(f, h, k, g, e, d);
  }, hasActiveCalls: function (f) {
    var e = this.QUEUE_NAME;
    if (document.ajaxq && document.ajaxq.q && document.ajaxq.q[e]) {
      if (document.ajaxq.q[e].length != 0) {
        q = document.ajaxq.q[e];
        for (i in q) {
          var d = q[i].context;
          if (!d.exhausted) {
            if (f) {
              d.onResponse = f;
            }
            return true;
          }
        }
      }
    }
    return false;
  }, destroy: function () {
    c.ajaxq(this.QUEUE_NAME);
  }, getHideProgressHandler: function (f) {
    var d = this._progressTimers;
    var e = this;
    return(function () {
      if (e.SHOW_PROGRESS) {
        if (f) {
          f();
          return true;
        }
        if (d && d.length > 0) {
          for (i in d) {
            window.clearTimeout(d[i]);
          }
          d = [];
          closeModal();
        }
      }
    });
  }, showProgress: function (e) {
    var d = this._progressTimers;
    if (this.SHOW_PROGRESS) {
      if (e) {
        e();
        return true;
      }
      d.push(window.setTimeout((function () {
        showProgressModal();
      }), this.PROGRESS_TIMEOUT));
    }
  }, _post: function (d, g, m, l, j, e) {
    var k = this._getDefaultErrHandler(d, g, m, l, j, e);
    var h = this.getHideProgressHandler(e);
    var j = (j)
      ? (function (p, n, o) {
      h();
      j(p, n, o);
    })
      : false;
    var f = {contentType: "application/x-www-form-urlencoded", dataType: "text", timeout: this.REQUEST_TIMEOUT, type: "POST", url: d, context: {}, data: g, success: function (n) {
      this.exhausted = true;
      h();
      m(n);
      if (this.onResponse) {
        this.onResponse();
      }
    }, error: function (p, n, o) {
      this.exhausted = true;
      switch (p.status) {
        case 500:
          h();
          handle500Error();
          break;
        case 503:
          h();
          handle503Error();
          break;
        default:
          ((j)
            ? j
            : k)(p, n, o);
      }
    }};
    if (l) {
      f.beforeSend = l;
    }
    c.ajaxq(this.QUEUE_NAME, f);
  }, _getResponseErrHandler: function (d, g, l, k, j, e) {
    var h = this.getHideProgressHandler(e);
    var f = this._getResend(d, g, l, k, j, e);
    var m = this;
    return(function (n) {
      if (n && n.error && (typeof n.error === "string")) {
        h();
        alert(n.error);
      }
      else {
        f();
      }
    });
  }, _getDefaultErrHandler: function (g, j, k, h, f, d) {
    var e = this._getResend(g, j, k, h, f, d);
    return(function (n, l, m) {
      e();
    });
  }, _getResend: function (d, f, k, j, h, e) {
    var g = this.getHideProgressHandler(e);
    var l = this._failedRequests;
    var m = this;
    return(function () {
      if (!l[d]) {
        l[d] = {attempts: 1};
      }
      var n = l[d].attempts;
      if (m.MAX_REQUEST_ATTEMPTS - 1 > n) {
        (l[d].attempts)++;
        m._post(d, f, k, j, h, e);
        return;
      }
      else {
        if ((m.MAX_REQUEST_ATTEMPTS - 1) === n) {
          (l[d].attempts)++;
          m._post(d, f, k, j, h, e);
          return;
        }
        else {
          if (m.MAX_REQUEST_ATTEMPTS === n) {
            g();
            return;
          }
        }
      }
    });
  }});
  var a = null;
  window.AsyncDispatcher = b;
  window.getAsyncDispatcher = function () {
    if (!(a)) {
      a = new AsyncDispatcher();
    }
    return a;
  };
})(jQuery);
Clock = function () {
  this.currentTime = {};
  this.onTimerTick = function () {
    if (!(this.currentTime instanceof Date)) {
      this.setServerTimeString(initData.serverTime, initData.tzPrefix);
    }
    this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    this.displayTime();
    Timer = setTimeout("getClock().onTimerTick()", 1000);
  };
  this.setServerTimeString = function (sServerTime, sServerTZ) {
    Clock.TIME_MASK = Clock.TIME_MASK.replace("{tz}", sServerTZ);
    var oDate = eval("new Date(" + this.applyMonthFormat(sServerTime) + ")");
    this.currentTime = oDate;
  };
  this.applyMonthFormat = function (sTimeString) {
    var aTimeParams = sTimeString.split(",");
    aTimeParams[1] = aTimeParams[1] - 1;
    return aTimeParams.join();
  };
  this.displayTime = function () {
    var sTimeString = Clock.TIME_MASK;
    sTimeString = sTimeString.replace("{d}", this.pad(this.currentTime.getDate()));
    sTimeString = sTimeString.replace("{m}", this.pad(this.currentTime.getMonth() + 1));
    sTimeString = sTimeString.replace("{y}", this.pad(this.currentTime.getFullYear() % 100));
    sTimeString = sTimeString.replace("{h}", this.pad(this.currentTime.getHours()));
    sTimeString = sTimeString.replace("{mi}", this.pad(this.currentTime.getMinutes()));
    $$("time").innerHTML = "";
    $$("time").appendChild(document.createTextNode(sTimeString));
  };
  this.pad = function (nDigit) {
    return(nDigit < 10
      ? "0"
      : "") + nDigit;
  };
};
Clock._instance = null;
Clock.TIME_MASK = "{d}.{m}.{y}, {h}:{mi} ({tz})";
function getClock() {
  if (!Clock._instance) {
    Clock._instance = new Clock();
  }
  return Clock._instance;
}
(function (a, b) {
  b(document).ready(function () {
    var d = ".js-credit .loading", c = false;
    var e = function () {
      if (c) {
        return false;
      }
      c = true;
      b(this).hide();
      b(d).show();
      b.post(initData.base_dir + "/betslip/calccredit.htm",function (g) {
        var f = b(g);
        b(".js-credit-calc-button", f).hide();
        b(".js-credit").html(f);
      }).always(function () {
        c = false;
        b(d).hide();
        setTimeout(function () {
          b(".js-credit-calc-button").css("display", "");
        }, 1500);
      });
      return false;
    };
    b(document).on("click", ".js-credit-calc-button", e);
  });
})(window, jQuery);
(function (d) {
  var f = Class.extend({depositButton: null, resultDialog: null, printButton: null, depositMsg: null, betresult: null, okButton: null, detailResultContent: null, detailResult: null, placeChangedTerms: null, placeAmendedStake: null, cancelButton: null, init: function () {
    this.resultDialog = d("#result\\-dialog");
    this.betresult = d("#betresult");
    this.detailResult = d("#detail\\-result");
    this.detailResult.hide();
    this.detailResultContent = d("#detail\\-result\\-content");
    this.depositMsg = d("#deposit\\-msg");
    this.depositMsg.hide();
    this.placeChangedTerms = this.bindButton("#place\\-changed\\-terms");
    this.placeAmendedStake = this.bindButton("#place\\-amended\\-stake");
    this.depositButton = this.bindButton("#deposit\\-button");
    this.cancelButton = this.bindButton("#cancel\\-button");
    this.printButton = this.bindButton("#print\\-bet");
    this.okButton = this.bindButton("#ok\\-button");
  }, show: function (j) {
    closeModal();
    this.init();
  }, bindButton: function (j) {
    var k = d(j);
    k.unbind("click");
    k.hide();
    return k;
  }});
  var g = f.extend({init: function () {
    this._super();
  }, show: function (j) {
    this._super(j);
    this.okButton.click(function () {
      closeModal();
    });
    this.okButton.show();
    this.printButton.click(function () {
      getBetslip().printBet(j.ticket_id);
    });
    this.printButton.show();
    this.betresult.html(j.messages[0]);
    d.modal(this.resultDialog, {position: ["20%", ]});
  }});
  var h = f.extend({init: function () {
    this._super();
  }, show: function (j) {
    this._super(j);
    var k = j.messages;
    var l = (k && k.length > 0)
      ? (k.splice(0, 1)[0])
      : (j.error)
      ? j.error
      : (j.ERROR)
      ? j.ERROR
      : false;
    if (!(l)) {
      return false;
    }
    this.betresult.html(l);
    if (k && k.length > 0) {
      this.detailResultContent.html(this.format(k));
      this.detailResult.show();
    }
    else {
      this.detailResult.hide();
    }
    if (j.oom) {
      this.depositButton.show();
      this.depositMsg.show();
    }
  }, format: function (m) {
    var k = "";
    for (var l = 0, j = m.length; l < j; l++) {
      k += m[l] + "<br/>";
    }
    return k.substr(0, k.length - 5);
  }});
  var c = h.extend({init: function () {
    this._super();
  }, show: function (j) {
    this._super(j);
    var l = this.detailResult;
    var k = this.depositButton;
    var m = this.depositMsg;
    this.okButton.click(function () {
      closeModal();
      if (j.refresh) {
        location.reload();
      }
    });
    this.okButton.show();
    d.modal(this.resultDialog, {position: ["20%", ]});
  }});
  var a = h.extend({init: function () {
    this._super();
  }, show: function (k) {
    this._super(k);
    var l = this.cancelButton;
    l.click(function () {
      closeModal();
      showResultDialog;
    });
    l.show();
    var j = this.placeChangedTerms;
    j.click(function () {
      if (k.oneClick) {
        getOneClick().retry(k.oneClick.ch);
      }
      else {
        getBetslip().continuePlaceBet(initData.isLogged);
      }
      closeModal();
    });
    j.show();
    d.modal(this.resultDialog, {position: ["20%", ]});
  }});
  var b = h.extend({init: function () {
    this._super();
  }, show: function (j) {
    this._super(j);
    var l = this.cancelButton;
    l.click(function () {
      closeModal();
    });
    l.show();
    var k = this.placeAmendedStake;
    k.click(function () {
      if (j.minmoney) {
        getBetslip().fixStake(j.minmoney);
      }
      if (j.maxmoney) {
        getBetslip().fixStake(j.maxmoney);
      }
      if (j.oneClick) {
        var m = j.oneClick;
        getOneClick().retry(m.ch);
      }
      else {
        getBetslip().continuePlaceBet(initData.isLogged);
      }
      closeModal();
    });
    k.show();
    d.modal(this.resultDialog, {position: ["20%", ]});
  }});
  var e = {AMENDED_STAKE_ERROR: new b(), CHANGED_TERMS_ERROR: new a(), BET_ERROR: new c(), OK: new g()};
  window.showResultDialog = function (l, j) {
    var k = e[String(l)];
    if (!(k)) {
      return;
    }
    k.init();
    k.show(j);
  };
})(jQuery);
(function (N) {
  var W = 1.5 * 1000;
  var u = initData.base_dir + "/betslip/placeticket.htm";
  var f = initData.base_dir + "/betslip/placebet.htm";
  var T = initData.base_dir + "/betslip/remove.htm";
  var d = initData.base_dir + "/betslip/retain.htm";
  var x = initData.base_dir + "/betslip/clear.htm";
  var P = initData.base_dir + "/betslip/view/current.htm";
  var m = initData.base_dir + "/betslip/add.htm";
  var z = initData.base_dir + "/betslip/updatebetplacingmode.htm";
  var O = {};
  var b = false;
  var D = "SHORT";
  var r = "SHORT";
  var Q = [];
  var S = false;
  var B = null;
  var h = false;

  function k(X) {
    b = Boolean(X);
  }

  function F(X) {
    if (!(X)) {
      return false;
    }
    D = String(X);
  }

  function V(X) {
    if (!(X)) {
      return false;
    }
    r = String(X);
  }

  function I(X) {
    S = Boolean(X);
  }

  function j(X) {
    if (!(X)) {
      return false;
    }
    B = String(X);
  }

  function n(X) {
    if (typeof X === "string") {
      try {
        Q = jQuery.parseJSON(X);
      }
      catch (Y) {
        Q = [];
      }
    }
    else {
      Q = X;
    }
  }

  function A(X) {
    h = Boolean(X);
  }

  function c(X) {
    return X.error || X.ERROR;
  }

  function t(aa) {
    var X = null;
    var Z = null;
    var Y = null;
    if (!(Y = aa.content) || !(Z = aa.currentpage) || !(X = O[Z])) {
      return false;
    }
    N("#betslip\\-container").html(Y);
    V(aa.previouspage);
    F(Z);
    C();
    J();
    s();
    N(document).trigger("betslip.loaded", [aa.coeffuuids]);
    X._activate();
    return X;
  }

  function C() {
    var ab = N(".header").outerHeight(true) + parseInt(N(".top-panel").css("padding-top")) + N(".bet-slip").outerHeight(true);
    if (N("table.select-bet > tbody > tr").size() > 4) {
      var Z = 0;
      for (var aa = 0; aa < 4; aa++) {
        Z += N(".select-bet > tbody > tr").eq(aa).outerHeight();
      }
      N(".scroll-selections").css({height: Z + "px"});
      var X = 0;
      for (var aa = 0; aa < 4; aa++) {
        X += N(".select-bet > tbody > tr").eq(aa).outerHeight();
      }
      if (Z < X) {
        N(".scroll-selections").css({height: X + "px"});
      }
    }
    if ((N(".bet-slip-open").outerHeight() + ab) > N(window).height()) {
      var Y = N(".bet-slip-open").outerHeight(true) - (N(window).height() - ab);
      var ad = N("table.select-bet > tbody > tr:eq(0)").outerHeight(true);
      var ac = N(".scroll-selections").height() > Y
        ? N(".scroll-selections").height() - Y
        : ad;
      N(".scroll-selections").css({"min-height": ad + "px", "max-height": ac + "px"});
    }
  }

  function J() {
    if ((N(".banners").length > 0) && (N(".bet-slip-open").length > 0)) {
      N(".banners").css({"padding-top": N(".bet-slip-open").height() + "px"});
    }
    else {
      if ((N(".banners").length > 0) && (N(".stake-no").is(":visible"))) {
        N(".banners").css({"padding-top": N(".stake-no").height() + "px"});
      }
      else {
        N(".banners").css({"padding-top": "10px"});
      }
    }
  }

  function g() {
    new AsyncDispatcher({SHOW_PROGRESS: false}).postAndParse(P, {}, function (X) {
      H(X);
    });
  }

  function v(X) {
    getAsyncDispatcher().postAndParse(X, {}, function (Y) {
      H(Y);
    });
  }

  function H(ab) {
    if (ab == null) {
      return false;
    }
    if (c(ab)) {
      showResultDialog("BET_ERROR", ab);
      return false;
    }
    var X = null;
    if (X = t(ab)) {
      n(ab.halfplaced);
      j(ab.puntermsg);
      var aa = ab.confirmplacebet;
      var Y = ab.cansettlebets;
      var Z = ab.isLogged;
      k(Y);
      A(Z);
      if (Y && aa) {
        X.confirmPlaceBet(Z, true);
      }
      setupBetslipPlaceModeBlockVisibility();
      return true;
    }
    return false;
  }

  function s() {
    var X = N("#betPlacingModeRadioBlockId").find("input");
    X.click(function () {
      N(this).prop("checked", false);
      var Y = N(this).val();
      var Z = null;
      X.each(function (aa) {
        if (N(this).val() != Y && N(this).is(":checked")) {
          Z = N(this).val();
        }
      });
      if (Z) {
        N.post(z, {betPolicy: Y}).done(function () {
          X.each(function (aa) {
            if (N(this).val() == Y) {
              N(this).prop("checked", true);
            }
            else {
              N(this).prop("checked", false);
            }
          });
        }).fail(function () {
          X.each(function (aa) {
            if (N(this).val() == Z) {
              N(this).prop("checked", true);
            }
            else {
              N(this).prop("checked", false);
            }
          });
        });
      }
    });
  }

  var E = Class.extend({LIVE_CHECK_DELAY: 500, REQUEST_TIMEOUT: 3 * 60 * 1000, QUEUE_NAME: "bet_save_queue", SAVE_URL: initData.base_dir +
    "/betslip/save.htm", _blockPlaceBetButton: false, _placeBetTransaction: false, _contentUrl: null, _saveTimeouts: {}, placeBet: function (Y, X) {
  }, checkBet: function (X) {
  }, hasAnyStake: function () {
    return false;
  }, _activate: function () {
  }, init: function (X) {
    this._contentUrl = X;
  }, _abortPlace: function (X) {
    if (window.location.pathname.lastIndexOf("livestream") != -1) {
      SEO.trackEventGoogle(SEO.LIVE_STREAM_CATEGORY, SEO.BET_NOT_PLACED_ACTION, window.location.search.substring(1));
    }
    if (!X) {
      return;
    }
    closeModal();
    N("#common_messenger_msg").text(X);
    N("#common_messenger").modal({position: ["20%", ]});
  }, confirmPlaceBet: function (Y, ab) {
    if (ab) {
      S = ab;
    }
    if (!(S)) {
      return false;
    }
    if (!(b)) {
      this._abortPlace(B);
      return false;
    }
    var X = this;
    var ac = function () {
      X._enablePlaceBetButton();
    };
    if (getAsyncDispatcher().hasActiveCalls(ac)) {
      this._disablePlaceBetButton();
      return false;
    }
    if (Y) {
      h = Y;
    }
    var Z = N("#total_cost");
    var aa = ((Z)
      ? Z.html()
      : null);
    if (aa) {
      aa = aa.replace(/(,)/g, "");
    }
    if (isNaN(aa) || (aa <= 0)) {
      if (this.hasAnyStake()) {
        this.showInvalidStakeDialog();
      }
      else {
        this.showEnterStakeDialog();
      }
    }
    else {
      if (Q && (Q.length > 0)) {
        showHalfPlaceWarning(Q);
      }
      else {
        this.continuePlaceBet(h);
      }
    }
    I(false);
  }, continuePlaceBet: function (Y) {
    if (this._placeBetTransaction) {
      return;
    }
    if (Y) {
      h = Y;
    }
    if (!(h)) {
      showLogin(true);
      return;
    }
    if (window.location.pathname.lastIndexOf("livestream") != -1) {
      SEO.trackEventGoogle(SEO.LIVE_STREAM_CATEGORY, SEO.BET_NOT_PLACED_ACTION, window.location.search.substring(1));
    }
    var Z = this._betPlacingSuccess;
    var X = this._betPlacingFailure;
    this._placeBetTransaction = true;
    this.placeBet(Z, X);
  }, printBet: function (Y) {
    var X = initData.base_dir + "/printbet.htm?ticketId=" + Y;
    window.open(X);
  }, _betPlacingFailure: function (Y) {
    var X = getBetslip();
    if (Y && Y.error) {
      closeModal();
      alert(obj.error);
    }
    else {
      closeModal();
      alert("Server connection lost");
    }
    X._placeBetTransaction = false;
  }, _betPlacingSuccess: function (ad) {
    var Z = getBetslip();
    var X = ad.result;
    var ab = ad.balance;
    var ac = ad.ticket_id;
    var aa = ad.delay;
    if (Z.resetState) {
      Z.resetState();
    }
    var Y = true;
    if (X == "OK") {
      Z._processOk(ad, ab);
    }
    else {
      if (X == "LIVE_DELAY") {
        Z._processDelay(ac, aa);
        Y = false;
      }
      else {
        if (X == "ERROR") {
          Z._processError(ad);
        }
        else {
          if (X == "LOGIN_REQUIRED") {
            closeModal();
            I(true);
            A(false);
            Z.confirmPlaceBet();
          }
        }
      }
    }
    if (Y) {
      Z._placeBetTransaction = false;
    }
  }, _processOk: function (Z, X) {
    if (window.CXT_EVENTS) {
      try {
        window.CXT_EVENTS.perform(window.CXT_EVENTS.ACTIONS.BET_CONFIRMATION);
      }
      catch (Y) {
      }
    }
    if (window.location.pathname.lastIndexOf("livestream") != -1) {
      SEO.trackEventGoogle(SEO.LIVE_STREAM_CATEGORY, SEO.BET_PLACED_ACTION, window.location.search.substring(1));
    }
    try {
      updateBalance(X);
      t(Z);
    }
    catch (Y) {
      Log.error(Y);
    }
    closeModal();
    showResultDialog("OK", Z);
  }, _processDelay: function (Z, Y) {
    if (!isNaN(Y) && (Z != null)) {
      showProgressModal();
      var X = this;
      window.setTimeout(function () {
        X.placeTicket(Z);
      }, Y);
    }
  }, _processError: function (Y) {
    if (window.location.pathname.lastIndexOf("livestream") != -1) {
      SEO.trackEventGoogle(SEO.LIVE_STREAM_CATEGORY, SEO.BET_NOT_PLACED_ACTION, window.location.search.substring(1));
    }
    try {
      t(Y);
    }
    catch (X) {
      Log.error(X);
    }
    closeModal();
    if (Y.amendedstake && !(Y.oom)) {
      showResultDialog("AMENDED_STAKE_ERROR", Y);
    }
    else {
      if (Y.changedterms && !(Y.oom)) {
        showResultDialog("CHANGED_TERMS_ERROR", Y);
      }
      else {
        showResultDialog("BET_ERROR", Y);
      }
    }
  }, placeTicket: function (Z) {
    if (window.location.pathname.lastIndexOf("livestream") != -1) {
      SEO.trackEventGoogle(SEO.LIVE_STREAM_CATEGORY, SEO.BET_NOT_PLACED_ACTION, window.location.search.substring(1));
    }
    var Y = this._betPlacingSuccess;
    var X = this._betPlacingFailure;
    getAsyncDispatcher().postAndParse(u, {t: Z}, Y, false, X);
  }, add: function (Z) {
    var Y = null;
    try {
      Y = window.location.href;
    }
    catch (aa) {
    }
    var ab = true;
    var Z = {ch: Z, url: Y, ws: isWideScreen()};
    var X = this;
    getAsyncDispatcher().postAndParse(m, Z, function (ac) {
      H(ac);
    });
  }, remove: function (X) {
    var Z = {url: X, page: D};
    var Y = this;
    getAsyncDispatcher().postAndParse(T, Z, function (aa) {
      H(aa);
    });
    this._resetStates();
  }, removeAll: function () {
    var X = this;
    getAsyncDispatcher().postAndParse(x, {}, function (Y) {
      H(Y);
    });
    this._resetStates();
  }, noSelections: function () {
    N.modal.close();
    N("#no_selections").modal({position: ["20%", ]});
  }, setRetain: function (X) {
    N.post(d, "retain=" + X);
  }, hideCursor: function () {
    var X = N(".js-focusable:focus");
    if (!(X)) {
      return;
    }
    X.addClass("js-focused");
    X.blur();
  }, showCursor: function () {
    var X = N(".js-focused");
    if (!(X)) {
      return;
    }
    X.removeClass("js-focused");
    X.css("position", "fixed").focus().css("position", "static");
  }, _resetStates: function () {
    var Y;
    for (var X in O) {
      if (O[X].resetState) {
        O[X].resetState();
      }
    }
  }, _placeBetButton: function () {
    var X = N("#but\\-place\\-bet");
    return(X)
      ? N(X)
      : false;
  }, _disablePlaceBetButton: function () {
    this._blockPlaceBetButton = true;
    var X = this._placeBetButton();
    if (X) {
      X.removeAttr("href");
      X.addClass("disabled");
    }
  }, _enablePlaceBetButton: function () {
    this._blockPlaceBetButton = false;
    var X = this._placeBetButton();
    if (X) {
      X.attr("href", "javascript://");
      X.removeClass("disabled");
    }
  }, showEnterStakeDialog: function () {
    N.modal.close();
    N("#enter_stake_dialog").modal({position: ["20%", ]});
  }, showInvalidStakeDialog: function () {
    N.modal.close();
    N("#invalid_stake_dialog").modal({position: ["20%", ]});
  }, _abortSave: function (X) {
    var Y = this._saveTimeouts[X];
    window.clearTimeout(Y);
    N.ajaxq(this.QUEUE_NAME);
  }, _queueSave: function (Y, Z) {
    if (this._saveTimeouts[Y]) {
      window.clearTimeout(this._saveTimeouts[Y]);
    }
    var X = this;
    this._saveTimeouts[Y] = window.setTimeout(function () {
      X._save(Z);
    }, this.LIVE_CHECK_DELAY);
  }, _save: function (Y) {
    var X = {timeout: this.REQUEST_TIMEOUT, url: this.SAVE_URL, type: "POST", context: {}, data: Y, dataType: "application/x-www-form-urlencoded", success: function (Z) {
      Log.debug("Betslip state saved successfuly.");
    }, error: function (ab, Z, aa) {
      Log.warn("Fail to save betslip state");
    }};
    N.ajaxq(this.QUEUE_NAME, X);
  }, _stake: function (Y) {
    var aa = null, Z = null;
    var X = this._stakeEl(Y);
    if (X) {
      X = N(X);
      aa = N.trim(X.attr("value"));
      Z = N.trim(X.attr("rel"));
    }
    return this._stakeVal(aa, Z);
  }, _stakeVal: function (Y, Z) {
    if (Y && Z && Y != "" && Y != "." && Y != Z) {
      Y = Y.replace(/,/g, "");
      var X = parseFloat(Y);
      if (!(isNaN(X)) && X >= 0 && X == Y) {
        return X;
      }
    }
    return false;
  }, _isew: function (X) {
    return hasAttr(this._isewEl(X), "checked");
  }, _isvip: function (X) {
    return hasAttr(this._isvipEl(X), "checked");
  }, _formatValue: function (X) {
    if (X == 0) {
      return LOCALE_com_panbet_localization_BetWebBundle_DEF_MONEY_VAL;
    }
    else {
      return this._formatMoney((Math.round(X * 100) / 100), 2, ".", ",");
    }
  }, _formatMoney: function (ad, ac, ab, Z) {
    var ac = isNaN(ac = Math.abs(ac))
      ? 2
      : ac, ab = ab == undefined
      ? ","
      : ab, Z = Z == undefined
      ? "."
      : Z, aa = ad < 0
      ? "-"
      : "", Y = parseInt(ad = Math.abs(+ad || 0).toFixed(ac)) + "", X = (X = Y.length) > 3
      ? X % 3
      : 0;
    return aa + (X
      ? Y.substr(0, X) + Z
      : "") + Y.substr(X).replace(/(\d{3})(?=\d)/g, "$1" + Z) + (ac
      ? ab + Math.abs(ad - Y).toFixed(ac).slice(2)
      : "");
  }, _totalReturns: function (X) {
    N("#total_returns").html(this._formatValue(X));
  }, _expressBonus: function (Y) {
    var X = N("#total_express_container");
    if (X && (Y > 0)) {
      N("#total_express").html(this._formatValue(Y));
      X.show();
    }
    else {
      if (X) {
        X.hide();
      }
    }
  }, _totalCost: function (X) {
    N("#total_cost").html(this._formatValue(X));
  }, _disableEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).attr("disabled", "disabled");
    return true;
  }, _enableEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).removeAttr("disabled");
    return true;
  }, _hideEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).hide();
  }, _showEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).show();
  }, _uncheckEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).removeAttr("checked");
  }, _checkEl: function (X) {
    if (!X) {
      return false;
    }
    N(X).attr("checked", "checked");
  }, _hasVip: function (aa, Y) {
    var ab = this._vipavaliable(aa);
    var X = this._maxStake(aa);
    var Z = this._minVip();
    return(this._isNum(Y) && ab && this._isNum(Z) && this._isNum(X) && (Z <= Y) && (Y > X));
  }, _vipavaliable: function (Y) {
    var X = $$("vip.avaliable." + Y);
    return(X)
      ? (X.value === "true")
      : false;
  }, _maxStake: function (Y) {
    var X = $$("max." + Y);
    return this._parseFloat(X);
  }, _minVip: function () {
    var X = $$("min.vip");
    return this._parseFloat(X);
  }, _bonusSelectionsCount: function () {
    var X = $$("bonus.selections.count");
    return this._parseFloat(X);
  }, _bonusMaxPercent: function () {
    var X = $$("bonus.max.percent");
    return this._parseFloat(X);
  }, _parseFloat: function (Y) {
    if (Y) {
      var X = parseFloat(N(Y).val());
      return(isNaN(X))
        ? false
        : X;
    }
    return false;
  }, _isNum: function (X) {
    return(typeof X === "number");
  }, _putCursor: function (X) {
    if (!X) {
      return false;
    }
    if (X.length && X.length > 0) {
      X = X[0];
    }
    if (isEmpty(X)) {
      if (X.id) {
        setTimeout(function () {
          $$(X.id).focus();
        }, 10);
      }
    }
    else {
      N(X).putCursorAtEnd();
    }
  }, _vipBetHint: function () {
    N(".vip-bet .hint").hover(function () {
      var X = N(this).position();
      var Y = X.left - 103;
      var Z = X.top + 16;
      N(this).next(".window-message").css({left: Y, top: Z, margin: "0"});
    });
    N("#vip-bet-container-singles .hint").hover(function () {
      var X = N(this).position();
      var Y = X.left - 103 + 37 + 50;
      var Z = X.top + 16;
      N(this).next(".window-message").css({left: Y, top: Z, margin: "0 !important"});
    });
  }, fixStake: function (X) {
  }});
  var a = E.extend({UPDATE_DELAY: null, PLACEBET_URL: null, UPDATE_URL: null, _state: {checked: null, stake: null}, _try: {ch: null}, init: function () {
    this.UPDATE_DELAY = 0.3 * 1000;
    this.PLACEBET_URL = initData.base_dir + "/betslip/placebetinoneclick.htm";
    this.UPDATE_URL = initData.base_dir + "/betslip/updatebetinoneclick.htm";
  }, add: function (X) {
    if (!(b)) {
      this._abortPlace(B);
      return false;
    }
    this.place(X);
  }, update: function () {
    var Z = isOneClickChecked();
    var X = 0;
    try {
      X = this._stake();
    }
    catch (ab) {
      X = 0;
    }
    if (this._hasNotChanged(Z, X)) {
      return false;
    }
    var aa = {chd: Z, st: X};
    var Y = this;
    getAsyncDispatcher().postAndParse(this.UPDATE_URL, aa, function (ac) {
      t(ac);
      Y.updateState();
      if (Y._state.checked) {
        setTimeout((function () {
          var ad = N("#bet\\-in\\-one\\-click\\-stake");
          if (!ad) {
            return false;
          }
          if (!isEmpty(ad)) {
            ad.putCursorAtEnd();
          }
          ad.focus(function () {
            if (isEmpty(ad)) {
              ad.val("");
            }
          });
          return true;
        }), 100);
      }
    });
  }, retry: function (X) {
    var X = (X)
      ? X
      : this._try.ch;
    this.place(X);
  }, place: function (aa) {
    if (getAsyncDispatcher().hasActiveCalls()) {
      return false;
    }
    var ab = isOneClickChecked();
    if (!(ab)) {
      return false;
    }
    var X = -1;
    try {
      X = this._stake();
    }
    catch (ad) {
      this._abortPlace();
      return false;
    }
    this._try = {ch: aa};
    var ac = {ch: aa, st: X, chd: ab};
    var Y = this._betPlacingSuccess;
    var Z = this._betPlacingFailure;
    getAsyncDispatcher().postAndParse(this.PLACEBET_URL, ac, Y, false, Z, showProgressModal, closeModal);
  }, placeTicket: function (Z) {
    var Y = this._betPlacingSuccess;
    var X = this._betPlacingFailure;
    getAsyncDispatcher().postAndParse(u, {t: Z, oneClick: true}, Y, false, X);
  }, updateState: function () {
    var X = 0;
    try {
      X = this._stake();
    }
    catch (Y) {
      X = 0;
    }
    this.setState(isOneClickChecked(), X);
  }, setState: function (Y, X) {
    this._state.checked = Y;
    this._state.stake = X;
  }, _betPlacingFailure: function (Y) {
    var X = getBetslip();
    if (Y && Y.error) {
      closeModal();
      alert(obj.error);
    }
    else {
      closeModal();
      alert("Server connection lost");
    }
    X._placeBetTransaction = false;
  }, _betPlacingSuccess: function (ad) {
    var Z = getBetslip();
    var X = ad.result;
    var ab = ad.balance;
    var ac = ad.ticket_id;
    var aa = ad.delay;
    var Y = true;
    if (X == "OK") {
      Z._processOk(ad, ab);
    }
    else {
      if (X == "LIVE_DELAY") {
        Z._processDelay(ac, aa);
        Y = false;
      }
      else {
        if (X == "ERROR") {
          Z._processError(ad);
        }
      }
    }
    if (Y) {
      Z._placeBetTransaction = false;
    }
  }, _processOk: function (Z, X) {
    if (window.CXT_EVENTS) {
      try {
        window.CXT_EVENTS.perform(window.CXT_EVENTS.ACTIONS.BET_CONFIRMATION);
      }
      catch (Y) {
      }
    }
    updateBalance(X);
    showResultDialog("OK", Z);
  }, _processDelay: function (Z, Y) {
    var X = this;
    if (!(isNaN(Y)) && (Z != null)) {
      showProgressModal();
      window.setTimeout(function () {
        X.placeTicket(Z);
      }, Y);
    }
  }, _processError: function (X) {
    if (X.amendedstake && !(X.oom)) {
      showResultDialog("AMENDED_STAKE_ERROR", X);
    }
    else {
      if (X.changedterms && !(X.oom)) {
        showResultDialog("CHANGED_TERMS_ERROR", X);
      }
      else {
        showResultDialog("BET_ERROR", X);
      }
    }
  }, _abortPlace: function () {
    closeModal();
    N("#enter_stake_dialog").modal({position: ["20%", ]});
  }, _hasNotChanged: function (Y, X) {
    return !(this._hasChanged(Y, X));
  }, _hasChanged: function (Y, X) {
    var Z = this._state;
    return(Z.checked != Y || Z.stake != X);
  }, _checked: function () {
    isOneClickChecked();
  }, _stake: function () {
    var X = $$("bet-in-one-click-stake");
    if (X && isEmpty(X)) {
      throw"ZERO_STAKE";
    }
    else {
      if (X) {
        extractSum(X);
        return(isStake(X))
          ? X.value
          : -1;
      }
      else {
        return -1;
      }
    }
  }, placeBet: function (Y, X) {
    this.add(this._try.ch);
  }, checkBet: function (X) {
    Log.debug("not implemented OneClickController.checkBet");
  }, hasAnyStake: function () {
    return false;
  }, _activate: function () {
    Log.debug("not implemented OneClickController._activate");
  }, fixStake: function (X) {
    N("#bet-in-one-click-stake").val(X);
  }});
  var R = E.extend({init: function () {
    this._super(initData.base_dir + "/betslip/short.htm");
  }, placeBet: function (Y, X) {
    Log.debug("not implemented ShortController.placeBet");
  }, checkBet: function (X) {
    Log.debug("not implemented ShortController.checkBet");
  }, hasAnyStake: function () {
    return false;
  }, _activate: function () {
    Log.debug("not implemented ShortController._activate");
  }});
  var p = E.extend({init: function () {
    this._super(initData.base_dir + "/betslip/singles.htm");
    this._betCalc = new y();
  }, hasAnyStake: function () {
    var X = this._checkEachBet((this._isSingles()));
    for (url in X) {
      if (X[url].stake) {
        return true;
      }
    }
    return false;
  }, placeBet: function (ae, ab) {
    var aa = this;
    var ac = this._isSingles();
    var Z = [];
    if (ac) {
      var Y = this._stake("SINGLES");
      var ad = this._isvip("SINGLES");
      var X = this._isew("SINGLES");
      this._abortSave("SINGLES");
      Z.push({url: "SINGLES", stake: Y, vip: ad, ew: X});
    }
    else {
      this._eachChoise(function (am, al, aj, ag, ah, ai, ak, af) {
        if (ah <= 0) {
          return false;
        }
        aa._abortSave(ag);
        Z.push({url: ag, stake: ah, vip: af, ew: ak});
      });
    }
    if (Log.isDebugEnabled()) {
      Log.debug("SinglesController, placing bet at " + new Date().getTime());
    }
    getAsyncDispatcher().postAndParse(f, {schd: ac, p: D, b: JSON.stringify(Z)}, ae, false, ab);
  }, selectSingles: function (X) {
    if (X) {
      this._selSingles();
    }
    else {
      this._unselSingles();
    }
  }, checkBet: function (X) {
    this._checkBet(X);
  }, _activate: function () {
    Log.debug("executed SinglesController._activate");
    this._putCursor(this._stakeElArr());
    this._resetBets();
    this._vipBetHint();
  }, _resetBets: function () {
    this._silentCheck((this._isSingles())
      ? "SINGLES"
      : "ALL");
  }, _checkBet: function (Z) {
    var ae = this._stakeEl(Z);
    var ad = ae.attr("rel");
    var Y = this._stakeVal(ae.val(), ad);
    var ac = this._isewEl(Z);
    var X = (ac)
      ? (hasAttr(ac, "checked"))
      ? true
      : false
      : false;
    var aa = this._isvipEl(Z);
    var ab = (aa)
      ? (hasAttr(aa, "checked"))
      ? true
      : false
      : false;
    if (Log.isDebugEnabled()) {
      Log.debug("SinglesController, saving state at " + new Date().getTime());
    }
    this._queueSave(Z, {schd: this._isSingles(), u: Z, st: Y, ew: X, p: "SINGLES", v: ab});
    this._silentCheck(Z);
  }, _silentCheck: function (Y) {
    var ad = (Y == "SINGLES");
    var X = this._checkEachBet(ad);
    var Z = null;
    var ac = null;
    var af = null;
    var ai = null;
    var ah = null;
    var aa = this._isew("SINGLES");
    var ae = true;
    for (_sUrl in X) {
      Z = X[_sUrl];
      af = this._isewEl(_sUrl);
      ai = this._isvipEl(_sUrl);
      ah = this._stakeEl(_sUrl);
      if (!(ah)) {
        return;
      }
      ac = ah.attr("rel");
      if ((_sUrl != Y) && ad) {
        ah.val(ac);
      }
      if ((_sUrl != Y) && Z.showhint) {
        ah.val(ac);
      }
      if (ad && Z.ewenabled) {
        if (aa) {
          this._checkEl(af);
        }
        else {
          this._uncheckEl(af);
        }
      }
      if (Z.hasvip && ad) {
      }
      else {
        if (Z.hasvip && !ad) {
          this._enableEl(ai);
        }
        else {
          if (!(Z.hasvip) && ad) {
            ae = false;
          }
          else {
            if (!(Z.hasvip) && !ad) {
            }
          }
        }
      }
      if (!(Z.hasvip) || ad) {
        this._uncheckEl(ai);
        this._disableEl(ai);
      }
      this._betReturns(_sUrl, Z.payout);
    }
    if (ad) {
      var ab = this._isvipEl("SINGLES");
      if (ae) {
        this._enableEl(ab);
      }
      else {
        this._disableEl(ab);
        this._uncheckEl(ab);
      }
    }
    var ag = this;
    N.when(ag._calcResult(X)).done(function (aj) {
      ag._totalReturns(aj.payout);
      ag._totalCost(aj.cost);
    });
  }, _checkEachBet: function (ad) {
    var aa = this;
    var Z = {};
    var Y = this._stake("SINGLES");
    var X = this._isew("SINGLES");
    var ab = null, ac = null;
    this._eachChoise(function (al, ak, ai, af, ag, ah, aj, ae) {
      ab = (ad)
        ? Y
        : ag;
      ac = (ad)
        ? ((X)
        ? (aa._ewenabled(af))
        : false)
        : aj;
      if (ab) {
        Z[af] = aa._calcBet(af, ab, ac);
        Z[af].hasvip = aa._hasVip(af, ab);
      }
      else {
        Z[af] = {showhint: true, payout: 0, cost: 0};
      }
      if (ad) {
        Z[af].ewenabled = aa._ewenabled(af);
      }
    });
    return Z;
  }, _calcResult: function (Y) {
    var X = null, ac = 0, Z = 0, aa = false;
    var ab = [];
    for (sUrl in Y) {
      X = Y[sUrl];
      Z += X.payout;
      ac += X.cost;
      if (X.halfplaced) {
        ab.push(X.halfplaced);
      }
      if (X.uncalc) {
        aa = true;
      }
    }
    n(ab);
    if (aa) {
      Z = 0;
    }
    return{payout: Z, cost: ac};
  }, _calcBet: function (ad, aa, Z) {
    var ac = this._eprice(ad);
    var Y = this._halfplace(ad);
    var ab = [
      {eprice: ac, halfplace: Y, ewfraction: this._ewfraction(ad)}
    ];
    var ae = (Z && Y < aa)
      ? ({name: N($$("selection.name." + ad)).text(), win: aa, place: aa / 2})
      : false;
    var X = this._betCalc.calc(ab, aa, Z);
    return{halfplaced: ae, uncalc: (ac < 0), stake: aa, payout: X.payout, cost: X.cost};
  }, _selSingles: function () {
    var Y = this;
    var X = false;
    this._eachChoise(function (ai, ah, af, ac, ad, ae, ag, ab) {
      ai.val(ae);
      Y._disableEl(ai);
      if (af) {
        Y._uncheckEl(af);
        Y._disableEl(af);
      }
      if (ah) {
        Y._uncheckEl(ah);
        Y._disableEl(ah);
        X = true;
      }
      Y._showEl($$("max-stake-inactive-" + ac));
      Y._hideEl($$("max-stake-" + ac));
      Y._betReturns(ac, 0);
    });
    this._enableEl(N("#singles\\-bet"));
    if (X) {
      var Z = N("#singles\\-ew\\-container");
      var aa = this._isewEl("SINGLES");
      this._enableEl(aa);
      this._showEl(Z);
    }
    this.checkBet("SINGLES");
  }, _unselSingles: function () {
    var Y = this._stake("SINGLES");
    var ad = this._isvip("SINGLES");
    var X = this._isew("SINGLES");
    var Z = this;
    this._eachChoise(function (am, al, aj, ag, ah, ai, ak, af) {
      if (Y > 0) {
        am.val(Y);
      }
      Z._enableEl(am);
      if (aj) {
        if (Z._hasVip(ag, Y)) {
          if (ad) {
            Z._checkEl(aj);
          }
          Z._enableEl(aj);
        }
      }
      if (al) {
        if (X) {
          Z._checkEl(al);
        }
        Z._enableEl(al);
      }
      Z._hideEl($$("max-stake-inactive-" + ag));
      Z._showEl($$("max-stake-" + ag));
    });
    var ae = this._stakeEl("SINGLES");
    ae.val(ae.attr("rel"));
    this._disableEl(ae);
    var ab = this._isvipEl("SINGLES");
    this._disableEl(ab);
    this._uncheckEl(ab);
    var aa = N("#singles\\-ew\\-container");
    var ac = this._isewEl("SINGLES");
    this._hideEl(aa);
    this._uncheckEl(ac);
    this._checkBet("SINGLES");
  }, _eachChoise: function (Y) {
    var X = this;
    N("input[id*='stake.']").each(function (ad, ag) {
      ag = N(ag);
      var af = ag.attr("id").replace("stake.", "");
      var aa = ag.attr("rel");
      var ac = X._stakeVal(ag.val(), aa);
      var ah = X._isvipEl(af);
      var ab = (ah)
        ? (hasAttr(ah, "checked"))
        ? true
        : false
        : false;
      var ae = X._isewEl(af);
      var Z = (ae)
        ? (hasAttr(ae, "checked"))
        ? true
        : false
        : false;
      Y(ag, ae, ah, af, ac, aa, Z, ab);
    });
  }, _betReturns: function (Z, X) {
    var Y = $$("returns.singles." + Z);
    if (Y) {
      N(Y).html(this._formatValue(X));
    }
  }, _stakeElArr: function () {
    var X = (this._isSingles())
      ? N("#singles-bet")
      : N("input[id*='stake.']");
    return(X)
      ? N(X)
      : false;
  }, _stakeEl: function (Y) {
    var X = (Y == "SINGLES")
      ? N("#singles\\-bet")
      : $$("stake." + Y);
    return(X)
      ? N(X)
      : false;
  }, _isewEl: function (Y) {
    var X = (Y == "SINGLES")
      ? N("#singles\\-ew")
      : $$("ew." + Y);
    return(X)
      ? N(X)
      : false;
  }, _isvipEl: function (Y) {
    var X = (Y == "SINGLES")
      ? N("#singles\\-vip")
      : $$("vip." + Y);
    return(X)
      ? N(X)
      : false;
  }, _isvip: function (X) {
    return hasAttr(this._isvipEl(X), "checked");
  }, _isSingles: function () {
    return hasAttr(N("#singles\\-choose"), "checked");
  }, _halfplace: function (Y) {
    var X = $$("halfplace." + Y);
    return this._parseFloat(X);
  }, _ewfraction: function (Y) {
    var X = $$("ew.fraction." + Y);
    return this._parseFloat(X);
  }, _ewenabled: function (Y) {
    var X = $$("ew.enabled." + Y);
    return(X)
      ? (X.value === "true")
      : false;
  }, _eprice: function (Y) {
    var X = $$("eprice." + Y);
    return this._parseFloat(X);
  }});
  var L = E.extend({init: function () {
    this._super(initData.base_dir + "/betslip/accumulator.htm");
    this._betCalc = new e();
  }, checkBet: function (X) {
    this._updateSubbetCount(X);
    this._checkBet(X);
  }, getSUrl: function (X) {
    var Y = $$(X);
    var Z = (Y && Y.options.length > 0 && Y.selectedIndex > -1)
      ? Y.options[Y.selectedIndex].value
      : null;
    return Z;
  }, _abortAccumulatorSave: function () {
    this._abortSave("@accumulators");
  }, placeBet: function (aa, Y) {
    var Z = this.getSUrl("bet_type_selection");
    var X = [
      {bettype: Z, stake: this._stake(), vip: this._isvip(), ew: this._isew()}
    ];
    this._abortAccumulatorSave();
    getAsyncDispatcher().postAndParse(f, {p: D, b: JSON.stringify(X)}, aa, false, Y);
  }, hasAnyStake: function () {
    return Boolean(this._stake());
  }, _activate: function () {
    Log.debug("executed " + this._controllerName() + "._activate");
    var X = this._stakeEl();
    this._putCursor(X);
    this._resetBets();
    this._vipBetHint();
  }, _resetBets: function () {
    var X = this._stake();
    var Y = this.getSUrl("bet_type_selection");
    this._checkBet(Y);
  }, _updateSubbetCount: function (Y) {
    var X = $$("subbetCount." + Y);
    if (X) {
      N("#accumulator\\.subbet\\-count").html(N(X).val());
    }
  }, _queueSaveAccumulator: function (X) {
    this._queueSave("@accumulators", {p: "ACCUMULATORS", bt: X.bt, st: X.st, ew: X.ew, v: X.v});
  }, _checkBet: function (Z) {
    var ad = this._stakeEl();
    if (!(ad)) {
      return false;
    }
    var ac = ad.attr("rel");
    var Y = this._stakeVal(ad.val(), ac);
    var X = this._isew();
    var aa = this._isvipEl();
    var ab = false;
    this._setupCurrentMaxStake(Z);
    if (this._hasVip(Z, Y)) {
      this._enableEl(aa);
      ab = this._isvip();
    }
    else {
      this._disableEl(aa);
      this._uncheckEl(aa);
    }
    this._queueSaveAccumulator({bt: Z, st: Y, ew: X, v: ab});
    this._silentCheck(Z, Y, ac, X);
  }, _setupCurrentMaxStake: function (X) {
    N("#max-stake a").attr("maxstakevalue", N("#max\\." + X).val());
    N("#max-stake a").text(N("#max\\.formated\\." + X).val());
  }, _silentCheck: function (aa, Y, ab, X) {
    var Z = this;
    N.when(Z._calcResult(aa, Y, X)).done(function (ac) {
      Z._totalReturns(ac.payout - ac.bonus);
      Z._expressBonus(ac.bonus);
      Z._totalCost(ac.cost);
    });
  }, _calcResult: function (ad, Z, aa) {
    if (!(Z)) {
      return{payout: 0, bonus: 0, cost: 0};
    }
    var ag = [], ac = false, Y = 0;
    var ae = this._halfplace(ad);
    var ab = [];
    this._eachChoise(function (ak, al, aj, ah) {
      var ai = {ewfraction: aj, eprice: al, isew: (1 != aj)};
      if (ad == "ANTIEXPRESS") {
        ai.antiexpPrice = ah;
      }
      ag.push(ai);
      Y += (1 + al);
      if (al < 0) {
        ac = true;
      }
    });
    var X = this._expresses(ad);
    var af = (X.length)
      ? this._calcCombinations(X, ag, ad, Z, aa, ae, ac)
      : this._calcAll(ag, ad, Z, aa, ae, ac);
    if (aa && ae < Z) {
      ab.push({name: N('option[value="' + ad + '"]').text(), win: Z, place: Z / 2});
    }
    n(ab);
    return{totalprice: Y, uncalc: ac, payout: af.payout, bonus: af.bonus, cost: af.cost};
  }, _betsByIndexes: function (X, af) {
    var ag = [];
    for (var ab = 0, Z = X.length, aa = null, ac = null; ab < Z; ab++) {
      aa = X[ab];
      ac = {id: aa.join(), choices: []};
      for (var ae = 0, Y = aa.length, ad = null; ae < Y; ae++) {
        ad = aa[ae];
        ac.choices.push(af[ad]);
      }
      ag.push(ac);
    }
    return ag;
  }, _calcCombinations: function (af, al, ac, ab, Y, ar, ah) {
    Log.debug(this._controllerName() + "._calcCombinations, START");
    var aj = new Date().getTime();
    var ai = 0, ad = 0, aq = 0;
    var X = !(ah);
    var at = this._bonusSelectionsCount();
    var am = this._bonusMaxPercent();
    var ak = {};
    var av = [];
    for (var ao = (af.length - 1), aa = null, au = null, ae = null, ap = null; ao >= 0; ao--) {
      ap = af[ao];
      aa = this._betsByIndexes(ap, al);
      for (var an = (aa.length - 1), Z = null, ag = null; an >= 0; an--) {
        _bet = aa[an];
        if (ak[_bet.id]) {
          continue;
        }
        ak[_bet.id] = true;
        av.push(_bet);
      }
      if (X) {
        au = this._betCalc.calcReturns(at, am, aa, ac, ab, Y, ar);
        ae = (au.payout + au.bonus);
        if (ae > ai) {
          ai = ae;
          ad = au.bonus;
        }
      }
    }
    aq += this._betCalc.calcCost(av, ab, Y, ar);
    Log.debug(this._controllerName() + "._calcCombinations, END, " + (new Date().getTime() - aj) + "ms");
    return{payout: ai, bonus: ad, cost: aq};
  }, _calcAll: function (ah, ac, Y, aa, ag, ab) {
    Log.debug(this._controllerName() + "._calcAll, START");
    var ai = new Date().getTime();
    var X = [
      {choices: ah.concat()}
    ];
    var Z = this._betCalc.calcCost(X, Y, aa, ag);
    var ae = this._bonusSelectionsCount();
    var af = this._bonusMaxPercent();
    var ad = (ab)
      ? {payout: 0, bonus: 0}
      : this._betCalc.calcReturns(ae, af, X, ac, Y, aa, ag);
    Log.debug(this._controllerName() + "._calcAll, END, " + (new Date().getTime() - ai) + "ms");
    return{payout: (ad.payout + ad.bonus), bonus: ad.bonus, cost: Z};
  }, _eachChoise: function (Y) {
    var X = this;
    N("input[id*='eprice.']").each(function (ad, ac) {
      ac = N(ac);
      var ae = ac.attr("id").replace("eprice.", "");
      var ag = X._parseFloat(ac);
      var af = $$("ew.fraction." + ae);
      var ab = X._parseFloat(af);
      var aa = $$("antiexp.fraction." + ae);
      var Z = X._parseFloat(aa);
      Y(ae, ag, ab, Z);
    });
  }, _ewEl: function () {
    var X = $$("accumulator.ew");
    return(X)
      ? N(X)
      : false;
  }, _isew: function () {
    return hasAttr(this._ewEl(), "checked");
  }, _stakeEl: function () {
    var X = $$("accumulator.stake");
    return(X)
      ? N(X)
      : false;
  }, _stake: function () {
    var Z = null, Y = null;
    var X = this._stakeEl();
    if (X) {
      X = N(X);
      Z = N.trim(X.attr("value"));
      Y = N.trim(X.attr("rel"));
    }
    return this._stakeVal(Z, Y);
  }, _isvipEl: function () {
    var X = $$("accumulator.vip");
    return(X)
      ? N(X)
      : false;
  }, _isvip: function () {
    return hasAttr(this._isvipEl(), "checked");
  }, _halfplace: function (Y) {
    var X = $$("halfplace." + Y);
    return this._parseFloat(X);
  }, _expresses: function (Y) {
    var X = $$("systemExpresses." + Y);
    if (X) {
      try {
        return JSON.parse(N(X).val());
      }
      catch (Z) {
      }
    }
    return[];
  }, _controllerName: function () {
    return"AccumulatorsController";
  }});
  var M = L.extend({init: function () {
    this._contentUrl = initData.base_dir + "/betslip/antiexpress.htm";
    this._betCalc = new o();
  }, getSUrl: function () {
    return"ANTIEXPRESS";
  }, _abortAccumulatorSave: function () {
    this._abortSave("@antiexpresses");
  }, _queueSaveAccumulator: function (X) {
    this._queueSave("@antiexpresses", {p: "ANTIEXPRESSES", bt: X.bt, st: X.st, ew: X.ew, v: X.v});
  }, _controllerName: function () {
    return"AntiexpressesController";
  }});
  var U = E.extend({_bets: {}, init: function () {
    this._contentUrl = initData.base_dir + "/betslip/multiple.htm";
    this._betCalc = new l();
  }, placeBet: function (Z, Y) {
    var X = [];
    this._eachBet(function (ac, ab, aa, ad) {
      X.push({bettype: ac, stake: ab, vip: ad, ew: aa});
    });
    this._abortSave("@multiples");
    getAsyncDispatcher().postAndParse(f, {p: D, b: JSON.stringify(X)}, Z, false, Y);
  }, checkBet: function (X) {
    this._checkBet(X);
  }, hasAnyStake: function () {
    var X = 0;
    this._eachBet(function (aa, Z, Y, ab) {
      X++;
    });
    return X > 0;
  }, _activate: function () {
    this._putCursor(this._stakeElArr());
    this._resetBets();
    this._calcReturns();
    this._vipBetHint();
  }, _resetBets: function () {
    var X = this;
    this._bets = {};
    this._eachBet(function (aa, Z, Y, ab) {
      X._checkBet(aa);
    }, true);
    this._eachBet(function (aa, Z, Y, ab) {
      X._checkBet(aa);
      X._bets[aa] = X._calcResult(aa, Z, Y);
    });
  }, _checkBet: function (Z) {
    var ad = this._stakeEl(Z);
    if (!(ad)) {
      return false;
    }
    var ac = ad.attr("rel");
    var Y = this._stakeVal(ad.val(), ac);
    var X = this._isew(Z);
    var aa = this._isvipEl(Z);
    var ab = false;
    if (this._hasVip(Z, Y)) {
      this._enableEl(aa);
      ab = this._isvip(Z);
    }
    else {
      this._disableEl(aa);
      this._uncheckEl(aa);
    }
    this._queueSave("@multiples", {p: "MULTIPLES", bt: Z, st: Y, ew: X, v: ab});
    this._silentCheck(Z, Y, ac, X);
  }, _calcReturns: function () {
    var Y = this._bets;
    var aa = false;
    var Z = 0, ac = 0, ab = 0;
    for (type in Y) {
      var X = Y[type];
      if (X.uncalc) {
        aa = true;
        this._betreturns(type, 0);
        this._betbonus(type, 0);
      }
      else {
        this._betreturns(type, (X.payout - X.bonus));
        this._betbonus(type, X.bonus);
      }
      if (!(aa)) {
        Z += X.payout;
        ac += X.bonus;
      }
      ab += X.cost;
    }
    if (aa) {
      Z = 0;
      ac = 0;
    }
    this._totalReturns(Z - ac);
    this._expressBonus(ac);
    this._totalCost(ab);
  }, _silentCheck: function (Z, Y, aa, X) {
    this._bets[Z] = this._calcResult(Z, Y, X);
    this._calcReturns();
  }, _calcResult: function (ac, Y, Z) {
    if (!(Y)) {
      return{payout: 0, bonus: 0, cost: 0};
    }
    var af = [], ab = false, X = 0;
    var ad = this._halfplace(ac);
    var aa = [];
    this._eachChoise(function (ah, ai, ag) {
      af.push({ewfraction: ag, eprice: ai, isew: (1 != ag)});
      X += (1 + ai);
      if (ai < 0) {
        ab = true;
      }
    });
    var ae = this._calcAll(af, ac, Y, Z, ad, ab);
    if (Z && ad < Y) {
      aa.push({name: N('option[value="' + ac + '"]').text(), win: Y, place: Y / 2});
    }
    n(aa);
    return{totalprice: X, uncalc: ab, payout: ae.payout, bonus: ae.bonus, cost: ae.cost};
  }, _calcAll: function (ah, ac, Y, aa, ag, ab) {
    Log.debug("MultiplesController._calcAll, START");
    var ai = new Date().getTime();
    var X = this._betCalc.combine(ah, ac);
    var Z = this._betCalc.calcCost(X, Y, aa, ag);
    var ae = this._bonusSelectionsCount();
    var af = this._bonusMaxPercent();
    var ad = (ab || X.N)
      ? {payout: 0, bonus: 0}
      : this._betCalc.calcReturns(ae, af, X, ac, Y, aa, ag);
    Log.debug("MultiplesController._calcAll, END, " + (new Date().getTime() - ai) + "ms");
    return{payout: (ad.payout + ad.bonus), bonus: ad.bonus, cost: Z};
  }, _eachBet: function (Z, Y) {
    var X = this;
    if (Y === undefined) {
      Y = false;
    }
    N(this._stakeElArr()).each(function (ac, ag) {
      ag = N(ag);
      var af = ag.attr("rel");
      var ab = X._stakeVal(ag.val(), af);
      if (ab == false && Y) {
        ab = true;
      }
      if (ab) {
        var ad = ag.attr("id").replace("multiples.stake.", "");
        var ae = X._isvip(ad);
        var aa = X._isew(ad);
        Z(ad, ab, aa, ae);
      }
    });
  }, _eachChoise: function (Y) {
    var X = this;
    N("input[id*='eprice.']").each(function (ab, aa) {
      aa = N(aa);
      var ac = aa.attr("id").replace("eprice.", "");
      var ae = X._parseFloat(aa);
      var ad = $$("ew.fraction." + ac);
      var Z = X._parseFloat(ad);
      Y(ac, ae, Z);
    });
  }, _betreturns: function (Z, X) {
    var Y = $$("multiples.returns." + Z);
    if (Y) {
      N(Y).html(this._formatValue(X));
    }
  }, _betbonus: function (Z, aa) {
    var Y = $$("multiples.bonus." + Z);
    if (Y) {
      N(Y).html(this._formatValue(aa));
    }
    var X = $$("multiples.bonus." + Z + "_container");
    if (X && aa === 0) {
      N(X).hide();
    }
    else {
      if (X) {
        N(X).show();
      }
    }
  }, _halfplace: function (Y) {
    var X = $$("halfplace." + Y);
    return this._parseFloat(X);
  }, _stakeElArr: function () {
    return N("input[id*='multiples.stake.']");
  }, _stakeEl: function (Y) {
    var X = $$("multiples.stake." + Y);
    return(X)
      ? N(X)
      : false;
  }, _ewEl: function (Y) {
    var X = $$("multiples.ew." + Y);
    return(X)
      ? N(X)
      : false;
  }, _isew: function (X) {
    return hasAttr(this._ewEl(X), "checked");
  }, _isvipEl: function (Y) {
    var X = $$("multiples.vip." + Y);
    return(X)
      ? N(X)
      : false;
  }, _isvip: function (X) {
    return hasAttr(this._isvipEl(X), "checked");
  }});
  var K = p.extend({init: function () {
    this._contentUrl = initData.base_dir + "/betslip/freebet.htm";
    this._betCalc = new y();
  }, showEnterStakeDialog: function () {
    N.modal.close();
    N("#no_selected_freebets").modal({position: ["20%", ]});
  }, placeBet: function (ac, aa) {
    var ab = N(".freebet\\-radio:checked");
    var Z = ab.val();
    if (Z == null || Z === "undefined") {
      N.modal.close();
      N("#no_selected_freebets").modal({position: ["20%", ]});
    }
    var X = this._isew(Z);
    var Y = [
      {freebetindex: Z, ew: X}
    ];
    this._abortSave("@freebets");
    getAsyncDispatcher().postAndParse(f, {p: "FREEBETS", b: JSON.stringify(Y)}, ac, false, aa);
  }, _activate: function () {
    Log.debug("executed FreebetsController._activate");
    this._vipBetHint();
  }, checkBet: function (ab) {
    this._queueSave("@freebets", {fi: ab, p: "FREEBETS", ew: Y});
    var Z = this._stake(ab);
    var Y = this._isew(ab);
    var aa = this._calcBet("freebet", Z, Y);
    aa.payout -= aa.cost;
    var X = this._calcResult([aa]);
    this._totalReturns(X.payout);
    this._totalCost(X.cost);
  }, _stake: function (X) {
    var Y = $$("freebet.stake." + X);
    return(Y)
      ? N(Y).val()
      : false;
  }, _isew: function (X) {
    var Y = $$("freebet.ew." + X);
    return hasAttr(Y, "checked");
  }});
  var G = Class.extend({iterate: function (af, ad, ac) {
    var ae = 0, X = 0;
    for (var aa = 0, ab = af.length, Z = null, Y = null; aa < ab; aa++) {
      Z = af[aa];
      ae += ad(Z.eprice, Z.ewfraction, Z.halfplace);
      X += ac(Z.eprice, Z.ewfraction, Z.halfplace);
    }
    return{payout: ae, cost: X};
  }});
  var y = G.extend({calc: function (Z, Y, X) {
    Y = Number(Y);
    X = Boolean(X);
    return this.iterate(Z, (function (ac, ab, aa) {
      if (ac <= 0) {
        return 0;
      }
      return(((ac + 1) * Y) + ((X)
        ? ((ac * ab + 1) * ((aa < Y)
        ? Y / 2
        : Y))
        : 0));
    }), (function (ac, ab, aa) {
      return Y + ((X)
        ? (aa < Y)
        ? Y / 2
        : Y
        : 0);
    }));
  }});
  var e = G.extend({calcCost: function (aa, Z, Y, X) {
    return(aa.length) * (Z + ((Y)
      ? (X < Z)
      ? Z / 2
      : Z
      : 0));
  }, calcReturns: function (aq, ak, af, aa, Z, Y, ap) {
    var ac = (ap < Z);
    var ae = 0;
    var ah = 0;
    var ab = 0;
    for (var X, ag = 0, al = 0, ad = 0, am = false, aj = 0, an = (af.length - 1); an >= 0; an--) {
      X = af[an].choices;
      ag = Z, al = Z;
      for (var ao, ai = (X.length - 1); ai >= 0; ai--) {
        ao = X[ai];
        aj = ao.ewfraction;
        ad = ao.eprice;
        if (ad <= 0) {
          return 0;
        }
        ag = ((ad + 1) * ag);
        al = ((ad * aj + 1) * ((ac)
          ? al / 2
          : al));
      }
      ae += ag;
      ah += ((Y)
        ? al
        : 0);
      ab += this._calcBonus(aq, ak, X, Z, ag);
    }
    return{payout: (ae + ah), bonus: ab};
  }, _calcBonus: function (Y, ab, ad, X, Z) {
    if (!Y || !ab) {
      return 0;
    }
    var aa = ad.length;
    if (aa < Y) {
      return 0;
    }
    if (aa > ab) {
      aa = ab;
    }
    var ac = (Z - X);
    if (ac < 0) {
      return 0;
    }
    return(ac * (aa / 100));
  }});
  var o = e.extend({calcReturns: function (at, ao, ai, aa, Y, X, aq) {
    var ar = 0.045;
    var ag = 0.01;
    var Z = 91;
    var ad = [];
    var ap = [];
    var av = 1;
    var ah = 1;
    for (var an = 0; an < ai.length; an++) {
      choices = ai[an].choices;
      if (choices) {
        for (var ak = 0; ak < choices.length; ak++) {
          ad.push(choices[ak].eprice + 1);
          av *= (choices[ak].eprice + 1);
          ap.push(choices[ak].antiexpPrice);
          ah *= choices[ak].antiexpPrice;
        }
      }
    }
    var aj = ah / (ah - 1);
    var am = 0;
    if (av <= Z) {
      am = 1 / (1 / (1 - ar) - 1 / av);
      if (am < 1.001) {
        am = 1 / (1 / (1 - ag) - 1 / av);
        if (am < 1.001) {
          am = 0;
        }
      }
    }
    var au = 1 - av * aj / (av + aj);
    var ac = 0;
    if (au > ar) {
      ac = 1;
    }
    else {
      if (am >= 1.001) {
        ac = (Math.log(am / (am - 1)) / Math.log(ah));
      }
    }
    var af = 1;
    for (var al = 0; al < ap.length; al++) {
      var ab = ac > 0
        ? Math.pow(ap[al], ac)
        : 0;
      af *= ab;
    }
    var ae = af >= 1.001
      ? af / (af - 1)
      : 0;
    return{payout: ae * Y, bonus: 0};
  }});
  var l = e.extend({_withsingles: {PATENT: true, LUCKY15: true, LUCKY31: true, LUCKY63: true, ALPHABET: true}, withsingles: function (X) {
    return Boolean(this._withsingles[X]);
  }, calcCost: function (aa, Z, Y, X) {
    var ab = 1;
    if (aa.N) {
      ab = aa.N;
    }
    else {
      ab = aa.length;
    }
    return(ab) * (Z + ((Y)
      ? (X < Z)
      ? Z / 2
      : Z
      : 0));
  }, combine: function (aa, Y) {
    if (!aa) {
      return;
    }
    var Z = aa.length;
    var X = function (ad) {
      var ac = 1;
      for (var ab = 1; ab <= ad; ab++) {
        ac *= ab;
      }
      return ac;
    };
    if (Y == "STRAIGHT_FORECAST" || Y == "STRAIGHT_TRICAST") {
      return result = {N: 1};
    }
    else {
      if (Y == "REVERSE_FORECAST") {
        return result = {N: 2};
      }
      else {
        if (Y == "REVERSE_TRICAST") {
          return result = {N: 6};
        }
        else {
          if (Y == "COMBINATION_FORECAST") {
            return result = {N: 2 * X(Z) / (X(2) * X(Z - 2))};
          }
          else {
            if (Y == "COMBINATION_TRICAST") {
              return result = {N: 6 * X(Z) / (X(3) * X(Z - 3))};
            }
          }
        }
      }
    }
    return this.defaultCombine(aa, Y);
  }, defaultCombine: function (ad, ab) {
    var ae = this.withsingles(ab);
    var aa = null;
    var af = [
      {choices: ad}
    ];
    for (var Y = 1, Z = Math.pow(2, ad.length) - 1; Y < Z; Y++) {
      aa = [];
      for (var X = 0; X < Y; X++) {
        var ac = Math.pow(2, X);
        if (Y & ac) {
          aa.push(ad[X]);
        }
      }
      if (aa.length === 1 && !(ae)) {
        continue;
      }
      af.push({choices: aa});
    }
    return af;
  }});
  O.ONECLICK = new a();
  O.ACCUMULATORS = new L();
  O.MULTIPLES = new U();
  O.FREEBETS = new K();
  O.SINGLES = new p();
  O.SHORT = new R();
  O.ANTIEXPRESSES = new M();
  window.Betslip = {};
  window.Betslip.STAKE_LIMIT = 9999999999.99;
  N(document).ready(function () {
    g();
    window.toggleBetslip = function (Y) {
      var X = O[(Y)
        ? Y
        : r];
      if (!(X)) {
        return false;
      }
      v(X._contentUrl);
    };
    window.getOneClick = function () {
      return O.ONECLICK;
    };
    window.getBetslip = function () {
      return O[D];
    };
    window.toggleBetslipEmpty = function () {
      N(".stake-no").toggle();
      J();
    };
  });
})(window.jQuery);
function extractSum(c, j, k) {
  var p = c.value;
  var f = /,/g;
  if (f.test(p)) {
    p = p.replace(/,/g, ".");
  }
  var o = "[0-9]*";
  if (j > 0) {
    o += "\\.?[0-9]{0," + j + "}";
  }
  else {
    if (j < 0) {
      o += "\\.?[0-9]*";
    }
  }
  o = k
    ? "^-?" + o
    : "^" + o;
  o = o + "$";
  var e = new RegExp(o);
  if (e.test(p)) {
    if (p.indexOf(".") == 0) {
      p = "0" + p;
    }
  }
  var l = "[^0-9" + (j != 0
    ? "."
    : "") + (k
    ? "-"
    : "") + "]";
  var d = new RegExp(l, "g");
  if (d.test(p)) {
    p = p.replace(d, "");
  }
  if (k) {
    var h = p.length > 0 && p.charAt(0) == "-";
    var b = /-/g;
    if (b.test(p)) {
      p = p.replace(b, "");
    }
    if (h) {
      p = "-" + p;
    }
  }
  if (j != 0) {
    var a = /\./g;
    var g = a.exec(p);
    if (g != null) {
      var m = p.substring(g.index + g[0].length);
      m = m.replace(a, "");
      m = j > 0
        ? m.substring(0, j)
        : m;
      p = p.substring(0, g.index) + "." + m;
    }
  }
  if (p.indexOf(".") == 0) {
    p = "0" + p;
  }
  if (p !== "" && c.prev) {
    var n = parseFloat(p);
    if (isNaN(n) || Betslip.STAKE_LIMIT < n) {
      p = c.prev;
      c.prev = false;
    }
  }
  if (c.value != p) {
    c.value = p;
  }
}
function checkPaste(b, k, m, j, f) {
  var l = b.value;
  var c = k.clipboardData && k.clipboardData.getData
    ? k.clipboardData.getData("text/plain")
    : window.clipboardData && window.clipboardData.getData
    ? window.clipboardData.getData("Text")
    : false;
  if (!c) {
    return true;
  }
  var h = getSelectionRange(b);
  var a = h.start;
  var d = h.end;
  if (a >= 0 && d >= 0) {
    var g = l.substring(0, a) + c + l.substring(d, l.length);
    l = g;
  }
  return checkValue(l, m, j, f);
}
function checkChar(b, s, c, l, a) {
  var u = false;
  var m = false;
  var p = b.value;
  var z, v;
  if (window.event) {
    u = window.event.shiftKey;
    m = window.event.ctrlKey;
    z = s.keyCode;
  }
  else {
    if (s.which || s.keyCode) {
      u = s.shiftKey;
      m = s.ctrlKey;
      z = (s.which)
        ? s.which
        : s.keyCode;
    }
  }
  if (isNaN(z)) {
    return true;
  }
  var x = (8 == z);
  var j = (46 == z);
  if (!hasValue(z) || x || j) {
    return true;
  }
  else {
    v = String.fromCharCode(z);
  }
  var d = l
    ? (v && v == "-" && p.indexOf("-") == -1)
    : false;
  var k = c
    ? (v && v == "." && p.indexOf(".") == -1)
    : false;
  var o = (u && z == 45) || (m && (v == "v" || v == "V"));
  var h = /[\d,]+/;
  if (d || k || (v && h.test(v))) {
  }
  else {
    if (o) {
      var p = b.value;
      if (p === "") {
        return true;
      }
      else {
        if (checkValue(p, c, l, a)) {
          b.prev = p;
          return true;
        }
        else {
          return false;
        }
      }
    }
    else {
      if (m) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  var r = p.length;
  var n = getSelectionRange(b);
  var g = n.start;
  var f = n.end;
  var y = (g >= 0 && f >= 0);
  if (y && g < f) {
    return true;
  }
  else {
    if (y && g === f && g < r) {
      var t = p.substring(0, g) + v + p.substring(f, r);
      p = t;
    }
    else {
      p += v;
    }
  }
  return checkValue(p, c, l, a);
}
function checkValue(j, k, f, e) {
  var g = "[^0-9" + ((k && e != 0)
    ? "."
    : "") + (f
    ? "-"
    : "") + "]";
  var c = new RegExp(g, "g");
  if (c.test(j)) {
    return false;
  }
  if (e && e > 0) {
    var b = /\./g;
    var a = b.exec(j);
    if (a != null) {
      var d = j.substring(a.index + a[0].length);
      d = d.replace(b, "");
      if (d.length > e) {
        return false;
      }
    }
  }
  var h = parseFloat(j);
  if (isNaN(h) || Betslip.STAKE_LIMIT < h) {
    return false;
  }
  return true;
}
function isStake(d, c) {
  if (Log.DEBUG) {
    Log.debug("function isStake() - called, oInput=" + $("<div>").append($(d).clone()).remove().html());
  }
  var e = $.trim(d.value);
  var b = $.trim($(d).attr("rel"));
  if (Log.DEBUG) {
    Log.debug("function isStake() - sValue=" + e + ",hint=" + b);
  }
  if (e != "" && e != "." && e != b) {
    if (Log.DEBUG) {
      Log.debug("function isStake() - sValue != '' && sValue != '.' && sValue != hint");
    }
    e = e.replace(/,/g, "");
    var a = parseFloat(e);
    if (a >= 0 && a == e) {
      if (Log.DEBUG) {
        Log.debug("function isStake() - returns true, sValue=" + e);
      }
      return true;
    }
    else {
      $("#invalid_stake_dialog").modal({position: ["20%", ]});
      if (Log.DEBUG) {
        Log.debug("function isStake() - returns false, sValue=" + e);
      }
      return false;
    }
  }
  else {
    if (Log.DEBUG) {
      Log.debug("function isStake() - sValue == '' || sValue == '.' || sValue == hint");
    }
    if (c) {
      d.value = b;
    }
    if (Log.DEBUG) {
      Log.debug("function isStake() - returns true, sValue=" + b);
    }
    return true;
  }
}
function getEl(a) {
  if (typeof a === "string") {
    a = $$(a);
  }
  return a;
}
function isEmpty(d) {
  var a = false;
  if (typeof(d) == "string" && d.indexOf("#") == 0) {
    a = true;
  }
  if (a) {
    d = $("[id='" + d.substring(1) + "']");
  }
  else {
    d = $(d);
  }
  var c = $.trim(d.val());
  var b = $.trim(d.attr("rel"));
  if (c == b) {
    return true;
  }
  if (c == "" || c == ".") {
    d.val(b);
    return true;
  }
  return false;
}
function getSUrlByInputs(c, e) {
  var b = [];
  if (!c) {
    return b;
  }
  if (!c.length) {
    c = [c];
  }
  var a = c.length;
  var f, d;
  $.each(c, function (g, h) {
    f = $(h).attr("id");
    if (!f) {
      return false;
    }
    d = f.replace(e, "");
    b.push(d);
  });
  return b;
}
function hasValue(a) {
  switch (a) {
    case 9:
    case 13:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 27:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
      return false;
    default:
      return true;
  }
}
function noValue(b) {
  var a;
  if (!b) {
    var b = window.event;
  }
  if (b.keyCode) {
    a = b.keyCode;
  }
  else {
    if (b.which) {
      a = b.which;
    }
  }
  return !hasValue(a);
}
function setValue(c, a) {
  try {
    $(c).val(parseFloat(a));
  }
  catch (b) {
  }
}
function getSelectionRange(e) {
  var h = -1, c = -1, g, d, b, a, f;
  if (typeof e.selectionStart == "number" && typeof e.selectionEnd == "number") {
    h = e.selectionStart;
    c = e.selectionEnd;
  }
  else {
    d = document.selection.createRange();
    if (d && d.parentElement() == e) {
      a = e.value.length;
      g = e.value.replace(/\r\n/g, "\n");
      b = e.createTextRange();
      b.moveToBookmark(d.getBookmark());
      f = e.createTextRange();
      f.collapse(false);
      if (b.compareEndPoints("StartToEnd", f) > -1) {
        h = c = a;
      }
      else {
        h = -b.moveStart("character", -a);
        h += g.slice(0, h).split("\n").length - 1;
        if (b.compareEndPoints("EndToEnd", f) > -1) {
          c = a;
        }
        else {
          c = -b.moveEnd("character", -a);
          c += g.slice(0, c).split("\n").length - 1;
        }
      }
    }
  }
  return{start: h, end: c};
}
function showHalfPlaceWarning(d) {
  var a = $$("half-palace-msg");
  var b = $$("half-place-dialog");
  if (b && a) {
    var c = formatHalfPlaceMsg(d);
    $.modal.close();
    $(a).html(c);
    $(b).modal({position: ["20%", ]});
  }
}
function formatHalfPlaceMsg(g) {
  var f = "", d = LOCALE_com_panbet_localization_BetWebBundle_HALFPLACE_BET;
  for (var c = 0, a = g.length, b = null, e = true; c < a; c++) {
    b = g[c];
    if (!e) {
      f += "<br>";
    }
    else {
      e = false;
    }
    f += formatTemplateMsg(d, b.name, b.win, b.place);
  }
  return f;
}
function formatTemplateMsg(c) {
  for (var b = 1, a = arguments.length; b < a; b++) {
    c = c.replace("{" + (b - 1) + "}", arguments[b]);
  }
  return c;
}
function isOneClickChecked() {
  var a = $$("bet-in-one-click-checked");
  return hasAttr(a, "checked");
}
function hasAttr(c, b) {
  c = $(c);
  if (!(c)) {
    return false;
  }
  var a = c.attr(b);
  return(typeof a !== "undefined" && a !== false);
}
var BETSLIP_PLACE_MODE_BLOCK_COOKIE = "betslipPlaceModeBlock";
var BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR = "#betslipPlacingModeBlockId";
function showHideBetslipPlaceModeBlock() {
  if ($(BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR).is(":visible")) {
    $(BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR).hide();
    $.cookie(BETSLIP_PLACE_MODE_BLOCK_COOKIE, false, {expires: 42 * 365, path: "/"});
  }
  else {
    $(BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR).show();
    $.cookie(BETSLIP_PLACE_MODE_BLOCK_COOKIE, true, {expires: 42 * 365, path: "/"});
  }
}
function setupBetslipPlaceModeBlockVisibility() {
  if ($.cookie(BETSLIP_PLACE_MODE_BLOCK_COOKIE) == "true") {
    $(BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR).show();
  }
  else {
    $(BETSLIP_PLACE_MODE_BLOCK_ID_SELECTOR).hide();
  }
}
(function (c) {
  var b = [];

  function d() {
    c(".js-price-highlighted").removeClass("js-price-highlighted");
  }

  function a() {
    if (0 == b.length) {
      return;
    }
    var f = null;
    for (var e in b) {
      f = b[e];
      c(".js-highlight-" + f).addClass("js-price-highlighted");
    }
  }

  c(document).bind("betslip.loaded", function (e, f) {
    if (!(f) || !(c.isArray(f))) {
      return;
    }
    b = f;
    d();
    a();
  });
  c(document).bind("content.loaded", function (e) {
    a();
  });
})(window.jQuery);
(function (c) {
  var a = PanbetConst.Messages;
  c.extend(c.validator.messages,
    {required: a.FIELD_REQUIRED, remote: a.FIELD_REMOTE, url: a.URL_ERR, date: a.DATE, dateISO: a.DATE, number: a.NUMBER, digits: a.DIGITS, creditcard: a.CREDITCARD, equalTo: a.EQUALTO, accept: a.ACCEPT_EXT_ERR, maxlength: c.validator.format(a.MAX_LENGTH), minlength: c.validator.format(a.MIN_LENGTH), rangelength: c.validator.format(a.RANGE_LENGTH), range: c.validator.format(a.RANGE), max: c.validator.format(a.MAX), min: c.validator.format(a.MIN)});
  var f = {validDateFormat: function (d, g) {
    return c.validator.format(a.DATE_WITH_FORMAT_ERR, g.format);
  }, validDateLimit: function (d, g) {
    return c.validator.format(a.DATE_RANGE_ERR, g.fromFormDate, g.toFormDate);
  }};
  var b = {validDateFormat: function (d, g) {
    return a.DATE_OF_BITH_ERR;
  }, validDateLimit: function (d, g) {
    return c.validator.format(a.DATE_RANGE_ERR, g.fromFormDate, g.toFormDate);
  }};
  PanbetBaseMessages = {dateISO: a.DATE, deposit_limit: {regex: a.DEFAULT_FIELD_ERR}, stake_limit: {regex: a.DEFAULT_FIELD_ERR}, cvv: {regex: a.DEFAULT_FIELD_ERR}, login: {regex: function (g,
                                                                                                                                                                                             d) {
    return d.value.indexOf("@") != -1
      ? a.USERNAME_INCORRECT
      : a.LOGIN_REGEXP_ERROR;
  }}, login_password: {regex: a.AUTHENTIFICATION_PASSWORD_REGEXP_ERROR}, username: {regex: a.DEFAULT_FIELD_ERR}, check_password: {regex: a.DEFAULT_FIELD_ERR}, password: a.PASSWORD_REQUIRED, oldpassword: {regex: a.DEFAULT_FIELD_ERR}, confirmpassword: a.CONFIRM_PASSWORD_ERR, phone1: {regex: a.PHONE_REQUIRED}, phone2: {regex: a.DEFAULT_FIELD_ERR}, nameoncard: {regex: a.DEFAULT_FIELD_ERR}, wmpurse: {regex: a.DEFAULT_FIELD_ERR}, amount: {regex: a.DEFAULT_FIELD_ERR}, amount_manual: {regex: a.DEFAULT_FIELD_ERR}, aemail: {regex: a.EMAIL_REQUIRED}, aemail2: a.CONFIRM_EMAIL_ERR, secure_id: {regex: a.DEFAULT_FIELD_ERR}, netellerpurse: {regex: a.DEFAULT_FIELD_ERR}, moneta_purse: {regex: a.DEFAULT_FIELD_ERR}, postcode: a.POSTCODE_REQUIRED, email_purse: {regex: a.DEFAULT_FIELD_ERR}, ukashVoucherNumber: {regex: a.DEFAULT_FIELD_ERR}, ukashVoucherValue: {regex: a.DEFAULT_FIELD_ERR}, promo: {regex: a.PROMO_REQUIRED}, mobile_phone: {regex: a.MOBILE_PHONE_REQUIRED}, oneclickbetstakevalue: {regex: a.DEFAULT_FIELD_ERR}, agreement_checkbox: {required: a.AGREEMENT_REQUIRED}, card_number: {regex: a.CARD_NUM_REQUIRED}, nip: {regex: a.DEFAULT_FIELD_ERR}, fromDate: f, toDate: f, birthday: b, periodsefield: {validDateFormat: function (d,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          g) {
    return c.validator.format(a.DATE_WITH_FORMAT_ERR, g.format);
  }, validDateLimit: function (d, g) {
    return a.SELFEXCLUSION_DATE_MIN;
  }}, address1: a.ADDRESS_REQUIRED, town: a.TOWN_REQUIRED, websanswer: a.WEBSANSWER_REQUIRED, ccsanswer: a.CCSANSWER_REQUIRED, firstname: a.FIRSTNAME_REQUIRED, surname: a.SURNAME_REQUIRED, walletonepurse: a.WALLET_ONE_PURSE_ERR};
  var e = PanbetConst.Date;
  DatepickerLocalization = {days: [e.DAYS_SUN, e.DAYS_MON, e.DAYS_TUE, e.DAYS_WED, e.DAYS_THU, e.DAYS_FRI, e.DAYS_SAT, e.DAYS_SUN], daysShort: [e.DAYS_SH_SUN,
    e.DAYS_SH_MON, e.DAYS_SH_TUE, e.DAYS_SH_WED, e.DAYS_SH_THU, e.DAYS_SH_FRI, e.DAYS_SH_SAT, e.DAYS_SH_SUN], daysMin: [e.DAYS_MIN_SUN, e.DAYS_MIN_MON,
    e.DAYS_MIN_TUE, e.DAYS_MIN_WED, e.DAYS_MIN_THU, e.DAYS_MIN_FRI, e.DAYS_MIN_SAT, e.DAYS_MIN_SUN], months: [e.MONTH_JAN, e.MONTH_FEB, e.MONTH_MAR,
    e.MONTH_APR, e.MONTH_MAY, e.MONTH_JUN, e.MONTH_JUL, e.MONTH_AUG, e.MONTH_SEP, e.MONTH_OCT, e.MONTH_NOV, e.MONTH_DEC], monthsShort: [e.MONTH_SH_JAN,
    e.MONTH_SH_FEB, e.MONTH_SH_MAR, e.MONTH_SH_APR, e.MONTH_SH_MAY, e.MONTH_SH_JUN, e.MONTH_SH_JUL, e.MONTH_SH_AUG, e.MONTH_SH_SEP, e.MONTH_SH_OCT,
    e.MONTH_SH_NOV, e.MONTH_SH_DEC], weekMin: e.WEEK_MIN, dayWeekStart: e.FIRST_DAY_OF_WEEK -
    1, dateFormat: e.DATEPICKER_DATE_FORMAT, maskDay: e.DATE_MASK_DAY, maskMonth: e.DATE_MASK_SH_MONTH, maskYear: e.DATE_MASK_YEAR, monthsGenitive: e.MONTHS_GEN};
}(jQuery));
$.validator.addMethod("regex", function (c, a, b) {
  if (b.constructor != RegExp) {
    b = new RegExp(b);
  }
  else {
    if (b.global) {
      b.lastIndex = 0;
    }
  }
  return this.optional(a) || b.test(c);
});
$.validator.addMethod("validDateFormat", function (c, b) {
  var a = $(b).parents("." + $.fn.PanbetDatepikerField.DATEPICKER_CLASS).PanbetDatepikerField("isValid");
  b.format = a.format;
  return a.valid;
});
$.validator.addMethod("validDateLimit", function (c, b) {
  var a = $(b).parents("." + $.fn.PanbetDatepikerField.DATEPICKER_CLASS).PanbetDatepikerField("isLimitValid");
  if (!a.valid) {
    b.fromFormDate = a.min;
    b.toFormDate = a.max;
  }
  return a.valid;
});
jQuery.validator.addClassRules("date", {validDateFormat: true, validDateLimit: true});
CashsourceHelper = function () {
};
CashsourceHelper.onDepositValueClick = function (a) {
  if (isNaN(parseMoneyString(a))) {
    $$(CashsourceHelper.AMOUNT_MANUAL_ID).disabled = false;
    $$(CashsourceHelper.AMOUNT_ID).value = $$(CashsourceHelper.AMOUNT_MANUAL_ID).value;
  }
  else {
    $$(CashsourceHelper.AMOUNT_MANUAL_ID).disabled = true;
    $$(CashsourceHelper.AMOUNT_ID).value = a;
    $("#" + CashsourceHelper.AMOUNT_MANUAL_ID).removeClass("error");
  }
  CashsourceHelper._highlightCommonValue(a);
};
CashsourceHelper.onSubmitClick = function () {
  if ($$(CashsourceHelper.AMOUNT_ID).value == "") {
    $$(CashsourceHelper.AMOUNT_MANUAL_ID).disabled = false;
  }
};
CashsourceHelper._highlightCommonValue = function (a) {
  $("[id^=c_value_]").removeClass("selected");
  $("[id=c_value_" + a + "]").addClass("selected");
};
CashsourceHelper.showWindow = function (a) {
  $("#" + a).modal({position: ["20%"]});
  $("#" + a).find(".no").focus();
};
CashsourceHelper.onWithdrawFormSubmit = function () {
  var e = $$(CashsourceHelper.FORM_ID), c = parseMoneyString(e.max_bonus_withdraw.value), d = parseMoneyString(e.amount.value), a = e.internal_purse, b = "withdraw_confirm";
  if (panbetValidate($("#" + CashsourceHelper.FORM_ID)).form()) {
    if (d > c) {
      b = "max_bonus_withdraw_confirm";
    }
    $("#" + b + " .message_withdraw_sum").html(d);
    if (a) {
      $("#" + b + " .message_withdraw_src_acct").html(a.options[a.selectedIndex].text);
    }
    CashsourceHelper.showWindow(b);
  }
  window.event && (window.event.returnValue = false);
  return false;
};
CashsourceHelper.onChangeInternalPurse = function () {
  var c = $$(CashsourceHelper.FORM_ID), a = c.internal_purse;
  var b = $(".field.balance #balance-value", c);
  $(".field.note", c).hide();
  switch (a.value) {
    case"casino":
      b.text($(".balance.casino", c).text());
      $(".field.note", c).show();
      break;
    case"virtualDeposit":
      b.text($(".balance.sportsbook", c).text());
      break;
    default:
      throw new Error("unsupported value: " + a.value);
  }
};
CashsourceHelper.onDepositFormSubmit = function () {
  var d = $$(CashsourceHelper.FORM_ID), b = parseMoneyString(d.amount.value), a = d.internal_purse, c = "deposit_confirm";
  if (panbetValidate($("#" + CashsourceHelper.FORM_ID)).form()) {
    $("#" + c + " .message_deposit_sum").html(b);
    if (a) {
      $("#" + c + " .message_deposit_dst_acct").html(a.options[a.selectedIndex].text);
    }
    CashsourceHelper.showWindow(c);
  }
  window.event && (window.event.returnValue = false);
  return false;
};
CashsourceHelper.onTransferFormSubmit = function () {
  var c = $$(CashsourceHelper.FORM_ID), a = parseMoneyString(c.amount.value), b = "deposit_confirm";
  if (panbetValidate($("#" + CashsourceHelper.FORM_ID)).form()) {
    $("#" + b + " .message_deposit_sum").html(a);
    CashsourceHelper.showWindow(b);
  }
  window.event && (window.event.returnValue = false);
  return false;
};
CashsourceHelper.onSelfExcludeFormSubmit = function () {
  return CashsourceHelper.onSimpleFormSubmit();
};
CashsourceHelper.onSimpleFormSubmit = function () {
  var b = $$(CashsourceHelper.FORM_ID), a = "simple_confirm";
  if (panbetValidate($("#" + CashsourceHelper.FORM_ID)).form()) {
    CashsourceHelper.showWindow(a);
  }
  window.event && (window.event.returnValue = false);
  return false;
};
CashsourceHelper.onMarathonSubmitForm = function () {
  var a = panbetValidate($("#" + CashsourceHelper.FORM_ID)).form();
  if (a) {
    CashsourceHelper.showProgress();
  }
  window.event && (window.event.returnValue = a);
  return a;
};
CashsourceHelper.proceedSubmitForm = function () {
  CashsourceHelper.showProgress();
  if (!initData.isMarathon) {
    $$(CashsourceHelper.FORM_ID).submit();
  }
};
CashsourceHelper.showProgress = function () {
  if (CashsourceHelper.SHOW_PROGRESS) {
    showProgressModal();
  }
};
CashsourceHelper.hideProgress = function () {
  if (CashsourceHelper.SHOW_PROGRESS) {
    closeModal();
  }
};
CashsourceHelper.FORM_ID = "form";
CashsourceHelper.AMOUNT_ID = CashsourceHelper.FORM_ID + "_amount";
CashsourceHelper.AMOUNT_MANUAL_ID = CashsourceHelper.FORM_ID + "_amount_manual";
CashsourceHelper.SHOW_PROGRESS = true;
SessionControl = function () {
  this.messageTimeout;
  this.isOpenInfoWindow = "false";
  this.isOpenAlertWindow = "false";
  this.tenSeconds = 10000;
  this.replaceTimeout;
  this.logoutHref;
  var a = false;
  this.initSessionUpdate = function () {
    if (initData.seance_update) {
      window.setTimeout("getSessionControl().updateSession()", initData.seance_update);
    }
    this._updateAlertTimeout();
  };
  this._updateAlertTimeout = function () {
    if (this.messageTimeout) {
      window.clearTimeout(this.messageTimeout);
    }
    if (initData.timeout && (initData.timeout != 0)) {
      this.messageTimeout = window.setTimeout("getSessionControl().alertPunter()",
        (initData.timeout - initData.sessionAlertInterval - initData.sessionAlertDelay));
    }
  };
  this.setOpenInfoWindow = function () {
    this.isOpenInfoWindow = "true";
  };
  this.getOpenAlertWindow = function () {
    return this.isOpenAlertWindow;
  };
  this.updateSession = function () {
    var b = this;
    $.ajax({type: "POST", dataType: "json", data: {update: a}, url: initData.seance_update_url, success: function (c) {
      b.performCallBack(c);
    }});
  };
  this.performCallBack = function (b) {
    if (b) {
      this._prolongateClientSession(b);
      if (b.serverTime && b.tzPrefix) {
        getClock().setServerTimeString(b.serverTime, b.tzPrefix);
      }
    }
    if (!a) {
      this.initSessionUpdate();
    }
    a = false;
  };
  this._prolongateClientSession = function (b) {
    if (b && b.sessionExpire) {
      initData.timeout = b.sessionExpire;
      this._updateAlertTimeout();
    }
  };
  this.registerProlongateClientSessionOnAjax = function () {
    var b = this;
    $("body").ajaxComplete(function (f, e, d) {
      try {
        var g = $.parseJSON(e.responseText);
        b._prolongateClientSession(g);
      }
      catch (c) {
      }
    });
  };
  this.alertPunter = function () {
    if (this.isOpenAlertWindow == "false") {
      this.replaceTimeout = setTimeout("getSessionControl().replacePage();", initData.sessionAlertInterval);
      this.isOpenAlertWindow = "true";
      $.modal.close();
      $("#session_timeout").modal({position: ["20%", ], escClose: false});
    }
  };
  this.replacePage = function () {
    $.modal.close();
    AuthHelper.logout();
    this.isOpenAlertWindow = "false";
  };
  this.prolongateSession = function () {
    clearTimeout(this.replaceTimeout);
    $.modal.close();
    this.isOpenAlertWindow = "false";
    $.ajax({type: "POST", dataType: "json", url: initData.seance_prolongate_url});
  };
  this.refreshPage = function () {
    clearTimeout(this.replaceTimeout);
    $.modal.close();
    window.location.reload();
    this.isOpenAlertWindow = "false";
  };
  this.checkUpdateSession = function (b) {
    a = b;
    if (a) {
      this.updateSession();
    }
  };
};
SessionControl._instance = null;
function getSessionControl() {
  if (!SessionControl._instance) {
    SessionControl._instance = new SessionControl();
  }
  return SessionControl._instance;
}
(function (a) {
  a.StringBuilder = function () {
    var b = [];

    function c(d) {
      return(null == d) || (typeof(d) == "undefined") || (d.length <= 0);
    }

    return{append: function (d) {
      if (c(d)) {
        return this;
      }
      b[b.length] = d;
      return this;
    }, clear: function () {
      b = [];
      return this;
    }, isEmpty: function () {
      return 0 == b.length;
    }, toString: function () {
      return b.join("");
    }};
  };
})(window);
(function (a) {
  Markets = function () {
  };
  Markets.ShortCutsLinksInfo = [];
  Markets.ATTRIBUTE_BLOCK_ID = "blockid";
  Markets.ATTRIBUTE_EVENT_ID = "eventid";
  Markets.ATTRIBUTE_TREE_ID = "treeid";
  Markets.ATTRIBUTE_EVENT_STATE = "eventstate";
  Markets.IMG_LOADING_POSTFIX = "_loading";
  Markets.IMG_LOADING_ATTR = "process";
  Markets.SHORTCUTS_ACTIVE = "active-shortcut-menu-link";
  Markets.SHORTCUTS_DISABLED = "not-clickable-menu-link";
  Markets.SHORTCUTS_ACTIVE_DISABLED = "active-not-clickable-menu-link";
  Markets.SHORTCUTS_LINK = "shortcutLink_event";
  Markets.SHORTCUTS_TYPE = "type";
  Markets.SHORTCUTS_BLOCK = "block";
  Markets.SHORTCUTS_ID = "shortcutsMenuTreeId";
  Markets.SHORTCUTS_ID_WRAPPED = "[id^='shortcutsMenuTreeId']";
  Markets.SHORTCUTS_ALL = "10";
  Markets.SHORTCUTS_SELECTED = "11";
  Markets.SHORTCUTS_FIRST = "1";
  Markets.SHORTCUTS_OTHER = "9";
  Markets.SHORTCUTS_MARKET_ID = "marketId";
  Markets.BODY_CONTENT = ".body-content";
  Markets.CONTAINER_EVENTS = "#container_EVENTS";
  Markets.SLASH = "/";
  Markets.COLON = ":";
  Markets.SEMICOLON = ";";
  Markets.COMMA = ",";
  Markets.SHORTCUTS_MENU_CUSTOM = "shortcuts-menu-custom.htm";
  Markets.CHECKBOX = "checkbox_";
  Markets.BLOCK_ID = "blockId";
  Markets.MARKET_BLOCK_HINT = ".markets-blocks-hint";
  Markets.ONLY_ONE_EVENT_OPEN_AM = false;
  Markets.ADDITIONAL_MARKET_HASH_ATTR = "am";
  Markets.ADD_ADDITIONAL_MARKET_HASH = false;
  Markets.LIVE_PAGE_AM_LOGIC = false;
  Markets.MORE_VIEW_PREF = "event-more-view-";
  Markets.punterPreference = function () {
  };
  Markets.punterPreference.couponeEventPreference = (function () {
    var j = {};
    var h = {};

    function g(o) {
      for (var n in o) {
        var m = Markets.generateBlockSelection(n, o[n], true);
        e(n, m);
      }
    }

    function d(m) {
      for (var o in m) {
        var n = Markets.generateMarketsCheckBoxesSelection(m[o], true);
        k(o, n);
      }
    }

    function e(m, n) {
      j[m] = n;
    }

    function f(m) {
      return j[m];
    }

    function k(m, n) {
      h[m] = n;
    }

    function b(m) {
      return h[m];
    }

    function l(n) {
      for (var m in h) {
        n(b(m));
      }
    }

    function c(n) {
      for (var m in j) {
        n(f(m));
      }
    }

    return{putMenuLinkState: e, getMenuLinkState: f, putBlockState: k, getBlockState: b, applyForBlockBoxes: l, applyForShortcutLinks: c, putServerPreferenceSelectedMenuLinks: g, putServerPrefenceCheckboxes: d};
  })();
  Markets.applyPunterPreferenceOnCouponEvent = function (b) {
    var c = Markets.getSortcutsLinksIdsInfo(b.eventId);
    if (b && a("#" + c.linkBlockAll).hasClass(Markets.SHORTCUTS_ACTIVE)) {
      if (b.active == false) {
        Markets.toggleMarketsBlockByEventIdAndBlockType(b.eventId, Markets.SHORTCUTS_ALL);
      }
      else {
        if (b.blockId != Markets.SHORTCUTS_ALL) {
          if (a("#" + c.linkTypeSimple + b.blockId).size() != 0) {
            Markets.toggleMarketsBlockByEventIdAndBlockType(b.eventId, b.blockId);
          }
          else {
            Markets.punterPreference.couponeEventPreference.putMenuLinkState(b.eventId, Markets.SHORTCUTS_ACTIVE);
          }
        }
      }
    }
  };
  Markets.applyPunterPreferenceOnCouponEventBlocksCheckboxes = function (b) {
    if (b) {
      a("input.markets-block-checkbox").filter("[id$='" + Markets.SHORTCUTS_TYPE + b.toggledCheckbox + "']").attr("checked", b.state);
    }
  };
  Markets.applyPunterPreference = function () {
    Markets.punterPreference.couponeEventPreference.applyForBlockBoxes(function (b) {
      Markets.applyPunterPreferenceOnCouponEventBlocksCheckboxes(b);
    });
    a(Markets.SHORTCUTS_ID_WRAPPED).each(function () {
      var b = a(this).attr("id").replace(Markets.SHORTCUTS_ID, "");
      Markets.changeShowMyButtonState(b.substring(0, b.indexOf(Markets.SHORTCUTS_TYPE)));
    });
    Markets.punterPreference.couponeEventPreference.applyForShortcutLinks(function (b) {
      Markets.applyPunterPreferenceOnCouponEvent(b);
    });
  };
  Markets.hasOpenedAdditionalMarketsOnLivePage = function () {
    var b = false;
    a('a[id*="' + Markets.MORE_VIEW_PREF + '"]').each(function () {
      if (a(this).attr("isLive") && a(this).attr("isLive") == "true") {
        b = true;
      }
    });
    return b;
  };
  EventView = function (b) {
    this.oView = b;
    this.getID = function () {
      return this.oView.getAttribute(Markets.ATTRIBUTE_EVENT_ID);
    };
    this.getEventID = function () {
      return this.oView.getAttribute(Markets.ATTRIBUTE_EVENT_ID).split("_").shift();
    };
    this.getTreeID = function () {
      return this.oView.getAttribute(Markets.ATTRIBUTE_TREE_ID);
    };
    this.isLive = function () {
      var c = this.oView.getAttribute("isLive");
      return c && c.toLowerCase() == "true";
    };
    this.isVisible = function () {
      if (!this.oView.eventState) {
        this.oView.eventState = this.oView.getAttribute(Markets.ATTRIBUTE_EVENT_STATE);
        this.oView.removeAttribute(Markets.ATTRIBUTE_EVENT_STATE);
      }
      return this.oView.eventState == "true";
    };
    this.setVisibility = function (c) {
      this.oView.eventState = c
        ? "true"
        : "false";
      var d = a(this.oView).parents("div[data-category-treeId]")[0];
      Markets.checkAllBetsLink(a(d).attr("data-category-treeId"));
    };
    this.close = function () {
      this.hideViewDetails();
      this.setVisibility(false);
    };
    this.show = function () {
      a(this.oView).css("display", "none");
      Markets.showProcess(this.oView.parentNode);
      if (Markets.ONLY_ONE_EVENT_OPEN_AM) {
        this.showViewDetails(this.hideOtherViewDetails);
      }
      else {
        this.showViewDetails();
      }
    };
    this.applyDetails = function () {
      Markets.showFoot(this.oView);
      Markets.hideProcess(this.oView.parentNode);
      a(this.oView).css("display", "");
      this.setVisibility(true);
      a(document).trigger("content.loaded");
    };
    this.showViewDetails = function (g, d) {
      var c = this;
      var e = this.getTreeID();
      var f = function () {
        Markets.hideProcess(c.oView.parentNode);
        a(c.oView).css("display", "");
        if (a.isFunction(d)) {
          d.apply(c);
        }
      };
      a.ajax({url: initData.base_dir + "/" + (this.isLive()
        ? "live"
        : "") +
        "markets.htm", type: "POST", dataType: "json", data: {treeId: this.getTreeID(), isChecked: a(c.oView).parents("[id^='event_']").find(".live-selection").prop("checked")}, success: function (l) {
        if (!l) {
          f();
          return;
        }
        var p = a(c.oView).parents("tr.event-header");
        if ("HTML_ROW_WITH_ADDITIONAL_MARKETS" in l) {
          var j = a(c.oView).attr("id"), o, h = false, n = false, m = a(l.HTML_ROW_WITH_ADDITIONAL_MARKETS);
          if (Markets.isNotLastEventRowInCoupone(a(c.oView).parents("[id^='event_']"))) {
            if (a(c.oView).parents("[id^='event_']").find(".market_footer").length > 0) {
              h = true;
            }
            else {
              o = Markets.createLabels(a(c.oView));
            }
          }
          else {
            n = true;
          }
          a(c.oView).parents("[id^='event_']").hide();
          if (h) {
            a(c.oView).parents("[id^='event_']").find(".event-header").replaceWith(m);
            c.oView = document.getElementById(j);
            a(c.oView).parents("[id^='event_']").find(".market_footer").show();
          }
          else {
            a(c.oView).parents("[id^='event_']").html(m);
            c.oView = document.getElementById(j);
            if (!n && o) {
              a(c.oView).parents("[id^='event_']").find("[class ^= 'market-details-']:last").after(o);
              o.attr("data-event-header", c.getTreeID());
            }
          }
          a(c.oView).parents("[id^='event_']").show();
          c.setVisibility("true");
        }
        else {
          a(c.oView).siblings().remove();
          a(c.oView).remove();
        }
        c.applyDetails();
        c.addHash();
        if (a.isFunction(g)) {
          g.apply(c);
        }
        var k = Markets.getLiveUpdatesHelper();
        if (k) {
          k.marketsInProgress(false);
        }
      }, error: f});
    };
    this.getDetails = function () {
      var c = a(a(this.oView).parents("tr.event-header"));
      return a(c.nextAll("tr.market-details-" + this.getTreeID()));
    };
    this.hideViewDetails = function () {
      this.removeHash();
      this.getDetails().remove();
      Markets.hideFoot(this.oView);
    };
    this.getViewDetailsHeight = function () {
      var c = 0;
      this.getDetails().each(function () {
        c += a(this).outerHeight();
      });
      var d = Markets.getFoot(this.oView);
      if (d != null) {
        c += d.outerHeight();
      }
      return c;
    };
    this.hideOtherViewDetails = function () {
      var d = this.getTreeID();
      var g = 0;
      var c = true;
      a('a[id*="' + Markets.MORE_VIEW_PREF + '"]').each(function (j, k) {
        if (a(k).attr("treeid") != d) {
          var h = new EventView(k);
          if (h && h.isVisible()) {
            if (c) {
              g += h.getViewDetailsHeight();
            }
            h.close();
          }
        }
        else {
          c = false;
        }
      });
      if (g > 0) {
        var f = a(".body-content");
        var e = f.scrollTop() - g;
        f.scrollTop(0 < e
          ? e
          : 0);
      }
    };
    this.addHash = function () {
      if (!Markets.ADD_ADDITIONAL_MARKET_HASH) {
        return;
      }
      var d = this.getTreeID();
      var c = Hash.valueToArray(Hash.getByKey(Markets.ADDITIONAL_MARKET_HASH_ATTR));
      if (c.length > 0) {
        if (-1 == a.inArray(d, c)) {
          c[c.length] = d;
          Hash.add(Markets.ADDITIONAL_MARKET_HASH_ATTR, c);
        }
      }
      else {
        Hash.add(Markets.ADDITIONAL_MARKET_HASH_ATTR, d);
      }
    };
    this.removeHash = function () {
      if (!Markets.ADD_ADDITIONAL_MARKET_HASH) {
        return;
      }
      treeId = this.getTreeID();
      var c = Hash.valueToArray(Hash.getByKey(Markets.ADDITIONAL_MARKET_HASH_ATTR));
      if (c.length > 0) {
        var d = a.inArray(treeId, c);
        if (-1 != d) {
          c.splice(d, 1);
          if (c.length > 0) {
            Hash.add(Markets.ADDITIONAL_MARKET_HASH_ATTR, c);
          }
          else {
            Hash.remove(Markets.ADDITIONAL_MARKET_HASH_ATTR);
          }
        }
      }
    };
  };
  Markets.isNotLastEventRowInCoupone = function (c) {
    var b = a(c).parents(".foot-market-border").find("[id^='event_']:last");
    return a(c).filter(":last").attr("id") != a(b).attr("id");
  };
  Markets.createLabels = function (b) {
    var c = a(b).parents(".foot-market").find(".coupone-labels").clone();
    a(c).removeClass("coupone-labels").addClass("market_footer");
    Markets.restoreHtmlMarkupForTooltips(c);
    return c;
  };
  Markets.parseEventID = function (b) {
    return b.split("_").shift();
  };
  Markets.getVisibleMarkets = function () {
    var b = [];
    a('a[id*="' + Markets.MORE_VIEW_PREF + '"]').each(function (d, f) {
      var c = new EventView(f);
      if (c && c.isVisible()) {
        var e = a(f).attr("treeid");
        b.push(e);
      }
    });
    return b;
  };
  Markets.applyView = function (c) {
    var d = Markets.getLiveUpdatesHelper();
    if (d) {
      d.fireAdditionalMarketsChanged();
      d.marketsInProgress(false);
    }
    var b = new EventView(c);
    if (this.isLoading(b)) {
      return;
    }
    if (b.isVisible()) {
      b.close();
    }
    else {
      if (d) {
        d.marketsInProgress(true);
      }
      b.show();
    }
  };
  Markets.openDetailsById = function (e) {
    if (isNaN(parseInt(e, 10))) {
      return;
    }
    var d = Markets.getLiveUpdatesHelper();
    if (d) {
      d.fireAdditionalMarketsChanged();
    }
    if (Markets.ONLY_ONE_EVENT_OPEN_AM) {
      a('a[id*="' + Markets.MORE_VIEW_PREF + '"]').each(function (g, h) {
        var f = new EventView(h);
        if (f && f.isVisible() && a(h).attr("treeid") != e) {
          f.close();
        }
      });
    }
    var c = document.getElementById(Markets.MORE_VIEW_PREF + e);
    if (null == c) {
      return;
    }
    var b = new EventView(c);
    if (!b.isVisible()) {
      b.show();
    }
  };
  Markets.showFoot = function (b) {
    var c = Markets.getFoot(b);
    if (c != null) {
      c.css("display", "");
    }
  };
  Markets.hideFoot = function (b) {
    var c = Markets.getFoot(b);
    if (c != null) {
      c.css("display", "none");
    }
  };
  Markets.getFoot = function (b) {
    return a(b).parents("[data-event-treeid]").find(".market_footer");
  };
  Markets.getEventMarkers = function (b) {
    return a("#container_" + b).find(".event-more-view");
  };
  Markets.getAllBets = function (b) {
    Markets.switchElements(a("#allbets_" + b), a("#all_bets_loading_" + b));
    $$("all_bets_loading_" + b)[Markets.IMG_LOADING_ATTR] = true;
    Markets.applyAllBets(b);
  };
  Markets.isLoading = function (b) {
    var c = a(b.oView).parent().find(".event-loading").css("display");
    return(c == "inline");
  };
  Markets.applyAllBets = function (e) {
    var d = Markets.getEventMarkers(e);
    var f = (function () {
      var m = d.length, l = 0, n = 0, k = e, j = a("#all_bets_loading_" + e);
      this._increaseFakeCount = function () {
        n++;
      };
      this._increaseDoneCount = function () {
        l++;
        _checkAllIsDone();
      };
      this._checkAllIsDone = function () {
        if ((l == m) && (l != n)) {
          j.css("display", "none");
          Markets.switchAllBetsOrClosedBets(k);
          l = 0;
          n = 0;
        }
      };
      return{increment: _increaseDoneCount, incrementFake: _increaseFakeCount};
    })();
    for (var b = 0, h = d.length; b < h; b++) {
      var c = new EventView(d[b]);
      if (!c.isVisible() && !Markets.isLoading(c)) {
        var g = Markets.getLiveUpdatesHelper();
        if (g) {
          g.fireAdditionalMarketsChanged();
        }
        a(c.oView).css("display", "none");
        Markets.showProcess(c.oView.parentNode);
        c.showViewDetails(function () {
          f.increment();
        });
      }
      else {
        f.incrementFake();
        f.increment();
      }
    }
  };
  Markets.closeAllBets = function (e) {
    var d = Markets.getEventMarkers(e);
    for (var b = 0, f = d.length; b < f; b++) {
      var c = new EventView(d[b]);
      if (c.isVisible() && !Markets.isLoading(c)) {
        a(c.oView).click();
      }
    }
  };
  Markets.checkAllBetsLink = function (b) {
    var c = $$("all_bets_loading_" + b);
    if (c != null) {
      if (c[Markets.IMG_LOADING_ATTR]) {
        if (Markets.isAllViewOpened(b)) {
          Markets.switchElements(a(c), a("#closebets_" + b));
          a("#allbets_" + b).css("display", "none");
          c[Markets.IMG_LOADING_ATTR] = false;
        }
      }
      else {
        Markets.switchAllBetsOrClosedBets(b);
      }
    }
  };
  Markets.switchAllBetsOrClosedBets = function (b) {
    if (Markets.isAllViewOpened(b)) {
      Markets.switchElements(a("#allbets_" + b), a("#closebets_" + b));
    }
    else {
      Markets.switchElements(a("#closebets_" + b), a("#allbets_" + b));
    }
  };
  Markets.getVisibleBetsLink = function (b) {
    var e = a("#all_bets_loading_" + b);
    var d = a("#closebets_" + b);
    var c = a("#allbets_" + b);
    if (a(e).css("display") != "none") {
      return e;
    }
    else {
      if (a(d).css("display") != "none") {
        return d;
      }
      else {
        if (a(c).css("display") != "none") {
          return c;
        }
        else {
          return null;
        }
      }
    }
  };
  Markets.isAllViewOpened = function (e) {
    var d = Markets.getEventMarkers(e);
    for (var b = 0, f = d.length; b < f; b++) {
      var c = new EventView(d[b]);
      if (!c.isVisible()) {
        return false;
      }
    }
    return true;
  };
  Markets.showProcess = function (b) {
    Markets.getProcessElement(b).css("display", "");
  };
  Markets.hideProcess = function (b) {
    Markets.getProcessElement(b).css("display", "none");
  };
  Markets.getProcessElement = function (b) {
    return a(b).find("IMG.event-loading");
  };
  Markets.switchElements = function (b, c) {
    a(c).css("display", "");
    a(b).css("display", "none");
  };
  Markets.showModalPopup = function (d, b) {
    var c = a(d.parentNode).find(".score-popup"), g = c.find("IMG.score-popup-info"), f = c.find(".score-popup-content");
    panbetModal(c);
    if (b) {
      var e = a("#" + b).html();
      f.html(e);
      Markets.applyScoreInfo(g, f);
    }
    else {
      f.load(d.href, function () {
        Markets.applyScoreInfo(g, f);
      });
    }
  };
  Markets.applyScoreInfo = function (d, c) {
    d.css("display", "none");
    c.css("display", "");
    var b = c.find(".scorecast-player-table").width();
    c.css("width", b);
    a(document).trigger("content.loaded");
  };
  Markets.closePopup = function (c) {
    var b = a(c.parentNode), d = b.find(".score-popup-content");
    a.modal.close();
    d.html("");
  };
  Markets.onChangeScorecastPlayer = function (c) {
    Markets.hideScorecastPlayersTable(c);
    var b = c.options[c.selectedIndex].value;
    $$("scorecast_" + b).style.display = "";
  };
  Markets.hideScorecastPlayersTable = function (c) {
    var b = a(c).parent().parent().find(".scorecast-player-table");
    b.css("display", "none");
  };
  Markets.showSilks = function (j, f) {
    var h = a(j.parentNode.parentNode.parentNode), b = a(h).find("IMG.silk"), g = a(j).parent();
    a(g).find(".silk-link").remove();
    a(g).html(f);
    a(b).load(function () {
      a(this).parent().find("IMG.event-loading").attr("style", "display:none");
      this.style.display = "";
    });
    a(b).attr("style", "display:none");
    a(h).find("IMG.event-loading").attr("style", "");
    for (var e = 0, c = b.length; e < c; e++) {
      var d = b[e];
      d.setAttribute("src", d.getAttribute("src_load"));
    }
  };
  Markets.showSilksMatchBets = function (h, f, c) {
    var k = a(h).parents(".foot-market-border"), g = a(k).find(c).find("IMG.silk"), j = a(h).parent();
    a(j).find(".silk-link").remove();
    a(j).html(f);
    a(g).load(function () {
      a(this).parent().find("IMG.event-loading").attr("style", "display:none");
      this.style.display = "";
    });
    a(g).attr("style", "display:none");
    a(k).find(c).find("IMG.event-loading").attr("style", "");
    for (var e = 0, b = g.length; e < b; e++) {
      var d = g[e];
      d.setAttribute("src", d.getAttribute("src_load"));
    }
  };
  Markets.toggleAllMarketsBlocks = function (b) {
    var c = Markets.getSortcutsLinksIdsInfo(b);
    var d = a(c.linkTypeAllSharp);
    if (Markets.isShowSingleBlocksLinkActive(c)) {
      a(c.blockIdNotVisible).css("display", "");
      d.addClass(Markets.SHORTCUTS_ACTIVE);
      a(c.linkTypeId).filter(c.idNotEqualLinkTypeAll).removeClass(Markets.SHORTCUTS_ACTIVE);
    }
    else {
      a(c.blockId).toggle();
      d.toggleClass(Markets.SHORTCUTS_ACTIVE);
    }
    Markets.mySelectionRemoveActiveDisable(c);
    Markets.setShortCutMenuIdAll(c.shortcutIdBlockAll, c.shortcuts);
    Markets.sendBlockSelection(b, Markets.SHORTCUTS_ALL, a("#" + c.linkBlockAll).hasClass(Markets.SHORTCUTS_ACTIVE));
  };
  Markets.toggleMarketsBlockByEventIdAndBlockType = function (c, b) {
    if (b == Markets.SHORTCUTS_SELECTED) {
      Markets.selectYourOwnChoice(c);
    }
    else {
      if (b == Markets.SHORTCUTS_ALL) {
        Markets.toggleAllMarketsBlocks(c);
      }
      else {
        Markets.toggleMarketsBlock(c, b);
      }
    }
  };
  Markets.toggleMarketsBlock = function (e, d) {
    var f = Markets.getSortcutsLinksIdsInfo(e);
    var b = a([f.linkTypeSharp, d].join("")), g = a("#" + f.shortcutLinkEventIdShortcutType + d);
    if (b.hasClass(Markets.SHORTCUTS_ACTIVE)) {
      b.removeClass(Markets.SHORTCUTS_ACTIVE);
      g.css("display", "none");
    }
    else {
      b.addClass(Markets.SHORTCUTS_ACTIVE);
      a(f.blockId).filter(["[id!='", f.shortcutLinkEventIdShortcutType + d, "']"].join("")).css("display", "none");
      g.css("display", "");
    }
    Markets.mySelectionRemoveActiveDisable(f);
    Markets.setShortCutMenuId(f);
    a(f.linkTypeId).filter(["[id!='", f.linkTypeSimple, d, "']"].join("")).removeClass(Markets.SHORTCUTS_ACTIVE);
    var c = a("#" + f.linkTypeSimple + d).hasClass(Markets.SHORTCUTS_ACTIVE);
    Markets.sendBlockSelection(e, d, c);
  };
  Markets.mySelectionRemoveActiveDisable = function (c) {
    var b = a(c.linkTypeSelectedSharp);
    if (b.hasClass(Markets.SHORTCUTS_ACTIVE_DISABLED)) {
      b.removeClass(Markets.SHORTCUTS_ACTIVE_DISABLED);
      b.addClass(Markets.SHORTCUTS_DISABLED);
    }
  };
  Markets.isShowSingleBlocksLinkActive = function (b) {
    return a(b.linkTypeShortcutsActive).filter(b.idNotEqualLinkTypeAll).size() > 0;
  };
  Markets.setShortCutMenuId = function (c) {
    var b = "";
    a(c.blockIdVisible).each(function () {
      if ($$(this).style.display != "none") {
        var d = Markets.getBlockIdSubstring(a(this).attr("id"), Markets.SHORTCUTS_TYPE);
        if (b != "") {
          b += Markets.SLASH;
        }
        b += d;
      }
    });
    a(c.shortcutsId).attr("id", c.shortcutsType + b);
  };
  Markets.setShortCutMenuIdAll = function (b, c) {
    a(['[id^="', c, '"]'].join("")).each(function () {
      if (a(this).attr("id") == c) {
        a(this).attr("id", b);
      }
      else {
        if (a(this).attr("id") == b) {
          a(this).attr("id", c);
        }
        else {
          a(this).attr("id", b);
        }
      }
    });
  };
  Markets.showAndHideBlocks = function (b) {
    a(b.blockCheckboxes).each(function () {
      var c = "#" + a(this).closest(b.blockId).attr("id");
      if (a(this).is(":checked")) {
        a(c).show();
      }
      else {
        a(c).hide();
      }
    });
  };
  Markets.onCheckboxPress = function (c) {
    var d = Markets.getSortcutsLinksIdsInfo(c);
    var b = a(d.linkTypeSelectedSharp).hasClass(Markets.SHORTCUTS_ACTIVE);
    if (b) {
      Markets.showAndHideBlocks(d);
    }
  };
  Markets.selectYourOwnChoice = function (c) {
    var d = Markets.getSortcutsLinksIdsInfo(c);
    if (!a(d.linkTypeSelectedSharp).hasClass(Markets.SHORTCUTS_DISABLED)) {
      Markets.showAndHideBlocks(d);
      if (a(d.blockCheckboxes).is(":checked")) {
        a(d.shortcutsTypeId).each(function () {
          a(this).attr("id", d.shortcutsType + Markets.SHORTCUTS_SELECTED);
        });
        a(d.linkTypeSharp + Markets.SHORTCUTS_SELECTED).addClass(Markets.SHORTCUTS_ACTIVE);
        a(d.linkTypeId).filter("[id!='" + d.linkTypeSelected + "']").removeClass(Markets.SHORTCUTS_ACTIVE);
      }
      var b = a(d.linkTypeSelectedSharp).hasClass(Markets.SHORTCUTS_ACTIVE);
      Markets.sendBlockSelection(c, Markets.SHORTCUTS_SELECTED, b);
    }
  };
  Markets.getBlockIdSubstring = function (c, b) {
    return c.substring((c.indexOf(b) + b.length), c.length);
  };
  Markets.changeShowMyButtonState = function (b) {
    var e = Markets.getSortcutsLinksIdsInfo(b), d = a(e.blockCheckboxes).is(":checked"), c = a(e.linkTypeSelectedSharp);
    if (c.hasClass(Markets.SHORTCUTS_ACTIVE)) {
      if (d) {
        c.removeClass(Markets.SHORTCUTS_ACTIVE_DISABLED);
      }
      else {
        c.addClass(Markets.SHORTCUTS_ACTIVE_DISABLED);
      }
    }
    else {
      if (d) {
        c.removeClass(Markets.SHORTCUTS_DISABLED);
      }
      else {
        c.addClass(Markets.SHORTCUTS_DISABLED);
      }
    }
    Markets.updateMySelectionsSumms(e);
  };
  Markets.updateMySelectionsSumms = function (b) {
    var c = Markets.calculateMarketsSummInCheckedBlocks(b);
    a(b.linkTypeSharp + Markets.SHORTCUTS_SELECTED).find(".markets-count").text((c > 0)
      ? "(" + c + ")"
      : "");
    if (c > 0) {
      Markets.mySelectionRemoveActiveDisable(b);
    }
  };
  Markets.sendCheckedCheckboxes = function (e, c) {
    var b = Markets.generateMarketsCheckBoxesSelection(e, c);
    if (Markets.hasOpenedAdditionalMarketsOnLivePage()) {
      Markets.punterPreference.couponeEventPreference.putBlockState(e, b);
    }
    var d = JSON.stringify(b);
    a.ajax({url: initData.base_dir + "/" + Markets.SHORTCUTS_MENU_CUSTOM, type: "POST", data: {marketsChecks: d}});
  };
  Markets.generateBlockSelection = function (b, c, d) {
    return{eventId: b, blockId: c, active: d};
  };
  Markets.generateMarketsCheckBoxesSelection = function (c, b) {
    return{toggledCheckbox: c, state: b};
  };
  Markets.sendBlockSelection = function (d, e, f) {
    var c = Markets.generateBlockSelection(d, e, f);
    if (Markets.hasOpenedAdditionalMarketsOnLivePage()) {
      Markets.punterPreference.couponeEventPreference.putMenuLinkState(d, c);
    }
    var b = JSON.stringify(c);
    a.ajax({type: "POST", url: initData.base_dir + "/" + Markets.SHORTCUTS_MENU_CUSTOM, data: {shortcutLinks: b}});
  };
  Markets.getSortcutsLinksIdsInfo = function (g) {
    var d = new StringBuilder();
    var c = d.clear().append(Markets.SHORTCUTS_LINK).append(g).append(Markets.SHORTCUTS_TYPE).toString();
    var h = d.clear().append(Markets.SHORTCUTS_BLOCK).append(g).toString();
    var f = d.clear().append(h).append(Markets.SHORTCUTS_TYPE).toString();
    var b = d.clear().append(Markets.SHORTCUTS_ID).append(g).toString();
    var e = Markets.ShortCutsLinksInfo[g];
    if ((!e) || (e && e.typeForBlocks != true)) {
      Markets.ShortCutsLinksInfo[g] = {typeForBlocks: true, shortcutLinkEventIdShortcutType: f, shortcuts: b, linkTypeSimple: c, linkBlockAll: d.clear().append(Markets.SHORTCUTS_LINK).append(g).append(Markets.SHORTCUTS_TYPE).append(Markets.SHORTCUTS_ALL).toString(), shortcutIdBlockAll: d.clear().append(Markets.SHORTCUTS_ID).append(g).append(Markets.SHORTCUTS_TYPE).append(Markets.SHORTCUTS_ALL).toString(), linkTypeAllSharp: d.clear().append("#").append(c).append(Markets.SHORTCUTS_ALL).toString(), linkTypeSelected: d.clear().append(c).append(Markets.SHORTCUTS_SELECTED).toString(), linkTypeSelectedSharp: d.clear().append("#").append(c).append(Markets.SHORTCUTS_SELECTED).toString(), linkTypeShortcutsActive: d.clear().append("[id^= '").append(c).append("'].").append(Markets.SHORTCUTS_ACTIVE).toString(), idNotEqualLinkTypeAll: d.clear().append("[id!='").append(c).append(Markets.SHORTCUTS_ALL).append("']").toString(), linkTypeSharp: d.clear().append("#").append(c).toString(), linkTypeId: d.clear().append("[id^='").append(c).append("']").toString(), blockCheckboxes: d.clear().append('[id^="').append(Markets.CHECKBOX).append(f).append('"]').toString(), blockIdNotVisible: d.clear().append('[id^="').append(h).append('"]').toString(), blockIdVisible: d.clear().append('[id^="').append(h).append('"]').toString(), blockId: d.clear().append('[id^="').append(h).append('"]').toString(), shortcutsTypeId: d.clear().append("[id^='").append(b).append(Markets.SHORTCUTS_TYPE).append("']").toString(), shortcutsType: d.clear().append(b).append(Markets.SHORTCUTS_TYPE).toString(), shortcutsId: d.clear().append("[id^='").append(b).append("']").toString()};
    }
    return Markets.ShortCutsLinksInfo[g];
  };
  Markets.getLiveUpdatesHelper = function () {
    if (typeof(getPollingUpdateHelper) != "undefined") {
      return getPollingUpdateHelper();
    }
  };
  Markets.scrollBackToElement = function (b, c) {
    var e = Markets.getSortcutsLinksIdsInfo(c), d = b - a(Markets.BODY_CONTENT).offset().top, f = (a("#" + e.linkTypeSelected).offset().top -
      a(".padding-top").offset().top) - d;
    a(Markets.BODY_CONTENT).animate({scrollTop: f}, 0);
  };
  Markets.calculateMarketsSummInCheckedBlocks = function (b) {
    var c = 0;
    a(b.blockCheckboxes).each(function () {
      if (a(this).is(":checked")) {
        c += parseInt(a(this).attr("data-markets-count"));
      }
    });
    return c;
  };
  Markets.getEventIdFormShortcutId = function (c) {
    var b = c.indexOf(Markets.SHORTCUTS_TYPE);
    return c.substring(c.indexOf(Markets.SHORTCUTS_ID) + Markets.SHORTCUTS_ID.length, b > 0
      ? b
      : c.length);
  };
  Markets.setShortcutMenusLinks = function () {
    a(Markets.SHORTCUTS_ID_WRAPPED).each(function () {
      var b = a(this).attr("id"), c = Markets.getEventIdFormShortcutId(b), d = Markets.getSortcutsLinksIdsInfo(c);
      Markets.changeShowMyButtonState(c);
    });
  };
  Markets.sendCheckBoxState = function (d, c) {
    var b = $$(d);
    if (!(b)) {
      return;
    }
    state = b.checked;
    Markets.sendCheckedCheckboxes(c, state);
  };
  Markets.onBlockCheckBoxClick = function (c, b, d) {
    Markets.changeShowMyButtonState(d);
    Markets.onCheckboxPress(d);
    Markets.sendCheckBoxState(c, b);
    Markets.setCheckBoxesInOtherEvents(c, d);
  };
  Markets.setCheckBoxesInOtherEvents = function (h, e) {
    var j = Markets.getSortcutsLinksIdsInfo(e);
    var c = $$(h);
    if (!(c)) {
      return;
    }
    var g = a("#" + j.linkTypeSelected).offset().top, b = a("#" + h).closest(j.blockId).attr("id"), d = Markets.getBlockIdSubstring(b,
      Markets.SHORTCUTS_TYPE), f = c.checked;
    a(Markets.SHORTCUTS_ID_WRAPPED).each(function () {
      var l = a(this).attr("id"), m = Markets.getEventIdFormShortcutId(l), k = new StringBuilder();
      if (m == e) {
        return;
      }
      k.clear();
      k.append(Markets.CHECKBOX).append(Markets.SHORTCUTS_BLOCK).append(m).append(Markets.SHORTCUTS_TYPE).append(d);
      if ($$(k.toString()) != null) {
        $$(k.toString()).checked = f;
        Markets.changeShowMyButtonState(m);
        Markets.onCheckboxPress(m);
      }
    });
    Markets.scrollBackToElement(g, e);
  };
  Markets.updatecheckboxesInOtherEvents = function (b) {
    info = Markets.getSortcutsLinksIdsInfo(b);
    a(info.blockCheckboxes).each(function () {
      Markets.setCheckBoxesInOtherEvents(a(this).attr("id"), b);
    });
  };
  Markets.showBlockHint = function (b) {
    a(b.parentNode).find(Markets.MARKET_BLOCK_HINT).show();
  };
  Markets.hideBlockHint = function (b) {
    a(b.parentNode).find(Markets.MARKET_BLOCK_HINT).hide();
  };
  Markets.selectTeam1Player = function (b) {
    Markets.selectTeamPlayer(b, "td[class ^= 'team1player']", "td[class ^= 'team2player']");
  };
  Markets.selectTeam2Player = function (b) {
    Markets.selectTeamPlayer(b, "td[class ^= 'team2player']", "td[class ^= 'team1player']");
  };
  Markets.fireAdditionalMarketsChanged = function () {
    var b = Markets.getLiveUpdatesHelper();
    if (b) {
      b.fireAdditionalMarketsChanged();
    }
  };
  Markets.selectTeamPlayer = function (d, b, c) {
    a("." + d).parent().find(b).hide();
    a("." + d).parent().find(b).filter(":empty").parent().show();
    a("." + d).show();
    a("." + d).parents("table.td-border").find("tr.rows-with-coeffs").each(function () {
      var e = a(this).find("td:visible").filter("[class!='left-column-name']").size();
      var f = a(this).find("td:visible").filter("[class!='left-column-name']").filter(":empty").size();
      if (e == f) {
        a(this).hide();
      }
    });
    Markets.setRowspans(d);
  };
  Markets.setRowspans = function (c) {
    var b = {};
    a("." + c).parents("table").find(".rows-with-coeffs").filter(":visible").each(function () {
      var d = a(this).attr("data-type");
      if (!b[d]) {
        var e = a("." + c).parents("table").find(".rows-with-coeffs").filter(":visible").filter("[data-type='" + d + "']").size();
        a(this).find(".left-column-name").attr("rowspan", e);
        b[d] = d;
      }
    });
  };
  Markets.getTeamPlayers = function (b) {
    var c = [];
    a(b).filter(":not(.js-price)").filter(":visible").each(function () {
      var d = a(this).attr("class");
      if (c.indexOf(d) == -1) {
        c.push(d);
      }
    });
    return c;
  };
  Markets.getTeam1Players = function () {
    return Markets.getTeamPlayers("[class ^= 'team1player']");
  };
  Markets.getTeam2Players = function () {
    return Markets.getTeamPlayers("[class ^= 'team2player']");
  };
  Markets.showPlayersLink = function (b) {
    a("#players-links-" + b).show();
  };
  Markets.hidePlayersLinks = function () {
    a("div[id ^= 'players-links-']").hide();
  };
  Markets.markerActivePlayerLinks = function () {
    a(".players-links a:not(.has-hover-handler)").hover(function () {
      a(this).addClass("active-scorer");
    },function () {
      a(this).removeClass("active-scorer");
    }).addClass("has-hover-handler");
    a("div[id ^= 'players-links-']").filter(":not(.has-mouseleave)").mouseleave(function () {
      a(this).hide();
    }).addClass("has-mouseleave");
  };
  Markets.restoreHtmlMarkupForTooltips = function (b) {
    a(b).find("[data-tooltip-parent]").each(function () {
      var e = a(this);
      if (a(e).is("[data-hasqtip]")) {
        e[0].isTooltip = false;
        var d;
        var c = "#" + a(e).attr("data-aria-describedby") + "-content";
        d = a(c).children().clone().css("display", "none");
        a(e).attr("data-hasqtip", null).attr("data-aria-describedby", null);
        a(d).appendTo(a(e));
      }
    });
  };
  Markets.fadeShootoutImage = function () {
    window.setInterval(function () {
      a(".shootout-ball").fadeTo(600, 0.1);
      a(".shootout-ball").fadeTo(600, 1.2);
    }, 10);
  };
}(window.jQuery));
SportList = function () {
};
SportList.handleNode = function (b, d, c, a) {
  if ($(b).hasClass("marker-opened")) {
    SportList.showVisible(b, false);
  }
  else {
    SportList.loadNode(b, d, c, a);
  }
};
SportList.closeOtherNodes = function (a) {
  $(".marker.marker-opened:not(#" + a.id + ")").each(function () {
    SportList.showVisible(this, false);
  });
};
SportList.loadNode = function (b, d, c, a) {
  $("img.load", b).css("display", "block");
  $.ajax({url: initData.base_dir + "/tree-node.htm?nodeId=" + d + "&uri=" + c + "&menuName=" + a, dataType: "html", success: function (e, f) {
    SportList.applyNode(b, d, e);
  }});
};
SportList.applyNode = function (a, c, b) {
  $("img.load", a).css("display", "none");
  if (b != "") {
    $("span", a).html(b);
    SportList.showVisible(a, true);
    SportList.closeOtherNodes(a);
  }
};
SportList.showVisible = function (b, a) {
  if (a && !$(b).hasClass("marker-opened")) {
    $(".menu-arrow", b).addClass("plus");
    $(b).addClass("marker-opened").removeClass("marker-closed");
  }
  else {
    $(".menu-arrow", b).removeClass("plus");
    $(b).removeClass("marker-opened").addClass("marker-closed");
  }
};
Panbet = {};
Panbet.EXCLUDE_FORM = ["auth", "login_form", "ticket_form"];
Panbet.BONUS_MARK = "bonusMark";
function panbetInit(b) {
  checkView();
  $(window).resize(checkView);
  setPanbetAJAXSettings();
  if ($.cookie("firstdepositdonecookie") == "yes" && $.cookie("depositdonecookie") == "yes") {
    if (window.CXT_EVENTS) {
      try {
        if ($.cookie("firstdepositalreadydonecookie") != "done") {
          window.CXT_EVENTS.setCxtAction(window.CXT_EVENTS.ACTIONS.FIRST_DEPOSIT_PAGE);
        }
        else {
          window.CXT_EVENTS.setCxtAction(window.CXT_EVENTS.ACTIONS.DEPOSIT_CONFIRMATION);
        }
        $.cookie("firstdepositalreadydonecookie", "done");
      }
      catch (d) {
      }
    }
    $.cookie("firstdepositdonecookie", null, {path: "/"});
  }
  else {
    if ($.cookie("depositdonecookie") == "yes") {
      if (window.CXT_EVENTS) {
        try {
          window.CXT_EVENTS.setCxtAction(window.CXT_EVENTS.ACTIONS.DEPOSIT_CONFIRMATION);
        }
        catch (d) {
        }
      }
      $.cookie("depositdonecookie", null, {path: "/"});
    }
  }
  if (initData.isJoinedNow) {
    if (window.CXT_EVENTS) {
      try {
        window.CXT_EVENTS.setCxtAction(window.CXT_EVENTS.ACTIONS.REGISTRATION_CONFIRMATION);
      }
      catch (d) {
      }
    }
    SEO.trackEventGoogle(SEO.JOIN_CATEGORY, SEO.JOIN_ACTION);
  }
  if (b) {
    window.setInterval("updateLoginTime()", 1000);
  }
  getClock().onTimerTick();
  getSessionControl().initSessionUpdate();
  if (b) {
    getSessionControl().registerProlongateClientSessionOnAjax();
  }
  initFormValidator();
  filterTopLinks();
  $("#auth_login").defaultValue();
  $("#auth_login_password").defaultValue();
  var f = false;
  if (initData.persData) {
    var a = new evercookie();
    for (var c in initData.persData) {
      a.set(c, initData.persData[c]);
      if (c == Panbet.BONUS_MARK) {
        f = true;
      }
    }
  }
  if (!b && !f) {
    var a = new evercookie();
    a.get(Panbet.BONUS_MARK, function (g, e) {
      if (typeof g != "undefined") {
        a.set(Panbet.BONUS_MARK, g);
      }
    }, 1);
  }
  scrollToCurrentCategoryLink();
}
function scrollToCurrentCategoryLink() {
  var c = $("div.menu-categories .active");
  if (c.length == 1) {
    var a = findOffsetTop(c[0]);
    var f = $("#left_scroll");
    var e = a - f.offset().top;
    if (!c.hasClass("menu-link")) {
      var b = c.closest("div.marker").children("div.menu-link");
      var g = 0;
      if (b.length > 0) {
        g = findOffsetTop(b[0]);
      }
      var d = f.height() - c.height();
      if (a - g > d) {
        e -= d / 2;
      }
      else {
        e = g - f.offset().top;
      }
    }
    else {
      e -= (f.height() - c.height()) / 2;
    }
    $("#left_scroll").animate({scrollTop: e}, 1500);
  }
}
function initFormValidator() {
  var b = document.forms;
  for (var a = 0; a < b.length; a++) {
    if (jQuery.inArray(b[a].id, Panbet.EXCLUDE_FORM) == -1) {
      panbetValidate($(b[a]));
    }
  }
}
function setPanbetAJAXSettings() {
  var a = 0;
  $(document).ajaxError(function (d, e, c, b) {
    a = e.status;
    switch (a) {
      case 403:
        handle403Error();
        return;
      case 500:
        handle500Error();
        return;
      case 503:
        handle503Error();
        return;
      default:
    }
  });
  Panbet.sessionId = $.cookie("PUNTER_KEY");
  $(document).ajaxStop(function () {
    if (initData.isLogged) {
      if (a) {
        return;
      }
      var c = $.cookie("PUNTER_KEY");
      var b = "session_close_notification";
      if (Panbet.sessionId !== c) {
        Panbet.sessionId = c;
        Panbet.replaceTimeout = setTimeout("replacePage();", 10000);
        $.modal.close();
        $("#" + b).modal({position: ["20%"], escClose: false});
      }
    }
  });
}
this.replacePage = function () {
  $.modal.close();
  clearTimeout(Panbet.replaceTimeout);
  window.location.href = initData.home_http_url;
};
function handle503Error() {
  window.location.replace(window.location.href.replace(window.location.pathname + window.location.search + window.location.hash,
    window.location.pathname + "?r" + Math.floor(Math.random() * (10000000)) + window.location.hash));
}
function handle500Error() {
  Log.debug("500 status code handled.");
}
function handle403Error() {
  $.modal.close();
  $("#forbidden").find("button").click(replacePage);
  $("#forbidden").modal({position: ["20%"], escClose: false});
}
function checkView() {
  if (!($.browser.mozilla && getBrowserVersion("Firefox") < 3.5)) {
    var a = $("#body_content")[0];
    $(".header").css("paddingRight", a.offsetWidth - a.clientWidth);
  }
  heightScroll();
  heightContent();
}
function openWindow(f, c) {
  var e = 20, b = c.width || 840, d = screen.width - b - e, a = c.height || (screen.height * 0.65);
  w = open(f, c.name || "help", "location=0,menubar=0,toolbar=0,scrollbars=yes,resizable=yes,top=0,left=" + d + ",height=" + a + ",width=" + b);
  w.focus();
  return w;
}
function showHelp(a) {
  openWindow($(a).attr("href"), {name: "help", width: 1040, height: 600});
  return false;
}
function showChat(b) {
  var a = 600, c = screen.width / 2 - a / 2;
  window.open($(b).attr("href"), "chat", "width=" + a + ",height=600,top=0,left=" + c);
  return false;
}
$(document).ready(function () {
  var a = $(window).width();
  if (a <= 1275) {
    $(".head-left .link-more").css("display", "block");
    $(".head-left .submenu").addClass("submenu-in-hint");
  }
  if (a >= 1276) {
    $(".head-left .link-more").css("display", "none");
    $(".head-left .submenu").css("display", "block");
  }
});
$(window).resize(function () {
  var a = $(window).width();
  if (a <= 1275) {
    $(".head-left .submenu").css("display", "none");
    $(".head-left .submenu").addClass("submenu-in-hint");
    $(".head-left .link-more").css("display", "block");
  }
  if (a >= 1276) {
    $(".head-left .link-more").css("display", "none");
    $(".head-left .submenu").removeClass("submenu-in-hint");
    $(".head-left .submenu").css("display", "block");
  }
});
function updateLoginTime() {
  initData.logintime++;
  var a = initData.logintime * 1, c = Math.floor(a / (60 * 60)), d = Math.floor((a - c * 60 * 60) / 60), b = Math.floor(a - c * 60 * 60 - d * 60);
  $$("login_time").innerHTML = pad(c) + ":" + pad(d) + ":" + pad(b);
  if (!initData.isMarathon) {
    if (b == 0 && d == 0) {
      showNotification(c);
    }
  }
}
function showNotification(a) {
  if (getSessionControl().getOpenAlertWindow() == "false") {
    getSessionControl().setOpenInfoWindow();
    $("#on_line_notification_value").html(a);
    $("#on_line_notification").modal({position: ["20%"]});
  }
}
AuthHelper = function () {
};
AuthHelper.REGEXP_ATTRIBUTE = "pregex";
AuthHelper.WARNING_ID = "auth_validation_warning";
AuthHelper.WARNING_MESSAGE_ID = "auth_validation_warning_message";
AuthHelper.onLogin = function (a) {
  var b = false;
  if (!AuthHelper.checkElement(a.login)) {
    $("#" + AuthHelper.WARNING_MESSAGE_ID).html(PanbetBaseMessages.login.regex(null, a.login));
    b = true;
  }
  if (!b) {
    if (!AuthHelper.checkElement(a.login_password)) {
      $("#" + AuthHelper.WARNING_MESSAGE_ID).html(PanbetBaseMessages.login_password.regex);
      b = true;
    }
  }
  if (b) {
    panbetModal($("#" + AuthHelper.WARNING_ID));
    window.event && (window.event.returnValue = false);
    return false;
  }
  return true;
};
AuthHelper.checkElement = function (a) {
  return new RegExp(a.getAttribute(AuthHelper.REGEXP_ATTRIBUTE)).test(a.value);
};
AuthHelper.checkSubmit = function (a) {
  if (AuthHelper.onLogin($$(a))) {
    $("#" + a).submit();
  }
};
AuthHelper.logout = function (c) {
  var b = c || window.event;
  b && b.preventDefault && b.preventDefault();
  b && (b.returnValue = false);
  var a = initData.logout || {};
  try {
    (function (e) {
      e(a).each(function (f, g) {
        e(document.createElement("iframe")).attr("src", g).appendTo(document.body);
      });
    }(jQuery));
  }
  catch (d) {
  }
  setTimeout(function (f) {
    var e = jQuery("#logoutLink").attr("href");
    location.href = e;
  }, 800);
  return false;
};
TopButtons = {};
TopButtons.Refresh = (function () {
  return{reload: function () {
    location.reload();
  }, repeatSearch: function (b) {
    var a = $("#searchForm");
    var c = $("#searchForm input[name='searchText']");
    if (!a || !c) {
      return false;
    }
    $(c).val(b);
    $(a).submit();
  }};
})();
TopButtons.ClearAll = (function () {
  return{clear: function () {
    HomeHelper.clearSelections();
  }};
})();
TopButtons.ShowAll = (function () {
  return{show: function () {
    showAll();
  }};
})();
TopButtons.ToggleEventsSelector = (function () {
  return{toggle: function () {
    if ($("#eventsSelectorId").is(":visible")) {
      $("#eventsSelectorId").hide();
      $("#eventSelctorBtnShowId").show();
      $("#eventSelctorBtnHideId").hide();
    }
    else {
      $("#eventsSelectorId").show();
      $("#eventSelctorBtnShowId").hide();
      $("#eventSelctorBtnHideId").show();
    }
  }};
})();
(function (b) {
  var a = function () {
    var v = "update=true";
    var E = [];
    var r = [];
    var m = [];
    var F = [];
    var l = false;
    getPriceHighlighter().initPrices();
    function t() {
      return b(".live-selection").filter(function () {
        return this.checked;
      }).map(function () {
        return"#" + this.id;
      }).get().join(",");
    }

    function n(I) {
      b(I).filter(function () {
        return !!this;
      }).prop("checked", true).change();
    }

    function e(I) {
      for (var J = 0; J < I.length; J++) {
        b("#" + I[J]).find("a").click();
      }
    }

    function c(I) {
      for (var J = 0; J < I.length; J++) {
        Markets.selectTeam1Player(I[J]);
      }
    }

    function x(I) {
      for (var J = 0; J < I.length; J++) {
        Markets.selectTeam2Player(I[J]);
      }
    }

    function j() {
      var I = [];
      b(".mb-silk").not(":has(a)").each(function () {
        I.push(b(this).attr("id"));
      });
      return I;
    }

    function k() {
      return b("#container_AVAILABLE [data-event-treeId]").length > 0;
    }

    function z() {
      return b("#container_EVENTS .opened-live-event").length > 0;
    }

    function s() {
      var I = z();
      var J = !k() && !I;
      redrawSelectionsButtons(J);
      redrawTOC(!I);
      y();
    }

    function y() {
      b("[data-sport-group]").each(function () {
        if (!b("[data-category-sport='" + b(this).data("sportGroup") + "']").length) {
          b(this).remove();
        }
      });
    }

    function g(J) {
      if (J != null) {
        var I = b("#liveBetsButton").text();
        b("#liveBetsButton").text(I.substr(0, I.indexOf("(")) + "(" + J + ")");
      }
    }

    var H = {event: A, available: A, availables: p, sportsMenu: u, categoryBlurb: B, mutableUpdates: o};

    function o(M) {
      if (!M) {
        return;
      }
      var K = M.updates;
      var I = b("#event_" + M.eventId);
      for (var L in K) {
        var J = K[L];
        b('*[data-mutable-id="' + J.id + '"]', I).each(function () {
          if (J.op == "CHANGE" || J.op == "NEW") {
            b(this).replaceWith(J.html);
          }
          else {
            b(this).remove();
          }
        });
      }
    }

    function C(I) {
      I = I || [];
      b.each(I, function () {
        var J = H[this.type];
        if (J) {
          J(this);
        }
        else {
          if (console && console.log) {
            console.log("Unsupported live update:", this);
          }
        }
      });
      if (I) {
        Markets.applyPunterPreference();
      }
    }

    function B(I) {
      b("[data-category-treeId='" + I.treeId + "'] .category-blurb").replaceWith(I.html);
    }

    function u(I) {
      var J = b("#sportsMenu .group-selection:checked").closest("[data-sport-group]").map(function () {
        return"[data-sport-group='" + b(this).data("sportGroup") + "']";
      }).get().join(",");
      b("#sportsMenuContainer").replaceWith(I.html);
      if (J != "") {
        b(".group-selection", J).prop("checked", true);
      }
    }

    function p(I) {
      b("#container_AVAILABLE").html(I.html);
    }

    function A(K) {
      var J = b("#event_" + K.treeId);
      if (J.length) {
        if (K.type == "available") {
          J.replaceWith(K.html);
        }
        else {
          J.html(K.html);
        }
        if (J.find(".details-description").size() && Markets.isNotLastEventRowInCoupone(J)) {
          var I = Markets.createLabels(J);
          I.attr("data-event-header", K.treeId);
          J.append(I);
        }
      }
      else {
        window.location.reload(true);
      }
    }

    function d(I) {
      I = I || [];
      b.each(I, function (K, M) {
        var L = b("#event_" + M);
        if (L.length) {
          L.prev().find("[data-event-header]").remove();
          var J = L.closest("[data-category-treeId]");
          L.remove();
          J.each(function () {
            var N = b(this);
            if (!N.find("[data-event-treeId]").length) {
              N.next(".link-top").remove();
              var O = N.attr("data-category-treeId");
              b(".toc-events [data-category-treeId='" + O + "']").remove();
              N.remove();
            }
          });
        }
      });
    }

    function h() {
      return b("#container_AVAILABLE [data-event-treeId]").map(function () {
        return b(this).attr("data-event-treeId");
      }).toArray().join(",");
    }

    var D = null;
    var G = null;
    var f = 0;
    return{UPDATE_REQUEST_TIMEOUT: 3 * 60 * 1000, currentAjaxReq: null, marketsInProgress: function (I) {
      l = I;
    }, fireAdditionalMarketsChanged: function () {
      this.abortCurrentAjaxReq();
    }, abortCurrentAjaxReq: function () {
      if (this.currentAjaxReq != null) {
        this.currentAjaxReq.abort();
      }
    }, setContent: function (I) {
      if (l) {
        console.log("Don't render: markets in progress.");
        return;
      }
      getPriceHighlighter().unhighlightTrends();
      if (!(I)) {
        return;
      }
      if (I.updated) {
        f = I.updated;
      }
      var J = t();
      r = j();
      m = Markets.getTeam1Players();
      F = Markets.getTeam2Players();
      d(I.removed);
      C(I.modified);
      n(J);
      s();
      e(r);
      c(m);
      x(F);
      g(I.count);
      if (!initData.isLiveTrendsOff) {
        getPriceHighlighter().highlightPriceChange();
      }
      b(document).trigger("content.loaded");
    }, getMethodType: function () {
      return b('[id*="shortcutsMenuTreeId"]').size() > 0
        ? "POST"
        : "GET";
    }, getFullUrl: function () {
      var I = this._getCleanUrl();
      if (I.indexOf("horselivestream") != -1) {
        I = I.replace("horselivestream", "livestreamupdate");
      }
      else {
        if (I.indexOf("livestream") != -1) {
          I = I.replace("livestream", "livestreamupdate");
        }
        else {
          I = I.replace(/(live(\/view)?)/, "liveupdate");
        }
      }
      return I;
    }, _getCleanUrl: function () {
      var I = window.location;
      return I.protocol + "//" + I.host + I.pathname + I.search;
    }, successResult: function (I) {
      this.setContent(I);
      this.subscribe();
    }, errorResult: function (I) {
      if (I != 102) {
        this.subscribe();
      }
    }, sendRequest: function () {
      var I = this;
      if (l) {
        console.log("Don't send ajax: markets in progress.");
        I.currentAjaxReq = null;
        this.subscribe();
        return;
      }
      this.currentAjaxReq = b.ajax({type: this.getMethodType(), url: this.getFullUrl(), dataType: "json", data: {markets: Markets.getVisibleMarkets().toString(), available: h(), updated: f ||
        initData.updated}, timeout: this.UPDATE_REQUEST_TIMEOUT, success: function (J) {
        I.currentAjaxReq = null;
        I.successResult(J);
      }, error: function (K) {
        I.currentAjaxReq = null;
        try {
          I.errorResult(K.status);
        }
        catch (J) {
          I.errorResult(500);
        }
      }});
    }, extend: function (I) {
      for (i in I) {
        this[i] = I[i];
      }
      return this;
    }, Init: function () {
    }};
  };
  window.BaseUpdateHelper = a;
})(jQuery);
function PriceHighlighter() {
  this._prices = {};
  this._coeffCreatedTime = {};
  this.initPrices = function () {
    var a = this;
    $("[data-selection-price]").each(function (c, e) {
      var b = $(e).data("selection-key");
      var d = parseFloat($(e).data("selection-price"));
      a._prices[b] = d;
    });
  };
  this.unhighlightTrends = function () {
    for (key in this._coeffCreatedTime) {
      var a = this._coeffCreatedTime[key];
      if (a + initData.trendLifeTime * 1000 < (new Date()).getTime()) {
        this._unhighlightTrend(key);
      }
    }
    setTimeout(function () {
      window.getPriceHighlighter().unhighlightTrends();
    }, initData.trendLifeTime);
  };
  this._unhighlightTrend = function (d) {
    var a = $("[data-selection-key='" + d + "']");
    for (var c = 0; c < a.length; c++) {
      var b = $(a[c]);
      b.removeClass("price-up price-down");
    }
    if (this.coeffCreatedTime != null && this.coeffCreatedTime[d] != null && this.coeffCreatedTime[d] != undefined) {
      delete this.coeffCreatedTime[d];
    }
  };
  this.highlightPriceChange = function () {
    var a = this;
    $("[data-selection-price]").each(function (e, c) {
      var b = $(c);
      var k = b.data("selection-key");
      var f = parseFloat(b.data("selection-price"));
      if (k in a._prices) {
        var j = a._prices[k];
        var g = $("[data-selection-key='" + k + "']");
        for (var e = 0; e < g.length; e++) {
          var h = $(g[e]);
          var d = "";
          if (f > j) {
            d = "price-up";
          }
          else {
            if (f < j) {
              d = "price-down";
            }
          }
          if (d != "") {
            h.addClass(d);
            a._coeffCreatedTime[k] = (new Date()).getTime();
          }
        }
      }
      a._prices[k] = f;
    });
  };
}
PriceHighlighter._instance = null;
function getPriceHighlighter() {
  if (PriceHighlighter._instance == null) {
    PriceHighlighter._instance = new PriceHighlighter();
  }
  return PriceHighlighter._instance;
}
(function (e) {
  var h = "live_announces_container_id";
  var l = "live_announces_link_block_id";
  var a = "announces";
  var f = "form";

  function b(m) {
    e("#" + l + " a").hide();
    e("#" + l + " img").show();
    e.ajax({type: "POST", url: initData.base_dir + "/livecalendar.htm", data: m, success: function (n) {
      e("#" + h).html(n);
      e("#" + h).show();
      e("#" + l + " a").show();
      e("#" + l + " img").hide();
      e(".calendar-week").CalendarControl({autoSubmitForm: true});
      k(e("form[name=" + f + "]"));
    }});
  }

  function k(m) {
    if (m != null && e(m).is("form")) {
      var n = e("input[name=calendar]", m).val() + "," + e("input[name=announce_sort]:checked", m).val() + "," + e("select[name=sport_select]", m).val();
      if (e("input[name=only_broadcast]", m).prop("checked")) {
        n += ",ONLY_BROADCAST";
      }
      Hash.add(a, n);
    }
  }

  function c() {
    var o = Hash.get();
    if (o[a]) {
      var n = o[a].split(/\s*,\s*/);
      var m;
      if (n.length > 2) {
        m = "form_name=" + f + "&calendar=" + n[0] + "&announce_sort=" + n[1] + "&sport_select=" + n[2] + "&" + f + "=submited";
        if (n.length > 3 && n[3] == "ONLY_BROADCAST") {
          m += "&only_broadcast=on";
        }
      }
      b(m);
    }
  }

  function d(m) {
    if (m != null) {
      return e(m).serialize() + "&" + m.id + "=submited";
    }
    return null;
  }

  function j() {
    if (!e("#" + h).is(":hidden")) {
      var m = arguments.length > 1
        ? arguments[1]
        : null;
      k(m);
      b(d(m));
    }
    return false;
  }

  function g() {
    b(d(arguments.length > 1
      ? arguments[1]
      : null));
    return false;
  }

  e(document).ready(function () {
    e(this).bind("announce.changed", j);
    e(this).bind("announce.opened", g);
    c();
  });
})(jQuery);
function SEO() {
}
SEO.BET_CATEGORY = "Bets";
SEO.LIVE_STREAM_CATEGORY = "LiveStream";
SEO.JOIN_CATEGORY = "Join";
SEO.ENTER_PAGE_ACTION = "Enter page";
SEO.BET_PLACED_ACTION = "Bet placed";
SEO.BET_NOT_PLACED_ACTION = "Bet not placed";
SEO.JOIN_ACTION = "Join";
SEO.NOT_JOIN_ACTION = "Not join";
SEO.TOTO_CATEGORY = "Totalizator";
SEO.TOTO_ACTION_BET = "Toto bet";
SEO.trackEventGoogle = function (b, c, d, a) {
  if (!window._gaq) {
    return;
  }
  _gaq.push(["_trackEvent", b, c, d, a]);
};
function Pager() {
}
Pager.checkCharValue = function (c, d) {
  var a = d >= 96 && d <= 105
    ? d - 48
    : d;
  var b = c.ctrlKey || c.shiftKey || c.altKey || c.metaKey;
  a = String.fromCharCode(a);
  if (!/[\d]|[\x00-\x1F\x7F\x2E\x25\x27]/.test(a) || (/[\d]/.test(a) && b)) {
    c.returnValue = false;
    if (c.preventDefault) {
      c.preventDefault();
    }
  }
};
Pager.checkValue = function (b, a) {
  if (/[\d]+/.test(b.val()) && 0 < parseInt(b.val(), 10) && a >= parseInt(b.val(), 10)) {
    b.removeClass(Pager.ERROR_CLASS);
  }
  else {
    b.addClass(Pager.ERROR_CLASS);
  }
};
Pager.keyDown = function (jInput, event, maxPage, pageUrl) {
  var event = event || window.event, key = event.keyCode || event.which;
  if (key == 13 && !isNaN(jInput.val()) && $.trim(jInput.val()) != "") {
    var val = parseInt(jInput.val(), 10);
    if (val > 0 && val <= maxPage) {
      with (window.location) {
        href = protocol + "//" + host + pathname + "?page=" + val + pageUrl;
      }
    }
    return;
  }
  Pager.checkCharValue(event, key);
};
Pager.clearDefaultValue = function (a) {
  if ($.trim(a.val()) == $.trim(a.attr(Pager.DEFAULT_VALUE_ATTR))) {
    a.val("");
  }
};
Pager.checkDefaultValueForInput = function (b, a) {
  if (!/[\d]+/.test(b.val()) || 1 > b.val() || a < b.val()) {
    b.val($.trim(b.attr(Pager.DEFAULT_VALUE_ATTR)));
    if (b.hasClass(Pager.ERROR_CLASS)) {
      b.removeClass(Pager.ERROR_CLASS);
    }
  }
};
Pager.DEFAULT_VALUE_ATTR = "defaultvalue";
Pager.ERROR_CLASS = "error";