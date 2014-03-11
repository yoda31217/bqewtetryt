bet365.pushStatus = function () {
};
(function (a) {
  a.pushConnectionStatusEnum = {ATTEMPTINGCONNECTION: 1, CONNECTED: 2, FIRSTATTEMPTFAILED: 3, ALLRETRYSFAILED: 4, DISCONNECTED: 5, DELTA: 6};
  var i = 0, g = -1, b = true, f = true, d = true, e = false, c, h = "pushstatus/logpushstatus.ashx";
  a.CheckPollStatus = function (a, b, c) {
    e = a.EnabledTraceLog;
    d = a.LogFailuresOnly;
    window.bet365.pushStatus.diffusionConnection.intialise(a.ConnectionDetails[0].Host, a.ConnectionDetails[1].Host,
      (new Date).getTime() + Math.floor(Math.random() * 5e4), "SYMBOLS", b, c);
    window.bet365.pushStatus.diffusionConnection.connect();
    window.bet365.pushStatus.diffusionConnection.dispose()
  };
  a.SetupConnectionFailureDialog = function () {
    var a = $('<div class="hidden" />');
    a.attr("id", "financialsDialog");
    a.html("Due to connectivity issues, this feature is not currently available");
    a.appendTo("body");
    a.click(function () {
      c.hideDialog()
    })
  };
  a.ShowConnectionFailureDialog = function () {
    c = new b365.Ui.PUpDialog(document.body, document.getElementById("financialsDialog"), true, mf._MSG_IMP_HIGH);
    c.showDialog()
  };
  a.LongPollStatusHandler = function () {
    this.pushConnectionStatusEnum = window.bet365.pushStatus.longPollStatus.pushConnectionStatusEnum;
    b = sProps && sProps.push && sProps.push.EnabledTraceLog;
    f = sProps && sProps.push && sProps.push.EnabledStatusLog
  };
  a.LongPollStatusHandler.prototype = {log: function (a, c, f, j) {
    if (b && a !== null && a > 0) {
      if (a === this.pushConnectionStatusEnum.ATTEMPTINGCONNECTION)i++;
      if (a === this.pushConnectionStatusEnum.DELTA) {
        g++;
        if (g % 10 !== 0)return true
      }
      if (d && a !== this.pushConnectionStatusEnum.ALLRETRYSFAILED)return false;
      if (!e)return false;
      $.ajax({url: h, async: true, type: "POST", data: {connectionStatus: "" + a + "", connectionAttempts: "" + i + "", classification: "" + c +
        "", sslStatus: "" + f + "", message: "" + j + ""}}).always(function (a) {
        b = a === "True"
      })
    }
    return b
  }, setStatus: function (g, a, d) {
    if (f) {
      var i = h + "?state=" + g, c;
      if (a)c = {sslStatus: a.host + ":" + a.port, connectionID: a.connectionID, uid: a.uid, connectionStatus: d};
      else {
        var e = [];
        if (sProps && sProps.push && sProps.push.ConnectionDetails)for (var b = 0; b <
          sProps.push.ConnectionDetails.length; b++)e.push(sProps.push.ConnectionDetails[b].Host + ":" + sProps.push.ConnectionDetails[b].Port);
        c = {sslStatus: e.join(";"), connectionStatus: d}
      }
      $.post(i, c)
    }
  }}
})(window.bet365.pushStatus.longPollStatus = window.bet365.pushStatus.longPollStatus || {});
(function (a) {
  a.DiffusionClient = new function () {
    this.version = "2.2";
    this.buildNumber = "26";
    this.isInvalidFunction = false;
    this.topicListenerRef = 0;
    this.isDebugging = false;
    if (navigator.appVersion.match("MSIE") == "MSIE")this.isIE = true;
    else this.isIE = false;
    if (navigator.appVersion.match("MSIE 9.0") == "MSIE 9.0")this.isIE9 = true;
    else this.isIE9 = false;
    if (navigator.userAgent.indexOf("Firefox") == -1)this.isFirefox = false;
    else this.isFirefox = true;
    if (navigator.platform.indexOf("Win") == -1)this.isWindows = false;
    else this.isWindows = true;
    this.connect = function (b) {
      this.connectionDetails = this.extend(new a.DiffusionClientConnectionDetails, b);
      this.connectionDetails.debug == true && this.setDebugging(true);
      this.trace(navigator.userAgent);
      this.trace("DiffusionClient: Version " + this.version + " build " + this.buildNumber);
      if (typeof b.onInvalidClientFunction == "function")this.isInvalidFunction = true;
      setTimeout(function () {
        if (a.DiffusionClient.diffusionTransport.isConnected == false)typeof a.DiffusionClient.connectionDetails.callbackFunction == "function" &&
        a.DiffusionClient.connectionDetails.callbackFunction(false)
      }, this.connectionDetails.timeoutMS);
      this.diffusionTransport = new a.DiffusionClientTransport;
      this.diffusionTransport.cascade();
      window.onbeforeunload = function () {
        typeof a.DiffusionClient.connectionDetails.onBeforeUnloadFunction == "function" && a.DiffusionClient.connectionDetails.onBeforeUnloadFunction();
        a.DiffusionClient.diffusionTransport.isConnected && a.DiffusionClient.close()
      };
      document.onkeydown = this.checkEscape;
      document.onkeypress = this.checkEscape
    };
    this.subscribe = function (a) {
      this.diffusionTransport.isValid() && this.diffusionTransport.subscribe(a)
    };
    this.unsubscribe = function (a) {
      this.diffusionTransport.isValid() && this.diffusionTransport.unsubscribe(a)
    };
    this.send = function (b, a) {
      this.diffusionTransport.isValid() && this.diffusionTransport.send(b, a)
    };
    this.close = function () {
      this.diffusionTransport.close();
      document.onkeydown = null;
      document.onkeypress = null
    };
    this.checkEscape = function (a) {
      if (!a)a = event;
      if (a.keyCode == 27)return false
    };
    this.extend = function (a, b) {
      for (var c in b)a[c] = b[c];
      return a
    };
    this.bind = function (b, a) {
      return function () {
        var c = Array.prototype.slice.call(arguments, 0);
        return b.apply(a, c)
      }
    };
    this.getClientID = function () {
      return this.diffusionTransport.clientID
    };
    this.setDebugging = function (b) {
      if (b == false) {
        this.trace = function () {
        };
        this.isDebugging = false
      }
      else {
        this.isDebugging = true;
        this.trace = function (b) {
          console.log(a.DiffusionClient.timestamp() + b)
        }
      }
    };
    this.timestamp = function () {
      var a = new Date;
      return a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + "." + a.getMilliseconds() + " : "
    };
    this.trace = function () {
    }
  };
  a.DiffusionClientTransport = function () {
    this.isConnected = false;
    this.messageCount = 0;
    this.isClosing = false;
    this.clientID;
    this._cd = a.DiffusionClient.connectionDetails;
    this._dc = a.DiffusionClient;
    this.transportName;
    this.aliasMap = [];
    this.transports = [];
    this.transports.push({name: "XmlHttpRequest", transport: new a.DiffusionXHRTransport})
  };
  a.DiffusionClientTransport.prototype.cascade = function () {
    if (this.transports.length > 0) {
      var a = this.transports.shift();
      this.transport = a.transport;
      this.transportName = a.name;
      if (typeof this._cd.onCascadeFunction == "function")this._cd.onCascadeFunction(a.name);
      this.transport.connect()
    }
    else {
      if (typeof this._cd.onCascadeFunction == "function")this._cd.onCascadeFunction("None");
      if (typeof this._cd.onCallbackFunction == "function")this._cd.onCallbackFunction(false)
    }
  };
  a.DiffusionClientTransport.prototype.isValid = function () {
    if (this.isConnected == false || this.isClosing == true) {
      this._dc.isInvalidFunction && this._cd.onInvalidClientFunction();
      return false
    }
    return true
  };
  a.DiffusionClientTransport.prototype.connectionRejected = function () {
    this.isConnected = false;
    typeof a.DiffusionClient.connectionDetails.onConnectionRejectFunction == "function" && a.DiffusionClient.connectionDetails.onConnectionRejectFunction()
  };
  a.DiffusionClientTransport.prototype.close = function () {
    this.isClosing = true;
    this.transport.close()
  };
  a.DiffusionClientTransport.prototype.send = function (c, b) {
    a.DiffusionClient.trace("Sending ..." + b);
    this.transport.send(c, b)
  };
  a.DiffusionClientTransport.prototype.subscribe = function (b) {
    a.DiffusionClient.trace("Subscribe ... " + b);
    this.transport.subscribe(b)
  };
  a.DiffusionClientTransport.prototype.unsubscribe = function (b) {
    a.DiffusionClient.trace("Unsubscribe ... " + b);
    this.transport.unsubscribe(b)
  };
  a.DiffusionClientTransport.prototype.connected = function (a) {
    this._dc.trace("Client ID = " + a);
    this.isConnected = true;
    this.clientID = a;
    if (typeof this._cd.onCallbackFunction == "function")this._cd.onCallbackFunction(true)
  };
  a.DiffusionClientTransport.prototype.handleMessages = function (h) {
    if (h != "") {
      var f = h.split("\b");
      do {
        var d = f.shift(), i = d.charCodeAt(0);
        switch (i) {
          case 28:
            typeof this._cd.onAbortFunction == "function" && this._cd.onAbortFunction();
            this.isClosing = true;
            return;
          case 25:
            var g = d.split("\2")[0], j = g.substr(1, g.length - 2);
            this.transport.sendClientPingResponse(j);
            break;
          case 29:
            typeof this._cd.onLostConnectionFunction == "function" && this._cd.onLostConnectionFunction();
            this.isClosing = true;
            return;
          default:
            var b = new a.WebClientMessage(d, this.messageCount++);
            if (b.isAckMessage()) {
              var k = b.getUserHeaders().shift();
              this.transport.sendAckResponse(k)
            }
            var e = b.getTopic();
            if (b.isInitialTopicLoad()) {
              var c = e.split("!");
              if (c.length == 2) {
                this.aliasMap[c[1]] = c[0];
                b.setTopic(c[0])
              }
            }
            else e.charCodeAt(0) == 33 && b.setTopic(this.aliasMap[e.substr(1)]);
            this._cd.onDataFunction(b)
        }
      } while (f.length)
    }
  };
  a.DiffusionXHRTransport = function () {
    this.serverUrl = a.DiffusionClient.connectionDetails.XHRURL + a.DiffusionClient.connectionDetails.context + "/diffusion/";
    this.requests = [];
    this.isSending = false;
    this.requestListener = null;
    this.retryCount = 0;
    this.isNativeXmlHttp = false;
    this.seq = 0
  };
  a.DiffusionXHRTransport.prototype.send = function (c, b) {
    this.processRequest(this.createDiffusionRequest({method: "2", clientid: a.DiffusionClient.getClientID(), data: b, topic: c, s: this.seq++}))
  };
  a.DiffusionXHRTransport.prototype.XHRSubscription = function (c, b) {
    this.processRequest(this.createDiffusionRequest({method: b, clientid: a.DiffusionClient.getClientID(), topic: c, s: this.seq++}))
  };
  a.DiffusionXHRTransport.prototype.subscribe = function (a) {
    this.XHRSubscription(a, "22")
  };
  a.DiffusionXHRTransport.prototype.unsubscribe = function (a) {
    this.XHRSubscription(a, "23")
  };
  a.DiffusionXHRTransport.prototype.sendClientPingResponse = function (b) {
    this.processRequest(this.createDiffusionRequest({method: "25", clientid: a.DiffusionClient.getClientID(), uh: b}))
  };
  a.DiffusionXHRTransport.prototype.sendAckResponse = function (b) {
    this.processRequest(this.createDiffusionRequest({method: "32", clientid: a.DiffusionClient.getClientID(), uh: b}))
  };
  a.DiffusionXHRTransport.prototype.close = function () {
    this.pollRequest && this.pollRequest.abort();
    var b = this.createXHRTransport();
    b.open("POST", this.serverUrl, false);
    b.setRequestHeader("method", "29");
    b.setRequestHeader("clientid", a.DiffusionClient.getClientID());
    b.setRequestHeader("uid", a.DiffusionClient.connectionDetails.uid);
    try {
      b.send("")
    }
    catch (c) {
    }
  };
  a.DiffusionXHRTransport.prototype.poll = function () {
    if (a.DiffusionClient.diffusionTransport.isClosing)return;
    var c = this, b = this.createDiffusionRequest({method: "1", clientid: a.DiffusionClient.diffusionTransport.clientID});
    b.onreadystatechange = function () {
      if (b.readyState == 4)if (b.status == 0 || b.status == 12029) {
        if (a.DiffusionClient.diffusionTransport.isClosing != true)if (typeof a.DiffusionClient.connectionDetails.onLostConnectionFunction == "function") {
          a.DiffusionClient.connectionDetails.onLostConnectionFunction();
          a.DiffusionClient.diffusionTransport.isClosing = true
        }
      }
      else if (b.status == 200) {
        a.DiffusionClient.diffusionTransport.handleMessages(b.responseText);
        c.retryCount = 0;
        c.poll()
      }
    };
    this.pollRequest = b;
    b.send("")
  };
  a.DiffusionXHRTransport.prototype.connect = function () {
    if (a.DiffusionClient.connectionDetails.disableXHR == true) {
      a.DiffusionClient.diffusionTransport.cascade();
      return
    }
    if (this.detectXmlHttp() == false) {
      a.DiffusionClient.diffusionTransport.cascade();
      return
    }
    a.DiffusionClient.trace("XHRconnect");
    var d = this, c = {method: "0", type: "B", topic: a.DiffusionClient.connectionDetails.topic, transportTimeout: a.DiffusionClient.connectionDetails.transportTimeout}, b = this.createDiffusionRequest(c);
    b.onreadystatechange = function () {
      if (b.readyState == 4)if (b.status == 200) {
        var c = b.responseText.split("\2");
        if (c[0] == "100") {
          a.DiffusionClient.diffusionTransport.connected(c[1]);
          d.poll()
        }
        c[0] == "111" && a.DiffusionClient.diffusionTransport.connectionRejected()
      }
      else a.DiffusionClient.diffusionTransport.cascade()
    };
    b.send("")
  };
  a.DiffusionXHRTransport.prototype.createXHRTransport = function () {
    return this.isNativeXmlHttp
      ? new XMLHttpRequest
      : new ActiveXObject(this.activeXName)
  };
  a.DiffusionXHRTransport.prototype.processRequest = function (c) {
    c != null && this.requests.push(c);
    if (this.isSending)return;
    if (!this.requests.length)return;
    var b = this.requests.shift(), d = this;
    b.onreadystatechange = function () {
      try {
        if (b.readyState == 4) {
          if (b.status == 0) {
            a.DiffusionClient.trace("checkRequest - lost connection");
            if (typeof a.DiffusionClient.connectionDetails.onLostConnectionFunction == "function") {
              a.DiffusionClient.connectionDetails.onLostConnectionFunction();
              a.DiffusionClient.diffusionTransport.isClosing = true
            }
          }
          d.isSending = false;
          setTimeout(function () {
            d.processRequest(null)
          }, 0)
        }
      }
      catch (c) {
        a.DiffusionClient.trace("error: processRequest " + c)
      }
    };
    this.isSending = true;
    b.send("")
  };
  a.DiffusionXHRTransport.prototype.createDiffusionRequest = function (b) {
    var c = this.createXHRTransport();
    c.open("POST", this.serverUrl, true);
    b.uid = a.DiffusionClient.connectionDetails.uid;
    for (var d in b)try {
      c.setRequestHeader(d, b[d])
    }
    catch (e) {
      a.DiffusionClient.trace("Can't set header " + d)
    }
    return c
  };
  a.DiffusionXHRTransport.prototype.detectXmlHttp = function () {
    var b = null;
    try {
      b = new XMLHttpRequest;
      a.DiffusionClient.trace("detectXmlHttp: got native");
      if (b != null) {
        this.isNativeXmlHttp = true;
        return true
      }
    }
    catch (e) {
    }
    if (a.DiffusionClient.isIE)for (var d = ["MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < d.length; ++c) {
      try {
        b = new ActiveXObject(d[c])
      }
      catch (e) {
      }
      if (b != null) {
        this.activeXName = d[c];
        a.DiffusionClient.trace("XHR Chosen " + this.activeXName);
        return true
      }
    }
    return false
  };
  a.DiffusionClientConnectionDetails = function () {
    this.debug = false;
    this.libPath = "/lib/DIFFUSION";
    this.context = "";
    this.XHRURL = location.protocol + "//" + location.host;
    this.XHRretryCount = 3;
    this.timeoutMS = 4e3;
    this.transportTimeout = 30;
    this.disableXHR = false;
    this.topic = null;
    this.onDataFunction = null;
    this.onBeforeUnloadFunction = null;
    this.onCallbackFunction = null;
    this.onInvalidClientFunction = null;
    this.onCascadeFunction = null;
    this.onAbortFunction = null;
    this.onLostConnectionFunction = null;
    this.onConnectionRejectFunction = null
  };
  a.WebClientMessage = function (a, c) {
    this.messageCount = c;
    this.messageType = a.charCodeAt(0);
    this.timeStamp = new Date;
    this.rows = a.split("\1");
    this.headers = this.rows[0].split("\2");
    var b = this.headers.shift();
    this.topic = b.substr(1, b.length);
    this.rowLength = this.rows.length - 1;
    this.payload = a
  };
  a.WebClientMessage.prototype.getHeader = function () {
    return this.rows[0]
  };
  a.WebClientMessage.prototype.getBody = function () {
    return this.payload.substr(this.getHeader().length + 1)
  };
  a.WebClientMessage.prototype.isInitialTopicLoad = function () {
    return this.messageType == 20 || this.messageType == 30
  };
  a.WebClientMessage.prototype.isDeltaMessage = function () {
    return this.messageType == 21 || this.messageType == 31
  };
  a.WebClientMessage.prototype.getTopic = function () {
    return this.topic
  };
  a.WebClientMessage.prototype.setTopic = function (a) {
    this.topic = a
  };
  a.WebClientMessage.prototype.getNumberOfRecords = function () {
    return this.rowLength
  };
  a.WebClientMessage.prototype.getFields = function (a) {
    return this.rows[a + 1].split("\2")
  };
  a.WebClientMessage.prototype.getUserHeaders = function () {
    return this.headers
  };
  a.WebClientMessage.prototype.isAckMessage = function () {
    return this.messageType == 30 || this.messageType == 31
  }
})(window.bet365.pushStatus.diffusion = window.bet365.pushStatus.diffusion || {});
(function (b) {
  var r, p, q, f = 0, e, h = 0, j = 0, s = 5, a, l, u = 1e3, d = 500, n = "", k = [], m, o;
  this.pushStatusHandler = null;
  if (typeof window.bet365.pushStatus.longPollStatus.LongPollStatusHandler !== "undefined") {
    this.pushStatusHandler = new window.bet365.pushStatus.longPollStatus.LongPollStatusHandler;
    this.classification = 0
  }
  function g(a, b) {
    try {
      pushStatusHandler && pushStatusHandler.log(a, 0, b, "", true)
    }
    catch (c) {
    }
  }

  function t(a) {
    e = false;
    if (a) {
      g(window.bet365.pushStatus.longPollStatus.pushConnectionStatusEnum.CONNECTED, c());
      m();
      f = 0;
      j = 0
    }
    else {
      o(f + 1);
      j++;
      if (j < s) {
        g(window.bet365.pushStatus.longPollStatus.pushConnectionStatusEnum.FIRSTATTEMPTFAILED, c());
        h = !h;
        v()
      }
      else g(window.bet365.pushStatus.longPollStatus.pushConnectionStatusEnum.ALLRETRYSFAILED, c())
    }
  }

  function i() {
  }

  function w() {
  }

  function v() {
    if (!e) {
      var b = f == 0
        ? d
        : u;
      b += Math.random() * 1e3 >> 0;
      if (b < d)b = d + 100;
      a = setTimeout(function () {
        x()
      }, b)
    }
  }

  function x() {
    f++;
    if (a) {
      clearTimeout(a);
      a = null
    }
    var b = (new Date).getTime() - l;
    if (typeof window.bet365.pushStatus !== "undefined" && !window.bet365.pushStatus.diffusion.DiffusionClient.isConnected && !e && b > d) {
      window.bet365.pushStatus.diffusionConnection.connect();
      return true
    }
    else return false
  }

  function c() {
    return h
      ? p
      : r
  }

  b.intialise = function (a, b, f, c, d, e) {
    if (a.indexOf("http://") == -1 && a.indexOf("https://") == -1)a = "http://" + a;
    if (b.indexOf("http://") == -1 && b.indexOf("https://") == -1)b = "https://" + a;
    r = a;
    p = b;
    q = f;
    n = typeof c != "undefined"
      ? c
      : "diffusion";
    o = e;
    m = d
  };
  b.connect = function () {
    g(window.bet365.pushStatus.longPollStatus.pushConnectionStatusEnum.ATTEMPTINGCONNECTION, c());
    e = true;
    l = (new Date).getTime();
    var a = {topic: n, onDataFunction: w, onLostConnectionFunction: i, onConnectionRejectFunction: i, onCallbackFunction: t, onAbortFunction: i, uid: q, XHRURL: c(), debug: true};
    window.bet365.pushStatus.diffusion.DiffusionClient.connect(a)
  };
  b.disconnect = function () {
    window.bet365.pushStatus.diffusion.DiffusionClient.close()
  };
  b.dispose = function () {
    if (a != null) {
      clearTimeout(a);
      a = null
    }
    window.bet365.pushStatus.diffusion.DiffusionClient.close()
  };
  b.subscribe = function (a) {
    if (window.bet365.pushStatus.diffusion.DiffusionClient.diffusionTransport &&
      window.bet365.pushStatus.diffusion.DiffusionClient.diffusionTransport.isConnected)window.bet365.pushStatus.diffusion.DiffusionClient.subscribe(a);
    else k[k.length] = a
  };
  b.unsubscribe = function (a) {
    window.bet365.pushStatus.diffusion.DiffusionClient.diffusionTransport &&
      window.bet365.pushStatus.diffusion.DiffusionClient.diffusionTransport.isConnected && window.bet365.pushStatus.diffusion.DiffusionClient.unsubscribe(a)
  }
})(window.bet365.pushStatus.diffusionConnection = window.bet365.pushStatus.diffusionConnection || {})