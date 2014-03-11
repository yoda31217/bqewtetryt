window.Modernizr = function (z, b, l) {
  var E = "2.7.1", a = {}, k = true, d = b.documentElement, f = "modernizr", w = b.createElement(f), x = w.style, B, D = {}.toString, m = " -webkit- -moz- -o- -ms- ".split(" "), u = "Webkit Moz O ms", s = u.split(" "), t = u.toLowerCase().split(" "), q = {svg: "http://www.w3.org/2000/svg"}, c = {}, G = {}, H = {}, n =
    [], p = n.slice, h, r = function (l, n, e, j) {
    var k, m, h, i, c = b.createElement("div"), g = b.body, a = g || b.createElement("body");
    if (parseInt(e, 10))while (e--) {
      h = b.createElement("div");
      h.id = j
        ? j[e]
        : f + (e + 1);
      c.appendChild(h)
    }
    k = ["&#173;", '<style id="s', f, '">', l, "</style>"].join("");
    c.id = f;
    (g
      ? c
      : a).innerHTML += k;
    a.appendChild(c);
    if (!g) {
      a.style.background = "";
      a.style.overflow = "hidden";
      i = d.style.overflow;
      d.style.overflow = "hidden";
      d.appendChild(a)
    }
    m = n(c, l);
    if (!g) {
      a.parentNode.removeChild(a);
      d.style.overflow = i
    }
    else c.parentNode.removeChild(c);
    return!!m
  }, j = {}.hasOwnProperty, i;
  if (!e(j, "undefined") && !e(j.call, "undefined"))i = function (b, a) {
    return j.call(b, a)
  };
  else i = function (b, a) {
    return a in b && e(b.constructor.prototype[a], "undefined")
  };
  if (!Function.prototype.bind)Function.prototype.bind = function (d) {
    var a = this;
    if (typeof a != "function")throw new TypeError;
    var c = p.call(arguments, 1), b = function () {
      if (this instanceof b) {
        var g = function () {
        };
        g.prototype = a.prototype;
        var f = new g, e = a.apply(f, c.concat(p.call(arguments)));
        return Object(e) === e
          ? e
          : f
      }
      else return a.apply(d, c.concat(p.call(arguments)))
    };
    return b
  };
  function y(a) {
    x.cssText = a
  }

  function e(b, a) {
    return typeof b === a
  }

  function C(b, a) {
    return!!~("" + b).indexOf(a)
  }

  function v(b, c) {
    for (var d in b) {
      var a = b[d];
      if (!C(a, "-") && x[a] !== l)return c == "pfx"
        ? a
        : true
    }
    return false
  }

  function A(b, d, c) {
    for (var f in b) {
      var a = d[b[f]];
      if (a !== l)return c === false
        ? b[f]
        : e(a, "function")
        ? a.bind(c || d)
        : a
    }
    return false
  }

  function g(c, a, f) {
    var b = c.charAt(0).toUpperCase() + c.slice(1), d = (c + " " + s.join(b + " ") + b).split(" ");
    if (e(a, "string") || e(a, "undefined"))return v(d, a);
    else {
      d = (c + " " + t.join(b + " ") + b).split(" ");
      return A(d, a, f)
    }
  }

  c.flexbox = function () {
    var a = g("flexWrap");
    if (!a)return a;
    var b = navigator.userAgent.match(/Chrome\W(\d+)/);
    if (b && b.length >= 2) {
      var c = parseInt(b[1], 10);
      a = c >= 21
    }
    return a
  };
  c.touch = function () {
    var a;
    if ("ontouchstart"in z || z.DocumentTouch && b instanceof DocumentTouch)a = true;
    else r(["@media (", m.join("touch-enabled),("), f, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (b) {
      a = b.offsetTop === 9
    });
    return a
  };
  c.svg = function () {
    return!!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect
  };
  c.inlinesvg = function () {
    var a = b.createElement("div");
    a.innerHTML = "<svg/>";
    return(a.firstChild && a.firstChild.namespaceURI) == q.svg
  };
  c.svgclippaths = function () {
    return!!b.createElementNS && /SVGClipPath/.test(D.call(b.createElementNS(q.svg, "clipPath")))
  };
  for (var o in c)if (i(c, o)) {
    h = o.toLowerCase();
    a[h] = c[o]();
    n.push((a[h]
      ? ""
      : "no-") + h)
  }
  a.addTest = function (b, c) {
    if (typeof b == "object")for (var e in b)i(b, e) && a.addTest(e, b[e]);
    else {
      b = b.toLowerCase();
      if (a[b] !== l)return a;
      c = typeof c == "function"
        ? c()
        : c;
      if (typeof k !== "undefined" && k)d.className += " " + (c
        ? ""
        : "no-") + b;
      a[b] = c
    }
    return a
  };
  y("");
  w = B = null;
  a._version = E;
  a._prefixes = m;
  a._domPrefixes = t;
  a._cssomPrefixes = s;
  a.testProp = function (a) {
    return v([a])
  };
  a.testAllProps = g;
  a.testStyles = r;
  a.prefixed = function (a, b, c) {
    return!b
      ? g(a, "pfx")
      : g(a, b, c)
  };
  d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (k
    ? " js " + n.join(" ")
    : "");
  return a
}(this, this.document);
Modernizr.addTest("SupportsMatchLive", function () {
  return true
});
Modernizr.addTest("carouselSwipeByTransform", function () {
  var a = navigator.userAgent;
  return!(a.indexOf("Firefox") > -1)
});
Modernizr.addTest("overflowscrolling", function () {
  var c = Modernizr.testAllProps("overflowScrolling"), b, a;
  if (!c) {
    b = navigator.userAgent.match(/Chrome\/(\d+).(\d+).(\d+).(\d+)/);
    if (b && b.length > 0) {
      a = b.map(function (a) {
        return new Number(a)
      });
      var d = navigator.userAgent, e = d.indexOf("Mozilla/5.0") > -1 && d.indexOf("Android ") > -1 && d.indexOf("AppleWebKit") > -1 &&
        !(d.indexOf("Chrome") > -1);
      if (a.length >= 2 && a[1] >= 26)c = true;
      else if (e)c = false
    }
  }
  else {
    b = navigator.userAgent.match(/Android (\d+(?:\.\d+)+);.+AppleWebKit\/(\d+(?:\.\d+)+)/);
    if (b && b.length > 0) {
      a = b.map(function (a) {
        return a.split(".").map(function (a) {
          return new Number(a)
        })
      });
      if (a.length > 1 && a[1][0] <= 4 && a[1][1] <= 1 && a[1][2] <= 1 && a[2][0] <= 534 && a[2][1] <= 30)c = false
    }
  }
  return c
});
Modernizr.addTest("sectionscroll", function () {
  return!Modernizr.touch || Modernizr.touch && Modernizr.overflowscrolling
});
Modernizr.addTest("horizontalscroll", function () {
  var a = Modernizr.sectionscroll;
  if (a && /(iPhone|iPod|iPad|msie 10.0)/i.test(navigator.userAgent))if (/OS [1-5]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent) ||
    /(msie 10.0)/i.test(navigator.userAgent))a = false;
  return a
});
Modernizr.addTest("sessionstorage", function () {
  return"sessionStorage"in window && window.sessionStorage && window.sessionStorage !== null
});
Modernizr.addTest("supportsxaacaudio", function () {
  var b = document.createElement("audio"), a = b.canPlayType("audio/x-aac");
  return a && a != ""
    ? true
    : false
});
Modernizr.addTest("supportsfullscreenvideo", function () {
  return/(iPhone|iPod|iPad)/i.test(navigator.userAgent)
});
Modernizr.addTest("showpoker", function () {
  return!/(iPad)/i.test(navigator.userAgent)
    ? false
    : /OS [1-4]_\d(_\d)? like Mac OS X/i.test(navigator.userAgent)
    ? false
    : true
});
Modernizr.addTest("inplaypush", function () {
  return true
});
Modernizr.addTest("forcehardwarescrolling", function () {
  return/(iPhone|iPod|iPad).*OS 5_.*/i.test(navigator.userAgent)
});
Modernizr.addTest("fixpercentagewidths", function () {
  return/(iPhone|iPod|iPad)/i.test(navigator.userAgent)
})