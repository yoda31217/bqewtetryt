Type.registerNamespace("b365.Ui.Helpers");
b365.Ui.Helpers.BalanceUpdater = function (a) {
  this._elementId = a
    ? a
    : ".betslipWrapper > ul:first-child"
};
b365.Ui.Helpers.BalanceUpdater.prototype = {update: function () {
  var a = this;
  typeof $(a._elementId).attr("data-ub") !== "undefined" && $("#MyAccountPanel .Total span:first-child").text($(a._elementId).attr("data-ub"));
  window.location.host.split(".").pop() == "it" && mf.reqInstance(37)
}};
Type.registerNamespace("b365.Ui.Helpers");
b365.Ui.Helpers.UserAuthentication = function () {
};
b365.Ui.Helpers.UserAuthentication.prototype = {isAuthenticated: function () {
  return $("#MyAccountPanel").length == 0
    ? false
    : true
}, showLoginPopup: function () {
  $("#sbMCN").trigger("showloginprompt")
}};
Type.registerNamespace("b365.Ui.Tapi");
b365.Ui.Tapi.JoinNowLauncher = function () {
};
b365.Ui.Tapi.JoinNowLauncher.prototype = {launch: function () {
  var a = "/lite/titleapi/tapi.aspx?mem=5&prdid=1";
  window.open(a, "_self")
}};
(function () {
  Type.registerNamespace("b365.Ui.Betslip");
  b365.Ui.Betslip.ItemComparer = function (a) {
    this._bsInst = a;
    this._isValid = function () {
      return typeof this._bsInst !== "undefined"
    }
  };
  b365.Ui.Betslip.ItemComparer.prototype = {compare: function (a, b) {
    var d = false;
    if (this._isValid()) {
      var c = typeof a.getCnItem("pid") !== "undefined"
        ? "pid"
        : "fp";
      d = a.getCnItem(c) === b.getCnItem(c) && a.getCnItem("f") === b.getCnItem("f") && a.getCnItem("Inc") === b.getCnItem("Inc") &&
        a.getCnItem("mid") === b.getCnItem("mid")
    }
    return d
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Helpers");
  b365.Ui.Helpers.ShowDialogHandler = function (a) {
    this._controller = a.Controller;
    this._markUp = a.MarkUp;
    this._containerId = "#bsDlg";
    this._bsDlg = $(this._containerId);
    this._showDialog = function () {
      var a = this;
      $(a._bsDlg).html(a._markUp);
      var b = new b365.Ui.PUpDialog(null, a._bsDlg[0], true);
      b.showDialog();
      a._controller.setDialog(b)
    }
  };
  b365.Ui.Helpers.ShowDialogHandler.prototype = {handle: function () {
    var a = this;
    a._showDialog()
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Helpers");
  b365.Ui.Helpers.ShowConfirmationHandler = function (a) {
    this._controller = a.Controller;
    this._title = a.Title;
    this._message = a.Msg;
    this._button1Text = a.Button1Text;
    this._button1Action = a.Button1Action;
    this._button2Text = a.Button2Text;
    this._Button2Action = a.Button2Action;
    this._containerId = "#bsCD";
    this._titleId = ".bsDlgHdr";
    this._messageId = "#bsDBdy";
    this._bsCnf = $(this._containerId);
    this._button1Id = "#bsCnfrm";
    this._button2Id = "#bsCan";
    this._showDialog = function () {
      var a = this;
      $(a._titleId, a._bsCnf).html(a._title);
      $(a._messageId, a._bsCnf).html(a._message);
      a._setButtonContext(a._button1Id, a._button1Text, a._button1Action);
      a._setButtonContext(a._button2Id, a._button2Text, a._button2Action);
      var b = new b365.Ui.PUpDialog(null, a._bsCnf[0], true);
      b.showDialog();
      a._controller.setDialog(b)
    };
    this._setButtonContext = function (e, b, d) {
      var c = this, a = $(e, c._bsCnf);
      if (b !== null) {
        a.text(b);
        a.attr("data-action", d)
      }
    }
  };
  b365.Ui.Helpers.ShowConfirmationHandler.prototype = {handle: function () {
    var a = this;
    a._showDialog()
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Helpers");
  b365.Ui.Helpers.ShowTooltipHandler = function () {
    this.showTooltip = function (b) {
      var e = b.Target, j = b.Content, a = b.Width && $.isNumeric(b.Width)
        ? b.Width
        : 300, f = b.Offset && $.isNumeric(b.Offset)
        ? b.Offset
        : 24, d = $("#ttDivPersist");
      d.removeClass("ttHidden");
      this.clearPopUpShowingClass();
      $(e).addClass("showingpupelem");
      if (!$.isNumeric(a))a = parseInt(a.replace(/px/g, "").replace(/;/g, ""));
      $(d).find(".cnt").html(j).css("max-width", a).css("width", a);
      var g = $(e).offset();
      f = Number(String(f).replace(/px/g, ""));
      var h = $(e).outerHeight(true);
      if (h)f = h;
      var k = g.top + f, c = g.left + $(e).outerWidth(true) / 2 - a / 2 - $(e).css("margin-left").replace(/px/g, "");
      if (c + a > window.innerWidth) {
        var i = c + a + 22 - window.innerWidth;
        c = c - i;
        $("div.callOut").addClass("noLeftMargin");
        $("div.callOut").css("left", a / 2 - (window.innerWidth - g.left) / 2);
        d.css("width", "auto")
      }
      else if (c < 0) {
        $("div.callOut").css("left", $(e).offset().left + 30);
        c = 0;
        d.css("width", "auto")
      }
      else d.css("max-width", a).css("width", a);
      d.css("top", k).css("left", c);
      d.fadeIn();
      (new b365.Ui.AutoRefreshController).pauseRF();
      $(document).off("touchstart.popupcontroller").on("touchstart.popupcontroller", $.proxy(this.HideToolTip, this));
      $("input").off("touchstart.popupcontroller").on("touchstart.popupcontroller", $.proxy(this.HideToolTip, this))
    };
    this.hideToolTip = function () {
      $(document).off("touchstart.popupcontroller");
      $("input").off("touchstart.popupcontroller");
      this._clickEle = null;
      $("#ttDivPersist").removeClass("no-ar");
      this.clearPopUpShowingClass();
      $("#ttDivPersist").addClass("ttHidden").hide();
      $("div.callOut").removeClass("noLeftMargin");
      $("div.callOut").removeAttr("style")
    };
    this.handle = function (a) {
      this.showTooltip(a)
    };
    this.clearPopUpShowingClass = function () {
      $(".showingpupelem").removeClass("showingpupelem")
    }
  }
})();
(function () {
  Type.registerNamespace("b365.Ui");
  b365.Ui.DepositInitiator = function (a, b) {
    this._allowQuickDeposit = a;
    this._totalStake = b;
    this._depositOpertionId = 36;
    this._initiate = function () {
      this._allowQuickDeposit == 1 && lgh.setMessageFlag($(lgh._QD_CTL), "0");
      mf.req(this._depositOpertionId, this._allowQuickDeposit, this._totalStake)
    }
  };
  b365.Ui.DepositInitiator.prototype = {initiate: function () {
    this._initiate()
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Coupon");
  b365.Ui.Coupon.BetSlipSyncronizerEventAttacher = function (a) {
    this._bsInst = a
  };
  b365.Ui.Coupon.BetSlipSyncronizerEventAttacher.prototype = {attachHandlers: function () {
    var a = this, b = $(".betslipWrapper");
    b.off("b365.Ui.Betslip.failedtoaddbet").on("b365.Ui.Betslip.failedtoaddbet", function (c, b) {
      (new b365.Ui.Coupon.BetSlipSyncronizerDeletingHandler(a._bsInst)).handle(b)
    });
    b.off("b365.Ui.Betslip.deleting").on("b365.Ui.Betslip.deleting", function (c, b) {
      (new b365.Ui.Coupon.BetSlipSyncronizerDeletingHandler(a._bsInst)).handle(b)
    });
    b.off("b365.Ui.Betslip.removingall").on("b365.Ui.Betslip.removingall", function () {
      (new b365.Ui.Coupon.BetSlipSyncronizerRemovingAllHandler(a._bsInst)).handle()
    });
    b.off("b365.Ui.Betslip.acceptingchanges").on("b365.Ui.Betslip.acceptingchanges", function () {
      (new b365.Ui.Coupon.BetSlipSyncronizerParseBetsHandler(a._bsInst)).handle(true)
    });
    $(window).off("b365.Ui.Coupon.couponcontentloaded").on("b365.Ui.Coupon.couponcontentloaded", function () {
      (new b365.Ui.Coupon.BetSlipSyncronizerParseBetsHandler(a._bsInst)).handle()
    })
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Coupon");
  b365.Ui.Coupon.BetSlipSyncronizerDeletingHandler = function (a) {
    this._bsInst = a;
    this._isValid = function () {
      return typeof this._bsInst !== "undefined"
    }
  };
  b365.Ui.Coupon.BetSlipSyncronizerDeletingHandler.prototype = {handle: function (d) {
    if (this._isValid()) {
      var b = this, a = new b365.Ui.BetDTO(b._bsInst.betTypeNormal), c = new b365.Ui.Betslip.ItemComparer(b._bsInst);
      $("#cpn a[class*='btn-odds'], .mainOdds a[class*='btn-odds']").each(function (e, b) {
        a.parse(b.id);
        c.compare(d, a) && $(b).closest(".selected").removeClass("selected")
      })
    }
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Coupon");
  b365.Ui.Coupon.BetSlipSyncronizerRemovingAllHandler = function (a) {
    this._bsInst = a;
    this._isValid = function () {
      return typeof this._bsInst !== "undefined"
    }
  };
  b365.Ui.Coupon.BetSlipSyncronizerRemovingAllHandler.prototype = {handle: function () {
    this._isValid() && $("#cpn tr,  #cpn td, a[class*='btn-odds']").closest(".selected").removeClass("selected")
  }}
})();
(function () {
  Type.registerNamespace("b365.Ui.Coupon");
  b365.Ui.Coupon.BetSlipSyncronizerParseBetsHandler = function (a) {
    this._bsInst = a;
    this._isValid = function () {
      return typeof this._bsInst !== "undefined"
    }
  };
  b365.Ui.Coupon.BetSlipSyncronizerParseBetsHandler.prototype = {handle: function (e) {
    if (this._isValid()) {
      var a = this, b = "#sbMCN .ti", d = a._bsInst.getBetItems(a._bsInst.betTypeNormal);
      if (d.length === 0)$(b).removeClass("selected");
      else {
        var c = new b365.Ui.BetDTO(a._bsInst.betTypeNormal), f = new b365.Ui.Betslip.ItemComparer(a._bsInst);
        $("#cpn a[class*='btn-odds'], .mainOdds a[class*='btn-odds']").each(function (h, a) {
          var g = false;
          c.parse(a.id);
          $.map(d, function (a) {
            if (f.compare(a, c))g = true
          });
          if (g)$(a).closest(b).addClass("selected");
          else e && $(a).closest(b).removeClass("selected")
        })
      }
    }
  }}
})();
Type.registerNamespace("b365.Ui.Betslip");
BetslipFooterLinksProvider = function () {
  this._footerLinks = [];
  this._buttonCssClass = "removeAll abetslipRecBtn"
};
BetslipFooterLinksProvider.prototype = {provide: function () {
  this._footerLinks.push(this.getContinueLink());
  return this._footerLinks
}, getContinueLink: function () {
  return{text: betSlipML.cont, cssClass: this._buttonCssClass, handler: null}
}}