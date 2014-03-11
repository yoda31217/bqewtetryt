function MatchLiveModelBase() {
  ns_gen5_events.EventDispatcher.call(this);
  this.animId = "";
  this.languageId = 1
}
var mlProto = MatchLiveModelBase.prototype = new ns_gen5_events.EventDispatcher;
mlProto.setMatchLiveAvailable = function (a) {
  this.matchLiveAvailable = parseInt(a) > 0;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.ML_AVAILABLE_EVENT, {available: a == "1"}))
};
mlProto.setSetScores = function (a) {
  this.matchSetScores = a;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.SET_SCORE, {matchSetScore: a}))
};
mlProto.setStatName = function (a, b) {
  this["stat" + a + "Name"] = b;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.STAT_NAME_EVENT, {statNum: a, name: b}));
  this.setStatsAvailable(this.stat1Name != "" || this.stat2Name != "" || this.stat3Name != "" || this.stat4Name != "")
};
mlProto.setStatsAvailable = function (a) {
  this.statsAvailable = a;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.STATS_AVAILABLE_EVENT, {available: a}))
};
mlProto.setScoreColumnHeader = function (b, c) {
  var a = "scoreColHeader" + b;
  if (typeof this[a] != "undefined")this[a] = c
};
mlProto.setStat = function (b, a, c) {
  this["team" + b + "Stat" + a] = c;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.STAT_EVENT, {team: "team" + b, stat: a, value: c}))
};
mlProto.setScore = function (a, b) {
  this["team" + a + "Score"] = b;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.SCORE, {team: "team" + a, value: b}))
};
mlProto.setGamePoint = function (a, b) {
  this["team" + a + "Point"] = b;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.POINT, {team: "team" + a, value: b}))
};
mlProto.setPlayIndicator = function (a, b) {
  this["team" + a + "PlayIndicator"] = b;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.PLAY_INDICATOR, {team: "team" + a, value: b}))
};
mlProto.setAnimationId = function (a) {
  this.animId = a
};
mlProto.setPeriod = function (a) {
  this.period = a;
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.PERIOD, {period: a}))
};
mlProto.dispatchModelLoaded = function () {
  this.dispatchEvent(new MatchLiveEvent(MatchLiveEvent.MODEL_LOADED));
  this.setAnimationId(this.animId)
};
mlProto.setExtraData = function () {
};
mlProto.setAdditionalData = function () {
};
mlProto.setExtraStat = function () {
};
mlProto.getTeamName = function (a) {
  return a == "team1"
    ? this.team1Name
    : this.team2Name
};
mlProto.mlJson = {};
mlProto.langAjaxXmlReq = null;
mlProto.setMatchLiveML = function (a, b) {
  this.languageId = a;
  var c = this;
  langAjaxXmlReq = $.ajax({url: "matchlive/sports/" + b + "/lng/" + a +
    ".json", type: "GET", contentType: "application/json; charset=utf-8", success: function () {
    if (langAjaxXmlReq.readyState == 4 && langAjaxXmlReq.status == 200)c.mlJson = JSON.parse(langAjaxXmlReq.responseText)
  }})
};
mlProto.getMatchLiveMLValue = function (a) {
  return this.mlJson[a]
};
mlProto.getTeamKitImagePath = function (a, b) {
  return"/teamkit/imgs/classifications/" + a + "/KIT-" + b + ".svg"
};
mlProto.dispose = function () {
  langAjaxXmlReq && langAjaxXmlReq.abort()
};
mlProto.matchLiveAvailable = false;
mlProto.statsAvailable = false;
mlProto.stat1Name = "";
mlProto.stat2Name = "";
mlProto.stat3Name = "";
mlProto.stat4Name = "";
mlProto.stat5Name = "";
mlProto.stat6Name = "";
mlProto.team1Name = "";
mlProto.team2Name = "";
mlProto.team1KitColour = "";
mlProto.team2KitColour = "";
mlProto.team1KitImagePath = "";
mlProto.team2KitImagePath = "";
mlProto.team1Colour = "";
mlProto.team2Colour = "";
mlProto.team1Stat1 = 0;
mlProto.team2Stat1 = 0;
mlProto.team1Stat2 = 0;
mlProto.team2Stat2 = 0;
mlProto.team1Stat3 = 0;
mlProto.team2Stat3 = 0;
mlProto.team1Stat4 = 0;
mlProto.team2Stat4 = 0;
mlProto.team1Stat5 = 0;
mlProto.team2Stat5 = 0;
mlProto.team1Score = 0;
mlProto.team2Score = 0;
mlProto.team1PlayIndicator = "";
mlProto.team2PlayIndicator = "";
mlProto.period = 0;
mlProto.matchSetScores = "";
mlProto.team1Point = "";
mlProto.team2Point = "";
mlProto.scoreColHeader1 = "";
mlProto.scoreColHeader2 = "";
mlProto.scoreColHeader3 = "";
mlProto.scoreColHeader4 = "";
mlProto.scoreColHeader5 = "";
mlProto.scoreColHeader6 = "";
mlProto.scoreColHeader7 = "";
mlProto.scoreColHeader8 = "";
mlProto.scoreColHeader9 = "";
mlProto = null;
function MatchLiveEvent(b, a) {
  ns_gen5_events.Event365.call(this, b);
  this.data = a
}
MatchLiveEvent.prototype = new ns_gen5_events.Event365;
MatchLiveEvent.ML_AVAILABLE_EVENT = "mlAvailable";
MatchLiveEvent.STATS_AVAILABLE_EVENT = "statsAvailableEvent";
MatchLiveEvent.STAT_NAME_EVENT = "statNameEvent";
MatchLiveEvent.STAT_EVENT = "statEvent";
MatchLiveEvent.EXTRA_STAT_EVENT = "extraStatEvent";
MatchLiveEvent.PERIOD = "periodEvent";
MatchLiveEvent.SCORE = "scoreEvent";
MatchLiveEvent.SET_SCORE = "setScoreEvent";
MatchLiveEvent.MODEL_LOADED = "modelLoaded";
MatchLiveEvent.POINT = "playerpointEvent";
MatchLiveEvent.PLAY_INDICATOR = "playIndicatorEvent";
MatchLiveDataProcessor = function () {
  var b = ns_gen5_data.StemEvent, c = ns_gen5_util.Delegate, a = ns_gen5_data.Attribute, e = ns_gen5_data.SubscriptionManagerEvent;

  function d(d, f, b, a) {
    this.classification = b;
    this.model = d;
    this.fixtureTopic = a;
    this.team1Topic = "";
    this.team2Topic = "";
    this.extraStatsTopics = [];
    this.fixtureStem = null;
    this.delegate_onEventSnapshotHandler = new c(this, this.onEventSnapshotHandler);
    this.delegate_stemUpdateHandler = new c(this, this.stemUpdateHandler);
    this.delegate_stemDeleteHandler = new c(this, this.stemDeleteHandler);
    this.delegate_teamGroupUpdateHandler = new c(this, this.teamGroupUpdateHandler);
    this.delegate_teamStemUpdateHandler = new c(this, this.teamStemUpdateHandler);
    this.delegate_additionalScoresStemDeleteHandler = new c(this, this.additionalScoresStemDeleteHandler);
    this.delegate_scoreColumnStemUpdateHandler = new c(this, this.scoreColumnStemUpdateHandler);
    this.delegate_scoreColumnStemDeleteHandler = new c(this, this.scoreColumnStemDeleteHandler);
    this.delegate_scoreCellsStemUpdateHandler = new c(this, this.scoreCellsStemUpdateHandler);
    this.delegate_scoreCellsStemDeleteHandler = new c(this, this.scoreCellsStemDeleteHandler);
    this._delegate_connectionFailureHandler = new c(this, this._connectionFailedHandler);
    Locator.subscriptionManager.addEventListener(e.CONNECTION_FAILED, this._delegate_connectionFailureHandler);
    Locator.subscriptionManager.subscribe(this.fixtureTopic, this.delegate_onEventSnapshotHandler, true, true, null, false)
  }

  d.prototype = {additionalScoresStemDeleteHandler: function (i) {
    var g = i.target, d, f, a, c;
    g.removeEventListener(b.DELETE, this.delegate_additionalScoresStemDeleteHandler);
    d = g.getChildren();
    for (a = 0; a < d.length; a++) {
      var e = d[a];
      e.removeEventListener(b.UPDATE, this.delegate_scoreColumnStemUpdateHandler);
      e.removeEventListener(b.DELETE, this.delegate_scoreColumnStemDeleteHandler);
      f = e.getChildren();
      for (c = 0; c < f.length; c++) {
        var h = f[c];
        h.removeEventListener(b.UPDATE, this.delegate_scoreCellsStemUpdateHandler);
        h.removeEventListener(b.DELETE, this.delegate_scoreCellsStemDeleteHandler)
      }
    }
  }, scoreColumnStemUpdateHandler: function (c) {
    var b = c.target.data, d = b[a.ID];
    b[a.NAME] && b[a.NAME] != "" && this.model.setScoreColumnHeader(d, b[a.NAME])
  }, scoreColumnStemDeleteHandler: function (a) {
    a.target.removeEventListener(b.UPDATE, this.delegate_scoreColumnStemUpdateHandler);
    a.target.removeEventListener(b.DELETE, this.delegate_scoreColumnStemDeleteHandler)
  }, scoreCellsStemUpdateHandler: function (b) {
    var c = b.target.data, e = this.fixtureTopic + "/" +
      b.target.parent.parent.data[a.TOPIC_ID], f = b.target.parent.data[a.ID], d = b.target.parent.data[a.TOPIC_ID];
    this.processExtraStatCell(c, (parseInt(c[a.ID]) + 1).toString(), f, true, e + "/" + d)
  }, scoreCellsStemDeleteHandler: function (a) {
    a.target.removeEventListener(b.UPDATE, this.delegate_scoreCellsStemUpdateHandler);
    a.target.removeEventListener(b.DELETE, this.delegate_scoreCellsStemDeleteHandler)
  }, teamGroupUpdateHandler: function (a) {
    this.processTeamGroupData(a.target.data)
  }, teamStemUpdateHandler: function (b) {
    this.processTeamData(b.target.data, b.target.data[a.ID])
  }, stemUpdateHandler: function (a) {
    this.processEventData(a.target.data)
  }, stemDeleteHandler: function (g) {
    var d, e, f, c = g.target;
    if (c.nodeName == a.EVENT) {
      c.removeEventListener(b.UPDATE, this.delegate_stemUpdateHandler);
      c.removeEventListener(b.DELETE, this.delegate_stemDeleteHandler);
      if (c.teamGroups && c.teamGroups.length > 0) {
        e = c.teamGroups[0];
        e.removeEventListener(b.UPDATE, this.delegate_teamGroupUpdateHandler);
        f = e.getChildren();
        for (d = 0; d < f.length; d++)f[d].removeEventListener(b.UPDATE, this.delegate_teamStemUpdateHandler)
      }
    }
  }, onEventSnapshotHandler: function (a) {
    this.fixtureStem = Locator.treeLookup.getReference(a.type);
    $log("MatchLiveDataProcessor - fixture stem " + (this.fixtureStem
      ? "available"
      : "NOT available!!!"));
    if (this.fixtureStem) {
      this.fixtureStem.addEventListener(b.UPDATE, this.delegate_stemUpdateHandler);
      this.fixtureStem.addEventListener(b.DELETE, this.delegate_stemDeleteHandler);
      this.processInitialData(this.fixtureStem);
      this.model.dispatchModelLoaded()
    }
  }, processInitialData: function (d) {
    var t, p, o, n, m, c, j, g = this;
    if (d.nodeName == a.EVENT) {
      g.processEventData(d.data);
      if (d.teamGroups && d.teamGroups.length > 0) {
        var i = d.teamGroups[0];
        p = i.data[a.TOPIC_ID];
        g.processTeamGroupData(i.data);
        i.addEventListener(b.UPDATE, this.delegate_teamGroupUpdateHandler);
        var e = i.getChildren();
        for (c = 0; c < e.length; c++) {
          t = this.fixtureTopic + "/" + p + "/" + e[c].data[a.TOPIC_ID];
          g["team" + e[c].data[a.ID] + "Topic"] = t;
          g.processTeamData(e[c].data, e[c].data[a.ID]);
          e[c].addEventListener(b.UPDATE, this.delegate_teamStemUpdateHandler)
        }
      }
      if (d.additionalScores && d.additionalScores.length > 0) {
        var k = d.additionalScores[0];
        o = g.fixtureTopic + "/" + k.data[a.TOPIC_ID];
        k.addEventListener(b.DELETE, this.delegate_additionalScoresStemDeleteHandler);
        var r = k.getChildren();
        for (c = 0; c < r.length; c++) {
          var h = r[c];
          h.addEventListener(b.UPDATE, this.delegate_scoreColumnStemUpdateHandler);
          h.addEventListener(b.DELETE, this.delegate_scoreColumnStemDeleteHandler);
          var f = h.data;
          m = f[a.ID];
          n = f[a.TOPIC_ID];
          f[a.NAME] && f[a.NAME] != "" && this.model.setScoreColumnHeader(m, f[a.NAME]);
          var s = h.getChildren();
          for (j = 0; j < s.length; j++) {
            var l = s[j], q = l.data;
            this.processExtraStatCell(q, (parseInt(q[a.ID]) + 1).toString(), m, true, o + "/" + n);
            l.addEventListener(b.UPDATE, this.delegate_scoreCellsStemUpdateHandler);
            l.addEventListener(b.DELETE, this.delegate_scoreCellsStemDeleteHandler)
          }
        }
      }
    }
  }, processEventData: function (b) {
    var c = "";
    b[a.MATCHLIVE_AVAILABLE] && b[a.MATCHLIVE_AVAILABLE] != "" && this.model.setMatchLiveAvailable(b[a.MATCHLIVE_AVAILABLE]);
    if (b[a.PENALTY_GOALS] && b[a.PENALTY_GOALS] != "")c = b[a.PENALTY_GOALS];
    c != "" && this.model.setPenaltyGoals(c);
    b[a.MATCHLIVE_ANIMATION] && b[a.MATCHLIVE_ANIMATION] != "" && this.model.setAnimationId(b[a.MATCHLIVE_ANIMATION], c);
    b[a.MATCHLIVE_PERIOD] && b[a.MATCHLIVE_PERIOD] != "" && this.model.setPeriod(b[a.MATCHLIVE_PERIOD]);
    b[a.SHORT_SCORE] && b[a.SHORT_SCORE] != "" && this.model.setSetScores(b[a.SHORT_SCORE]);
    b[a.MATCHLIVE_STATS_1] && this.model.setStatName("1", b[a.MATCHLIVE_STATS_1]);
    b[a.MATCHLIVE_STATS_2] && this.model.setStatName("2", b[a.MATCHLIVE_STATS_2]);
    b[a.MATCHLIVE_STATS_3] && this.model.setStatName("3", b[a.MATCHLIVE_STATS_3]);
    b[a.MATCHLIVE_STATS_4] && this.model.setStatName("4", b[a.MATCHLIVE_STATS_4]);
    b[a.MATCHLIVE_STATS_5] && this.model.setStatName("5", b[a.MATCHLIVE_STATS_5]);
    b[a.MATCHLIVE_STATS_6] && this.model.setStatName("6", b[a.MATCHLIVE_STATS_6]);
    b[a.MATCHLIVE_STATS_7] != undefined && this.model.setStatName("7", b[a.MATCHLIVE_STATS_7]);
    b[a.MATCHLIVE_STATS_8] && this.model.setStatName("8", b[a.MATCHLIVE_STATS_8]);
    b[a.EXTRA_DATA_1] && this.model.setExtraData("1", b[a.EXTRA_DATA_1]);
    b[a.EXTRA_DATA_2] && this.model.setExtraData("2", b[a.EXTRA_DATA_2])
  }, processTeamGroupData: function (b) {
    b[a.ADDITIONAL_DATA] && b[a.ADDITIONAL_DATA] != "" && this.model.setAdditionalData(b[a.ADDITIONAL_DATA])
  }, processTeamData: function (b, c) {
    b[a.MATCHLIVE_STATS_1] && b[a.MATCHLIVE_STATS_1] != "" && this.model.setStat(c, "1", b[a.MATCHLIVE_STATS_1]);
    b[a.MATCHLIVE_STATS_2] && b[a.MATCHLIVE_STATS_2] != "" && this.model.setStat(c, "2", b[a.MATCHLIVE_STATS_2]);
    b[a.MATCHLIVE_STATS_3] && b[a.MATCHLIVE_STATS_3] != "" && this.model.setStat(c, "3", b[a.MATCHLIVE_STATS_3]);
    b[a.MATCHLIVE_STATS_4] && b[a.MATCHLIVE_STATS_4] != "" && this.model.setStat(c, "4", b[a.MATCHLIVE_STATS_4]);
    b[a.MATCHLIVE_STATS_5] && b[a.MATCHLIVE_STATS_5] != "" && this.model.setStat(c, "5", b[a.MATCHLIVE_STATS_5]);
    b[a.MATCHLIVE_STATS_7] && b[a.MATCHLIVE_STATS_7] != "" && this.model.setStat(c, "7", b[a.MATCHLIVE_STATS_7]);
    b[a.MATCHLIVE_STATS_7] == "" && this.model.setStat(c, "7", "");
    b[a.MATCHLIVE_STATS_8] && b[a.MATCHLIVE_STATS_8] != "" && this.model.setStat(c, "8", b[a.MATCHLIVE_STATS_8]);
    b[a.MATCHLIVE_STATS_6] && b[a.MATCHLIVE_STATS_6] != "" && this.model.setStat(c, "6", b[a.MATCHLIVE_STATS_6]);
    b[a.SCORE] && b[a.SCORE] != "" && this.model.setScore(c, b[a.SCORE]);
    if (b[a.NAME] && b[a.NAME] != "")this.model["team" + c + "Name"] = b[a.NAME];
    if (b[a.TEAM_COLOR] && b[a.TEAM_COLOR].indexOf("#") == 0)this.model["team" + c + "Colour"] = b[a.TEAM_COLOR];
    if (b[a.KIT_ID] && b[a.KIT_ID] != "") {
      this.model["team" + c + "KitImagePath"] = this.model.getTeamKitImagePath(this.classification, b[a.KIT_ID]);
      if (b[a.KIT_COLORS] && b[a.KIT_COLORS].indexOf("#") == 0)this.model["team" + c + "KitColour"] = b[a.KIT_COLORS]
    }
    b[a.POINTS] && b[a.POINTS] != "" && this.model.setGamePoint(c, b[a.POINTS]);
    b[a.PLAYING_INDICATOR] && b[a.PLAYING_INDICATOR] != "" && this.model.setPlayIndicator(c, b[a.PLAYING_INDICATOR])
  }, processExtraStatCell: function (c, g, f, e, d) {
    var b;
    this.model.setExtraStat(f, g, c[a.DATA_1]);
    if (e) {
      b = d + "/" + c[a.TOPIC_ID];
      this.extraStatsTopics.push(b)
    }
  }, _connectionFailedHandler: function () {
    Locator.subscriptionManager.connect()
  }, dispose: function () {
    var c, d, a;
    Locator.subscriptionManager.unsubscribe(this.fixtureTopic, true, true, false);
    if (this.fixtureStem) {
      this.fixtureStem.removeEventListener(b.INSERT, this.delegate_stemInsertHandler);
      this.fixtureStem.removeEventListener(b.UPDATE, this.delegate_stemUpdateHandler);
      this.fixtureStem.removeEventListener(b.DELETE, this.delegate_stemDeleteHandler);
      if (this.fixtureStem.teamGroups && this.fixtureStem.teamGroups.length > 0) {
        c = this.fixtureStem.teamGroups[0];
        if (c) {
          c.removeEventListener(b.UPDATE, this.delegate_teamGroupUpdateHandler);
          d = c.getChildren();
          for (a = 0; a < d.length; a++)d[a] && d[a].removeEventListener(b.UPDATE, this.delegate_teamStemUpdateHandler)
        }
      }
      this.fixtureStem = null
    }
    if (this.model) {
      this.model.dispose();
      this.model = null
    }
  }};
  return d
}();
MatchLive = function (e, c, d) {
  var a = this, b = "matchlivedisposed.matchlive";
  this.useDummyData = false;
  this.dataProcessor = null;
  this.swipe = null;
  this.sportModel = null;
  this.arenaView = null;
  this.statsView = null;
  this.sportBase = null;
  this.languageId = e;
  this.matchLiveTopicId = d;
  this.classificationId = c;
  this.usesExternalPreviewCall = false;
  this.delegate_sportModelLoadedHandler = null;
  a.init = function () {
    $(document).off(b).on(b, $.proxy(a.onMatchLiveDisposing, this));
    a.matchLiveConnect()
  };
  a.onMatchLiveLoading = function () {
    a.initMatchLiveViews();
    a.hideHoldingContainer()
  };
  a.onMatchLiveDisposing = function () {
    a.showHoldingContainer()
  };
  a.showHoldingContainer = function () {
    var d = $("#mLiveCnt"), c = $("#holdingCnt"), f = $("#mlContainer"), e = $("#streamContainer"), g = $("#embdStrmIP"), h = $("#audioCnt"), a = 0, b;
    if (c.is(":not(:visible)")) {
      if (d.is(":visible"))if (f.hasClass("dartsMlContainer"))a = e.height();
      else a = d.children("#mlContainer").height();
      if (a > 0) {
        b = c.children("#holdingCntChild");
        b.css("height", a);
        b.children("#holdingCntSpin").css("height", a)
      }
      g.is(":not(:visible)") && h.is(":not(:visible)") && c.show();
      d.hide()
    }
  };
  a.hideHoldingContainer = function () {
    var b = $("#mLiveCnt"), a = $("#holdingCnt");
    b.show();
    a.hide()
  };
  a.matchLiveConnect = function () {
    if (Modernizr.supportsmatchlive) {
      MatchLiveGlobal.setClock();
      a.sportModel = a.initMatchLiveModel();
      MatchLiveGlobal.successfulConnections = 0;
      a.swipe = new PanelSwipe("c1", "mlContainer", MatchLiveGlobal.successfulConnections);
      a.delegate_sportModelLoadedHandler = new ns_gen5_util.Delegate(a, a.sportModelLoadedHandler);
      a.sportModel.addEventListener(MatchLiveEvent.MODEL_LOADED, a.delegate_sportModelLoadedHandler);
      a.sportModel.setMatchLiveML(a.languageId, a.classificationId);
      if (a.useDummyData)a.sportModel.dispatchModelLoaded();
      else a.dataProcessor = new MatchLiveDataProcessor(a.sportModel, a.languageId, a.classificationId, a.matchLiveTopicId)
    }
  };
  a.dispose = function () {
    if (a.dataProcessor) {
      a.dataProcessor.dispose();
      a.dataProcessor = null
    }
    if (a.arenaView) {
      a.arenaView.dispose();
      a.arenaView = null
    }
    if (a.statsView) {
      a.statsView.dispose();
      a.statsView = null
    }
    if (a.sportModel) {
      a.sportModel.removeEventListener(MatchLiveEvent.MODEL_LOADED, a.delegate_sportModelLoadedHandler);
      a.sportModel = null
    }
    if (a.swipe) {
      a.swipe.dispose();
      a.swipe = null
    }
    if (a.sportBase)a.sportBase = null;
    $(document).trigger("matchlivedisposed")
  };
  a.initMatchLiveModel = function () {
    switch (a.classificationId) {
      case SportClassification.SOCCER:
        return new MatchLiveSoccerModel;
      case SportClassification.TENNIS:
        return new MatchLiveTennisModel;
      case SportClassification.BASKETBALL:
        return new MatchLiveBasketballModel;
      case SportClassification.DARTS:
        return new MatchLiveDartsModel;
      case SportClassification.RUGBYUNION:
        return new MatchLiveRugbyUnionModel;
      case SportClassification.RUGBYLEAGUE:
        return new MatchLiveRugbyLeagueModel;
      case SportClassification.BASEBALL:
        return new MatchLiveBaseballModel;
      case SportClassification.CRICKET:
        return new MatchLiveCricketModel
    }
  };
  a.initMatchLiveViews = function () {
    switch (a.classificationId) {
      case SportClassification.SOCCER:
        a.sportBase = new SoccerBase;
        break;
      case SportClassification.TENNIS:
        a.sportBase = new TennisBase;
        break;
      case SportClassification.BASKETBALL:
        a.sportBase = new BasketballBase;
        break;
      case SportClassification.DARTS:
        a.sportBase = new DartsBase;
        break;
      case SportClassification.RUGBYUNION:
        a.sportBase = new RugbyUnionBase;
        break;
      case SportClassification.RUGBYLEAGUE:
        a.sportBase = new RugbyLeagueBase;
        break;
      case SportClassification.BASEBALL:
        a.sportBase = new BaseballBase;
        break;
      case SportClassification.CRICKET:
        a.sportBase = new CricketBase
    }
  };
  a.sportModelLoadedHandler = function () {
    if (a.sportModel.matchLiveAvailable || a.useDummyData) {
      $("#matchLive").attr("data-lng", a.languageId);
      $(document).trigger("matchlivepanelloaded");
      if (ipoc._liveController.isMatchLiveButtonEnabled()) {
        a.onMatchLiveLoading();
        !a.usesExternalPreviewCall && a.swipe && a.swipe.preview();
        MatchLiveGlobal.successfulConnections += 1
      }
    }
    else {
      a.dispose();
      a.matchLiveNotAvailable()
    }
  };
  a.sportModelDisconnected = function () {
    $("#holdingCnt").hide();
    $(document).trigger("sportmodeldisconnected")
  };
  a.matchLiveAvailable = function () {
    $(document).trigger("matchliveavailable")
  };
  a.matchLiveNotAvailable = function () {
    $("#holdingCnt").hide();
    $(document).trigger("matchlivenotavailable")
  };
  a.setDataSource = function () {
    a.dispose();
    var c = $("#dataSourceSelect").val(), b = $("#dataSourceSelect option:selected").text();
    if (b == "Live Data")a.useDummyData = false;
    else a.useDummyData = true;
    a.init()
  };
  a.init()
};
SportClassification = {SOCCER: 1, BASKETBALL: 18, CRICKET: 3, DARTS: 15, HANDBALL: 78, RUGBYLEAGUE: 19, RUGBYUNION: 8, TENNIS: 13, WATERPOLO: 110, BASEBALL: 16};
var connection;
PanelSwipe = function (c, d, b) {
  var a = this;
  this.carousel = document.getElementById(c);
  this.container = $("#" + d);
  this.successfulConnections = b;
  this.swipeStart = null;
  this.swipeEnd = null;
  this.currentPanel = 0;
  this.totalPanels = null;
  this.allowCarouselSwipe = true;
  this.previewComplete = this.successfulConnections > 0;
  this.isScrolling = false;
  this.checkTapSide = false;
  this.transitionDistance = null;
  this.positionX = 0;
  this.deltaX = null;
  this.containerOffset = {x: 0, y: 0, width: 0, midpoint: 0, leftClick: function () {
    return this.x < this.midpoint
  }};
  a.initTouchEvents = function () {
    if (a.carousel != null && !a.previewComplete) {
      var d = "ontouchstart"in document.documentElement;
      a.totalPanels = $("#" + a.carousel.id + " > li").size();
      a.transitionDistance = 100 / a.totalPanels;
      a.checkTapSide = a.totalPanels > 2;
      var b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend"}, c = b[Modernizr.prefixed("transition")];
      $(a.carousel).bind(c, function () {
        a.allowCarouselSwipe = true
      });
      a.carousel.addEventListener("touchstart", a.mobileTouchStartFn);
      a.carousel.addEventListener("touchmove", a.mobileTouchMoveFn);
      a.carousel.addEventListener("touchend", a.mobileTouchEndFn);
      a.carousel.addEventListener("click", a.mouseClickFn);
      a.movePanel(a.totalPanels - 1);
      a.allowCarouselSwipe = true
    }
  };
  this.mouseStartFn = function (b) {
    var c = {x: b.pageX, y: b.pageY, time: Number(new Date)};
    a.swipeStart = c;
    a.deltaX = 0;
    b.stopPropagation()
  };
  this.mouseMoveFn = function (b) {
    var c = {x: b.pageX, y: b.pageY};
    if (a.swipeStart) {
      a.swipeEnd = c;
      a.deltaX = c.x - a.swipeStart.x;
      a.onTouchComplete(b)
    }
    b.stopPropagation()
  };
  this.mouseClickFn = function (b) {
    var c = {x: b.pageX, y: b.pageY, time: Number(new Date)};
    a.setContainerOffsets(b, $(b.target).parent());
    a.swipeStart = c;
    a.deltaX = 0;
    a.onTouchComplete(b);
    b.stopPropagation()
  };
  this.mobileTouchStartFn = function (b) {
    var c = {x: b.touches[0].screenX, y: b.touches[0].screenY, time: Number(new Date)};
    a.swipeStart = c;
    a.isScrolling = false;
    a.deltaX = 0;
    b.stopPropagation()
  };
  this.mobileTouchMoveFn = function (b) {
    var c = {x: b.touches[0].screenX, y: b.touches[0].screenY};
    a.swipeEnd = c;
    a.deltaX = c.x - a.swipeStart.x;
    if (!a.isScrolling)a.isScrolling = !!(a.isScrolling || Math.abs(a.deltaX) < Math.abs(a.swipeEnd.y - a.swipeStart.y));
    if (!a.isScrolling) {
      b.preventDefault();
      b.stopPropagation()
    }
  };
  this.mobileTouchEndFn = function (b) {
    a.setContainerOffsets(b, $(b.target).parent());
    if (a.swipeStart)a.onTouchComplete(b);
    b.stopPropagation()
  };
  a.preview = function () {
    if (!a.previewComplete && a.carousel) {
      a.carousel.className += " animOn";
      a.movePanel(-1);
      a.previewComplete = true
    }
  };
  a.onTouchComplete = function () {
    if (!a.isScrolling && a.previewComplete) {
      var b = 0, d = Number(new Date) - a.swipeStart.time < 250 && Math.abs(a.deltaX) < 20, c = Math.abs(a.deltaX) >= 20 || Math.abs(a.deltaX) > 320 / 2;
      if (d)b = a.getTapDirection();
      else if (c)b = a.getSwipeDirection();
      a.movePanel(b)
    }
  };
  a.getTapDirection = function () {
    var b = 0, c;
    if (a.checkTapSide) {
      c = a.containerOffset.leftClick()
        ? "left"
        : "right";
      if (a.currentPanel > 0 && c == "left")b = -1;
      else if (a.currentPanel < a.totalPanels - 1 && c == "right")b = 1
    }
    else b = a.currentPanel > 0
      ? -1
      : 1;
    return b
  };
  a.getSwipeDirection = function () {
    var b = 0;
    if (a.currentPanel > 0 && a.deltaX > 0)b = -1;
    else if (a.currentPanel < a.totalPanels - 1 && a.deltaX < 0)b = 1;
    return b
  };
  a.movePanel = function (b) {
    if (a.allowCarouselSwipe && b != 0) {
      a.allowCarouselSwipe = false;
      a.currentPanel = a.currentPanel + b;
      MatchLiveGlobal.currentPanel = a.currentPanel;
      a.positionX += a.transitionDistance * -b;
      $(document).trigger("swipemove");
      if (Modernizr.carouselswipebytransform)$(a.carousel).css(Modernizr.prefixed("transform"), "translate3d(" + a.positionX + "%, 0, 0)");
      else if (a.currentPanel == 0)$(a.carousel).attr("style", "left: 0;position:relative;");
      else if (a.currentPanel == 1)$(a.carousel).attr("style", "left: " + $("#sbRMN").width() * -1 + "px;position:relative;");
      else a.currentPanel == 2 && $(a.carousel).attr("style", "left: " + $("#sbRMN").width() * -2 + "px;position:relative;");
      setTimeout(function () {
        var b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend"}, c = b[Modernizr.prefixed("transition")];
        $(a.carousel).trigger(c)
      }, 400);
      a.swipeStart = null;
      a.swipeEnd = null
    }
  };
  a.setContainerOffsets = function (c, g) {
    var j = $("body").offset().left, k = $("body").offset().top, b = c.changedTouches, h = b && b.length > 0
      ? b[0].pageX
      : c.pageX, i = b && b.length > 0
      ? b[0].pageY
      : c.pageY, e = h - j, f = i - k, d = a.container.offset();
    a.containerOffset.x = e - d.left;
    a.containerOffset.y = f - d.top;
    a.containerOffset.width = g.width();
    a.containerOffset.midpoint = a.containerOffset.width / 2
  };
  a.dispose = function () {
    if (a.carousel) {
      a.carousel.removeEventListener("touchstart", a.mobileTouchStartFn);
      a.carousel.removeEventListener("touchmove", a.mobileTouchMoveFn);
      a.carousel.removeEventListener("touchend", a.mobileTouchEndFn);
      a.carousel.removeEventListener("click", a.mouseClickFn)
    }
  };
  a.initTouchEvents()
};
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame || function (a) {
    window.setTimeout(a, 1e3 / 60)
  }
}();
window.cancelRequestAnimFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}();
var _matchLive = null, MatchLiveGlobal = {liquidWidthLimit: 0, successfulConnections: 0, successfulDisconnections: 0, currentPanel: 0, initMatchLive: function (d,
                                                                                                                                                                b,
                                                                                                                                                                c,
                                                                                                                                                                a) {
  this.setupGlobalListeners();
  if (a)this.liquidWidthLimit = a;
  if (_matchLive !== null) {
    _matchLive.dispose();
    _matchLive = null
  }
  _matchLive = new MatchLive(d, b, c)
}, setupGlobalListeners: function () {
  $(window).off("resize");
  $(document).off("swipemove")
}, onPageLoadClearMatchLive: function (a) {
  if (_matchLive) {
    if (a)this.successfulConnections = 0;
    _matchLive.dispose();
    _matchLive = null;
    this.successfulDisconnections += 1
  }
}, setClock: function () {
  $(document).trigger("matchliveshowclock")
}, liquidLayout: function () {
  var a = this.getMatchLiveWidth() * .4;
  if (a > 0) {
    $("#c1 > li").height(a);
    $("#c1 > li > .terrain").height(a)
  }
}, getMatchLiveWidth: function () {
  var b = $("#streamContainer"), a = b.width();
  if (this.liquidWidthLimit > 0 && a >= this.liquidWidthLimit)a = this.liquidWidthLimit;
  return a
}};
String.prototype.format = function () {
  var b = this, a = arguments.length;
  while (a--)b = b.replace(new RegExp("\\{" + a + "\\}", "gm"), arguments[a]);
  return b
}