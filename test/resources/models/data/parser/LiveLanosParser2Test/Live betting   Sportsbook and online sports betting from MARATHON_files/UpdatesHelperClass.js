UpdatesHelper = function () {
  this.Init = function () {
  };
  this.swapSelection = function (d, a) {
    var c = document.getElementById(d);
    var b = c.checked;
    this.checkMembers(a, b);
  };
  this.checkMembers = function (a, b) {
    for (idx in a) {
      document.getElementById("" + a[idx]).checked = b;
    }
  };
  this.checkUpdates = function () {
    var b = this._getUpdatesURL();
    var a = this;
    $.ajax({url: b, dataType: "json", timeout: UpdatesHelper.UPDATE_REQUEST_TIMEOUT, success: function (c) {
      a.applyUpdates(c);
    }, error: function (d) {
      if (d.status == 503) {
        handle503Error();
        return;
      }
      try {
        a.errorResult(d.status);
      }
      catch (c) {
        a.errorResult(500);
      }
    }});
  };
  this.errorResult = function (a) {
    this._setNextUpdateTimeout();
  };
  this.applyUpdates = function (a) {
    this._setNextUpdateTimeout();
  };
  this._setNextUpdateTimeout = function () {
    if ((this._getUpdatesInterval() > 0) && UpdatesHelper.TIMER_FUNC) {
      window.setTimeout(UpdatesHelper.TIMER_FUNC, this._getUpdatesInterval());
    }
  };
  this._getUpdatesInterval = function () {
    return initData.update_interval;
  };
  this._getUpdatesURL = function () {
    return"";
  };
  this.updateLiveBetsButton = function (b) {
    if ((typeof b != "undefined") && (b != null)) {
      var a = $("#liveBetsButton").text();
      $("#liveBetsButton").text(a.substr(0, a.indexOf("(")) + "(" + b + ")");
    }
  };
};
UpdatesHelper.TIMER_FUNC = "getUpdatesHelper().checkUpdates();";
UpdatesHelper.UPDATE_REQUEST_TIMEOUT = 3 * 60 * 1000;
UpdatesHelper._instance = null;
getUpdatesHelper = function () {
  if (!UpdatesHelper._instance) {
    UpdatesHelper._instance = new UpdatesHelper();
  }
  return UpdatesHelper._instance;
};