var _volatileElements, $get, $getElementsByClassName;
Sys = {};
_volatileElements = {};
Function.createDelegate = function (n, t) {
  return function () {
    return t.apply(n, arguments)
  }
};
Type = {};
Type.registerNamespace = function (n) {
  for (var r = window, f = n.split("."), u, i, t = 0; t < f.length; t++)u = f[t], i = r[u], i || (i = r[u] = {}), r = i
}, function () {
  Type.registerNamespace("Debug");
  var n = {log: function () {
  }, warn: function () {
  }, error: function () {
  }, info: function () {
  }};
  window.Debug.console || (window.Debug.console = window.console
    ? window.console || n
    : n)
}();
String.prototype.startsWith = function (n) {
  return this.substr(0, n.length) === n
};
String.prototype.endsWith = function (n) {
  var t = this.length - n.length;
  return t >= 0 && this.lastIndexOf(n) === t
};
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.escapeSelector = function () {
  return this.replace(/([$%&()*+,./:;<=>?@\[\\\]^\{|}~])/g, "\\$1")
};
Array.add = function (n, t) {
  n[n.length] = t
};
Array.clone = function (n) {
  return n.length === 1
    ? [n[0]]
    : Array.apply(null, n)
};
Array.remove = function (n, t) {
  var i = n.indexOf(t);
  return i >= 0 && n.splice(i, 1), i >= 0
};
Array.contains = function (n, t) {
  for (var i = n.length; i--;)if (n[i] === t)return!0;
  return!1
};
Sys.Browser = {};
Sys.Platform = {};
Sys.Browser.InternetExplorer = {};
Sys.Browser.Firefox = {};
Sys.Browser.Safari = {};
Sys.Browser.Opera = {};
Sys.Browser.Chrome = {};
Sys.Platform.Windows = {};
Sys.Platform.Mac = {};
Sys.Platform.iphone = {};
Sys.Browser.agent = null;
Sys.Browser.name = navigator.appName;
Sys.Platform.name = null;
Sys.Browser.version = parseFloat(navigator.appVersion);
Sys.Browser.documentMode = 0;
navigator.userAgent.indexOf(" MSIE ") > -1
  ? (Sys.Browser.agent = Sys.Browser.InternetExplorer, Sys.Browser.version = parseFloat(navigator.userAgent.match(/MSIE (\d+\.\d+)/)[1]), Sys.Browser.version >=
  8 && document.documentMode >= 7 && (Sys.Browser.documentMode = document.documentMode))
  : navigator.userAgent.indexOf(" Firefox/") > -1
  ? (Sys.Browser.agent = Sys.Browser.Firefox, Sys.Browser.name = "Firefox", Sys.Browser.version = parseFloat(navigator.userAgent.match(/ Firefox\/(\d+\.\d+)/)[1]))
  : navigator.userAgent.indexOf(" AppleWebKit/") > -1
  ? (Sys.Browser.agent = Sys.Browser.Safari, Sys.Browser.version = parseFloat(navigator.userAgent.match(/ AppleWebKit\/(\d+(\.\d+)?)/)[1]), Sys.Browser.name = "Safari")
  : navigator.userAgent.indexOf(" Chrome/") > -1
  ? (Sys.Browser.agent = Sys.Browser.Chrome, Sys.Browser.version = parseFloat(navigator.userAgent.match(/ Chrome\/(\d+\.\d+)/)[1]), Sys.Browser.name = "Chrome")
  : navigator.userAgent.indexOf("Opera/") > -1 && (Sys.Browser.agent = Sys.Browser.Opera, Sys.Browser.name = "Opera");
navigator.platform.indexOf("Mac") > -1
  ? Sys.Platform.name = Sys.Platform.Mac
  : navigator.platform.indexOf("Win") > -1 && (Sys.Platform.name = Sys.Platform.Windows);
