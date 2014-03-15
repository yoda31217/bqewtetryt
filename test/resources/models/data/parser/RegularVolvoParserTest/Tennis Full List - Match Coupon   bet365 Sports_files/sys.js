(function (a) {
  a.fn.extend({hasClasses: function (b) {
    var c = this;
    for (i in b)if (a(c).hasClass(b[i]))return true;
    return false
  }})
})(jQuery);
(function (a, c) {
  function b(g, f, d, c, b, a, e) {
    this._dataUrl = g;
    this._dataEvent = f;
    this._errorEvent = d;
    this._arguments = arguments;
    this._timeOut = c;
    this._timeOutEvent = b;
    this._cacheRequest = true;
    if (typeof a !== "undefined" && a !== null)this._cacheRequest = !a;
    this._reqInstanceId = e;
    this._ajaxObject
  }

  b.prototype.Load = function (d) {
    var b = this;
    if (!d)d = "GET";
    b._ajaxObject = c.ajax({type: d, url: b._dataUrl, cache: b._cacheRequest, beforeSend: function (a) {
      a.overrideMimeType("text/plain")
    }, error: function (a, c) {
      if (c === "timeout" && typeof b._timeOutEvent !== "undefined" && b._timeOutEvent !== null)b._timeOutEvent(b._reqInstanceId);
      else a.status != 0 && typeof b._errorEvent !== "undefined" && b._errorEvent !== null && b._errorEvent(a.status, a.statusText, b._reqInstanceId)
    }, complete: function (e) {
      if (e.status == 200 && e.statusText == "OK") {
        var d = e.getResponseHeader("X-b365-ScriptVersion"), f = document.getElementById("sv").value;
        if (d && f)if (d !== f) {
          var c = a.location.href;
          if (c.endsWith("/lite/") || c.indexOf("#") == -1 || c.indexOf("?sv=") != -1)a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d +
            "#!home/";
          else a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d + "#!home/"
        }
        b.OnData(b, e.responseText)
      }
    }})
  };
  b.prototype.Post = function (d) {
    var b = this;
    b._ajaxObject = c.ajax({type: "POST", url: this._dataUrl, cache: b._cacheRequest, data: d, beforeSend: function (a) {
      a.setRequestHeader("Content-type", "application/x-wwww-form-urlencoded");
      a.setRequestHeader("Content-length", d.length);
      a.setRequestHeader("Connection", "close");
      a.overrideMimeType("text/plain")
    }, error: function (a, c) {
      if (c === "timeout" && typeof b._timeOutEvent !== "undefined" && b._timeOutEvent !== null)b._timeOutEvent(b._reqInstanceId);
      else a.status != 0 && typeof b._errorEvent !== "undefined" && b._errorEvent !== null && b._errorEvent(a.status, a.statusText, b._reqInstanceId)
    }, complete: function (e) {
      if (e.status == 200 && e.statusText == "OK") {
        var d = e.getResponseHeader("X-b365-ScriptVersion"), f = document.getElementById("sv").value;
        if (d && f)if (d !== f) {
          var c = a.location.href;
          if (c.endsWith("/lite/") || c.indexOf("#") == -1 || c.indexOf("?sv=") != -1)a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d +
            "#!home/";
          else a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d + "#!home/"
        }
        b.OnData(b, e.responseText)
      }
    }})
  };
  b.prototype.LoadSynchronous = function () {
    var b = this;
    b._ajaxObject = c.ajax({type: "GET", url: this._dataUrl, async: false, cache: b._cacheRequest, beforeSend: function (a) {
      a.overrideMimeType("text/plain")
    }, error: function (a, c) {
      if (c === "timeout" && typeof b._timeOutEvent !== "undefined" && b._timeOutEvent !== null)b._timeOutEvent(b._reqInstanceId);
      else a.status != 0 && typeof b._errorEvent !== "undefined" && b._errorEvent !== null && b._errorEvent(a.status, a.statusText, b._reqInstanceId)
    }, complete: function (e) {
      if (e.status == 200 && e.statusText == "OK") {
        var d = e.getResponseHeader("X-b365-ScriptVersion"), f = document.getElementById("sv").value;
        if (d && f)if (d !== f) {
          var c = a.location.href;
          if (c.endsWith("/lite/") || c.indexOf("#") == -1 || c.indexOf("?sv=") != -1)a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d +
            "#!home/";
          else a.location.href = c.substring(0, c.indexOf("/lite/") + 5) + "?sv=" + d + "#!home/"
        }
        b.OnData(b, e.responseText)
      }
    }});
    return
  };
  b.prototype.OnData = function (a, b) {
    if (b.search(/SERVER_ERROR/) > -1) {
      a._arguments[7][a._arguments[7].length] = a._arguments[7][0];
      a._arguments[7].length++;
      a._arguments[7][0] = 99;
      b = b.replace(/SERVER_ERROR/, "")
    }
    typeof a._dataEvent !== "undefined" && a._dataEvent !== null && a._dataEvent(b, a._arguments)
  };
  b.prototype.Abort = function () {
    var a = this;
    if (typeof a._ajaxObject != "undefined" && a._ajaxObject != null) {
      a._ajaxObject.abort();
      a._ajaxObject = null
    }
  };
  a.b365AJAX = b
})(window, jQuery);
b365.Resource = function (a) {
  this._resources = a;
  $addHandler(window, "load", Function.createDelegate(this, this.preLoad))
};
b365.Resource.prototype = {init: function () {
  $addHandler(window, "load", Function.createDelegate(this, this.preLoad))
}, preLoad: function () {
  setTimeout(Function.createDelegate(this, this.load), 1e3)
}, load: function () {
  for (var c = document, a = 0; a < this._resources.length; a++) {
    var b;
    if (this._resources[a].type == "script") {
      b = c.createElement(this._resources[a].type);
      b.src = this._resources[a].url;
      c.body.appendChild(b)
    }
    else if (this._resources[a].type == "link") {
      b = c.createElement(this._resources[a].type);
      b.href = this._resources[a].url;
      b.rel = "stylesheet";
      b.type = "text/css";
      c.body.appendChild(b)
    }
    else if (this._resources[a].type == "image")(new Image).src = this._resources[a].url
  }
}, loaded: function (a, b) {
  $get(a).innerHTML = b
}};
b365.Ui.FadeOutAlert = function () {
  this._alertInterval = null;
  this._messageDiv = null
};
b365.Ui.FadeOutAlert.prototype = {show: function (b, a, g, e, d) {
  if (a) {
    if (!e)e = 3e3;
    if (!d)d = 10;
    this._messageDiv = a;
    var c = document.body.scrollTop;
    if (c == 0)if (window.pageYOffset)c = window.pageYOffset;
    else c = document.body.parentElement
        ? document.body.parentElement.scrollTop
        : 0;
    var h = $bSys.getOffSets(b), k = $bSys.getEleW(b), l = $bSys.getEleH(b);
    $remCls(a, "ttHidden");
    var i = $bSys.getEleH(a, true), j = $bSys.getEleW(a);
    a.style.left = h[0] + k / 2 - j / 2 + "px";
    a.style.top = h[1] - i + 10 + "px";
    a.style.opacity = 1;
    a.style.filter = "alpha(opacity = " + a.style.opacity * 100 + ")";
    var f = g != null
      ? $get(g, a)
      : $get("icon", a);
    if (f) {
      f.style.opacity = a.style.opacity;
      f.style.filter = a.style.filter
    }
    b = a;
    window.setTimeout(Function.createDelegate(this, function () {
      this._alertInterval = window.setTimeout(Function.createDelegate(this, this.hide), d)
    }), e)
  }
}, hide: function () {
  this._alertInterval && window.clearTimeout(this._alertInterval);
  $addCls(this._messageDiv, "ttHidden")
}, fade: function () {
  var a = this._messageDiv;
  if (a) {
    a.style.opacity = a.style.opacity - .01;
    a.style.filter = "alpha(opacity = " + a.style.opacity * 100 + ")";
    var b = $get("icon", a);
    if (b) {
      b.style.opacity = a.style.opacity;
      b.style.filter = "alpha(opacity = " + a.style.opacity * 100 + ")"
    }
    a.style.opacity <= 0 && this.hide()
  }
}};
b365.Ui.PUpDialog = function (d, a, f, c, b, e) {
  this._forcedTopOffset = typeof b == "undefined"
    ? 0
    : b;
  this.getPosBaseEle = function (d, c) {
    if (d == null || d === c)return c;
    var a = d;
    while (a !== c && a.parentNode != null) {
      a = a.parentNode;
      if (window.getComputedStyle) {
        var b = window.getComputedStyle(a, null);
        if (b.getPropertyValue("position") == "fixed" || b.getPropertyValue("position") == "absolute" || b.getPropertyValue("position") == "static")break
      }
    }
    return a
  };
  this._body = $get("lteBdy");
  this._dlgParent = null;
  this._dlg = a;
  this._offsets = e;
  this._dlgMoved = false;
  this._bgDiv = null;
  this._posBaseEle = null;
  if (d)this._tgt = d;
  else this._tgt = this._body;
  this._ch = null;
  this._cw = null;
  this._bh = null;
  this._bvh = null;
  this._bw = null;
  this._wh = null;
  this._ww = null;
  this._wsl = null;
  this._wst = null;
  this._bgTop = null;
  this._bgLeft = null;
  this._dlgTop = null;
  this._dlgLeft = null;
  this._childIfrm = null;
  this._backIfrm = null;
  this._windowWidth = null;
  this._windowHeight = null;
  this._time = (new Date).getTime();
  this._imp = mf._MSG_IMP_LOW;
  if (c)this._imp = c;
  this._hasWindowSizeChanged = function () {
    return this._windowWidth != document.documentElement.clientWidth || this._windowWHeight != document.documentElement.clientHeight
  };
  this.moveDialog = function (a) {
    if (!a && this._dlg.parentNode != this._body) {
      this._dlgParent = this._dlg.parentNode;
      this._posBaseEle.appendChild(this._dlgParent.removeChild(this._dlg));
      return true
    }
    else return false
  };
  this.moveDialogBack = function () {
    this._dlgMoved && this._dlgParent.appendChild(this._dlg.parentNode == null
      ? this._dlg
      : this._posBaseEle.removeChild(this._dlg))
  };
  this._baseZIdx = this._imp * 1e5;
  this._zIdxBgFrm = this._baseZIdx;
  this._zIdxBgDiv = this._baseZIdx + 1;
  this._zIdxDlg = this._baseZIdx + 4;
  this._zIdxBgFrm *= 2;
  this._zIdxBgDiv *= 2;
  this._zIdxDlg *= 2;
  this._fsc = this._tgt == document.body || this._tgt == document.documentElement;
  this._posBaseEle = this.getPosBaseEle(this._tgt, this._body);
  this._dlgMoved = this.moveDialog(this._fsc);
  this._dlg.style.zIndex = this._zIdxDlg;
  this._dlg.style.position = "absolute";
  this._bgGry = f;
  this._isDlgIframe = a && a.tagName.toLowerCase() === "iframe";
  this._setPositions = function () {
    this._setPositionVariables();
    !this._bgDiv && this._createBgnd();
    this._bgDiv.style.zIndex = this._zIdxBgDiv;
    this._bgDiv.style.height = this._bh - this._forcedTopOffset + "px";
    this._bgDiv.style.width = this._bw + "px";
    this._bgDiv.style.top = this._bgTop + "px";
    this._bgDiv.style.left = this._bgLeft + "px";
    this._dlg.style.zIndex = this._zIdxDlg;
    this._dlg.style.top = this._dlgTop - this._forcedTopOffset + "px";
    this._dlg.style.left = this._dlgLeft + "px";
    (this._dlgTop + this._ch > this._wh + this._wst || this._dlgTop < this._wst) && window.scrollTo(this._wsl, this._bgTop)
  };
  this._createBgnd = function () {
    var c, b = this._tgt.id + "_greyout" + this._time;
    if (!this._bgDiv) {
      this._bgDiv = $get(b);
      if (this._bgDiv == null)this._bgDiv = this._appendElement(this._posBaseEle, "div", b);
      this._bgDiv.className = this._bgGry
        ? this._fsc
        ? "centergreyout"
        : "mdlgreyout"
        : "";
      if (this._tgt) {
        var a = this._tgt.getAttribute("data-overlay-class");
        if (a && a != "")this._bgDiv.className = a
      }
      this._bgDiv.style.position = "absolute";
      this._bgDiv.style.display = "block"
    }
  };
  this._appendElement = function (c, d, b) {
    var a = document.createElement(d);
    if (b)a.id = b;
    c.appendChild(a);
    return a
  };
  this._setPositionVariables = function () {
    var b = document.documentElement && document.documentElement.clientWidth
      ? document.documentElement
      : document.body;
    this._bh = $bSys.getEleH(this._tgt, true);
    this._bw = $bSys.getEleW(this._tgt, false);
    this._ch = $bSys.getEleH(this._dlg, true);
    this._cw = $bSys.getEleW(this._dlg);
    this._wh = $bSys.getWH();
    this._ww = $bSys.getEleW(b);
    this._wsl = $bSys.getWSL();
    this._wst = $bSys.getWST();
    var a = this._offsets;
    if (a == undefined)a = $bSys.getOffSets(this._tgt);
    this._bgLeft = a[0];
    this._bgTop = a[1] + this._forcedTopOffset;
    if (this._wh <= this._ch)this._ch = this._wh - 40;
    if (this._bh > this._wh)this._dlgTop = this._bgTop + Math.round(this._wh - this._ch) / 2;
    else this._dlgTop = this._bgTop + Math.round(this._bh - this._ch) / 2;
    this._dlgLeft = this._bgLeft + Math.round(this._bw - this._cw) / 2
  }
};
b365.Ui.PUpDialog.prototype = {showDialog: function () {
  (new b365.Ui.AutoRefreshController).pauseRF();
  this._createBgnd();
  $bSys.disableGroup(this._tgt);
  $bSys.enableGroup(this._dlg);
  $showEle(this._bgDiv);
  this._dlg.style.zIndex = $getZIndex(this._bgDiv) + 1;
  $showEle(this._dlg);
  this._setPositions();
  $addHandler(window, "resize", Function.createDelegate(this, this.handleResize))
}, hideDialog: function () {
  if (this._bgDiv) {
    $hideEle(this._bgDiv);
    $hideEle(this._dlg);
    $bSys.enableGroup(this._tgt);
    $removeHandler(window, "resize", this.handleResize);
    if (this._backIfrm)if ($get(this._backIfrm.id)) {
      $hideEle(this._backIfrm);
      this._backIfrm.parentNode.removeChild(this._backIfrm);
      this._backIfrm = null
    }
    if (this._childIfrm)if ($get(this._childIfrm.id)) {
      $hideEle(this._childIfrm);
      this._childIfrm.parentNode.removeChild(this._childIfrm);
      this._childIfrm = null
    }
    if ($get(this._bgDiv.id)) {
      this._bgDiv.parentNode.removeChild(this._bgDiv);
      this._bgDiv = null
    }
    this.moveDialogBack();
    this._bgDiv = null;
    this._dlg = null;
    this._tgt = null;
    (new b365.Ui.AutoRefreshController).restartRF()
  }
  return false
}, handleResize: function () {
  this.resizeWindow()
}, resizeWindow: function () {
  this._bgDiv && this._setPositions()
}};
(function () {
  var a = [];
  Type.registerNamespace("b365.Ui");
  var b = false;
  b365.Ui.AutoRefreshController = function () {
  };
  b365.Ui.AutoRefreshController.prototype = {initRF: function () {
    this.disableRF();
    for (var c = document.getElementsByName("AR"), d, f = 0; f < c.length; f++) {
      var e = c[0].value.split(";");
      if (a[c[0].id] == undefined) {
        d = new b365.System.Timer(function () {
          eval("mf._isAutoRefresh = true; mf.req(" + e[0] + ");")
        }, parseInt(e[1]));
        d.start();
        a[c[0].id] = d
      }
    }
    b = false
  }, disableRF: function () {
    var c = 0;
    for (var d in a) {
      a[d].destroy();
      a.splice(c, 1);
      delete a[d];
      c++
    }
    b = false
  }, pauseRF: function () {
    for (var c in a)a[c].pause();
    b = true
  }, restartRF: function () {
    if (mf._b365AJAX == null) {
      for (var c in a)a[c].restart();
      b = false
    }
  }, isPaused: function () {
    return b
  }}
})();
b365.Ui.PleaseWait = function (c, e, d, a, b) {
  this._host = c;
  this._tgt = document.body
    ? document.body
    : document.documentElement;
  this._spn = d;
  this._delay = a
    ? a
    : 10;
  this._gry = b
    ? b
    : false;
  this._tmr = null;
  this._dlg = null;
  this._startTimeMS = 0;
  this._show = function () {
    if (this._tmr) {
      clearTimeout(this._tmr);
      this._tmr = null
    }
    var a = $get("idSBT");
    if (a && a.className.indexOf("visible") > -1)return;
    if (this._host == null || this._host._b365AJAX)if (this._tgt !== null && this._spn !== null) {
      this._dlg != null && this._dlg.hideDialog();
      this._dlg = new b365.Ui.PUpDialog(this._tgt, this._spn, this._gry, mf._MSG_IMP_LOW);
      this._dlg.showDialog();
      setTimeout(Function.createDelegate(this, this._updateSpinnerSource), 30)
    }
  };
  this._updateSpinnerSource = function () {
    if (this._dlg)if (this._host == null || this._host._b365AJAX)this._dlg.handleResize();
    else {
      this._dlg.hideDialog();
      this._dlg = null
    }
  };
  this._getRemainingTime = function () {
    return this._delay - ((new Date).getTime() - this._startTimeMS)
  }
};
b365.Ui.PleaseWait.prototype = {show: function () {
  if (!this._dlg)if (!this._tmr) {
    this._startTimeMS = (new Date).getTime();
    this._tmr = setTimeout(Function.createDelegate(this, this._show), this._delay)
  }
}, updateShow: function (b) {
  this._host = b;
  if (this._tmr) {
    clearTimeout(this._tmr);
    this._tmr = null
  }
  var a = this._getRemainingTime();
  this._tmr = setTimeout(Function.createDelegate(this, this._show), a > 0
    ? a
    : 0)
}, hide: function () {
  if (this._tmr) {
    clearTimeout(this._tmr);
    this._tmr = null
  }
  if (this._dlg) {
    this._dlg.hideDialog();
    this._dlg = null
  }
}};
var tHold = "";
b365.Ui.ToolTip = function (c, a, d, b) {
  this._eleID = c;
  this._persist = a;
  this._autoClosePopEl = null;
  this._autoCloseSrcEl = null;
  this._autoCloseTimer = -1;
  this._pinH = d;
  this._pinTop = b
};
b365.Ui.ToolTip.prototype = {show: function (f, i, c, b, h, j) {
  this._autoCloseTimer != -1 && this.popupTimeout();
  var a = $(this._eleID)[0];
  if (!a)return false;
  if (!this._persist && $hasCls(a, "ttShow"))return false;
  if (!c)c = "400px";
  if (!b)b = 12;
  var e = b
    ? String(b)
    : "";
  a.style.maxWidth = c.indexOf("px") == -1
    ? c + "px"
    : c;
  var d = $get("cnt", a);
  if (d == null)d = $getElementsByClassName("cnt", a);
  d.className = j || "";
  d.innerHTML = i;
  var m = parseInt(c.replace(/px/g, ""));
  $swpCls(a, "ttHidden", "ttShow");
  (new b365.Ui.AutoRefreshController).pauseRF();
  var g = $bSys.getOffSets(f);
  if (g != null) {
    var l = $bSys.getEleW(f), k = $bSys.getEleW(a);
    if (b)a.style.top = g[1] + (e.indexOf("px") == -1
      ? b
      : Number(e.substring(0, e.indexOf("px")))) + "px";
    a.style.left = g[0] + l / 2 - k / 2 + "px"
  }
  this.setupHandlers(f, h)
}, hide: function () {
  var a = $(this._eleID)[0];
  $swpCls(a, "ttShow", "ttHidden");
  (new b365.Ui.AutoRefreshController).restartRF()
}, setupHandlers: function (c, b) {
  var a = $(this._eleID);
  a && $addHandler(a, "click", Function.createDelegate(this, this.onItemClick), false, true, a);
  if (b) {
    this._autoClosePopEl = a;
    this._autoCloseSrcEl = c;
    this._autoCloseTimer = window.setTimeout(Function.createDelegate(this, this.popupTimeout), 3e4)
  }
}, onItemClick: function (a) {
  var b = null;
  if (a)b = a.target;
  b.id == "ttClose" && this.hide()
}, popupTimeout: function () {
  if (this._autoClosePopEl && this._autoCloseSrcEl) {
    this.hide();
    if (this._autoCloseTimer > -1) {
      window.clearTimeout(this._autoCloseTimer);
      this._autoClosePopEl = null;
      this._autoCloseTimer = -1
    }
  }
}};
var $tt = new b365.Ui.ToolTip(".ttDiv", false, 12, true), $ttPersist = new b365.Ui.ToolTip("#ttDivPersist", true, 14, false);
var JSON;
if (!JSON)JSON = {};
(function () {
  "use strict";
  function c(a) {
    return a < 10
      ? "0" + a
      : a
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function () {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) +
        ":" + c(this.getUTCSeconds()) + "Z"
        : null
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
      return this.valueOf()
    }
  }
  var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, a, d, i = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, b;

  function g(a) {
    f.lastIndex = 0;
    return f.test(a)
      ? '"' + a.replace(f, function (a) {
      var b = i[a];
      return typeof b === "string"
        ? b
        : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    }) + '"'
      : '"' + a + '"'
  }

  function e(m, n) {
    var h, j, i, k, l = a, f, c = n[m];
    if (c && typeof c === "object" && typeof c.toJSON === "function")c = c.toJSON(m);
    if (typeof b === "function")c = b.call(n, m, c);
    switch (typeof c) {
      case"string":
        return g(c);
      case"number":
        return isFinite(c)
          ? String(c)
          : "null";
      case"boolean":
      case"null":
        return String(c);
      case"object":
        if (!c)return"null";
        a += d;
        f = [];
        if (Object.prototype.toString.apply(c) === "[object Array]") {
          k = c.length;
          for (h = 0; h < k; h += 1)f[h] = e(h, c) || "null";
          i = f.length === 0
            ? "[]"
            : a
            ? "[\n" + a + f.join(",\n" + a) + "\n" + l + "]"
            : "[" + f.join(",") + "]";
          a = l;
          return i
        }
        if (b && typeof b === "object") {
          k = b.length;
          for (h = 0; h < k; h += 1)if (typeof b[h] === "string") {
            j = b[h];
            i = e(j, c);
            i && f.push(g(j) + (a
              ? ": "
              : ":") + i)
          }
        }
        else for (j in c)if (Object.prototype.hasOwnProperty.call(c, j)) {
          i = e(j, c);
          i && f.push(g(j) + (a
            ? ": "
            : ":") + i)
        }
        i = f.length === 0
          ? "{}"
          : a
          ? "{\n" + a + f.join(",\n" + a) + "\n" + l + "}"
          : "{" + f.join(",") + "}";
        a = l;
        return i
    }
  }

  if (typeof JSON.stringify !== "function")JSON.stringify = function (h, c, f) {
    var g;
    a = "";
    d = "";
    if (typeof f === "number")for (g = 0; g < f; g += 1)d += " ";
    else if (typeof f === "string")d = f;
    b = c;
    if (c && typeof c !== "function" && (typeof c !== "object" || typeof c.length !== "number"))throw new Error("JSON.stringify");
    return e("", {"": h})
  };
  if (typeof JSON.parse !== "function")JSON.parse = function (a, c) {
    var b;

    function d(f, g) {
      var b, e, a = f[g];
      if (a && typeof a === "object")for (b in a)if (Object.prototype.hasOwnProperty.call(a, b)) {
        e = d(a, b);
        if (e !== undefined)a[b] = e;
        else delete a[b]
      }
      return c.call(f, g, a)
    }

    a = String(a);
    h.lastIndex = 0;
    if (h.test(a))a = a.replace(h, function (a) {
      return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
    });
    if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
      b = eval("(" + a + ")");
      return typeof c === "function"
        ? d({"": b}, "")
        : b
    }
    throw new SyntaxError("JSON.parse");
  }
})();
function orientationChangeHandler() {
  var a = this;
  window.addEventListener("orientationchange", function (b) {
    a._detectLayoutChange.call(a, b)
  }, false);
  window.addEventListener("resize", function (b) {
    a._detectLayoutChange.call(a, b)
  }, false);
  this.removeListeners = function () {
    window.removeEventListener("orientationchange", function (b) {
      a._detectLayoutChange.call(a, b)
    }, false);
    window.removeEventListener("resize", function (b) {
      a._detectLayoutChange.call(a, b)
    }, false)
  };
  this._detectLayoutChange = function (e) {
    var a = $displayHelper.isPortraitMode(), d = $(window).outerWidth(), c = $(window).outerHeight(), b = d < c;
    if (b != a) {
      $displayHelper.setPortraitLandscapeMode();
      $displayHelper.setDisplayLayout(e);
      $(document).trigger("resizelayout");
      $(document).trigger("orientationChanged")
    }
  }
};
Type.registerNamespace("b365.Ui");
b365.Ui.DepositMessageDialogCloser = function () {
  this._isValid = function () {
    return typeof dwmsg !== "undefined"
  }
};
b365.Ui.DepositMessageDialogCloser.prototype = {closeDialog: function () {
  this._isValid() && dwmsg.hideDialog()
}};
Type.registerNamespace("b365.Ui");
b365.Ui.ApplicationOptions = function () {
  this.enableThreeWayEleDynaResize = true;
  this.pleaseWaitOverlayDelay = 1e3
};
b365.Ui.MainForm = function () {
  this._lgnFailed = 0;
  this._b365AJAX = null;
  this._mainContent = null;
  this._isHistory = true;
  this._isAdding = false;
  this._isAutoRefresh = false;
  this._isManualRefresh = false;
  this._wgCookie = $bSys.getValueFromCookie("aps03", "ltwo", "");
  this._cfCookie = $bSys.getValueFromCookie("aps03", "cf", "N");
  this._hdCookie = $bSys.getValueFromCookie("aps03", "hd", "N");
  this._lngCookie = $bSys.getValueFromCookie("aps03", "lng", 1);
  this._ctyCookie = $bSys.getValueFromCookie("aps03", "ct", 197);
  this._cstCookie = $bSys.getValueFromCookie("aps03", "cst", 0);
  this._cgCookie = $bSys.getValueFromCookie("aps03", "cg", 0);
  this._tzCookie = $bSys.getValueFromCookie("aps03", "tzi", 1);
  this._tapiLink = "/lite/titleapi/tapi.aspx?";
  this._liveStreamingLink = "";
  this._oddsCookie = $bSys.getValueFromCookie("aps03", "oty", 1);
  this._cpId = 1;
  this._opId = 0;
  this._args = null;
  this._url = "#";
  this.wsizes = null;
  this._ajaxInstId = null;
  this._pws = null;
  this._persistPws = false;
  this._txtHs = null;
  this._txtHs1 = null;
  this._userAct = 0;
  this._userBalance = "";
  this._pageLoaded = false;
  this._userTime = "00:00";
  this._MSG_IMP_LOW = 1;
  this._MSG_IMP_MEDIUM = 2;
  this._MSG_IMP_HIGH = 3;
  this._nodes = [];
  this._nodesDic = [];
  this._OPEN_STATUS = "OPEN";
  this._CLOSE_STATUS = "CLOSE";
  this._SUSPEND_STATUS = "SUSPEND";
  this._TIMEOUT_RECOVER_DELAY = 5e3;
  this._PreviousContent = "";
  this._PreviousOperatorId = "";
  this._lastTime = null;
  this._popWin = null;
  this._isRaceOff = false;
  this._StrmLastUpdatedTime = (new Date).getTime();
  this._events = new Sys.EventHandlerList;
  Sys.Application.set_enableHistory(true)
};
b365.Ui.MainForm.prototype = {pageInit: function () {
  this._mainContent = $get("sbMCN");
  this._isAdding = true;
  $addHandler($get("smft"), "click", Function.createDelegate(this, this.footerClick));
  Sys.Application.add_navigate(Function.createDelegate(this, this.restoreHistory))
}, pageLoad: function (b) {
  if (typeof window.bet365.pushStatus !== "undefined")window.location.hostname.split(".").pop() == "com" &&
  window.bet365.pushStatus.longPollStatus.CheckPollStatus(window.sProps.financialSettings, this.showFinancials, this.disableFinancials);
  this.disconnectMatchLive();
  typeof trk !== "undefined" && trk && trk.send(b, EnumRegionID.Center, -1, EnumEventsOrPageTypes.PageLoad);
  var a = $get("sbMCN");
  a && this.processContent(a.innerHTML, function (b) {
    a.innerHTML = b
  });
  this._isAdding = false;
  window.location.hash && window.location.hash.length > 0 && this.restoreHistorypoint(window.location.hash)
}, disableFinancials: function () {
}, showFinancials: function () {
}, handlePleaseWait: function (a) {
  if (!a)a = this._mainContent;
  if (this._pws == null) {
    this._pws = new b365.Ui.PleaseWait(this, a, $get("dvRpg"), gopts.pleaseWaitOverlayDelay, true);
    this._pws.show()
  }
  else this._pws.updateShow()
}, showPleaseWait: function () {
  if (this._pws == null) {
    this._pws = new b365.Ui.PleaseWait(null, this._mainContent, $get("dvRpg"), gopts.pleaseWaitOverlayDelay, true);
    this._pws.show()
  }
}, updatePleaseWait: function (a) {
  this._pws !== null && this._pws.updateShow(a)
}, showAutoRefreshSpinner: function () {
  var a = $get("req.6");
  if (a) {
    $addCls(a, "arf");
    $swpCls($firstChild($firstChild(a, "DIV"), "DIV"), "rf", "arf")
  }
}, pageUnload: function () {
}, addOnReqStarted: function (a) {
  $("#sbMCN").on("reqstarted", a)
}, addOnReqCompleted: function (a) {
  $("#sbMCN").on("reqcompleted", a)
}, addOnRHSContentChanged: function (a) {
  $("#RHSWrapper").on("contentChanged", a)
}, req: function (a) {
  this._b365AJAX != null && this._b365AJAX.Abort();
  if (sportsUIController.handleRequest(a, arguments)) {
    mfPC._PreviousOperatorId = this._PreviousOperatorId = a;
    mfPC._PreviousContent = this._PreviousContent = "";
    return false
  }
  this._b365AJAX = this.reqInstance.apply(this, arguments);
  return false
}, reqInstance: function (b) {
  var l = null, a = [].slice.apply(arguments), v = new Date;
  this._ajaxInstId = v.getTime();
  var f = "", n = false, t = b == 6, m = false, e = "&cid=" + a[1], u = a[1], j = this._mainContent;
  this.reqStarted(b, arguments);
  if (!this._isAutoRefresh && b !== 29)!mf._isRaceOff && this.disconnectMatchLive();
  if ((b == 14 || b == 13) && lhs.getCurrentMode() != "INPLAY" || (b == 0 || b == 4 || b == 11 || b == 21) && lhs.getCurrentMode() != "SPORTS")m = true;
  var c = "cache/api/", k = null, i = a[1];
  if (i && !isNaN(i))if (cacheTokens[i] && cacheTokens[i][b])k = cacheTokens[i][b];
  else if (cacheTokens["*"] && cacheTokens["*"][b])k = cacheTokens["*"][b];
  if (k)c += "?clt=" + k + "&op=" + b;
  else c += "?op=" + b;
  var d = 0, h = a.length;
  for (d; d < h; d++)if (String(a[d]).indexOf("href=") > -1) {
    f = a[d].substring(a[d].indexOf("href=") + 5);
    a[d] = "";
    arguments[d] = ""
  }
  else if ((a[d] + "").indexOf("RES") > -1) {
    n = true;
    a[d] = "";
    arguments[d] = ""
  }
  var g = f.indexOf("#!");
  if (f != "" && f != "#" && g > -1)c = c + "&rw=" + f.substring(g + 2);
  else switch (b) {
    case 0:
    case 7:
    case 26:
    case 27:
      c += e + (a[2] == undefined
        ? ""
        : "&sec=" + a[2]) + (a[3] == undefined
        ? ""
        : "&hk=" + a[3]);
      break;
    case 13:
      a[1] = Number(a[1]);
      a[1] = !isNaN(a[1]) && a[1] === 0
        ? 9998
        : a[1];
      c += a[1] == undefined || a[1] == ""
        ? ""
        : "&cid=" + String(a[1]);
      c += a[2] == undefined || a[2] == ""
        ? ""
        : "&day=" + a[2];
      c += a[3] == undefined || a[3] == ""
        ? ""
        : "&chn=" + a[3];
      break;
    case 14:
      c += e + (a[2] == undefined || a[2] == ""
        ? ""
        : "&cpid=" + a[2]);
      if (a[3] != undefined && a[3] == "y")m = true;
      break;
    case 1:
    case 8:
      c += e + "&sec=" + a[2] + "&spid=" + a[3] + "&hk=" + a[5] + "&ocid=" + a[6];
      break;
    case 2:
      c += e + "&sec=" + a[2] + "&spid=" + a[3] + "&hk=" + a[5] + "&ocid=" + a[6];
      break;
    case 3:
      c += e + "&sec=" + a[2] + "&spid=" + a[3] + "&hk=" + a[5] + "&ocid=" + a[6];
      break;
    case 4:
    case 11:
      if (b == 11)c = "api/?op=11";
      if (n)c = c.substring(0, c.indexOf("?") + 1) + "res=au&" + c.substring(c.indexOf("?") + 1);
      c += e + "&cpid=" + a[2];
      (new b365.Ui.Coupon.SortKeyRefresher(new CouponKey(a[2]), allowSortCriteria, storage)).refresh(a);
      for (d = 3, h = a.length; d < h; d++)if (a[d] != "")c += "&" + a[d];
      break;
    case 9:
      j = $("#cpn")[0];
      c += e + "&cpid=" + a[2];
      (new b365.Ui.Coupon.SortKeyRefresher(new CouponKey(a[2]), allowSortCriteria, storage)).refresh(a);
      for (d = 3, h = a.length; d < h; d++)if (a[d] != "")c += "&" + a[d];
      trk && !this._isAutoRefresh && trk.send(null, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.Click, EnumPodID.Coupon, -1, a[2]);
      break;
    case 15:
    case 25:
      c += e + "&cpid=" + a[2];
      trk && trk.send(null, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.Click, EnumPodID.CouponHighlights, -1, a[2]);
      j = $get("cpn");
      break;
    case 10:
      c += e + "&cpid=" + a[2] + "&eid=" + a[3];
      break;
    case 5:
      c = "api/?op=" + b;
      break;
    case 6:
      a = this._args;
      op = this._opId;
      c = this._url;
      this._isManualRefresh = true;
      trk && trk.send(null, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Refresh, EnumPodID.Coupon);
      break;
    case 12:
      c += "&evtid=" + a[1];
      break;
    case 18:
      c = "api/?op=18";
      break;
    case 19:
      c = c + "&ccid=" + a[1];
      trk && trk.send(null, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.Click, EnumPodID.ParlayTeaser);
      break;
    case 21:
      if (a[1] == "btn")if ($get("txtHs"))a[1] = $get("txtHs").value.replace(/\s+/g, "|");
      c += (a[1] == undefined
        ? ""
        : "&hrs=" + a[1]) + (a[2] == "byp"
        ? "&byp=s"
        : "&byp=n");
      trk && trk.send(null, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Click, EnumPodID.HorseSearch);
      break;
    case 22:
      c += e + (a[3] == undefined
        ? ""
        : "&cpid=" + a[3]);
      break;
    case 24:
      c += e + "&cpid=" + a[2];
      break;
    case 29:
      c = "api/?op=29";
      c += e + (a[2] == undefined
        ? ""
        : "&evtid=" + a[2]);
      c += "&pid=" + a[3];
      c += "&mlive=" + (a[4] == undefined
        ? "0"
        : a[4]);
      break;
    case 30:
      c += e + (a[2] == undefined
        ? ""
        : "&sck=" + a[2]);
      break;
    case 31:
      c += e + (a[2] == undefined
        ? ""
        : "&sck=" + a[2]);
      break;
    case 32:
      c += e + (a[2] == undefined
        ? ""
        : "&asmid=" + a[2]);
      c += a[3] == undefined
        ? ""
        : "&asms=" + a[3];
      c += a[4] == undefined
        ? ""
        : "&asqty=" + a[4];
      break;
    case 33:
      c = "api/?op=33";
      c += e;
      c += "&asfid=" + a[2];
      c += a[3] == undefined
        ? ""
        : "&asqty=" + a[3];
      break;
    case 34:
      c += e;
      c += a[2] == undefined || a[2] == ""
        ? ""
        : "&compid=" + a[2];
      break;
    case 35:
      c += e;
      c += a[2] == undefined || a[2] == ""
        ? ""
        : "&cpid=" + a[2];
      j = $("#cpn")[0];
      break;
    case 36:
      c = "api/?op=" + b;
      c += a[1] == undefined || a[1] == ""
        ? ""
        : "&qda=" + a[1];
      c += a[2] == undefined || a[2] == ""
        ? ""
        : "&qdts=" + a[2];
      break;
    case 37:
      var o = $(".Total span").first().text();
      if ($("ul.betReceipt").length > 0)o = $("ul.betReceipt").attr("data-ub");
      c = "api/?op=" + b + "&bal=" + o
  }
  if (c.length > 0) {
    if (!t && (b == 0 || b == 4 || b == 11 || b == 13 || b == 14 || b == 24 || b == 26 || b == 27 || b == 34)) {
      this._url = c;
      this._opId = b;
      this._args = a
    }
    if (this._isHistory === true &&
      (b == 0 || b == 4 || b == 7 || b == 11 || b == 13 || b == 14 || b == 16 || b == 17 || b == 21 || b == 24 || b == 26 || b == 27 || b == 34)) {
      this._isAdding = true;
      var r = c;
      if (f && f != "") {
        g = f.indexOf("#");
        if (g > -1 && f != "#") {
          var p = f.substring(g + 2);
          if (p)r = p
        }
      }
      this.setHistory(r);
      this._isAdding = false
    }
    c += (this._wgCookie.length > 0
      ? "&wg=" + this._wgCookie
      : "") + "&cf=" + this._cfCookie + "&lng=" + this._lngCookie + this.getCountryQS(b, u, this._ctyCookie, this._cstCookie, this._cgCookie) + "&tzi=" +
      this._tzCookie + "&oty=" + this._oddsCookie + (m
      ? "&lhs=y"
      : "");
    if (b == 0 || b == 4 || b == 6 || b == 7 || b == 11 || b == 13 || b == 14 || b == 21 || b == 22 || b == 26 || b == 27 || b == 30 || b == 31 || b == 34 ||
      b == 35)c += "&hd=" + this._hdCookie;
    if (this._isAutoRefresh)this.showAutoRefreshSpinner();
    else if (b != 5 && b != 9 && b != 31 && b != 29 && b != 22 && b != 32 && b != 33 && b != 37) {
      var q = $get("txtLOLFFlag");
      if (q && q.value.toUpperCase() != "P")this.handlePleaseWait(j);
      else lgh.clearLoginStatusFlag()
    }
    if (!this._isAutoRefresh)mf._userAct = 1;
    var s = {autoRefresh: this._isAutoRefresh, manualRefresh: this._isManualRefresh};
    a.push(s);
    (new b365.Ui.AutoRefreshController).disableRF();
    l = new b365AJAX(c, Function.createDelegate(this, this.reqComplete), Function.createDelegate(this, this.reqError), 3e4,
      Function.createDelegate(this, this.reqTimeout), false, this._ajaxInstId, a);
    l.Load()
  }
  return l
}, reqComplete: function (d, l) {
  var b = l[7], a, i, f, c = parseInt(b[0], 10);
  switch (c) {
    case 0:
    case 7:
    case 13:
    case 14:
    case 26:
    case 27:
    case 30:
    case 34:
      this.processContent(d, function (e) {
        var f = b[2] && b[2] != ""
          ? new CouponKey(b[2])
          : new CouponKey("");
        if (c === 14 && ipoc.isInOverview() && f.inplay == b365.Data.COUPON_KEY_OVERVIEW_MODE) {
          d = ipoc.processMarkup(d, b[1], mf._isAutoRefresh);
          $("#ref-cnt")[0].innerHTML = d
        }
        else mfPC.processMarkup(e, c);
        !this._isAutoRefresh && this.scrollToHdr();
        var a = $get("headingControl");
        a != null && a.focus();
        if (b[1] == lhs.HOME_CID || b[1].toString().indexOf("home") > -1)lhs.setSelectedByCId(lhs.HOME_CID);
        else this.addChdrHandlers();
        _tabletEventAdapter.VideoStreamingController.initialise()
      });
      c == 7 && lgh.disableCenterPodArea();
      if (c == 14) {
        var m = new CouponKey(b[2]);
        if (this.isMatchLive(m.classification) === false && !this._isAutoRefresh) {
          $("#audiooCnt").children().remove();
          $("#embdStrmIP").children().remove();
          $("#mLiveCnt").children().remove();
          $("#holdingCnt,#preMHoldingCnt").hide()
        }
        cp.RefreshLiveStream()
      }
      break;
    case 1:
    case 8:
    case 2:
      var h = c == 2
        ? "lv3"
        : "lv1";
      a = $get(h + b[5]);
      var e = $get(h + "cn" + b[5]);
      if (e == null) {
        e = document.createElement("div");
        e.setAttribute("id", h + "cn" + b[5]);
        e.className = h + "Cn";
        a.parentNode.insertBefore(e, a.nextSibling)
      }
      e.innerHTML = d;
      break;
    case 4:
    case 11:
      var j = 0;
      if (b[2]) {
        f = b[2].split("-");
        if (f[11])j = f[11]
      }
      this.processContent(d, function (a) {
        mfPC.processMarkup(a, c)
      });
      this.setLHSMenuSelected(c, b[1], j);
      this.addChdrHandlers();
      c == 4 && !this._isAutoRefresh && this.scrollToHdr();
      (b[1].toString().indexOf("in-play") >= 0 || typeof f !== "undefined" && f.length > 7 && f[7] == "4") && cp.RefreshLiveStream();
      (new b365.Ui.Coupon.HorseRacingInfoRefresher).refresh(storage);
      break;
    case 9:
    case 25:
      if (b[3] != "") {
        a = $get(b[3]);
        a && this.processContent(d, function (c) {
          if (ipoc.isInOverview())c = ipoc.processMarkup(c, b[1], mf._isAutoRefresh);
          $(a).empty();
          a.innerHTML = c;
          (new b365.Ui.Coupon.HorseRacingInfoRefresher).refresh(storage);
          cp.onLoad(a, b[2], false, mf._isAutoRefresh);
          mf.processOpenClose($get("cpn"), cp, false)
        })
      }
      else {
        a = $get(b[2]);
        a && this.processContent(d, function (b) {
          cp.ProcessPartialResponse(a, b);
          (new b365.Ui.Coupon.HorseRacingInfoRefresher).refresh(storage)
        })
      }
      c == 9 && cp.RefreshLiveStream();
      break;
    case 35:
      a = $("#cpn")[0];
      if (a) {
        $removeVolatileHandlers(a.id);
        a.innerHTML = d;
        cp.onLoad(a, b[2]);
        mf.processOpenClose($get("cpn"), cp)
      }
      c == 9 && cp.RefreshLiveStream();
      break;
    case 10:
      this.processContent(d, function (a) {
        $("#lotnav .inr").html(a)
      });
      if (lotto)lotto.onUpdateComplete("lotnav");
      break;
    case 15:
      $displayHelper.setCollapseLHS(false);
      a = $get("hsHL");
      a && this.processContent(d, function (b) {
        $removeVolatileHandlers("hsHL");
        a.innerHTML = b;
        hs.setupTabHandlers();
        cp.setupHandlers("hsHL");
        cp.onLoad(undefined, undefined, false, mf._isAutoRefresh)
      });
      $displayHelper.setCollapseLHS(true);
      break;
    case 12:
      rhs.updatePartialItem(b[1], d);
      break;
    case 5:
      this._userBalance = d;
      this._isAutoRefresh = true;
      break;
    case 18:
      i = b[2];
      a = $get(i);
      cp.processOthersOnRequestAjaxResponse(a, d);
      break;
    case 19:
      i = b[1];
      a = $get("rlsCtn");
      if (a)a.innerHTML = d;
      break;
    case 21:
      mfPC.processMarkup(d, c);
      this.setSelectedLHSMenuItem(0, 2);
      break;
    case 22:
      if (b[3] == undefined || b[3] == "") {
        var k = $get("hsCnt");
        a = $get("splCnt", k);
        k && a && this.processContent(d, function (b) {
          if (this._PreviousOperatorId == c && this._PreviousContent == b)return;
          this._PreviousOperatorId = c;
          this._PreviousContent = b;
          a.innerHTML = b;
          mf.processOpenClose(a, sp, false)
        })
      }
      else {
        f = b[3].split("-");
        if (f[21] == 2) {
          a = $get("hsBB");
          a && this.processContent(d, function (b) {
            a.innerHTML = b
          })
        }
      }
      break;
    case 20:
    case 23:
      a = $get("dlgFN");
      this.processContent(d, function (b) {
        a.innerHTML = b
      });
      break;
    case 24:
      this.processContent(d, function (a) {
        mfPC.setMainContent(a, c, true)
      });
      break;
    case 99:
      if (b[b.length - 1] == 15) {
        a = $get("hsHL");
        if (a) {
          a = $get("cpn", a);
          a.innerHTML = d
        }
        else mfPC.setMainContent(d, c)
      }
      else mfPC.setMainContent(d, c);
      break;
    case 29:
      this.processContent(d, function (a) {
        $(document).trigger("streamingcontentloaded", [b, a]);
        lhs.getCurrentMode() == "INPLAY" && this.rhsContentChanged()
      });
      break;
    case 31:
      var h = "#ph-" + b[2], a = $(h);
      if (a.length > 0)if (d.length > 0) {
        $removeVolatileHandlers("hsCnt");
        var e = document.createElement("DIV");
        e.innerHTML = d;
        a[0].parentNode.replaceChild(e.firstChild, a[0]);
        hs.setupHandlers()
      }
      else a[0].parentNode.removeChild(a[0]);
      break;
    case 32:
      var g = [];
      g[0] = "sk";
      g[1] = b[1];
      g[2] = b[2];
      g[3] = b[3];
      (new b365.Ui.AudioStreamingPlayerController).startAudio(d, g);
      break;
    case 33:
      (new b365.Ui.AudioStreamingResponseHandler).setInplayData(document.event, d);
      break;
    case 36:
      this.processContent(d, function (a) {
        b[1] === "0" && $("#bsDlg").html(a)
      });
      break;
    case 37:
      this.updateBalanceWithGaming(d)
  }
  (c == 30 || c == 31 || c == 99) && this.resetPwsPersist();
  if (!(c == 5 || c == 24)) {
    this._isAutoRefresh && this.hideAutoRefreshSpinner();
    this.hidePws()
  }
  this.reqCompleted(l);
  lgh.clearLoginStatusFlag();
  if (cmsg && (c === 0 || c === 4 || c === 7 || c === 11 || c === 13 || c === 14 || c === 21))!this._isAutoRefresh && cmsg.showWindow();
  delete this._bet635AJAX;
  this._b365AJAX = null;
  this._isAutoRefresh = false;
  this._isManualRefresh = false;
  ipoc.isInOverview() && (c === 4 || c === 14) && $("#MiddleScroller").scrollTop(0)
}, reqStarted: function (c, b) {
  var a = $deepCopy(b);
  setTimeout(function () {
    $("#sbMCN").trigger("reqstarted", [c, a])
  }, 0)
}, reqCompleted: function (a) {
  setTimeout(function () {
    $("#sbMCN").trigger("reqcompleted", [a])
  }, 0)
}, rhsContentChanged: function (a) {
  $raiseEvent($get("RHSWrapper"), "contentChanged", a)
}, updateBalanceWithGaming: function (b) {
  var a = $(".Total span").first();
  a.text(b)
}, affiliateRedirect: function () {
  var a = window.location.href, b = a.indexOf("afc=");
  if (b > -1) {
    a = a.substring(0, b - 3);
    a = a.replace("default.aspx", "").replace("?", "#!").replace(/&/ig, ";");
    window.location.href = a
  }
}, getCountryQS: function (g, j, n, h, i) {
  var a = $("#fm").val().length > 0
    ? parseInt($("#fm").val())
    : 1, m = g == 0 && (j.toString().indexOf("#!home") > -1 || j == lhs.HOME_CID), b = a == 0 || g == 31 || m, f = n, e = (b || a == 2) && h.length > 0
    ? h
    : "", l = (b || a == 4) && i.length > 0
    ? i
    : "", k = (f.length > 0
    ? "&cty=" + f
    : "") + (e.length > 0
    ? "&cst=" + e
    : "") + (l.length > 0
    ? "&cg=" + l
    : "") + ("&fm=" + a);
  if (b && g == 31) {
    var d = $("#octy").val(), c = $("#ocst").val();
    k += d.length > 0 && f != d || c.length > 0 && e != c
      ? "&octy=" + d + "&ocst=" + c
      : ""
  }
  return k
}, hidePws: function () {
  if (this._pws && mf._persistPws == false) {
    this._pws.hide();
    this._pws = null
  }
}, resetPwsPersist: function () {
  mf._persistPws = false
}, hideAutoRefreshSpinner: function () {
  var a = $get("req.6");
  if (a) {
    $remCls(a, "arf");
    $swpCls($firstChild($firstChild(a, "DIV"), "DIV"), "arf", "rf")
  }
}, reqTimeout: function (a) {
  this.resetPwsPersist();
  this.displayError(tabletML.timeout, a);
  this.clearEmbddedStrm($("#embdStrm")[0], false);
  this.clearEmbddedStrm($("#embdStrmIP")[0], true);
  setInterval("window.location.reload();", mf._TIMEOUT_RECOVER_DELAY)
}, reqError: function (c, b, a) {
  lgh.clearLoginStatusFlag();
  this.resetPwsPersist();
  this.clearEmbddedStrm($("#embdStrm")[0], false);
  this.clearEmbddedStrm($("#embdStrmIP")[0], true);
  this.displayError(tabletML.closedorsuspended, a)
}, processOpenClose: function (a, c, b) {
  if (!a)this.clearOpenCloseElementArray();
  else if (this._isAutoRefresh || this._isManualRefresh)this.setOpenClosedFromArray(a, c, b);
  else this.createOpenCloseElementArray(a)
}, createOpenCloseElementArray: function (b) {
  if (b) {
    this.clearOpenCloseElementArray();
    var a = $getElementsByClassName("expItem", b, "DIV");
    for (i = 0; i < a.length; i++)this.addElementToOpenCloseArray(a[i]);
    a = $getElementsByClassName("expItem", b, "A");
    for (i = 0; i < a.length; i++)this.addElementToOpenCloseArray(a[i])
  }
}, clearOpenCloseElementArray: function () {
  this._nodes.length = 0;
  this._nodesDic = []
}, updateOpenCloseStatus: function (a) {
  if (this._nodesDic[a.id])this._nodesDic[a.id].state = this.getCurrentOpenCloseState(a)
}, setOpenClosedFromArray: function (e, d, c) {
  var a = $getElementsByClassName("expItem", e);
  for (i = 0; i < a.length; i++) {
    var b = this._nodesDic[a[i].id];
    if (b)if (this.getCurrentOpenCloseState(a[i]) == this._SUSPEND_STATUS || b.state == this._SUSPEND_STATUS)this.updateOpenCloseStatus(a[i]);
    else if (b.state == this._OPEN_STATUS)d.openSection(a[i], c);
    else b.state == this._CLOSE_STATUS && d.closeSection(a[i], c);
    else this.addElementToOpenCloseArray(a[i])
  }
}, getCurrentOpenCloseState: function (a) {
  return $hasCls(a, "suspend")
    ? this._SUSPEND_STATUS
    : $hasCls(a, "open")
    ? this._OPEN_STATUS
    : this._CLOSE_STATUS
}, addElementToOpenCloseArray: function (a) {
  var c = this.getCurrentOpenCloseState(a), b = new expNode(a.id, c);
  this._nodesDic[a.id] = b;
  this._nodes[this._nodes.length] = b
}, processContent: function (a, d) {
  var c = [
    {tp: "redirect", rx1: /<!--Redirect\s(.*?)=(.*?)-->/g, rx2: /<!--Redirect\s(.*?)-->/, fn: this.redirect, ai: [1]},
    {tp: "asv", rx1: /<!--AssignJsVar\s(.*?)=(.*?)-->/g, rx2: /<!--AssignJsVar\s(.*?)=(.*?)-->/, fn: $setGlobal, ai: [1, 2]},
    {tp: "ccp", rx1: /<!--SetCachePolicy\((.*?)\)-->/g, rx2: /<!--SetCachePolicy\((.*?)\)-->/, fn: $setCachePolicy, ai: [1]},
    {tp: "css", rx1: /<!--CssRef=(.*?)-->/g, rx2: /<!--CssRef=(.*?)-->/, fn: $loadCSS, ai: [1]},
    {tp: "js", rx1: /<!--ScriptRef\s(.*?)=(.*?)-->/g, rx2: /<!--ScriptRef\s(.*?)=(.*?)-->/, fn: $loadScript, ai: [1, 2]},
    {tp: "title", rx1: /<!--SetPageTitle\s(.*?)-->/g, rx2: /<!--SetPageTitle\s(.*?)-->/, fn: $setTitleText, ai: [1]},
    {tp: "gcid", rx1: /<!--SetSelectedLHSMenu\s(.*?) (.*?) (.*?)-->/g, rx2: /<!--SetSelectedLHSMenu\s(.*?) (.*?) (.*?)-->/, fn: this.setSelectedLHSMenuItem, ai:
      [1, 2, 3]},
    {tp: "cntldr", rx1: /<!--ContentReq\s(.*?) (.*?) (.*?)-->/g, rx2: /<!--ContentReq\s(.*?) (.*?) (.*?)-->/, fn: this.setUpMainReq, ai: [1, 2, 3]},
    {tp: "rhsldr", rx1: /<!--RHSReq\s(.*?) (.*?)-->/g, rx2: /<!--RHSReq\s(.*?) (.*?)-->/, fn: this.setUpRHSReq, ai: [1, 2]}
  ], e = this.removeDirectives(c, a), b = this;
  b.processDirectives("redirect", c, a, function () {
    b.processDirectives("css", c, a, function () {
      b.processDirectives("asv", c, a, function () {
        b.processDirectives("ccp", c, a, function () {
          d && d.apply(b, [e]);
          b.processDirectives("js", c, a, function () {
            b.processDirectives("title", c, a, function () {
              b.processDirectives("gcid", c, a, function () {
                b.processDirectives("cntldr", c, a, function () {
                  b.processDirectives("rhsldr", c, a, function () {
                    b.processDirectives("streaming", c, a, null)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}, removeDirectives: function (c, e) {
  var b = e, a = 0;
  for (a; a < c.length; a++) {
    var d = b.match(c[a].rx1);
    if (d && d.length > 0)b = b.replace(c[a].rx1, "")
  }
  return b
}, processDirectives: function (n, b, m, k) {
  var c = [], d = null, a = 0;
  for (a; a < b.length; a++) {
    if (b[a].tp == n) {
      var h = m.match(b[a].rx1);
      if (h && h.length > 0) {
        var g = 0;
        for (g; g < h.length; g++) {
          var j = h[g].match(b[a].rx2);
          if (j && j.length > b[a].ai.length) {
            var l = [], i = 0;
            for (i; i < b[a].ai.length; i++)l.push(j[b[a].ai[i]]);
            c.push({fn: b[a].fn, p: l})
          }
        }
      }
    }
    if (c && c.length > 0) {
      var f = k, e = c.length - 1;
      for (e; e >= 0; e--) {
        c[e].p.push(f);
        f = function (a) {
          return function () {
            c[a].fn.apply(null, c[a].p)
          }
        }(e)
      }
    }
  }
  if (f)d = f;
  if (!d)d = k;
  d && d.apply(null)
}, scrollToHdr: function () {
  window.scrollTo(0, 0)
}, addChdrHandlers: function () {
  var d = "sbMCN", c = $get("Act", $get("cntHdr"));
  if (c) {
    var b = c.getElementsByTagName("a"), a = 0;
    for (a; a < b.length; a++)$addHandler(b[a], "click", Function.createDelegate(this, this.ontapi), false, true, d)
  }
}, setHistory: function (a) {
  var b = a.indexOf("?");
  a = a.substring(b + 1);
  a = a.replace("#!", "");
  var c = a.replace(/&/ig, ";");
  Sys.Application.addHistoryPoint("!" + c, "Sports")
}, restoreHistory: function (c, a) {
  if (this._isAdding === false) {
    var b = a.get_state();
    this.restoreHistorypoint(b);
    this._isHistory = true
  }
}, restoreHistorypoint: function (a) {
  if (typeof a != "undefined" && a.length > 0) {
    a = unescape(a);
    var b = this.extractKeyValue(a, "op"), c = this.extractKeyValue(a, "cid"), o = this.extractKeyValue(a, "spid"), d = this.extractKeyValue(a,
      "cpid"), h = this.extractKeyValue(a, "compid"), n = this.extractKeyValue(a, "hk"), k = this.extractKeyValue(a, "hrs"), l = this.extractKeyValue(a,
      "oty"), p = this.extractKeyValue(a, "key"), m = this.extractKeyValue(a, "res"), i = this.extractKeyValue(a, "chn"), j = this.extractKeyValue(a,
      "day"), g = $bSys.getValueFromCookie("aps03", "oty", "");
    this._isHistory = false;
    if (l != g)this._isHistory = true;
    if (a.indexOf("op") > -1)switch (b) {
      case"0":
      case"7":
        this.req(parseInt(b), c, n);
        break;
      case"13":
        this.req(parseInt(b), c, j, i);
        break;
      case"26":
      case"27":
        this.req(parseInt(b), c, d);
        break;
      case"34":
        this.req(parseInt(b), c, h);
        break;
      case"14":
        this.req(parseInt(b), c, d);
        break;
      case"4":
      case"11":
        this.req(parseInt(b), c, d, m
          ? "RES"
          : "");
        this.setLHSMenuSelected(b, c, 0);
        break;
      case"21":
        this.req(parseInt(b), k, this.extractKeyValue(a, "byp") == "s"
          ? "byp"
          : "");
        break;
      case"24":
        this.req(parseInt(b), c, d);
        break;
      default:
        lhs.callItemClickHome();
        lhs.setSelected()
    }
    else if (a.indexOf("!") > -1) {
      if (a.indexOf("#") == -1)a = "#" + a;
      var f = a, e = f.match(".(/)+.");
      if (e != null && e != undefined && e.length > 0)this.req(4, a, "href=" + a);
      else this.req(0, a, "href=" + a)
    }
  }
  else {
    lhs.callItemClickHome();
    lhs.setSelected()
  }
}, setLHSMenuSelected: function (c, a, b) {
  if (c == 4)if (a == lhs.PARLAY_CID || a == lhs.TEASER_CID)lhs.setSelected($getParIDTag("pt" + a, $get(lhs.LHR_CONTAINER_ID), "a"));
  else b == lhs.OOC_TEMPLATEID && lhs.setSelected($getParIDTag("oc", $get(lhs.LHR_CONTAINER_ID), "a"))
}, extractKeyValue: function (e, d) {
  var c = e.indexOf(d + "="), a = "";
  if (c != -1) {
    a = e.substring(c + d.length + 1);
    var b = a.indexOf(";");
    if (b != -1)a = a.substring(0, b)
  }
  return a
}, redirect: function (d) {
  var a = d.split(";"), b = "";
  for (i = 0; i < a.length; i++)if (a[i].trim() != "") {
    var c = a[i].split(",");
    b = mf.generateHashFragment(b, c[0].trim(), c[1].trim())
  }
  window.location.hash = b
}, generateHashFragment: function (a, c, b) {
  a += c + "=" + b + ";";
  return a
}, setUpMainReq: function (d, c, b, a) {
  mf._persistPws = true;
  mf.req(parseInt(d), parseInt(c), b);
  a && a()
}, setUpRHSReq: function (c, b, a) {
  rhs.req(parseInt(c), b);
  a && a()
}, displayError: function (b, a) {
  if (a == this._ajaxInstId) {
    this.hidePws();
    mfPC.setMainContent(this.formatError(b), null);
    this._b365AJAX = null;
    this.scrollToHdr()
  }
}, formatError: function (a) {
  return"<div id='eDiv'><p>" + a + "</p></div>"
}, footerClick: function (a) {
  mf._userAct = 1;
  trk && trk.send(a, EnumRegionID.Footer, -1, EnumEventsOrPageTypes.Click, EnumPodID.Footer);
  this.ontapi(a)
}, ontapi: function (b) {
  var a = b.target;
  while (a.tagName != "A" && a != null) {
    a = a.parentNode;
    if (a == null)return false
  }
  a && a.id != "" && this.idtapi(a.id, b);
  return true
}, idtapi: function (c, b) {
  var a = c.split(".");
  if (!a[0] || !a[1])return false;
  if (a[0] == "req") {
    this.req(parseInt(a[1]));
    window.scroll(0, 0);
    if (b)b.preventDefault();
    else event.preventDefault()
  }
  else if (a[0] == "prdid")this.productTapi(parseInt(a[1]));
  else this.tapi(a[0], a[1], a[2], a.length == 4
      ? a[3]
      : "");
  return false
}, productTapi: function (a) {
  if (a != 10) {
    trk && trk.send(null, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Click, EnumPodID.TopLauncher, trk.getProductFieldID(a));
    var b = this._tapiLink + "prdid=" + a;
    window.open(b, "_self")
  }
}, tapi: function (a, c, d, b) {
  if (!b)b = "";
  (a.toLowerCase() == "slxt" || a.toLowerCase() == "svsxt" || a.toLowerCase() == "rxil" || a.toLowerCase() == "rxmd" || a.toLowerCase() == "mem" ||
    a.toLowerCase() == "slmem") && lgh.startLoginMonitor();
  mf._userAct = 1;
  trk && trk.send(null, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Pupup, EnumPodID.TopLauncher, trk.getTAPIFieldID(c))
}, showIframeOverlay: function (b, d, c) {
  var a = new b365.Ui.iframeOverlay;
  a.show(b, d, c)
}, setSelectedLHSMenuItem: function (b, a, f, e) {
  if (b == 26 || b == 27)lhs.setSelected($get("se" + a));
  else if (b == 13) {
    var c = $get(13 + "#" + lhs.INPLAY_CID);
    lhs.setSelected(c, lhs.INPLAY_CID)
  }
  else if (b == 34) {
    var c = $get("mv" + a);
    lhs.setSelected(c)
  }
  else if ($get("ma" + a)) {
    lhs.setSelectedByCId(a);
    mf.synchGlobalMenuItemHref(a, f)
  }
  else if (lhs.getCurrentMode() == "INPLAY") {
    var d = mf.extractKeyValue(window.location.hash, "cpid");
    c = d != ""
      ? $get(14 + "#" + lhs.INPLAY_CID + "#" + d)
      : $firstChild($("#sbLMN")[0], "A", "ipItem");
    lhs.setSelected(c, lhs.INPLAY_CID)
  }
  e && e()
}, synchGlobalMenuItemHref: function (a, b) {
  lhs.setItemHref(a, b)
}, getBaseHref: function () {
  if (window.location.href.match(/[\S]*\/lite/i))if (window.location.href.match(/[\S]*\/lite/i).length > 0)return window.location.href.match(/[\S]*\/lite/i)[0];
  return""
}, addHrseSrchHandlers: function () {
  $("#txtHs").bind("blur", function () {
    $(this).val() == "" && $(this).val($(this).attr("data-watermark"))
  });
  $("#txtHs").bind("focus", function () {
    $(this).val() == $(this).attr("data-watermark") && $(this).val("")
  })
}, readHistoryCookie: function () {
  var a = $bSys.getValueFromCookie("history", "hash", "");
  if (a == "") {
    var g = $bSys.getValueFromCookie("history", "op", ""), h = $bSys.getValueFromCookie("history", "cid", ""), c = $bSys.getValueFromCookie("history", "spid",
      ""), b = $bSys.getValueFromCookie("history", "cpid", ""), e = $bSys.getValueFromCookie("history", "hrs", ""), d = $bSys.getValueFromCookie("history",
      "byp", ""), f = $bSys.getValueFromCookie("history", "res", "");
    if (g != "")a = "!op=" + g + ";cid=" + h + (b != ""
      ? ";cpid=" + b
      : "") + (c != ""
      ? ";spid=" + c
      : "") + (e != ""
      ? ";hrs=" + e
      : "") + (d != ""
      ? ";byp=" + d
      : "") + (f != ""
      ? ";res=" + f
      : "")
  }
  return a
}, clearHistoryCookie: function () {
  var a = ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
  $bSys.setValueInCookie("history", "", "" + a, false)
}, storeHashIntoHistoryCookie: function () {
  var a = window.location.hash;
  if (a.indexOf("op") > -1) {
    a = unescape(a);
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "op", this.extractKeyValue(a, "op"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "cid", this.extractKeyValue(a, "cid"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "spid", this.extractKeyValue(a, "spid"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "cpid", this.extractKeyValue(a, "cpid"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "hrs", this.extractKeyValue(a, "hrs"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "byp", this.extractKeyValue(a, "byp"));
    $bSys.setValueInCookieOnlyIfNotEmpty("history", "res", this.extractKeyValue(a, "res"))
  }
  else $bSys.setValueInCookieOnlyIfNotEmpty("history", "hash", window.location.hash)
}, showDepWarn: function () {
  lgh.isAuthenticated() && dwmsg && dwmsg.showWindow()
}, addOnLottoLoaded: function (a) {
  this._events.addHandler("onlottoloaded", a)
}, onLottoLoaded: function () {
  var a = this._events.getHandler("onlottoloaded");
  a && a(this)
}, onLiveStreamClick: function () {
  if (parseInt(arguments[4])) {
    mf.req(arguments[4], arguments[1], arguments[2], arguments[3]);
    return false
  }
  return false
}, clearEmbddedStrm: function (a, b) {
  if (a) {
    $(a).empty();
    $(a).hide();
    $("#streamingWpr").hide();
    $("#embdStrmHdr").hide();
    $("#preMLiveCnt").hide();
    $("#preMHoldingCnt").hide();
    b && this.rhsContentChanged();
    _tabletEventAdapter.VideoStreamingController.dispose()
  }
}, disconnectMatchLive: function () {
  if (typeof MatchLiveGlobal != "undefined")MatchLiveGlobal.onPageLoadClearMatchLive(true)
}, isMatchLive: function (c) {
  var b = mlSport, a = false;
  jQuery.each(b, function (d, b) {
    if (b.id == c) {
      a = true;
      return false
    }
  });
  return a
}};
var gopts = new b365.Ui.ApplicationOptions, mf = new b365.Ui.MainForm, cmsg, dwmsg, trk;
Sys.Application.add_init(Function.createDelegate(mf, mf.pageInit));
Sys.Application.add_load(Function.createDelegate(mf, mf.pageLoad));
Sys.Application.add_unload(Function.createDelegate(mf, mf.pageUnload));
function expNode(b, a) {
  this.id = b;
  this.state = a
};
b365.Ui.LoginHandler = function () {
  this._dlg = null;
  this._mtrlgn = false;
  this._loggedInUser = null;
  this._snCtr = 30;
  this._QD_CTL = "#txtQDFlag";
  this._EMSG_CTL = "#txtEMsgFlag";
  this._lastLoginTimerStarted = 0
};
b365.Ui.LoginHandler.prototype = {pageLoad: function () {
  $("#lnkGo").on("click", this.login);
  $("#lnkLO").on("click", this.logout);
  $("#UName").on("blur", function () {
    $(this).val() === "" && $(this).val($(this).attr("data-watermark"))
  });
  $("#UName").on("focus", function () {
    $(this).val() === $(this).attr("data-watermark") && $(this).val("")
  });
  $("#UName").on("keydown", this.doLoginKeypress);
  $("#PWord").on("keydown", this.doLoginKeypress);
  $("#PWord").on("blur", function () {
    if ($("#PWord").val() === "") {
      $("#PWord").get(0).type = "text";
      $("#PWord").val($("#PWord").attr("data-watermark"))
    }
  });
  $("#PWord").on("focus", function () {
    if ($(this).val() === $(this).attr("data-watermark")) {
      $(this).get(0).type = "password";
      $(this).val("")
    }
  });
  typeof mf != "undefined" && mf && mf.showDepWarn(null);
  this.loginFailure();
  this.startSessionMonitor();
  this.clearLastLogin()
}, doLoginKeypress: function () {
  event.which == 13 && (event.currentTarget.id == "UName" || event.currentTarget.id == "PWord") && lgh.login(event)
}, login: function (b) {
  b.preventDefault();
  mf.storeHashIntoHistoryCookie();
  $("#txtUserName").val($("#UName").val());
  $("#txtPassword").val($("#PWord").val());
  var a = "https://" + window.location.hostname + "/members/lp/default.aspx";
  trk && trk.send(EnumRegionID.Header, -1, EnumEventsOrPageTypes.Authentication, EnumPodID.WebsiteHeader, EnumFieldID.Go);
  document.sb.action = a.replace("www", "members");
  document.sb.submit()
}, logout: function (a) {
  a.preventDefault();
  trk && trk.send(a, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Authentication, EnumPodID.WebsiteHeader, EnumFieldID.Logout);
  $("#txtLOLFFlag").length > 0 && $("#txtLOLFFlag").val("LO");
  lgh.setMessageFlag($(lgh._QD_CTL), "0");
  lgh.setMessageFlag($(lgh._EMSG_CTL), "0");
  mf.storeHashIntoHistoryCookie();
  document.sb.action = "LoginResult.aspx";
  document.sb.submit()
}, loginFailure: function () {
  if ($("#txtLOLFFlag").length > 0 && $("#txtLOLFFlag").val().toUpperCase() == "LF") {
    mf._lgnFailed = 1;
    $("#txtLOLFFlag").val("P")
  }
}, clearLoginStatusFlag: function () {
  $("#txtLOLFFlag").length > 0 && $("#txtLOLFFlag").val("")
}, disableCenterPodArea: function () {
  var a = $("#txtLOLFFlag");
  if ($("#txtLOLFFlag").length > 0 && $("#txtLOLFFlag").val() == "P") {
    $("#txtLOLFFlag").val("");
    $bSys.disableGroup($("#sbMCN"))
  }
}, showLoginPrompt: function () {
  lgh.showLoginDialog($("#lgnFail"))
}, showLoginDialog: function (a) {
  this._dlg = new b365.Ui.PUpDialog(null, a, true);
  this._dlg.showDialog()
}, hideDialog: function () {
  this._dlg.hideDialog()
}, isAuthenticated: function (a) {
  if ($("#MyAccountPanel").length == 0) {
    a && $("#sbMCN").trigger("showloginprompt");
    return false
  }
  return true
}, checkLoggedInState: function () {
  if (Number($bSys.getValueFromCookie("session", "p")) === 1) {
    $bSys.setValueInCookie("session", "p", "0", false);
    window.location.href = window.location.protocol + "//" + window.location.hostname + "/lite/loginresult.aspx?rf=1"
  }
}, startLoginMonitor: function () {
  $bSys.setValueInCookie("session", "p", "0", false);
  this._mtrlgn = true;
  this.loginMonitor()
}, loginMonitor: function () {
  if (this._mtrlgn && Number($bSys.getValueFromCookie("session", "p")) === 1) {
    $bSys.setValueInCookie("session", "p", "0", false);
    this._mtrlgn = false;
    window.location.href = window.location.protocol + "//" + window.location.hostname + "/lite/loginresult.aspx?rf=1"
  }
  else setTimeout("lgh.loginMonitor()", 1e3)
}, startSessionMonitor: function () {
  this.refreshUnAuthSession()
}, refreshUnAuthSession: function () {
  if (!this.isAuthenticated(false))if (this._snCtr > 0) {
    setTimeout("lgh.refreshUnAuthSession()", 6e4 + (this._snCtr === 1
      ? 1e4
      : 0));
    this._snCtr--
  }
  else window.location.reload()
}, checkMessageFlag: function (a) {
  return a && a.val() == "0"
}, setMessageFlag: function (a, b) {
  a && a.val(b)
}, addOnShowLoginPrompt: function (a) {
  $(window).on("showloginprompt", a)
}, clearLastLogin: function () {
  var a = $("#llt");
  if (a.length > 0 && a[0].innerHTML.trim().length > 0 && this._lastLoginTimerStarted == 0) {
    setTimeout("lgh.clearLastLogin()", 6e4);
    this._lastLoginTimerStarted = 1
  }
  else {
    if (a.length > 0)a[0].innerHTML = "";
    this._lastLoginTimerStarted = 0
  }
}};
var lgh = new b365.Ui.LoginHandler;
Sys.Application.add_load(Function.createDelegate(lgh, lgh.pageLoad));
b365.Ui.TitleBar = function () {
};
b365.Ui.TitleBar.prototype = {pageLoad: function () {
  var a = this;
  $("#languageDropdown, #oddsPopup, #smap-s1, #smap-s2, #aud-premat-dd").on("click", function (b) {
    a.onItemClick(b)
  })
}, onItemClick: function (b) {
  var a, g = null, c = false;
  if (b) {
    a = b.target;
    g = a;
    if (a.tagName != "A")a = a.parentNode
  }
  if (a) {
    if (a.id == "lnlnk" || a.id == "lngText") {
      var e = $get("idlangT");
      if (e.className.indexOf("hidden") > -1) {
        trk && trk.send(b, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteHeader, EnumFieldID.Language);
        $get("lngMnu").style.width = $get("lnlnk").offsetWidth - 3 + "px";
        this.showMenu(b, a, e)
      }
      else this.hideMenu(b, e);
      c = true
    }
    else if (a.id == "frlnk" || a.id == "odsText") {
      var d = $get("idOddsT");
      if (d.className.indexOf("hidden") > -1) {
        trk && trk.send(b, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteHeader, EnumFieldID.Odds);
        $get("odsMnu").style.width = $get("frlnk").offsetWidth - 3 + "px";
        this.showMenu(b, a, d)
      }
      else this.hideMenu(b, d);
      c = true
    }
    else if (a.id == "svclink") {
      var f = $get("idSvsT");
      if (f.className.indexOf("hidden") > -1)this.showMenu(b, a, f);
      else this.hideMenu(b, f);
      c = true
    }
    else if (a.id.startsWith("lng.") || a.id.startsWith("oty.")) {
      this.changeLangOddsType(b);
      c = true
    }
    else if ($(a).hasClass("as-nav-link") || $(g).hasClass("nav-item")) {
      if (!$(a).hasClass("as-nav-link"))a = $(g).children();
      (new b365.Ui.AudioStreamingMenu).tabClick(b, a);
      c = true
    }
    else if ($(a).hasClass("as-panel-link")) {
      (new b365.Ui.AudioStreamingMenu).streamingItemClick(b, a);
      c = true
    }
    else if ($(a).hasClass("as-morelink-title")) {
      (new b365.Ui.AudioStreamingMenu).moreItemClick(b);
      c = true
    }
    else if ($(a).hasClass("view-link"))return false;
    c && b.preventDefault()
  }
  return false
}, changeLangOddsType: function (a) {
  var g = a.target, h = window.location.href;
  if (g.className == "selected")return false;
  var b = g.id.split(".");
  if (!b[0] || !b[1])return;
  var f = $get("txtOddsTypeID"), e = $get("txtLanguageID"), i = window.location.hash;
  if (f != null)f.value = this._oddsCookie;
  if (e != null)e.value = this._lngCookie;
  switch (b[0]) {
    case"lng":
      $tglEle($get("lngMnu"));
      var c = "", d = "";
      d = b[1];
      c = mf.getBaseHref();
      trk && trk.send(a, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteHeader, EnumFieldID.Language);
      if (h.indexOf("#!") > -1)window.location.href = c + "/" + d + window.location.hash;
      else window.location.href = c + "/" + d + "/";
      a && a.preventDefault();
      break;
    case"oty":
      $tglEle($get("odsMnu"));
      $bSys.setValueInCookie("aps03", "oty", b[1], false);
      trk && trk.send(a, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteHeader, EnumFieldID.Odds);
      a && a.preventDefault();
      window.location.reload()
  }
}};
var tb = new b365.Ui.TitleBar;
Sys.Application.add_load(Function.createDelegate(tb, tb.pageLoad));
b365.Ui.ProductLink = function () {
};
b365.Ui.ProductLink.prototype = {pageLoad: function () {
  var a = this;
  $("#sbTMN-otr").on("click", function (b) {
    a.onItemClick(b)
  })
}, onItemClick: function (b) {
  var d = b.rawEvent, a = b.target;
  if (a.tagName == "SPAN")a = a.parentNode;
  if (a.id.startsWith("hm-lnk") || a.id.startsWith("logo365")) {
    b.preventDefault();
    var c = document.location.href;
    if (c.indexOf("#!") > -1)c = c.substring(0, c.indexOf("#!"));
    trk && trk.send(-1, EnumRegionID.Header, -1, EnumEventsOrPageTypes.Home, EnumPodID.WebsiteHeader, a.id.startsWith("hm-lnk")
      ? 1
      : a.id.startsWith("logo365")
      ? 2
      : -1);
    document.location.href = c
  }
  else if (a.id.startsWith("idSP")) {
    a.className = "selected";
    $get("idIP").className = "";
    mf._isAutoRefresh = false;
    mf.req(0, lhs.HOME_CID, "", "href=" + a.href);
    b.preventDefault();
    $(document).trigger("sportsselected")
  }
  else if (a.id.startsWith("idIP")) {
    a.className = "selected";
    $get("idSP").className = "";
    ipoc.req(14, lhs.INPLAY_CID, "", "href=" + a.href);
    b.preventDefault();
    $(document).trigger("inplayselected")
  }
  else if (a.id.startsWith("idF")) {
    b.preventDefault();
    window.location.hash = "!financials"
  }
  else if (a.id.startsWith("prdid")) {
    mf.idtapi(a.id, b);
    b.preventDefault()
  }
  $(document).trigger("lhshidelhspulloutmenu")
}, setSelectedByCId: function (a) {
  $addCls($get(a == lhs.INPLAY_CID
    ? "idIP"
    : "idSP"), "selected");
  $remCls($get(a == lhs.INPLAY_CID
    ? "idSP"
    : "idIP"), "selected")
}};
var plk = new b365.Ui.ProductLink;
Sys.Application.add_load(Function.createDelegate(plk, plk.pageLoad));
b365.Ui.lhsMenu = function () {
  this._events = new Sys.EventHandlerList;
  this.HOME_CID = 9999;
  this.INPLAY_CID = 9998;
  this.PARLAY_CID = 76;
  this.TEASER_CID = 77;
  this.LHR_CONTAINER_ID = "sbLMN";
  this.OOC_TEMPLATEID = 4888;
  this.XStart = 0;
  this.XEnd = 0;
  this.YStart = 0;
  this.YEnd = 0
};
b365.Ui.lhsMenu.prototype = {pageLoad: function () {
  var a = this;
  $(document).on("showlhsmenuasicon", function (a) {
    lhs.showLHSMenuAsIcons(a)
  });
  $(document).off("lhsshowlhspulloutmenu").on("lhsshowlhspulloutmenu", function (b) {
    a.showPulloutMenu(b)
  });
  $(document).off("lhshidelhspulloutmenu").on("lhshidelhspulloutmenu", function (b) {
    a.hideLHSPulloutMenu(b)
  });
  $("#sbLMN").off("click").on("click", function (b) {
    a.onItemClick(b)
  });
  $("#subMenu").off("click").on("click", function (b) {
    a.onItemClick(b)
  });
  lgh.checkLoggedInState();
  var b = mf.readHistoryCookie();
  if (b != "") {
    mf.restoreHistorypoint(b.replace("#", ""));
    mf.clearHistoryCookie()
  }
  else window.location.hash.length == 0 && window.location.search.length == 0 && this.callItemClickHome()
}, setSelectedByCId: function (a) {
  this.setSelected($get("ma" + a))
}, setSelected: function (a, b) {
  if (a) {
    $("#sbLMN a.selected").removeClass("selected");
    var d = $get("lhsC").value;
    if (d != "") {
      var c = $get(d);
      c.className = c.className.replace(/[\s]{0,1}selected/ig, "")
    }
    $(a).addClass("selected");
    $(a).hasClass("subMI") && this.configureSubMenuForItem(a);
    $get("lhsC").value = a.id;
    if (b)plk.setSelectedByCId(b);
    else plk.setSelectedByCId(a.id.replace("ma", ""))
  }
}, tglSubMenu: function (c, a) {
  var d = this;
  ($displayHelper.lhsMenuInTextMode() || !$displayHelper.isPrematch() && $displayHelper.isPortraitMode()) && $tglEle($getNES(a));
  var b = $(a).parent();
  if (b.hasClass("ddop")) {
    b.removeClass("ddop").addClass("ddcl");
    $(a).removeClass("open").addClass("close")
  }
  else {
    b.removeClass("ddcl").addClass("ddop");
    $(a).removeClass("close").addClass("open");
    b365.Ui.AutoRefreshController()
  }
  !$displayHelper.lhsMenuInTextMode() && $displayHelper.isPrematch() && d.showPulloutMenu(c, a);
  c.preventDefault();
  c.stopPropagation()
}, configureSubMenuForItem: function (a) {
  var b = $(a).parents("ul.subItems").parent().children("a.close, a.open"), c = $(a).parents("ul.subItems");
  if ($displayHelper.lhsMenuInTextMode()) {
    b.removeClass("selected");
    c.removeClass("close").addClass("open").removeClass("hidden")
  }
  else b.attr("data-menuitemid", "0").addClass("selected")
}, showPulloutMenu: function (n, a) {
  var m = this;
  if (!$(a).parent().hasClass("ddop") && !$(a).parent().hasClass("ddcl"))return false;
  if (!$displayHelper.lhsMenuInTextMode() && $displayHelper.isPortraitMode()) {
    if ($(a).get(0).id === $("#subMenu ul.subItems").attr("data-menuitemid")) {
      m.hideLHSPulloutMenu();
      return true
    }
    $("#subMenu")[0].innerHTML = "<div class='call-out-arrow'></div>" + $(a).next()[0].outerHTML;
    $("#subMenu").removeClass("hidden twocolumn threecolumn");
    $("#subMenu ul").removeClass("hidden");
    $("#subMenu .heading").removeClass("hidden");
    $("#subMenu ul.subItems").attr("data-menuitemid", $(a)[0].id);
    var f = 1, b = $("#subMenu li").length;
    if (b > 11 && b <= 21) {
      $("#subMenu").addClass("twocolumn");
      f = 2
    }
    if (b > 21) {
      $("#subMenu").addClass("threecolumn");
      f = 3
    }
    b--;
    var g = b % f;
    g = g == 0
      ? f
      : g;
    $("#subMenu li").slice(b + 1 - g).css("border-bottom", "none");
    var k = $(window).height(), h = $("#subMenu").outerHeight(true), c = $(a).outerHeight(true), d = $(a).offset().top - c, i = 15, e = 0, j = d + h + c >= k;
    if (j) {
      e = d - h + c / 2 + 20;
      i = h - c / 2 - 5
    }
    else {
      e = d;
      var l = $("#sbTMN-otr").outerHeight(true);
      if (d <= l)e = d + c
    }
    $("#subMenu").css({left: "58px", top: e + "px"});
    $("#subMenu .call-out-arrow").toggleClass(j
      ? ""
      : "top");
    $("#subMenu .call-out-arrow").css({top: i + "px"})
  }
  return true
}, hideLHSPulloutMenu: function () {
  $("#subMenu ul.subItems").attr("data-menuitemid", "0");
  $("#subMenu").addClass("hidden")
}, onItemClick: function (b, a) {
  var e = this._events.getHandler("onitemclick");
  e && e(b);
  if (!a)a = b.target;
  a.removeAttribute("trncPro");
  if (a.tagName.toUpperCase() == "SPAN")a = a.parentNode;
  if (a.tagName.toUpperCase() == "DIV")a = a.parentNode;
  if (a.tagName.toUpperCase() == "A")if (a.id.indexOf("mi") != -1 || $hasCls(a, "mitem"))this.tglSubMenu(b, a);
  else if (a.name.indexOf("pt") != -1 || a.name.indexOf("oc") != -1) {
    var g = a.name.indexOf("#");
    if (g > 0) {
      var d = a.name.split("#"), f = parseInt(d[2]), h = d[3];
      trk && trk.send(b, EnumRegionID.Left, f, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteNavigation);
      window.ptbs && window.ptbs.clearBets(false);
      mf._isAutoRefresh = false;
      mf.req(parseInt(d[1]), f, h, "href=" + a.href)
    }
  }
  else if ($(a).hasClass("ipItem") || $(a).hasClass("inphdr")) {
    var c = a.id.split("#");
    trk && trk.send(b, EnumRegionID.Left, parseInt(c[1]), EnumEventsOrPageTypes.Click, EnumPodID.WebsiteNavigation);
    mf._isAutoRefresh = false;
    mf.req(parseInt(c[0]), parseInt(c[1]), c[2], "href=" + a.href, 1);
    plk.setSelectedByCId(this.INPLAY_CID)
  }
  else if (a.id == "ma" + this.INPLAY_CID) {
    this.callItemClick(b, a);
    plk.setSelectedByCId(this.INPLAY_CID)
  }
  else if (a.id == "ma149" || a.id == "idFinancials")window.location.hash = "!financials";
  else if (a.id.substring(0, 2) == "se") {
    this.callItemClick(b, a);
    this.setSelected(a)
  }
  else this.callItemClick(b, a);
  $(a).hasClass("subMI") && $(a).parents("ul.subItems").addClass("subselected");
  b && b.preventDefault();
  return false
}, callItemClick: function (d, a) {
  var e = this;
  this.hideLHSPulloutMenu();
  if (a.id) {
    var b = a.id.slice(2), c = 0;
    if (b == lhs.INPLAY_CID) {
      ipoc.req(14, b, "href=" + a.href);
      return
    }
    else if (a.id.substring(0, 2) == "se")c = 26;
    else if (a.id.substring(0, 2) == "mv")c = 34;
    trk && trk.send(d, EnumRegionID.Left, b, EnumEventsOrPageTypes.Click, EnumPodID.WebsiteNavigation);
    mf.req(c, b, "href=" + a.href)
  }
}, callItemClickByCId: function (c, b) {
  var a = $get("ma" + b);
  if (a)this.onItemClick(c, a)
}, callItemClickHome: function (a) {
  var b = window.location.hash;
  if (b.length == 0 && mf._isHistory)mf._isHistory = false;
  if ($get("ma" + this.HOME_CID))this.callItemClickByCId(a, this.HOME_CID);
  else mf.req(0, this.HOME_CID);
  mf._isHistory = true
}, callExternalItemClickHome: function (a) {
  var b = window.location.hash;
  if (b.length == 0 && mf._isHistory)mf._isHistory = false;
  if ($get("ma" + lhs.HOME_CID))lhs.callItemClickByCId(a, lhs.HOME_CID);
  else mf.req(0, this.HOME_CID);
  mf._isHistory = true
}, callSelected: function (a) {
  var b = $get("lhsC").value;
  this.callItemClickByCId(a, b.slice(2))
}, setItemHref: function (c, a) {
  var b = $get("ma" + c);
  if (a && a != "" && a != "#") {
    if (a.indexOf("#!") > -1)a = a.substr(a.indexOf("#!") + 2);
    b.href = b.href.substr(0, b.href.indexOf("#!") + 2) + a
  }
}, getCurrentMode: function () {
  var a = $("#LHSWrapper");
  return a.hasClass("inplay")
    ? "INPLAY"
    : "SPORTS"
}, addOnItemClick: function (b, a) {
  var c = b;
  if (a)c = function (c) {
    b.call(a, c)
  };
  this._events.addHandler("onitemclick", c)
}, showLHSMenuAsIcons: function (a) {
  $("#LHSWrapper").removeClass("showtext");
  $("#headerContainer").addClass("showlhsicon");
  $("#showHideLHSMenu").addClass("showicon").removeClass("hidden");
  lhs.showSubMenu();
  if (a) {
    a.stopPropagation();
    a.preventDefault()
  }
  else typeof event !== "undefined" && event.preventDefault()
}, showLHSMenuAsText: function (a) {
  if (typeof a !== "undefined" && a !== null) {
    a.stopPropagation();
    a.preventDefault()
  }
  $("#LHSWrapper").addClass("showtext");
  $("#headerContainer").removeClass("showlhsicon");
  $("#showHideLHSMenu").removeClass("showicon").addClass("hidden");
  $displayHelper.isPortraitMode() && $("#showHideLHSMenu").removeClass("showicon").removeClass("hidden");
  lhs.showSubMenu()
}, showSubMenu: function () {
  var a = $("#sbLMN li a.subMI.selected"), b = $("#sbLMN ul.subItems");
  !b.hasClass("hidden") && $("#sbLMN ul.subItems").addClass("hidden");
  a.length > 0 && lhs.configureSubMenuForItem(a[0])
}};
var lhs = new b365.Ui.lhsMenu;
Sys.Application.add_load(Function.createDelegate(lhs, lhs.pageLoad));
b365.Ui.Coupon = function (a) {
  this._bsController = a;
  this._clickArg = null;
  this._lrow = null;
  this._htime = -1;
  this._OPENCLASS = "open";
  this._CLOSECLASS = "close";
  this._msgQue = [];
  this._raceMenuScrollPosition = null;
  this._datastore = {};
  this.onLoad = function (a, e, b, c) {
    this.applyHorseMenuFilters(null, false);
    this.castTabClick();
    if (!a)this.addCastTabClickHandler();
    else this.reloadOffRaces(a, e);
    this.addMeetingMenuHandler(c);
    this.addProductSelectionHandler();
    this.doDynamicSizing(a);
    gopts && gopts.enableThreeWayEleDynaResize && this.threeWayEleDynaResize($get("coupontable"), "cwide");
    this.setBetPlacementStateFormLoginState();
    if (typeof b !== "boolean" || b) {
      var d = typeof a == "undefined"
        ? false
        : true;
      this.contentChanged(c, null, d)
    }
    this.contentLoaded()
  };
  this.reloadOffRaces = function (c, a) {
    var d = c.innerHTML.indexOf("rof-hdr") > -1;
    if (d && a) {
      var b = a.split("-");
      if (b.length == 19 && b[18] == 1)return;
      mf._isRaceOff = true;
      this.openCoupon(null, a, false, "")
    }
  };
  this.setBetPlacementStateFormLoginState = function () {
    if (!lgh.isAuthenticated(false)) {
      var c = $get("cpn-pot");
      if (c) {
        var a = $getElementsByClassName("btn-fc-add", c);
        if (a && a.length > 0)for (var b = 0; b < a.length; b++)$addCls(a[b], "disabled")
      }
    }
  };
  this.addProductSelectionHandler = function () {
    var c = $get("all-ref-cnt");
    if (c) {
      var a = $getElementsByClassName("aus-prod-sel", c);
      if (a)if (a.length)for (var b = 0; b < a.length; b++)$addHandler(a[b], "change", Function.createDelegate(this, this.applyToteSelection), false, true,
        "sbMCN");
      else $addHandler(a, "change", Function.createDelegate(this, this.applyToteSelection), false, true, "sbMCN")
    }
  };
  this.addCastTabClickHandler = function () {
    var a = $get("exoticsTabs");
    a != null && $addHandler(a, "click", Function.createDelegate(this, this.castTabClick), false, true, "sbMCN")
  };
  this.addMeetingMenuHandler = function (d) {
    var c = $("#meet-menu");
    if (c) {
      var b = this;
      c.on("change keyup", function (a) {
        b.applyHorseMenuFilters(a, false)
      });
      var a = $(".link-menu");
      if ($hasCls($("#ref-cnt")[0], "defaultNav"))!Modernizr.horizontalscroll &&
      a.pageScroller({itemsSelector: 'a.link[data-fix-id="' + $("#meet-menu option:selected").attr("id") +
        '"]', itemParentSelector: "ul", itemSpacing: 4, showSelected: !d, setData: function (c, a) {
        b._datastore["link-menu-" + c] = a
      }, getData: function (a) {
        return b._datastore["link-menu-" + a]
      }});
      if (this._raceMenuScrollPosition) {
        a.scrollLeft(this._raceMenuScrollPosition);
        this._raceMenuScrollPosition = null
      }
      else a.scrollLeft(0)
    }
  };
  this.doDynamicSizing = function (f) {
    var d = $get("expCont");
    if (d) {
      var a = f;
      if (!a)a = d;
      if (a != null && !$hasCls(a, "no-size"))for (var g = a.getElementsByTagName("TABLE"), e = 0, b; b = g[e]; e++) {
        var c = $getPTag(b, "DIV");
        !$hasCls(c, "hidden") && !$hasCls(c, "no-size") && this.sizeTable(b)
      }
    }
  };
  this.threeWayEleDynaResize = function (m, o) {
    if (!m)return;
    for (var i = $getElementsByClassName(o, m), f = 0, d = null, b = 0, c = 0, q = 0, j = 0, k = 0, l = i.length - 1; l >= 0; l--) {
      var e = i[l];
      f = e.getAttribute("cindx");
      if (!d)d = f;
      if (f != d) {
        this.resizeContents(i, d, j, k);
        j = 0;
        k = 0;
        d = f
      }
      var a = e.offsetWidth / 2, g = $getElementsByClassName("left", e), h = $getElementsByClassName("right", e);
      if (g && g.length > 0 && h && h.length > 0) {
        var n = $getComputedPadding(g[0]), p = $getComputedPadding(h[0]);
        a -= n;
        b = $getLen(g[0]) - n;
        c = $getLen(h[0]) - p;
        if (b > a)c = a - (b - a);
        else if (c > a)b = a - (c - a);
        else {
          b = a;
          c = a
        }
      }
      j = b > a
        ? b
        : a;
      k = c
    }
  };
  this.resizeContents = function (f, g, h, i) {
    for (var e = f.length - 1; e >= 0; e--) {
      var b = f[e], c = $getElementsByClassName("left", b), d = $getElementsByClassName("right", b), a = b.getAttribute("cindx");
      if (!a)a = 0;
      if (parseInt(a) == parseInt(g) && c && c.length > 0 && d && d.length > 0) {
        c[0].style.width = h + "px";
        d[0].style.width = i + "px"
      }
    }
  };
  this.applyToteSelection = function (c) {
    var b = c.target;
    if (b) {
      var a = null, e = $getPES(b.parentNode, "race-sel"), f = $get("race-menu", e);
      if (f) {
        var d = $getElementsByClassName("selected", f);
        if (d && d.length > 0)a = d[0].id
      }
      else {
        var g = $get("raceKey", e);
        if (g)a = g.value
      }
      if (a) {
        var j = b.options[b.selectedIndex].id, h = a.split("-");
        h[13] = j;
        var i = h.join("-");
        this.openCoupon(c, i, false, "")
      }
      c.preventDefault()
    }
  };
  this.applyHorseMenuFilters = function (d, c) {
    var a = $get("meet-menu");
    if (a && a.length > 0) {
      var b = $get("race-menu");
      b != null && this.filterHorseLinkMenu(a, b, c, d)
    }
  };
  this.castTabClick = function (a) {
    var e = 1;
    if (a && a.target.tagName != "A" && a.target.tagName != "SPAN") {
      a.preventDefault();
      return
    }
    var c = $get("exoticsTabs");
    if (c) {
      if (a) {
        a.preventDefault();
        a.stopPropagation();
        var b = $getElementsByClassName("selected", c);
        if (b && b.length > 0) {
          $remCls(b[0], "selected");
          $get(b[0].id.replace("tab", "")).style.display = "none"
        }
        var d = $parentNode(this.findTargetAnchor(a.target));
        d && $addCls(d, "selected")
      }
      var b = $getElementsByClassName("selected", c);
      if (b && b.length > 0)$get(b[0].id.replace("tab", "")).style.display = "block"
    }
  };
  this.filterHorseLinkMenu = function (g, j, i, b) {
    for (var k = g[g.selectedIndex].id, f = false, c = null, e = $(j).find("#link-menu-horizontal-scroller ul li"), d = 0; d < e.length; d++) {
      var a = e.get(d);
      if (a && a.tagName == "LI")a = a.firstElementChild;
      if (a && a.tagName == "A")if (a.getAttribute("data-fix-id") == k) {
        a.style.display = "inline-block";
        a.parentElement.style.display = "inline-block";
        if (!f) {
          c = a;
          f = true
        }
      }
      else {
        a.parentElement.style.display = "none";
        a.style.display = "none"
      }
    }
    var h = c.getAttribute("data-result");
    (i == true || b != null && typeof b.target !== "undefined" && b.target.id == "meet-menu" && b.type != "readystatechange") &&
    this.openCoupon(b, c.id, false, "href=" + c.href, h && h.toLowerCase() == "true")
  };
  this.getTooltipForElement = function (a) {
    if (a.className.indexOf("pupelem") == -1)a = this.findTargetAnchor(a);
    tHold = a.title;
    a.title = "";
    var b = $getNES(a);
    return b.innerHTML
  };
  this.showTextTooltip = function (d, a, e, c, b) {
    if ($hasCls(a, "btn-odds-med"))b = "odds";
    var f = this.getTooltipForElement(a);
    this.showTooltip(d, a, f, e, c, b, true)
  };
  this.showTooltip = function (e, d, a, f, b, g, c) {
    a && e.show(d, a, f, b, c, g)
  };
  this.processOthersOnRequestAjaxResponse = function (c, b) {
    if (c) {
      var a = document.createElement("input");
      a.setAttribute("type", "hidden");
      a.setAttribute("id", "otrnreqdtl");
      a.setAttribute("value", b);
      document.body.appendChild(a);
      this.openMailClient(_clickArg, b, c)
    }
  };
  this.openMailClient = function (e, d, b) {
    var a = d.split("#^#");
    if (a[0] == "1") {
      var c = "";
      if (b.childNodes.length == 3)if (b.childNodes[2].innerText)c = b.childNodes[2].innerText;
      else if (b.childNodes[2].textContent)c = b.childNodes[2].textContent;
      location.href = "mailto:" + a[1] + "?subject=" + a[2] + "&body=UserName:" + a[3] + ";" + c.replace("&", "%26")
    }
    else try {
      this.addToMsgQue(a[1]);
      return false
    }
    catch (f) {
      return false
    }
  };
  this.processOthersOnRequest = function (b, a) {
    if (a) {
      _clickArg = b;
      var c = $get("otrnreqdtl");
      if (c)this.openMailClient(b, c.value, $get(a));
      else {
        trk && trk.send(b, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Click, EnumPodID.Coupon, -1, a);
        mf.req(18, 0, a)
      }
    }
  };
  this.openCoupon = function (i, a, d, f, h, g) {
    var e = a.split("-"), b = 4;
    if (d && d === true)b = 9;
    if ($get("hsHL"))b = 25;
    if ($(".inpOvwHdr", "#MiddleScroller").length > 0) {
      $("#cpn").attr("data-sportskey", a);
      b = 14
    }
    trk && trk.send(i, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Click, EnumPodID.Coupon, -1, a);
    mf._isAutoRefresh = false;
    var c = g
      ? "sort=" + g
      : "";
    if (h)mf.req(b, e[0], a, f, "RES", c);
    else mf.req(b, e[0], a, f, "", c);
    this.applyHorseMenuFilters(false)
  };
  this.onLiveStreamClick = function () {
    var a = $("#embdStrm"), b = $("#preMLiveCnt");
    if (lhs.getCurrentMode() == "INPLAY")a = $("#embdStrmIP");
    if (a)if ($(a).is(":visible") || b.is(":visible")) {
      $("#embdStrmHdr").hide();
      $("#streamingWpr").hide();
      $("#preMLiveCnt").hide();
      $(a).hide()
    }
    else if (parseInt(arguments[4])) {
      mf.req(arguments[4], arguments[1], arguments[2], arguments[3], 1);
      return false
    }
    return false
  };
  this.RefreshLiveStream = function () {
    var f = rhs.isInplayMode()
      ? "#embdStrmIP"
      : "#embdStrm", d = $(f);
    if (d.length > 0)if (d.is(":visible")) {
      var b = $get("VideoContainer");
      if (b) {
        var a = b.getAttribute("data-rfs");
        if (!isNaN(parseInt(a))) {
          var g = (new Date).getTime() - mf._StrmLastUpdatedTime;
          if (Number(a) != 0 && !(Number(a) > g)) {
            var e = b.getAttribute("name"), c = e.split("#");
            mf.req(29, c[0], c[1], 0, 0)
          }
        }
      }
    }
  };
  this.expandCollapse = function (b, a) {
    if (a.className.indexOf(this._OPENCLASS) >= 0) {
      this.closeSection(a);
      this.contentChanged(false, null, true)
    }
    else if (a.className.indexOf(this._CLOSECLASS) >= 0)if (a.className.indexOf("nojax") == -1)this.openCoupon(b, a.id, true, "");
    else this.openSection(a)
  };
  this.contentChanged = function (b, c, a) {
    $(window).trigger("maincontentchanged", [b, c, a])
  };
  this.contentLoaded = function () {
    $(window).trigger("b365.Ui.Coupon.couponcontentloaded")
  };
  this.findTargetAnchor = function (a) {
    if (a.tagName == "A" || $hasCls(a, "anch"))return a;
    var b = null;
    if (a.tagName == "SPAN")b = a.parentNode;
    if (b && (b.tagName == "A" || $hasCls(b, "anch")))a = b;
    if (a.tagName == "TD") {
      var c = a.getElementsByTagName("A");
      if (!c)a = $getCTag(a, null, "anch");
      if (c && c.length > 0)a = c[0]
    }
    return a
  };
  this.placeCastBets = function (j, c, l, k, m) {
    var d = [], f = [], b = cbet.getCastTypesFromTable(c), h = j.className.indexOf("aus") > -1;
    cbet.resetErrors(j);
    for (var a = 0; a < b.length; a++) {
      var i = cbet.getTableMatrix(c, b[a].ctyp), e = cbet.validate(b[a].ctyp, b[a].btyp, i, false, h);
      if (e && e.length > 0)for (var g = 0; g < e.length; g++)f.push(e[g]);
      else d.push(cbet.getBetSlipModel(c, b[a].ctyp, b[a].btyp, b[a].ttyp, i, k, h, m))
    }
    if (f.length == 0 && d && d.length > 0) {
      this._bsController.addBet(d);
      cbet.reset(l, true)
    }
    else {
      this.hiLiteErrors(c, f);
      cbet.showError(c)
    }
  };
  this.validateCastBets = function (n, j, k) {
    var g = $getPTag(n, "DIV"), e = $getCTag(g, "TABLE"), d = [], a = cbet.getCastTypesFromTable(e);
    cbet.resetErrors(g);
    for (var i = false, l = a && a.length
      ? a.length
      : -1, c = 0; c < l; c++)if (j && cbet.getCastMask(a[c].ctyp) == cbet._totePot)d = null;
    else {
      var m = cbet.getTableMatrix(e, a[c].ctyp), b = cbet.validate(a[c].ctyp, a[c].btyp, m, k, g.className.indexOf("aus") > -1), h = b && b.length
        ? b.length
        : -1;
      if (b && h > 0)for (var f = 0; f < h; f++) {
        if (b[f].warn)i = true;
        d.push(b[f])
      }
    }
    if (!d || d.length == 0)cbet.hideError(e);
    else if (i) {
      this.hiLiteErrors(e, d);
      cbet.showError(e)
    }
  };
  this.hiLiteErrors = function (b, a) {
    if (!b)return;
    if (!a || a.length == 0)return;
    cbet.eachChild(b, "INPUT", function (c) {
      for (var b = 0; b < a.length; b++)c.value == a[b].id && $addCls(c.parentNode, "error")
    })
  };
  this.sizeTable = function (i) {
    for (var h = 0, c = 0, a; a = i.rows[c]; c++)for (var d = 0, e; e = a.cells[d]; d++)for (var f = $getElementsByClassName("right", a), b = 0; b <
      f.length; b++)if (f[b].clientWidth + 20 > h)h = f[b].clientWidth + 20;
    for (c = 0, a; a = i.rows[c]; c++)for (d = 0, e; e = a.cells[d]; d++) {
      e.style.width = 100 / a.cells.length + "%";
      for (var g = $getElementsByClassName("left", a), f = $getElementsByClassName("right", a), b = 0; b < g.length; b++) {
        g[b].style.width = $("#MiddleWrapper[data-orientation='P']").length > 0
          ? "70%"
          : "75%";
        f[b].style.lineHeight = g[b].clientHeight + "px"
      }
    }
  };
  this.hasMsgsInQue = function () {
    return this._msgQue.length > 0
  };
  this.addToMsgQue = function (a) {
    this._msgQue.push(a)
  };
  this.getPendingMsgText = function () {
    return this._msgQue.pop()
  };
  this.getPendingMsgHTML = function () {
    var b = this.getPendingMsgText(), c = $get("notlogedinmsg");
    document.all
      ? (c.innerText = b)
      : (c.textContent = b);
    var a = $get("fmsgDiv");
    a = $getElementsByClassName("cnt", a);
    return a[0].innerHTML
  }
};
b365.Ui.Coupon.prototype = {setupHandlers: function (d) {
  var a = d
    ? d
    : "sbMCN", e = $get("cpn");
  e && $addHandler(e, "click", Function.createDelegate(this, this.onItemClick), false, true, a);
  var f = $(".inpOvwHdr").get(0);
  f && $addHandler(f, "click", Function.createDelegate(this, this.onItemClick), false, true, a);
  var c = $get("cpn-evs-sel");
  $addHandler(c, "change", Function.createDelegate(this, this.onEventSelect), false, true, a);
  $(c).parent().attr("data-text", $(c).find(":selected").text().trim());
  var b = $get("cpn-evs-sel1");
  $addHandler(b, "change", Function.createDelegate(this, this.onEventSelect), false, true, a);
  $(b).parent().attr("data-text", $(b).find(":selected").text().trim());
  var g = $get("ballOrd");
  g && $addHandler(g, "change", Function.createDelegate(this, this.onBallOrdChange), false, true, a)
}, onBallOrdChange: function (b) {
  b.preventDefault();
  var a = b.target, d = a.attributes.key.value, c = a.selectedIndex;
  c != -1 && mf.req(4, 6, d, "bord=" + a[a.selectedIndex].value)
}, onItemClick: function (b) {
  var a = null, s = null, c = null;
  if (b)a = b.target;
  $ttPersist.hide();
  var o = $getPTag(a, "TR", "rr", 5);
  if (o && !$hasCls(a, "cpn-btn"))a = $getCTag(o, "A", "btn-odds");
  if (a.tagName == "INPUT") {
    if ($hasCls(a, "castcb")) {
      this.validateCastBets(a, true, true);
      c = $getPTag(a, "TABLE");
      !$hasCls(c, "banker") && cbet.updateUIState(c, a, b)
    }
    else if ($hasCls(a, "fieldcb")) {
      this.validateCastBets(a, true, true);
      c = $getPTag(a, "TABLE");
      cbet.selectField(c, a, b);
      cbet.updateUIState(c, a, b)
    }
    else if ($hasCls(a, "casttb")) {
      c = $getCTag($getPES($getPES(a.parentNode.parentNode)), "TABLE");
      cbet.toggleBanker(c)
    }
  }
  else if (a.tagName == "TD" || a.tagName == "SPAN") {
    a = this.findTargetAnchor(a);
    if (a.tagName != "A" && !$hasCls(a, "anch")) {
      a = b.target;
      var t = a.parentNode;
      if (t.tagName == "H3" || t.tagName == "H2") {
        var f = $getPTag(a, "DIV", "expand");
        if (f) {
          this.expandCollapse(b, f);
          b.preventDefault()
        }
      }
    }
  }
  else if ($hasCls(a, "obtn") || $hasCls(a, "oinr")) {
    var k = a.getElementsByTagName("A");
    if (k && k.length > 0)a = k[0]
  }
  else if (!$hasCls(a, "otrnreq") && !$hasCls(a, "hdrlnksec")) {
    var f = $getPTag(a, "DIV", "expand");
    if (f) {
      !$hasCls(f, "suspend") && this.expandCollapse(b, f);
      b.preventDefault()
    }
  }
  if (a && (a.tagName == "A" || a.tagName == "SPAN")) {
    var g = null;
    if ($hasCls(a, "clickpupelem_x")) {
      a = $getPTag(a, null, "clickpupelem_x", 1);
      var r = this.getTooltipForElement(a);
      this.showTooltip($ttPersist, a, r, null, -65, false);
      b.preventDefault()
    }
    else if ($hasCls(a, "clickpupelem_table")) {
      g = new b365.Ui.Coupon.HorseRacingInfoRefresher;
      g.tablePopup(a, storage)
    }
    else if ($hasCls(a, "clickpupelem_div")) {
      g = new b365.Ui.Coupon.HorseRacingInfoRefresher;
      g.divPopup(a, storage)
    }
    else if ($hasCls(a, "clickpupelem")) {
      a = $getPTag(a, null, "clickpupelem", 1);
      var r = this.getTooltipForElement(a);
      this.showTooltip($tt, a, r, null, 0, "", true);
      b.preventDefault()
    }
    else if ($hasCls(a, "btn-odds")) {
      if (a.id !== "") {
        var v = a.id.substring(3).split("_"), e = v[0], l = $getMT(a), m = $getPTag(a, "DIV", "tab-typ-x-brdr"), d = m
          ? $get("cpn-tote-sel", m)
          : $get("cpn-tote-sel");
        if (d)e += "|#atc=" + d.options[d.selectedIndex].getAttribute("data-atcvalue");
        if (l != "") {
          e.indexOf("|") != -1
            ? (e += "#mt=")
            : (e += "|#mt=");
          e += l
        }
        this._bsController.addBet(e)
      }
      b.preventDefault()
    }
    else if (a.id == "refresh") {
      trk && trk.send(b, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Refresh, EnumPodID.Coupon, null, null);
      mf.req(6);
      b.preventDefault()
    }
    else if (a.id == "back") {
      lhs.callSelected();
      b.preventDefault()
    }
    else if ($hasCls(a, "btn-fc-reset")) {
      cbet.reset(a, true);
      b.preventDefault()
    }
    else if ($hasCls(a, "btn-fc-add")) {
      if ($hasCls(a, "disabled")) {
        b.preventDefault();
        return
      }
      var l = $getMT(a), h = "", d = $get("cpn-tote-sel");
      if (d)h = d.options[d.selectedIndex].getAttribute("data-atcvalue");
      else {
        var i = $get("cpn-evs-sel", cbet.findMultLegHdrDiv(a));
        if (i)h = i.options[i.selectedIndex].getAttribute("data-atcvalue")
      }
      var q = cbet.findTableDiv(a);
      s = $getCTag(q, "DIV");
      c = $getCTag(q, "TABLE");
      this.placeCastBets(s, c, a, h, l);
      b.preventDefault()
    }
    else if ($hasCls(a, "btn-tp-prev")) {
      this.showNextTable($getPTag(a, "TABLE"), $getPES);
      b.preventDefault()
    }
    else if ($hasCls(a, "btn-tp-next")) {
      this.showNextTable($getPTag(a, "TABLE"), $getNES);
      b.preventDefault()
    }
    else if ($hasCls(a, "otrnreq") && b.target.tagName != "TD") {
      this.processOthersOnRequest(b, a.id);
      b.preventDefault()
    }
    else if ($hasCls(a, "hdrlnksec") || $hasCls(a, "cpntab") || $hasCls(a, "cpnrlnk") || $hasCls(a, "btnracecpn")) {
      a.id != "" && this.openCoupon(b, a.id, false, "href=" + a.href);
      b.preventDefault()
    }
    else if ($hasCls(a, "link") && a.id != "") {
      var p = a.getAttribute("data-result");
      this._raceMenuScrollPosition = $(".link-menu").scrollLeft();
      this.openCoupon(b, a.id, false, "href=" + a.href, p && p.toLowerCase() == "true");
      b.preventDefault()
    }
    else if (a.className.indexOf("splashHeaderLink") >= 0 && a.className.indexOf("home") >= 0)lhs.callExternalItemClickHome();
    else if ($hasCls(a, "vrItem") && a.id != "") {
      var j = a.id, w = j.split("-"), x = 35;
      trk && trk.send(b, EnumRegionID.Center, -1, EnumEventsOrPageTypes.Click, EnumPodID.Coupon, -1, j);
      mf.req(x, w[0], j);
      b.preventDefault()
    }
    else {
      a = a.parentNode;
      if (a && $hasCls(a, "tabItem")) {
        !$hasCls(a, "selected") && this.openCoupon(b, a.id, false, "");
        b.preventDefault()
      }
    }
  }
  if (a && a.tagName == "TH" && $(a).attr("data-sort")) {
    var n = $("#cpn-race"), u = n && n.hasClass("multi")
      ? "all-ref-cnt"
      : "ref-cnt";
    this.openCoupon(b, $("#cpn").attr("data-sportskey"), true, u, false, $(a).attr("data-sort"))
  }
}, showNextTable: function (b, c) {
  if (b) {
    var a = c(b);
    if (a && a.tagName == "TABLE") {
      $swpCls(b, "visible", "hidden");
      $swpCls(a, "hidden", "visible")
    }
  }
}, onEventSelect: function (b) {
  var a = b.target, c = a.selectedIndex;
  if (c > -1) {
    var d = a.options[c].id;
    this.openCoupon(b, d, false, "");
    $(a).parent().attr("data-text", $(a).find(":selected").text());
    b.preventDefault()
  }
}, ProcessPartialResponse: function (a, b) {
  if (b.trim() != "") {
    elem = $getNES(a);
    if ((nele = $getNES(elem)) != null)elem = nele;
    $(elem).empty();
    elem.innerHTML = b;
    this.openSection(a)
  }
  else $swpCls(a, "close", "open")
}, openSection: function (b, c) {
  if (!b)return;
  var a, d = true;
  $swpCls(b, "close", "open");
  if ($hasCls(b, "lvstrm")) {
    a = $get("embdStrm");
    if (a) {
      var e = b.id.split("#");
      a.style.display = "block"
    }
  }
  else {
    a = $getNES(b);
    if (a) {
      $swpCls(a, "hidden", "visible");
      this.onLoad(a, undefined, c, false);
      if (a && a.innerHTML == "")d = false;
      a = $getNES(a);
      if (a) {
        $swpCls(a, "hidden", "visible");
        this.onLoad(a, undefined, c, false);
        if (a && a.innerHTML.trim() == "")d = false
      }
    }
  }
  if (!d) {
    this.closeSection(b, c);
    (typeof c !== "boolean" || c) && this.contentChanged(false, null, false)
  }
  mf.updateOpenCloseStatus(b)
}, closeSection: function (a) {
  if (!a)return;
  $swpCls(a, "open", "close");
  mf.updateOpenCloseStatus(a);
  if ($hasCls(a, "lvstrm")) {
    a = $get("embdStrm");
    if (a) {
      a.style.display = "hidden";
      return
    }
  }
  a = $getNES(a);
  if (!a)return;
  $swpCls(a, "visible", "hidden");
  a = $getNES(a);
  if (!a)return;
  $swpCls(a, "visible", "hidden")
}};
b365.Ui.CastSelection = function (b, a) {
  this.el = b;
  this.value = a
};
b365.Ui.CastBetResult = function (c, d, b, a) {
  this.x = c;
  this.y = d;
  this.id = b;
  this.warn = a
};
b365.Ui.CastBetslipModel = function (a, c, d, e, b, f) {
  this._australianForecastPrefix = "oe";
  this._australianTricastPrefix = "ot";
  this.valuelist = new Array(e);
  this.stype = a.toUpperCase().substring(0, 1);
  this.cmask = a.toUpperCase().substring(1, 2);
  this.ctype = c.toUpperCase();
  this.ttype = d;
  if (a != this._australianForecastPrefix && a != this._australianTricastPrefix)this.atcValue = b;
  this.mediaType = f;
  this._legind = 0;
  this._fpind = 1;
  this._pottypeind = 2;
  this._totemiind = 3;
  this._totemnind = 4;
  this._toteracenind = 5;
  this._toterunind = 6;
  this._totetypeind = 7
};
b365.Ui.CastBetslipModel.prototype = {addParticipant: function (d, a, c, b) {
  if (d.substring(1, 2) == cbet._totePot) {
    this.c2ID = c;
    b = this.getTotePotValue(b)
  }
  else this.fixid = c;
  if (!this.valuelist[a])this.valuelist[a] = [];
  this.valuelist[a].push(b)
}, getTotePotValue: function (b) {
  var a = b.split(":");
  this.totemn = a[this._totemnind];
  this.totemi = a[this._totemiind];
  this.cmask = a[this._pottypeind];
  this.ttID = a[this._totetypeind];
  return a[this._fpind] + ":" + a[this._toteracenind] + ":" + a[this._toterunind] + ":" + a[this._legind]
}};
b365.Ui.CastBetting = function () {
  this._forecast = "e";
  this._tricast = "t";
  this._toteEachWay = "d";
  this._totePot = "p";
  this._toteSwinger = "w";
  this._toteQuinella = "q";
  this._toteSuperfecta = "s";
  this._tote12Any = "2";
  this._tote12Ex = "e";
  this._tote123Any = "3";
  this._tote123Ex = "t";
  this._tote1234Any = "4";
  this._betTypeStraight = "s";
  this._betTypeCombi = "c";
  this._betTypeWin = "w";
  this._betTypePlace = "l";
  this._betTypeEachWay = "e";
  this._betTypeBanker = "b";
  this._betTypeStraightOrCombination = "o";
  this._australianQuinella = "qa";
  this._colsSelected = 0;
  var a = null;
  this.eachChild = function (d, c, b) {
    var a = $firstChild(d);
    while (a) {
      a.tagName === c && b(a);
      $firstChild(a) && this.eachChild(a, c, b);
      a = $getNES(a)
    }
  };
  this.reset = function (c, b) {
    var a = $getCTag(this.findTableDiv(c), "TABLE"), d = a.className.indexOf("banker") > 0;
    d && this.toggleBanker(a);
    this.resetSelections($getCTag(this.findTableDiv(c), "DIV"), b);
    this.resetSelections(c.parentNode, b);
    d && !b && this.toggleBanker(a);
    this.hideError(a)
  };
  this.showError = function (b) {
    var a = this.getErrorDiv(b);
    $remCls(a, "hidden")
  };
  this.hideError = function (b) {
    var a = this.getErrorDiv(b);
    $addCls(a, "hidden")
  };
  this.getErrorDiv = function (a) {
    var c = $getPTag(a, "DIV", "cast-content") || $getPTag(a, "DIV", "aus-cast"), b = $getCTag(c, "DIV", "msg-warn");
    return b
  };
  this.findTableDiv = function (b) {
    var a = b.parentNode;
    return $getPES($getPES(a))
  };
  this.findMultLegHdrDiv = function (b) {
    var a = $getPTag(b, "DIV", "pot-cont");
    if (a)a = $getPES(a, "cpn-head");
    return a
  }, this.resetSelections = function (a, b) {
    a && this.eachChild(a, "INPUT", function (a) {
      if (a.className.indexOf("dis") < 0 && (a.value != "banker" || b)) {
        if (a.checked)a.checked = false;
        $remCls(a.parentNode, "error");
        a.disabled = false
      }
    })
  };
  this.resetErrors = function (a) {
    a && this.eachChild(a, "INPUT", function (a) {
      $remCls(a.parentNode, "error")
    })
  };
  this.toggleBanker = function (b) {
    var a = this, c = b.className.indexOf("banker") >= 0;
    this.eachChild(b, "INPUT", function (b) {
      if (b.className.indexOf("castcb") >= 0) {
        if (a.getElBetType(b) == a._betTypeStraight)b.value = b.value.replace(a._betTypeStraight, a._betTypeBanker);
        else if (a.getElBetType(b) == a._betTypeBanker)b.value = b.value.replace(a._betTypeBanker, a._betTypeStraight);
        if (b.className.indexOf("dis") < 0) {
          if (b.className.indexOf("nobank") > 0 && !c)b.disabled = true;
          else b.disabled = false;
          b.checked = false
        }
      }
    });
    if (c)$remCls(b, "banker");
    else $addCls(b, "banker")
  };
  this.getElType = function (a) {
    return a.value.substring(0, 2)
  };
  this.getElBetType = function (a) {
    return a.value.substring(2, 3)
  };
  this.getEleToteType = function (a) {
    return a.value.split(":")[3]
  };
  this.getSport = function (a) {
    return a.substring(0, 1)
  };
  this.getCastMask = function (a) {
    return a.substring(1, 2)
  };
  this.disableOtherBetTypes = function (b, e, d) {
    var a = this;
    if (!b)return;
    var c = 0;
    this.eachChild(b, "INPUT", function (b) {
      if (a.getElType(b) == e && a.getElBetType(b) == d && b.checked)c++
    });
    var f = [];
    this.eachChild(b, "INPUT", function (b) {
      if (a.getElType(b) == e)if (b.className.indexOf("dis") < 0)b.disabled = c > 0 && a.getElBetType(b) != d
    })
  };
  this.synchInputState = function (j, d, a, i, c) {
    var e = c != null, f = e
      ? c
      : j.id == "currentLeg"
      ? a[0]
      : a[i], b = e
      ? "data-field-id"
      : "data-line-id", g = d.checked, h = $(d).attr(b);
    $("[" + b + "=" + h + "]", f).attr("checked", g)
  };
  this.selectField = function (b, c, a) {
    if (!b)return false;
    var d = this.getElType(c);
    if (this.getCastMask(d) == this._totePot)if (!lgh.isAuthenticated(true)) {
      a.preventDefault();
      return
    }
    this.synchTables(b, c, a, true)
  };
  this.updateUIState = function (a, c, d) {
    if (!a)return false;
    var b = this.getElType(c);
    if (this.getCastMask(b) == this._toteEachWay)return;
    var e = this.getElBetType(c);
    if (this.getCastMask(b) == this._totePot) {
      if (!lgh.isAuthenticated(true)) {
        d.preventDefault();
        return
      }
      this.synchTables(a, c, d, false)
    }
    else this.disableOtherBetTypes(a, b, e)
  };
  this.synchTables = function (c, h, j, i) {
    var f = $getPTag(c, "DIV").parentNode, a = f.getElementsByTagName("TABLE"), e = this.getLegId(h), d = a && a.length
      ? a.length
      : -1, g = null;
    if (c.id != "currentLeg" && a && d > 0) {
      for (var b = 1; b < d; b++)if (a[b].className.indexOf("visible") >= 0) {
        g = a[b];
        break
      }
      cp.showNextTable(g, function () {
        return a[e]
      })
    }
    this.synchInputState(c, h, a, e, i
      ? f
      : null)
  };
  this.getLegId = function (a) {
    var b = null;
    if (a.value.startsWith("fp"))b = Number(a.value.replace("fp", "")) + 1;
    else if (a.className.indexOf("fieldcb") >= 0)b = Number(a.value.substring(4)) + 1;
    else b = a.value.split(":")[2];
    return b
  };
  this.validate = function (c, d, b, f, e) {
    var a = [];
    if (this.getCastMask(c) == this._totePot)this.validateToteLines(b, a);
    else if (e && this.getCastMask(c) == this._toteQuinella)this.validateStandoutQuinella(c, b, a, f, e);
    else if (d == this._betTypeBanker)this.validateBankers(b, a);
    else if (d == this._betTypeStraight) {
      var g = this.getStraightColumns(c, e);
      this._colsSelected = 0;
      this.validateStraightSelections(b, a, g);
      if (f && this._colsSelected < b[0].length - 1)a = null
    }
    else if (d == this._betTypeCombi || d == this._betTypeStraightOrCombination) {
      var h = this.getNumberOfCombiSelectionsRequired(c);
      this.validateCombinations(b, this.getCombiColumnIndex(c), h, a)
    }
    return a
  };
  this.getTableMatrix = function (a, d) {
    var g = this;
    if (!a)return null;
    var f = a.rows > 0 && $hasCls(a.rows[a.rows.length - 1], "field")
      ? a.rows.length - 2
      : a.rows.length - 1, e = this.getMatrixWidth(d, a), b = new Array(f);
    for (i = 0; i < f; i++) {
      b[i] = new Array(e);
      for (c = 0; c < e; c++)b[i][c] = null
    }
    this.eachChild(a, "INPUT", function (a) {
      if (g.getElType(a) == d && !a.disabled && !$hasCls(a, "fieldcb")) {
        var c = a.value.split(":");
        if (a.checked) {
          var e = new b365.Ui.CastSelection(a, a.value);
          b[c[1] - 1][c[2] - 1] = e
        }
      }
    });
    return b
  };
  this.getBetSlipModel = function (o, a, g, n, e, l, m, p) {
    for (var b = new b365.Ui.CastBetslipModel(a, g, n, this.getMatrixWidth(a, o), l, p), h = 0, f = "", k = 0, d = 0; d < e.length; d++)for (var c = 0; c <
      e[d].length; c++)if (e[d][c] != null && e[d][c].el.checked)if (e[d][c].el.value.substring(0, 3) == a + g) {
      h = c;
      if (this.getCastMask(a) == cbet._toteEachWay || g == cbet._betTypeCombi && !this.isStandOutQuinella(this.getCastMask(a), m))h = 0;
      f = this.getUnprefixedValue(e[d][c].el.value);
      var j = f.indexOf(":");
      k = f.substring(0, j);
      f = f.substring(j + 1);
      b.addParticipant(a, h, k, f)
    }
    if (b.ctype == this._betTypeStraightOrCombination.toUpperCase()) {
      var i = this.getNumberOfCombiSelectionsRequired(a);
      if (b.valuelist[0].length == i)b.ctype = this._betTypeStraight.toUpperCase();
      else if (b.valuelist[0].length > i)b.ctype = this._betTypeCombi.toUpperCase()
    }
    return b
  };
  this.getUnprefixedValue = function (a) {
    a = a.substring(a.indexOf(":", 3) + 1);
    a = a.substring(a.indexOf(":") + 1);
    a = a.substring(a.indexOf(":") + 1);
    a = a.substring(a.indexOf(":") + 1);
    return a
  };
  this.getCastTypesFromTable = function (d) {
    var a = this;
    if (!d)return null;
    var b = [], c = [];
    this.eachChild(d, "INPUT", function (d) {
      if (d.checked && !d.disabled && !$hasCls(d, "fieldcb")) {
        var e = {ctyp: a.getElType(d), btyp: a.getElBetType(d), ttyp: a.getEleToteType(d)}, f = e.ctyp + ":" + e.btyp;
        if (!Array.contains(b, f)) {
          b.push(f);
          c.push(e)
        }
      }
    });
    return c
  };
  this.isStandOutQuinella = function (b, a) {
    return a && b == cbet._toteQuinella
  };
  this.validateStandoutQuinella = function (g, a, b, e, f) {
    var c = false;
    for (i = 0; i < a.length; i++)if (a[i][1] && a[i][1].el.checked) {
      c = true;
      break
    }
    if (c) {
      var d = this.getStraightColumns(g, f);
      this._colsSelected = 0;
      this.validateStraightSelections(a, b, d);
      if (e && this._colsSelected < a[0].length - 1)b = null
    }
    else this.validateCombinations(a, 0, 2, b)
  };
  this.validateStraightSelections = function (a, h, i) {
    var d = [];
    this.getSelectedRoutes(a, [], 0, d, i);
    for (var f = 0; f < d.length; f++)for (var g = d[f], e = 0; e < g.length; e++)g[e].visited = true;
    for (c = 0; c < a[0].length; c++) {
      colSelected = false;
      for (var b = 0; b < a.length; b++)if (a[b][c] && a[b][c].el.checked) {
        colSelected = true;
        !a[b][c].visited && h.push(new b365.Ui.CastBetResult(c, b, a[b][c].value, true))
      }
      if (colSelected)this._colsSelected += 1
    }
  };
  this.getSelectedRoutes = function (c, d, f, i, e) {
    for (var h = 0; h < c.length; h++) {
      var b = c[h][f];
      if (b && b.el.checked) {
        for (var a = d.slice(), j = true, g = 0; g < d.length; g++)if (this.getUnprefixedValue(b.el.value) == this.getUnprefixedValue(d[g].el.value))j = false;
        j && a.push(b);
        a.length == e && i.push(a);
        f + 1 < e && this.getSelectedRoutes(c, a, f + 1, i, e)
      }
    }
  };
  this.validateCombinations = function (c, d, f, e) {
    for (var a = 0, b = 0; b < c.length; b++)if (c[b][d] != null)a++;
    if (a > 0 && a < f) {
      var g = null;
      e.push(new b365.Ui.CastBetResult(-1, -1, null, false))
    }
  };
  this.validateBankers = function (b, d) {
    for (var c = 0, e = 0, f = false, a = 0; a < b.length; a++) {
      if (b[a][0] != null)c++;
      if (b[a][1] != null)e++;
      if (b[a][0] != null && b[a][1] != null && b[a][0].el.value == b[a][1].value)f = true;
      c > 1 && b[a][0] && b[a][0].el.checked && d.push(new b365.Ui.CastBetResult(0, a, b[a][0].value, true))
    }
    (c != 1 || e < 2 || f) && d.push(new b365.Ui.CastBetResult(-1, -1, null, false))
  };
  this.validateToteLines = function (b, e) {
    var a = new Array(b[0].length);
    for (r = 0; r < b.length; r++)for (c = 0; c < b[r].length; c++) {
      if (!a[c])a[c] = 0;
      if (b[r][c] != null && b[r][c].el.checked)a[c]++
    }
    var d = 0;
    for (i = 0; i < a.length; i++)if (a[i] > 0)d++;
    d < a.length && e.push(new b365.Ui.CastBetResult(-1, -1, null, false))
  };
  this.getStraightColumns = function (a, b) {
    switch (this.getCastMask(a)) {
      case this._forecast:
        return 2;
      case this._tricast:
        return 3;
      case this._toteEachWay:
        return 0;
      case this._toteSwinger:
        return 0;
      case this._tote1Any:
        return 0;
      case this._toteQuinella:
        return b
          ? 2
          : 0;
      case this._tote12Any:
        return 2;
      case this._tote12Ex:
        return 2;
      case this._tote123Any:
        return 0;
      case this._tote123Ex:
        return 3;
      case this._tote1234Any:
        return 0;
      case this._toteSuperfecta:
        return 4;
      case this._totePot:
        return uit.rows[1].cells.length - 1;
      default:
        return 0
    }
  };
  this.getMatrixWidth = function (b, a) {
    var d = $getPTag(a, "DIV"), c = d.className.indexOf("aus") > -1;
    switch (this.getCastMask(b)) {
      case this._forecast:
        return 3;
      case this._tricast:
        return 4;
      case this._toteEachWay:
        return 3;
      case this._toteSwinger:
        return 1;
      case this._tote1Any:
        return 1;
      case this._toteQuinella:
        return c
          ? 2
          : 1;
      case this._tote12Any:
        return 1;
      case this._tote12Ex:
        return 3;
      case this._tote123Any:
        return 1;
      case this._tote123Ex:
        return 4;
      case this._tote1234Any:
        return 1;
      case this._toteSuperfecta:
        return 5;
      case this._totePot:
        return a.rows[1].cells.length - 1;
      default:
        return 0
    }
  };
  this.getNumberOfCombiSelectionsRequired = function (a) {
    switch (this.getCastMask(a)) {
      case this._forecast:
        return 2;
      case this._tricast:
        return 3;
      case this._toteSwinger:
        return 2;
      case this._tote1Any:
        return 2;
      case this._toteQuinella:
        return 2;
      case this._tote12Any:
        return 2;
      case this._tote12Ex:
        return 2;
      case this._tote123Any:
        return 3;
      case this._tote123Ex:
        return 3;
      case this._tote1234Any:
        return 4;
      case this._toteSuperfecta:
        return 4;
      default:
        return 0
    }
  };
  this.getCombiColumnIndex = function (a) {
    switch (this.getCastMask(a)) {
      case this._forecast:
        return 2;
      case this._tricast:
        return 3;
      case this._toteSwinger:
        return 0;
      case this._tote1Any:
        return 0;
      case this._toteQuinella:
        return 0;
      case this._tote12Any:
        return 0;
      case this._tote12Ex:
        return 2;
      case this._tote123Any:
        return 0;
      case this._tote123Ex:
        return 4;
      case this._tote1234Any:
        return 0;
      case this._toteSuperfecta:
        return 4;
      default:
        return 0
    }
  }
};
var cbet = new b365.Ui.CastBetting;
b365.Ui.Splash = function () {
  this.GCIDPf = "GCID:"
};
b365.Ui.Splash.prototype = {setupHandlers: function (b) {
  var a = $get(typeof b == "undefined"
    ? "splCnt"
    : b);
  if (a) {
    var c = a.id == "splCnt"
      ? "sbMCN"
      : "sbRhs";
    $addHandler(a, "click", Function.createDelegate(this, this.onItemClick), false, true, c)
  }
}, getTooltipForElement: function (a) {
  if (!$hasCls(a, "pupelem"))a = this.findTargetAnchor(a);
  a.title = "";
  var b = $firstChild(a);
  if (b == null)b = $getNES(a);
  return b == null
    ? ""
    : b.innerHTML
}, showTooltip: function (d, c, a, e, b) {
  a && d.show(c, a, e, b)
}, spClick: function (b) {
  var a = $getPTag(b, "DIV", "expItem"), c = b.parentNode, d = $hasCls(c, "close") || $hasCls(c.parentNode, "close");
  if (d) {
    this.openSection(a);
    mf.updateOpenCloseStatus(a);
    return true
  }
  else {
    this.closeSection(a);
    mf.updateOpenCloseStatus(a);
    return false
  }
}, changeDay: function (a) {
  if (a.parentNode.className.indexOf("selected") != -1)return false;
  var b = a.id.split("#");
  mf.req(13, lhs.INPLAY_CID, b[1]);
  return false
}, extractGroupClassificationID: function (b, e) {
  var a = null;
  if (b) {
    var c = b.indexOf(this.GCIDPf, 0), d = b.indexOf(";", c);
    if (c != -1 && d != -1)a = b.substring(c + this.GCIDPf.length, d)
  }
  if (a == null)a = e;
  return a
}, removeGroupClassificationAttribute: function (b, c) {
  var a = b;
  a = b.replace(new RegExp(this.GCIDPf + c + ";", "g"), "");
  return a
}, onItemClick: function (c) {
  var b = null;
  if (c)b = c.target;
  b = this.findTargetAnchor(b);
  if (b && b.tagName == "A") {
    var a = b.id.split("#");
    if (a.length > 0)if (b.className.indexOf("splptlnk") >= 0) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[2]);
      mf.req(parseInt(a[0]), parseInt(a[1]), parseInt(a.length > 2
        ? a[2]
        : "1"), "href=" + b.href);
      c.preventDefault();
      c.stopPropagation
        ? c.stopPropagation()
        : (c.cancelBubble = true)
    }
    else if (b.className.indexOf("expndhdr") >= 0) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[2]);
      mf.req(parseInt(a[0]), parseInt(a[1]), a[2], a[3], a[4], a[5])
    }
    else if (b.className.indexOf("lv1LotR") >= 0) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[2]);
      mf.req(parseInt(a[0]), parseInt(a[1]), a[2], a[3])
    }
    else if (b.id.startsWith("4#") || b.id.startsWith("11#") || b.id.startsWith("24#")) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[2]);
      if (a.length == 4)mf.req(parseInt(a[0]), parseInt(a[1]), a[2], a[3]);
      else mf.req(parseInt(a[0]), parseInt(a[1]), a[2])
    }
    else if (b.id.startsWith("14#")) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[2]);
      mf.req(parseInt(a[0]), parseInt(a[1]), a[2])
    }
    else if (b.id.startsWith("34#")) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, 0);
      if (a.length == 3)mf.req(parseInt(a[0]), parseInt(a[1]), a[2]);
      else mf.req(parseInt(a[0]), parseInt(a[1]))
    }
    else if (b.id.startsWith("btn#")) {
      a = b.id.split("#");
      trk && trk.send(c, EnumRegionID.Center, a[2], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, a[3]);
      mf.req(parseInt(a[1]), parseInt(a[2]), a[3], "href=" + b.href);
      c.preventDefault()
    }
    else if (b.className.indexOf("lv1a") >= 0 || b.className.indexOf("lv1Lot") >= 0 || b.className.indexOf("lv3a") >= 0) {
      if (this.spClick(b)) {
        trk && trk.send(c, EnumRegionID.Center, a[2], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, parseInt(a[4]));
        mf.req(parseInt(a[1]), parseInt(a[2]), a[3], a[4], a[5], a[6], a[7])
      }
    }
    else if (b.className.indexOf("cntus") >= 0) {
      trk && trk.send(c, EnumRegionID.Center, a[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, parseInt(a[2]));
      mf.req(parseInt(a[0]))
    }
    else if (b.className.indexOf("drychnflt") >= 0)mf.req(13, mf.extractKeyValue(window.location.hash, "cid"), mf.extractKeyValue(window.location.hash, "day"),
      b.id);
    else if (b.className.indexOf("dryclsflt") >= 0)mf.req(13, b.id, mf.extractKeyValue(window.location.hash, "day"),
      mf.extractKeyValue(window.location.hash, "chn"));
    else if (b.className.indexOf("drydayflt") >= 0)this.changeDay(b);
    else b.className.indexOf("splashHeaderLink") >= 0 && b.className.indexOf("home") >= 0 && lhs.callExternalItemClickHome()
  }
  !$(c.target).is("input:checkbox") && c.preventDefault()
}, findTargetAnchor: function (a) {
  if (a.tagName == "A")return a;
  var b = $(a).parent();
  if (b.length > 0)if (b[0].tagName == "A")return b[0];
  var c = $(a).find("a");
  if (c.length != 0)return c[0];
  var e = $(a).siblings();
  if (e.length == 0)return null;
  var d = $(e).find("a");
  return d.length == 0
    ? null
    : d[0]
}, openSection: function (a, b) {
  var d = $(a);
  if (!d.hasClass("open")) {
    $swpCls(a, "close", "open");
    if ($hasCls(a, "lv1"))$swpCls($getCTag(a, "A"), "lv1c", "lv1o");
    else $hasCls(a, "lv3") && $swpCls($getCTag(a, "A"), "lv3c", "lv3o");
    $swpCls($getNES(a), "hidden", "visible");
    var c = $getNES(a, "expItem");
    c && $addCls(c, "tb");
    (typeof b !== "boolean" || b) && this.contentChanged()
  }
}, closeSection: function (a, c) {
  var b = $(a);
  if (!b.hasClass("close")) {
    b.removeClass("open").addClass("close");
    if (b.hasClass("lv1"))$swpCls($getCTag(a, "A"), "lv1o", "lv1c");
    else b.hasClass("lv3") && $swpCls($getCTag(a, "A"), "lv3o", "lv3c");
    $swpCls($getNES(a), "visible", "hidden");
    var d = $getNES(a, "expItem");
    d && $remCls(d, "tb");
    (typeof c !== "boolean" || c) && this.contentChanged()
  }
}, lotHdrMouseOn: function (a) {
  var b = this.getLotHdr(a);
  if (b)b.className += " lv1aLotHover";
  if ($hasCls(a, "lv1LotR"))a.style.textDecoration = "underline"
}, lotHdrMouseOut: function (a) {
  var b = this.getLotHdr(a);
  if (b)b.className = b.className.replace("lv1aLotHover", "");
  if ($hasCls(a, "lv1LotR"))a.style.textDecoration = "none"
}, getLotHdr: function (a) {
  return a && ($hasCls(a, "lv1Lot") || $hasCls(a, "lv1LotR"))
    ? a.parentNode
    : a && $hasCls(a.parentNode, "lv1Lot")
    ? a.parentNode.parentNode
    : null
}, contentChanged: function () {
  $(window).trigger("maincontentchanged", [false, null, true])
}};
var sp = new b365.Ui.Splash;
b365.Ui.HomeSplash = function () {
};
b365.Ui.HomeSplash.prototype = {setupHandlers: function () {
  var b = "sbMCN";
  this.setupBBHandlers();
  this.setupTabHandlers();
  this.setupAHHandlers();
  var a = this, c = $(".hsBnr");
  c.each(function (d, c) {
    $addHandler(c, "click", Function.createDelegate(a, a.onItemClick), false, true, b)
  })
}, setupBBHandlers: function () {
  var a = "sbMCN", b = $get("hsBB");
  $addHandler(b, "click", Function.createDelegate(this, this.onItemClick), false, true, a)
}, setupTabHandlers: function () {
  var a = "hsHL", b = $get("litetabs");
  $addHandler(b, "click", Function.createDelegate(this, this.onItemClick), false, true, a)
}, onItemClick: function (c) {
  var a = null;
  if (c)a = c.target
    ? c.target
    : c.srcElement;
  while (a && a.tagName !== "A")a = a.parentNode;
  if (a && a.tagName == "A")if ($hasCls(a, "clickpupelem_x"))c.preventDefault();
  else if (a.id.startsWith("15#")) {
    var b = a.id.split("#");
    trk && trk.send(c, EnumRegionID.Center, parseInt(b[1]), EnumEventsOrPageTypes.Click, EnumPodID.Splash);
    mf.req(parseInt(b[0]), parseInt(b[1]), b[2], b[3]);
    c.preventDefault()
  }
  else if (a.className.replace(" ", "").startsWith("bsa")) {
    if (a.id !== "") {
      var b = a.id.substring(3).split("_"), d = $getMT(a);
      bs.addBet(b[0] + (d != ""
        ? "|#mt=" + d + "#"
        : ""))
    }
    c.preventDefault()
  }
  else if (a.id.startsWith("bl") || a.id.startsWith("robil"))mf.ontapi(c);
  else if (a.id.startsWith("4#") || a.id.startsWith("11#") || a.id.startsWith("14#")) {
    var b = a.id.split("#");
    trk && trk.send(c, EnumRegionID.Center, b[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, b[2]);
    mf.req(parseInt(b[0]), parseInt(b[1]), b[2], "href=" + a.href);
    c.preventDefault()
  }
  else if (a.id.startsWith("0#")) {
    var b = a.id.split("#");
    trk && trk.send(c, EnumRegionID.Center, b[1], EnumEventsOrPageTypes.click, EnumPodID.Splash, -1, b[2]);
    mf.req(parseInt(b[0]), parseInt(b[1]), parseInt(b[2]), "href=" + a.href);
    c.preventDefault()
  }
  else if (a.id.startsWith("spl")) {
    var b = a.id.split(".");
    trk && trk.send(c, EnumRegionID.Center, b[1], EnumEventsOrPageTypes.Click, EnumPodID.Splash);
    mf.req(0, b[1]);
    c.preventDefault()
  }
}, setupAHHandlers: function () {
  try {
    this._openCls = "open";
    this._closeCls = "close";
    for (var g = $getElementsByClassName("AdhCnt"), i = g.length - 1, a = new String, f = new String, e = i; e >= 0; e--) {
      var c = g[e];
      if (c) {
        a = c.id;
        for (var d = c.getElementsByTagName("DIV"), h = d.length, b = 0; b < h; b++) {
          if (d[b].id.startsWith("Hlts-") > 0)f !== a &&
          $addHandler(d[b], "click", Function.createDelegate(this, this.onAdditHighLightItemClick), false, true, a);
          f = a
        }
      }
    }
  }
  catch (j) {
  }
}, onAdditHighLightItemClick: function (b) {
  var a = null;
  if (b)a = b.target
    ? b.target
    : b.srcElement;
  while (a && a.id.startsWith("Hlts-") === false) {
    if (a.tagName === "A" && a.className.replace(" ", "").startsWith("btn-odds-lnk")) {
      if (a.id !== "") {
        var e = a.id.substring(3).split("_"), d = $getMT(a);
        bs.addBet(e[0] + (d != ""
          ? "|#mt=" + d + "#"
          : ""))
      }
      b.preventDefault();
      break
    }
    else if (a.id.startsWith("cls-")) {
      var c = a.getElementsByTagName("H3");
      c && c.length > 0 && c[0].className.startsWith("exp") && this.expandCollapse(a);
      break
    }
    a = $parentNode(a)
  }
  b && b.preventDefault()
}, expandCollapse: function (d) {
  if (d) {
    var c = d;
    while (c && c.id.startsWith("Hlts-") === false)c = $parentNode(c)
  }
  var i = c, e = i.getElementsByTagName("DIV"), b = d.getElementsByTagName("A"), a = 0;
  if (b && b.length > 0) {
    var g = b[0].className.indexOf(this._openCls) > -1
      ? this._openCls
      : this._closeCls, h = b[0].className.indexOf(this._openCls) > -1
      ? this._closeCls
      : this._openCls;
    while (a < b.length) {
      $swpCls(b[a], g, h);
      a++
    }
  }
  a = 0;
  if (e && e.length > 0)while (a < e.length) {
    var f = e[a];
    if (f.id.startsWith(d.id) && f.id != d.id) {
      $tglEle(f);
      break
    }
    a++
  }
}};
var hs = new b365.Ui.HomeSplash;
b365.Ui.RHS = function () {
  this._b365AJAX = null;
  this._mainContent = null;
  this._n3rCnt = "n3rCnt";
  this._openCls = "open";
  this._closeCls = "close";
  this._RhsCnt = "#RhsCnt";
  this._strmVideo = "#embdStrm";
  this._strmVideoIP = "#embdStrmIP";
  this._matchLive = "#mLiveCnt";
  this._stmCnt = "#streamContainer";
  this._ajaxInstId = null;
  this._matchLiveAvailable = {};
  this._wgCookie = $bSys.getValueFromCookie("aps03", "ltwo", "");
  this._cfCookie = $bSys.getValueFromCookie("aps03", "cf", "N");
  this._hdCookie = $bSys.getValueFromCookie("aps03", "hd", "N");
  this._lngCookie = $bSys.getValueFromCookie("aps03", "lng", 1);
  this._ctyCookie = $bSys.getValueFromCookie("aps03", "ct", 197);
  this._cstCookie = $bSys.getValueFromCookie("aps03", "cst", 0);
  this._cgCookie = $bSys.getValueFromCookie("aps03", "cg", 0);
  this._tzCookie = $bSys.getValueFromCookie("aps03", "tzi", 1);
  this._oddsCookie = $bSys.getValueFromCookie("aps03", "oty", 1);
  this._tapiLink = "/lite/titleapi/tapi.aspx?";
  this._opId = 0;
  this._args = null;
  this._url = "#";
  this._TIMEOUT_RECOVER_DELAY = 5e3;
  var a = this;
  $(document).off("prematchcontentloaded.rhs").on("prematchcontentloaded.rhs", function (c, b) {
    a.prematchContentLoaded(b)
  });
  $(document).off("inplaycontentloaded.rhs").on("inplaycontentloaded.rhs", function (d, c, b) {
    a.inplayContentLoaded(c, b)
  })
};
b365.Ui.RHS.prototype = {pageInit: function () {
  this._mainContent = $("#sbRhs")
}, setupHandlers: function () {
  var d = "sbRhs", c = $(rhs._RhsCnt);
  if (c.length > 0)for (var b = c.getElementsByTagName("DIV"), e = b.length, a = 0; a < e; a++) {
    b[a].id.startsWith("Hlts-") > 0 && $addHandler(b[a], "click", Function.createDelegate(this, rhs.onHighLightItemClick), false, true, d);
    b[a].id === rhs._n3rCnt && $addHandler(b[a], "click", Function.createDelegate(this, rhs.onN3ItemClick), false, true, d);
    b[a].id === "rhsSplCnt" && sp.setupHandlers(b[a].id)
  }
}, isInplayMode: function () {
  return lhs.getCurrentMode() === "INPLAY"
}, prematchContentLoaded: function (a) {
  rhs.toggleToolbarText(a);
  $(rhs._strmVideoIP).children().remove();
  $(rhs._matchLive).children().remove();
  $(rhs._stmCnt).hide()
}, inplayContentLoaded: function (a) {
  $(rhs._strmVideo).children().remove();
  rhs.setupHandlers();
  rhs.toggleToolbarText(a)
}, toggleToolbarText: function (a) {
  if (!a)if (rhs.isInplayMode())$("#headerContainer").addClass("inplay").removeClass("prematch");
  else $("#headerContainer").addClass("prematch").removeClass("inplay")
}, contentChanged: function (a) {
  $raiseEvent($get("RHSWrapper"), "contentChanged", a)
}, req: function (b) {
  var a = arguments, l = new Date;
  this._ajaxInstId = l.getTime();
  var i = "", h = false;
  if (this._b365AJAX != null)this._b365AJAX = null;
  var m = b == 6, g = "&cid=" + a[1], j = a[1], c = "cache/api/rhs.aspx", f = null, e = a[1];
  if (e && !isNaN(e))if (cacheTokens[e] && cacheTokens[e][b])f = cacheTokens[e][b];
  else if (cacheTokens["*"] && cacheTokens["*"][b])f = cacheTokens["*"][b];
  if (f)c += "?clt=" + f + "&op=" + b;
  else c += "?op=" + b;
  for (var d = 0, k = a.length; d < k; d++)if ((a[d] + "").indexOf("href=") > -1) {
    i = a[d].substring(a[d].indexOf("href=") + 5);
    a[d] = "";
    arguments[d] = ""
  }
  else if ((a[d] + "").indexOf("RES") > -1) {
    h = true;
    a[d] = "";
    arguments[d] = ""
  }
  switch (b) {
    case 0:
    case 14:
      c += g + (a[2] == undefined
        ? ""
        : "&sec=" + a[2]) + (a[3] == undefined
        ? ""
        : "&hk=" + a[3]);
      break;
    case 12:
      c += "&evtid=" + a[1];
      break;
    case 30:
      c += g + (a[2] == undefined
        ? ""
        : "&sck=" + a[2]);
      break;
    case 31:
      c += g + (a[2] == undefined
        ? ""
        : "&sck=" + a[2])
  }
  if (c.length > 0) {
    c += (this._wgCookie.length > 0
      ? "&wg=" + this._wgCookie
      : "") + "&cf=" + this._cfCookie + "&lng=" + this._lngCookie + mf.getCountryQS(b, j, this._ctyCookie, this._cstCookie, this._cgCookie) + "&tzi=" +
      this._tzCookie + "&oty=" + this._oddsCookie;
    if (b == 0 || b == 30 || b == 31)c += "&hd=" + this._hdCookie;
    this._b365AJAX = new b365AJAX(c, Function.createDelegate(this, this.reqComplete), Function.createDelegate(this, this.reqError), 3e4,
      Function.createDelegate(this, this.reqTimeout), false, this._ajaxInstId, arguments);
    this._b365AJAX.Load()
  }
  return false
}, reqComplete: function (b, g) {
  var e = g[7], a, c = parseInt(e[0]);
  switch (c) {
    case 0:
    case 7:
    case 13:
    case 14:
    case 26:
    case 27:
    case 30:
      this.processContent(b, function (a) {
        rhsPC.processMarkup(a, c)
      });
      break;
    case 99:
      this.setMainContent(b, c);
      break;
    case 31:
      var f = "rhs_ph-" + e[2];
      a = $get(f);
      if (b.length > 0) {
        var d = document.createElement("DIV");
        d.innerHTML = b;
        a.parentNode.replaceChild(d.firstChild, a)
      }
      else a.parentNode.removeChild(a)
  }
  delete this._bet635AJAX;
  this._b365AJAX = null
}, reqTimeout: function (a) {
  this.displayError(tabletML.timeout, a);
  setTimeout("window.location.reload();", rhs._TIMEOUT_RECOVER_DELAY)
}, displayError: function (b, a) {
  if (a == this._ajaxInstId)this._b365AJAX = null
}, formatError: function (a) {
  return"<div id='eDiv'><p>" + a + "</p></div>"
}, processContent: function (a, d) {
  var c = [
    {tp: "asv", rx1: /<!--AssignJsVar\s(.*?)=(.*?)-->/g, rx2: /<!--AssignJsVar\s(.*?)=(.*?)-->/, fn: $setGlobal, ai: [1, 2]},
    {tp: "ccp", rx1: /<!--SetCachePolicy\((.*?)\)-->/g, rx2: /<!--SetCachePolicy\((.*?)\)-->/, fn: $setCachePolicy, ai: [1]},
    {tp: "css", rx1: /<!--CssRef=(.*?)-->/g, rx2: /<!--CssRef=(.*?)-->/, fn: $loadCSS, ai: [1]},
    {tp: "js", rx1: /<!--ScriptRef\s(.*?)=(.*?)-->/g, rx2: /<!--ScriptRef\s(.*?)=(.*?)-->/, fn: $loadScript, ai: [1, 2]},
    {tp: "cntldr", rx1: /<!--ContentReq\s(.*?) (.*?) (.*?)-->/g, rx2: /<!--ContentReq\s(.*?) (.*?) (.*?)-->/, fn: this.setUpReq, ai: [1, 2, 3]}
  ], e = this.removeDirectives(c, a), b = this;
  b.processDirectives("css", c, a, function () {
    b.processDirectives("asv", c, a, function () {
      b.processDirectives("ccp", c, a, function () {
        d && d.apply(b, [e]);
        b.processDirectives("js", c, a, function () {
          b.processDirectives("cntldr", c, a, null)
        })
      })
    })
  })
}, removeDirectives: function (c, e) {
  for (var a = e, b = 0; b < c.length; b++) {
    var d = a.match(c[b].rx1);
    if (d && d.length > 0)a = a.replace(c[b].rx1, "")
  }
  return a
}, processDirectives: function (n, b, m, k) {
  for (var c = [], d = null, a = 0; a < b.length; a++) {
    if (b[a].tp == n) {
      var g = m.match(b[a].rx1);
      if (g && g.length > 0)for (var h = 0; h < g.length; h++) {
        var i = g[h].match(b[a].rx2);
        if (i && i.length > b[a].ai.length) {
          for (var l = [], j = 0; j < b[a].ai.length; j++)l.push(i[b[a].ai[j]]);
          c.push({fn: b[a].fn, p: l})
        }
      }
    }
    if (c && c.length > 0)for (var e = k, f = c.length - 1; f >= 0; f--) {
      c[f].p.push(e);
      e = function (a) {
        return function () {
          c[a].fn.apply(null, c[a].p)
        }
      }(f)
    }
  }
  if (e)d = e;
  if (!d)d = k;
  d && d.apply(null)
}, scrollToHdr: function () {
  window.scrollTo(0, 0)
}, setUpReq: function (d, c, b, a) {
  rhs.req(parseInt(d), c, b);
  a && a()
}};
var rhs = new b365.Ui.RHS;
Sys.Application.add_init(Function.createDelegate(rhs, rhs.pageInit));
b365.Ui.ContentProcessor = function () {
  this._PreviousContent = "";
  this._PreviousOperatorId = "";
  this._mainContent = null
};
b365.Ui.ContentProcessor.prototype = {processMarkup: function (a, c) {
  var b = mf._isAutoRefresh;
  if (this._PreviousOperatorId == c && this._PreviousContent == a)return;
  if (c == 14)a = (new b365.Ui.TeamkitImage).applyTeamKitImage(a);
  this._mainContent = $("#sbMCN")[0];
  this._PreviousOperatorId = c;
  this._PreviousContent = a;
  !mf._isAutoRefresh && !mf._isRaceOff && mf.clearEmbddedStrm($("#embdStrm")[0], false);
  mf._isRaceOff = false;
  a = this.extractResponse(a, "<!--lhsbegin-->", "<!--lhsend-->", $("#sbLMN")[0]);
  a = this.extractResponse(a, "<!--rhsbegin-->", "<!--rhsend-->", $("#sbRhs")[0], function () {
    rhs.setupHandlers()
  });
  a = this.extractResponse(a, "<!--hsplcntbegin-->", "<!--hsplcntend-->", this._mainContent, function () {
    sp.setupHandlers();
    hs.setupHandlers();
    cp.setupHandlers();
    cp.onLoad(undefined, undefined, undefined, b);
    mf.processOpenClose($("#hsCnt")[0], sp, false)
  });
  a = this.extractResponse(a, "<!--splcntbegin-->", "<!--splcntend-->", this._mainContent, function () {
    sp.setupHandlers();
    cp.setupHandlers();
    mf.processOpenClose($("#cpn")[0], sp, false);
    cp.onLoad(undefined, undefined, undefined, b)
  });
  this.extractResponse(a, "<!--cpnbegin-->", "<!--cpnend-->", this._mainContent, function () {
    cp.setupHandlers();
    mf.processOpenClose($("#cpn")[0], cp, false);
    cp.onLoad(undefined, undefined, undefined, b)
  });
  this.extractResponse(a, "<!--hsrchbegin-->", "<!--hsrchend-->", this._mainContent, function () {
    mf.addChdrHandlers();
    mf.addHrseSrchHandlers()
  })
}, extractResponse: function (a, g, h, d, b) {
  var e = null, c = null;
  if (a) {
    var f = a.indexOf(g, 0), i = a.lastIndexOf(h);
    if (f != -1) {
      e = a.substring(f + g.length, i);
      c = a.substring(0, f) + a.substring(i + h.length);
      if (d) {
        $removeVolatileHandlers(d.id);
        d.innerHTML = e;
        b && b()
      }
      else b && b(e)
    }
    else c = a
  }
  return c
}, setMainContent: function (a, b, c) {
  if (this._PreviousOperatorId == b && this._PreviousContent == a && !c)return;
  this._PreviousOperatorId = b;
  this._PreviousContent = a;
  this._mainContent = this._mainContent || $("#sbMCN")[0];
  this._mainContent.innerHTML = a
}};
var rhsPC = new b365.Ui.ContentProcessor, mfPC = new b365.Ui.ContentProcessor;
var CouponKey = function () {
  "use strict";
  var d = window.jQuery, b;

  function a(a) {
    var b = 0;
    if (a && a.length > 0 && d.isNumeric(a))b = parseInt(a, 10);
    return b
  }

  function c(c) {
    this.classification = 0;
    this.c1Id = 0;
    this.c1IdTable = 0;
    this.c2Id = 0;
    this.c2IdTable = 0;
    this.c3Id = 0;
    this.c3IdTable = 0;
    this.inplay = 0;
    this.marketGroupId = 0;
    this.plbtId = 0;
    this.pageTemplateId = 0;
    this.fixture = 0;
    this.sectionId = 0;
    if (c) {
      c = c.toString().replace(/--/g, "-");
      var b = c.split("-");
      if (b)if (b.length > 14) {
        this.classification = a(b[0]);
        this.c1Id = a(b[1]);
        this.c1IdTable = a(b[2]);
        this.c2Id = a(b[3]);
        this.c2IdTable = a(b[4]);
        this.c3Id = a(b[5]);
        this.c3IdTable = a(b[6]);
        this.inplay = a(b[7]);
        this.marketGroupId = a(b[9]);
        this.plbtId = a(b[10]);
        this.pageTemplateId = a(b[11]);
        this.fixture = a(b[13]);
        this.sectionId = a(b[14])
      }
    }
  }

  b = c.prototype;
  b.toPushFixtureId = function (a, b) {
    return this.c1Id.toString() + this.c1IdTable.toString() + this.c2Id.toString() + this.c2IdTable.toString() + "C" + this.classification + "_" + a + "_" + b
  };
  b.matchLiveFixtureId = function (a, b) {
    return this.c1Id.toString() + this.c1IdTable.toString() + this.c2Id.toString() + this.c2IdTable.toString() + "M_" + a + "_" + b
  };
  b.isValid = function () {
    return this.c1Id !== 0 && this.c1IdTable !== 0 && this.c2Id !== 0 && +this.c2IdTable !== 0 && this.classification !== 0
  };
  return c
}();
var $bsCfDlg = null, _liteEventAdapter = null, _tabletEventAdapter = null, _dialog = null, $isKeyPadSupported = null, $isRefreshInhibitingPopUpDisplayed = null, $isAutoRefresh = null, $displayHelper = null, $betSlipPopUpInfoMessageController = null, ipoc = null, MyBetsJS = null, storage = null, bsContext = null, betSlipController = null, orch = null, sportsUIController = null, cp;
$(document).ready(function () {
  orch = new orientationChangeHandler;
  $isKeyPadSupported = function () {
    if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      var a = 4;
      if (/OS [2-3]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent))a = 3;
      else if (/CPU like Mac OS X/i.test(navigator.userAgent))a = 1
    }
    return typeof a == "undefined" || a >= 4
  };
  $isRefreshInhibitingPopUpDisplayed = function () {
    return $("#ttDivPersist").hasClass("no-ar")
  };
  $displayHelper = new TabletDisplayHelper;
  jQuery.fn.outerHTML = function (a) {
    return a
      ? this.before(a).remove()
      : jQuery("<p>").append(this.eq(0).clone()).html()
  };
  jQuery.fn.cssNumber = function (b) {
    var a = parseInt(this.css(b), 10);
    return isNaN(a)
      ? 0
      : a
  };
  $isAutoRefresh = function () {
    return mf._isAutoRefresh
  };
  var j = new MenuController, b = new PopupController, e = new b365.Ui.PrematchInplayChangeEventDespatcher;
  e.Initialise();
  bsContext = {IsAuthenticated: (new b365.Ui.Helpers.UserAuthentication).isAuthenticated, ShowLoginPage: (new b365.Ui.Helpers.UserAuthentication).showLoginPopup, IsKeyPadSupported: $isKeyPadSupported, JoinNow: (new b365.Ui.Tapi.JoinNowLauncher).launch, Deposit: function (a) {
    (new b365.Ui.DepositInitiator(a.isQuickDeposit, a.totalStake)).initiate()
  }, IsPortraitMode: $displayHelper.isPortraitMode, IsPrematch: $displayHelper.isPrematch, ShowConfirmation: function (a) {
    (new b365.Ui.Helpers.ShowConfirmationHandler(a)).handle()
  }, ShowDialog: function (a) {
    (new b365.Ui.Helpers.ShowDialogHandler(a)).handle()
  }, ShowTooltip: function (a) {
    (new b365.Ui.Helpers.ShowTooltipHandler(a)).handle(a)
  }, HideTooltip: function () {
    (new b365.Ui.Helpers.ShowTooltipHandler).hideToolTip()
  }, BetSource: function () {
    return"Lite"
  }, ShowPleaseWaitSpinner: function () {
    mf.showPleaseWait()
  }, HidePleaseWaitSpinner: function () {
    mf.hidePws()
  }, RefreshUserBalance: function () {
    return true
  }, IsoCode: function () {
    return $("#isoCode").text()
  }, ItemsRemoved: function (a) {
    sportsUIController && sportsUIController.itemsRemoved(a)
  }};
  var i = new AccountController, a = new LayoutController;
  betSlipController = new BetSlipController(bs, bsContext);
  var h = new LottoBetSlipController, g = new MainContentEventHandler, d = new b365.Ui.Coupon.BetSlipSyncronizerEventAttacher(bs);
  d.attachHandlers();
  var c = new b365.Live.Controller;
  ipoc = new b365.Ui.InplayOverview.Controller(c);
  $betSlipPopUpInfoMessageController = new b365.Ui.Betslip.BetSlipPopUpMessageController(bsContext);
  cp = new b365.Ui.Coupon(betSlipController);
  storage = new b365.Ui.Storage.Accessor;
  (new b365.Ui.Betslip.ControllerEventAttacher(bs, betSlipController)).attach();
  betSlipController.initialise();
  betSlipController.refreshBetslip();
  var f = new VideoStreamingController;
  _liteEventAdapter = new LiteEventAdapter(a, mf, betSlipController, h, lgh, b);
  _liteEventAdapter.attachHandlers();
  _tabletEventAdapter = new TabletEventAdapter(a, j, b, cp, i, betSlipController, sp, g, f);
  _tabletEventAdapter.attachHandlers();
  sportsUIController = new SportsUIController;
  sportsUIController.initialise(document.getElementById("sbMCN"), sProps, betSlipController, c);
  betSlipController.OnBetslipContentLoaded();
  $(".customDropdown").off("touchmove.customdropdown").on("touchmove.customdropdown", function (a) {
    a.preventDefault()
  })
});
(function () {
  Type.registerNamespace("b365");
  b365.Data = {COUPON_OP_ID: 4, INPLAY_OP_ID: 14, INPLAY_DIARY_OP_ID: 13, BETSLIP_LOAD_OP_ID: 24, HOME_CID: 9999, INPLAY_CID: 9998, LOTTO_CID: 6, ODDSTYPEID_FRACTIONAL: 1, ODDSTYPEID_DECIMAL: 2, ODDSTYPEID_AMERICAN: 3, DEFAULT_AUDIO_QUALITY: "None", AUDIO_QUALITY_LOW: "Lo", AUDIO_QUALITY_HIGH: "Hi", COUPON_KEY_OVERVIEW_MODE: 4}
})();
TabletDisplayHelper = function () {
  this._collapseLHS = true;
  this._portraitMode = false;
  this._preMatch = false;
  this._leftMenuInTextMode = false;
  if (lhs.getCurrentMode() == "SPORTS")this._preMatch = true;
  else this._preMatch = false
};
TabletDisplayHelper.prototype = {isPortraitMode: function () {
  return this._portraitMode
}, setLandscapeMode: function () {
  var f = $(".Username", "#MyAccountPanel"), g = $("#membersIcon",
    "#MyAccountPanel"), a = $("#RHSWrapper"), c = $("#LHSWrapper"), e = $("#MiddleWrapper"), d = $("#headerContainer"), b = $(".betSlipPopupHeader", d);
  if (f.hasClass("notshown")) {
    f.removeClass("notshown");
    g.addClass("notshown")
  }
  a.attr("data-orientation") !== "L" && a.attr("data-orientation", "L");
  e.attr("data-orientation") !== "L" && e.attr("data-orientation", "L");
  c.attr("data-orientation") !== "L" && c.attr("data-orientation", "L");
  b.attr("data-orientation") !== "L" && b.attr("data-orientation", "L");
  !$("#showHideLHSMenu").hasClass("hidden") && $("#showHideLHSMenu").addClass("hidden");
  if (!c.hasClass("showtext")) {
    c.addClass("showtext");
    this._leftMenuInTextMode = true
  }
  a.hasClass("notshown") && a.removeClass("notshown");
  $(".betslipWrapper, #keyPad").removeClass("overlay");
  if (this._preMatch) {
    !a.hasClass("prematch") && a.addClass("prematch").removeClass("inplay");
    !$("#showHideLHSMenu").hasClass("hidden") && $("#showHideLHSMenu").removeClass("showicon").addClass("hidden");
    d.hasClass("showlhsicon") && d.removeClass("showlhsicon");
    if (window.MyBetsController.isInitialised())window.MyBetsController.prematch(this._portraitMode);
    else b.hasClass("notshown") && b.removeClass("notshown")
  }
  else {
    !a.hasClass("inplay") && a.removeClass("prematch").addClass("inplay");
    if (window.MyBetsController.isInitialised())window.MyBetsController.inPlay(this._portraitMode);
    else!b.hasClass("notshown") && b.addClass("notshown")
  }
  this.setMiddleWrapperWidth();
  return true
}, setPortraitMode: function () {
  var f = $(".Username", "#MyAccountPanel"), g = $("#membersIcon",
    "#MyAccountPanel"), a = $("#RHSWrapper"), c = $("#LHSWrapper"), e = $("#MiddleWrapper"), d = $("#headerContainer"), b = $(".betSlipPopupHeader", d);
  if (!f.hasClass("notshown")) {
    f.addClass("notshown");
    g.removeClass("notshown")
  }
  a.attr("data-orientation") !== "P" && a.attr("data-orientation", "P");
  e.attr("data-orientation") !== "P" && e.attr("data-orientation", "P");
  c.attr("data-orientation") !== "P" && c.attr("data-orientation", "P");
  b.attr("data-orientation") !== "P" && b.attr("data-orientation", "P");
  if (this._collapseLHS == true && c.hasClass("showtext")) {
    c.removeClass("showtext");
    $("#showHideLHSMenu").hasClass("hidden") && $("#showHideLHSMenu").removeClass("hidden");
    this._leftMenuInTextMode = false
  }
  if (this._preMatch) {
    !a.hasClass("prematch") && a.addClass("prematch").removeClass("inplay").addClass("notshown");
    if (this._collapseLHS == true) {
      !$("#showHideLHSMenu").hasClass("showicon") && $("#showHideLHSMenu").addClass("showicon");
      !d.hasClass("showlhsicon") && d.addClass("showlhsicon")
    }
    if (window.MyBetsController.isInitialised())window.MyBetsController.prematch(this._portraitMode);
    else b.hasClass("notshown") && b.removeClass("notshown");
    !$(".betslipWrapper, #keyPad").hasClass("overlay") && $(".betslipWrapper, #keyPad").addClass("overlay")
  }
  else {
    !a.hasClass("inplay") && a.removeClass("prematch").addClass("inplay");
    a.hasClass("notshown") && a.removeClass("notshown");
    $("#showHideLHSMenu").hasClass("showicon") && $("#showHideLHSMenu").removeClass("showicon").addClass("hidden");
    if (window.MyBetsController.isInitialised())window.MyBetsController.inPlay(this._portraitMode);
    else!b.hasClass("notshown") && b.addClass("notshown");
    $(".betslipWrapper, #keyPad").hasClass("overlay") && $(".betslipWrapper, #keyPad").removeClass("overlay")
  }
  this.setMiddleWrapperWidth();
  this.closeSubMenus();
  return true
}, closeSubMenus: function () {
  var a = $(".ddop", "#sbLMN");
  if (a.length > 0) {
    a.removeClass("ddop").addClass("ddcl");
    var b = $("ul", a);
    b.length > 0 && b.removeClass("hidden").addClass("hidden")
  }
}, canShowLhsMenuAsIcon: function () {
  return this._preMatch && this._portraitMode
}, lhsMenuInTextMode: function () {
  return this._leftMenuInTextMode
}, isPrematch: function () {
  return this._preMatch
}, setPortraitLandscapeMode: function (a) {
  if (typeof a !== "undefined")this._preMatch = a;
  var b = $(window).outerWidth(), c = $(window).outerHeight();
  if (b > c) {
    this._portraitMode = false;
    this.setLandscapeMode()
  }
  else {
    this._portraitMode = true;
    this.setPortraitMode()
  }
  return true
}, setDisplayLayout: function (a, b) {
  if (b !== false)return false;
  var c = $(window).outerWidth(), d = $(window).outerHeight();
  if (c < d) {
    this._portraitMode = true;
    this.canShowLhsMenuAsIcon() && this._collapseLHS == true && lhs.showLHSMenuAsIcons(a)
  }
  else {
    this._portraitMode = false;
    lhs.showLHSMenuAsText(a)
  }
  lhs.showSubMenu();
  carousel !== null && resizeCarousel();
  return true
}, setCollapseLHS: function (a) {
  this._collapseLHS = a
}, setMiddleWrapperWidth: function () {
  var a = $("#MiddleWrapper"), e = $(window).width(), c = +$("#LHSWrapper:visible").not(".inplay").outerWidth(true), f = this._preMatch && this._portraitMode
    ? 0
    : +$("#RHSWrapper:visible").outerWidth(true), d = e - c - f, b = false;
  if (!(a.css("left") === c + "px")) {
    a.css("left", c + "px");
    b = true
  }
  if (!(a.width() === d)) {
    a.width(d);
    b = true
  }
  return b
}};
function LayoutController() {
  this._rfAutoRefresh = null;
  this._showingPreMatch = false;
  this._showingInplay = false;
  this._reSize = function (a, c, b) {
    $displayHelper.setMiddleWrapperWidth();
    !a && $("#sbTMN-rhs").find(".customDropdown").hide();
    $("#sbMCN").find(".filterDropdown").hide();
    resizeCarousel();
    this._resizeContent();
    if (Modernizr.sectionscroll) {
      this._resizeRightHandSide(a);
      this._resizeLeftHandSide();
      !a && c != 29 && !b && $("#MiddleScroller").scrollTop(0)
    }
    else this._resizeForFullPage()
  };
  this._resizeForFullPage = function () {
    var j = $(".tablet-scroll-content-area"), b, k = $("#sbFT"), f = $("#LHSWrapper"), h = $("#RHSScroller"), g = $("#RHSMyBetsScroller"), e = 0, i = 84, d = +k.outerHeight(true), a = 0, c = $displayHelper.isPrematch() &&
      $displayHelper.isPortraitMode();
    j.each(function () {
      var c = $(this), b;
      if (c.is(":visible")) {
        b = +c.outerHeight(true);
        if (b > a)a = b
      }
    });
    if (c) {
      h.addClass("fullPageScroll").height("");
      g.addClass("fullPageScroll").height("")
    }
    else {
      h.removeClass("fullPageScroll");
      g.removeClass("fullPageScroll")
    }
    b = c
      ? $(".tablet-scroll-area:not('#RHSScroller')")
      : $(".tablet-scroll-area");
    b.height(e + a + d);
    b = c
      ? $(".tablet-scroll-area:not('#RHSMyBetsScroller')")
      : $(".tablet-scroll-area");
    b.height(e + a + d);
    if (f.hasClass("inplay"))f.height(a);
    else f.height(e + a + d + i)
  };
  this._resizeContent = function () {
    var b = document.body.clientWidth, c = +$("#LHSWrapper:visible").outerWidth(), d = $("#RHSWrapper").outerWidth(), a = b - c - d + "px";
    $(".resize, .resize table").css("width", a).css("max-width", a);
    this._doDynamicSizing()
  };
  this._doDynamicSizing = function () {
    typeof cp !== "undefined" && cp.doDynamicSizing()
  };
  this._resizeRightHandSide = function (b) {
    if (typeof b !== "undefined" && !b) {
      var a = document.body.clientHeight, c = $("#RHSScroller").height("auto"), d = $("#RHSMyBetsScroller").height("auto");
      if ($displayHelper.isPortraitMode() && $displayHelper.isPrematch())$("#mbDiv").css("min-height", "");
      else {
        c < a && $("#sbRMN").css("min-height", a + "px");
        d < a && $("#mbDiv").css("min-height", a + "px")
      }
    }
  };
  this._resizeLeftHandSide = function () {
    if ($("#LHSWrapper").hasClass("inplay")) {
      var a = document.body.clientHeight, b = a - $("#HeaderWrapperTop").outerHeight() - $("#HeaderWrapperBottom").outerHeight() - 20;
      $("#LHSWrapper").height(b)
    }
  };
  this._setLayoutMode = function (a) {
    this._setLHSMode(a);
    if (a == "INPLAY")$("#RHSWrapper").addClass("inplay").removeClass("prematch");
    else $("#RHSWrapper").removeClass("inplay").addClass("prematch")
  };
  this._setLHSMode = function (d) {
    var a = $("#LHSWrapper");
    if (d == "INPLAY") {
      a.addClass("inplay icnnib fontIcon");
      var b = document.body.clientHeight, c = b - $("#HeaderWrapperTop").outerHeight() - $("#HeaderWrapperBottom").outerHeight() - 20;
      a.height(c);
      $displayHelper.setPortraitLandscapeMode(false)
    }
    else {
      a.removeClass("inplay icnnib fontIcon");
      a.show();
      a.height("");
      $displayHelper.setPortraitLandscapeMode(true)
    }
    $("#LHSScroller").scrollTop(0)
  };
  this._showInplayLHS = function () {
    $("#LHSWrapper").show();
    this._showingPreMatch = false;
    var a = this;
    $(".GlobalWrapper").on("click.inplaymenu", a._hideInplayLHS);
    this._rfAutoRefresh = new b365.Ui.AutoRefreshController;
    this._rfAutoRefresh.pauseRF();
    !Modernizr.sectionscroll && this._resizeForFullPage()
  };
  this._hideInplayLHS = function () {
    $("#LHSWrapper").hide();
    this._rfAutoRefresh != null && this._rfAutoRefresh.restartRF();
    $(".GlobalWrapper").off("click.inplaymenu")
  };
  this._toggleInplayEventListMenu = function () {
    if ($("#LHSWrapper").is(":visible"))this._hideInplayLHS();
    else this._showInplayLHS()
  };
  this._attachTouchEvents = function () {
    var a = this;
    $("#sbMCN .ti").on("click", function () {
      var c = 200;
      if (!$(this).find("a.ti").length > 0) {
        var b = $(this).closest(".ti");
        !$(event.target).hasClass("clickpupelem_table") && b.each(a._addTouchIndicator);
        b.hasClass("tti") && b.delay(c).queue(a._removeTouchEvents);
        !b.hasClass("tis") && b.parents(".ti").each(a._addTouchIndicator)
      }
    });
    $("#sbLMN .ti").on("click", function () {
      $("#sbLMN .ti.selected").removeClass("selected");
      $(this).addClass("selected")
    });
    $("#cntAct .ti").on("click", function () {
      $("#cntAct .ti.Sel").removeClass("selected").removeClass("Sel");
      $(this).addClass("selected")
    })
  };
  this._addTouchIndicator = function () {
    $(this).addClass("selected");
    $(this).children("a[class*='btn-odds']").each(function () {
      var a = $(this).attr("id");
      if (a) {
        a = "#" + a.escapeSelector();
        $(a).closest(".ti").addClass("selected")
      }
    })
  };
  this._removeTouchEvents = function () {
    $(this).removeClass("selected").parents(".ti");
    $(this).parents(".ti").removeClass("selected");
    $(this).dequeue()
  };
  this._cleanUpContent = function () {
    if ($("#cpn").length > 0) {
      $(".arch-video-cnt").css("display", "none");
      $(".btn-arch-video").css("display", "none")
    }
    ($("#cpn-race").length > 0 || $("#cpn-pot").length > 0) && $(".btn-video").css("display", "none");
    $(".btn-virtual-stream").css("display", "none");
    mf._lngCookie === "20" && $(":header").filter(function () {
      return $(this).css("fontFamily") === "HelveticaNeue-CondensedBold, Helvetica"
    }).css("text-transform", "none");
    $("#hsHL").find("#litetabs .tabItem").length >= 4 && $("#hsHL").find("#litetabs .last a").css("border-right", "none")
  }
}
LayoutController.prototype.onInit = function () {
  gopts.enableThreeWayEleDynaResize = false;
  gopts.pleaseWaitOverlayDelay = 10
};
LayoutController.prototype.onWindowResize = function () {
  lhs.getCurrentMode() == "INPLAY" && this._hideInplayLHS();
  this._reSize(false)
};
LayoutController.prototype.onLoad = function (d, a, c, b) {
  this._reSize(a, c, b);
  $displayHelper.setDisplayLayout(d, a);
  $(document).trigger("resizelayout", [a, c, b])
};
LayoutController.prototype.onAllMarketsClick = function (a) {
  this._toggleInplayEventListMenu();
  a.stopImmediatePropagation();
  a.preventDefault()
};
LayoutController.prototype.onLHSItemClick = function (a) {
  if (a.tagName == "SPAN")a = a.parentNode;
  $(a).hasClass("subMHdr") || $(a).hasClass("subMHdrC")
};
LayoutController.prototype.onMainContentClick = function (c) {
  $("#LHSWrapper").hasClass("inplay") && this._hideInplayLHS();
  var a = c.target;
  if (a) {
    if (a.tagName == "SPAN")a = $(a).parent().get(0);
    if (a && a.tagName == "A" && $(a).hasClass("flt")) {
      $("#sbMCN .filterDropdown").hide();
      var b = $(a).prev().get(0), d = $(a).parent().get(0);
      if ($(b).hasClass("fltChnCnt")) {
        $(b).css("left", "");
        $(b).css("right", 2)
      }
      else {
        $(b).css("left", $(d).offset().left + 1);
        $(b).css("right", "")
      }
      $(b).toggle();
      c.preventDefault();
      c.stopPropagation()
    }
  }
};
LayoutController.prototype.CleanContents = function () {
  this._cleanUpContent()
};
LayoutController.prototype.onContentLoaded = function (b) {
  !b && createCarousel();
  if (Modernizr.horizontalscroll) {
    var a = $(".tableScroller");
    a.length > 0 && a.scrollLeft(+a.find("a.selected").position().left)
  }
  else $(".tableScroller").pageScroller({showSelected: !b, itemsSelector: "a", itemParentSelector: "div"});
  this._cleanUpContent();
  this._resizeContent()
};
LayoutController.prototype.attachTouchingEvents = function () {
  this._attachTouchEvents()
};
LayoutController.prototype.onPartialContentLoaded = function () {
  this._cleanUpContent()
};
LayoutController.prototype.onPreMatchContentLoadStarted = function () {
  this._showingPreMatch = true;
  $("#lhsAllMarkets").hide();
  $("#showHideLHSMenu").removeClass("hidden");
  if (!$displayHelper.isPortraitMode()) {
    $("#showHideLHSMenu").removeClass("showicon").addClass("hidden");
    $("#headerContainer").removeClass("showlhsicon")
  }
};
LayoutController.prototype.onPreMatchContentLoaded = function (a) {
  var b = typeof a.autoRefresh == "undefined"
    ? false
    : a.autoRefresh;
  $("#lhsAllMarkets").hide();
  $("#showHideLHSMenu").removeClass("hidden");
  if (!$displayHelper.isPortraitMode()) {
    $("#showHideLHSMenu").removeClass("showicon").addClass("hidden");
    $("#headerContainer").removeClass("showlhsicon")
  }
  this._showingInplay = false;
  if ($("#LHSWrapper").hasClass("inplay")) {
    this._setLayoutMode("PREMATCH");
    this._reSize(b);
    carousel && carousel.refreshSize()
  }
};
LayoutController.prototype.onInplayContentLoaded = function (a) {
  var b = typeof a.autoRefresh == "undefined"
    ? false
    : a.autoRefresh;
  if (!b) {
    $("#lhsAllMarkets").show();
    $("#showHideLHSMenu").addClass("hidden");
    $("#headerContainer").removeClass("showlhsicon");
    if (!$("#LHSWrapper").hasClass("inplay")) {
      this._setLayoutMode("INPLAY");
      this._reSize(b)
    }
    this._hideInplayLHS()
  }
  this._showingPreMatch = false
};
LayoutController.prototype.onMiddleScrollStart = function () {
  clearCarouselTimer()
};
LayoutController.prototype.onMiddleScrollEnd = function () {
  setCarouselTimer()
};
function MenuController() {
  var a = this;
  $(document).off("lhsscrollmove").on("lhsscrollmove", $.proxy(this.lhsScrollStart, this));
  $(document).off("midscrollstart").on("midscrollstart", $.proxy(this.midScrollStart, this));
  $(document).off("lhsitemclick").on("lhsitemclick", $.proxy(this.lhsItemClick, this));
  $("body").on("click.menucontroller", function () {
    a._hideMenu()
  });
  $("#ulTopAppMenu").on("click.menucontroller", function (b) {
    a.onMenuClick(b)
  });
  this._setMenuId = function (b) {
    var a = b;
    switch (a) {
      case"languageBtn":
        a = "languageDropdown";
        break;
      case"oddsDisplayBtn":
        a = "oddsPopup";
        break;
      case"helpBtn":
        a = "smap-s1";
        break;
      case"promotionsBtn":
        a = "smap-s2";
        break;
      case"audiostreamingBtn":
        a = "aud-premat-dd";
        break;
      case"MyAccountPanel":
        a = "myAccountPopUp"
    }
    return a
  };
  this._hideMenu = function () {
    $("#sbTMN-rhs .custDDFinder").hide();
    $("#sbMCN .filterDropdown").hide()
  };
  typeof lhs !== "undefined" && lhs.addOnItemClick(this._hideMenu, this);
  this._toggleMenu = function (c) {
    var b = this._setMenuId(c[0].id);
    $("#sbTMN-rhs .custDDFinder:not(#" + b + ")").hide();
    var e = c.offset(), d = $("#" + b), a = e.left + c.width() / 2 - d.width() / 2;
    a = a < 0
      ? 0
      : a;
    if (b == "myAccountPopUp" && $displayHelper.isPortraitMode())a = a - 7;
    d.css("left", a);
    d.toggle()
  }
}
MenuController.prototype.lhsItemClick = function (b, a) {
  $(document).trigger("lhsshowpulloutmenu", a)
};
MenuController.prototype.lhsScrollStart = function () {
  $(document).trigger("lhshidelhspulloutmenu")
};
MenuController.prototype.midScrollStart = function () {
  $(document).trigger("lhshidelhspulloutmenu")
};
MenuController.prototype.onMenuClick = function (a) {
  a.preventDefault();
  a.stopPropagation();
  var b = $(a.target).hasClass("topAppMenuLink")
    ? $(a.target)
    : $(a.target).parents(".topAppMenuLink");
  if (this._setMenuId(b[0].id) == "aud-premat-dd")(new b365.Ui.AudioStreamingRequestHandler).getMenuData(0);
  else this._toggleMenu(b);
  return false
};
function PopupController() {
  this._betSlipPopUp = function (a) {
    return $(a).hasClass("bs-tt") || $(a).parents().hasClass("bs-tt")
  };
  this._betSlipStakeLinePopUp = function (a) {
    return $(a).hasClass("bs-stktt") || $(a).parents().hasClass("bs-stktt")
  };
  this._showLottoPopup = function () {
    return typeof lotto !== "undefined" && lotto.gotMessage()
  };
  this._showParlayPopup = function () {
    return typeof pt !== "undefined" && pt.hasMsgsInQue()
  };
  this._showCouponPopup = function () {
    return typeof cp !== "undefined" && cp.hasMsgsInQue()
  };
  this._showPhoneOnlyPopup = function (a) {
    return $(a).hasClass("phoneonly")
  };
  this._showJustShowThePopup = function (a) {
    return $(a).hasClass("justshow")
  };
  this._autoRefreshCont = null;
  this._clickEle = null;
  this._show = function (b, j, a, e) {
    if (!$(b).is(":visible"))return false;
    var c = $("#ttDivPersist");
    c.removeClass("ttHidden");
    this._clearPopUpShowingClass();
    $(b).hasClass("stat-icon") && !$(c).hasClass("stat-icon-popup") && $(c).addClass("stat-icon-popup");
    $(b).addClass("showingpupelem");
    if (!a)a = 300;
    if (!$.isNumeric(a))a = parseInt(a.replace(/px/g, "").replace(/;/g, ""));
    $(c).find(".cnt").html(j).css("max-width", a).css("width", a);
    if (!e)e = 24;
    var f = $(b).offset();
    e = Number(String(e).replace(/px/g, ""));
    var h = $(b).outerHeight(true);
    if (h)e = h;
    var k = f.top + e, d = f.left + $(b).outerWidth(true) / 2 - a / 2 - $(b).css("margin-left").replace(/px/g, "");
    if (d + a > window.innerWidth) {
      var i = d + a + 22 - window.innerWidth;
      d = d - i;
      $("div.callOut").addClass("noLeftMargin");
      $("div.callOut").css("left", a / 2 - (window.innerWidth - f.left) / 2);
      c.css("width", "auto")
    }
    else if (d < 0) {
      $("div.callOut").css("left", $(b).offset().left + 30);
      d = 0;
      c.css("width", "auto")
    }
    else c.css("max-width", a).css("width", a);
    c.css("top", k).css("left", d);
    !this._betSlipPopUp(b) && !this._betSlipStakeLinePopUp(b) && $(c).addClass("no-ar");
    c.fadeIn();
    (new b365.Ui.AutoRefreshController).pauseRF();
    var g = this;
    $("#RHSScroller").off("scroll").on("scroll", function () {
      g.HidePopup()
    });
    $("#RHSScroller").off("touchmove").on("touchmove", function () {
      g.HidePopup()
    })
  };
  this._clearPopUpShowingClass = function () {
    $(".showingpupelem").removeClass("showingpupelem")
  };
  this._getContent = function (b) {
    var a = "";
    if (this._betSlipPopUp(b))a = (new b365.Ui.Betslip.ToolTipHtmlBuilder(b)).getHtml();
    else if (this._betSlipStakeLinePopUp(b))a = (new b365.Ui.Betslip.StakeToolTipHtmlBuilder(b)).getStakeHtml();
    else if (this._showLottoPopup())a = lotto.getLottoPopupHTML();
    else if (this._showParlayPopup())a = pt.getPendingMsgHTML();
    else if (this._showCouponPopup())a = cp.getPendingMsgHTML();
    else if (this._showPhoneOnlyPopup(b))a = (new b365.Ui.PhoneOnlyHtmlBuilder).getHtml();
    else if (this._showJustShowThePopup(b))a = $("#ttDivPersist").find(".cnt").html();
    else {
      var c = $(b).next(".puptext");
      if (c)a = c.html()
    }
    return a
  };
  this._getMaxWidth = function (b) {
    var a = 280;
    if (this._betSlipPopUp(b))a = 150;
    else if (this._betSlipStakeLinePopUp(b))a = 170;
    else if (this._showLottoPopup() || this._showParlayPopup() || this._showCouponPopup())a = 210;
    return a
  };
  this._isPopUp = function (a) {
    return $(a).hasClass("hoverpupelem") || $(a).hasClass("clickpupelem") || $(a).hasClass("clickpupelem_x") || this._betSlipPopUp(a) ||
      this._betSlipStakeLinePopUp(a) || this._showLottoPopup() || typeof pt !== "undefined" && pt.hasMsgsInQue() ||
      typeof cp !== "undefined" && cp.hasMsgsInQue()
  }
}
PopupController.prototype.onBodyClick = function (b) {
  var c = 0, a = b.target;
  while (a && !this._isPopUp(a) && c < 2) {
    a = a.parentNode;
    c++
  }
  this._clickEle = a;
  this.ProcessPopups(b, a)
};
PopupController.prototype.ProcessPopups = function (c, a) {
  if (!a)a = this._clickEle;
  this.HidePopup();
  this._clickEle = a;
  if ($(a).length != 0) {
    var d = $(a).length != 0 && $(a).hasClass("showingpupelem");
    if (this._isPopUp(a) && !d) {
      c != null && c.preventDefault();
      var e = this._getMaxWidth(a), b = this._getContent(a);
      b && b != "" && this._show(a, b, e)
    }
  }
};
PopupController.prototype.HidePopup = function () {
  this._clickEle = null;
  var a = $("#ttDivPersist");
  $(a).hasClass("stat-icon-popup") && $(a).removeClass("stat-icon-popup");
  $("#ttDivPersist").removeClass("no-ar");
  (new b365.Ui.AutoRefreshController).restartRF(true);
  this._clearPopUpShowingClass();
  $("#ttDivPersist").addClass("ttHidden").hide();
  $("div.callOut").removeClass("noLeftMargin");
  $("div.callOut").removeAttr("style");
  $("#RHSScroller").off("scroll");
  $("#RHSScroller").off("touchmove");
  a = null
};
function AccountController() {
  this._logIn = function () {
    this.SetLoginDetails()
  };
  this._logOff = function () {
    $(".aLoginBtnWrapper", "#HeaderWrapperTop").show()
  };
  this._toggleHelp = function () {
    var a = $("#needHelpMsg");
    if (a && a.length > 0)if (a.css("display") == "none")$("#needHelpMsg").show();
    else $("#needHelpMsg").hide()
  };
  this._sendEmail = function () {
    if ($("#lnkLFEm").length > 0)window.location.href = $("#lnkLFEm").attr("href")
  }
}
AccountController.prototype.SetLoginDetails = function () {
  $(".siteOverlay").fadeIn("fast");
  if (mf && !mf._lgnFailed) {
    $("#sbLGN .failmsg").toggleClass("failmsg hidden");
    $("#sbLGN").removeClass("lgfailed")
  }
  mf._lgnFailed = 0;
  $(".loginPopUpPosition").fadeIn("fast");
  $(".aLoginCloseIcon, .siteOverlay").click(function (a) {
    $("#UName").val($("#UName").attr("data-watermark"));
    $("#PWord").val($("#PWord").attr("data-watermark"));
    $("#PWord").get(0).type = "text";
    $(".siteOverlay").fadeOut("fast");
    $(".loginPopUpPosition").fadeOut("fast");
    if (a) {
      a.stopPropagation();
      a.preventDefault()
    }
    typeof event !== "undefined" && event.preventDefault()
  })
};
AccountController.prototype.OnLoginClicked = function () {
  this._logIn()
};
AccountController.prototype.OnLogoutClicked = function () {
  this._logOff()
};
AccountController.prototype.OnNeedHelpClick = function () {
  this._toggleHelp()
};
AccountController.prototype.OnSendEmailClick = function () {
  this._sendEmail()
};
function LottoBetSlipController() {
  this._updateBalance = function () {
    if (typeof lgh !== "undefined" && lgh.isAuthenticated(false))$("#lt-bal").length > 0 &&
    $("#MyAccountPanel .Total span:first-child").text($("#lt-bal").attr("data-ub"))
  };
  this._getItemIDFromElement = function (a) {
    return a.id
  };
  this.validateKeyPress = function () {
  }
}
LottoBetSlipController.prototype.OnLottoLoaded = function () {
  if ($isKeyPadSupported()) {
    this._lottoKeyPadController = null;
    this._lottoKeyPadController = new BetSlipKeyPadController("#cpn", "#MiddleScroller", lotto, this._getItemIDFromElement, lotto.despatchStakeKeyUp,
      lotto.validateStakeKeyPress);
    this._lottoKeyPadController.InitKeyPad()
  }
};
LottoBetSlipController.prototype.OnBetslipContentLoaded = function () {
  this._updateBalance();
  $isKeyPadSupported() && this._lottoKeyPadController.InitKeyPad()
};
function VideoStreamingController() {
  this.videoElement = null;
  this.videoOverlayElement = null;
  this.videoContainerElement = null;
  this.betSlipContentUlElement = null;
  this.videoLoadingTimeoutHandle = null;
  var a = this;
  this.debugMode = false;
  this.extraInformationInDebugMode = false;
  this.loaded = false;
  this.reportClientErrors = false;
  this.initialise = function () {
    if ($("video").length > 0 && (!Modernizr.supportsfullscreenvideo || $("#VideoOverlayWait").length > 0)) {
      a.loaded = false;
      a.reportClientErrors = false;
      a.videoElement = $("video");
      a.videoElement.removeAttr("controls");
      a.videoElement.prev().attr("id") != "VideoOverlayWait" && $('<div id="VideoOverlayWait" class="wait"> </div>').insertBefore(a.videoElement);
      if ($("#VideoOverlay").length > 0)a.videoOverlayElement = $("#VideoOverlay");
      if ($("#VideoContainer").length > 0)a.videoContainerElement = $("#VideoContainer");
      if (a.debugMode && $("#bsDiv > ul").length > 0)a.betSlipContentUlElement = $("#bsDiv > ul");
      a.addHandlers();
      return true
    }
    else return false
  };
  this.addHandlers = function () {
    $(document).off("click.videooverlay", "#VideoOverlay").on("click.videooverlay", "#VideoOverlay", a.onVideoOverLayClick);
    $(document).off("click.strvideo", "#strVideo").on("click.strvideo", "#strVideo", a.onVideoClick);
    $(document).off("click.videocontainer", "#VideoContainer").on("click.videocontainer", "#VideoContainer", a.OnLoginClicked);
    a.videoElement.off("play").on("play", a.videoPlay);
    a.videoElement.off("pause").on("pause", a.videoPause);
    a.videoElement.off("playing").on("playing", a.videoPlaying);
    a.videoElement.off("loadstart").on("loadstart", a.videoLoadStart);
    a.videoElement.off("stalled").on("stalled", a.videoStalled);
    a.videoElement.off("error").on("error", a.videoError);
    a.videoElement.off("waiting").on("waiting", a.videoWaiting);
    a.videoElement.off("webkitbeginfullscreen").on("webkitbeginfullscreen", a.onVideoBeginsFullScreen);
    if (a.debugMode && a.extraInformationInDebugMode)a.videoElement.off("timeupdate").on("timeupdate", a.videoTimeUpdate)
  };
  this.removeHandlers = function () {
    $(document).off("click.videooverlay", "#VideoOverlay");
    $(document).off("click.strvideo", "#strVideo");
    $(document).off("click.videocontainer", "#VideoContainer");
    a.videoElement.off("play");
    a.videoElement.off("pause");
    a.videoElement.off("playing");
    a.videoElement.off("loadstart");
    a.videoElement.off("stalled");
    a.videoElement.off("error");
    a.videoElement.off("waiting");
    a.videoElement.off("webkitbeginfullscreen");
    a.debugMode && a.extraInformationInDebugMode && a.videoElement.off("timeupdate")
  };
  this.videoPlay = function () {
    a.addVideoOverlay(true);
    a.logMessageBeneathBetSlip("play event received")
  };
  this.videoPause = function () {
    a.videoOverlayElement.addClass("play");
    a.logMessageBeneathBetSlip("pause event received")
  };
  this.videoPlaying = function () {
    setTimeout(a.playingMethod, 2e3)
  };
  this.videoLoadStart = function () {
    a.addVideoOverlay(true);
    a.logMessageBeneathBetSlip("loadstart event received");
    a.videoLoadingTimeoutHandle = setTimeout(a.readyToPlayMethod, 3e3)
  };
  this.videoStalled = function () {
    a.videoLoadingTimeoutHandle && clearTimeout(a.videoLoadingTimeoutHandle);
    a.readyToPlayMethod();
    a.logMessageBeneathBetSlip("stalled event received")
  };
  this.videoError = function () {
    if (a.reportClientErrors) {
      a.addVideoOverlay(false);
      $(document).off("click.videooverlay", "#VideoOverlay");
      a.videoOverlayElement.removeAttr("class");
      var b = a.getErrorMessageFromCode(a.videoElement[0].error.code);
      a.showMessageOnOverlay(b);
      a.logMessageBeneathBetSlip("error: " + b)
    }
  };
  this.videoWaiting = function () {
    a.logMessageBeneathBetSlip("waiting event received");
    a.logNetworkReadyAndErrorValues();
    if (a.videoElement[0].networkState == a.NETWORK_STATE.NO_SOURCE) {
      $(document).off("click.videooverlay", "#VideoOverlay");
      a.showMessageOnOverlay("Unable to connect to this stream, please try again later")
    }
  };
  this.videoTimeUpdate = function () {
    a.logNetworkReadyAndErrorValues()
  };
  this.onVideoBeginsFullScreen = function () {
    return false
  };
  this.onVideoOverLayClick = function () {
    if (a.videoOverlayElement.hasClass("play")) {
      !a.loaded && a.videoElement[0].load();
      a.videoElement[0].play()
    }
    else a.videoElement[0].pause()
  };
  this.OnLoginClicked = function (b) {
    if (a.videoContainerElement.hasClass("lgn")) {
      b.preventDefault();
      _tabletEventAdapter.AccountController.OnLoginClicked()
    }
  };
  this.showMessageOnOverlay = function (b) {
    $("div#message").remove();
    a.videoOverlayElement.removeAttr("class").html("<div id='message'>" + b + "</div>").addClass("error")
  };
  this.logMessageBeneathBetSlip = function (b) {
    a.debugMode && a.betSlipContentUlElement.after("<div>" + b.replace("<", "&lt").replace(">", "&gt") + "</div>")
  };
  this.getErrorMessageFromCode = function (b) {
    var a = "";
    switch (b) {
      case MediaError.MEDIA_ERR_ABORTED:
        a = tabletML.StreamingGeneralFailureMessage;
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        a = tabletML.StreamingGeneralFailureMessage;
        break;
      case MediaError.MEDIA_ERR_DECODE:
        a = tabletML.StreamingGeneralFailureMessage;
        break;
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        a = tabletML.StreamingNotsupportedFormatMessage
    }
    return a
  };
  this.logNetworkReadyAndErrorValues = function () {
    a.logMessageBeneathBetSlip("Network State: " + a.videoElement[0].networkState);
    a.logMessageBeneathBetSlip("Ready State: " + a.videoElement[0].readyState);
    a.logMessageBeneathBetSlip("Duration: " + a.videoElement[0].duration);
    a.logMessageBeneathBetSlip("Current Time: " + a.videoElement[0].currentTime);
    a.logMessageBeneathBetSlip("Error: " + a.videoElement[0].error.code)
  };
  this.videoPopulateUrl = function () {
    var b = $("#strVideo"), c, a;
    if (b) {
      c = b.attr("src");
      a = b.attr("streamproviderurl");
      if (a) {
        a = a.replace("https://", "http://");
        !(a == "" || a == null) && (c == "" || c == null) && (new b365.Ui.StreamingMediaProvider).getProviderUrl(a)
      }
    }
  };
  this.showLiveStreaming = function (b) {
    var c = b
      ? $("#embdStrmIP")
      : $("#embdStrm"), a = "#livestreambtn", d = "#streamingWpr", e = "#streamContainer";
    c.show();
    $(a).parent().show().addClass("visible");
    $(d).show();
    b && $(e).show();
    this.videoPopulateUrl();
    !$(a).parent().hasClass("view--active") && $(a).parent().toggleClass("view--active")
  };
  this.hideLiveStreaming = function (d, c) {
    var a = c
      ? $("#embdStrmIP")
      : $("#embdStrm"), b = "#livestreambtn";
    a.hide();
    a.children().remove();
    if (d)$(b).parent().show().addClass("visible");
    else $(b).parent().hide().removeClass("visible")
  };
  this.addVideoOverlay = function (c) {
    var b = "VideoOverlay";
    if (c) {
      b += "Wait";
      $(document).off("click.videooverlay", "#VideoOverlay");
      $("#VideoOverlay").remove()
    }
    else $("#VideoOverlayWait").remove();
    if ($("#cont").is(":visible") === false)if (a.videoElement.prev().attr("id") != b)if (c)$('<div id="' + b +
      '" class="wait"> </div>').insertBefore(a.videoElement);
    else {
      $('<div id="' + b + '" class="play"> </div>').insertBefore(a.videoElement);
      a.videoOverlayElement = $("#VideoOverlay");
      $(document).off("click.videooverlay", "#VideoOverlay").on("click.videooverlay", "#VideoOverlay", a.onVideoOverLayClick)
    }
    else if (!c) {
      a.videoOverlayElement.show();
      $(document).off("click.videooverlay", "#VideoOverlay").on("click.videooverlay", "#VideoOverlay", a.onVideoOverLayClick)
    }
  };
  this.playingMethod = function () {
    a.addVideoOverlay(false);
    a.videoOverlayElement.removeAttr("class");
    a.logMessageBeneathBetSlip("playing event received");
    a.videoElement.show()
  };
  this.readyToPlayMethod = function () {
    a.addVideoOverlay(false);
    a.loaded = true;
    a.reportClientErrors = true
  };
  this.NETWORK_STATE = {EMPTY: 0, IDLE: 1, LOADING: 2, NO_SOURCE: 3};
  this.READY_STATE = {HAVE_NOTHING: 0, HAVE_METADATA: 1, HAVE_CURRENT_DATA: 2, HAVE_FUTURE_DATA: 3, HAVE_ENOUGH_DATA: 4};
  this.dispose = function () {
    if (a.videoElement != null) {
      a.removeHandlers();
      a.videoElement[0].pause();
      a.videoElement.remove();
      a.videoElement = null;
      a.videoOverlayElement = null;
      a.betSlipContentUlElement = null
    }
  }
};
function TabletEventAdapter(f, i, h, e, c, d, g, b, a) {
  this.LayoutController = f;
  this.MenuController = i;
  this.PopupController = h;
  this.CouponController = e;
  this.AccountController = c;
  this.BetSlipController = d;
  this.SplashController = g;
  this.MainContentEventHandler = b;
  this.VideoStreamingController = a;
  $displayHelper.setPortraitLandscapeMode()
}
TabletEventAdapter.prototype.attachHandlers = function () {
  var a = this;
  $(document).on("resizelayout", function (e, c, d, b) {
    a.LayoutController._reSize(c, d, b)
  });
  $(".MembersCnt").click(function (b) {
    a.MenuController.onMenuClick(b)
  });
  $("#showHideLHSMenu").click(function (a) {
    if ($("#LHSWrapper").hasClass("showtext"))lhs.showLHSMenuAsIcons(a);
    else lhs.showLHSMenuAsText(a);
    $(document).trigger("lhshidelhspulloutmenu");
    $(document).trigger("resizelayout")
  });
  $(".betSlipPopupHeader", "#headerContainer").off("click").on("click", function (c) {
    c.stopPropagation();
    c.preventDefault();
    if ($displayHelper.isPrematch() && $displayHelper.isPortraitMode()) {
      $(document).trigger("HideBsInfoMessage");
      var b = $("#RHSWrapper");
      a.BetSlipController.HideBetSlipKeyPad();
      if (b.is(":visible")) {
        b.addClass("notshown");
        $(document).trigger("resizelayout", [false, null, true])
      }
      else {
        b.removeClass("notshown");
        $(document).trigger("resizelayout", [false, null, true])
      }
    }
  });
  $("body").click(function (b) {
    a.PopupController.onBodyClick(b)
  });
  $(window).resize(function () {
    a.LayoutController.onWindowResize();
    a.PopupController.HidePopup()
  });
  $("#lhsAllMarkets").click(function (b) {
    a.LayoutController.onAllMarketsClick(b)
  });
  $("#sbLMN").click(function (b) {
    a.LayoutController.onLHSItemClick(b.target)
  });
  $("#sbMCN").on("click", function (b) {
    a.LayoutController.onMainContentClick(b);
    a.MainContentEventHandler.onItemClick(b)
  });
  $("#loginButton").click(function (b) {
    b.preventDefault();
    a.AccountController.OnLoginClicked()
  });
  $("#lnkNeedHlp").click(function (b) {
    b.preventDefault();
    a.AccountController.OnNeedHelpClick()
  });
  $("#lnkLFEm").click(function (b) {
    b.preventDefault();
    a.AccountController.OnSendEmailClick()
  });
  $(window).on("maincontentchanged", function (d, c, e, b) {
    a.LayoutController.onLoad(d, c, e, b)
  })
};
function LiteEventAdapter(d, b, c, a, e, f) {
  this.LayoutController = d;
  this.MainFormController = b;
  this.BetSlipController = c;
  this.LottoBetSlipController = a;
  this.LoginController = e;
  this.PopupController = f;
  this._isInPlay = function (a) {
    var c, d, e, b;
    c = a[7][0];
    if (c == 13 || c == 14)return true;
    d = a[7].length > 1
      ? a[7][1].toString()
      : "";
    if (d.toLowerCase().indexOf("in-play") >= 0)return true;
    e = a[7].length > 2
      ? a[7][2].toString()
      : "";
    b = e.split("-");
    return b.length > 7 && b[7] == "4"
  }
}
LiteEventAdapter.prototype.attachHandlers = function () {
  var a = this;
  Sys.Application.add_init(function () {
    a.LayoutController.onInit()
  });
  if (!a.LoginController)return;
  a.LoginController.addOnShowLoginPrompt(function () {
    $("#loginButton").trigger("click")
  });
  if (!a.MainFormController)return;
  a.MainFormController.addOnReqStarted(function (f, b, e) {
    var c, d;
    if (b == 0 || b == 7 || b == 26 || b == 27 || b == 4 || b == 11 || b == 34) {
      c = [].slice.apply(e);
      if (b == 4 && c.length > 2 && typeof c[2] === "string")d = new CouponKey(c[2]);
      else d = {inplay: 0};
      d.inplay != 1 && d.inplay != 4 && a.LayoutController.onPreMatchContentLoadStarted()
    }
  });
  a.MainFormController.addOnReqCompleted(function (g, d) {
    var b = d[7][0], f = d[7].length > 1
      ? d[7][1].toString()
      : "";
    a.LayoutController.CleanContents();
    mf && mf._lgnFailed && $("#loginButton").trigger("click");
    if (mf && mf._userBalance != "") {
      $("#MyAccountPanel .Total span:first-child").text(mf._userBalance);
      mf._userBalance = ""
    }
    var e = d[7][d[7].length - 1], c = typeof e === "undefined" || typeof e.autoRefresh == "undefined"
      ? false
      : e.autoRefresh;
    if (b == 0 || b == 7 || b == 13 || b == 14 || b == 26 || b == 27 || b == 4 || b == 11 || b == 34 || b == 21) {
      a.LayoutController.onContentLoaded(c);
      $(document).trigger("contentloaded", [c, false]);
      if (a._isInPlay(d)) {
        !c && $("#audioCnt, #mLiveCnt, #embdStrmIP").hide();
        a.LayoutController.onInplayContentLoaded(e);
        $(document).trigger("inplaycontentloaded", [c, e.manualRefresh])
      }
      else {
        a.LayoutController.onPreMatchContentLoaded(e);
        $(document).trigger("prematchcontentloaded", [c, true])
      }
    }
    else if (b == 9 || b == 15) {
      a.LayoutController.onPartialContentLoaded();
      $(document).trigger("partialcontentloaded", [c])
    }
    else {
      a.LayoutController.onContentLoaded(c);
      $(document).trigger("contentloaded", [c])
    }
    if (b !== 13 && b !== 14 && b !== 29 && b !== 9 && b !== 15 && b !== 33 && b !== 32 && b !== 35 && !a._isInPlay(d)) {
      $(".betSlipPopupHeader", "#headerContainer").hasClass("notshown") && $displayHelper.isPrematch() &&
      $(".betSlipPopupHeader", "#headerContainer").removeClass("notshown");
      if (d[7][1] !== "2" || $("#cpn-race div.cpn-head.res").length > 0) {
        $("#streamingWpr").hide();
        $("#streamContainer").hide()
      }
    }
    b === 0 && d[7][1] === 9999 && $displayHelper.canShowLhsMenuAsIcon() && $(document).trigger("showlhsmenuasicon");
    $(window).trigger("maincontentchanged", [c, b, true]);
    a.PopupController.ProcessPopups(null, null);
    a.LayoutController.attachTouchingEvents(c);
    resizeCarousel();
    (new b365.Ui.AutoRefreshController).initRF()
  });
  $("#sbLMN").click(function (b) {
    a.onLeftHandMenuClick(b)
  });
  bs.addOnContentLoaded(function () {
    a.OnBetslipContentLoaded()
  });
  bs.addScrollToTop(function () {
    var a = $("#sbRMN");
    a.length > 0 && $("#RHSScroller").scrollTop(0)
  });
  $(document).on("mbsmultopenclose", function () {
    a.OnBetslipContentLoaded();
    $(document).trigger("resizelayout", [false, null, true])
  });
  a.MainFormController.addOnLottoLoaded(function () {
    a.LottoBetSlipController.OnLottoLoaded();
    lbs.addOnReqComplete(function () {
      a.LottoBetSlipController.OnBetslipContentLoaded();
      a.OnBetslipContentLoaded()
    })
  });
  $(document).on("orientationChanged prematchinplaychange", function () {
    (new b365.Ui.Betslip.DialogCloser(a._controller)).closeDialog();
    (new b365.Ui.DepositMessageDialogCloser).closeDialog()
  })
};
LiteEventAdapter.prototype.onLeftHandMenuClick = function (c) {
  var a = c.srcElement;
  if (a.tagName.toLowerCase() != "a" || a.id.substr(0, 2) !== "ma")return;
  if (a.className.indexOf("subMHdr") == -1) {
    var b = $("#sbLMN li a.selected");
    b.removeClass("selected");
    $(a).addClass("selected")
  }
};
LiteEventAdapter.prototype.OnBetslipContentLoaded = function () {
  ($("#depMsg").length > 0 || $(".bs-rct").length > 0) && $("#RHSScroller").scrollTop(0);
  $("#depMsg").length > 0 && typeof dwmsg !== "undefined" && dwmsg.resize();
  ($("#lotRecpt").length > 0 || $(".tab-typ-pt").length > 0) && $("#MiddleScroller").scrollTop(0)
};
(function (b) {
  b.registerNamespace("b365.Ui.Betslip");
  var a = function (a) {
    this._bsInst = a;
    this._isValid = function () {
      return typeof this._bsInst !== "undefined"
    }
  };
  a.prototype = {update: function () {
    if (this._isValid()) {
      var b = this, a = this._bsInst.numItems(false);
      if (a == 0)$(".spanBetSlipCount").html(a).addClass("hidden");
      else $(".spanBetSlipCount").html(a).removeClass("hidden")
    }
  }};
  b365.Ui.Betslip.BetSlipItemCountUpdater = a
})(Type);
Type.registerNamespace("b365.Ui.Betslip");
b365.Ui.Betslip.ControllerEventAttacher = function (b, a) {
  this._bsInst = b;
  this._controller = a;
  this._isValid = function () {
    return typeof this._bsInst !== "undefined" && typeof this._controller !== "undefined"
  }
};
b365.Ui.Betslip.ControllerEventAttacher.prototype = {attach: function () {
  if (this._isValid()) {
    this._controller.addOnBetSlipLoaded(function () {
      $(document).trigger("resizelayout", [false, null, true])
    });
    this._controller.addOnBetSlipItemsChanged(function (a) {
      (new b365.Ui.Betslip.BetSlipItemCountUpdater(a)).update()
    });
    this._controller.addOnAddReceiptFooterLinks(function (a) {
      a.footerLinks = (new BetslipFooterLinksProvider).provide()
    });
    this._controller.addOnShowBetSlip(function () {
      $("#RHSWrapper").hasClass("notshown") && $("#RHSWrapper").removeClass("notshown")
    });
    this._controller.addOnHideBetSlip(function () {
      $displayHelper.isPortraitMode() && $displayHelper.isPrematch() && $("#RHSWrapper").addClass("notshown")
    });
    this._controller.addOnPlaceBet(function () {
      mf._userAct = 1
    });
    this._controller.addOnPlaceBetSuccess(function () {
      $(".placeBet").attr("data-atype") != "cnf" && (new b365.Ui.Helpers.BalanceUpdater).update()
    })
  }
}};
MainContentEventHandler = function () {
  $(document).off("inplaycontentloaded.maincontent").on("inplaycontentloaded.maincontent", $.proxy(this.setScoreboardTeamKitColour, this));
  $(document).off("kitcolourapplied.maincontent").on("kitcolourapplied.maincontent", function () {
    (new InplayScoreBoard).saveKitSvgContents()
  })
};
MainContentEventHandler.prototype = {onItemClick: function (b) {
  var a = $(b.target);
  a = a.hasClass("tmlnup")
    ? a
    : a.parents(".tmlnup");
  if (a.hasClass("tmlnup")) {
    var c = $(a).attr("data-teamid");
    (new InplayScoreBoard).onTeamListClick(c, a[0]);
    b.preventDefault()
  }
}, setScoreboardTeamKitColour: function (b, a) {
  if (a)return;
  setTimeout(function () {
    (new InplayScoreBoard).applyTeamKitColour(b, a)
  }, 0)
}};
(function () {
  var a = false;
  Type.registerNamespace("b365.Ui");
  b365.Ui.PrematchInplayChangeEventDespatcher = function () {
  };
  b365.Ui.PrematchInplayChangeEventDespatcher.prototype = {Initialise: function () {
    a = $displayHelper.isPrematch();
    $(window).on("maincontentchanged", function () {
      var b = $displayHelper.isPrematch();
      if (b !== a) {
        $(document).trigger("prematchinplaychange");
        a = b
      }
    })
  }}
})();
InplayScoreBoard = function () {
};
InplayScoreBoard.prototype = {onTeamListClick: function (e, h) {
  if (e > 0) {
    var c = $("#teamlineup_" + e), b = $(".teamlineup:not(.hidden)");
    if (b.length > 0) {
      b.toggleClass("hidden");
      if (b[0].id == c[0].id)return
    }
    c.toggleClass("hidden");
    var f = $(h), d = f.position(), a = parseInt(d.top), g = parseInt(d.left) - 1;
    a = a + f.height();
    $(c[0]).css("top", a).css("left", g)
  }
}, applyTeamKitColour: function (b) {
  var a = $(".scbtb .kitimg");
  if (a.length === 0)return;
  a.applyKitColour(b);
  this.saveKitSvgContents(b, a)
}, saveKitSvgContents: function (a) {
  (new b365.Ui.TeamkitImage).initialiseImages();
  $(".scbtb .kitimg:has(svg)").each(function () {
    var b = this;
    (new b365.Ui.TeamkitImage).saveImage(a, b.innerHTML)
  })
}};
(function (d, b, a) {
  Type.registerNamespace("b365.Ui.InplayOverview");
  function c(c) {
    this._navScroller = null;
    this._clocks = [];
    this._liveController = c;
    this._liveIconParams = {classificationId: 0, fixtureId: 0, providerId: 0};
    this._scrollerX = null;
    this._lastReq = null;
    this._inplayActive = false;
    a(b).off("inplaycontentloaded.inplayoverviewcontroller").on("inplaycontentloaded.inplayoverviewcontroller", a.proxy(this._onContentLoaded, this));
    a(b).off("partialcontentloaded.inplayoverviewcontroller").on("partialcontentloaded.inplayoverviewcontroller", a.proxy(this._onPartialContentLoaded, this));
    a(b).off("matchlivepanelloaded.inplayoverviewcontroller matchlivenotavailable.inplayoverviewcontroller").on("matchlivepanelloaded.inplayoverviewcontroller matchlivenotavailable.inplayoverviewcontroller",
      a.proxy(this._clearSpinner, this));
    a(b).off("streamingcontentloaded.inplayoverviewcontroller").on("streamingcontentloaded.inplayoverviewcontroller", a.proxy(this._liveLoadComplete, this));
    a("#sbMCN").off("reqstarted.inplayoverviewcontroller").on("reqstarted.inplayoverviewcontroller", a.proxy(this._reqStarted, this))
  }

  c.prototype = {req: function () {
    mf._isAutoRefresh = false;
    if (this._lastReq !== null)mf.req.apply(mf, this._lastReq.args);
    else mf.req.apply(mf, arguments)
  }, processMarkup: function (j, f, i) {
    var d = a("<div>" + j + "</div>"), k = d.find('.vx__select-view[data-strmclassificationid="' + this._liveIconParams.classificationId +
      '"][data-strmfixtureid="' + this._liveIconParams.fixtureId + '"][data-strmproviderid="' + this._liveIconParams.providerId + '"]');
    k.addClass("active");
    var b = a('[role="navigation"]'), c = d.find('[role="navigation"]');
    c.remove();
    var g = b.text(), h = c.text();
    if (h !== g) {
      b.remove();
      a("#cpn").prepend(c);
      this._setupScroller(c, a("#inphdrlst"), false)
    }
    else if (!i) {
      var e = b.find(".cat_" + f);
      if (!e.hasClass("current-nav")) {
        b.find(".nav-level-one").removeClass("current-nav");
        e.addClass("current-nav");
        b.removeClass().addClass("inpOvwHdr");
        b.addClass("cat_" + f.toString());
        b.addClass("showsvg");
        b.find("li").removeClass("selected");
        e.parent().addClass("selected");
        this._setupScroller(b, a("#inphdrlst"), false)
      }
    }
    return d.html()
  }, isInOverview: function () {
    return a("#hdrscrl").length > 0 || a(".ClassificationMenuContainer").length > 0
  }, _clearSpinner: function () {
    mf.resetPwsPersist();
    mf.hidePws()
  }, _liveLoadComplete: function () {
    setTimeout(this._clearSpinner, 1e3)
  }, _onOrientationChanged: function () {
    var b = a("#hdrscrl"), c = a("#inphdrlst");
    this.isInOverview() && this._setupScroller(b, c, 0)
  }, _noMarketsCheckAndRedirect: function () {
    var b = a("#noMkt").length > 0;
    b && a(".view-wrap .view a.[name*='ipo']").click()
  }, _onPartialContentLoaded: function () {
    this._noMarketsCheckAndRedirect();
    this.isInOverview() && this._setupClocks()
  }, _onContentLoaded: function (f, c) {
    var d = a("#hdrscrl"), e = a("#inphdrlst");
    a(b).off("orientationChanged.inplayoverviewcontroller").on("orientationChanged.inplayoverviewcontroller", a.proxy(this._onOrientationChanged, this));
    a(b).off("prematchcontentloaded.inplayoverviewcontroller sportsselected.inplayoverviewcontroller").on("prematchcontentloaded.inplayoverviewcontroller sportsselected.inplayoverviewcontroller",
      a.proxy(this._exitHandler, this));
    this._inplayActive = true;
    if (!c)this._configureStreamingHeader();
    else this._noMarketsCheckAndRedirect();
    if (this.isInOverview()) {
      this._setupScroller(d, e, c);
      this._setupHandlers(c);
      this._setupClocks()
    }
    if (!c) {
      this._configureProductHeadings();
      this._configureHeader();
      this._setupNavigationHandlers()
    }
  }, _configureProductHeadings: function () {
    a("#idSP").hasClass("selected") && a("#idSP").removeClass("selected");
    !a("#idIP").hasClass("selected") && a("#idIP").addClass("selected")
  }, _configureStreamingHeader: function () {
    a("#streamingWpr").hide();
    a("#streamingWpr").find("li.visible").hide();
    a("#streamContainer").hide();
    a("#embdStrmIP").children().remove();
    a("#embdStrm").empty().hide();
    var b = new CouponKey(a("#cpn").attr("data-sportskey"));
    a("#streamingWpr").removeClass(function (e, d) {
      for (var b = d.split(" "), c = [], a = 0; a < b.length; a++)b[a].startsWith("cat_") && c.push(b[a]);
      return c.join(" ")
    }).addClass("cat_" + b.classification)
  }, _setupNavigationHandlers: function () {
    a(".nav-contents-wrapper").off("click.inplayoverviewcontroller", ".view").on("click.inplayoverviewcontroller", ".view", function (d) {
      d.preventDefault();
      d.stopPropagation();
      if (a(d.target).attr("rel"))return false;
      mf._isAutoRefresh = false;
      a(".view-wrap .view a.view-link").each(function () {
        a(this).removeAttr("rel")
      });
      var f = a(this), e = f.children("a.view-link").get(0), c = e.id.split("#");
      a(b).trigger("prelivecontentchange");
      mf.req(parseInt(c[0]), parseInt(c[1]), c[2], "href=" + e.href);
      a(e).attr("rel", "self")
    })
  }, _setupHandlers: function (f) {
    var c = this;
    a("#ref-cnt").off("click.inplayoverviewcontroller", ".vx__select-view").on("click.inplayoverviewcontroller", ".vx__select-view", function (c) {
      var b = a(this).find("a").first();
      if (b.hasClass("ip-match-live") || b.hasClass("ip-live-streaming")) {
        mf._isAutoRefresh = false;
        d(this)
      }
      c.preventDefault();
      c.stopPropagation()
    });
    a("#ref-cnt").off("click.inplayoverviewcontroller", "a.fxtr").on("click.inplayoverviewcontroller", "a.fxtr", function (b) {
      mf._isAutoRefresh = false;
      var c = a(this).attr("data-sportskey");
      mf.req(14, b365.Data.INPLAY_CID, c);
      b.preventDefault();
      b.stopPropagation()
    });
    var d = function (h) {
      var d = a(h);
      if (!d.hasClass("active")) {
        a(b).trigger("prelivecontentchange");
        a("#cpn").attr("data-sportskey", d.attr("data-sportskey"));
        var e = d.attr("data-audiostreamingkey"), f = null;
        if (e !== null && e !== "") {
          var g = {stringKey: e};
          f = new b365.Ui.AudioStreamingKey(g)
        }
        c._liveIconParams = {classificationId: parseInt(d.attr("data-strmclassificationid")), fixtureId: parseInt(d.attr("data-strmfixtureid")), providerId: parseInt(d.attr("data-strmproviderid")), hasMatchLive: parseInt(d.attr("data-hasmatchlive")), audioKey: f};
        c._liveController.setParameters(c._liveIconParams);
        c._liveController.getStreamingData(1, 0);
        a(".vx__table .vx__select-view").removeClass("active");
        d.addClass("active")
      }
    };
    if (!f) {
      var e = a(".vx__table .vx__select-view").has(".ip-match-live, .ip-live-streaming");
      if (e.length > 0) {
        var g = e.get(0);
        setTimeout(function () {
          d(g)
        }, 0)
      }
    }
  }, _setupScroller: function (b, c, a) {
    !Modernizr.horizontalscroll && b.pageScroller({showSelected: !a})
  }, _setupClocks: function () {
    TickingClockController.start()
  }, _configureHeader: function () {
    var c = d.location.hash, e = +mf.extractKeyValue(c, "op"), f = +mf.extractKeyValue(c, "cid");
    if (!c.endsWith("/"))c += "/";
    var b = a(".view-wrap .view a[_href$='" + c.toLowerCase() + "']");
    if (b.length == 0)b = a(".view-wrap .view a[href$='" + c.toLowerCase() + "']");
    if (b.length == 0)if (f == b365.Data.INPLAY_CID && e == b365.Data.INPLAY_OP_ID)b = a(".view-wrap .view a[name*='ipe']");
    else if (e == b365.Data.INPLAY_DIARY_OP_ID)b = a(".view-wrap .view a[name*='ips']");
    else b = a(".view-wrap .view a[name*='ipo']");
    a(".nav-contents-wrapper").show();
    a("#streamingWpr").show();
    a(".betSlipPopupHeader", "#headerContainer").addClass("notshown");
    a(".view-wrap .view a.view-link").removeAttr("rel");
    b.attr("rel", "self");
    b.attr("name") != "ipe" && a("#lhsAllMarkets").hide()
  }, _reqStarted: function (e, a, c) {
    var b = [].slice.apply(c), d;
    if (a == 13 || a == 14)this._lastReq = {op: a, args: c};
    else if (a == 4 && (b.length > 2 && typeof b[2] === "string")) {
      d = new CouponKey(b[2]);
      if (d.inplay == 1 || d.inplay == 4)this._lastReq = {op: a, args: c}
    }
  }, _exitHandler: function () {
    a(b).off("orientationChanged.inplayoverviewcontroller");
    a(b).off("prematchcontentloaded.inplayoverviewcontroller sportsselected.inplayoverviewcontroller");
    a(".nav-contents-wrapper").hide();
    a(".vx__forty aside").hide();
    a("#lhsAllMarkets").show();
    var c = a("#headerContainer");
    c.hasClass("inplay") && c.removeClass("inplay");
    a(".betSlipPopupHeader", c).hasClass("notshown") && a(".betSlipPopupHeader", c).removeClass("notshown");
    this._inplayActive = false
  }};
  b365.Ui.InplayOverview.Controller = c
})(window, document, jQuery);
(function (p, b, a, d) {
  Type.registerNamespace("b365.Live");
  var h = {}, k = true, o = {}, i = "#streamingWpr", l = "#mLiveCnt", j = "#livestreambtn", e = "#matchlivebtn", f = "#audiostreamingicon", g = "#streamContainer", c = "#audioCnt", m = "#mlContainer";

  function n() {
    this._scbClock = null;
    this._mlClock = null;
    this._bbClock = null;
    this._mlBtnClicked = false;
    this._classificationId = 0;
    this._fixtureId = 0;
    this._providerId = 0;
    this._audioKey = null;
    this._languageId = null;
    this._matchLiveTopicId = null;
    this._matchLiveCnt = null;
    a(b).off("inplaycontentloaded.livecontroller").on("inplaycontentloaded.livecontroller", a.proxy(this.liveContentLoaded, this));
    a(b).off("streamingcontentloaded.livecontroller").on("streamingcontentloaded.livecontroller", a.proxy(this.setStreamingContent, this));
    a(b).off("matchlivepanelloaded.livecontroller").on("matchlivepanelloaded.livecontroller", a.proxy(this.initialiseMatchLive, this));
    a(b).off("sportmodeldisconnected.livecontroller").on("sportmodeldisconnected.livecontroller", a.proxy(this.diffussionDisconnected, this));
    a(b).off("matchlivenotavailable.livecontroller").on("matchlivenotavailable.livecontroller", a.proxy(this.onMatchLiveNotAvailable, this));
    a(b).off("statsviewloaded.livecontroller").on("statsviewloaded.livecontroller", a.proxy(this.connectMatchLive, this));
    a(b).off("prelivecontentchange.livecontroller").on("prelivecontentchange.livecontroller", a.proxy(this.preLiveContentChange, this));
    this.attachStreamingButtonsHandler()
  }

  n.prototype = {attachStreamingButtonsHandler: function () {
    a("#streamingWpr").off("click.livecontroller").on("click.livecontroller", a.proxy(this.streamingOnClick, this))
  }, preLiveContentChange: function () {
    var f = this.getMatchLiveContainer(), h = this.getVideoContainer(), i = a(c), d = a(g), k = a(m), e = a(".holdingCntChild",
      this.getHoldingContainer()), b, j;
    if (f.is(":visible"))if (k.hasClass("dartsMlContainer"))b = d.height();
    else b = f.children("#mlContainer").height();
    else if (h.is(":visible"))b = h.children("#VideoContainer").height();
    else if (i.is(":visible"))b = i.children(".as-panel").height();
    else if (e.is(":visible"))b = e.height();
    else if (d)b = d.width() * .4;
    else b = 0;
    if (b < 10 && d)b = d.width() * .4;
    j = new b365.Ui.Storage.Accessor;
    j.setItem("lastMatchLiveHeight", b);
    this.toggleLiveStreaming(false, false);
    this.toggleMatchLive(false, false);
    this.toggleAudio(false, false)
  }, setParameters: function (b) {
    if (typeof b.classificationId !== "undefined")this._classificationId = b.classificationId;
    if (typeof b.fixtureId !== "undefined") {
      this._fixtureId = b.fixtureId;
      typeof b.hasMatchLive !== "undefined" && this.setMatchLiveAvailable(this._fixtureId, !!b.hasMatchLive)
    }
    if (typeof b.providerId !== "undefined") {
      this._providerId = b.providerId;
      if (this._providerId > 0)o[this._fixtureId] = this._providerId
    }
    if (typeof b.audioKey !== "undefined")this._audioKey = b.audioKey;
    if (typeof b.languageId !== "undefined")this._languageId = b.languageId;
    if (typeof b.matchLiveTopicId !== "undefined")this._matchLiveTopicId = b.matchLiveTopicId;
    this._matchLiveCnt = this.isInplayMode()
      ? a("#mLiveCnt")
      : a("#preMLiveCnt")
  }, getMatchLiveContainer: function () {
    return this.isInplayMode()
      ? a("#mLiveCnt")
      : a("#preMLiveCnt")
  }, getVideoContainer: function () {
    return this.isInplayMode()
      ? a("#embdStrmIP")
      : a("#embdStrm")
  }, getHoldingContainer: function () {
    return this.isInplayMode()
      ? a("#holdingCnt")
      : a("#preMHoldingCnt")
  }, setParametersFromMarkup: function () {
    var b = a("#strmparameter"), c, e = null;
    if (b.length > 0) {
      if (b.attr("data-audiostreamingkey") != "") {
        var f = {stringKey: b.attr("data-audiostreamingkey")};
        e = new b365.Ui.AudioStreamingKey(f)
      }
      c = {classificationId: parseInt(b.attr("data-strmclassificationid")), fixtureId: parseInt(b.attr("data-strmfixtureid"),
        10), providerId: parseInt(b.attr("data-strmproviderid"), 10), hasMatchLive: parseInt(b.attr("data-hasmatchlive"), 10) == 1
        ? true
        : false, audioKey: e}
    }
    else c = {classificationId: 0, fixtureId: 0, providerId: 0, audioKey: null};
    if (this.matchLiveFixtureState !== d)c.hasMatchLive = d;
    this.setParameters(c)
  }, setMatchLiveEnabled: function (a) {
    k = a
  }, streamingOnClick: function (c) {
    this._mlBtnClicked = false;
    c.preventDefault();
    var b = null;
    if (c)b = c.target
      ? c.target
      : c.srcElement;
    if (b && b.tagName === "A") {
      this.setHoldingContentHeight();
      if (b.id === "livestreambtn" && a(b).parent().hasClass("selected") === false)this.showStreamingVideo(true);
      else if (b.id === "matchlivebtn" && a(b).parent().hasClass("selected") === false) {
        this._mlBtnClicked = true;
        this.showMatchLive(true)
      }
      else b.id === "audiostreamingicon" && this.showAudioStreaming(true)
    }
  }, connectMatchLive: function () {
    if (mf._isAutoRefresh)return;
    var g = a("#mlContainer"), f, b, e, d, c;
    if (typeof MatchLiveGlobal != "undefined") {
      if (this.isInplayMode())f = a("#cpn").attr("data-sportskey");
      else f = a("#strmparameter").attr("data-ip-sportskey");
      if (typeof f !== "undefined") {
        e = new CouponKey(f);
        b = parseInt(g.attr("data-languageid"));
        d = e.classification;
        c = e.matchLiveFixtureId(b, e.classification)
      }
      else {
        b = this._languageId;
        d = this._classificationId;
        c = this._matchLiveTopicId
      }
      b && d && c && MatchLiveGlobal.initMatchLive(b, d, c)
    }
  }, disconnectMatchLive: function () {
    if (typeof MatchLiveGlobal != "undefined")MatchLiveGlobal.onPageLoadClearMatchLive(true)
  }, liveContentLoaded: function (e, f) {
    e.stopPropagation();
    e.preventDefault();
    this.setParametersFromMarkup();
    this.setStreamingEventHandlers(true);
    a("#preMLiveCnt").empty().hide();
    if (!f && !ipoc.isInOverview()) {
      this.matchLiveFixtureState = d;
      var c = b.getElementById("MiddleScroller");
      c.scrollTop > 0 && a(c).scrollTop(0);
      var g = this.getMatchLiveAvailable(this._fixtureId)
        ? 1
        : 0;
      g == 1 && this.setHoldingContentHeight();
      this.getMatchLiveContainer().hide();
      mf.req(29, this._classificationId, this._fixtureId, 0, this.getMatchLiveAvailable(String(this._fixtureId))
        ? 1
        : 0)
    }
    TickingClockController.start()
  }, getStreamingData: function (b, a) {
    if (!mf._isAutoRefresh && !mf._isManualRefresh) {
      var d = this.getMatchLiveContainer();
      this.setHoldingContentHeight();
      this.clearStreamingContents(this.getVideoContainer(), false);
      this.clearStreamingContents(this.getMatchLiveContainer(), true);
      d.hide();
      var f = this._classificationId, e = this._fixtureId, c = this._providerId;
      if (typeof a === "undefined" || a === null)a = 0;
      if (c === 0)a = 1;
      if (a)b = this.getMatchLiveAvailable(this._fixtureId)
        ? 1
        : 0;
      if (c > 0 || b > 0) {
        if (b == 1)c = 0;
        mf.req(29, f, e, c, b)
      }
      else if (c === 0 && b === 0) {
        this.disconnectMatchLive();
        this.getHoldingContainer().hide();
        this.setStreamingButtons(false, false, false)
      }
    }
  }, isMatchLive: function (c) {
    var b = mlSport, a = false;
    jQuery.each(b, function (d, b) {
      if (b.id == c) {
        a = true;
        return false
      }
    });
    return a
  }, clearHoldingContainers: function () {
    a("#holdingCnt,#preMHoldingCnt").hide()
  }, setStreamingContent: function (t, c, h) {
    var s = this.getVideoContainer(), o = this.getHoldingContainer();
    if (c) {
      var m = parseInt(c[1]), n = parseInt(c[2]), f = parseInt(c[3]), l = typeof c[4] !== "object" &&
        parseInt(c[4]) === 1, k = true, q = a("#VideoContainer").length > 0, r = a(h), j = typeof c[4] === "object"
        ? c[4].autoRefresh
        : typeof c[5] === "object"
        ? c[5].autoRefresh
        : false, e = {};
      if (m > 0)e.classificationId = m;
      if (n > 0)e.fixtureId = n;
      if (f > 0)e.providerId = f;
      if (e.classificationId == d)e.hasMatchLive = false;
      else e.hasMatchLive = p.Locator.config.isMatchLiveEnabled(e.classificationId)
        ? 1
        : 0;
      this.setParameters(e);
      if (!this.isInplayMode() && l && e.classificationId !== 2) {
        g.hide();
        return false
      }
      var i = false;
      if (f > 0) {
        a(s)[0].innerHTML = r.outerHTML();
        this.showStreamingVideo(false);
        i = true;
        o.hide();
        _tabletEventAdapter.VideoStreamingController.initialise();
        k = false
      }
      else f == 0 && l === true && this.getMatchLiveContainer().html(h);
      this.getStreamingButtons(e.classificationId, j, q);
      k && this.defaultLiveStreamingForFirstLoad(j);
      if (f > 0 && this.isInplayMode())if (h === "")this.getStreamingData(0, 1);
      else i === false && this.showStreamingVideo(0)
    }
    a(b).trigger("streamingContentSet");
    return false
  }, getStreamingButtons: function (d, g, h) {
    if (!this.isMatchLive(d) || g)return;
    var b = a("#embdStrmHdr");
    b.hide();
    var c = a(i), f = "#streamingWpr", e = a("#ip-strmbtn-wrpr"), k = b.find(f).length, j = e.find(f).length;
    if (this.isInplayMode()) {
      if (k > 0 && j == 0) {
        e.html(c);
        b.hide()
      }
    }
    else {
      if (!h) {
        this.setStreamingButtons(true, false, false, true);
        b.html(c);
        this.attachStreamingButtonsHandler()
      }
      b.show();
      c.show().addClass("cat_" + d)
    }
  }, onMatchLiveNotAvailable: function () {
    this.matchLiveFixtureState = false;
    this.disconnectMatchLive();
    this.setMatchLiveAvailable(this._fixtureId, false);
    if (!this.isInplayMode())this.showMatchLiveNotAvailableMessage();
    else {
      var b = this.getVideoContainer();
      if (this.showLiveStreamingButton() && b.length > 0)if (b[0].style.display == "none")a(j).trigger("click");
      else this.toggleLiveStreaming(true, true);
      else this.showAudioStreamingButton() && a(c).length > 0 && !a(c).is(":visible") && this.showAudioStreaming(true);
      this.clearStreamingContents("#matchLive", true);
      this.getMatchLiveContainer().hide();
      this.getHoldingContainer().hide();
      this.toggleMatchLive(false, false)
    }
  }, showMatchLiveNotAvailableMessage: function () {
    var b = this.getMatchLiveContainer();
    if (b) {
      this.clearHoldingContainers();
      var c = a('<div id="ml-available-msg"></div>');
      b.empty().html(c);
      c.css("backgroundImage", 'url("matchlive/sports/' + this._classificationId + "/hires/HiRes_racelive_mobile_" + mf._lngCookie + '.png")');
      b.show()
    }
  }, setStreamingEventHandlers: function () {
    a("#streamContainer").off("click").on("click", function (c) {
      var b = c.target, d = a(b).parent().hasClass("as-panel-link");
      if (b && (a(b).hasClass("as-panel-link") || d)) {
        if (d)b = a(b).parent();
        (new b365.Ui.AudioStreamingMenu).streamingItemClick(c, b);
        c.preventDefault()
      }
    })
  }, setMatchLiveAvailable: function (a, b) {
    h[a] = b
  }, getMatchLiveAvailable: function (a) {
    return!k || !this.classificationSupportsMatchLive()
      ? false
      : typeof h[a] !== "undefined"
      ? h[a]
      : false
  }, classificationSupportsMatchLive: function () {
    var a = true, b = this.isInplayMode()
      ? this._classificationId
      : this.getClassificationFromMarkup();
    return b == "2"
      ? Modernizr.matchlivehorseracingsupport
      : a
  }, getClassificationFromMarkup: function () {
    var c = "", b = a("#strmparameter");
    if (b.length > 0)if (b.attr("data-strmclassificationid") != "")c = b.attr("data-strmclassificationid");
    return c
  }, initialiseMatchLive: function () {
    this.setMatchLiveAvailable(this._fixtureId, true);
    if (this.isMatchLiveButtonEnabled() || a(e).parent().css("display") === "none") {
      this.setStreamingButtons(0, 1);
      TickingClockController.start();
      this.matchLiveFixtureState = true;
      if (a("#streamingBtn > li").is(":visible") === false)this._mlBtnClicked = true;
      this.defaultLiveStreamingForFirstLoad(false);
      this.getMatchLiveContainer().show();
      this.getHoldingContainer().hide()
    }
    this.matchLiveFixtureState = true;
    this._mlBtnClicked = false;
    a(b).trigger("initialisedmatchlive")
  }, defaultLiveStreamingForFirstLoad: function (a) {
    if (this._mlBtnClicked)this.showMatchLive(false);
    else if (this.showLiveStreamingButton())this.showStreamingVideo(true, a);
    else this.showAudioStreamingButton() && this.showAudioStreaming(true)
  }, diffussionDisconnected: function () {
  }, showLiveStreamingButton: function () {
    return this._fixtureId > 0 && this._providerId > 0
  }, showAudioStreamingButton: function () {
    return this._audioKey != null && this._audioKey.keyString.length > 0 && this.isInplayMode()
  }, setStreamingButtons: function (f, g, e, a) {
    if (!this.isInplayMode() && !a) {
      this.toggleLiveStreaming(false, false);
      this.toggleMatchLive(false, false);
      this.toggleAudio(false, false);
      return false
    }
    var d = this.getMatchLiveAvailable(this._fixtureId)
      ? 1
      : 0, c = this.showLiveStreamingButton(), b = this.showAudioStreamingButton();
    this.toggleLiveStreaming(f, c, a);
    this.toggleMatchLive(g, d, a);
    this.toggleAudio(e, b, a);
    return false
  }, resetVisualButtonStyle: function () {
    var d = a(b.getElementById("streamingBtn").children);
    d.removeClass("last").removeClass("first");
    var c = d.filter(":visible");
    c.first().addClass("first");
    c.last().addClass("last")
  }, toggleLiveStreaming: function (d, c, b) {
    if (this.isInplayMode() || b)if (d) {
      _tabletEventAdapter.VideoStreamingController.showLiveStreaming(this.isInplayMode());
      this.isMatchLiveButtonEnabled() && a(e).parent().toggleClass("view--active");
      a(f).parent().hasClass("view--active") && a(f).parent().toggleClass("view--active")
    }
    else _tabletEventAdapter.VideoStreamingController.hideLiveStreaming(c);
    this.resetVisualButtonStyle()
  }, isMatchLiveButtonEnabled: function () {
    return a(e).parent().hasClass("view--active")
  }, toggleMatchLive: function (o, n) {
    var c, b, k, h;
    b = a(e), l = this.getMatchLiveContainer();
    if (o) {
      k = a(j);
      h = a(f);
      this.matchLiveFixtureState !== d && b.parent().show().addClass("visible");
      a(i).show();
      a(g).show();
      k.parent().hasClass("view--active") && k.parent().toggleClass("view--active");
      !b.parent().hasClass("view--active") && b.parent().toggleClass("view--active");
      h.parent().hasClass("view--active") && h.parent().toggleClass("view--active")
    }
    else {
      c = a(m);
      c.hasClass("dartsMlContainer") && c.removeClass("dartsMlContainer");
      if (n)b.parent().show().addClass("visible");
      else b.parent().hide().removeClass("visible");
      l.hide()
    }
    this.resetVisualButtonStyle()
  }, toggleAudio: function (n, m, l) {
    var d, b, k, h;
    d = a(c);
    b = a(f);
    if (this.isInplayMode() || l)if (n) {
      k = a(e);
      h = a(j);
      d.removeClass("wait");
      d.show();
      this.getMatchLiveContainer().hide();
      this.getVideoContainer().hide();
      this.getHoldingContainer().hide();
      b.parent().show().addClass("visible");
      a(i).show();
      a(g).show();
      h.parent().hasClass("view--active") && h.parent().toggleClass("view--active");
      k.parent().hasClass("view--active") && k.parent().toggleClass("view--active");
      !b.parent().hasClass("view--active") && b.parent().toggleClass("view--active")
    }
    else {
      d.hide();
      if (m)b.parent().show().addClass("visible");
      else b.parent().hide().removeClass("visible")
    }
    this.resetVisualButtonStyle()
  }, showAudioStreaming: function (a) {
    if (a)this._audioKey != null && (new b365.Ui.AudioStreamingRequestHandler).getInplayControl(this._audioKey.classificationId, this._fixtureId);
    this.setStreamingButtons(false, false, true)
  }, showMatchLive: function (b) {
    this._mlBtnClicked = true;
    a(c).hide();
    if (b && this.getMatchLiveContainer().length > 0) {
      this.getStreamingData(1, 1);
      return
    }
    this.setStreamingButtons(false, true, false, true)
  }, showStreamingVideo: function (d, b) {
    a(c).hide();
    if (!b)if (d) {
      this.getStreamingData(0, 0);
      return
    }
    else {
      mf._StrmLastUpdatedTime = +new Date;
      !this.isInplayMode() && a("#embdStrm").show();
      this.setStreamingButtons(true, false)
    }
  }, isInplayMode: function () {
    return lhs.getCurrentMode() === "INPLAY"
  }, clearStreamingContents: function (d, c) {
    var b = a(d);
    if (b.length > 0) {
      b.empty();
      b.hide();
      c && mf.rhsContentChanged()
    }
  }, setHoldingContentHeight: function () {
    var e = this.getVideoContainer(), d = this.getHoldingContainer(), f = a("#sbRMN"), b;
    if (storage.getItem("lastMatchLiveHeight") > 0 && !$displayHelper.isPrematch())b = storage.getItem("lastMatchLiveHeight");
    else if (this.isMatchLive(this._classificationId) === true)if (e.width() > 0)b = e.width() * .4;
    else b = f.width() * .4;
    else b = 0;
    if (b > 0 && d.is(":not(:visible)")) {
      var c;
      c = d.children(".holdingCntChild");
      c.css("height", b);
      c.children(".holdingCntSpin").css("height", b);
      this.getMatchLiveContainer().hide();
      d.show()
    }
  }};
  b365.Live.Controller = n
})(window, document, jQuery);
(function (d) {
  var a = [], b;

  function c() {
    clearTimeout(b);
    for (var h = 0, j = a.length; h < j; h++) {
      var g = a[h], f = $(g).attr("data-clocktickdown");
      if (f == "1" || f == "0") {
        var i = g.innerHTML;
        if (i != null) {
          var e = i.split(":");
          if (e.length == 2 && !isNaN(e[0]) && !isNaN(e[1])) {
            var d = {};
            d.mins = parseInt(e[0], 10);
            d.secs = parseInt(e[1], 10);
            if (f == "0") {
              d.secs = Number(d.secs) + 1;
              if (d.secs > 59) {
                d.secs = Math.max(d.secs - 60, 0);
                d.mins = d.mins + 1
              }
            }
            else {
              d.secs = Number(d.secs) - 1;
              if (d.secs < 0) {
                d.mins = Math.max(0, d.mins - 1);
                d.secs = Math.max(0, 60 + d.secs)
              }
            }
            if (!isNaN(d.mins) && d.mins < 10)d.mins = "0" + d.mins.toString();
            if (!isNaN(d.secs) && d.secs < 10)d.secs = "0" + d.secs.toString();
            g.innerHTML = d.mins + ":" + d.secs
          }
        }
      }
    }
    b = setTimeout(c, 1e3)
  }

  function e() {
    var b = $(".scbtb .hdr .scbclock", "#MiddleScroller"), d = $("#mlClock", "#mlContainer"), c = $("#scoreboardHeaderRow .clock", "#mlContainer"), e = "";
    if (b.length == 0) {
      b = $(".vx__select-view.active", "#MiddleScroller").closest(".vx__media-slat").find(".vx__time");
      if (b.length > 0)e = b[0].innerHTML
    }
    else {
      var f = $(".scbtb", "#MiddleScroller");
      if (f.attr("data-isclockactive") === "1") {
        b.attr("data-clocktickdown", f.attr("data-clocktickdown"));
        b.attr("data-isclockactive", f.attr("data-isclockactive"));
        e = b[0].innerHTML;
        a.push(b[0])
      }
      else {
        e = b[0].innerHTML;
        b = []
      }
    }
    if (e !== "") {
      if (d.length > 0)d[0].innerHTML = e;
      if (c.length > 0)c[0].innerHTML = e
    }
    if (b.length > 0 && b.attr("data-isclockactive") === "1") {
      if (d.length > 0) {
        d.attr("data-clocktickdown", b.attr("data-clocktickdown"));
        d[0].innerHTML = b[0].innerHTML;
        a.push(d[0])
      }
      if (c.length > 0) {
        c.attr("data-clocktickdown", b.attr("data-clocktickdown"));
        c[0].innerHTML = b[0].innerHTML;
        a.push(c[0])
      }
    }
  }

  d.start = function () {
    a = $('span [data-isclockactive="1"]', "#MiddleScroller");
    if (a.length == 0)a = [];
    e();
    if (a.length > 0) {
      b && clearTimeout(b);
      b = setTimeout(c, 1e3)
    }
    else {
      b && clearTimeout(b);
      if (a.length > 0)a = []
    }
  }
})(window.TickingClockController = window.TickingClockController || {});
(function (a) {
  Type.registerNamespace("b365.System");
  function b(f, g) {
    var c, e, b = g, d = false;
    this.start = function () {
      e = (new Date).getTime();
      c = a.setTimeout(f, b)
    };
    this.pause = function () {
      if (c && !d) {
        a.clearTimeout(c);
        b -= (new Date).getTime() - e;
        b = b < 500
          ? 500
          : b;
        d = true
      }
    };
    this.restart = function () {
      if (d) {
        e = (new Date).getTime();
        c = a.setTimeout(f, b);
        d = false
      }
    };
    this.destroy = function () {
      a.clearTimeout(c)
    }
  }

  b365.System.Timer = b
})(window);
(function (b) {
  var a = b.jQuery, c = b.Modernizr;
  a.fn.extend({pageScroller: function (f) {
    var d = {itemsSelector: "li", itemParentSelector: "ul", itemSpacing: 5, containerPadding: 30, selectedItemSelector: ".selected", arrowElementType: "<div />", leftArrowClass: "left-arrow", rightArrowClass: "right-arrow", arrowActiveClass: "arrow-active", showSelected: true, swipeGestureMaxTime: 250, swipeGestureMinDistance: 50, setData: function (c,
                                                                                                                                                                                                                                                                                                                                                                b,
                                                                                                                                                                                                                                                                                                                                                                a) {
      a.data(c, b)
    }, getData: function (b, a) {
      return a.data(b)
    }}, e = a.extend(d, f);
    return this.each(function () {
      var d = e, f = a(this), j = f.width() - d.containerPadding * 2, h = a(d.itemsSelector, f), s = a(d.itemParentSelector,
        f), l = h.first().outerWidth(true) + d.itemSpacing, i = Math.floor(j / l), k = Math.ceil(h.length / i), g = +d.getData("current-page", f) ||
        0, m = function () {
        for (var d = (g + 1) * i, f = d - i, e = h.length, c = 0, b = 0; b < f; b++)a(h.get(b)).hide();
        for (; b < d && b < e; b++) {
          a(h.get(b)).show();
          c += l
        }
        for (; b < e; b++)a(h.get(b)).hide();
        s.width(c)
      }, n = function () {
        if (k > 1) {
          if (g > 0)a("." + d.leftArrowClass, f).addClass(d.arrowActiveClass);
          else a("." + d.leftArrowClass, f).removeClass(d.arrowActiveClass);
          if (g < k - 1)a("." + d.rightArrowClass, f).addClass(d.arrowActiveClass);
          else a("." + d.rightArrowClass, f).removeClass(d.arrowActiveClass)
        }
      }, o = function (b) {
        d.showSelected = false;
        h = a(d.itemsSelector, f);
        j = f.width() - d.containerPadding * 2;
        i = Math.floor(j / l);
        k = Math.ceil(h.length / i);
        if (b === -1 && g > 0 || b === 1 && g < k - 1) {
          g = g + b;
          d.setData("current-page", g, f);
          m();
          n()
        }
        r()
      }, p = function () {
        return h.index(a(d.selectedItemSelector, f))
      }, q = function (a) {
        if (d.showSelected) {
          j = f.width() - d.containerPadding * 2;
          i = Math.floor(j / l);
          g = Math.floor(a / i)
        }
        d.setData("current-page", g, f);
        m();
        n()
      }, t = function (a) {
        var b = {};
        if (a.originalEvent && a.originalEvent.touches && a.originalEvent.touches.length > 0) {
          b.x = a.originalEvent.touches[0].pageX;
          b.y = a.originalEvent.touches[0].pageY
        }
        else {
          b.x = a.pageX;
          b.y = a.pageY
        }
        b.time = Date.now();
        return b
      }, u = function (a) {
        var b = t(a);
        d.setData(a.type, b, f)
      }, v = function (i) {
        var a = d.getData("touchstart", f), c = d.getData("touchmove", f), h, e, b, g;
        if (a && c) {
          d.setData("touchstart", null, f);
          d.setData("touchmove", null, f);
          h = Math.abs(c.time - a.time);
          if (h <= d.swipeGestureMaxTime) {
            e = a.x - c.x;
            b = Math.abs(e);
            g = e / b;
            if (b >= d.swipeGestureMinDistance) {
              o(g);
              i.stopPropagation()
            }
          }
        }
      }, r = function () {
        a(b).off("orientationchange.pagescroller resize.pagescroller").on("orientationchange.pagescroller resize.pagescroller", function () {
          q(p())
        });
        if (c.touch) {
          f.off("touchstart.pagescroller touchmove.pagescroller").on("touchstart.pagescroller touchmove.pagescroller", u);
          f.off("touchend.pagescroller").on("touchend.pagescroller", v)
        }
      };
      if (k > 1) {
        a("." + d.leftArrowClass, f).length === 0 &&
        f.prepend(a(d.arrowElementType).addClass(d.leftArrowClass).off("click.pagescroller").on("click.pagescroller", function () {
          o(-1)
        }));
        a("." + d.rightArrowClass, f).length === 0 &&
        f.append(a(d.arrowElementType).addClass(d.rightArrowClass).off("click.pagescroller").on("click.pagescroller", function () {
          o(1)
        }))
      }
      f.css({position: "relative"});
      s.css({"float": "none", margin: "0 auto"});
      if (d.showSelected)q(p());
      else {
        m();
        n()
      }
      d.setData("current-page", g, f);
      r()
    })
  }, removePageScroller: function (f) {
    var d = {leftArrowClass: "left-arrow", rightArrowClass: "right-arrow"}, e = a.extend(d, f);
    a(b).off("orientationchange.pagescroller resize.pagescroller");
    return this.each(function () {
      var g = e, b = a(this), f = a("." + g.leftArrowClass, b), d = a("." + g.rightArrowClass, b);
      if (c.touch) {
        b.off("touchstart.pagescroller touchmove.pagescroller");
        b.off("touchend.pagescroller")
      }
      f.length > 0 && f.off("click.pagescroller");
      d.length > 0 && d.off("click.pagescroller")
    })
  }})
})(window);
(function (c, b) {
  c.registerNamespace("b365.Ui.Storage");
  var a = function () {
    this._siteStateCookieKey = "siteStateSession"
  };
  a.prototype = {getItem: function (c) {
    var a = this;
    return b.getValueFromCookie(a._siteStateCookieKey, c)
  }, setItem: function (d, c) {
    var a = this;
    b.setValueInCookie(a._siteStateCookieKey, d, c, false)
  }};
  b365.Ui.Storage.CookiesProvider = a
})(Type, $bSys);
(function (b, c) {
  c.registerNamespace("b365.Ui.Storage");
  var a = function () {
  };
  a.prototype = {getItem: function (a) {
    return b.getItem(a)
  }, setItem: function (c, a) {
    try {
      b.setItem(c, a)
    }
    catch (d) {
    }
  }};
  b365.Ui.Storage.SessionProvider = a
})(sessionStorage, Type);
(function (c, b, a) {
  b.registerNamespace("b365.Ui.Storage");
  Accessor = function () {
    this._storageProvider = null;
    if (a.sessionstorage)this._storageProvider = new b365.Ui.Storage.SessionProvider;
    else this._storageProvider = new b365.Ui.Storage.CookiesProvider
  };
  Accessor.prototype = {getItem: function (b) {
    var a = this;
    return a._storageProvider.getItem(b)
  }, setItem: function (c, b) {
    var a = this;
    a._storageProvider.setItem(c, b)
  }};
  b365.Ui.Storage.Accessor = Accessor
})(sessionStorage, Type, Modernizr);
(function (b) {
  b.registerNamespace("b365.Ui.Coupon");
  var a = function (c, b, a) {
    this._key = c;
    this._rules = b;
    this._storage = a;
    this._isValid = function () {
      return typeof this._key !== "undefined" && this._rules !== "undefined"
    };
    this._allowSort = function () {
      var a = this, b = null;
      allowSort = false;
      $.each(a._rules, function (d, c) {
        $.each(c.c, function (d, c) {
          if (c.id === a._key.classification) {
            b = c;
            return false
          }
        });
        if (b !== null && (typeof c.p === "undefined" || c.p.filter(function (b) {
          return b.id === a._key.pageTemplateId
        }).length > 0)) {
          allowSort = true;
          return false
        }
      });
      return allowSort
    }
  };
  a.prototype = {refresh: function (b) {
    if (this._isValid()) {
      var d = this;
      if (d._allowSort()) {
        for (var c = 0, e = b.length, a = null, c = 0; c < e; c++)if (typeof b[c] == "string" && b[c] != "" && b[c].startsWith("sort"))a = b[c].split("=")[1];
        if (a)d._storage.setItem("data-sort", a);
        else {
          a = d._storage.getItem("data-sort");
          if (a && a !== "null")b[e] = "sort=" + a
        }
      }
    }
  }};
  b365.Ui.Coupon.SortKeyRefresher = a
})(Type);
(function (c, a) {
  c.registerNamespace("b365.Ui.Coupon");
  var b = function () {
  };
  b.prototype = {refresh: function (s) {
    var d = null, g = null, f = null, l = null, e, c, k, h, o, m, p, r, q, j, n, i;
    a("#cpn-race a.clickpupelem_div").each(function (u, t) {
      d = a(t).attr("id");
      g = "SL" + d;
      f = s.getItem(g);
      if (f) {
        l = f.split(",");
        a(l).each(function (g, f) {
          e = f.substring(0, f.indexOf(":"));
          if (f.substring(f.indexOf(":") + 1, f.length) === "0")c = false;
          else c = true;
          if (e > 0) {
            r = a("#" + e);
            j = a(r);
            q = j.children().find("div.ttArr");
            n = j.next("tr");
            b.prototype.showHideElement(n, c);
            b.prototype.showHideElement(q, c)
          }
          else if (c) {
            k = a("#cpn-race a.clickpupelem_div#" + d);
            i = a(k);
            b.prototype.showNextDiv(k, true);
            h = "ttTable" + i.attr("id");
            o = i.parent().parent();
            m = a(o).find("tr." + h).first();
            b.prototype.showNextTableRowRec(m, h, true);
            p = a(m).parent().find("tr.ti").first();
            b.prototype.showNextDivRec(p, "ti rr", true)
          }
          e = null;
          c = null
        })
      }
      d = null;
      g = null;
      f = null;
      l = null
    })
  }, tablePopup: function (m, l) {
    var g, h, k, f, j, i, d, c, e;
    g = b.prototype.showNextTableRow(m);
    h = a(m);
    k = h.parents().next("div").first();
    b.prototype.showHideElement(k, g);
    f = h.parents("tr.ti").next("tr").attr("class");
    j = f.substring(f.indexOf("ttTable") + 7, f.indexOf(" "));
    i = "SL" + j;
    d = h.parents("tr.ti").attr("id");
    e = l.getItem(i);
    if (e) {
      c = e.split(",");
      if (g) {
        if (c.indexOf(d + ":1") <= -1)if (c.indexOf(d + ":0") > -1) {
          c.splice(a.inArray(d + ":0", c), 1);
          c.push(d + ":1")
        }
        else c.push(d + ":1")
      }
      else if (c.indexOf(d + ":1") > -1) {
        c.splice(a.inArray(d + ":1", c), 1);
        c.push(d + ":0")
      }
      else c.indexOf(d + ":0") <= -1 && c.push(d + ":0");
      e = c.join();
      c = null
    }
    else if (g)e = d + ":1";
    l.setItem(i, e)
  }, divPopup: function (k, j) {
    var c, d, f, i, g, h, e;
    c = b.prototype.showNextDiv(k);
    d = a(k);
    f = "ttTable" + d.attr("id");
    i = d.parent().parent();
    g = a(i).find("tr." + f).first();
    b.prototype.showNextTableRowRec(g, f, c);
    h = a(g).parent().find("tr.ti").first();
    b.prototype.showNextDivRec(h, "ti rr", c);
    e = "SL" + d.attr("id");
    if (c)j.setItem(e, "0:1");
    else j.setItem(e, "")
  }, showNextTableRow: function (e) {
    var b, c, d = false;
    if (e) {
      c = a(e).parents("tr").nextAll("tr").first();
      if (c && c.prop("tagName") === "TR") {
        b = a(c);
        if (b.hasClass("hidden")) {
          b.removeClass("hidden").addClass("visible");
          d = true
        }
        else b.removeClass("visible").addClass("hidden")
      }
    }
    return d
  }, showNextDiv: function (f, d) {
    var e, c, b;
    if (f) {
      e = a(f).parents("div").nextAll("div").first();
      if (e && e.prop("tagName") === "DIV") {
        c = a(e);
        b = c.prev().find("a.clickpupelem_div");
        if (d || c.hasClass("hidden")) {
          b.text(tabletML.hideinfo);
          b.append(a("<span>").addClass("fontIcon").html("&#xe00A;"));
          d = true;
          c.removeClass("hidden").addClass("visible")
        }
        else {
          b.text(tabletML.showinfo);
          b.append(a("<span>").addClass("fontIcon").html("&#xe00D;"));
          d = false;
          c.removeClass("visible").addClass("hidden")
        }
      }
    }
    return d
  }, showNextTableRowRec: function (c, d, f, b) {
    var e;
    b = (b || 0) + 1;
    if (!c)return null;
    e = a(c);
    if (d)e.attr("class") !== null && e.hasClass(d) && this.showHideElement(c, f);
    return b > 100
      ? null
      : this.showNextTableRowRec(c.next(), d, f, b)
  }, showNextDivRec: function (f, d, g, c) {
    var b, e;
    c = (c || 0) + 1;
    if (!f)return null;
    b = a(f);
    if (d)if (b.attr("class") !== null && b.hasClass(d)) {
      e = b.find("div.ttArr");
      if (!e)return null;
      this.showHideElement(e, g)
    }
    return c > 100
      ? null
      : this.showNextDivRec(f.next(), d, g, c)
  }, showHideElement: function (c, d) {
    if (c) {
      var b = a(c);
      if (d)b.removeClass("hidden").addClass("visible");
      else b.removeClass("visible").addClass("hidden")
    }
  }};
  b365.Ui.Coupon.HorseRacingInfoRefresher = b
})(Type, jQuery);
(function (b) {
  var e = location.protocol + "//" + location.hostname + (location.port
    ? ":" + location.port
    : "") + "/lite/financials/", F = location.protocol + "//" + location.hostname + (location.port
    ? ":" + location.port
    : "") +
    "/lite/ClientErrors/ClientErrorHandler.ashx", x = false, c, a, t, i, q, d, k, r, h = {1: {title: "Selections On Your Bet Slip", content: "The selections on your Bet Slip cannot be used in the Financials section and will be removed if you continue.", confirm: "Continue to Financials", cancel: "Back To Place Bet"}, 19: {title: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438 \u043d\u0430 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448", content: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438\u0442\u0435 \u043e\u0442 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448 \u043d\u0435 \u043c\u043e\u0436\u0435 \u0434\u0430 \u0431\u044a\u0434\u0430\u0442 \u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u043d\u0438 \u0432 \u0441\u0435\u043a\u0446\u0438\u044f \u0424\u0438\u043d\u0430\u043d\u0441\u0438 \u0438 \u0449\u0435 \u0431\u044a\u0434\u0430\u0442 \u043f\u0440\u0435\u043c\u0430\u0445\u043d\u0430\u0442\u0438 \u0430\u043a\u043e \u043f\u0440\u043e\u0434\u044a\u043b\u0436\u0438\u0442\u0435.", confirm: "\u041f\u0440\u043e\u0434\u044a\u043b\u0436\u0438 \u0432\u044c\u0432 \u0424\u0438\u043d\u0430\u043d\u0441\u0438", cancel: "\u0412\u044a\u0440\u043d\u0438 \u0441\u0435 \u0438 \u0417\u0430\u043b\u043e\u0436\u0438"}, 2: {title: "\u6295\u6ce8\u55ae\u4e0a\u7684\u6295\u6ce8\u9805", content: "\u60a8\u6295\u6ce8\u55ae\u4e0a\u7684\u6295\u6ce8\u9805\u7121\u6cd5\u4f7f\u7528\u5728\u91d1\u878d\u6295\u6ce8\u90e8\u5206\uff0c\u5982\u679c\u7e7c\u7e8c\uff0c\u5c07\u88ab\u79fb\u9664\u3002", confirm: "\u7e7c\u7e8c\u9032\u884c\u91d1\u878d\u6295\u6ce8", cancel: "\u8fd4\u56de\u9032\u884c\u6295\u6ce8"}, 10: {title: "\u6295\u6ce8\u5355\u4e0a\u7684\u6295\u6ce8\u9879", content: "\u60a8\u6295\u6ce8\u5355\u4e0a\u7684\u6295\u6ce8\u9879\u65e0\u6cd5\u4f7f\u7528\u5728\u91d1\u878d\u6295\u6ce8\u90e8\u5206\uff0c\u5982\u679c\u7ee7\u7eed\uff0c\u5c06\u88ab\u79fb\u9664\u3002", confirm: "\u7ee7\u7eed\u8fdb\u884c\u91d1\u878d\u6295\u6ce8", cancel: "\u8fd4\u56de\u8fdb\u884c\u6295\u6ce8"}, 24: {title: "Tipy na Va\u0161em tiketu", content: "Tipy na Va\u0161em tiketu nemohou b\u00fdt pou\u017eity v sekci Finan\u010dn\u00ed trhy. Pokud budete pokra\u010dovat, budou tyto tipy odstran\u011bny.", confirm: "Pokra\u010dovat", cancel: "Zp\u011bt na 'Vsadit'"}, 7: {title: "Valg p\u00e5 din kupon", content: "Valgene p\u00e5 din kupon kan ikke bruges i Finans-sektionen og vil blive fjernet hvis du forts\u00e6tter.", confirm: "Forts\u00e6t til Finans", cancel: "Tilbage til spil"}, 5: {title: "Tipps auf Ihrem Wettschein", content: "Die Tipps auf Ihrem Wettschein k\u00f6nnen im Wettbereich Finanzen nicht verwendet werden und werden entfernt, falls Sie fortfahren.", confirm: "Weiter", cancel: "Zur\u00fcck zu Wetten"}, 20: {title: "\u0395\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03a3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03a3\u03b1\u03c2", content: "\u039f\u03b9 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03c3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03c3\u03b1\u03c2 \u03b4\u03b5\u03bd \u03bc\u03c0\u03bf\u03c1\u03bf\u03cd\u03bd \u03bd\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b7\u03b8\u03bf\u03cd\u03bd \u03c3\u03c4\u03bf\u03bd \u03c4\u03bf\u03bc\u03ad\u03b1 \u03a7\u03c1\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03c4\u03b7\u03c1\u03af\u03bf\u03c5 \u03ba\u03b1\u03b9 \u03b8\u03b1 \u03b4\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03bf\u03cd\u03bd \u03b1\u03bd \u03c3\u03c5\u03bd\u03b5\u03c7\u03af\u03c3\u03b5\u03c4\u03b5.", confirm: "\u03a3\u03c5\u03bd\u03ad\u03c7\u03b5\u03b9\u03b1", cancel: "\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae"}, 25: {title: "V\u00e1laszt\u00e1sok a fogad\u00f3szelv\u00e9ny\u00e9n", content: "A fogad\u00f3szelv\u00e9ny\u00e9n tal\u00e1lhat\u00f3 v\u00e1laszt\u00e1sokat nem haszn\u00e1lhatja a T\u0151zsde fogad\u00e1s oldalunkon. Amennyiben tov\u00e1bb folytatja, elt\u00e1vol\u00edtjuk azokat.", confirm: "Folytat\u00e1s", cancel: "Vissza a fogad\u00e1shoz"}, 6: {title: "Selezioni della tua scommessa", content: "Le selezioni della tua scommessa non possono essere utilizzate nella sezione Finanziarie e saranno rimosse se vai avanti.", confirm: "Vai a Finanziarie", cancel: "Torna a scommettere"}, 9: {title: "Valg p\u00e5 din kupong", content: "Valgene p\u00e5 din kupong kan ikke benyttes i Finanser seksjonen og vil bli fjernet om du fortsetter.", confirm: "Fortsett til Finanser", cancel: "Tilbake til Spill"}, 21: {title: "Selekcje na Twoim kuponie", content: "Selekcje na Twoim kuponie nie mog\u0105 zosta\u0107 u\u017cyte w sekcji Finansowe i zostan\u0105 one usuni\u0119te, je\u017celi b\u0119dziesz kontynuowa\u0142.", confirm: "Przejd\u017a do Finansowe", cancel: "Wr\u00f3\u0107 do Postaw zak\u0142ad"}, 22: {title: "Selec\u00e7\u00f5es no seu Boletim de Apostas", content: "As selec\u00e7\u00f5es presentes no seu Boletim de Apostas n\u00e3o podem ser usadas na sec\u00e7\u00e3o de apostas Financeiras e ser\u00e3o removidas se continuar.", confirm: "Continuar \u2013 Financeiras", cancel: "Voltar para Apostar"}, 23: {title: "Selectiile de pe cuponul dumneavoastra", content: "Selectiile de pe cuponul dumneavoastra nu pot fi utilizate in sectiunea Pariuri Financiare si vor fi sterse daca continuati.", confirm: "Pariuri Financiare", cancel: "Inapoi (Plasati Pariul)"}, 26: {title: "Tipy na Va\u0161om tikete", content: "Tipy na Va\u0161om tikete nie je mo\u017en\u00e9 pou\u017ei\u0165 v sekcii Finan\u010dn\u00e9 trhy. Ak budete pokra\u010dova\u0165, bud\u00fa odstr\u00e1nen\u00e9.", confirm: "Pokra\u010dova\u0165", cancel: "Sp\u00e4\u0165 na 'Stavi\u0165'"}, 3: {title: "Las selecciones de su cup\u00f3n de apuestas", content: "Las selecciones de su cup\u00f3n de apuestas no se podr\u00e1n utilizar en la secci\u00f3n de 'Financieros' y ser\u00e1n eliminadas si prosigue.", confirm: "Proseguir a 'Financieros'", cancel: "Volver a 'Apostar'"}, 8: {title: "Val p\u00e5 din kupong", content: "Valen p\u00e5 din kupong kan inte kombineras med finansval och kommer d\u00e4rf\u00f6r att tas bort om du forts\u00e4tter.", confirm: "Forts\u00e4tt till Finans", cancel: "G\u00e5 tillbaka"}}, g = {1: {title: "Selections On Your Bet Slip", content: "The Financial selections on your Bet Slip cannot be used in the Sports section and will be removed if you continue.", confirm: "Continue To Sports", cancel: "Go To Place Bet"}, 19: {title: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438 \u043d\u0430 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448", content: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438\u0442\u0435 \u043e\u0442 \u0424\u0438\u043d\u0430\u043d\u0441\u0438 \u043d\u0430 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448 \u043d\u0435 \u043c\u043e\u0436\u0435 \u0434\u0430 \u0441\u0435 \u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u0442 \u0432 \u041d\u0430 \u0416\u0438\u0432\u043e \u0438 \u0449\u0435 \u0441\u0435 \u043f\u0440\u0435\u043c\u0430\u0445\u043d\u0430\u0442 \u0430\u043a\u043e \u043f\u0440\u043e\u0434\u044a\u043b\u0436\u0438\u0442\u0435.", confirm: "\u041f\u0440\u043e\u0434\u044a\u043b\u0436\u0438 \u0432 \u0421\u043f\u043e\u0440\u0442", cancel: "\u0417\u0430\u043b\u043e\u0436\u0438"}, 2: {title: "\u6295\u6ce8\u55ae\u4e0a\u7684\u6295\u6ce8\u9805", content: "\u60a8\u6295\u6ce8\u55ae\u4e0a\u7684\u91d1\u878d\u6295\u6ce8\u9805\u7121\u6cd5\u4f7f\u7528\u5728\u9ad4\u80b2\u6295\u6ce8\u90e8\u5206\uff0c\u5982\u679c\u7e7c\u7e8c\uff0c\u5c07\u88ab\u79fb\u9664\u3002", confirm: "\u7e7c\u7e8c\u9032\u884c\u9ad4\u80b2\u6295\u6ce8", cancel: "\u524d\u5f80\u6295\u6ce8\u9801\u9762"}, 10: {title: "\u6295\u6ce8\u5355\u4e0a\u7684\u6295\u6ce8\u9879", content: "\u60a8\u6295\u6ce8\u5355\u4e0a\u7684\u91d1\u878d\u6295\u6ce8\u9879\u65e0\u6cd5\u4f7f\u7528\u5728\u4f53\u80b2\u6295\u6ce8\u90e8\u5206\uff0c\u5982\u679c\u7ee7\u7eed\uff0c\u5c06\u88ab\u79fb\u9664\u3002", confirm: "\u7ee7\u7eed\u8fdb\u884c\u4f53\u80b2\u6295\u6ce8", cancel: "\u524d\u5f80\u6295\u6ce8\u9875\u9762"}, 24: {title: "Tipy na Va\u0161em tiketu", content: "Tipy na finan\u010dn\u00ed trhy na Va\u0161em tiketu nen\u00ed mo\u017en\u00e9 pou\u017e\u00edt v sekci Sport. Budete-li pokra\u010dovat, budou tyto tipy odstran\u011bny.", confirm: "Pokra\u010dovat do sekce Sport", cancel: "P\u0159ej\u00edt na 'Vsadit'"}, 7: {title: "Valg p\u00e5 din kupon", content: "Finansv\u00e6ddem\u00e5l p\u00e5 din kupon kan ikke benyttes i sport-sektionen og vil blive fjernet hvis du forts\u00e6tter.", confirm: "Forts\u00e6t til Sport", cancel: "Tilbage til v\u00e6ddem\u00e5l"}, 5: {title: "Tipps auf Ihrem Wettschein", content: "Finanz-Tipps k\u00f6nnen im Sportbereich nicht verwendet werden und werden entfernt, falls Sie fortfahren.", confirm: "Weiter zu Sport", cancel: "Weiter zur Wettplatzierung"}, 20: {title: "\u0395\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03a3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03a3\u03b1\u03c2", content: "\u039f\u03b9 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03b3\u03b9\u03b1 \u03a7\u03c1\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03c4\u03ae\u03c1\u03b9\u03bf \u03c3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03c3\u03b1\u03c2 \u03b4\u03b5\u03bd \u03bc\u03c0\u03bf\u03c1\u03bf\u03cd\u03bd \u03bd\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b7\u03b8\u03bf\u03cd\u03bd \u03c3\u03c4\u03b1 \u03a3\u03c0\u03bf\u03c1 \u03ba\u03b1\u03b9 \u03b8\u03b1 \u03b4\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03bf\u03cd\u03bd \u03b1\u03bd \u03c3\u03c5\u03bd\u03b5\u03c7\u03af\u03c3\u03b5\u03c4\u03b5.", confirm: "\u03a3\u03c5\u03bd\u03ad\u03c7\u03b5\u03b9\u03b1 \u03a3\u03c4\u03b1 \u03a3\u03c0\u03bf\u03c1", cancel: "\u03a0\u03c1\u03bf\u03c2 \u03a3\u03c4\u03bf\u03b9\u03c7\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03bc\u03cc"}, 25: {title: "V\u00e1laszt\u00e1sok a fogad\u00f3szelv\u00e9ny\u00e9n", content: "A szelv\u00e9ny\u00e9n l\u00e9v\u0151 v\u00e1laszt\u00e1sokat nem haszn\u00e1lhatja az \u00c9l\u0151 fogad\u00e1s oldalunkon. Ha tov\u00e1bb folytatja, elt\u00e1vol\u00edtjuk azokat.", confirm: "Tov\u00e1bb a Sportokhoz", cancel: "Fogad\u00e1s lead\u00e1sa"}, 6: {title: "Selezioni della tua scommessa", content: "Le selezioni Finanziarie della tua scommessa non sono utilizzabili nella sezione Sport e saranno rimosse se vai avanti.", confirm: "Vai allo Sport", cancel: "Torna  alle scommesse"}, 9: {title: "Valg p\u00e5 din kupong", content: "Finansveddem\u00e5l p\u00e5 din kupong kan ikke benyttes i Sport seksjonen og vil bli fjernet om du fortsetter.", confirm: "Fortsett til Sport", cancel: "Tilbake til Spill"}, 21: {title: "Selekcje na Twoim kuponie", content: "Selekcje Finansowe  na Twoim kuponie nie mog\u0105 zosta\u0107 u\u017cyte w sekcji Na \u017cywo i zostan\u0105 usuni\u0119te, je\u017celi b\u0119dziesz kontynuowa\u0142.", confirm: "Przejd\u017a do Sporty", cancel: "Voltar \u00e0 Coloca\u00e7\u00e3o da Aposta"}, 22: {title: "Selec\u00e7\u00f5es no seu Boletim de Apostas", content: "As sele\u00e7\u00f5es Financeiras n\u00e3o podem ser usadas na sec\u00e7\u00e3o de Desportos, se continuar ser\u00e3o removidas do seu Boletim.", confirm: "Continuar Para Desportos", cancel: "Postaw zak\u0142ad"}, 23: {title: "Selectiile de pe cuponul dumneavoastra", content: "Pariurile Financiare de pe cuponul dumneavoastra nu pot fi utilizate in sectiunea Pariuri Sportive si vor fi sterse daca continuati.", confirm: "Pariuri Sportive", cancel: "Anulati"}, 26: {title: "Tipy na Va\u0161om tikete", content: "Tipy na finan\u010dn\u00e9 trhy na Va\u0161om tikete nie je mo\u017en\u00e9 pou\u017ei\u0165 v sekcii \u0160port. Ak budete pokra\u010dova\u0165, bud\u00fa odstr\u00e1nen\u00e9.", confirm: "Pokra\u010dova\u0165 do sekcie \u0160port", cancel: "Prejs\u0165 na 'Stavi\u0165'"}, 3: {title: "Las selecciones de su cup\u00f3n de apuestas", content: "Selecciones a Financieros en cup\u00f3n de apuestas no se podr\u00e1n usar en Deportes. Se eliminar\u00e1n si prosigue.", confirm: "Continuar a 'Deportes'", cancel: "Volver a 'Apostar'"}, 8: {title: "Val p\u00e5 din kupong", content: "Finansvalen p\u00e5 din kupong kan inte kombineras med val fr\u00e5n Sport och kommer d\u00e4rf\u00f6r att tas bort om du forts\u00e4tter.", confirm: "Forts\u00e4tt till Sport", cancel: "Placera spel"}}, f = {1: {title: "Selections On Your Bet Slip", content: "The Financials selections on your Bet Slip cannot be used in the In-Play section and will be removed if you continue.", confirm: "Continue To In-Play", cancel: "Go To Place Bet"}, 19: {title: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438 \u043d\u0430 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448", content: "\u0421\u0435\u043b\u0435\u043a\u0446\u0438\u0438\u0442\u0435 \u043e\u0442 \u0424\u0438\u043d\u0430\u043d\u0441\u0438 \u043d\u0430 \u0412\u0430\u0448\u0438\u044f \u0424\u0438\u0448 \u043d\u0435 \u043c\u043e\u0436\u0435 \u0434\u0430 \u0441\u0435 \u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u0442 \u0432 \u0441\u0435\u043a\u0446\u0438\u044f \u041d\u0430 \u0416\u0438\u0432\u043e \u0438 \u0449\u0435 \u0441\u0435 \u043f\u0440\u0435\u043c\u0430\u0445\u043d\u0430\u0442 \u0430\u043a\u043e \u043f\u0440\u043e\u0434\u044a\u043b\u0436\u0438\u0442\u0435.", confirm: "\u041f\u0440\u043e\u0434\u044a\u043b\u0436\u0438 \u0432 \u041d\u0430 \u0416\u0438\u0432\u043e", cancel: "\u0417\u0430\u043b\u043e\u0436\u0438"}, 2: {title: "\u6295\u6ce8\u55ae\u4e0a\u7684\u6295\u6ce8\u9805", content: "\u60a8\u6295\u6ce8\u55ae\u4e0a\u7684\u91d1\u878d\u6295\u6ce8\u9805\u7121\u6cd5\u4f7f\u7528\u5728\u8d70\u5730\u76e4\u90e8\u5206\uff0c\u5982\u679c\u7e7c\u7e8c\uff0c\u5c07\u88ab\u79fb\u9664\u3002", confirm: "\u7e7c\u7e8c\u9032\u884c\u8d70\u5730\u76e4", cancel: "\u524d\u5f80\u6295\u6ce8\u9801\u9762"}, 10: {title: "\u6295\u6ce8\u5355\u4e0a\u7684\u6295\u6ce8\u9879", content: "\u60a8\u6295\u6ce8\u5355\u4e0a\u7684\u91d1\u878d\u6295\u6ce8\u9879\u65e0\u6cd5\u4f7f\u7528\u5728\u6eda\u7403\u76d8\u90e8\u5206\uff0c\u5982\u679c\u7ee7\u7eed\uff0c\u5c06\u88ab\u79fb\u9664\u3002", confirm: "\u7ee7\u7eed\u8fdb\u884c\u6eda\u7403\u76d8", cancel: "\u524d\u5f80\u6295\u6ce8\u9875\u9762"}, 24: {title: "Tipy na Va\u0161em tiketu", content: "Tipy na finan\u010dn\u00ed trhy na Va\u0161em tiketu nemohou b\u00fdt pou\u017eity v sekci Live s\u00e1zek. Pokud budete pokra\u010dovat, budou tyto tipy odstran\u011bny.", confirm: "OK", cancel: "P\u0159ej\u00edt na 'Vsadit'"}, 7: {title: "Valg p\u00e5 din kupon", content: "Finansv\u00e6ddem\u00e5l p\u00e5 din kupon kan ikke bruges i Liveodds-sektionen og vil blive fjernet hvis du forts\u00e6tter.", confirm: "Forts\u00e6t til Liveodds", cancel: "Tilbage til v\u00e6ddem\u00e5l"}, 5: {title: "Tipps auf Ihrem Wettschein", content: "Die Finanzwetten-Tipps auf Ihrem Wettschein sind nicht f\u00fcr den Live-Bereich g\u00fcltig und werden entfernt, wenn Sie den Vorgang fortsetzen.", confirm: "Weiter zu Live-Wetten", cancel: "Weiter zur Wettplatzierung"}, 20: {title: "\u0395\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03a3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03a3\u03b1\u03c2", content: "\u039f\u03b9 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03b3\u03b9\u03b1 \u03a7\u03c1\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03c4\u03ae\u03c1\u03b9\u03bf \u03c3\u03c4\u03bf \u0394\u03b5\u03bb\u03c4\u03af\u03bf \u03c3\u03b1\u03c2 \u03b4\u03b5\u03bd \u03bc\u03c0\u03bf\u03c1\u03bf\u03cd\u03bd \u03bd\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b7\u03b8\u03bf\u03cd\u03bd \u03c3\u03c4\u03bf\u03bd \u03c4\u03bf\u03bc\u03ad\u03b1 \u03a3\u03b5-\u0395\u03be\u03ad\u03bb\u03b9\u03be\u03b7 \u03ba\u03b1\u03b9 \u03b8\u03b1 \u03b4\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03bf\u03cd\u03bd \u03b1\u03bd \u03c3\u03c5\u03bd\u03b5\u03c7\u03af\u03c3\u03b5\u03c4\u03b5.", confirm: "\u03a3\u03c5\u03bd\u03ad\u03c7\u03b5\u03b9\u03b1 \u03a3\u03c4\u03b1 \u03a3\u03b5-\u0395\u03be\u03ad\u03bb\u03b9\u03be\u03b7", cancel: "\u03a0\u03c1\u03bf\u03c2 \u03a3\u03c4\u03bf\u03b9\u03c7\u03b7\u03bc\u03b1\u03c4\u03b9\u03c3\u03bc\u03cc"}, 25: {title: "V\u00e1laszt\u00e1sok a fogad\u00f3szelv\u00e9ny\u00e9n", content: "A fogad\u00f3szelv\u00e9ny\u00e9n tal\u00e1lhat\u00f3 T\u0151zsde v\u00e1laszt\u00e1sokat nem haszn\u00e1lhatja \u00c9l\u0151 fogad\u00e1s oldalunkon. Amennyiben tov\u00e1bb folytatja, elt\u00e1vol\u00edtjuk azokat.", confirm: "Tov\u00e1bb az \u00c9l\u0151 fogad\u00e1shoz", cancel: "Fogad\u00e1s lead\u00e1sa"}, 6: {title: "Selezioni della tua scommessa", content: "Le selezioni Finanziarie della tua schedina non possono essere utilizzate nella sezione 'In Tempo Reale' per cui saranno rimosse se continui.", confirm: "Vai al Tempo Reale", cancel: "Torna  alle scommesse"}, 9: {title: "Valg p\u00e5 din kupong", content: "Finansvalgene p\u00e5 din kupong kan ikke bli benyttes i Liveodds-seksjonen og vil bli fjernet hvis du fortsetter.", confirm: "Fortsett til Liveodds", cancel: "Tilbake til Spill"}, 21: {title: "Selekcje na Twoim kuponie", content: "Selekcje Finansowe na Twoim kuponie nie mog\u0105 zosta\u0107 u\u017cyte w sekcji Na \u017cywo i zostan\u0105 usuni\u0119te, je\u017celi b\u0119dziesz kontynuowa\u0142.", confirm: "Przejd\u017a do Na \u017cywo", cancel: "Voltar \u00e0 Coloca\u00e7\u00e3o da Aposta"}, 22: {title: "Selec\u00e7\u00f5es no seu Boletim de Apostas", content: "As sele\u00e7\u00f5es de apostas Financeiras presentes no seu Boletim de Aposta n\u00e3o s\u00e3o v\u00e1lidas na sec\u00e7\u00e3o Ao-Vivo e ser\u00e3o removidas se continuar.", confirm: "Continuar Para a Sec\u00e7\u00e3o Ao-Vivo", cancel: "Postaw zak\u0142ad"}, 23: {title: "Selectiile de pe cuponul dumneavoastra", content: "Pariurile sportive sunt incompatibile cu selectiile existente pe cuponul dumneavoastra de pariere. Apasati pe OK pentru a sterge selectiile de pe cupon si a continua.", confirm: "OK", cancel: "Anulati"}, 26: {title: "Tipy na Va\u0161om tikete", content: "Tipy na finan\u010dn\u00e9 trhy na Va\u0161om tikete nie je mo\u017en\u00e9 pou\u017ei\u0165 v St\u00e1vkach na\u017eivo. Ak budete pokra\u010dova\u0165, bud\u00fa odstr\u00e1nen\u00e9.", confirm: "Pokra\u010dova\u0165 do St\u00e1vok na\u017eivo", cancel: "Prejs\u0165 na 'Stavi\u0165'"}, 3: {title: "Las selecciones de su cup\u00f3n de apuestas", content: "Las selecciones 'Financieras' en su cup\u00f3n no pueden ser usadas en apuestas 'en directo' y ser\u00e1n eliminadas si prosigue.", confirm: "Continuar a 'En directo'", cancel: "Volver a 'Apostar'"}, 8: {title: "Val p\u00e5 din kupong", content: "Finansvalen p\u00e5 din kupong kan inte kombineras med liveoddsval och kommer d\u00e4rf\u00f6r att tas bort om du forts\u00e4tter.", confirm: "Forts\u00e4tt till Liveodds", cancel: "Placera spel"}}, o = function () {
    this.show = function () {
      var a = $("#lteBdy_greyout"), b = $("#lteBdy"), d = $("#dvRpg"), h = window, e = document, f = e.documentElement, g = e.getElementsByTagName("body")[0], i = h.innerWidth ||
        f.clientWidth || g.clientWidth, j = h.innerHeight || f.clientHeight || g.clientHeight;
      if (a.length == 0) {
        a = document.createElement("div");
        b[0].appendChild(a);
        var c = b.attr("data-overlay-class");
        if (c === null || typeof c === "undefined")c = "centergreyout";
        a.id = "lteBdy_greyout";
        a.className = c;
        a.style.position = "absolute";
        a.style.display = "block";
        a.style.zIndex = "10000";
        a.style.top = "0";
        a.style.left = "0";
        a.style.height = b.css("height");
        a.style.width = b.css("width")
      }
      d.css("top", Math.round(j / 2) - 150 + "px");
      d.css("left", Math.round(i / 2) - 22 + "px");
      d.removeClass("hidden")
    };
    this.hide = function () {
      var a = $("#lteBdy_greyout"), b = $("#dvRpg");
      if (a.length > 0) {
        a.addClass("hidden");
        a[0].parentNode.removeChild(a[0])
      }
      b.addClass("hidden")
    }
  }, n = {level: "lvl", message: "msg", additionInformation: "ai"};

  function z() {
    $("#LHSWrapper", "div.GlobalWrapper").remove();
    $("#RHSWrapper", "div.GlobalWrapper").hide();
    $("#MiddleWrapper", "div.GlobalWrapper").remove();
    $("div.lhsHeader", "div.GlobalWrapper").remove();
    $("div", "#headerContainer").remove();
    $("#Financials").show()
  }

  function B() {
    if (window.carousel) {
      window.carousel = null;
      if (window.carouselTimer) {
        clearTimeout(window.carouselTimer);
        window.carouselTimer = null
      }
      $(".homeCarousel").length > 0 && $(document).removeClass(".homeCarousel")
    }
    if (typeof mf._b365AJAX != "undefined" && mf._b365AJAX != null)mf._b365AJAX = null;
    (new b365.Ui.AutoRefreshController).pauseRF();
    (new b365.Ui.AutoRefreshController).disableRF()
  }

  function E() {
    $(document).off();
    $("body").unbind("click");
    window.orch.removeListeners();
    window.onhashchange = function () {
    }
  }

  function K() {
    v();
    a != null && m();
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: e + "manifest.json", cache: false}).done(function (b) {
      a = b.Tablet;
      t = b.Languages.Files;
      D()
    }).fail(function (c, b, a) {
      j(c, b, a)
    })
  }

  function D() {
    var b, c;
    x = I(a.Debug);
    for (b = 0, c = a.CSSFiles.Files.length; b < c; b++)$("head").find("link[href='" + e + a.CSSFiles.Files[b].FileName + "']").length == 0 &&
    $("head").append($("<link>").attr({rel: "stylesheet", type: "text/css", href: e + a.CSSFiles.Files[b].FileName}));
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: e + a.HTMLFile, cache: false}).done(function (a) {
      $("#Financials")[0].innerHTML = a;
      i = -1;
      w()
    }).fail(function (c, b, a) {
      j(c, b, a)
    })
  }

  function m() {
    var c, d, b;
    for (c = 0, d = a.CSSFiles.Files.length; c < d; c++) {
      b = $("link[href='" + e + a.CSSFiles.Files[c].FileName + "']");
      if (b.length > 0) {
        $(b).attr("disabled", "disabled");
        $(b).remove()
      }
    }
    for (c = 0, d = a.JSFiles.Files.length; c < d; c++) {
      b = $("script[src='" + e + a.JSFiles.Files[c].FileName + "']");
      if (b.length > 0) {
        $(b).attr("disabled", "disabled");
        $(b).remove()
      }
    }
  }

  function w() {
    if (i < a.JSFiles.Files.length - 1) {
      i += 1;
      H(e + a.JSFiles.Files[i].FileName, w)
    }
    else J()
  }

  function l() {
    var c = $("body"), a = c.attr("class"), b = "1";
    if (a.indexOf("lng_") > -1)b = a.indexOf(" ") == -1
      ? a.replace("lng_", "")
      : a.substr(0, a.indexOf(" ")).replace("lng_", "");
    return b
  }

  function C() {
    var a = "", c = document.getElementById("gf-cok"), d = document.getElementById("gf-upr"), b = document.getElementById("gf-lic");
    a = d
      ? d.innerHTML
      : "";
    if (a != "")a += "<br /><br />";
    a += c
      ? c.innerHTML
      : "";
    if (a != "")a += "<br /><br />";
    a += b
      ? b.innerHTML
      : "";
    if (a == "<br /><br />")a = "";
    c = null;
    b = null;
    return a
  }

  function J() {
    window.bet365.financials.masterController.initialise(e, "Financials", window.sProps.financialSettings.ConnectionDetails[0].Host,
      window.sProps.financialSettings.ConnectionDetails[1].Host, $bSys.getValueFromCookie("pstk", ""), "SYMBOLS", window.FinancialsNavController.overlayOn,
      window.FinancialsNavController.overlayOff, window.FinancialsNavController.UpdateBalance, window.FinancialsNavController.Deposit, t, x,
      window.FinancialsNavController.exceptionHandler, !!document.getElementById("MyAccountPanel"), l(), q);
    mf && mf._lgnFailed && $("#loginButton").trigger("click");
    window.addEventListener("orientationchange", function () {
      var d = window, a = document, b = a.documentElement, c = a.getElementsByTagName("body")[0], e = d.innerWidth || b.clientWidth ||
        c.clientWidth, f = d.innerHeight || b.clientHeight || c.clientHeight;
      if (e < f)typeof window.bet365 != "undefined" && typeof window.bet365.financials != "undefined" && window.bet365.financials.viewController.portraitMode();
      else typeof window.bet365 != "undefined" && typeof window.bet365.financials != "undefined" && window.bet365.financials.viewController.landscapeMode()
    }, false);
    window.addEventListener("resize", function () {
      var d = window, a = document, b = a.documentElement, c = a.getElementsByTagName("body")[0], e = d.innerWidth || b.clientWidth ||
        c.clientWidth, f = d.innerHeight || b.clientHeight || c.clientHeight;
      if (e < f)typeof window.bet365 != "undefined" && typeof window.bet365.financials != "undefined" && window.bet365.financials.viewController.portraitMode();
      else typeof window.bet365 != "undefined" && typeof window.bet365.financials != "undefined" && window.bet365.financials.viewController.landscapeMode()
    }, false)
  }

  function j(c, b, a) {
    console.log("AJAX Error:" + a + " Status: " + b);
    u()
  }

  function H(b, a) {
    if (!b || !(typeof b === "string") || $('script[src="' + b + '"]').length > 0)if (a)a();
    else return;
    var c = document.createElement("script");
    if (typeof document.attachEvent === "object")c.onreadystatechange = function () {
      if (c.readyState === "loaded")if (a) {
        console.log("Script: " + b + " ready...");
        a()
      }
    };
    else c.onload = function () {
      if (a) {
        console.log("Script: " + b + " ready...");
        a()
      }
    };
    c.src = b;
    document.getElementsByTagName("head")[0].appendChild(c)
  }

  function I(b) {
    var a;
    if (b.match(/^(true|1|yes)$/i) !== null)a = true;
    else if (b.match(/^(false|0|no)*$/i) !== null)a = false;
    else a = null;
    return a
  }

  function v() {
    if (c === null || typeof c === "undefined") {
      c = new o;
      c.show()
    }
    else c.show()
  }

  function u() {
    c !== null && typeof c !== "undefined" && c.hide()
  }

  function G(a) {
    if (typeof a != "undefined" && a !== null) {
      var b = $(".Total > span:first-child", "#MyAccountPanel");
      if (b.length > 0) {
        var c = p(b[0].innerHTML, window.FinancialsCurrencyDecimalSeperator, window.FinancialsCurrencyGroupSeperator);
        a = p(a, window.FinancialsCurrencyDecimalSeperator, window.FinancialsCurrencyGroupSeperator);
        var d = ((c * 100 - a * 100) / 100).toLocaleCurrency(2, window.FinancialsCurrencyDecimalSeperator, window.FinancialsCurrencyGroupSeperator);
        b[0].innerHTML = d;
        b = null
      }
    }
  }

  function p(b, c, d) {
    if (!isNaN(b))return b;
    else {
      var a, e = new RegExp("[" + d + "]", "g");
      a = b.replace(e, "");
      a = a.replace(c, ".");
      a = parseFloat(a).toFixed(2);
      if (isNaN(a))a = "0";
      return a
    }
  }

  function s() {
    q = C();
    $("#prlnk").find("li > a").removeClass("selected");
    $("#idF", "#prlnk").addClass("selected");
    $("#sbTMN-otr").off("click").on("click", function (b) {
      var a = b.target.id, d;
      d = a.indexOf("id") == 0 || a.indexOf("prdid.") == 0;
      if (d) {
        b.preventDefault();
        b.stopPropagation();
        if (a == "idFTxt" || a == "idF")return;
        if (a.indexOf("prdid.") == -1) {
          var c = window.bet365.financials.betSlipData.data();
          if (typeof c != "undefined" && c != null && c.uniqueId != null) {
            r = a;
            y(a);
            return
          }
          else window.FinancialsNavController.dispose(a)
        }
        else mf.idtapi(b.target.parentElement.id)
      }
      else {
        var e = b.target.parentElement.id;
        switch (e) {
          case"historyLink":
          case"membersBtnDropDown":
          case"messagingLink":
          case"lnkLO":
          case"login":
          case"":
            break;
          default:
            b.preventDefault();
            b.stopPropagation()
        }
      }
    });
    E();
    B();
    z();
    K()
  }

  function y(i) {
    var a = l(), b = document.getElementById("bsCD"), h = document.getElementById("bsDBdy"), c = document.getElementById("bsCnfrm"), e = document.getElementById("bsCan"), j = document.getElementById("lteBdy_greyout");
    if (i == "idIPTxt") {
      b.childNodes[3].innerHTML = f[a].title;
      h.innerHTML = f[a].content;
      c.innerHTML = f[a].confirm;
      e.innerHTML = f[a].cancel
    }
    else {
      b.childNodes[3].innerHTML = g[a].title;
      h.innerHTML = g[a].content;
      c.innerHTML = g[a].confirm;
      e.innerHTML = g[a].cancel
    }
    d = new b365.Ui.PUpDialog(null, b, j);
    d.showDialog();
    c = null;
    e = null;
    h = null;
    $addHandler(b, "click", Function.createDelegate(window.FinancialsNavController, window.FinancialsNavController.financialsDialogClicked))
  }

  function A() {
    var a = l(), b = document.getElementById("bsCD"), f = document.getElementById("bsDBdy"), c = document.getElementById("bsCnfrm"), e = document.getElementById("bsCan"), g = document.getElementById("lteBdy_greyout");
    b.childNodes[3].innerHTML = h[a].title;
    f.innerHTML = h[a].content;
    c.innerHTML = h[a].confirm;
    e.innerHTML = h[a].cancel;
    d = new b365.Ui.PUpDialog(null, b, g);
    d.showDialog();
    c = null;
    e = null;
    f = null;
    $addHandler(b, "click", Function.createDelegate(window.FinancialsNavController, window.FinancialsNavController.sportsDialogClicked))
  }

  b.show = function (a) {
    k = a;
    if (typeof betSlipController != "undefined" && typeof betSlipController._bsInst != "undefined" && betSlipController._bsInst.numItems() > 0)A();
    else s()
  };
  b.sportsDialogClicked = function (b) {
    var a = b.target.id;
    switch (a) {
      case"bsCnfrm":
        d.hideDialog();
        betSlipController._bsInst.clearBets("");
        s();
        break;
      default:
        d.hideDialog();
        if (typeof k == "undefined")document.location.hash = "";
        else document.location.hash = k
    }
  };
  b.financialsDialogClicked = function (b) {
    var a = b.target.id;
    switch (a) {
      case"bsCnfrm":
        d.hideDialog();
        window.bet365.financials.betSlipController.clearBetSlip();
        window.FinancialsNavController.dispose(r);
        break;
      default:
        d.hideDialog();
        $("li > a", "#prlnk").removeClass("selected");
        $("#idF", "#prlnk").addClass("selected")
    }
  };
  b.overlayOn = function () {
    v()
  };
  b.overlayOff = function () {
    u()
  };
  b.UpdateBalance = function (a) {
    G(a)
  };
  b.Deposit = function (f) {
    var c, e, d, b, a = f.split("|");
    c = parseFloat(a[1]);
    e = parseFloat(a[2]);
    d = a[3] == "true"
      ? 1
      : 0;
    b = a[4] == "true"
      ? 1
      : 0;
    if (b == 1)window.betSlipController.deposit({userBalance: c, totalStake: e, is3dSecure: d, isQuickDeposit: b});
    else window.bet365.financials.betSlipUi.showDepositDialogue()
  };
  b.backButtonReset = function () {
    if (typeof window.bet365 != "undefined" && typeof window.bet365.financials != "undefined" &&
      typeof window.bet365.financials.masterController != "undefined") {
      o = null;
      $("#sbTMN-otr").off("click").on("click", function (a) {
        plk.onItemClick(a)
      });
      $("#Financials").hide();
      window.bet365.financials.masterController.dispose();
      window.bet365.financials = null;
      window.bet365 = null;
      m();
      a = null;
      $("#Financials").innerHTML = "";
      window.setTimeout(function () {
        window.location.reload(true)
      }, 1e3)
    }
  };
  b.exceptionHandler = function (d, c, a) {
    var b = "?" + n.level + "=" + d + "&" + n.message + "=" + c;
    if (typeof a != "undefined" && a != null)b += "&" + n.additionInformation + "=" + a;
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: F + b, cache: false}).done(function (a) {
      a === "Bad Request" && j(null, "Bad Request made to Exceptions Handler.", "Invalid QS parameters.")
    }).fail(function (c, b, a) {
      j(c, b, a)
    })
  };
  b.dispose = function (a) {
    $("#idF", "#prlnk").removeClass("selected");
    o = null;
    $("#sbTMN-otr").off("click").on("click", function (a) {
      plk.onItemClick(a)
    });
    $("#Financials").hide();
    window.bet365.financials.masterController.dispose();
    window.bet365.financials = null;
    window.bet365 = null;
    m();
    window.onhashchange = function () {
    };
    if (a == "idIPTxt") {
      $("#Financials").innerHTML = "";
      window.location.href = window.location.protocol + "//" + window.location.hostname + "/lite/#!in-play/overview/";
      window.setTimeout(function () {
        window.location.reload(true)
      }, 1e3)
    }
    else {
      $("#Financials").innerHTML = "";
      window.location.href = window.location.protocol + "//" + window.location.hostname + "/lite/";
      window.setTimeout(function () {
        window.location.reload(true)
      }, 1e3)
    }
  }
})(window.FinancialsNavController = window.FinancialsNavController || {});
$(document).ready(function () {
  Number.prototype.toLocaleCurrency = function (f, h, e) {
    var c = this, d = isNaN(f)
      ? 2
      : Math.abs(f), j = h || ".", g = typeof e === "undefined"
      ? ","
      : e, i = c < 0
      ? "-"
      : "", b = parseInt(c = Math.abs(c).toFixed(d)) + "", a = (a = b.length) > 3
      ? a % 3
      : 0;
    return i + (a
      ? b.substr(0, a) + g
      : "") + b.substr(a).replace(/(\d{3})(?=\d)/g, "$1" + g) + (d
      ? j + Math.abs(c - b).toFixed(d).slice(2)
      : "")
  };
  var a = Sys.Application.get_stateString();
  (a == "!financials" || a == "!Financials") && FinancialsNavController.show()
});
(function (b) {
  var a, e = !Modernizr.touch || Modernizr.touch && Modernizr.overflowscrolling, d = "", c = false, m, f = false, l = false;

  function g() {
    $("#betSlipButton", "#myBetsHeader").off("click").on("click", function (f) {
      f.preventDefault();
      f.stopPropagation();
      var b = $("#myBetsHeader"), e = $("#myBetsHeaderInPlay");
      if (!$("#betSlipButton", b).parent().hasClass("on")) {
        $("#betSlipButton", b).parent().addClass("on");
        $("#myBetsButton", b).parent().removeClass("on");
        $("#betSlipButtonInPlay", e).parent().addClass("on");
        $("#myBetsButtonInPlay", e).parent().removeClass("on")
      }
      d = "bs";
      if (c) {
        if ($("#RHSWrapper").hasClass("notshown")) {
          $("#RHSScroller", a).removeClass("notshown");
          $("#RHSMyBetsScroller", a).addClass("notshown");
          $("#RHSWrapper").removeClass("mybets").removeClass("notshown")
        }
        else if (!$("#RHSScroller").hasClass("notshown"))$("#RHSWrapper").addClass("notshown");
        else if ($("#RHSScroller", a).hasClass("notshown")) {
          $("#RHSScroller", a).removeClass("notshown");
          $("#RHSMyBetsScroller", a).addClass("notshown");
          $("#RHSWrapper").removeClass("mybets")
        }
      }
      else if ($("#RHSScroller", a).hasClass("notshown")) {
        $("#RHSScroller", a).removeClass("notshown");
        $("#RHSMyBetsScroller", a).addClass("notshown")
      }
      typeof window.MyBetsJS !== "undefined" && window.MyBetsJS !== null && i()
    });
    $("#myBetsButton", "#myBetsHeader").off("click").on("click", function (i) {
      i.preventDefault();
      i.stopPropagation();
      k();
      var b = $("#myBetsHeader"), f = $("#myBetsHeaderInPlay");
      if ($("#betSlipButton", b).parent().hasClass("on")) {
        $("#betSlipButton", b).parent().removeClass("on");
        $("#myBetsButton", b).parent().addClass("on");
        $("#betSlipButtonInPlay", f).parent().removeClass("on");
        $("#myBetsButtonInPlay", f).parent().addClass("on")
      }
      d = "mb";
      if (c) {
        if ($("#RHSWrapper").hasClass("notshown")) {
          $("#RHSScroller", a).addClass("notshown");
          $("#RHSMyBetsScroller", a).removeClass("notshown");
          $("#RHSWrapper").removeClass("notshown").addClass("mybets")
        }
        else if (!$("#RHSMyBetsScroller").hasClass("notshown"))$("#RHSWrapper").addClass("notshown");
        else if (!$("#RHSScroller", a).hasClass("notshown")) {
          $("#RHSScroller", a).addClass("notshown");
          $("#RHSMyBetsScroller", a).removeClass("notshown");
          $("#RHSWrapper").addClass("mybets")
        }
      }
      else if (!$("#RHSScroller", a).hasClass("notshown")) {
        $("#RHSScroller", a).addClass("notshown");
        $("#RHSMyBetsScroller", a).removeClass("notshown")
      }
      var g = e
        ? "#RHSMyBetsScroller"
        : window;
      if (typeof window.MyBetsJS === "undefined" || window.MyBetsJS === null) {
        window.MyBetsJS = new MyBetsClass("MyBets/MyBets.ashx", location.protocol + "//" + location.hostname + (location.port
          ? ":" + location.port
          : "") + "/BetSlip/MyBets/CloseBet.ashx", "MyBets/MyBetsErrors.ashx", window.MyBetsAutoRefresh, window.MyBetsConfirmAutoRefresh,
          window.MyBetsTitaniumDownRefresh, window.MyBetsBetsPerPage, "RHSMyBets", "mbDiv", "mbToolTip", null, window.MyBetsController.overlayOn,
          window.MyBetsController.overlayOff, null, window.MyBetsController.spinnerImage, window.MyBetsController, g, "#RHSWrapper",
          window.MyBetsController.updateBalance, window.MyBetsController.hideFeature, window.MyBetsController.bindButtonEvents,
          window.MyBetsController.disableButtonEvents, window.MyBetsCloseBetsEnabled, true, location.protocol + "//" + location.hostname + (location.port
            ? ":" + location.port
            : "") + "/lite/default.aspx");
        window.MyBetsJS.initialise()
      }
      else {
        window.MyBetsJS.domTargetId = "#mbDiv";
        window.MyBetsJS.domContextId = "#RHSMyBets";
        window.MyBetsJS.scrollContext = g;
        h()
      }
    });
    $("body").off("click", "#betSlipButtonInPlay").on("click", "#betSlipButtonInPlay", "click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var c = $("#myBetsHeader"), b = $("#myBetsHeaderInPlay");
      if ($("#myBetsButtonInPlay", b).parent().hasClass("on")) {
        $("#betSlipButton", c).parent().addClass("on");
        $("#myBetsButton", c).parent().removeClass("on");
        $("#betSlipButtonInPlay", b).parent().addClass("on");
        $("#myBetsButtonInPlay", b).parent().removeClass("on")
      }
      d = "bs";
      if (!$("#MyBetsInPlay", a).hasClass("notshown")) {
        $("#MyBetsInPlay", a).addClass("notshown");
        $("#bsDiv", a).removeClass("notshown")
      }
      typeof window.MyBetsJS !== "undefined" && window.MyBetsJS !== null && i()
    });
    $("body").off("click", "#myBetsButtonInPlay").on("click", "#myBetsButtonInPlay", "click", function (g) {
      g.preventDefault();
      g.stopPropagation();
      k();
      var f = $("#myBetsHeader"), b = $("#myBetsHeaderInPlay");
      if ($("#betSlipButtonInPlay", b).parent().hasClass("on")) {
        $("#betSlipButton", f).parent().removeClass("on");
        $("#myBetsButton", f).parent().addClass("on");
        $("#betSlipButtonInPlay", b).parent().removeClass("on");
        $("#myBetsButtonInPlay", b).parent().addClass("on")
      }
      d = "mb";
      if ($("#MyBetsInPlay", a).hasClass("notshown")) {
        $("#MyBetsInPlay", a).removeClass("notshown");
        $("#bsDiv", a).addClass("notshown")
      }
      var c = e
        ? "#RHSScroller"
        : window;
      if (typeof window.MyBetsJS === "undefined" || window.MyBetsJS === null) {
        window.MyBetsJS = new MyBetsClass("MyBets/MyBets.ashx", location.protocol + "//" + location.hostname + (location.port
          ? ":" + location.port
          : "") + "/BetSlip/MyBets/CloseBet.ashx", "MyBets/MyBetsErrors.ashx", window.MyBetsAutoRefresh, window.MyBetsConfirmAutoRefresh,
          window.MyBetsTitaniumDownRefresh, window.MyBetsBetsPerPage, "RHSScroller", "MyBetsInPlay", "mbToolTip", null, window.MyBetsController.overlayOn,
          window.MyBetsController.overlayOff, null, window.MyBetsController.spinnerImage, window.MyBetsController, c, "#RHSWrapper",
          window.MyBetsController.updateBalance, window.MyBetsController.hideFeature, window.MyBetsController.bindButtonEvents,
          window.MyBetsController.disableButtonEvents, window.MyBetsCloseBetsEnabled, true, location.protocol + "//" + location.hostname + (location.port
            ? ":" + location.port
            : "") + "/lite/default.aspx");
        window.MyBetsJS.initialise()
      }
      else {
        if (window.MyBetsJS.domTargetId != "#MyBetsInPlay") {
          window.MyBetsJS.domTargetId = "#MyBetsInPlay";
          window.MyBetsJS.domContextId = "#RHSScroller";
          window.MyBetsJS.scrollContext = c
        }
        h()
      }
    });
    f = true
  }

  function n() {
    $("#betSlipButton", "#myBetsHeader").off("click");
    $("#myBetsButton", "#myBetsHeader").off("click");
    $("body").off("click", "#myBetsButtonInPlay").on("click", "#myBetsButtonInPlay", "click", function (a) {
      a.stopPropagation();
      a.preventDefault()
    });
    $("body").off("click", "#betSlipButtonInPlay").on("click", "#betSlipButtonInPlay", "click", function (a) {
      a.stopPropagation();
      a.preventDefault()
    });
    $(".betSlipPopupHeader", "#headerContainer").off("click");
    f = false
  }

  function h() {
    window.MyBetsJS.addHandlers(window.MyBetsJS);
    window.MyBetsJS.update(window.MyBetsJS)
  }

  function i() {
    window.MyBetsJS.stopAjax(window.MyBetsJS);
    window.MyBetsJS.toolTip.hide();
    window.MyBetsJS.removeHandlers(window.MyBetsJS)
  }

  function k() {
    $("#ttDivPersist").removeClass("no-ar").addClass("ttHidden").hide();
    $("div.callOut").removeClass("noLeftMargin").removeAttr("style");
    (new b365.Ui.AutoRefreshController).restartRF(true)
  }

  function p() {
    var a = $("#mbDialog"), d = $("#mbDialogueTitle", a), b = $("#mbContent", a), c = $("#mbDialogueOK", a), e = $("#lteBdy_greyout");
    d[0].innerHTML = window.MyBetsJS.getGlobalResource("MyBetsText");
    b[0].innerHTML = window.MyBetsJS.getGlobalResource("DisabledMessage") + "<br /><br />";
    c[0].innerHTML = window.MyBetsJS.getGlobalResource("OK");
    var f = new b365.Ui.PUpDialog(null, a[0], e[0]);
    f.showDialog();
    if (typeof window.MyBetsJS !== "undefined" && window.MyBetsJS !== null) {
      window.MyBetsJS.dispose(window.MyBetsJS);
      window.MyBetsJS = null;
      $("#mbToolTip").addClass("ttHidden").hide()
    }
    $addHandler(a[0], "click", Function.createDelegate(window.MyBetsController, window.MyBetsController.dialogClicked))
  }

  function s() {
    if (event && event.target) {
      event.preventDefault();
      event.stopPropagation();
      var a = event.target
        ? event.target
        : event.srcElement;
      while (a && a.id !== "mbDialog")if (a.tagName === "A") {
        $("#mbDialog").addClass("hidden");
        window.location.reload();
        break
      }
      else a = $parentNode(a)
    }
  }

  function r(t) {
    c = t;
    m = false;
    var a = $("#RHSWrapper"), s = $("#headerContainer"), l = $(".betSlipPopupHeader", s), r = $("#RHSScroller", a), p = $("#RHSMyBetsScroller",
      a), b = $("#MyBetsInPlay", a), g = $("#bsDiv", a), q = $("#myBetsHeader"), o = $("#myBetsHeaderInPlay"), h = $("#betSlipButton",
      q), i = $("#betSlipButtonInPlay", o), k = $("#myBetsButton", q), j = $("#myBetsButtonInPlay", o), n = $("#MyBetsButtonHolder", a);
    a.hasClass("notLoggedIn") && a.removeClass("notLoggedIn");
    a.css("left") !== "" && a.css("left", "");
    a.hasClass("notshown") && a.removeClass("notshown");
    a.hasClass("mybets") && a.removeClass("mybets");
    r.hasClass("notshown") && r.removeClass("notshown");
    !p.hasClass("notshown") && p.addClass("notshown");
    !l.hasClass("notshown") && l.addClass("notshown");
    n.hasClass("notshown") && n.removeClass("notshown");
    switch (d) {
      case"bs":
        g.hasClass("notshown") && g.removeClass("notshown");
        !b.hasClass("notshown") && b.addClass("notshown");
        if (!h.parent().hasClass("on")) {
          h.parent().addClass("on");
          k.parent().removeClass("on");
          i.parent().addClass("on");
          j.parent().removeClass("on")
        }
        break;
      case"mb":
        !g.hasClass("notshown") && g.addClass("notshown");
        b.hasClass("notshown") && b.removeClass("notshown");
        if (i.parent().hasClass("on")) {
          h.parent().removeClass("on");
          k.parent().addClass("on");
          i.parent().removeClass("on");
          j.parent().addClass("on")
        }
        if (typeof window.MyBetsJS !== "undefined" && window.MyBetsJS !== null)if (window.MyBetsJS.domTargetId != "#MyBetsInPlay") {
          var u = e
            ? "#RHSScroller"
            : window;
          window.MyBetsJS.stopAjax(window.MyBetsJS);
          window.MyBetsJS.removeHandlers(MyBetsJS);
          window.MyBetsJS.domTargetId = "#MyBetsInPlay";
          window.MyBetsJS.domContextId = "#RHSScroller";
          window.MyBetsJS.scrollContext = u;
          window.MyBetsJS.update(window.MyBetsJS)
        }
        break;
      default:
        g.hasClass("notshown") && g.removeClass("notshown");
        !b.hasClass("notshown") && b.addClass("notshown");
        if (!h.parent().hasClass("on")) {
          h.parent().addClass("on");
          k.parent().removeClass("on");
          i.parent().addClass("on");
          j.parent().removeClass("on")
        }
        d = "bs"
    }
    !f && bindButtonEvents()
  }

  function o(v) {
    c = v;
    m = true;
    var a = $("#RHSWrapper"), u = $("#headerContainer"), n = $(".betSlipPopupHeader", u), i = $("#RHSScroller", a), h = $("#RHSMyBetsScroller",
      a), s = $("#MyBetsInPlay", a), t = $("#bsDiv", a), r = $("#myBetsHeader"), p = $("#myBetsHeaderInPlay"), b = $("#betSlipButton",
      r), k = $("#betSlipButtonInPlay", p), j = $("#myBetsButton", r), l = $("#myBetsButtonInPlay", p), o = $("#MyBetsButtonHolder", a);
    a.hasClass("notLoggedIn") && a.removeClass("notLoggedIn");
    a.css("left") !== "" && a.css("left", "");
    n.hasClass("notshown") && $displayHelper.isPrematch() && n.removeClass("notshown");
    !o.hasClass("notshown") && o.addClass("notshown");
    !s.hasClass("notshown") && s.addClass("notshown");
    t.hasClass("notshown") && t.removeClass("notshown");
    var q = e
      ? "#RHSMyBetsScroller"
      : window;
    switch (d) {
      case"bs":
        i.hasClass("notshown") && i.removeClass("notshown");
        !h.hasClass("notshown") && h.addClass("notshown");
        c && a.hasClass("mybets") && a.removeClass("mybets");
        if (c) {
          !$(a).hasClass("notshown") && $(a).addClass("notshown");
          if (b.parent().hasClass("on")) {
            b.parent().removeClass("on");
            j.parent().removeClass("on");
            k.parent().removeClass("on");
            l.parent().removeClass("on")
          }
        }
        else {
          $(a).hasClass("notshown") && $(a).removeClass("notshown");
          if (!b.parent().hasClass("on")) {
            b.parent().addClass("on");
            j.parent().removeClass("on");
            k.parent().addClass("on");
            l.parent().removeClass("on")
          }
        }
        break;
      case"mb":
        !i.hasClass("notshown") && i.addClass("notshown");
        h.hasClass("notshown") && h.removeClass("notshown");
        c && !a.hasClass("mybets") && a.addClass("mybets");
        if (c) {
          !$(a).hasClass("notshown") && $(a).addClass("notshown");
          if (b.parent().hasClass("on")) {
            b.parent().removeClass("on");
            j.parent().removeClass("on");
            k.parent().removeClass("on");
            l.parent().removeClass("on")
          }
        }
        else {
          $(a).hasClass("notshown") && $(a).removeClass("notshown");
          if (!j.parent().hasClass("on")) {
            b.parent().removeClass("on");
            j.parent().addClass("on");
            k.parent().removeClass("on");
            l.parent().addClass("on")
          }
        }
        if (typeof window.MyBetsJS !== "undefined" && window.MyBetsJS !== null)if (window.MyBetsJS.domTargetId != "#mbDiv") {
          window.MyBetsJS.stopAjax(window.MyBetsJS);
          window.MyBetsJS.removeHandlers(window.MyBetsJS);
          window.MyBetsJS.domTargetId = "#mbDiv";
          window.MyBetsJS.domContextId = "#RHSMyBets";
          window.MyBetsJS.scrollContext = q;
          window.MyBetsJS.update(window.MyBetsJS)
        }
        break;
      default:
        if (c) {
          !$(a).hasClass("notshown") && $(a).addClass("notshown");
          i.hasClass("notshown") && i.removeClass("notshown");
          !h.hasClass("notshown") && h.addClass("notshown");
          a.hasClass("mybets") && a.removeClass("mybets");
          if (b.parent().hasClass("on")) {
            b.parent().removeClass("on");
            j.parent().removeClass("on");
            k.parent().removeClass("on");
            l.parent().removeClass("on")
          }
        }
        else {
          $(a).hasClass("notshown") && $(a).removeClass("notshown");
          i.hasClass("notshown") && i.removeClass("notshown");
          !h.hasClass("notshown") && h.addClass("notshown");
          a.hasClass("mybets") && a.removeClass("mybets");
          if (!b.parent().hasClass("on")) {
            b.parent().addClass("on");
            j.parent().removeClass("on");
            k.parent().addClass("on");
            l.parent().removeClass("on")
          }
          d = "bs"
        }
    }
    if (c && (typeof window.MyBetsJS === "undefined" || window.MyBetsJS === null)) {
      window.MyBetsJS = new MyBetsClass("MyBets/MyBets.ashx", location.protocol + "//" + location.hostname + (location.port
        ? ":" + location.port
        : "") + "/BetSlip/MyBets/CloseBet.ashx", "MyBets/MyBetsErrors.ashx", window.MyBetsAutoRefresh, window.MyBetsConfirmAutoRefresh,
        window.MyBetsTitaniumDownRefresh, window.MyBetsBetsPerPage, "RHSMyBets", "mbDiv", "mbToolTip", null, window.MyBetsController.overlayOn,
        window.MyBetsController.overlayOff, null, window.MyBetsController.spinnerImage, window.MyBetsController, q, "#RHSWrapper",
        window.MyBetsController.updateBalance, window.MyBetsController.hideFeature, window.MyBetsController.bindButtonEvents,
        window.MyBetsController.disableButtonEvents, window.MyBetsCloseBetsEnabled, true, location.protocol + "//" + location.hostname + (location.port
          ? ":" + location.port
          : "") + "/lite/default.aspx");
      window.MyBetsJS.initialise(true)
    }
    !f && g()
  }

  function u() {
    var a = $("#RHSWrapper"), b = $("#RHSScroller", a), e = $("#RHSMyBetsScroller", a), h = $("#MyBetsInPlay", a), l = $("#bsDiv",
      a), g = $("#myBetsHeader"), c = $("#myBetsHeaderInPlay"), f = $("#betSlipButton", g), i = $("#betSlipButtonInPlay", c), k = $("#myBetsButton",
      g), j = $("#myBetsButtonInPlay", c);
    if (a.attr("data-orientation") === "P" && (a.hasClass("mybets") || a.hasClass("notshown"))) {
      b.removeClass("notshown");
      e.addClass("notshown");
      a.removeClass("mybets").removeClass("notshown")
    }
    if (a.attr("data-orientation") === "L" && a.hasClass("prematch") && b.hasClass("notshown")) {
      b.removeClass("notshown");
      e.addClass("notshown")
    }
    if (a.hasClass("inplay")) {
      (a.hasClass("notshown") || a.hasClass("mybets")) && a.removeClass("mybets").removeClass("notshown");
      if (!h.hasClass("notshown")) {
        h.addClass("notshown");
        l.removeClass("notshown")
      }
    }
    if (!f.parent().hasClass("on")) {
      f.parent().addClass("on");
      k.parent().removeClass("on");
      i.parent().addClass("on");
      j.parent().removeClass("on")
    }
    d = "bs"
  }

  function t() {
    return $displayHelper._portraitMode && $displayHelper._preMatch
      ? '<img src="MyBets/imgs/Grey-Spinner.gif" style="margin:0 49%;width:30px;height:30px;border:none !important;display:none !important;" id="spinner" />'
      : '<img src="MyBets/imgs/Spinner.gif" style="margin:0 49%;width:30px;height:30px;border:none !important;display:none !important;" id="spinner" />'
  }

  function q(a) {
    if (typeof a != "undefined" && a !== null) {
      var b = $(".Total > span:first-child", "#MyAccountPanel");
      if (b.length > 0) {
        var c = j(b[0].innerHTML, window.MyBetsCurrencyDecimalSperator, window.MyBetsCurrencyGroupSeperator);
        a = a * -1;
        a = j(a, window.MyBetsCurrencyDecimalSperator, window.MyBetsCurrencyGroupSeperator);
        var d = ((c * 100 - a * 100) / 100).toFixed(2);
        b[0].innerHTML = d;
        b = null
      }
    }
  }

  function j(b, c, d) {
    if (!isNaN(b))return b;
    else {
      var a, e = new RegExp("[" + d + "]", "g");
      a = b.replace(e, "");
      a = a.replace(c, ".");
      a = parseFloat(a).toFixed(2);
      if (isNaN(a))a = "0";
      return a
    }
  }

  b.initialise = function (b) {
    window.MyBetsJS = null;
    a = "#" + b;
    $(".betSlipPopupHeader", "#headerContainer").off("click");
    l = true;
    g()
  };
  b.bindButtonEvents = function () {
    g()
  };
  b.disableButtonEvents = function () {
    n()
  };
  b.hideFeature = function () {
    p()
  };
  b.dialogClicked = function () {
    s()
  };
  b.inPlay = function (a) {
    r(a)
  };
  b.prematch = function (a) {
    o(a)
  };
  b.overlayClass = {show: function () {
    (new b365.Ui.AutoRefreshController).pauseRF();
    var a = $("#lteBdy_greyout"), b = $("#lteBdy"), g = $("#dvRpg");
    if (a.length == 0) {
      a = document.createElement("div");
      b[0].appendChild(a);
      var f = b.attr("data-overlay-class");
      if (f === null || typeof f === "undefined")f = "centergreyout";
      a.id = "lteBdy_greyout";
      a.className = f;
      a.style.position = "absolute";
      a.style.display = "block";
      a.style.zIndex = "200002";
      a.style.top = "0";
      a.style.left = "0";
      a.style.height = b.css("height");
      a.style.width = b.css("width")
    }
    $bSys.disableGroup(b[0]);
    $bSys.enableGroup(g[0]);
    var h = $bSys.getEleH(b[0], true), n = $bSys.getEleW(b[0],
      false), d = 70, p = 87, c = $bSys.getWH(), m = $bSys.getWSL(), i = $bSys.getWST(), k = $bSys.getOffSets(b[0]), o = k[0], j = k[1];
    if (c <= d)d = c - 40;
    var e = 0, l = 0;
    if (h > c)e = j + Math.round(c - d) / 2;
    else e = Math.round(h - d) / 2;
    l = o + Math.round(n - p) / 2;
    (e + d > c + i || e < i) && window.scrollTo(m, j);
    g.css("top", e + "px");
    g.css("left", l + "px");
    g.removeClass("hidden")
  }, hide: function () {
    var a = $("#lteBdy_greyout"), b = $("#lteBdy"), c = $("#dvRpg");
    if (a.length > 0) {
      a.addClass("hidden");
      a[0].parentNode.removeChild(a[0])
    }
    c.addClass("hidden");
    $bSys.enableGroup(b[0]);
    (new b365.Ui.AutoRefreshController).restartRF()
  }};
  b.overlayOn = function () {
    window.MyBetsController.overlayClass.show()
  };
  b.overlayOff = function () {
    window.MyBetsController.overlayClass.hide()
  };
  b.startMyBets = function () {
    h()
  };
  b.stopMyBets = function () {
    i()
  };
  b.showBetSlip = function () {
    u()
  };
  b.spinner = function () {
    t()
  };
  b.updateBalance = function (a) {
    q(a)
  };
  b.isInitialised = function () {
    return l
  }
})(window.MyBetsController = window.MyBetsController || {});
function MyBetsClass(y, u, l, b, d, c, t, r, v, s, e, k, j, m, n, p, q, o, a, h, g, f, i, x, w) {
  this.baseURL = y;
  this.closeBetURL = u;
  this.errorHandlerUrl = l;
  this.globalResources = {};
  this.clientFullTemplate = "";
  this.clientAppendTemplate = "";
  this.templateCache = {};
  this.updateFrequencyMs = b;
  this.confirmUpdateFrequencyMs = d;
  this.titaniumDownUpdateFrequencyMs = c;
  this.currentUpdateFrequemcyMs = b;
  this.betsPerPage = t;
  this.AJAXTimer = null;
  this.closeBetsOnly = true;
  this.domContextId = "#" + r;
  this.domTargetId = "#" + v;
  this.debugMode = x;
  this.page = 0;
  this.sessionTimedOutDelegate = e;
  this.overlayOnDelegate = k;
  this.overlayOffDelegate = j;
  this.refreshDelegate = m;
  this.spinnerDelegate = n;
  this.navButtonsOnDelegate = g;
  this.navButtonsOffDelegate = f;
  this.parentContext = p;
  this.scrollContext = q;
  this.tooltipContext = o;
  this.updateBalanceDelegate = a;
  this.hideServiceDelegate = h;
  this.toolTip = new MyBetsToolTip(s);
  this.closableBetsGloballyAvailable = i;
  this.buttonStates = {};
  this.shouldAJAXRefresh = true;
  this.stopRendering = false;
  this.ajaxObject = null;
  this.refreshUrl = w;
  this.usesBackButton = null;
  this.initialise = function (c, b) {
    var a = this;
    a.shouldAJAXRefresh = false;
    a.stopRendering = false;
    a.closeBetsOnly = true;
    a.usesBackButton = b;
    if (c !== true)if (a.overlayOnDelegate)if (a.parentContext)a.overlayOnDelegate(a.parentContext);
    else a.overlayOnDelegate();
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: this.baseURL + "?mb-action=gr", cache: false}).done(function (b) {
      a.loadGlobalResources(b, a)
    }).fail(function (d, c, b) {
      a.ajaxFailure(d, c, b, a)
    })
  };
  this.loadGlobalResources = function (b, a) {
    if (typeof b === "string") {
      switch (b) {
        case"session expired":
          if (typeof a.refreshUrl != "undefined")window.location.href = a.refreshUrl;
          else a.sessionTimedOutDelegate && a.sessionTimedOutDelegate();
          break;
        case"resources unavailable":
          a.logMessageToConsole("Could not get global language resources for My Bets!");
          a.logClientSideError("Could not load the global language resources.", a)
      }
      if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
      else a.overlayOffDelegate()
    }
    else {
      a.globalResources = b;
      a.logMessageToConsole("Got Global Resources");
      a.initialiseFullTemplate(a)
    }
  };
  this.initialiseFullTemplate = function (a) {
    var b = "MyBets/Views/MyBets.html";
    if (a.baseURL.indexOf("..") === 0)b = "../" + b;
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: b, cache: false}).done(function (b) {
      a.loadFullPageHTMLTemplate(b, a)
    }).fail(function (d, c, b) {
      a.ajaxFailure(d, c, b, a)
    })
  };
  this.loadFullPageHTMLTemplate = function (c, a) {
    if (c.length > 0) {
      a.clientFullTemplate = c;
      a.logMessageToConsole("Got full page client template");
      var b = "MyBets/Views/MyBetsAppend.html";
      if (a.baseURL.indexOf("..") === 0)b = "../" + b;
      $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: b, cache: false}).done(function (b) {
        a.loadAppendPageHTMLTemplate(b, a)
      }).fail(function (d, c, b) {
        a.ajaxFailure(d, c, b, a)
      })
    }
    else {
      a.logMessageToConsole("Full page client template was empty!");
      a.logClientSideError("Full page client template was empty!", a);
      if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
      else a.overlayOffDelegate()
    }
  };
  this.loadAppendPageHTMLTemplate = function (c, a) {
    if (c.length > 0) {
      a.clientAppendTemplate = c;
      a.logMessageToConsole("Got append client template");
      var b = a.baseURL + "?mb-action=mb&mb-page=" + a.page;
      if (a.closableBetsGloballyAvailable)b += "&mb-cb=yes";
      else a.closeBetsOnly = false;
      a.ajaxObject = $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: b, cache: false}).done(function (b) {
        a.renderContent(b, a, false)
      }).fail(function (d, c, b) {
        a.ajaxFailure(d, c, b, a)
      })
    }
    else {
      a.logMessageToConsole("Append client template was empty!");
      a.logClientSideError("Append client template was empty!", a);
      if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
      else a.overlayOffDelegate()
    }
  };
  this.addHandlers = function (a) {
    a.addBackHandler(a);
    a.addChangeHandler(a);
    a.addScrollHandler(a);
    a.addCloseButtonHandler(a);
    a.addToolTipHandler(a)
  };
  this.addBackHandler = function (b) {
    if (b.usesBackButton === true) {
      var a = $(window.document.getElementById("myBetsBackButton"), b.domTargetId);
      a.parents(".my-bets-wrapper:first").addClass("has-back-button");
      a.off("click").on("click", function () {
        window.history.back()
      })
    }
  };
  this.addChangeHandler = function (a) {
    if (a.shouldAJAXRefresh)$("#myBetsDD", a.domTargetId).off("change").on("change", function (b) {
      b.preventDefault();
      b.stopPropagation();
      a.toolTip.hide();
      a.stopAjax(a);
      a.removeHandlers(a);
      if (a.overlayOnDelegate)if (a.parentContext)a.overlayOnDelegate(a.parentContext);
      else a.overlayOnDelegate();
      if ($(b.target).val() === "closeBetsOnly") {
        a.page = 0;
        a.closeBetsOnly = true;
        if (a.overlayOnDelegate)if (a.parentContext)a.overlayOnDelegate(a.parentContext);
        else a.overlayOnDelegate();
        $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: a.baseURL + "?mb-action=mb&mb-cb=yes&mb-page=" +
          a.page, cache: false}).done(function (b) {
          a.renderContent(b, a, false)
        }).fail(function (d, c, b) {
          a.ajaxFailure(d, c, b, a)
        })
      }
      else {
        a.closeBetsOnly = false;
        if (a.overlayOnDelegate)if (a.parentContext)a.overlayOnDelegate(a.parentContext);
        else a.overlayOnDelegate();
        $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: a.baseURL + "?mb-action=mb&mb-page=" +
          a.page, cache: false}).done(function (b) {
          a.renderContent(b, a, false)
        }).fail(function (d, c, b) {
          a.ajaxFailure(d, c, b, a)
        })
      }
    })
  };
  this.addScrollHandler = function (a) {
    $(a.scrollContext).off("scroll").on("scroll", function () {
      a.toolTip.hide();
      a.removeToolTipContextHandler(a);
      var b = false;
      if (a.scrollContext !== window) {
        var d = $(a.scrollContext).scrollTop(), e = $(a.scrollContext)[0].scrollHeight - $(a.scrollContext).outerHeight() - 100;
        if (d >= e) {
          $(a.scrollContext).off("scroll");
          b = true
        }
      }
      else {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200) {
          $(a.scrollContext).off("scroll");
          b = true
        }
        if (!b)if ($(window).scrollTop() >= $(a.domTargetId).height() - 300) {
          $(a.scrollContext).off("scroll");
          b = true
        }
      }
      if (b)if ($(a.domTargetId + " #myBetsWrapper #content #spinner").length == 0) {
        a.removeHandlers(a);
        a.stopAjax(a);
        a.page += 1;
        var c = a.baseURL + "?mb-action=mbp&mb-page=" + a.page;
        if (a.closeBetsOnly)c += "&mb-cb=yes";
        if (a.spinnerDelegate) {
          $(a.domTargetId + " #myBetsWrapper #content").append(a.spinnerDelegate());
          setTimeout(function () {
            $("#spinner", a.domTargetId).show()
          }, 1e3)
        }
        else $(a.domTargetId + " #myBetsWrapper #content").append('<div id="spinner" style="height:0px;"></div>');
        $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: c, cache: false}).done(function (b) {
          a.renderContent(b, a, true)
        }).fail(function (d, c, b) {
          a.ajaxFailure(d, c, b, a)
        })
      }
    });
    $(a.scrollContext).off("touchmove").on("touchmove", function () {
      a.toolTip.hide()
    })
  };
  this.addCloseButtonHandler = function (a) {
    $("a.close-bet-link", a.domTargetId).off("click").on("click", function (g) {
      g.preventDefault();
      g.stopPropagation();
      a.toolTip.hide();
      var b;
      b = $(g.target).parents("div")[0].id;
      if (b) {
        var e = b.replace("cbb_", "lnk_");
        if (b in a.buttonStates && (a.buttonStates[b] == "disabled" || a.buttonStates[b] == "request"))return;
        a.removeClickHandler(e, b, a);
        a.stopAjax(a);
        var f = e;
        f = f.replace("lnk_", "");
        var h = $("#" + e).attr("data"), c = $("#" + b, a.domTargetId);
        if (c.hasClass("close-bet-button-accept")) {
          a.removeChangeHandler(a);
          c[0].innerHTML = '<img src="MyBets/imgs/Yellow-Spinner.gif" style="margin:5px 42% -1px;width:30px;height:30px;border:none !important;" />';
          a.shouldAJAXRefresh = false;
          a.updateAButtonState(b, "request", a);
          a.navButtonsOffDelegate && a.navButtonsOffDelegate();
          $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: a.closeBetURL + "?mb-bid=" + f + "&mb-cv=" +
            h, cache: false}).done(function (b) {
            a.renderButton(b, a)
          }).fail(function (d, c, b) {
            a.ajaxFailure(d, c, b, a)
          })
        }
        else {
          c.removeClass("close-bet-button").addClass("close-bet-button-accept");
          a.currentUpdateFrequemcyMs = a.confirmUpdateFrequencyMs;
          var d = $("#" + b, a.domTargetId)[0].innerHTML;
          d = d.replace(a.getGlobalResource("BetCloseBetFor"), a.getGlobalResource("BetConfirm"));
          c[0].innerHTML = d;
          a.updateAButtonState(b, "enabled", a);
          a.addHandlers(a);
          !a.buttonRequestsInProgress(a) && a.startRefresh(a)
        }
      }
      else!a.buttonRequestsInProgress(a) && a.startRefresh(a)
    })
  };
  this.addToolTipHandler = function (a) {
    $("a.selection-link", a.domTargetId).off("click").on("click", function (c) {
      c.preventDefault();
      c.stopPropagation();
      var b = $(this).attr("data");
      if (b.indexOf("~") > -1) {
        b = "<strong>" + b.substring(0, b.indexOf("~")) + "</strong><br />" + b.substring(b.indexOf("~"));
        b = b.replace("~", "")
      }
      a.toolTip.show(this, b, 200, -65, false);
      a.removeCloseButtonHandler(a);
      a.addToolTipContextHandler(a)
    })
  };
  this.addToolTipContextHandler = function (a) {
    $(a.tooltipContext).off("click").on("click", function () {
      a.toolTip.hide();
      a.removeToolTipContextHandler(a);
      setTimeout(function () {
        a.addCloseButtonHandler(a)
      }, 200)
    })
  };
  this.removeBackHandler = function (a) {
    $(window.document.getElementById("myBetsBackButton"), a.domTargetId).off("click")
  };
  this.removeChangeHandler = function (a) {
    $(a.domTargetId + " select", a.domContextId).off("change")
  };
  this.removeScrollHandler = function (a) {
    $(a.scrollContext).off("scroll");
    $(a.scrollContext).off("touchmove")
  };
  this.removeCloseButtonHandler = function (a) {
    $("a.close-bet-link", a.domTargetId).on("click")
  };
  this.removeClickHandler = function (b, c, a) {
    $("#" + b, a.domTargetId).off("click").on("click", function (a) {
      a.stopPropagation();
      a.preventDefault();
      return false
    });
    a.updateAButtonState(c, "disabled", a)
  };
  this.removeToolTipHandler = function (a) {
    $("a.selection-link", a.domTargetId).off("click").on("click", function (a) {
      a.stopPropagation();
      a.preventDefault();
      return false
    })
  };
  this.removeToolTipContextHandler = function (a) {
    $(a.tooltipContext).off("click")
  };
  this.removeHandlers = function (a) {
    a.removeBackHandler(a);
    a.removeChangeHandler(a);
    a.removeScrollHandler(a);
    a.removeToolTipHandler(a);
    a.removeToolTipContextHandler(a)
  };
  this.renderContent = function (b, a, h) {
    var c = true;
    a.toolTip.hide();
    a.removeToolTipContextHandler(a);
    var f = $(a.domTargetId);
    if (typeof b === "string") {
      $(a.domTargetId + " #myBetsWrapper #content #spinner").remove();
      if (b.indexOf("close bets disabled") > -1) {
        a.closableBetsGloballyAvailable = a.helperStringToBool(b.substring(b.indexOf("|") + 1).toLowerCase());
        if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
        else a.overlayOffDelegate();
        a.closeBetsOnly = a.closableBetsGloballyAvailable;
        a.update(a)
      }
      else switch (b) {
        case"request failed":
          a.logMessageToConsole("Service didn't respond");
          a.currentUpdateFrequemcyMs = a.titaniumDownUpdateFrequencyMs;
          break;
        case"session expired":
          if (typeof a.refreshUrl != "undefined")window.location.href = a.refreshUrl;
          else {
            a.sessionTimedOutDelegate && a.sessionTimedOutDelegate();
            c = false
          }
          break;
        case"unrecognised action request":
          a.logMessageToConsole("Bad action request!");
          a.logClientSideError("Client-side request (mb-action) was wrong!", a);
          a.currentUpdateFrequemcyMs = a.updateFrequencyMs;
          break;
        case"bad request":
          a.logMessageToConsole("Bad request!");
          a.logClientSideError("Client-side request (mb-action) was missing!", a);
          a.currentUpdateFrequemcyMs = a.updateFrequencyMs;
          break;
        case"service disabled":
          a.hideServiceDelegate && a.hideServiceDelegate();
          c = false;
          break;
        case"bad parameters":
          a.logClientSideError("Bad parameters sent to Titanium!", a);
          a.currentUpdateFrequemcyMs = a.updateFrequencyMs;
          break;
        case"no data available":
          a.logClientSideError("Titanium was unreachable or returned no data!", a);
          a.currentUpdateFrequemcyMs = a.updateFrequencyMs;
          break;
        case"no more pages":
          if (a.page > 0)a.page -= 1;
          else {
            if (!a.stopRendering) {
              var g = {BetsCount: 0, ClosableBetsCount: 0, Bets: [
              ], OpenBetsEnabled: true, CloseBetsEnabled: a.closableBetsGloballyAvailable, CloseBetsOnly: a.closeBetsOnly}, e = "";
              if (a.clientFullTemplate === null)e = a.renderEngine("MyBets", g, a);
              else {
                e = a.renderEngine("MyBets", g, a, a.clientFullTemplate);
                a.clientFullTemplate = null
              }
              if (typeof a.domTargetId != "undefined" && a.domTargetId !== null)if (e != f[0].innerHTML)f[0].innerHTML = e
            }
            else c = false;
            e = null;
            g = null
          }
          a.currentUpdateFrequemcyMs = a.updateFrequencyMs;
          break;
        default:
          a.logMessageToConsole("Unrecognized response from server: " + b);
          a.hideServiceDelegate && a.hideServiceDelegate();
          c = false
      }
    }
    else {
      var d = "";
      b.CloseBetsOnly = a.closeBetsOnly;
      a.closableBetsGloballyAvailable = b.CloseBetsEnabled;
      a.logMessageToConsole("Titanium says close bets enabled = " + b.CloseBetsEnabled);
      a.logMessageToConsole("Titanium says open bets enabled = " + b.OpenBetsEnabled);
      if (!b.OpenBetsEnabled) {
        a.hideServiceDelegate && a.hideServiceDelegate();
        c = false
      }
      else if (!h) {
        if (!a.stopRendering) {
          if (a.clientFullTemplate === null)d = a.renderEngine("MyBets", b, a);
          else {
            d = a.renderEngine("MyBets", b, a, a.clientFullTemplate);
            a.clientFullTemplate = null
          }
          if (typeof a.domTargetId != "undefined" && a.domTargetId !== null) {
            f[0].innerHTML = d;
            a.addButtonStates(a)
          }
          if (b && a.betsPerPage > 0)try {
            a.page = Math.ceil(b.Bets.length / a.betsPerPage) - 1
          }
          catch (i) {
            a.logMessageToConsole("Exception when trying to calculate page.")
          }
          if (a.page < 0)a.page = 0
        }
        else c = false;
        b = null;
        d = null
      }
      else {
        if (!a.stopRendering)if (b.Bets.length > 0 && b.Bets[0].BetId !== "EMPTY") {
          if (a.clientAppendTemplate === null)d = a.renderEngine("MyBetsAppend", b, a);
          else {
            d = a.renderEngine("MyBetsAppend", b, a, a.clientAppendTemplate);
            a.clientAppendTemplate = null
          }
          if (typeof a.domTargetId != "undefined" && a.domTargetId !== null) {
            $(a.domTargetId + " #myBetsWrapper #content #spinner").remove();
            $(d).appendTo(a.domTargetId + " #myBetsWrapper #content").hide().fadeIn("slow");
            a.addButtonStates(a)
          }
        }
        else {
          if (a.page > 0)a.page -= 1;
          typeof a.domTargetId != "undefined" && a.domTargetId !== null && $(a.domTargetId + " #myBetsWrapper #content #spinner").remove()
        }
        else c = false;
        b = null;
        d = null
      }
      a.currentUpdateFrequemcyMs = a.updateFrequencyMs
    }
    if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
    else a.overlayOffDelegate();
    if (a.refreshDelegate)if (a.parentContext)a.refreshDelegate(a.parentContext);
    else a.refreshDelegate();
    if (c) {
      if (!a.buttonRequestsInProgress(a)) {
        a.startRefresh(a);
        a.navButtonsOnDelegate && a.navButtonsOnDelegate()
      }
      a.addHandlers(a)
    }
  };
  this.renderButton = function (c, b) {
    var f = true, d = "cbb_" + c.substring(0, c.indexOf("|")), h = "lnk_" + c.substring(0, c.indexOf("|"));
    c = c.substring(c.indexOf("|") + 1);
    switch (c) {
      case"service disabled":
        b.hideServiceDelegate && b.hideServiceDelegate();
        f = false;
        break;
      case"session expired":
        if (typeof b.refreshUrl != "undefined")window.location.href = b.refreshUrl;
        else {
          b.sessionTimedOutDelegate && b.sessionTimedOutDelegate();
          b.updateAButtonState(d, "disabled", b);
          f = false
        }
        break;
      case"bad request":
        b.logMessageToConsole("Bad request!");
        e = b.getGlobalResource("BetSorry");
        $("#" + d)[0].innerHTML = "<span>" + e + "</span>";
        $("#" + d).removeClass("close-bet-button-accept").addClass("close-bet-button-off").unwrap();
        b.removeAButtonState(d, b);
        b.currentUpdateFrequemcyMs = b.updateFrequencyMs;
        break;
      default:
        var e;
        if (c.indexOf("BetClosed") > -1) {
          e = b.getGlobalResource("BetClosed");
          if (c.indexOf("|") > -1)e = e + " " + c.substring(c.indexOf("|") + 1);
          $("#" + d)[0].innerHTML = "<span>" + e + "</span>";
          $("#" + d).removeClass("close-bet-button-accept").addClass("close-bet-button-off").unwrap();
          b.removeAButtonState(d, b);
          a && a(parseFloat($("#" + d).attr("data")))
        }
        else if (c.indexOf("ReturnChanged") > -1) {
          e = b.getGlobalResource("BetAccept");
          if (c.indexOf("|") > -1) {
            var g = c.split("|");
            e = e + ' <div class="close-bet-return flashText">' + g[1] + "</div>";
            $("#" + h).attr("data", g[2]);
            $("#" + d).attr("data", g[2])
          }
          $("#" + d)[0].innerHTML = "<span>" + e + "</span>";
          b.updateAButtonState(d, "enabled", b)
        }
        else {
          e = b.getGlobalResource(c);
          $("#" + d)[0].innerHTML = "<span>" + e + "</span>";
          $("#" + d).removeClass("close-bet-button-accept").addClass("close-bet-button-off").unwrap();
          b.removeAButtonState(d, b)
        }
        b.currentUpdateFrequemcyMs = b.updateFrequencyMs
    }
    if (f) {
      if (!b.buttonRequestsInProgress(b)) {
        if (b.currentUpdateFrequemcyMs == b.updateFrequencyMs && b.buttonsWithEnabledState > 0)b.currentUpdateFrequemcyMs = b.confirmUpdateFrequencyMs;
        b.startRefresh(b)
      }
      b.addHandlers(b)
    }
  };
  this.addButtonStates = function (c) {
    var a = $('div[id^="cbb_"]', c.domTargetId);
    if (a.length > 0)for (var b = 0, d = a.length; b < d; b++)if (!(a[b].id in c.buttonStates))c.buttonStates[a[b].id] = "enabled"
  };
  this.updateAButtonState = function (b, c, a) {
    if (b in a.buttonStates)a.buttonStates[b] = c
  };
  this.removeAButtonState = function (b, a) {
    if (b in a.buttonStates)delete a.buttonStates[b]
  };
  this.getGlobalResource = function (b) {
    var a;
    try {
      a = this.globalResources[b]
    }
    catch (c) {
      a = "";
      this.logMessageToConsole("Could not find language look-up: " + b);
      context.logClientSideError("Could not find a language look-up on the client: " + b, context)
    }
    return a
  };
  this.renderEngine = function (c, b, a, f) {
    var e = !/\W/.test(c)
      ? (a.templateCache[c] = a.templateCache[c] || a.renderEngine(f))
      : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" +
      c.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g,
        "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return (p.join(''));"), d = null;
    try {
      d = b
        ? e(b)
        : e
    }
    catch (g) {
      a.logMessageToConsole("Template Error! " + g);
      if (b)a.logClientSideError("A My Bets template contains an error. Exception: " + g + "  Data: " + JSON.stringify(b), a);
      else a.logClientSideError("A My Bets template contains an error. Exception: " + g + "  No data located.", a)
    }
    return d
  };
  this.update = function (a) {
    var b = a.baseURL + "?mb-action=mb&mb-page=" + a.page;
    if (a.closableBetsGloballyAvailable && a.closeBetsOnly)b += "&mb-cb=yes";
    if (a.overlayOnDelegate)if (a.parentContext)a.overlayOnDelegate(a.parentContext);
    else a.overlayOnDelegate();
    a.ajaxObject = $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: b, cache: false}).done(function (b) {
      a.renderContent(b, a, false)
    }).fail(function (d, c, b) {
      a.ajaxFailure(d, c, b, a)
    })
  };
  this.startRefresh = function (a) {
    var b = a;
    if (a.shouldAJAXRefresh) {
      if (typeof a.AJAXTimer !== "undefined" && a.AJAXTimer !== null) {
        clearTimeout(a.AJAXTimer);
        a.AJAXTimer = null
      }
      var c = a.baseURL + "?mb-action=mb&mb-page=" + a.page;
      if (a.closableBetsGloballyAvailable && a.closeBetsOnly)c += "&mb-cb=yes";
      a.AJAXTimer = setTimeout(function () {
        b.ajaxObject = $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: c, cache: false}).done(function (c) {
          b.removeHandlers(a);
          b.renderContent(c, a, false)
        }).fail(function (e, d, c) {
          b.ajaxFailure(e, d, c, a)
        })
      }, a.currentUpdateFrequemcyMs)
    }
  };
  this.stopAjax = function (a, b) {
    if (typeof a.AJAXTimer !== "undefined" && a.AJAXTimer !== null) {
      clearTimeout(a.AJAXTimer);
      a.AJAXTimer = null
    }
    if (typeof a.ajaxObject !== "undefined" && a.ajaxObject !== null) {
      a.ajaxObject.abort();
      a.ajaxObject = null
    }
    if (typeof b != "undefined") {
      a.shouldAJAXRefresh = false;
      a.stopRendering = true
    }
  };
  this.ajaxFailure = function (d, c, b, a) {
    a.logMessageToConsole("AJAX Error:" + b + " Status: " + c);
    if (a.overlayOffDelegate)if (a.parentContext)a.overlayOffDelegate(a.parentContext);
    else a.overlayOffDelegate();
    if (a.refreshDelegate)if (a.parentContext)a.refreshDelegate(a.parentContext);
    else a.refreshDelegate()
  };
  this.buttonRequestsInProgress = function (a) {
    for (var b in a.buttonStates)if (a.buttonStates[b] == "request")return true;
    a.shouldAJAXRefresh = true;
    a.navButtonsOnDelegate && a.navButtonsOnDelegate();
    return false
  };
  this.buttonsWithEnabledState = function (b) {
    var a = 0;
    for (var c in b.buttonStates)if (b.buttonStates[c] == "enabled")a += 1;
    return a
  };
  this.logMessageToConsole = function (a) {
    if (this.debugMode) {
      console.log("My Bets Class");
      console.log(a)
    }
  };
  this.logClientSideError = function (b, a) {
    a.errorHandlerUrl &&
    $.ajax({headers: {"Cache-Control": "no-cache", Pragma: "no-cache"}, type: "GET", url: a.errorHandlerUrl + "?mb-err=" + b, cache: false}).done(function (b) {
      a.logMessageToConsole(b)
    }).fail(function (d, c, b) {
      a.ajaxFailure(d, c, b, a)
    })
  };
  this.helperStringToBool = function (b) {
    var a;
    if (b.match(/^(true|1|yes)$/i) !== null)a = true;
    else if (b.match(/^(false|0|no)*$/i) !== null)a = false;
    else a = null;
    return a
  };
  this.dispose = function (a) {
    a.stopRendering = true;
    a.stopAjax(a);
    a.removeHandlers(a);
    a.globalResources = null;
    a.contentTemplate = null;
    a.clientAppendTemplate = null;
    a.templateCache = null;
    a.buttonStates = null
  }
}
function MyBetsToolTip(a) {
  this.toolTipElementId = "#" + a;
  this.show = function (h, j, a, e) {
    var b = $(this.toolTipElementId), d = $(h);
    b.removeClass("ttHidden");
    this.clearElementClass();
    d.addClass("showingpupelem");
    if (!a)a = 300;
    if (!$.isNumeric(a))a = parseInt(a.replace(/px/g, "").replace(/;/g, ""));
    $(b).find(".cnt").html(j).css("max-width", a).css("width", a);
    if (!e)e = 24;
    var f = d.offset();
    e = Number(String(e).replace(/px/g, ""));
    var g = d.outerHeight(true);
    if (g)e = g;
    var k = f.top + e, c = f.left + d.outerWidth(true) / 2 - a / 2 - d.css("margin-left").replace(/px/g, "");
    if (c + a > window.innerWidth) {
      var i = c + a + 22 - window.innerWidth;
      c = c - i;
      $("div.callOut", this.toolTipElementId).addClass("noLeftMargin");
      $("div.callOut", this.toolTipElementId).css("left", a / 2 - (window.innerWidth - f.left) / 2);
      b.css("width", "auto")
    }
    else if (c < 0) {
      $("div.callOut", this.toolTipElementId).css("left", d.offset().left + 30);
      c = 0;
      b.css("width", "auto")
    }
    else b.css("max-width", a).css("width", a);
    b.css("top", k).css("left", c);
    b.fadeIn()
  };
  this.clearElementClass = function () {
    $("a.showingpupelem").removeClass("showingpupelem")
  };
  this.hide = function () {
    var a = $(this.toolTipElementId);
    a.removeClass("no-ar");
    a.addClass("ttHidden").hide();
    $("div.callOut", a).removeClass("noLeftMargin");
    $("div.callOut", a).removeAttr("style")
  }
};
var carousel = null, carouselTimer = null;
function createCarousel() {
  clearCarouselTimer();
  var c, b, f, a = [], d = [], e = 0;
  $("#hsBB .banner-item").each(function (b) {
    if (b >= 4)return;
    if ($(this).attr("data-selected").toLowerCase() === "true" || a.length > 0)a.push(this.outerHTML);
    else d.push(this.outerHTML)
  });
  $(d).each(function () {
    a.push(this)
  });
  $(".homeCarousel:gt(0)").hide();
  if (carousel != null) {
    carousel.destroy();
    $(".homeCarousel #swipeview-slider").remove()
  }
  if (!a || a.length == 0) {
    clearCarouselTimer();
    carousel = null;
    $(".homeCarousel").remove();
    return
  }
  carousel = new SwipeView(".homeCarousel", {numberOfPages: a.length, hastyPageFlip: true, loop: a.length > 1});
  for (b = 0; b < a.length; b++) {
    $(".indicator #blob" + b).length == 0 && $(".indicator").append("<span id=blob" + b + "></span>");
    $("#blob" + b).css({opacity: .5})
  }
  $("#blob0").css({opacity: 1});
  for (b = 0; b < 3; b++) {
    f = b == 0
      ? a.length - 1
      : b - 1;
    c = document.createElement("span");
    c.innerHTML = a[f];
    carousel.masterPages[b].appendChild(c)
  }
  carousel.onFlip(function () {
    for (var d, c, f, b = 0; b < 3; b++) {
      c = carousel.masterPages[b].dataset.upcomingPageIndex;
      if (c != carousel.masterPages[b].dataset.pageIndex) {
        d = carousel.masterPages[b].querySelector("span");
        d.innerHTML = a[c]
      }
    }
    for (b = 0; b < a.length; b++)$("#blob" + b).css({opacity: .5});
    $("#blob" + carousel.pageIndex).css({opacity: 1});
    resizeCarousel();
    bindCarouselClickEvents();
    e++;
    updateSlide(carousel.currentMasterPage, a, e)
  });
  resizeCarousel();
  bindCarouselClickEvents();
  if (a.length > 1)setCarouselTimer();
  else a.length === 1 && setCarouselRefresh()
}
function updateSlide(g, a, f) {
  var d = carousel.masterPages[carousel.currentMasterPage].querySelector("span"), c = $(d).find("div.banner-item"), e = c.attr("data-shown").toLowerCase() ===
    "true" || a.length == f;
  $("[id=" + c.attr("id") + "].banner-item").attr("data-shown", "True");
  var b;
  $(a).each(function (d) {
    b = $(a[d]);
    if (b.attr("id") === c.attr("id")) {
      b.attr("data-shown", "True");
      a[d] = b.outerHTML()
    }
  });
  if (e)mf._b365AJAX == null && callRequest($(d).find("div.banner-item").attr("data-nav-key"))
}
function bindCarouselClickEvents() {
  $(".homeCarousel a").click(function (a) {
    hs.onItemClick(a)
  })
}
function resizeCarousel() {
  var d = $(".mainImg"), a = $(".indicator"), f = $(".homeCarousel"), h = d.width(), g = d.height(), b = $("#MiddleWrapper").width();
  f.width(b).height(g + 44);
  var j = b / 2, i = a.width() / 2, c = Number(j - i) + "px", e = $("#mainImgHolder").height() - 25 + "px";
  a.css("left") !== c && a.css("top") !== e && a.css("left", c).css("top", e);
  $(".mainOdds").width(b - h);
  carousel !== null && carousel.refreshSize()
}
function clearCarouselTimer() {
  if (carouselTimer != null) {
    clearTimeout(carouselTimer);
    carouselTimer = null
  }
}
function setCarouselTimer() {
  if (carousel != null) {
    clearCarouselTimer();
    carouselTimer = isCarouselVisible()
      ? setInterval(function () {
      carousel.next()
    }, 5e3)
      : null
  }
}
function setCarouselRefresh() {
  if (carousel != null) {
    clearCarouselTimer();
    var b = carousel.masterPages[carousel.currentMasterPage].querySelector("span"), a = $(b).find("div.banner-item").attr("data-nav-key");
    carouselTimer = isCarouselVisible()
      ? setInterval(function () {
      callRequest(a)
    }, 2e4)
      : null
  }
}
function callRequest(b) {
  var a = b.split("#");
  mf._isAutoRefresh = true;
  mf.req(parseInt(a[0]), parseInt(a[1]), a[2], a[3])
}
function isCarouselVisible() {
  var a = false;
  if (carousel != null)if ($(".homeCarousel").length > 0)a = $("#MiddleScroller").scrollTop() < 220;
  return a
};
/*
 * SwipeView v0.10 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
var SwipeView = function () {
  var a = "ontouchstart"in window, b = "onorientationchange"in window
    ? "orientationchange"
    : "resize", c = a
    ? "touchstart"
    : "mousedown", d = a
    ? "touchmove"
    : "mousemove", e = a
    ? "touchend"
    : "mouseup", g = a
    ? "touchcancel"
    : "mouseup", f = function (i, j) {
    var f, a, g, h;
    this.wrapper = typeof i == "string"
      ? document.querySelector(i)
      : i;
    this.options = {text: null, numberOfPages: 3, snapThreshold: null, hastyPageFlip: false, loop: true};
    for (f in j)this.options[f] = j[f];
    this.wrapper.style.overflow = "hidden";
    this.wrapper.style.position = "relative";
    this.masterPages = [];
    a = document.createElement("div");
    a.id = "swipeview-slider";
    a.style.cssText = "position:relative;top:0;height:100%;width:100%;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);-webkit-transition-timing-function:ease-out";
    this.wrapper.appendChild(a);
    this.slider = a;
    this.refreshSize();
    for (f = -1; f < 2; f++) {
      a = document.createElement("div");
      a.id = "swipeview-masterpage-" + (f + 1);
      a.style.cssText = "-webkit-transform:translateZ(0);position:absolute;top:0;height:100%;width:100%;left:" + f * 100 + "%";
      if (!a.dataset)a.dataset = {};
      h = f == -1
        ? this.options.numberOfPages - 1
        : f;
      a.dataset.pageIndex = h;
      a.dataset.upcomingPageIndex = h;
      if (!this.options.loop && f == -1)a.style.visibility = "hidden";
      this.slider.appendChild(a);
      this.masterPages.push(a)
    }
    g = this.masterPages[1].className;
    this.masterPages[1].className = !g
      ? "swipeview-active"
      : g + " swipeview-active";
    window.addEventListener(b, this, false);
    this.wrapper.addEventListener(c, this, false);
    this.wrapper.addEventListener(d, this, false);
    this.wrapper.addEventListener(e, this, false);
    this.slider.addEventListener("webkitTransitionEnd", this, false)
  };
  f.prototype = {currentMasterPage: 1, x: 0, page: 0, pageIndex: 0, customEvents: [], onFlip: function (a) {
    this.wrapper.addEventListener("swipeview-flip", a, false);
    this.customEvents.push(["flip", a])
  }, onMoveOut: function (a) {
    this.wrapper.addEventListener("swipeview-moveout", a, false);
    this.customEvents.push(["moveout", a])
  }, onMoveIn: function (a) {
    this.wrapper.addEventListener("swipeview-movein", a, false);
    this.customEvents.push(["movein", a])
  }, onTouchStart: function (a) {
    this.wrapper.addEventListener("swipeview-touchstart", a, false);
    this.customEvents.push(["touchstart", a])
  }, destroy: function () {
    while (this.customEvents.length) {
      this.wrapper.removeEventListener("swipeview-" + this.customEvents[0][0], this.customEvents[0][1], false);
      this.customEvents.shift()
    }
    window.removeEventListener(b, this, false);
    this.wrapper.removeEventListener(c, this, false);
    this.wrapper.removeEventListener(d, this, false);
    this.wrapper.removeEventListener(e, this, false);
    this.slider.removeEventListener("webkitTransitionEnd", this, false)
  }, refreshSize: function () {
    this.wrapperWidth = $(this.wrapper).width();
    this.wrapperHeight = $(this.wrapper).height();
    this.pageWidth = this.wrapperWidth;
    this.maxX = -this.options.numberOfPages * this.pageWidth + this.wrapperWidth;
    this.snapThreshold = this.options.snapThreshold === null
      ? Math.round(this.pageWidth * .15)
      : /%/.test(this.options.snapThreshold)
      ? Math.round(this.pageWidth * this.options.snapThreshold.replace("%", "") / 100)
      : this.options.snapThreshold
  }, updatePageCount: function (a) {
    this.options.numberOfPages = a;
    this.maxX = -this.options.numberOfPages * this.pageWidth + this.wrapperWidth
  }, goToPage: function (a) {
    var b;
    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, "");
    for (b = 0; b < 3; b++) {
      className = this.masterPages[b].className;
      /(^|\s)swipeview-loading(\s|$)/.test(className) || (this.masterPages[b].className = !className
        ? "swipeview-loading"
        : className + " swipeview-loading")
    }
    a = a < 0
      ? 0
      : a > this.options.numberOfPages - 1
      ? this.options.numberOfPages - 1
      : a;
    this.page = a;
    this.pageIndex = a;
    this.slider.style.webkitTransitionDuration = "0";
    this.__pos(-a * this.pageWidth);
    this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3;
    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className + " swipeview-active";
    if (this.currentMasterPage == 0) {
      this.masterPages[2].style.left = this.page * 100 - 100 + "%";
      this.masterPages[0].style.left = this.page * 100 + "%";
      this.masterPages[1].style.left = this.page * 100 + 100 + "%";
      this.masterPages[2].dataset.upcomingPageIndex = this.page === 0
        ? this.options.numberOfPages - 1
        : this.page - 1;
      this.masterPages[0].dataset.upcomingPageIndex = this.page;
      this.masterPages[1].dataset.upcomingPageIndex = this.page == this.options.numberOfPages - 1
        ? 0
        : this.page + 1
    }
    else if (this.currentMasterPage == 1) {
      this.masterPages[0].style.left = this.page * 100 - 100 + "%";
      this.masterPages[1].style.left = this.page * 100 + "%";
      this.masterPages[2].style.left = this.page * 100 + 100 + "%";
      this.masterPages[0].dataset.upcomingPageIndex = this.page === 0
        ? this.options.numberOfPages - 1
        : this.page - 1;
      this.masterPages[1].dataset.upcomingPageIndex = this.page;
      this.masterPages[2].dataset.upcomingPageIndex = this.page == this.options.numberOfPages - 1
        ? 0
        : this.page + 1
    }
    else {
      this.masterPages[1].style.left = this.page * 100 - 100 + "%";
      this.masterPages[2].style.left = this.page * 100 + "%";
      this.masterPages[0].style.left = this.page * 100 + 100 + "%";
      this.masterPages[1].dataset.upcomingPageIndex = this.page === 0
        ? this.options.numberOfPages - 1
        : this.page - 1;
      this.masterPages[2].dataset.upcomingPageIndex = this.page;
      this.masterPages[0].dataset.upcomingPageIndex = this.page == this.options.numberOfPages - 1
        ? 0
        : this.page + 1
    }
    this.__flip()
  }, next: function () {
    if (!this.options.loop && this.x == this.maxX)return;
    this.directionX = -1;
    this.x -= 1;
    this.__checkPosition()
  }, prev: function () {
    if (!this.options.loop && this.x === 0)return;
    this.directionX = 1;
    this.x += 1;
    this.__checkPosition()
  }, handleEvent: function (a) {
    switch (a.type) {
      case c:
        this.__start(a);
        break;
      case d:
        this.__move(a);
        break;
      case g:
      case e:
        this.__end(a);
        break;
      case b:
        this.__resize();
        break;
      case"webkitTransitionEnd":
        a.target == this.slider && !this.options.hastyPageFlip && this.__flip()
    }
  }, __pos: function (a) {
    this.x = a;
    this.slider.style.webkitTransform = "translate3d(" + a + "px,0,0)"
  }, __resize: function () {
    this.refreshSize();
    this.slider.style.webkitTransitionDuration = "0";
    this.__pos(-this.page * this.pageWidth)
  }, __start: function (c) {
    if (this.initiated)return;
    var b = a
      ? c.touches[0]
      : c;
    this.initiated = true;
    this.moved = false;
    this.thresholdExceeded = false;
    this.startX = b.pageX;
    this.startY = b.pageY;
    this.pointX = b.pageX;
    this.pointY = b.pageY;
    this.stepsX = 0;
    this.stepsY = 0;
    this.directionX = 0;
    this.directionLocked = false;
    this.slider.style.webkitTransitionDuration = "0";
    this.__event("touchstart")
  }, __move: function (e) {
    if (!this.initiated || !this.options.loop)return;
    var c = a
      ? e.touches[0]
      : e, b = c.pageX - this.pointX, g = c.pageY - this.pointY, d = this.x + b, f = Math.abs(c.pageX - this.startX);
    this.moved = true;
    this.pointX = c.pageX;
    this.pointY = c.pageY;
    this.directionX = b > 0
      ? 1
      : b < 0
      ? -1
      : 0;
    this.stepsX += Math.abs(b);
    this.stepsY += Math.abs(g);
    if (this.stepsX < 10 && this.stepsY < 10)return;
    if (!this.directionLocked && this.stepsY > this.stepsX) {
      this.initiated = false;
      return
    }
    e.preventDefault();
    this.directionLocked = true;
    if (!this.options.loop && (d > 0 || d < this.maxX))d = this.x + b / 2;
    if (!this.thresholdExceeded && f >= this.snapThreshold) {
      this.thresholdExceeded = true;
      this.__event("moveout")
    }
    else if (this.thresholdExceeded && f < this.snapThreshold) {
      this.thresholdExceeded = false;
      this.__event("movein")
    }
    this.__pos(d)
  }, __end: function (c) {
    if (!this.initiated)return;
    var d = a
      ? c.changedTouches[0]
      : c, b = Math.abs(d.pageX - this.startX);
    this.initiated = false;
    if (!this.moved)return;
    if (!this.options.loop && (this.x > 0 || this.x < this.maxX)) {
      b = 0;
      this.__event("movein")
    }
    if (b < this.snapThreshold) {
      this.slider.style.webkitTransitionDuration = Math.floor(300 * b / this.snapThreshold) + "ms";
      this.__pos(-this.page * this.pageWidth);
      return
    }
    this.__checkPosition()
  }, __checkPosition: function () {
    var a, c, b;
    this.masterPages[this.currentMasterPage].className = this.masterPages[this.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, "");
    if (this.directionX > 0) {
      this.page = -Math.ceil(this.x / this.pageWidth);
      this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3;
      this.pageIndex = this.pageIndex === 0
        ? this.options.numberOfPages - 1
        : this.pageIndex - 1;
      a = this.currentMasterPage - 1;
      a = a < 0
        ? 2
        : a;
      this.masterPages[a].style.left = this.page * 100 - 100 + "%";
      c = this.page - 1
    }
    else {
      this.page = -Math.floor(this.x / this.pageWidth);
      this.currentMasterPage = this.page + 1 - Math.floor((this.page + 1) / 3) * 3;
      this.pageIndex = this.pageIndex == this.options.numberOfPages - 1
        ? 0
        : this.pageIndex + 1;
      a = this.currentMasterPage + 1;
      a = a > 2
        ? 0
        : a;
      this.masterPages[a].style.left = this.page * 100 + 100 + "%";
      c = this.page + 1
    }
    b = this.masterPages[this.currentMasterPage].className;
    /(^|\s)swipeview-active(\s|$)/.test(b) || (this.masterPages[this.currentMasterPage].className = !b
      ? "swipeview-active"
      : b + " swipeview-active");
    b = this.masterPages[a].className;
    /(^|\s)swipeview-loading(\s|$)/.test(b) || (this.masterPages[a].className = !b
      ? "swipeview-loading"
      : b + " swipeview-loading");
    c = c - Math.floor(c / this.options.numberOfPages) * this.options.numberOfPages;
    this.masterPages[a].dataset.upcomingPageIndex = c;
    newX = -this.page * this.pageWidth;
    this.slider.style.webkitTransitionDuration = Math.floor(500 * Math.abs(this.x - newX) / this.pageWidth) + "ms";
    if (!this.options.loop)this.masterPages[a].style.visibility = newX === 0 || newX == this.maxX
      ? "hidden"
      : "";
    if (this.x == newX)this.__flip();
    else {
      this.__pos(newX);
      this.options.hastyPageFlip && this.__flip()
    }
  }, __flip: function () {
    this.__event("flip");
    for (var a = 0; a < 3; a++) {
      this.masterPages[a].className = this.masterPages[a].className.replace(/(^|\s)swipeview-loading(\s|$)/, "");
      this.masterPages[a].dataset.pageIndex = this.masterPages[a].dataset.upcomingPageIndex
    }
  }, __event: function (b) {
    var a = document.createEvent("Event");
    a.initEvent("swipeview-" + b, true, true);
    this.wrapper.dispatchEvent(a)
  }};
  return f
}();
(function () {
  function a(a, c, b, d) {
    if (a.addEventListener) {
      a.addEventListener(c, b, d);
      return{destroy: function () {
        a.removeEventListener(c, b, d)
      }}
    }
    else {
      var e = function () {
        b.handleEvent(window.event, b)
      };
      a.attachEvent("on" + c, e);
      return{destroy: function () {
        a.detachEvent("on" + c, e)
      }}
    }
  }

  var b = "ontouchstart"in window;
  this.FastButton = function (c, e, d) {
    this.events = [];
    this.touchEvents = [];
    this.element = c;
    this.handler = e;
    this.useCapture = d;
    b && this.events.push(a(c, "touchstart", this, this.useCapture));
    this.events.push(a(c, "click", this, this.useCapture))
  };
  this.FastButton.prototype.destroy = function () {
    for (i = this.events.length - 1; i >= 0; i -= 1)this.events[i].destroy();
    this.events = this.touchEvents = this.element = this.handler = this.fastButton = null
  };
  this.FastButton.prototype.handleEvent = function (a) {
    switch (a.type) {
      case"touchstart":
        this.onTouchStart(a);
        break;
      case"touchmove":
        this.onTouchMove(a);
        break;
      case"touchend":
        this.onClick(a);
        break;
      case"click":
        this.onClick(a)
    }
  };
  this.FastButton.prototype.onTouchStart = function (b) {
    b.stopPropagation
      ? b.stopPropagation()
      : (b.cancelBubble = true);
    this.touchEvents.push(a(this.element, "touchend", this, this.useCapture));
    this.touchEvents.push(a(document.body, "touchmove", this, this.useCapture));
    this.startX = b.touches[0].clientX;
    this.startY = b.touches[0].clientY
  };
  this.FastButton.prototype.onTouchMove = function (a) {
    (Math.abs(a.touches[0].clientX - this.startX) > 10 || Math.abs(a.touches[0].clientY - this.startY) > 10) && this.reset()
  };
  this.FastButton.prototype.onClick = function (a) {
    a.stopPropagation
      ? a.stopPropagation()
      : (a.cancelBubble = true);
    this.reset();
    var b = this.handler.call(this.element, a);
    a.type == "touchend" && clickbuster.preventGhostClick(this.startX, this.startY);
    return b
  };
  this.FastButton.prototype.reset = function () {
    for (var a = this.touchEvents.length - 1; a >= 0; a -= 1)this.touchEvents[a].destroy();
    this.touchEvents = []
  };
  this.clickbuster = function () {
  };
  this.clickbuster.preventGhostClick = function (a, b) {
    clickbuster.coordinates.push(a, b);
    window.setTimeout(clickbuster.pop, 2500)
  };
  this.clickbuster.pop = function () {
    clickbuster.coordinates.splice(0, 2)
  };
  this.clickbuster.onClick = function (a) {
    for (var b = 0; b < clickbuster.coordinates.length; b += 2) {
      var c = clickbuster.coordinates[b], d = clickbuster.coordinates[b + 1];
      if (Math.abs(a.clientX - c) < 25 && Math.abs(a.clientY - d) < 25) {
        a.stopPropagation
          ? a.stopPropagation()
          : (a.cancelBubble = true);
        a.preventDefault
          ? a.preventDefault()
          : (a.returnValue = false)
      }
    }
  };
  if (b) {
    document.addEventListener("click", clickbuster.onClick, true);
    clickbuster.coordinates = []
  }
})(this);
(function (a) {
  a.fn.fastClick = function (b) {
    return a(this).each(function () {
      new FastButton(a(this)[0], b)
    })
  }
})(jQuery);
(function (a) {
  var b = this;
  a.fn.setKitAttrs = function (c, b) {
    return this.each(function () {
      a(this).attr("data-kitimg", c).attr("data-kitcolour", b)
    })
  };
  a.fn.applyKitColour = function (d, c) {
    return this.each(function () {
      var d;
      if (typeof document.baseURI !== "undefined")d = document.baseURI + a(this).data("kitimg");
      else d = document.getElementById("BaseUrl").href + a(this).data("kitimg");
      var e = this;
      a.ajax({url: d, type: "GET", dataType: "text", cache: true}).done(function (d) {
        a(e)[0].innerHTML = d;
        if (c)return;
        b.applyColour(a(e)[0])
      })
    })
  };
  b.applyColour = function (e) {
    var c = a(e).data("kitcolour").split(",");
    if (c.length === 0)return;
    for (var g = a(e)[0], f = false, b = 0; b < c.length; b++) {
      var h = '[class="colourcode' + (b + 1).toString() + '"]', d = a(g).find(h);
      if (d.length > 0 && d.attr("fill") !== c[b]) {
        d.attr("fill", c[b]);
        f = true
      }
    }
    if (f)a(e)[0] = g;
    a(document).trigger("kitcolourapplied")
  }
})(jQuery);
(function () {
  var a = [];
  Type.registerNamespace("b365.Ui");
  b365.Ui.TeamkitImage = function () {
  };
  b365.Ui.TeamkitImage.prototype = {initialiseImages: function () {
    a = []
  }, saveImage: function (c, b) {
    a.push(b)
  }, applyTeamKitImage: function (b) {
    if (a.length == 0)return b;
    if (b !== "") {
      var c, e, d, f, g = "", h = b.indexOf("data-kitimg", 0);
      if (h !== -1) {
        c = b.indexOf(">", h);
        e = b.indexOf("<", c);
        if (c !== 0 && e !== 0 && c < e) {
          g = a[0];
          b = b.substr(0, c + 1) + g + b.substr(e)
        }
        h = b.indexOf("data-kitimg", e);
        d = b.indexOf(">", h);
        f = b.indexOf("<", d);
        if (d !== 0 && f !== 0 && d < f) {
          g = a[1];
          b = b.substr(0, d + 1) + g + b.substr(f)
        }
      }
    }
    return b
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingHandler = function () {
  };
  b365.Ui.AudioStreamingHandler.prototype = {getStreamUrl: function (a) {
    if (typeof a == "undefined" || $(a).length == 0 || $(a).data("audiostreamingkey") == "")return;
    var d = $(a).data("audiostreamingkey"), c = {stringKey: ""};
    c.stringKey = d;
    var b = new b365.Ui.AudioStreamingKey(c);
    (new b365.Ui.AudioStreamingPlayerController).initialisePlayer();
    mf.req(32, b.classificationId, b.mediaId, b.mediaStream, Modernizr.supportsxaacaudio
      ? b365.Data.DEFAULT_AUDIO_QUALITY
      : b365.Data.AUDIO_QUALITY_LOW)
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingMenu = function () {
    $(document).off("orientationChanged.audiostreamingmenu").on("orientationChanged.audiostreamingmenu", $.proxy(this.hideMenu, this))
  };
  b365.Ui.AudioStreamingMenu.prototype = {showMenu: function (a) {
    $(".aud-premat-dd").show();
    this.setActiveItem(a)
  }, hideMenu: function () {
    $(".aud-premat-dd").hide()
  }, setActiveItem: function () {
    var a = (new b365.Ui.AudioStreamingPlayerController).getAudioPlayer();
    if (typeof a == "undefined" || a == null || typeof a.streamingKey == "undefined" || a.streamingKey == null)return;
    var b = $(".as-panel-item a[data-audiostreamingkey=" + a.streamingKey.keyString + "] span");
    if (b.length > 0) {
      var c = a.loading
        ? "icnwait"
        : "icnstop";
      b.removeClass("icnplay").addClass(c)
    }
  }, tabClick: function (c, a) {
    if (!a)return;
    if ($(a).hasClass("selected"))return;
    var b = $(a).data("classificationid");
    (new b365.Ui.AudioStreamingRequestHandler).getMenuData(b);
    c.stopPropagation()
  }, streamingItemClick: function (b, a) {
    if (!a)return;
    if ($(a).find(".icnwait").length > 0) {
      b.stopPropagation();
      return
    }
    else if ($(a).find(".icnstop").length > 0) {
      (new b365.Ui.AudioStreamingPlayerController).stopAudio();
      this.resetIconsToPlay()
    }
    else {
      if (!$(a).hasClass("as-panel-link"))a = $(a).parent();
      (new b365.Ui.AudioStreamingHandler).getStreamUrl(a)
    }
    b.stopPropagation()
  }, moreItemClick: function (a) {
    var b = a.target;
    if (!b)return;
    if ($(".as-panel-item.hidden").length > 0) {
      $(".as-panel-item.hidden").removeClass("hidden").addClass("show");
      $(".as-panel").find("li.as-morelink").addClass("exp");
      $(".as-panel").find(".as-morelink").find(".fontIcon").removeClass("icnrarw").addClass("icnarwdown")
    }
    else {
      $(".as-panel-item.show").removeClass("show").addClass("hidden");
      $(".as-panel").find("li.as-morelink").removeClass("exp");
      $(".as-panel").find(".as-morelink").find(".fontIcon").removeClass("icnarwdown").addClass("icnrarw")
    }
    a.stopPropagation()
  }, resetIconsToPlay: function () {
    $(".as-panel").find(".icnwait").removeClass("icnwait").addClass("icnplay");
    $(".as-panel").find(".icnstop").removeClass("icnstop").addClass("icnplay");
    $(".as-panel span").removeAttr("disabled")
  }, setWaitIcon: function (a) {
    this.resetIconsToPlay();
    $(a).find(".icnplay").removeClass("icnplay").addClass("icnwait");
    $(a).attr("disabled", "disabled")
  }, setPlayingIcon: function (a) {
    this.resetIconsToPlay();
    $(a).find(".icnplay").removeClass("icnplay").addClass("icnstop");
    $(a).removeAttr("disabled")
  }, removeWaitClass: function (a) {
    $(a).removeAttr("disabled");
    $(a).find(".icnwait").removeClass("icnwait").addClass("icnplay")
  }, showErrorMessage: function (b, a) {
    a && this.removeWaitClass(b)
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  this._wgCookie = $bSys.getValueFromCookie("aps03", "ltwo", "");
  this._cfCookie = $bSys.getValueFromCookie("aps03", "cf", "N");
  this._hdCookie = $bSys.getValueFromCookie("aps03", "hd", "N");
  this._lngCookie = $bSys.getValueFromCookie("aps03", "lng", 1);
  this._ctyCookie = $bSys.getValueFromCookie("aps03", "ct", 197);
  this._cstCookie = $bSys.getValueFromCookie("aps03", "cst", 0);
  this._cgCookie = $bSys.getValueFromCookie("aps03", "cg", 0);
  this._tzCookie = $bSys.getValueFromCookie("aps03", "tzi", 1);
  this._oddsCookie = $bSys.getValueFromCookie("aps03", "oty", 1);
  b365.Ui.AudioStreamingRequestHandler = function () {
  };
  b365.Ui.AudioStreamingRequestHandler.prototype = {getMenuData: function (b) {
    if (b < 1 && $(".aud-premat-dd").is(":visible"))$(".aud-premat-dd").hide();
    else {
      if (b < 1) {
        var c = (new b365.Ui.AudioStreamingPlayerController).getAudioPlayerSteamingKey();
        if (c !== null && typeof c !== "undefined")b = c.classificationId;
        else b = this.getSiteClassificationId()
      }
      $("#sbTMN-rhs .custDDFinder:not(.aud-premat-dd)").hide();
      var e = $("#fm").val().length > 0
        ? parseInt($("#fm").val())
        : 1, a = "api/?op=28&cid=" + b;
      a += "&cf=" + _cfCookie;
      a += "&lng=" + _lngCookie;
      a += "&cty=" + _ctyCookie;
      a += "&fm=" + e;
      a += "&tzi=" + _tzCookie;
      a += "&oty=" + _oddsCookie;
      a += "&asqty=" + (Modernizr.supportsxaacaudio
        ? b365.Data.DEFAULT_AUDIO_QUALITY
        : b365.Data.AUDIO_QUALITY_LOW);
      mf.handlePleaseWait($("#sbMCN")[0]);
      var d = new b365AJAX(a, Function.createDelegate(this, this.reqComplete), Function.createDelegate(this, this.reqError), 3e4,
        Function.createDelegate(this, this.reqTimeout), false, null, arguments);
      d.Load()
    }
  }, reqComplete: function (a) {
    mf.hidePws();
    (new b365.Ui.AudioStreamingResponseHandler).setMenuData(document.event, a)
  }, reqError: function () {
    mf.resetPwsPersist()
  }, reqTimeout: function () {
    mf.resetPwsPersist()
  }, getSiteClassificationId: function () {
    var b = $('#sbLMN .mnuprematch a[id^="ma"].selected'), a = 0;
    if (b.length > 0 && typeof b.attr("id") !== "undefined") {
      a = b.attr("id").replace("ma", "");
      if (a > 900)a = 0
    }
    return a
  }, getInplayControl: function (a, b) {
    mf.req(33, a, b, Modernizr.supportsxaacaudio
      ? b365.Data.DEFAULT_AUDIO_QUALITY
      : b365.Data.AUDIO_QUALITY_LOW)
  }, getStreamingUrl: function (c, e, d, f) {
    var a = "api/?op=32";
    a += "&cid=" + c;
    a += "&asmid=" + e;
    a += "&asms=" + d;
    a += "&asqty=" + f;
    var b = [];
    b[0] = "sk";
    b[1] = c;
    b[2] = e;
    b[3] = d;
    (new b365.Ui.AudioStreamingPlayerController).startAudio(a, b)
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingResponseHandler = function () {
  };
  b365.Ui.AudioStreamingResponseHandler.prototype = {setMenuData: function (d, b) {
    var a = $(".aud-premat-dd");
    if (b !== "" && a.length > 0) {
      a[0].innerHTML = b;
      (new b365.Ui.AudioStreamingMenu).showMenu();
      var c = $("#audiostreamingBtn").offset().left - a.width() + $("#audiostreamingBtn").width();
      a.css("left", c)
    }
  }, setInplayData: function (c, b) {
    var a = $("#audioCnt");
    if (b !== "" && a.length > 0) {
      $(a)[0].innerHTML = b;
      a.show();
      (new b365.Ui.AudioStreamingMenu).setActiveItem(c)
    }
  }}
})();
(function () {
  var a = null;
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingPlayer = function () {
    a = this;
    this.streamingKey = null;
    this.loading = false;
    this.loaded = false;
    this.error = null;
    this.loadStartHandler = null;
    this.playingHandler = null;
    this.abortHandler = null;
    this.endedHandler = null;
    this.errorHandler = null;
    this.suspendHandler = null;
    this.stalledHandler = null;
    this.progressHandler = null;
    this.audioPlayer = null
  };
  b365.Ui.AudioStreamingPlayer.prototype = {initialise: function () {
    a.debugLog("initialise");
    try {
      a.audioPlayer = document.createElement("audio");
      $(a.audioPlayer).off("error").on("error", function () {
        a.logError()
      });
      $(a.audioPlayer).off("loadstart").on("loadstart", function (b) {
        a.loadStart(b)
      });
      $(a.audioPlayer).off("progress").on("progress", function (b) {
        a.progress(b)
      });
      $(a.audioPlayer).off("stalled").on("stalled", function (b) {
        a.stalled(b)
      });
      $(a.audioPlayer).off("suspend").on("suspend", function (b) {
        a.suspend(b)
      });
      $(a.audioPlayer).off("abort").on("abort", function (b) {
        a.abort(b)
      });
      $(a.audioPlayer).off("timeupdate").on("timeupdate", function (b) {
        a.timeupdate(b)
      });
      $(a.audioPlayer).off("ended").on("ended", function (b) {
        a.ended(b)
      });
      a.audioPlayer.play();
      a.audioPlayer.pause()
    }
    catch (b) {
    }
  }, startAudio: function () {
    a.debugLog("startAudio");
    a.loading = true;
    a.audioPlayer.play()
  }, stopAudio: function () {
    a.debugLog("stopAudio");
    a.loading = false;
    a.audioPlayer.pause();
    a.audioPlayer.setAttribute("src", "");
    a.streamingKey = null
  }, loadStart: function (b) {
    a.loading = true;
    a.debugLog("loadstart");
    $(a.audioPlayer).off("timeupdate").on("timeupdate", function (b) {
      a.timeupdate(b)
    });
    a.loadStartHandler && a.loadStartHandler(b)
  }, timeupdate: function (b) {
    if (a.audioPlayer.currentTime > 0) {
      a.debugLog("timeupdate");
      a.loading = false;
      a.loaded = true;
      a.playingHandler && a.playingHandler(b);
      b.preventDefault();
      $(a.audioPlayer).off("timeupdate")
    }
  }, ended: function (b) {
    a.debugLog("ended");
    a.loading = false;
    a.loaded = false;
    a.streamingKey = null;
    a.debugLog("ended");
    a.endedHandler && a.endedHandler(b)
  }, abort: function (b) {
    a.debugLog("abort");
    $(a.audioPlayer).off("timeupdate").on("timeupdate", function (b) {
      a.timeupdate(b)
    });
    a.loading = false;
    a.loaded = false;
    a.abortHandler && a.abortHandler(b)
  }, suspend: function (b) {
    a.debugLog("suspend");
    a.loading = false;
    a.loaded = false;
    a.suspendHandler && a.suspendHandler(b)
  }, stalled: function (b) {
    a.loaded = false;
    a.debugLog("stalled");
    a.stalledHandler && a.stalledHandler(b)
  }, progress: function (b) {
    a.debugLog("progress");
    a.progressHandler && a.progressHandler(b)
  }, setStream: function (b) {
    a.debugLog("setStream");
    b = $.trim(b);
    a.audioPlayer && a.audioPlayer.setAttribute("src", b)
  }, debugLog: function () {
  }, logError: function () {
    a.debugLog("logError");
    a.loading = false;
    a.loaded = false;
    a.streamingKey = null;
    var b = "";
    a.error = a.audioPlayer.error;
    if (a.error) {
      if (a.error.code == 1)b = "1 = MEDIA_ERR_ABORTED - fetching process aborted by user";
      else if (a.error.code == 2)b = "2 = MEDIA_ERR_NETWORK - error occurred when downloading";
      else if (a.error.code == 3)b = "3 = MEDIA_ERR_DECODE - error occurred when decoding";
      else if (a.error.code == 4)b = "4 = MEDIA_ERR_SRC_NOT_SUPPORTED - audio/video not supported"
    }
    else b = "No Error object available";
    a.errorHandler && a.errorHandler(a.error)
  }}
})();
(function () {
  var b = null, a = null;
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingPlayerController = function () {
    b = this
  };
  b365.Ui.AudioStreamingPlayerController.prototype = {initialisePlayer: function () {
    if (!a) {
      a = new b365.Ui.AudioStreamingPlayer;
      a.initialise();
      a.loadStartHandler = b.audioLoading;
      a.playingHandler = b.audioStarted;
      a.errorHandler = b.audioError;
      a.abortHandler = b.audioError;
      a.endedHandler = b.audioFinished
    }
  }, startAudio: function (d, c) {
    if (!a)return;
    var b = {classificationId: 0, mediaId: 0, mediaStream: ""};
    b.classificationId = c[1];
    b.mediaId = c[2];
    b.mediaStream = c[3];
    a.streamingKey = new b365.Ui.AudioStreamingKey(b);
    a.setStream(d);
    a.startAudio()
  }, stopAudio: function () {
    if (!a)return;
    a.stopAudio()
  }, getStreamingElement: function () {
    if (a == null || a.streamingKey == null)return null;
    var b = a.streamingKey.getStreamingKey(), c = $(".as-panel a[data-audiostreamingkey=" + b + "]");
    return c
  }, audioLoading: function () {
    (new b365.Ui.AudioStreamingMenu).setWaitIcon(b.getStreamingElement())
  }, audioStarted: function () {
    (new b365.Ui.AudioStreamingMenu).setPlayingIcon(b.getStreamingElement())
  }, audioError: function () {
    (new b365.Ui.AudioStreamingMenu).resetIconsToPlay();
    (new b365.Ui.AudioStreamingMenu).showErrorMessage(b.getStreamingElement(), a.error)
  }, audioFinished: function () {
  }, getAudioPlayer: function () {
    return a
  }, getAudioPlayerSteamingKey: function () {
    return a == null
      ? null
      : a.streamingKey
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.AudioStreamingKey = function (a) {
    this.keyString = typeof a.stringKey != "undefined"
      ? a.stringKey
      : null;
    this.classificationId = 0;
    this.mediaId = 0;
    this.mediaStream = "";
    if (this.keyString !== null && this.keyString !== "")this.extractKeyValues(this.keyString);
    else a.classificationId > 0 && (a.mediaId !== 0 || a.mediaStream !== "") && this.buildKeyFromValues(a)
  };
  b365.Ui.AudioStreamingKey.prototype = {extractKeyValues: function (b) {
    if (b != null && b.length > 0) {
      var a = b.split("_");
      if (a.length == 4) {
        this.classificationId = parseInt(a[1]);
        this.mediaId = parseInt(a[2]);
        this.mediaStream = a[3]
      }
    }
  }, buildKeyFromValues: function (a) {
    this.classificationId = typeof a.classificationId !== "undefined"
      ? parseInt(a.classificationId)
      : 0;
    this.mediaId = typeof a.mediaId !== "undefined"
      ? parseInt(a.mediaId)
      : 0;
    this.mediaStream = typeof a.mediaStream !== "undefined"
      ? a.mediaStream
      : "";
    this.keyString = "";
    if (this.classificationId > 0 && (this.mediaId !== 0 || this.mediaStream !== ""))this.keyString = "sk_" + this.classificationId + "_" + this.mediaId + "_" +
      this.mediaStream
  }, getStreamingKey: function () {
    return this.keyString
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.PhoneOnlyHtmlBuilder = function () {
  };
  b365.Ui.PhoneOnlyHtmlBuilder.prototype = {getHtml: function () {
    return"<div class='po'><label class='ttHead'>Phone Only Market</label><br><label>Please call 1800 365 365</label><br><label>to place bet.</label></div>"
  }}
})();
(function (c, b) {
  c.registerNamespace("b365.Ui");
  var a = function () {
  };
  a.prototype = {getProviderUrl: function (c) {
    try {
      b.ajax({url: c, dataType: "json", type: "GET", crossDomain: true, cache: false, success: function (b) {
        if (b.statusCode)if (b.statusCode == "200")a.prototype.getProviderUrlSuccess(b.hlsUrl);
        else a.prototype.getProviderUrlError("M108");
        else a.prototype.getProviderUrlError("M108")
      }, error: function (c) {
        switch (c.status) {
          case 400:
            a.prototype.getProviderUrlError("M108");
            break;
          case 401:
            try {
              var d = b.parseJSON(c.responseText).message;
              switch (d) {
                case"Invalid timestamp":
                  a.prototype.getProviderUrlError("M141");
                  break;
                case"Invalid operator ID":
                  a.prototype.getProviderUrlError("M141");
                  break;
                case"Invalid auth token":
                  a.prototype.getProviderUrlError("M141");
                  break;
                case"Not authorized to view event":
                  a.prototype.getProviderUrlError("M141");
                  break;
                default:
                  a.prototype.getProviderUrlError("M108")
              }
            }
            catch (e) {
              a.prototype.getProviderUrlError("M108")
            }
            break;
          case 403:
            a.prototype.getProviderUrlError("M142");
            break;
          case 404:
            a.prototype.getProviderUrlError("M143");
            break;
          case 500:
            a.prototype.getProviderUrlError("M144");
            break;
          default:
            a.prototype.getProviderUrlError("M108")
        }
      }})
    }
    catch (d) {
      a.prototype.getProviderUrlError("M108")
    }
  }, getProviderUrlSuccess: function (d) {
    var c = b("#strVideo"), a = b("#VideoOverlay");
    c.attr("src", d);
    a.removeClass("wait").addClass("play");
    c.hide();
    a.show()
  }, getProviderUrlError: function (i) {
    var e = b("#VideoOverlay"), d = b("#VideoOverlayWait"), h = b("#VideoContainer"), g = b("#strVideo"), f = b("#cont"), a, c;
    c = f.children().find(".dt");
    a = c.text();
    a = a.replace("{0}", i);
    h.attr("class", "msg");
    c.text(a);
    f.show();
    e && e.hide();
    d && d.hide();
    g && g.hide()
  }};
  b365.Ui.StreamingMediaProvider = a
})(Type, jQuery);
var SportsUIController = function () {
  "use strict";
  var F = ns_gen5_ui.Application, B = ns_gen5_events.ApplicationEvent, f = window.Locator, Cb = ns_gen5_events.Event365, g = ns_inplay_events.InPlayNavigationEvent, m = ns_inplay_viewcontrollers.TabletViewController, e = ns_gen5_util.Delegate, G = ns_gen5_data.Attribute, E = ns_betslip.BetSlipEvent, s = ns_gen5_data.StreamDataProcessorEvent, Eb = ns_gen5_util.EventTrigger, zb = ns_gen5_util.OddsConverter, yb = ns_inplay_viewcontrollers_tabletviews.TabletOverview, xb = ns_inplay_viewcontrollers_tabletviews.TabletEventView, r = window.document, t = window.Modernizr, Bb = window.CouponKey, b = window.jQuery, c = window.$log, vb = b365.Ui.AudioStreamingKey, x = "matchlivepanelloaded.sportsuicontroller", v = -1, M = 0, z = 1, gb = 2, bb = 0, W = 1, V = 2, ub = -1, eb = 0, N = 1, O = 2, P = 3, qb = 4, ob = 6, Q = 7, K = 8, hb = 9, jb = 10, cb = 11, U = 12, H = 13, l = 14, T = 15, Z = 16, Y = 17, db = 18, I = 19, lb = 21, mb = 22, R = 23, J = 25, X = 26, L = 27, kb = 30, fb = 31, ib = 34, S = 35, o = 9998, Fb = 9999, w = "/#!in-play/overview/", tb = "/#!in-play/", y = 2, ab = 4, wb = 1, d, u, C, p, j, h, Db, i, k, a, q, n, D = {}, Ab = "mt", rb = "0", pb = "11", nb = "1", sb = "#";

  function A() {
    this.pushLogHandler = new window.bet365.pushStatus.longPollStatus.LongPollStatusHandler;
    this.connectionState = v;
    this._pushTimeout = false;
    this._delegate_loadingCompleteHandler = new e(this, this._loadingCompleteHandler);
    this._delegate_loadingTimeoutHandler = new e(this, this._loadingTimeoutHandler);
    this._delegate_connectedHandler = new e(this, this._connectedHandler);
    this._delegate_connectionFailureHandler = new e(this, this._connectionFailedHandler);
    this._delegate_showStreamingHandler = new e(this, this._showStreamingHandler);
    this._delegate_showStreamingAudioHandler = new e(this, this._showStreamingAudioHandler);
    this._delegate_showMessageHandler = new e(this, this._showMessageHandler);
    this._delegate_removingOverview = new e(this, this._removingOverview);
    this._delegate_matchLiveContentLoaded = new e(this, this._matchLiveContentLoaded);
    this._delegate_matchLiveLoadContent = new e(this, this._matchLiveLoadContent);
    this._delegate_matchLiveDisposed = new e(this, this._matchLiveDisposed);
    this._delegate_applyTeamKitColorsHandler = new e(this, this._applyTeamKitColorsHandler);
    this._delegate_fixtureSelectedHandler = new e(this, this._fixtureSelectedHandler);
    this._delegate_eventViewExitHandler = new e(this, this._eventViewExitHandler);
    this._delegate_viewActivatedHandler = new e(this, this._viewActivatedHandler);
    this._delegate_noViewAvailableHandler = new e(this, this._noViewAvailableHandler);
    this._delegate_changeEventMenuShownHandler = new e(this, this._changeEventMenuShownHandler);
    this._delegate_changeEventMenuHiddenHandler = new e(this, this._changeEventMenuHiddenHandler);
    this._delegate_phoneOnlyHandler = new e(this, this._phoneOnlyHandler);
    Db = window.storage;
    i = window.mf;
    this._initialised = false;
    this._connected = false
  }

  a = A.prototype;
  a.toString = function () {
    return"[SportsUIController]"
  };
  a.initialise = function (i, a, k, n) {
    var e, l;
    c(this, "initialise", i, a, k);
    q = b("#headerContainer").find(".view-link");
    q.each(function () {
      var a = b(this), f = a.attr("name"), c = a.attr("href") || a.attr("_href"), d = c.indexOf("#!"), e = c.substring(d);
      D[e] = f
    });
    F.widthThreshold = t.flexbox
      ? 0
      : 900;
    d = new F(i);
    u = i;
    p = k;
    j = n;
    C = a;
    d.addEventListener(B.LOADING_COMPLETE, this._delegate_loadingCompleteHandler);
    d.addEventListener(B.LOADING_TIMEOUT, this._delegate_loadingTimeoutHandler);
    d.addEventListener(g.SHOW_STREAMING, this._delegate_showStreamingHandler);
    d.addEventListener(g.SHOW_STREAMING_AUDIO, this._delegate_showStreamingAudioHandler);
    d.addEventListener(g.SHOW_MESSAGE, this._delegate_showMessageHandler);
    d.addEventListener(g.MATCHLIVE_CONTENTLOADED, this._delegate_matchLiveContentLoaded);
    d.addEventListener(g.MATCHLIVE_LOADCONTENT, this._delegate_matchLiveLoadContent);
    d.addEventListener(g.MATCHLIVE_DISPOSED, this._delegate_matchLiveDisposed);
    d.addEventListener(g.APPLY_TEAM_KIT_COLORS, this._delegate_applyTeamKitColorsHandler);
    d.addEventListener(g.CHANGE_EVENT_MENU_SHOWN, this._delegate_changeEventMenuShownHandler);
    d.addEventListener(g.CHANGE_EVENT_MENU_HIDDEN, this._delegate_changeEventMenuHiddenHandler);
    d.addEventListener(g.PHONE_ONLY, this._delegate_phoneOnlyHandler);
    f.inplayEvents.addEventListener(g.VIEWACTIVATED, this._delegate_viewActivatedHandler);
    d.addEventListener(g.NO_VIEW_AVAILABLE, this._delegate_noViewAvailableHandler);
    d.initialize();
    var m = this;
    f.betSlipManager.setBetSlipInterface({AddBet: function (a) {
      if (a.ConstructString.indexOf("pom") === 0)m._showPhoneOnlyMessage(a.Target);
      else p.addBet(a.ConstructString + m._resolveMediaType())
    }, DeleteBet: function (a) {
      p.deleteBet(a.ConstructString)
    }, IsSelected: function (b) {
      var a = p._bsInst;
      return a.getBetItemByCn(a.betTypeNormal, "fp", b.Id) !== undefined
    }});
    p.addOnPlaceBetSuccess(function () {
      j._classificationId === y && j._providerId > 0 && j.getStreamingData(1, 1)
    });
    e = f.user;
    e.languageId = parseInt(a.LangID, 10);
    e.zoneId = parseInt(a.ZoneID, 10);
    e.oddsTypeId = parseInt(a.ot, 10);
    e.timeZoneId = parseInt(a.tzi, 10);
    e.currencyCode = a.curCode;
    e.countryCode = a.ISOCode;
    zb.MinOdds = parseFloat(a.minimumOdds);
    e.setSiteConfig(a.sc.fm, a.sc.ct, a.sc.cts, a.sc.ctg);
    l = f.languageResource;
    l.loadResource(e.languageId, "inplay");
    f.config.load(a.push, f.user.getSessionId());
    f.subscriptionManager._streamDataProcessor.addEventListener(s.CONNECTED, this._delegate_connectedHandler);
    f.subscriptionManager._streamDataProcessor.addEventListener(s.CONNECTION_FAILED, this._delegate_connectionFailureHandler);
    b(r).off(x).on(x, this._matchLiveLoaded);
    var h = r.querySelector("#ftrsmap-s1 .smft-hdr");
    if (h) {
      var o = function () {
        b(h).addClass("sent");
        f.otsReport.send();
        window.setTimeout(function () {
          b(h).removeClass("sent")
        }, 1e3)
      };
      LongClick.attach(h, 1e4, o)
    }
    this._initialised = true
  };
  a.connect = function () {
    c(this, "connect");
    if (!this._initialised)throw new Error("Attempted to connect to push when SportsUIController not initialised");
    f.subscriptionManager.connect()
  };
  a.allowPush = function () {
    var a = C.push;
    return t.inplaypush && a && a.PushInPlayEnabled && a.PushInPlayEnabledForUser && !this._pushTimeout &&
      (this.connectionState === v || this.connectionState === z)
  };
  a.loadView = function (a, b) {
    c(this, "loadView", a, b);
    d.enableUI();
    if (!h) {
      d.addEventListener(g.REMOVING_OVERVIEW, this._delegate_removingOverview);
      h = new m;
      h.addEventListener(g.FIXTURE_SELECTED, this._delegate_fixtureSelectedHandler);
      h.addEventListener(g.EVENTVIEW_EXIT, this._delegate_eventViewExitHandler);
      this.clearTarget();
      d.appendChild(h)
    }
    h.showView(a, b)
  };
  a.clearTarget = function () {
    while (u.firstChild)u.removeChild(u.firstChild)
  };
  a.disposeView = function () {
    c(this, "disposeView");
    d.disableUI();
    if (h) {
      h.dispose();
      h = null;
      d.removeEventListener(g.REMOVING_OVERVIEW, this._delegate_removingOverview)
    }
  };
  a.handleRequest = function (s, g) {
    var y = false, z = f.user, u = null, p, a, n, x, t, w, v, j, d, e = null;
    c(this, "handleRequest", s, "[" + Array.prototype.join.call(g, ", ") + "]");
    if (!this._connected) {
      this.connect();
      this._connected = true
    }
    if (this.allowPush())switch (s) {
      case eb:
      case qb:
        if (typeof n === "undefined") {
          d = this._getLinkData(g);
          n = d.href;
          e = d.linkType
        }
        if (!(e === "ipo" || e === "ipe")) {
          this.disposeView();
          break
        }
        else {
          p = o;
          a = ""
        }
      case l:
        if (typeof p === "undefined")p = parseInt(g[1], 10);
        if (typeof a === "undefined")a = g[2];
        if (typeof n === "undefined") {
          d = this._getLinkData(g);
          n = d.href;
          e = d.linkType
        }
        c("Ah, push it");
        t = b("#LHSWrapper");
        w = b("#lhsAllMarkets");
        v = !t.hasClass("inplay");
        if (v) {
          t.addClass("inplay");
          t.hide();
          b(r).trigger("prelivecontentchange")
        }
        if (p === o && (e === null || e === "ipe")) {
          j = m.EVENTVIEW;
          if (a && a.indexOf("-") >= 0) {
            x = new Bb(a);
            if (x.isValid())u = x.toPushFixtureId(z.languageId, z.zoneId);
            else j = m.OVERVIEW
          }
          else u = a;
          if (!k) {
            k = _tabletEventAdapter.LayoutController._toggleInplayEventListMenu;
            _tabletEventAdapter.LayoutController._toggleInplayEventListMenu = function () {
              h.toggleChangeEventMenu()
            }
          }
          s = l
        }
        else j = m.OVERVIEW;
        _tabletEventAdapter.PopupController.HidePopup();
        this.loadView(j, u);
        this._setHistory({id: s, cid: p, topic: u, href: n});
        if (v) {
          _tabletEventAdapter.LayoutController.onInplayContentLoaded({autoRefresh: false});
          b(r).trigger("inplaycontentloaded", [false, true]);
          $displayHelper.setPortraitLandscapeMode(false)
        }
        q.removeAttr("rel");
        if (j === m.EVENTVIEW) {
          w.show();
          q.filter('[name="ipe"]').attr("rel", "self")
        }
        else if (j === m.OVERVIEW) {
          w.hide();
          q.filter('[name="ipo"]').attr("rel", "self")
        }
        i.reqStarted(s, g);
        y = true;
        break;
      case ub:
      case N:
      case O:
      case P:
      case ob:
      case Q:
      case K:
      case hb:
      case jb:
      case cb:
      case U:
      case H:
      case T:
      case Z:
      case Y:
      case db:
      case I:
      case lb:
      case mb:
      case R:
      case J:
      case X:
      case L:
      case kb:
      case fb:
      case ib:
      case S:
        this.disposeView();
        if (k) {
          _tabletEventAdapter.LayoutController._toggleInplayEventListMenu = k;
          k = null
        }
        _tabletEventAdapter.PopupController.HidePopup()
    }
    return y
  };
  a._getLinkData = function (c) {
    var e, f, b, d, a;
    if (c && c.length > 0)for (d = 0; d < c.length; d++) {
      a = c[d];
      if (a && a.indexOf && a.indexOf("#!") > -1) {
        b = a;
        break
      }
    }
    if (b) {
      e = b.substring(b.indexOf("#!"));
      f = D[e]
    }
    return{href: b, linkType: f || null}
  };
  a.itemsRemoved = function (b) {
    var a = new E(E.PARTICIPANT_REMOVED_FROM_BETSLIP);
    a.data = b;
    f.inplayEvents.dispatchEvent(a)
  };
  a._matchLiveLoaded = function () {
    c(this, "_matchLiveLoaded");
    if (n) {
      n.contentLoaded();
      f.inplayEvents.dispatchEvent(new Cb("MatchLiveLoaded"))
    }
  };
  a._loadingCompleteHandler = function () {
    c(this, "_loadingCompleteHandler");
    f.validationManager.callPostValidation(function () {
      !t.horizontalscroll &&
      b(".ClassificationMenuContainer").pageScroller({itemsSelector: ".ClassificationMenu .Classification", itemParentSelector: ".ClassificationMenu", itemSpacing: 4, containerPadding: 30, selectedItemSelector: ".on", showSelected: true});
      b("#MiddleScroller").scrollTop(0)
    })
  };
  a._loadingTimeoutHandler = function () {
    this._pushTimeout = true;
    this.pushLogHandler.setStatus(false, null, V);
    this.disposeView();
    if (k) {
      _tabletEventAdapter.LayoutController._toggleInplayEventListMenu = k;
      k = null
    }
    this._navigate(l, o, "", w)
  };
  a._removingOverview = function () {
    c(this, "_removingOverview");
    f.validationManager.callPostValidation(function () {
      !t.horizontalscroll && b(".ClassificationMenuContainer").removePageScroller()
    })
  };
  a._connectionFailedHandler = function (a) {
    c(this, "_connectionFailedHandler", "falling back to pull");
    var b = a.data;
    if (b <= 5) {
      a.retry = true;
      if (this.connectionState === v)this.connectionState = M
    }
    else {
      a.retry = false;
      this.connectionState = gb;
      this.pushLogHandler.setStatus(false, null, W)
    }
    if (h && h._currentView) {
      this.disposeView();
      this._navigate(l, o, "", w)
    }
  };
  a._showStreamingHandler = function (a) {
    c(this, "_showStreamingHandler");
    $dir(a.data)
  };
  a._showStreamingAudioHandler = function (a) {
    c(this, "_showStreamingAudioHandler");
    $dir(a.data)
  };
  a._showMessageHandler = function (a) {
    c(this, "_showMessageHandler");
    $dir(a.data);
    this._showMessage(a.target, a.data)
  };
  a._fixtureSelectedHandler = function (a) {
    var b = a.data || a.target.stem, d = b.data[G.ID] || b.data[G.TOPIC_LIST];
    c(this, "_fixtureSelectedHandler");
    if (typeof MatchLiveGlobal != "undefined")MatchLiveGlobal.onPageLoadClearMatchLive(true);
    this._matchLiveDisposed();
    this._navigate(l, o, d, tb)
  };
  a._eventViewExitHandler = function () {
    c(this, "_eventViewExitHandler");
    if (typeof MatchLiveGlobal != "undefined")MatchLiveGlobal.onPageLoadClearMatchLive(true);
    this._matchLiveDisposed();
    this._navigate(l, o, "", w)
  };
  a._connectedHandler = function (a) {
    c(this, "_connectedHandler");
    this.connectionState = z;
    f.subscriptionManager._streamDataProcessor.removeEventListener(s.CONNECTED, this._delegate_connectedHandler);
    f.subscriptionManager._streamDataProcessor.removeEventListener(s.CONNECTION_FAILED, this._delegate_connectionFailureHandler);
    this.pushLogHandler.setStatus(true, a.data, bb)
  };
  a._matchLiveLoadContent = function (g) {
    var e, a = g.data, h = f.config.isMatchLiveEnabled(a.classificationId)
      ? a.matchLiveData.available
      : 0, d = a.matchLiveData.audioAvailable;
    n = g.target;
    if (d === 0 && f.user.languageId === wb && (a.classificationId === y || a.classificationId === ab))d = 1;
    c(this, "_matchLiveLoadContent");
    $dir(g.data);
    e = {classificationId: a.classificationId, fixtureId: a.matchLiveData.fixtureId, hasMatchLive: h, languageId: a.languageId, matchLiveTopicId: a.matchLiveTopicId, providerId: parseInt(a.matchLiveData.providerId,
      10)};
    if (d > 0)e.audioKey = new vb({classificationId: a.classificationId, mediaId: a.matchLiveData.mediaId, mediaStream: a.matchLiveData.audioId});
    j.setParameters(e);
    j.getStreamingData(h > 0
      ? 1
      : 0, 1);
    if (d > 0 && e.providerId === 0)j._mlBtnClicked = true;
    b("#streamingWpr").removeClass(function (e, d) {
      for (var b = d.split(" "), c = [], a = 0; a < b.length; a++)b[a].startsWith("cat_") && c.push(b[a]);
      return c.join(" ")
    }).addClass("cat_" + n.classification)
  };
  a._matchLiveContentLoaded = function (d) {
    var a = d.data, e = a.matchLiveData.audioAvailable;
    c(this, "_matchLiveContentLoaded");
    b(n._element).show();
    b("#cpLineupIconT1").hide();
    b("#cpLineupIconT2").hide()
  };
  a._matchLiveDisposed = function () {
    c(this, "_matchLiveDisposed");
    j.setParameters({classificationId: null, fixtureId: null, hasMatchLive: null, languageId: null, matchLiveTopicId: null, providerId: null, audioKey: null});
    n = null;
    j.setStreamingButtons(false, false, false);
    if (typeof MatchLiveGlobal != "undefined")MatchLiveGlobal.onPageLoadClearMatchLive(true);
    b("#holdingCnt,#preMHoldingCnt").hide()
  };
  a._viewActivatedHandler = function () {
    b(r).trigger("prelivecontentchange")
  };
  a._noViewAvailableHandler = function () {
    b("#holdingCnt,#preMHoldingCnt").hide()
  };
  a._applyTeamKitColorsHandler = function () {
    for (var c = b(".MobileView .KitImg"), a, e = "teamkit/imgs/classifications/{0}/KIT-{1}.svg", d = 0, f = c.length; d < f; d++) {
      a = b(c[d]);
      a.setKitAttrs(e.replace("{0}", a.attr("data-classification")).replace("{1}", a.attr("data-kit")), a.attr("data-kitcolour"))
    }
    c.applyKitColour()
  };
  a._changeEventMenuShownHandler = function (a) {
    b("body").off("click.changeEvent").on("click.changeEvent", function () {
      a.target.setOpen(false)
    });
    f.validationManager.callPostValidation(e.CreateCallback(this, function () {
      b("#MiddleScroller").scrollTop(0)
    }));
    _tabletEventAdapter.PopupController.HidePopup()
  };
  a._changeEventMenuHiddenHandler = function () {
    b("body").off("click.changeEvent")
  };
  a._phoneOnlyHandler = function (a) {
    this._showPhoneOnlyMessage(a.target._element)
  };
  a._navigate = function (f, e, b, a) {
    var d;
    c(this, "_navigate", f, e, b, a);
    if (typeof a === "string")d = "href=" + window.location.protocol + "//" + window.location.host + window.location.pathname + a;
    i._isAutoRefresh = false;
    if (d)i.req(f, e, b, d);
    else i.req(f, e, b)
  };
  a._setHistory = function (a) {
    c(this, "_setHistory", a.id, a.cid, a.topic, a.href);
    i._isAdding = true;
    if (a.topic)i.setHistory("op=" + a.id + "&cid=" + a.cid + "&cpid=" + a.topic);
    else if (a.href)i.setHistory(a.href.substring(a.href.indexOf("#!")));
    else i.setHistory("op=" + a.id + "&cid=" + a.cid);
    i._isAdding = false
  };
  a._showMessage = function (a, c) {
    b("#ttDivPersist").find(".cnt").html(c);
    b(a).addClass("clickpupelem_x justshow")
  };
  a._showPhoneOnlyMessage = function (a) {
    $ttPersist.hide();
    b(a).addClass("clickpupelem_x phoneonly")
  };
  a._resolveMediaType = function () {
    var a = rb;
    if (h)if (h._currentView instanceof yb)a = pb;
    else if (h._currentView instanceof xb)a = nb;
    return Ab + "=" + a + sb
  };
  return A
}()