TennisBase = function () {
  var a = this;
  a.init = function () {
    if (_matchLive != null) {
      if (typeof _matchLive.sportModel != "undefined") {
        _matchLive.statsView = new TennisStatsView(_matchLive.sportModel);
        _matchLive.arenaView = new TennisCourtView(_matchLive.sportModel)
      }
      _matchLive.useDummyData && a.initTestFields()
    }
  };
  a.initTestFields = function () {
    if (_matchLive != null) {
      _matchLive.sportModel.team1Name = "Team 1";
      _matchLive.sportModel.team2Name = "Team 2";
      $("#team1Name").html(_matchLive.sportModel.team1Name);
      $("#team2Name").html(_matchLive.sportModel.team2Name);
      _matchLive.sportModel.stat1Name = "stat1";
      _matchLive.sportModel.stat2Name = "stat2";
      _matchLive.sportModel.stat3Name = "stat3";
      _matchLive.sportModel.stat4Name = "stat4"
    }
  };
  a.init()
};
function MatchLiveTennisModel() {
  MatchLiveModelBase.call(this);
  this.AnimationLookup = {"1113": {type: MLTennisEvent.SERVICE}, "1114": {type: MLTennisEvent.POINT_SCORED}, "1115": {type: MLTennisEvent.FAULT}, "1116": {type: MLTennisEvent.DOUBLE_FAULT}, "1117": {type: MLTennisEvent.ACE}, "1118": {type: MLTennisEvent.BREAK_POINT}, "1119": {type: MLTennisEvent.GAME}, "1120": {type: MLTennisEvent.SCORE}, "1121": {type: MLTennisEvent.TEAM_ALERT, alert: TennisAlerts.LET_FIRSTSERVE}, "1122": {type: MLTennisEvent.TEAM_ALERT, alert: TennisAlerts.LET_SECONDSERVE}, "1123": {type: MLTennisEvent.TEAM_ALERT, alert: TennisAlerts.GAMESETMATCH}, "1128": {type: MLTennisEvent.TEAM_ALERT, alert: TennisAlerts.CHALLENGE}, "1124": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.ENDOFSET}, "1126": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.INJURY_BREAK}, "1127": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.RAIN_DELAY}, "1134": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.FIRST_SET}, "1135": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.SECOND_SET}, "1136": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.THIRD_SET}, "1137": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.FOURTH_SET}, "1138": {type: MLTennisEvent.GENERAL_ALERT, alert: TennisAlerts.FINAL_SET}, "1125": {type: MLTennisEvent.TIE_BREAK}, "1129": {type: MLTennisEvent.CHALLENGE_SUCCESS}, "1130": {type: MLTennisEvent.CHALLENGE_FAIL}, "1131": {type: MLTennisEvent.STAT_ADJUST}, "1132": {type: MLTennisEvent.TIE_BREAK}}
}
var tennisProto = MatchLiveTennisModel.prototype = new MatchLiveModelBase;
tennisProto.statData = "";
tennisProto.surfaceType = null;
tennisProto.numberOfSets = 0;
tennisProto.setAnimationId = function (b, e) {
  this.animId = b;
  this.eventData = !e
    ? this.statData
    : e;
  var c, d;
  if (b.length == 5) {
    c = "team" + b.charAt(0);
    d = b.slice(1)
  }
  else {
    c = "none";
    d = b
  }
  var a = this.AnimationLookup[d];
  if (!a)return;
  switch (a.type) {
    case MLTennisEvent.SERVICE:
    case MLTennisEvent.POINT_SCORED:
    case MLTennisEvent.TIE_BREAK:
    case MLTennisEvent.FAULT:
    case MLTennisEvent.DOUBLE_FAULT:
    case MLTennisEvent.ACE:
    case MLTennisEvent.BREAK_POINT:
    case MLTennisEvent.GAME:
    case MLTennisEvent.SCORE:
    case MLTennisEvent.CHALLENGE_SUCCESS:
    case MLTennisEvent.CHALLENGE_FAIL:
      this.dispatchEvent(new MLTennisEvent(a.type, {team: c, eventData: this.eventData}));
      break;
    case MLTennisEvent.GENERAL_ALERT:
      this.dispatchEvent(new MLTennisEvent(a.type, {alert: a.alert}));
      break;
    case MLTennisEvent.TEAM_ALERT:
      this.dispatchEvent(new MLTennisEvent(a.type, {alert: a.alert, team: c}))
  }
};
tennisProto.setAdditionalData = function (b) {
  var a = b.split("#");
  if (a[3] && a[3].length > 0)this.surfaceType = a[3];
  if (a[4] && a[4].length > 0)this.numberOfSets = a[4];
  this.dispatchEvent(new MLTennisEvent(MLTennisEvent.SURFACE_TYPE))
};
tennisProto.setPenaltyGoals = function (a) {
  this.statData = a
};
tennisProto.dispose = function () {
};
tennisProto = null;
function MLTennisEvent(b, a) {
  ns_gen5_events.Event365.call(this, b);
  this.data = a
}
MLTennisEvent.prototype = new ns_gen5_events.Event365;
MLTennisEvent.SERVICE = "service";
MLTennisEvent.POINT_SCORED = "point";
MLTennisEvent.FAULT = "fault";
MLTennisEvent.DOUBLE_FAULT = "doubleFault";
MLTennisEvent.ACE = "ace";
MLTennisEvent.BREAK_POINT = "breakpoint";
MLTennisEvent.GAME = "game";
MLTennisEvent.SCORE = "score";
MLTennisEvent.TIE_BREAK = "tiebreak";
MLTennisEvent.CHALLENGE_SUCCESS = "challengesuccess";
MLTennisEvent.CHALLENGE_FAIL = "challengefail";
MLTennisEvent.STAT_ADJUST = "statadjust";
MLTennisEvent.SURFACE_TYPE = "surfaceType";
MLTennisEvent.TEAM_ALERT = "teamAlert";
MLTennisEvent.GENERAL_ALERT = "generalAlert";
TennisAlerts = {GAMESETMATCH: "gamesetmatch", LET_FIRSTSERVE: "letfirstserve", LET_SECONDSERVE: "letsecondserve", CHALLENGE: "challenge", ENDOFSET: "endofset", INJURY_BREAK: "injurybreak", RAIN_DELAY: "raindelay", FIRST_SET: "firstSet", SECOND_SET: "secondSet", THIRD_SET: "thirdSet", FOURTH_SET: "fourthSet", FINAL_SET: "finalSet"};
TennisCourtView = function (c) {
  var b = ns_gen5_util.Delegate, a = this;
  this.tennisModel = c;
  this.request = null;
  this.previousClipID = "";
  this.previousEvent = null;
  this.statsCarousel = null;
  this.currentDelay = 0;
  a.updateGameScoreTimerId = null;
  a.updateServerTimerId = null;
  a.displayKeyPointAlertTimerId = null;
  a.displayTeamInfoAlertTimerId = null;
  a.displayTeamAlertTimerId = null;
  a.displayGeneralAlertTimerId = null;
  a.init = function () {
    $("#eventsContainer > li > div").hide();
    a.setSurfaceType();
    if (a.tennisModel.team1Name.indexOf("/") > -1) {
      $("#team1Court").html(a.tennisModel.team1Name.trim().replace("/", "/<br/>"));
      $("#team2Court").html(a.tennisModel.team2Name.trim().replace("/", "/<br/>"))
    }
    else {
      $("#team1Court").html(a.tennisModel.team1Name.trim().replace(" ", "<br/>"));
      $("#team2Court").html(a.tennisModel.team2Name.trim().replace(" ", "<br/>"))
    }
    $("#gameScore1 > div").attr("class", "point" + a.tennisModel.team1Point);
    $("#gameScore2 > div").attr("class", "point" + a.tennisModel.team2Point);
    a.tennisModel.setAnimationId(a.tennisModel.animId)
  };
  a.setSurfaceType = function () {
    var b;
    switch (a.tennisModel.surfaceType) {
      case a.SurfaceType.CARPET:
      case a.SurfaceType.HARD:
        b = "hard";
        break;
      case a.SurfaceType.CLAY:
        b = "clay";
        break;
      case a.SurfaceType.GRASS:
      case a.SurfaceType.PADEL:
        b = "grass";
        break;
      default:
        b = "hard"
    }
    $("#surfaceContainer").attr("class", "terrain " + b)
  };
  a.updateGameScore = function (c, b, e, d) {
    a.currentDelay += a.DelaySettings.GAME_SCORE;
    $("#gameScores > span > div").attr("class", "");
    a.updateGameScoreTimerId = setTimeout(function () {
      if (!a.tennisModel)return;
      $("#courtPointScore").hide();
      $(".message").hide();
      var i = c + "Status", g = $("#team1ArenaPoint").html(), h = $("#team2ArenaPoint").html(), f = e.split(":");
      if (f.length == 2) {
        $("#team1ArenaPoint").html(f[0]);
        $("#team2ArenaPoint").html(f[1]);
        $("#team1StatsPoint").html(f[0]);
        $("#team2StatsPoint").html(f[1]);
        var j = a.tennisModel.getMatchLiveMLValue(MLTennisEvent.POINT_SCORED);
        $("#" + i).html(j);
        if (b == MLTennisEvent.POINT_SCORED) {
          a.setupGameScores("gameScore1", g, f[0]);
          a.setupGameScores("gameScore2", h, f[1]);
          $("#gameScores").show();
          a.transitionClip(i, a.CurrentState.COURT_VIEW, b, c);
          g != f[0] && $("#gameScore1 > div").attr("class", "nextGamePt");
          h != f[1] && $("#gameScore2 > div").attr("class", "nextGamePt")
        }
        if (b == MLTennisEvent.TIE_BREAK) {
          a.setupGameScores("tiebreakScore1", g, f[0]);
          a.setupGameScores("tiebreakScore2", h, f[1]);
          $("#tiebreakScores").show();
          $("#tiebreakScores .type").html(d);
          a.transitionClip(i, a.CurrentState.COURT_VIEW, b, c);
          g != f[0] && $("#tiebreakScore1 > div").attr("class", "nextTiebreakPt");
          h != f[1] && $("#tiebreakScore2 > div").attr("class", "nextTiebreakPt")
        }
      }
    }, a.currentDelay)
  };
  a.setupGameScores = function (b, c, d) {
    $("#" + b).find("span").remove();
    var a = "";
    a += "<span>" + c + "</span>";
    a += "<span>" + d + "</span>";
    $("#" + b + " > div").append(a).attr("class", "currentGamePt")
  };
  a.updateGameStatus = function (d, b) {
    var c = d + "Status", e = a.tennisModel.getMatchLiveMLValue(b);
    $("#" + c).html(e);
    a.transitionClip(c, a.CurrentState.COURT_VIEW, b, d)
  };
  a.updateServer = function (b, e, c) {
    var g = a.DelaySettings.SERVICE_DISPLAY + a.currentDelay, f = b + "Service", d = b == "team1"
      ? "team2"
      : "team1";
    a.updateServerTimerId = setTimeout(function () {
      if (!a.tennisModel)return;
      $("#courtPointScore").show();
      $("#gameScores").hide();
      $("#tiebreakScores").hide();
      $(".message").hide();
      $(".service").hide();
      a.updateServerSide();
      if (a.previousEvent && a.previousEvent.eventType == MLTennisEvent.FAULT) {
        var i = a.tennisModel.getMatchLiveMLValue("secondServe");
        $("#" + b + "ServiceMessage").html(i).show()
      }
      a.transitionClip(f, a.CurrentState.COURT_VIEW, e, b);
      if (c && c.indexOf("#") > -1)for (var h = a.getKeyPointObj(c, d), g = 0; g < h.length; g++) {
        var j = $("#" + h[g].team + "Status");
        $(j).html(h[g].label).show().attr("data-event", "")
      }
      a.currentDelay = 0
    }, g)
  };
  a.getKeyPointObj = function (o, n) {
    var g = o.split("#"), h = "", d = "", c = "", l = "", p = "", f = "", b = "", e = "", m, k, i, j = [];
    if (g.length >= 2) {
      m = g[0];
      k = g[1];
      if (g[2])d = g[2];
      i = k > 1;
      switch (m) {
        case"1":
          b = "break";
          d = a.tennisModel.getMatchLiveMLValue("breakPtsWonInfo") + d;
          c = n.substr(n.length - 1);
          break;
        case"2":
          b = "set";
          d = a.tennisModel.getMatchLiveMLValue("setPtsWonInfo") + d;
          c = "1";
          break;
        case"3":
          b = "set";
          d = a.tennisModel.getMatchLiveMLValue("setPtsWonInfo") + d;
          c = "2";
          break;
        case"4":
          b = "match";
          c = "1";
          break;
        case"5":
          b = "match";
          c = "2";
          break;
        case"6":
          b = "break";
          c = "1";
          e = "set";
          f = "2";
          break;
        case"7":
          b = "break";
          c = "2";
          e = "set";
          f = "1";
          break;
        case"8":
          b = "break";
          c = "1";
          e = "match";
          f = "2";
          break;
        case"9":
          b = "break";
          c = "2";
          e = "match";
          f = "1"
      }
    }
    if (b.length > 0) {
      h = a.tennisModel.getMatchLiveMLValue(b + (i
        ? "Points"
        : "Point"));
      h = (i
        ? k
        : "") + h;
      j.push({team: "team" + c, label: h, stats: d})
    }
    if (e.length > 0) {
      l = a.tennisModel.getMatchLiveMLValue(e + "Point");
      j.push({team: "team" + f, label: l, stats: p})
    }
    return j
  };
  a.displayKeyPointAlert = function (c, b, d, e) {
    if (typeof b !== "undefined" && b !== null)a.displayKeyPointAlertTimerId = setTimeout(function () {
      if (!a.tennisModel)return;
      var f = a.tennisModel.getTeamName(b), g = "teamAlertInfoView";
      $("#genericPlayerText").html(f);
      $("#genericEventName").html(d);
      $("#genericEventInfo").html(e);
      a.transitionClip(g, a.CurrentState.TEAM_ALERT_INFO, c, b)
    }, a.currentDelay)
  };
  a.displayTeamInfoAlert = function (b, c, d) {
    if (typeof b !== "undefined" && b !== null)a.displayTeamInfoAlertTimerId = setTimeout(function () {
      if (!a.tennisModel)return;
      var f = a.tennisModel.getTeamName(b), e = a.tennisModel.getMatchLiveMLValue(c), g = "teamAlertInfoView";
      $("#genericPlayerText").html(f);
      $("#genericEventName").html(e);
      $("#genericEventInfo").html(d);
      a.transitionClip(g, a.CurrentState.TEAM_ALERT_INFO, c, b)
    }, a.currentDelay)
  };
  a.displayTeamAlert = function (d, c, b) {
    if (typeof b !== "undefined" && b !== null)a.displayTeamAlertTimerId = setTimeout(function () {
      if (!a.tennisModel)return;
      var e = a.tennisModel.getTeamName(b), f = "teamAlertView";
      $("#alertTeamName").html(e);
      $("#alertEventName").html(d);
      a.transitionClip(f, a.CurrentState.TEAM_ALERT, c, b)
    }, a.DelaySettings.ALERT)
  };
  a.displayGeneralAlert = function (c, b) {
    a.displayGeneralAlertTimerId = setTimeout(function () {
      var d = "generalAlertView";
      $("#generalAlertEvent").html(c);
      a.transitionClip(d, a.CurrentState.GENERAL_ALERT, b, "")
    }, a.DelaySettings.ALERT)
  };
  a.getPointsTotal = function (b) {
    var a;
    switch (b) {
      case"15":
        a = 1;
        break;
      case"30":
        a = 2;
        break;
      case"40":
        a = 3;
        break;
      case"A":
        a = 4;
        break;
      default:
        a = parseInt(b)
    }
    return a
  };
  a.updateServerSide = function () {
    if (a.tennisModel) {
      var h = $("#plyr1").attr("class"), i = $("#plyr2").attr("class"), e = a.getPointsTotal(a.tennisModel.team1Point), f = a.getPointsTotal(a.tennisModel.team2Point), g = e +
        f, d = g % 2 == 0;
      $("#plyr1,#plyr2").removeClass();
      var b = d
        ? "bottom"
        : "top", c = d
        ? "top"
        : "bottom";
      a.movePlayerSideAnim("team1Court", h, b);
      a.movePlayerSideAnim("team2Court", i, c);
      $("#plyr1").addClass(b);
      $("#plyr2").addClass(c)
    }
  };
  a.displayMatchStats = function (b, c) {
    $("#courtPointScore").hide();
    $("#team1stats").html(a.tennisModel.team1Name);
    $("#team2stats").html(a.tennisModel.team2Name);
    a.statsCarousel = window.setTimeout(function () {
      a.statsCarouselSpin(0, false, b, c)
    }, a.DelaySettings.CAROUSEL)
  };
  a.statsCarouselSpin = function (d, e, f, b) {
    a.statsCarousel != 0 && window.clearTimeout(a.statsCarousel);
    var g = "matchStatsView", c = $("#" + g).find(".type");
    if (!e) {
      a.transitionClip(g, a.CurrentState.MATCH_STATS, f, "");
      e = true
    }
    $("#team1stats").nextAll().remove();
    $("#team2stats").nextAll().remove();
    switch (d) {
      case a.MatchStats.SET_SCORES:
        c.html(a.getCurrentSetLabel());
        a.addSetStatsCells(b[a.MatchStats.SET_SCORES]);
        break;
      case a.MatchStats.ACES:
        c.html(a.tennisModel.getMatchLiveMLValue("aces"));
        a.addStatsCell(b[a.MatchStats.ACES], a.MatchStats.ACES);
        break;
      case a.MatchStats.BREAK_POINTS:
        c.html(a.tennisModel.getMatchLiveMLValue("breakPtsWon"));
        a.addStatsCell(b[a.MatchStats.BREAK_POINTS], a.MatchStats.BREAK_POINTS);
        break;
      case a.MatchStats.FIRST_SERVE_POINTS:
        c.html(a.tennisModel.getMatchLiveMLValue("firstServePtsWon"));
        a.addStatsCell(b[a.MatchStats.FIRST_SERVE_POINTS], a.MatchStats.FIRST_SERVE_POINTS, true);
        break;
      case a.MatchStats.SECOND_SERVE_POINTS:
        c.html(a.tennisModel.getMatchLiveMLValue("secondServePtsWon"));
        a.addStatsCell(b[a.MatchStats.SECOND_SERVE_POINTS], a.MatchStats.SECOND_SERVE_POINTS, true)
    }
    d++;
    if (d == b.length)d = 0;
    a.statsCarousel = window.setTimeout(function () {
      a.statsCarouselSpin(d, e, f, b)
    }, a.DelaySettings.CAROUSEL)
  };
  a.addStatsCell = function (e, c, d) {
    var b = e.split("~"), a = d
      ? "%"
      : "";
    $("#team1stats").after('<td class="singleStat type' + c + '">' + b[0] + a + "</td>");
    $("#team2stats").after('<td class="singleStat type' + c + '">' + b[1] + a + "</td>")
  };
  a.addSetStatsCells = function (f) {
    var b = f.split("~");
    if (b.length == 2)for (var a = 0; a < b.length; a++) {
      for (var d = "", e = b[a].split(":"), c = 0; c < e.length; c++)d += '<td class="setStat">' + e[c] + "</td>";
      $("#team" + (a + 1) + "stats").after(d)
    }
  };
  a.getCurrentSetLabel = function () {
    var b = "", d = "";
    if (a.tennisModel.matchSetScores.length > 0) {
      var c = a.tennisModel.matchSetScores.split(",").length;
      if (a.tennisModel.numberOfSets == c)c = 5;
      switch (c) {
        case 1:
          b = "firstSet";
          break;
        case 2:
          b = "secondSet";
          break;
        case 3:
          b = "thirdSet";
          break;
        case 4:
          b = "fourthSet";
          break;
        case 5:
          b = "finalSet"
      }
      d = a.tennisModel.getMatchLiveMLValue(b)
    }
    return d
  };
  a.onServiceHandler = function (b) {
    a.updateServer(b.data.team, MLTennisEvent.SERVICE, b.data.eventData)
  };
  a.onPointScoredHandler = function (b) {
    a.updateGameScore(b.data.team, MLTennisEvent.POINT_SCORED, b.data.eventData)
  };
  a.onTieBreakHandler = function (d) {
    var b = d.data.eventData.split("#"), e = "", c = "";
    if (b && b[1]) {
      c = b[0] == "2"
        ? a.tennisModel.getMatchLiveMLValue("matchTieBreak")
        : a.tennisModel.getMatchLiveMLValue("tieBreak");
      e = b[1]
    }
    a.updateGameScore(d.data.team, MLTennisEvent.TIE_BREAK, e, c)
  };
  a.onFaultHandler = function (b) {
    a.updateServerSide();
    a.updateGameStatus(b.data.team, MLTennisEvent.FAULT)
  };
  a.onDoubleFaultHandler = function (c) {
    var b, d = c.data.eventData;
    b = a.tennisModel.getMatchLiveMLValue("totalDoubleFaults");
    b += " " + d;
    a.displayTeamInfoAlert(c.data.team, MLTennisEvent.DOUBLE_FAULT, b);
    a.currentDelay += a.DelaySettings.ALERT
  };
  a.onAceHandler = function (c) {
    var b, d = c.data.eventData;
    b = a.tennisModel.getMatchLiveMLValue("totalAces");
    b += " " + d;
    a.displayTeamInfoAlert(c.data.team, MLTennisEvent.ACE, b);
    a.currentDelay += a.DelaySettings.ALERT
  };
  a.onBreakPointHandler = function (c) {
    var d = c.data.eventData, b = a.getKeyPointObj(d, c.data.team);
    a.currentDelay += a.DelaySettings.ALERT;
    a.displayKeyPointAlert(MLTennisEvent.BREAK_POINT, b[0].team, b[0].label, b[0].stats)
  };
  a.onChallengeSuccessHandler = function (d) {
    var c, b, e = d.data.eventData;
    c = a.tennisModel.getMatchLiveMLValue("challengeSuccess");
    b = a.tennisModel.getMatchLiveMLValue("challengesRemaining");
    b = e + b;
    a.displayKeyPointAlert(MLTennisEvent.CHALLENGE_SUCCESS, d.data.team, c, b)
  };
  a.onChallengeFailHandler = function (d) {
    var c, b, e = d.data.eventData;
    c = a.tennisModel.getMatchLiveMLValue("challengeFailed");
    b = a.tennisModel.getMatchLiveMLValue("challengesRemaining");
    b = e + b;
    a.displayKeyPointAlert(MLTennisEvent.CHALLENGE_FAIL, d.data.team, c, b)
  };
  a.onScoreHandler = function (c) {
    clearInterval(a.statsCarousel);
    a.statsCarousel = 0;
    var b = c.data.eventData.split("#");
    b.length == 5 && a.displayMatchStats(c.type, b)
  };
  a.onGameHandler = function (d) {
    var b = "", c = d.data.eventData.split("#");
    $("#team1ArenaPoint, #team2ArenaPoint").html("0");
    $("#team1StatsPoint, #team2StatsPoint").html("0");
    $("#gameScore1 > div").attr("class", "point0");
    $("#gameScore2 > div").attr("class", "point0");
    if (c.length == 2) {
      b = c[0] == 1
        ? a.tennisModel.getMatchLiveMLValue("holdsTo")
        : a.tennisModel.getMatchLiveMLValue("breaksTo");
      b += " " + c[1]
    }
    a.displayTeamInfoAlert(d.data.team, MLTennisEvent.GAME, b)
  };
  a.onTeamAlertHandler = function (c) {
    var d, b = "";
    switch (c.data.alert) {
      case TennisAlerts.GAMESETMATCH:
        b = "gameSetMatch";
        break;
      case TennisAlerts.LET_FIRSTSERVE:
        b = "let1stServe";
        break;
      case TennisAlerts.LET_SECONDSERVE:
        b = "let2ndServe";
        break;
      case TennisAlerts.CHALLENGE:
        b = "challenge"
    }
    d = a.tennisModel.getMatchLiveMLValue(b);
    a.displayTeamAlert(d, c.data.alert, c.data.team)
  };
  a.onSurfaceTypeHandler = function () {
    a.setSurfaceType()
  };
  a.onGeneralAlertHandler = function (d) {
    var c, b = "";
    switch (d.data.alert) {
      case TennisAlerts.ENDOFSET:
        b = "endofSet";
        break;
      case TennisAlerts.INJURY_BREAK:
        b = "injuryBreak";
        break;
      case TennisAlerts.RAIN_DELAY:
        b = "rainDelay";
        break;
      case TennisAlerts.FIRST_SET:
        b = "firstSet";
        break;
      case TennisAlerts.SECOND_SET:
        b = "secondSet";
        break;
      case TennisAlerts.THIRD_SET:
        b = "thirdSet";
        break;
      case TennisAlerts.FOURTH_SET:
        b = "fourthSet";
        break;
      case TennisAlerts.FINAL_SET:
        b = "finalSet"
    }
    c = a.tennisModel.getMatchLiveMLValue(b);
    a.displayGeneralAlert(c, d.data.alert)
  };
  a.delegate_onServiceHandler = new b(a, a.onServiceHandler);
  a.delegate_onPointScoredHandler = new b(a, a.onPointScoredHandler);
  a.delegate_onTieBreakHandler = new b(a, a.onTieBreakHandler);
  a.delegate_onFaultHandler = new b(a, a.onFaultHandler);
  a.delegate_onDoubleFaultHandler = new b(a, a.onDoubleFaultHandler);
  a.delegate_onChallengeSuccessHandler = new b(a, a.onChallengeSuccessHandler);
  a.delegate_onChallengeFailHandler = new b(a, a.onChallengeFailHandler);
  a.delegate_onAceHandler = new b(a, a.onAceHandler);
  a.delegate_onScoreHandler = new b(a, a.onScoreHandler);
  a.delegate_onGameHandler = new b(a, a.onGameHandler);
  a.delegate_onBreakPointHandler = new b(a, a.onBreakPointHandler);
  a.delegate_onSurfaceTypeHandler = new b(a, a.onSurfaceTypeHandler);
  a.delegate_onTeamAlertHandler = new b(a, a.onTeamAlertHandler);
  a.delegate_onGeneralAlertHandler = new b(a, a.onGeneralAlertHandler);
  a.tennisModel.addEventListener(MLTennisEvent.SERVICE, a.delegate_onServiceHandler);
  a.tennisModel.addEventListener(MLTennisEvent.POINT_SCORED, a.delegate_onPointScoredHandler);
  a.tennisModel.addEventListener(MLTennisEvent.TIE_BREAK, a.delegate_onTieBreakHandler);
  a.tennisModel.addEventListener(MLTennisEvent.FAULT, a.delegate_onFaultHandler);
  a.tennisModel.addEventListener(MLTennisEvent.DOUBLE_FAULT, a.delegate_onDoubleFaultHandler);
  a.tennisModel.addEventListener(MLTennisEvent.CHALLENGE_SUCCESS, a.delegate_onChallengeSuccessHandler);
  a.tennisModel.addEventListener(MLTennisEvent.CHALLENGE_FAIL, a.delegate_onChallengeFailHandler);
  a.tennisModel.addEventListener(MLTennisEvent.ACE, a.delegate_onAceHandler);
  a.tennisModel.addEventListener(MLTennisEvent.SCORE, a.delegate_onScoreHandler);
  a.tennisModel.addEventListener(MLTennisEvent.GAME, a.delegate_onGameHandler);
  a.tennisModel.addEventListener(MLTennisEvent.BREAK_POINT, a.delegate_onBreakPointHandler);
  a.tennisModel.addEventListener(MLTennisEvent.SURFACE_TYPE, a.delegate_onSurfaceTypeHandler);
  a.tennisModel.addEventListener(MLTennisEvent.TEAM_ALERT, a.delegate_onTeamAlertHandler);
  a.tennisModel.addEventListener(MLTennisEvent.GENERAL_ALERT, a.delegate_onGeneralAlertHandler);
  a.transitionClip = function (c, b, d, e) {
    $("#" + c).show().attr("data-event", d);
    if (a.previousClipID == c)return;
    if (a.previousEvent) {
      if (b != a.previousEvent.state) {
        $("#" + b).show();
        $("#" + a.previousEvent.state).hide()
      }
    }
    else $("#" + b).show();
    $("#" + a.previousClipID).hide();
    a.previousClipID = c;
    a.previousEvent = {state: b, eventType: d, team: e}
  };
  a.movePlayerSideAnim = function (g, f, d) {
    if (f != d) {
      var a, b, c = 67, e = -2;
      if (d == "top")a = c, b = e;
      else a = e, b = c;
      $("#" + g).css({top: a}).animate({top: b}, 500, function () {
      })
    }
  };
  a.dispose = function () {
    a.tennisModel.removeEventListener(MLTennisEvent.SERVICE, a.delegate_onServiceHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.POINT_SCORED, a.delegate_onPointScoredHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.TIE_BREAK, a.delegate_onTieBreakHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.FAULT, a.delegate_onFaultHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.DOUBLE_FAULT, a.delegate_onDoubleFaultHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.ACE, a.delegate_onAceHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.SCORE, a.delegate_onScoreHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.GAME, a.delegate_onGameHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.BREAK_POINT, a.delegate_onBreakPointHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.SURFACE_TYPE, a.delegate_onSurfaceTypeHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.TEAM_ALERT, a.delegate_onTeamAlertHandler);
    a.tennisModel.removeEventListener(MLTennisEvent.GENERAL_ALERT, a.delegate_onGeneralAlertHandler);
    clearTimeout(a.updateGameScoreTimerId);
    clearTimeout(a.updateServerTimerId);
    clearTimeout(a.displayKeyPointAlertTimerId);
    clearTimeout(a.displayTeamInfoAlertTimerId);
    clearTimeout(a.displayTeamAlertTimerId);
    clearTimeout(a.displayGeneralAlertTimerId);
    a.statsCarousel = clearInterval(a.statsCarousel);
    a.statsCarousel = 0;
    a.tennisModel = null
  };
  a.CurrentState = {COURT_VIEW: "serviceView", TEAM_ALERT_INFO: "teamAlertInfoView", TEAM_ALERT: "teamAlertView", GENERAL_ALERT: "generalAlertView", MATCH_STATS: "matchStatsView"};
  a.SurfaceType = {CARPET: "0", CLAY: "1", GRASS: "2", HARD: "3", PADEL: "4"};
  a.CrucialPoint = {BREAK_POINT: "1", SET_POINT: "2", MATCH_POINT: "3"};
  a.MatchStats = {SET_SCORES: 0, ACES: 1, BREAK_POINTS: 2, FIRST_SERVE_POINTS: 3, SECOND_SERVE_POINTS: 4};
  a.DelaySettings = {SERVICE_DISPLAY: 4500, GAME_SCORE: 1e3, CAROUSEL: 4500, ALERT: 3e3};
  a.init()
};
TennisStatsView = function (b) {
  var c = ns_gen5_util.Delegate, a = this;
  this.tennisModel = b;
  a.init = function () {
    $("#team1Name").html(a.tennisModel.team1Name);
    $("#team2Name").html(a.tennisModel.team2Name);
    a.displaySetScores(a.tennisModel.matchSetScores);
    a.displayScore("team1", a.tennisModel.team1Point);
    a.displayScore("team2", a.tennisModel.team2Point);
    a.displayGraphStats(a.tennisModel.statsAvailable);
    a.displayStat("team1", 1, a.tennisModel.team1Stat1);
    a.displayStat("team2", 1, a.tennisModel.team2Stat1);
    a.displayStat("team1", 2, a.tennisModel.team1Stat2);
    a.displayStat("team2", 2, a.tennisModel.team2Stat2);
    a.displayStat("team1", 3, a.tennisModel.team1Stat3);
    a.displayStat("team2", 3, a.tennisModel.team2Stat3);
    a.displayStat("team1", 4, a.tennisModel.team1Stat4);
    a.displayStat("team2", 4, a.tennisModel.team2Stat4);
    return true
  };
  a.displayGraphStats = function (d) {
    var b = $("#noStats"), c = $("#statsGraphs");
    if (d) {
      a.setGraphStatsLabels();
      $(c).show();
      $(b).hide()
    }
    else {
      $(c).hide();
      $(b).show()
    }
  };
  a.setGraphStatsLabels = function () {
    $("#stat1 > span.title").html(b.stat1Name);
    $("#stat2 > span.title").html(b.stat2Name);
    $("#stat3 > span.title").html(b.stat3Name);
    $("#stat4 > span.title").html(b.stat4Name)
  };
  a.displayStat = function (c, b, a) {
    var f = $("#stat" + b + " ." + c + "Amt");
    if (b < 3) {
      f.html(a.toString());
      var h = c == "team1"
        ? "team2"
        : "team1", g = "#stat" + b + " ." + h + "Amt", d = $(g).html(), j = parseInt(a) + parseInt(d), i = c == "team1"
        ? parseInt(d)
        : parseInt(a), e = 50;
      if (a > 0 || d > 0)e = Math.round(i / j * 100);
      $("#stat" + b + " .bar span").css("width", e + "%")
    }
    else {
      f.html(a.toString() + "%");
      if (a > 0)a = c == "team2"
        ? 100 - a
        : a;
      $("#stat" + b + c + " .bar span").css("width", a + "%")
    }
  };
  a.displayScore = function (b, a) {
    $("#" + b + "ArenaPoint").html(a);
    $("#" + b + "StatsPoint").html(a)
  };
  a.displaySetScores = function (h) {
    var b = h.split(","), f = $("#currentSet > span"), d = $("#previousSets > span"), e, g = a.getSetTotals(b);
    $(f).html($("<span>" + g + "</span>"));
    $(d).empty();
    if (b.length > 0) {
      $("#previousSets").show();
      for (var c = 0; c < b.length; c++) {
        e = $("<span>" + b[c] + "</span>");
        $(d).append(e)
      }
    }
    else $("#previousSets").hide()
  };
  a.getSetTotals = function (g) {
    var a = g.slice(0, g.length - 1), d = "", e = 0, f = 0, b;
    if (a.length > 0)for (var c = 0; c < a.length; c++) {
      b = a[c].split("-");
      if (parseInt(b[0]) > parseInt(b[1]))e += 1;
      else f += 1
    }
    d = e + "-" + f;
    return d
  };
  a.statsAvailableEventHandler = function (b) {
    var c = b.data;
    a.displayGraphStats(c.available)
  };
  a.statEventHandler = function (c) {
    var b = c.data;
    a.displayStat(b.team, b.stat, b.value)
  };
  a.scoreEventHandler = function (c) {
    var b = c.data;
    a.displayScore(b.team, b.value)
  };
  a.setScoresEventHandler = function (b) {
    var c = b.data;
    a.displaySetScores(c.matchSetScore)
  };
  a.delegate_statsAvailableEventHandler = new c(a, a.statsAvailableEventHandler);
  a.delegate_statEventHandler = new c(a, a.statEventHandler);
  a.delegate_setScoresEventHandler = new c(a, a.setScoresEventHandler);
  a.tennisModel.addEventListener(MatchLiveEvent.STATS_AVAILABLE_EVENT, a.delegate_statsAvailableEventHandler);
  a.tennisModel.addEventListener(MatchLiveEvent.STAT_EVENT, a.delegate_statEventHandler);
  a.tennisModel.addEventListener(MatchLiveEvent.SET_SCORE, a.delegate_setScoresEventHandler);
  a.dispose = function () {
    a.tennisModel.removeEventListener(MatchLiveEvent.STATS_AVAILABLE_EVENT, a.delegate_statsAvailableEventHandler);
    a.tennisModel.removeEventListener(MatchLiveEvent.STAT_EVENT, a.delegate_statEventHandler);
    a.tennisModel.removeEventListener(MatchLiveEvent.SET_SCORE, a.delegate_setScoresEventHandler);
    a.tennisModel = null
  };
  var d = a.init()
};
function tennisstatsview_loaded() {
  $(document).trigger("statsviewloaded")
}
function tennisall_loaded() {
  $(document).trigger("statsviewloaded")
}