Sys.UI = {};
Sys.UI.DomEvent = function (n) {
  var t = n;
  this.type = t.type.toLowerCase();
  this.rawEvent = t;
  this.altKey = t.altKey;
  this.clientX = t.clientX;
  this.clientY = t.clientY;
  this.ctrlKey = t.ctrlKey;
  this.target = t.target
    ? t.target
    : t.srcElement;
  this.screenX = t.screenX;
  this.screenY = t.screenY;
  this.shiftKey = t.shiftKey
};
Sys.UI.DomEvent.prototype = {preventDefault: function () {
  this.rawEvent.preventDefault
    ? this.rawEvent.preventDefault()
    : window.event && (this.rawEvent.returnValue = !1)
}, stopPropagation: function () {
  this.rawEvent.stopPropagation
    ? this.rawEvent.stopPropagation()
    : window.event && (this.rawEvent.cancelBubble = !0)
}, _disposeHandlers: function () {
  Sys.UI.DomEvent._clearHandlers(this, !0);
  var n = this._chainDispose, t = typeof n;
  t !== "undefined" && (this.dispose = n, this._chainDispose = null, t === "function" && this.dispose())
}};
var $clearHandlers = Sys.UI.DomEvent._clearHandlers = function (n, t) {
  var r, u, f, i, e;
  if (n._events) {
    r = n._events;
    for (u in r)for (f = r[u], i = f.length - 1; i >= 0; i--)e = f[i], (!t || e.autoRemove) && $removeHandler(n, u, e.handler);
    n._events = null
  }
}, $addHandler = Sys.UI.DomEvent.addHandler = function (n, t, i, r, u, f) {
  var o, e, s, h;
  n != null && (n._events || (n._events = {}), o = n._events[t], o || (n._events[t] = o = []), e = null, n.addEventListener
    ? (e = function (t) {
    return i.call(n, new Sys.UI.DomEvent(t))
  }, n.addEventListener(t, e, !1))
    : n.attachEvent && (e = function () {
    var t = {};
    try {
      t = Sys.UI.DomElement._getWindow(n).event
    }
    catch (r) {
    }
    return i.call(n, new Sys.UI.DomEvent(t))
  }, n.attachEvent("on" + t, e)), o[o.length] = {handler: i, browserHandler: e, autoRemove: r}, u &&
    (s = _volatileElements[f], s || (_volatileElements[f] = s = []), s.push(n)), r &&
    (h = n.dispose, h !== Sys.UI.DomEvent._disposeHandlers && (n.dispose = Sys.UI.DomEvent._disposeHandlers, typeof h != "undefined" && (n._chainDispose = h))))
}, $removeHandler = Sys.UI.DomEvent.removeHandler = function (n, t, i) {
  var f = null, r, u, e;
  if (n && n._events && (r = n._events[t], r)) {
    for (u = 0, e = r.length; u < e; u++)if (r[u].handler === i) {
      f = r[u].browserHandler;
      break
    }
    n.removeEventListener
      ? n.removeEventListener(t, f, !1)
      : n.detachEvent && n.detachEvent("on" + t, f);
    r.splice(u, 1)
  }
}, $removeVolatileHandlers = Sys.UI.DomEvent.removeVolatile = function (n) {
  var t, i, r;
  if (_volatileElements) {
    if (t = _volatileElements[n], t && t.length > 0)for (i = t.length; i > 0; i--)r = t[i - 1], $clearHandlers(r, !1);
    _volatileElements[n] = null
  }
}, $raiseEvent = Sys.UI.DomEvent.raiseEvent = function (n, t, i) {
  var r, u, e, f;
  if (n && n._events && (r = n._events[t], r))for (u = 0, e = r.length; u < e; u++)if (f = r[u].handler, f) {
    f(this, i);
    break
  }
};
Sys.UI.DomElement = {};
Sys.UI.DomElement._getWindow = function (n) {
  var t = n.ownerDocument || n.document || n;
  return t.defaultView || t.parentWindow
};
String.prototype.escapeSelector = function () {
  return this.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
};
$get = Sys.UI.DomElement.getElementById = function (n, t) {
  var i = t
    ? t
    : document, r = "#" + n.escapeSelector();
  return $(i).find(r)[0]
};
$getElementsByClassName = Sys.UI.DomElement.getElementsByClassName = function (n, t, i) {
  var r, u = [], f = t
    ? t
    : document;
  return i || (i = "*"), r = $(f).find("." + n).filter(i), $.map(r, function (n) {
    u.push(n)
  }), u
};
Sys.EventHandlerList = function () {
  this._list = {}
};
Sys.EventHandlerList.prototype = {addHandler: function (n, t) {
  Array.add(this._getEvent(n, !0), t)
}, removeHandler: function (n, t) {
  var i = this._getEvent(n);
  i && Array.remove(i, t)
}, getHandler: function (n) {
  var t = this._getEvent(n);
  return!t || t.length === 0
    ? null
    : (t = Array.clone(t), function (n, i) {
    for (var r = 0, u = t.length; r < u; r++)t[r] && t[r](n, i)
  })
}, _getEvent: function (n, t) {
  if (!this._list[n]) {
    if (!t)return null;
    this._list[n] = []
  }
  return this._list[n]
}};
Sys._Application = function () {
  this._domReady();
  this._unloadHandlerDelegate = Function.createDelegate(this, this._unloadHandler);
  Sys.UI.DomEvent.addHandler(window, "unload", this._unloadHandlerDelegate)
};
Sys._Application.prototype = {_initialized: !1, _disposing: !1, _enableHistory: !1, _historyInitialized: !1, _ignoreIFrame: !1, _state: {}, _historyPointIsNew: !1, _currentEntry: "", _historyFrame: null, _timerHandler: null, add_init: function (n) {
  this._initialized
    ? n(this, null)
    : this.get_events().addHandler("init", n)
}, add_load: function (n) {
  this.get_events().addHandler("load", n)
}, remove_load: function (n) {
  this.get_events().removeHandler("load", n)
}, add_unload: function (n) {
  this.get_events().addHandler("unload", n)
}, get_events: function () {
  return this._events || (this._events = new Sys.EventHandlerList), this._events
}, dispose: function () {
  if (!this._disposing) {
    this._disposing = !0;
    window.pageUnload && window.pageUnload(this, null);
    var n = this.get_events().getHandler("unload");
    n && n(this, null);
    Sys.UI.DomEvent.removeHandler(window, "unload", this._unloadHandlerDelegate)
  }
}, _domReady: function () {
  function i() {
    u.initialize()
  }

  var t, u = this, n = document, f, r;
  if (n.addEventListener)try {
    n.addEventListener("DOMContentLoaded", t = function () {
      n.removeEventListener("DOMContentLoaded", t, !1);
      i()
    }, !1)
  }
  catch (e) {
  }
  else n.attachEvent && (window == window.top && n.documentElement.doScroll
    ? (r = n.createElement("div"), t = function () {
    try {
      r.doScroll("left")
    }
    catch (n) {
      f = window.setTimeout(t, 0);
      return
    }
    r = null;
    i()
  }, t())
    : n.attachEvent("onreadystatechange", t = function () {
    n.readyState === "complete" && (n.detachEvent("onreadystatechange", t), i())
  }))
}, _unloadHandler: function () {
  this.dispose()
}, _raiseInit: function () {
  var n = this.get_events().getHandler("init");
  n && n(this, null)
}, initialize: function () {
  if (!this._initialized && !this._disposing) {
    if (this._initialized = !0, this._raiseInit(), this.get_stateString) {
      var n = this.get_stateString();
      n !== this._currentEntry
        ? this._navigate(n)
        : this._ensureHistory()
    }
    this.raiseLoad()
  }
}, raiseLoad: function () {
  var n = this.get_events().getHandler("load");
  this._loaded = !0;
  n && n(this, null);
  window.pageLoad && window.pageLoad(this, null)
}};
Sys.HistoryEventArgs = function (n) {
  this._state = n;
  this.get_state = function () {
    return this._state
  }
};
Sys._Application.prototype.add_navigate = function (n) {
  this.get_events().addHandler("navigate", n)
};
Sys._Application.prototype._onIFrameLoad = function (n) {
  this._ensureHistory();
  this._ignoreIFrame || (this._historyPointIsNew = !1, this._navigate(n));
  this._ignoreIFrame = !1
};
window.onhashchange = function () {
  var n = Sys.Application.get_stateString();
  if (n == "!financials" || n == "!Financials") {
    window.FinancialsNavController.show(Sys.Application._currentEntry);
    return
  }
  n !== Sys.Application._currentEntry && (Sys.Application._ignoreTimer ||
    ((Sys.Application._currentEntry == "!financials" || Sys.Application._currentEntry == "!Financials") &&
      ($("#prlnk").find("li > a").removeClass("selected"), window.FinancialsNavController.backButtonReset()), Sys.Application._historyPointIsNew = !1, Sys.Application._navigate(n)))
};
Sys._Application.prototype.set_enableHistory = function (n) {
  this._enableHistory = n
};
Sys._Application.prototype.addHistoryPoint = function (n, t) {
  if (!this._enableHistory)throw"History disabled";
  this._ensureHistory();
  var i = n;
  this._historyPointIsNew = !0;
  this._setState(i, t);
  this._raiseNavigate()
};
Sys._Application.prototype._ensureHistory = function () {
  if (!this._historyInitialized && this._enableHistory) {
    try {
      this._initialState = this.get_stateString()
    }
    catch (n) {
    }
    this._historyInitialized = !0
  }
};
Sys._Application.prototype._navigate = function (n) {
  this._ensureHistory();
  var t = n;
  this._setState(n);
  this._state = t;
  this._raiseNavigate()
};
Sys._Application.prototype._setState = function (n, t) {
  var i, u, r, f;
  this._enableHistory && (n = n || "", n !== this._currentEntry && (window.theForm &&
    (i = window.theForm.action, u = i.indexOf("#"), window.theForm.action = (u !== -1
      ? i.substring(0, u)
      : i) + "#" + n), this._historyFrame && this._historyPointIsNew &&
    (n = unescape(n), this._ignoreIFrame = !0, r = this._historyFrame.contentWindow.document, r.open("javascript:'<html><\/html>'"), r.write("<html><head><title>" +
      (t || document.title) + '<\/title><script type="text/javascript">parent.Sys.Application._onIFrameLoad( \'' + escape(n) +
      "' );<\/script><\/head><body><\/body><\/html>"), r.close()), this._ignoreTimer = !1, this._currentEntry = n, (this._historyFrame ||
    this._historyPointIsNew) && (f = this.get_stateString(), n !== f &&
    (window.location.hash = n, this._currentEntry = this.get_stateString(), typeof t != "undefined" && t !== null && document.title == "" &&
      (document.title = t))), this._historyPointIsNew = !1))
};
Sys._Application.prototype.get_stateString = function () {
  var n, t, i;
  return Sys.Browser.agent === Sys.Browser.Firefox
    ? (t = window.location.href, i = t.indexOf("#"), i !== -1
    ? t.substring(i + 1)
    : "")
    : (n = window.location.hash, n.length > 0 && n.charAt(0) === "#" && (n = n.substring(1)), n)
};
Sys._Application.prototype._raiseNavigate = function () {
  var t = this._historyPointIsNew, n = this.get_events().getHandler("navigate"), i = this._state, r = new Sys.HistoryEventArgs(i);
  if (n && n(this, r), !t)try {
    Sys.Browser.agent === Sys.Browser.Firefox && window.location.hash && (!window.frameElement || window.top.location.hash) && (Sys.Browser.version < 3.5
      ? window.history.go(0)
      : location.hash = this.get_stateString())
  }
  catch (u) {
  }
};
Sys.Application = new Sys._Application;
Type.registerNamespace("b365");
b365.Sys = function () {
  this._eleList = [];
  this._eleList.A = 0;
  this._eleList.INPUT = 1;
  this._eleList.SELECT = 2;
  this._filter = function (n, t, i, r) {
    var u = n
      ? n
      : 0;
    return u = r
      ? t && u < t
      ? t
      : u
      : t && u > t || !u
      ? t
      : u, r
      ? i && u < i
      ? i
      : u
      : i && u > i || !u
      ? i
      : u
  }
};
b365.Sys.prototype = {getEleSib: function (n, t, i) {
  for (var r = t == "n"
    ? n.nextSibling
    : n.previousSibling; r != null && (r.nodeType != 1 || i && !$hasCls(r, i));)r = t == "n"
    ? r.nextSibling
    : r.previousSibling;
  return r != null && r.nodeType != 1 && (r = null), r
}, getPTag: function (n, t, i, r) {
  if (r = typeof r == "undefined" || r == null
    ? 0
    : r + 1, !n)return null;
  if (t == null || n.tagName == t)if (i) {
    if (n.className != null && n.className.indexOf(i) >= 0)return n
  }
  else return n;
  return r > 10
    ? null
    : this.getPTag(n.parentNode, t, i, r)
}, getCTag: function (n, t, i) {
  for (var r, u; n && n.nodeType === 3;)n = n.nextSibling;
  return!n || n.tagName == t && (!i || n.className.indexOf(i) >= 0)
    ? n
    : (r = this.getCTag(n.firstChild, t, i), r && r.tagName == t && (!i || r.className.indexOf(i) >= 0))
    ? r
    : (u = this.getCTag(n.nextSibling, t, i), u && u.tagName == t && (!i || u.className.indexOf(i) >= 0))
    ? u
    : null
}, getParIDTag: function (n, t, i) {
  var r, u, f;
  if (n && t && i && (r = t.getElementsByTagName(i), r && r.length > 0))for (u = 0; u < r.length; u++)if (f = r[u].getAttribute("id"), f &&
    f.startsWith(n))return r[u];
  return undefined
}, getParIDPTag: function (n, t, i) {
  if (typeof n != "undefined") {
    while (n != null) {
      if (n.id && (i && n.tagName == i && n.id.startsWith(t) || n.id.startsWith(t)))break;
      n = n.parentNode
    }
    return n
  }
  return undefined
}, getMediaType: function (n) {
  var t = this.getPTag(n, null, "MTsrc", null), i = "";
  return t && t.getAttribute("data-mt") && (i = t.getAttribute("data-mt")), i
}, getItemIdSuffix: function (n, t, i) {
  return n = this.getParIDPTag(n, t, i), n
    ? n.id.substring(t.length)
    : -1
}, firstChild: function (n, t, i) {
  var r = $(n).find("*").not("[type=text]");
  return typeof t != "undefined" && t !== "" && (r = r.filter(t)), typeof i != "undefined" && i !== "" && (r = r.filter("." + i)), r.first()[0]
}, parentNode: function (n) {
  for (n = n.parentNode; n != null && n.nodeType === 3;)n = n.parentNode;
  return n
}, toggleElement: function (n) {
  typeof n != "undefined" && n != null && (n.className.indexOf("hidden", 0) == -1
    ? (n.className = n.className.length > 0
    ? n.className + " hidden"
    : "hidden", n.disabled = !0)
    : this.showElement(n))
}, addClass: function (n, t) {
  typeof n != "undefined" && n !== null && (RegExp("\\b" + t + "\\b", "ig").test(n.className) || (n.className += n.className.length > 0
    ? " " + t
    : t))
}, removeClass: function (n, t) {
  typeof n != "undefined" && n !== null && (n.className = n.className.replace(RegExp("\\b" + t + "\\b", "ig"), "").trim())
}, swapClass: function (n, t, i) {
  this.removeClass(n, t);
  this.addClass(n, i)
}, getOffSets: function (n) {
  var i, r, t;
  try {
    if (i = n.offsetLeft, r = n.offsetTop, n.offsetParent)for (t = "static", window.getComputedStyle
      ? t = window.getComputedStyle(n.offsetParent, null).getPropertyValue("position")
      : n.currentStyle && (t = n.currentStyle.position); n.offsetParent && t != "fixed" && t != "absolute";)n = n.offsetParent, n &&
      (i += n.offsetLeft, r += n.offsetTop);
    return[i, r]
  }
  catch (u) {
    return null
  }
}, hitTest: function (n, t, i) {
  var r = this.getOffSets(n);
  return r
    ? t >= r[0] && t <= r[0] + n.clientWidth && i >= r[1] && i <= r[1] + n.clientHeight
    : !1
}, getEleW: function (n, t) {
  return this._filter(n.innerWidth
    ? n.innerWidth
    : 0, n.clientWidth
    ? n.clientWidth
    : 0, n.scrollWidth
    ? n.scrollWidth
    : 0, t)
}, getEleH: function (n, t) {
  return this._filter(n.innerHeight
    ? n.innerHeight
    : 0, n.clientHeight
    ? n.clientHeight
    : 0, n.scrollHeight
    ? n.scrollHeight
    : 0, t)
}, getWH: function () {
  return this._filter(window.innerHeight
    ? window.innerHeight
    : 0, document.documentElement
    ? document.documentElement.clientHeight
    : 0, document.body
    ? document.body.clientHeight
    : 0)
}, getWSL: function () {
  return this._filter(window.pageXOffset
    ? window.pageXOffset
    : 0, document.documentElement
    ? document.documentElement.scrollLeft
    : 0, document.body
    ? document.body.scrollLeft
    : 0)
}, getWST: function () {
  return this._filter(window.pageYOffset
    ? window.pageYOffset
    : 0, document.documentElement
    ? document.documentElement.scrollTop
    : 0, document.body
    ? document.body.scrollTop
    : 0)
}, mouseX: function (n) {
  var t = null;
  return n.pageX
    ? t = n.pageX
    : n.clientX && (t = n.clientX + (document.documentElement.scrollLeft
    ? document.documentElement.scrollLeft
    : document.body.scrollLeft)), t
}, mouseY: function (n) {
  var t = null;
  return n.pageY
    ? t = n.pageY
    : n.clientY && (t = n.clientY + (document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body.scrollTop)), t
}, showElement: function (n) {
  return n != null
    ? (n.className.indexOf("hidden", 0) != -1 &&
    (n.className = n.className.replace(/hidden/i, ""), n.className = n.className.trim()), n.disabled = !1, n.removeAttribute("disabled"), !0)
    : !1
}, hideElement: function (n) {
  return n != null
    ? (n.className.indexOf("hidden", 0) == -1 && (n.className += " hidden"), n.setAttribute("disabled", "true"), n.disabled = !0, !0)
    : !1
}, setValueInCookie: function (n, t, i) {
  var f = arguments.length == 3 || arguments.length == 4 && arguments[3] == !0
    ? !0
    : !1, o = this.getValueFromCookie(n, "", ""), e, u, r;
  if (i = unescape(i), o != "") {
    if (t != "") {
      for (e = !1, u = o.split("&"), r = 0; r < u.length; r++)if (u[r].startsWith(t + "=")) {
        u[r] = t + "=" + escape(i) + (!f || i.endsWith("||")
          ? ""
          : "||");
        e = !0;
        break
      }
      for (e || i == "" || u.push(t + "=" + escape(i) + (!f || i.endsWith("||")
        ? ""
        : "||")), i = "", r = 0; r < u.length; r++)i += u[r] == ""
        ? ""
        : u[r] + "&"
    }
  }
  else t != "" && (i = t + "=" + escape(i) + (!f || i.endsWith("||")
    ? ""
    : "||"));
  document.cookie = n + "=" + i.replace(/\$amp\$/g, "&amp;").replace(/\$quot\$/g, "&quot;").replace(/\$lt\$/g, "&lt;").replace(/\$gt\$/g, "&gt;") + ";path=/"
}, setValueInCookieOnlyIfNotEmpty: function (n, t, i) {
  n != "" && i != "" && this.setValueInCookie(n, t, i, !1)
}, getValueFromCookie: function (n, t, i) {
  for (var f = typeof i != "undefined"
    ? i
    : "", u = unescape(document.cookie).split(";"), o = typeof i != "undefined"
    ? i
    : "", h = !1, s, c, e, r = 0; r < u.length; r++)if (s = u[r].indexOf("=") == -1
    ? u[r].length - 1
    : u[r].indexOf("="), c = u[r].substr(0, s).replace(/^\s+|\s+$/g, ""), c == n) {
    h = !0;
    f = u[r].substr(s + 1).replace(/^\s+|\s+$/g, "");
    break
  }
  if (f = String(f).replace(/&amp;/g, "$amp$").replace(/&quot;/g, "$quot$").replace(/&lt;/g, "$lt$").replace(/&gt;/g, "$gt$"), h)if (t.length > 0) {
    for (e = f.split("&"), r = 0; r < e.length; r++)if (e[r].startsWith(t + "=")) {
      o = e[r].substring(t.length + 1);
      break
    }
  }
  else o = f;
  return String(o).replace(/\$amp\$/g, "&amp;").replace(/\$quot\$/g, "&quot;").replace(/\$lt\$/g, "&lt;").replace(/\$gt\$/g, "&gt;")
}, readCookie: function (n) {
  for (var r = n + "=", u = document.cookie.split(";"), t, i = 0; i < u.length; i++) {
    for (t = u[i]; t.charAt(0) == " ";)t = t.substring(1, t.length);
    if (t.indexOf(r) == 0)return t.substring(r.length, t.length)
  }
  return null
}, setCookieValue: function (n, t) {
  document.cookie = n + "=" + t.replace(/\$amp\$/g, "&amp;").replace(/\$quot\$/g, "&quot;").replace(/\$lt\$/g, "&lt;").replace(/\$gt\$/g, "&gt;") + ";path=/"
}, disableElement: function (n) {
  n.getAttribute("_disabled") === null && n.setAttribute("_disabled", n.disabled
    ? String(n.disabled)
    : "false");
  var t = n.getAttribute("href");
  t && (n.setAttribute("_href", t), n.removeAttribute("href"));
  n.disabled || n.getAttribute("_tab") !== null || (n.setAttribute("_tab", n.tabIndex), n.setAttribute("tabIndex", "-1"));
  n.tagName != "A" && n.id.indexOf("UName") == -1 && n.id.indexOf("PWord") == -1 && (n.disabled = !0, n.setAttribute("disabled", "disabled"))
}, enableElement: function (n) {
  var t = n.getAttribute("_disabled");
  t && t === "false" && (n.disabled = !1, n.removeAttribute("disabled"), n.removeAttribute("_disabled"), n.getAttribute("_href") &&
    (n.setAttribute("href", n.getAttribute("_href")), n.removeAttribute("_href")), n.getAttribute("_tab") !== null &&
    (n.tabIndex = n.getAttribute("_tab"), n.removeAttribute("_tab")))
}, disableGroup: function (n) {
  for (var i = n.getElementsByTagName("*"), t = 0; t < i.length; t++)typeof this._eleList[i[t].tagName] != "undefined" && this.disableElement(i[t]);
  typeof this._eleList[n.tagName] != "undefined" && this.disableElement(n)
}, enableGroup: function (n) {
  for (var i = n.getElementsByTagName("*"), t = 0; t < i.length; t++)typeof this._eleList[i[t].tagName] != "undefined" && this.enableElement(i[t]);
  typeof this._eleList[n.tagName] != "undefined" && this.enableElement(n)
}, hasCls: function (n, t) {
  return n && n.className.length > 0 && n.className.indexOf(t) > -1
}, deepCopy: function (n) {
  var i, r;
  if (Object.prototype.toString.call(n) === "[object Array]" || Object.prototype.toString.call(n) === "[object Arguments]") {
    for (var u = [], t = 0, f = n.length; t < f; t++)u[t] = this.deepCopy(n[t]);
    return u
  }
  if (typeof n == "object") {
    i = {};
    for (r in n)i[r] = this.deepCopy(n[r]);
    return i
  }
  return n
}, getZIdx: function (n) {
  return parseInt($(n).css("z-index")) || 0
}};
var $bSys = new b365.Sys, $getNES = function (n, t) {
  return $bSys.getEleSib(n, "n", t)
}, $getPES = function (n, t) {
  return $bSys.getEleSib(n, "p", t)
}, $getPTag = function (n, t, i) {
  return $bSys.getPTag(n, t, i)
}, $getCTag = function (n, t, i) {
  return $bSys.getCTag(n, t, i)
}, $getParIDTag = function (n, t, i) {
  return $bSys.getParIDTag(n, t, i)
}, $getParIDPTag = function (n, t, i) {
  return $bSys.getParIDPTag(n, t, i)
}, $getMT = function (n) {
  return $bSys.getMediaType(n)
}, $getItemIdSuffix = function (n, t, i) {
  return $bSys.getItemIdSuffix(n, t, i)
}, $firstChild = function (n, t, i) {
  return $bSys.firstChild(n, t, i)
}, $parentNode = function (n) {
  return $bSys.parentNode(n)
}, $tglEle = function (n) {
  return $bSys.toggleElement(n)
}, $showEle = function (n) {
  return $bSys.showElement(n)
}, $addCls = function (n, t) {
  return $bSys.addClass(n, t)
}, $remCls = function (n, t) {
  return $bSys.removeClass(n, t)
}, $swpCls = function (n, t, i) {
  return $bSys.swapClass(n, t, i)
}, $hideEle = function (n) {
  return $bSys.hideElement(n)
}, $hasCls = function (n, t) {
  return $bSys.hasCls(n, t)
}, $deepCopy = function (n) {
  return $bSys.deepCopy(n)
}, $getZIndex = function (n) {
  return $bSys.getZIdx(n)
}, $removeEvilTwin = function (n) {
  var i, t, r, o;
  n = n.toLowerCase();
  var u = "/liquid_style.css", f = "/style.css", s = "matchlive/liquid_basic.css", e = "matchlive/basic.css";
  if (n.indexOf(s) != -1 || n.indexOf(e) != -1 || n.indexOf(u) != -1 || n.indexOf(f) != -1) {
    if (i = e, n.indexOf(e) != -1 && (i = s), n.indexOf(u) != -1 && (i = u), n.indexOf(f) != -1 && (i = f), t = document.getElementsByTagName("link"), t &&
      t.length > 0)for (r = 0; r < t.length; r++)t[r].href.toString().indexOf(i) != -1 && (o = t[r], o.parentNode.removeChild(o));
    return
  }
}, $loadCSS = function (n, t) {
  var e, r, u, i, f, o;
  if ($removeEvilTwin(n), e = document.getElementsByTagName("head")[0], r = document.getElementsByTagName("link"), r && r.length > 0)for (u = 0; u <
    r.length; u++)if (r[u].href.indexOf(n) >= 0) {
    t && t();
    return
  }
  i = document.createElement("link");
  i.setAttribute("href", n);
  i.setAttribute("rel", "stylesheet");
  i.setAttribute("type", "text/css");
  "sheet"in i
    ? (f = "sheet", o = "cssRules")
    : (f = "styleSheet", o = "rules");
  var c = navigator.userAgent.lastIndexOf("Safari/") > 0, l = document.styleSheets.length, s = setInterval(function () {
    try {
      (i[f] && i[f][o].length || c && document.styleSheets.length > l) && (clearInterval(s), clearTimeout(h), t && t())
    }
    catch (n) {
    }
  }, 200), h = setTimeout(function () {
    clearInterval(s);
    clearTimeout(h);
    e.removeChild(i);
    throw"Script load failed";
  }, 1e4);
  e.appendChild(i)
}, $loadScript = function (n, t, i) {
  var f, r;
  t = t.trim();
  for (var o = t, e = function (n) {
    var t = $getFN(o) + "_loaded";
    typeof window[t] == "function" && window[t](n);
    i && i()
  }, s = document.getElementsByTagName("head")[0], u = 0; u < 2; u++)if (f = u == 0
    ? s.getElementsByTagName("script")
    : document.getElementsByTagName("script"), f && f.length > 0)for (u = 0; u < f.length; u++)if (f[u].src.indexOf(t.startsWith(".")
    ? t.substring(1)
    : t) >= 0) {
    e(n);
    return
  }
  r = document.createElement("script");
  r.setAttribute("language", "javascript");
  r.setAttribute("type", "text/javascript");
  r.setAttribute("src", o);
  r.addEventListener
    ? r.onload = function () {
    e(n)
  }
    : r.readyState && (r.onreadystatechange = function () {
    (r.readyState == "loaded" || r.readyState == "complete") && e(n)
  });
  s.appendChild(r)
}, $setGlobal = function (n, t, i) {
  if (typeof window[n] != "function" && typeof t == "string")try {
    window[n] = JSON.parse(t);
    i && i()
  }
  catch (r) {
    window[n] = null;
    i && i()
  }
}, cacheTokens = [], $setCachePolicy = function (n, t) {
  var u, i, e, f = n.split(","), r;
  if (f)for (r = 0; r < f.length; r++)u = f[r].split("="), i = u[0].split("."), e = u[1], cacheTokens[i[0]] ||
    (cacheTokens[i[0]] = []), cacheTokens[i[0]][i[1]] = e;
  t && t()
}, $getFN = function (n) {
  var t = n.match(/(.*)[\/\\](\w+)/);
  return t && t.length >= 3
    ? t[2]
    : ""
}, $setTitleText = function (n, t) {
  document.title = n;
  t && t()
}, $formatDatePart = function (n) {
  return n < 10
    ? "0" + n
    : n
}, $getTimeAsHHMMSS = function (n) {
  var t = $formatDatePart(n.getHours()), i = $formatDatePart(n.getMinutes()), r = $formatDatePart(n.getSeconds());
  return t + ":" + i + ":" + r
}, $getComputedPadding = function (n) {
  var t, i = $getAppliedStyle(n);
  return t = parseInt(i.paddingRight.replace("px", "")) + parseInt(i.paddingLeft.replace("px", "")), isNaN(t)
    ? 0
    : t
}, $getAppliedStyle = function (n) {
  return typeof n.currentStyle != "undefined"
    ? n.currentStyle
    : document.defaultView.getComputedStyle(n, null)
}, $getLen = function (n, t) {
  var i = 0;
  return t && (i = n.style.width.replace("px", ""), i = isNaN(parseInt(i))
    ? 0
    : i, i && i != 0 || (i = $getAppliedStyle(n), i = i.width.replace("px", ""), i = isNaN(parseInt(i))
    ? 0
    : i)), i && i != 0 || (i = n.clientWidth), i && i != 0 || (i = n.innerWidth), i && i != 0 || (i = n.scrollWidth), i
};
Type.registerNamespace("b365.Ui")