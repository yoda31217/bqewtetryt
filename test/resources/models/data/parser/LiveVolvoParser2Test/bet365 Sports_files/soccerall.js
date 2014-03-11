SoccerBase = function () {
  var a = this;
  a.init = function () {
    MatchLiveGlobal.liquidLayout();
    a.checkLineupsSwipeDisplay();
    a.checkStatsSwipeDisplay();
    $(document).off("swipemove").on("swipemove", a.soccerSwipe);
    if (_matchLive == null || _matchLive.sportModel == null)return;
    _matchLive.statsView = new SoccerStatsView(_matchLive.sportModel);
    _matchLive.arenaView = new SoccerPitchView(_matchLive.sportModel, MatchLiveGlobal.getMatchLiveWidth());
    var b = $("#dummyFields");
    if (b.length > 0) {
      $(b).css({display: "block"});
      _matchLive.useDummyData && a.initTestFields()
    }
  };
  a.initTestFields = function () {
    _matchLive.sportModel.team1Name = "Team 1";
    _matchLive.sportModel.team2Name = "Team 2";
    $("#team1Name").html(_matchLive.sportModel.team1Name);
    $("#team2Name").html(_matchLive.sportModel.team2Name);
    _matchLive.sportModel.stat1Name = "stat1";
    _matchLive.sportModel.stat2Name = "stat2";
    _matchLive.sportModel.stat3Name = "stat3";
    _matchLive.sportModel.stat4Name = "stat4";
    $("#cornersInput1").val(_matchLive.sportModel.team1Corners);
    $("#cornersInput2").val(_matchLive.sportModel.team2Corners);
    $("#redCardInput1").val(_matchLive.sportModel.team1RedCards);
    $("#redCardInput2").val(_matchLive.sportModel.team2RedCards);
    $("#yellowCardInput1").val(_matchLive.sportModel.team1YellowCards);
    $("#yellowCardInput2").val(_matchLive.sportModel.team2YellowCards);
    $("#attackInput1").val(_matchLive.sportModel.team1Stat1);
    $("#attackInput2").val(_matchLive.sportModel.team2Stat1);
    $("#dAttackInput1").val(_matchLive.sportModel.team1Stat2);
    $("#dAttackInput2").val(_matchLive.sportModel.team2Stat2);
    $("#shotsOffInput1").val(_matchLive.sportModel.team1Stat3);
    $("#shotsOffInput2").val(_matchLive.sportModel.team2Stat3);
    $("#shotsOnInput1").val(_matchLive.sportModel.team1Stat4);
    $("#shotsOnInput2").val(_matchLive.sportModel.team2Stat4)
  };
  a.soccerSwipe = function () {
    a.checkStatsSwipeDisplay();
    a.checkLineupsSwipeDisplay()
  };
  a.checkStatsSwipeDisplay = function () {
    var a = $("#mlClock"), b = $("#mlStatsSelect"), c = $("#cpStatsSelection");
    if (c.length > 0 && $(c).attr("data-displaystats") != "none" && a.length > 0 && b.length > 0)if (MatchLiveGlobal.currentPanel === 1) {
      $(a).hide();
      $(b).show();
      $(a).attr("data-clockpanel", "false")
    }
    else {
      $(b).hide();
      $(a).show();
      $(a).attr("data-clockpanel", "true")
    }
  };
  a.checkLineupsSwipeDisplay = function () {
    if ($("#cpLineupIconT1").css("display") == "block") {
      var a = $("#mlLineupIconT1,#mlLineupIconT2");
      if (MatchLiveGlobal.currentPanel === 1)$(a).delay(150).fadeIn(100);
      else $(a).fadeOut(250)
    }
  };
  a.init()
};
function MatchLiveSoccerModel() {
  MatchLiveModelBase.call(this);
  this.AnimationLookup = {"1233": {type: MLSoccerEvent.MATCH_INFO}, "1000": {type: MLSoccerEvent.POSSESSION, intensity: "danger"}, "1001": {type: MLSoccerEvent.POSSESSION, intensity: "attack"}, "1002": {type: MLSoccerEvent.POSSESSION, intensity: "safe"}, "1003": {type: MLSoccerEvent.GOAL}, "1004": {type: MLSoccerEvent.CORNER, zoneId: ZonalPostioning.Corner.BOTTOM}, "1239": {type: MLSoccerEvent.CORNER_ZONE}, "1005": {type: MLSoccerEvent.YELLOW_CARD}, "1006": {type: MLSoccerEvent.RED_CARD}, "1007": {type: MLSoccerEvent.GOAL_KICK}, "1008": {type: MLSoccerEvent.PENALTY}, "1234": {type: MLSoccerEvent.OFFSIDE}, "1009": {type: MLSoccerEvent.FREE_KICK, zoneId: ZonalPostioning.FreeKick.ZONE2}, "1010": {type: MLSoccerEvent.FREE_KICK, zoneId: ZonalPostioning.FreeKick.ZONE5}, "1236": {type: MLSoccerEvent.FREE_KICK_ZONE}, "1238": {type: MLSoccerEvent.SUBSTITUTION}, "1011": {type: MLSoccerEvent.TEAM_ALERT, alert: SoccerAlerts.SHOT_ON_TARGET}, "1012": {type: MLSoccerEvent.TEAM_ALERT, alert: SoccerAlerts.SHOT_OFF_TARGET}, "1013": {type: MLSoccerEvent.TEAM_ALERT, alert: SoccerAlerts.SUBSTITUTION}, "1014": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.KICK_OFF}, "1015": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.HALF_TIME}, "1016": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.SECOND_HALF}, "1017": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.FULL_TIME}, "1018": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.START_EXTRA_TIME_1}, "1019": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.EXTRA_TIME_HT}, "1020": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.START_EXTRA_TIME_2}, "1021": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.END_EXTRA_TIME}, "1022": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.PENALTY_SHOOTOUT}, "1023": {type: MLSoccerEvent.TEAM_ALERT, alert: SoccerAlerts.PENALTY_MISSED}, "1024": {type: MLSoccerEvent.THROW, zoneId: ZonalPostioning.Throw.DEFAULT}, "1237": {type: MLSoccerEvent.THROW_ZONE}, "1025": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.INJURY}, "1026": {type: MLSoccerEvent.GENERAL_ALERT, alert: SoccerAlerts.INJURY_TIME}, "0008": {type: MLSoccerEvent.SHOOTOUT_SCORE}, "0009": {type: MLSoccerEvent.SHOOTOUT_MISS}, "0021": {type: MLSoccerEvent.SHOOTOUT_TO_TAKE}}
}
var socProto = MatchLiveSoccerModel.prototype = new MatchLiveModelBase;
socProto.setAnimationId = function (d, f) {
  this.eventData = !f
    ? this.penaltyGoals
    : f;
  this.animId = d;
  var b, e, c;
  if (d.length == 5) {
    b = "team" + d.charAt(0);
    e = d.slice(1)
  }
  else {
    b = "none";
    e = d
  }
  var a = this.AnimationLookup[e];
  if (!a)return;
  switch (a.type) {
    case MLSoccerEvent.POSSESSION:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, intensity: a.intensity}));
      break;
    case MLSoccerEvent.GOAL:
    case MLSoccerEvent.YELLOW_CARD:
    case MLSoccerEvent.RED_CARD:
    case MLSoccerEvent.GOAL_KICK:
    case MLSoccerEvent.PENALTY:
    case MLSoccerEvent.OFFSIDE:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b}));
      break;
    case MLSoccerEvent.FREE_KICK:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: a.zoneId}));
      break;
    case MLSoccerEvent.CORNER:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: a.zoneId}));
      break;
    case MLSoccerEvent.THROW:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: a.zoneId}));
      break;
    case MLSoccerEvent.FREE_KICK_ZONE:
      c = ZonalPostioning.getZoneId(ZonalPostioning.FreeKick, this.eventData);
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: c}));
      break;
    case MLSoccerEvent.CORNER_ZONE:
      c = ZonalPostioning.getZoneId(ZonalPostioning.Corner, this.eventData);
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: c}));
      break;
    case MLSoccerEvent.THROW_ZONE:
      c = ZonalPostioning.getZoneId(ZonalPostioning.Throw, this.eventData);
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, zoneId: c}));
      break;
    case MLSoccerEvent.SUBSTITUTION:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b, playerInfo: this.eventData}));
      break;
    case MLSoccerEvent.GENERAL_ALERT:
      this.dispatchEvent(new MLSoccerEvent(a.type, {alert: a.alert}));
      break;
    case MLSoccerEvent.TEAM_ALERT:
      this.dispatchEvent(new MLSoccerEvent(a.type, {alert: a.alert, team: b}));
      break;
    case MLSoccerEvent.SHOOTOUT_SCORE:
    case MLSoccerEvent.SHOOTOUT_MISS:
    case MLSoccerEvent.SHOOTOUT_TO_TAKE:
      this.dispatchEvent(new MLSoccerEvent(a.type, {team: b}))
  }
};
socProto.setExtraStat = function (c, b, a) {
  switch (c) {
    case"1":
      this.setScore(b, a);
      break;
    case"2":
      this["team" + b + "Corners"] = a;
      this.dispatchEvent(new MatchLiveEvent(MLSoccerEvent.CORNER_EVENT, {team: "team" + b, value: a}));
      break;
    case"3":
    case"4":
      this["team" + b + (c == 3
        ? "Yellow"
        : "Red") + "Cards"] = a;
      this.dispatchEvent(new MatchLiveEvent(MLSoccerEvent.CARD_EVENT, {team: "team" + b, colour: c == 3
        ? "yellow"
        : "red", value: a}));
      break;
    default:
      return
  }
};
socProto.setPenaltyGoals = function (a) {
  this.penaltyGoals = a;
  this.dispatchEvent(new MLSoccerEvent(MLSoccerEvent.PENALTY_GOALS, {goals: a}))
};
socProto.dispose = function () {
};
socProto.team1Corners = 0;
socProto.team2Corners = 0;
socProto.team1YellowCards = 0;
socProto.team2YellowCards = 0;
socProto.team1RedCards = 0;
socProto.team2RedCards = 0;
socProto = null;
function MLSoccerEvent(b, a) {
  ns_gen5_events.Event365.call(this, b);
  this.data = a
}
MLSoccerEvent.prototype = new ns_gen5_events.Event365;
MLSoccerEvent.MATCH_INFO = "matchInfo";
MLSoccerEvent.POSSESSION = "possession";
MLSoccerEvent.GOAL = "goal";
MLSoccerEvent.THROW = "throw";
MLSoccerEvent.THROW_ZONE = "throwZone";
MLSoccerEvent.CORNER = "corner";
MLSoccerEvent.CORNER_ZONE = "cornerZone";
MLSoccerEvent.RED_CARD = "redCard";
MLSoccerEvent.YELLOW_CARD = "yellowCard";
MLSoccerEvent.GOAL_KICK = "goalKick";
MLSoccerEvent.PENALTY = "penalty";
MLSoccerEvent.OFFSIDE = "offside";
MLSoccerEvent.FREE_KICK = "freeKick";
MLSoccerEvent.FREE_KICK_ZONE = "freeKickZone";
MLSoccerEvent.SUBSTITUTION = "substitution";
MLSoccerEvent.SHOT_ON_TARGET = "shotOnTarget";
MLSoccerEvent.SHOT_OFF_TARGET = "shotOffTarget";
MLSoccerEvent.SHOOTOUT_SCORE = "shootOutScore";
MLSoccerEvent.SHOOTOUT_MISS = "shootOutMiss";
MLSoccerEvent.SHOOTOUT_TO_TAKE = "shootOutToTake";
MLSoccerEvent.PENALTY_GOALS = "penaltyGoals";
MLSoccerEvent.GENERAL_ALERT = "generalAlert";
MLSoccerEvent.TEAM_ALERT = "teamAlert";
MLSoccerEvent.CORNER_EVENT = "cornerEvent";
MLSoccerEvent.CARD_EVENT = "cardEvent";
SoccerAlerts = {SUBSTITUTION: "substitution", KICK_OFF: "kickOff", HALF_TIME: "halfTime", SECOND_HALF: "secondHalf", FULL_TIME: "fullTime", START_EXTRA_TIME_1: "startET1", EXTRA_TIME_HT: "eTHalfTime", START_EXTRA_TIME_2: "startET2", END_EXTRA_TIME: "endET", PENALTY_SHOOTOUT: "penaltyShoot", PENALTY_MISSED: "penaltyMissed", INJURY: "injury", INJURY_TIME: "injuryTime", SHOT_ON_TARGET: "shotOnTarget", SHOT_OFF_TARGET: "shotOffTarget"};
var ZonalPostioning = {getZoneId: function (a, d) {
  var c, b = false;
  for (val in a)if (a[val] == d) {
    b = true;
    break
  }
  c = b
    ? d
    : a.DEFAULT;
  return c
}, FreeKick: {DEFAULT: "5", ZONE1: "1", ZONE2: "2", ZONE3RIGHT: "4", ZONE3LEFT: "3", ZONE4: "5", ZONE5: "6"}, Corner: {DEFAULT: "2", TOP: "1", BOTTOM: "2"}, Throw: {DEFAULT: "0", SAFE_BOTTOM: "1", SAFE_TOP: "2", HALFWAY_BOTTOM: "3", HALFWAY_TOP: "4", DANGER_BOTTOM: "5", DANGER_TOP: "6"}};
SoccerPitchView = function (b, d) {
  var c = ns_gen5_util.Delegate, a = this;
  this.soccerModel = b;
  this.request = null;
  this.currentTime = 0;
  this.globalIntensity = 0;
  this.currentDelay = 0;
  this.previousClipID = "";
  this.previousEvent = null;
  this.pitchWidth = d;
  this.SHOOTOUT_PERIOD = "4";
  a.init = function () {
    $(window).on("resize", function () {
      MatchLiveGlobal.liquidLayout();
      a.pitchWidth = MatchLiveGlobal.getMatchLiveWidth();
      a.previousEvent && a.previousEvent.intensity && a.drawBG(a.previousEvent.team + "possessionBG", a.intensityValue(a.previousEvent.intensity))
    });
    a.clearEvents();
    a.setInfo(b.stat5Name);
    a.setPitch(b.stat6Name);
    Modernizr.svg && Modernizr.inlinesvg && a.setTeamKit();
    a.checkPeriod(b.period)
  };
  a.clearEvents = function () {
    $("#eventsContainer > *").removeClass("opaque").addClass("transparent")
  };
  a.setPitch = function (e) {
    var c = a.InfoLookup.Pitch[e], d = b.getMatchLiveMLValue(c);
    if (typeof d != "undefined") {
      $("#arena").removeClass().addClass(c);
      $("#pitchCon").html("<b>" + b.getMatchLiveMLValue("pitch") + "</b> " + d)
    }
  };
  a.setTeamKit = function () {
    if (b.team1KitColour.length == 0 || b.team2KitColour.length == 0)return;
    $(".teamKit1").setKitAttrs(b.team1KitImagePath, b.team1KitColour);
    $(".teamKit2").setKitAttrs(b.team2KitImagePath, b.team2KitColour);
    $("#matchLive .kitimg").applyKitColour()
  };
  a.setInfo = function (f) {
    if (f.indexOf("#") > -1) {
      var h = "pregameInfo", e = f.split("#"), i = e[0], g = parseInt(e[1]), c = a.InfoLookup.Weather[g], d = $("#weatherCon > span");
      $("#pregameHeader").html(b.getMatchLiveMLValue("kickOffMatchInfo") + " " + i);
      $("#teamLeft").html(b.team1Name);
      $("#teamRight").html(b.team2Name);
      if (typeof c != "undefined") {
        d.text(b.getMatchLiveMLValue(c));
        jQuery("<b/>", {"class": c}).prependTo(d)
      }
      a.transitionClip(h)
    }
  };
  a.setTeamNameLabel = function (c, d) {
    var a = $("#" + c).find(".team");
    a.html(b.getTeamName(d))
  };
  a.setEventLabel = function (d, c) {
    var a = $("#" + d).find(".type");
    a.html(b.getMatchLiveMLValue(c))
  };
  a.displayPossessionAnim = function (c, d) {
    var f = a.previousClipID.search("possession") >= 0, b = c + "possession";
    a.setEventLabel(b, d);
    a.setTeamNameLabel(b, c);
    $("#" + b).removeClass("safe attack danger").addClass(d);
    if (f && c == a.previousEvent.team) {
      a.changePossessionBackground(a.previousEvent, {team: c, intensity: d});
      $("#" + b + ".eventNoMovement").toggleClass("event eventNoMovement")
    }
    else {
      $("#" + b + ".event").toggleClass("event eventNoMovement");
      a.previousClipID != "" && $("#" + a.previousClipID + ".event").toggleClass("event eventNoMovement");
      var e = c + "possessionBG";
      a.drawBG(e, a.intensityValue(d));
      $("#" + e).removeClass("transparent").addClass("opaque")
    }
    a.transitionClip(b);
    $("#eventsContainer").removeClass().addClass("events possession " + c);
    a.previousEvent = {team: c, intensity: d};
    a.previousClipID = b
  };
  a.displayImageAnim = function (c, d) {
    var b = "animImageEvent", e = d;
    a.setEventLabel(b, d);
    a.setTeamNameLabel(b, c);
    a.transitionClip(b, e, c);
    a.previousEvent = {team: c}
  };
  a.displayZonalAnim = function (c, d, f) {
    var b = "animZonalEvent", e = d + " zone" + f;
    a.setEventLabel(b, d);
    a.setTeamNameLabel(b, c);
    a.transitionClip(b, e, c);
    a.previousEvent = {team: c}
  };
  a.displayGeneralAlert = function (c) {
    var b = "genericEvent", d = $("#" + b + " > p");
    if (a.previousClipID == b)a.transitionText(d, c);
    else {
      a.transitionClip(b);
      d.html(c)
    }
  };
  a.displayGeneralTeamAlert = function (d, h) {
    var c = "genericTeamEvent", g = b.getTeamName(h), f = $("#" + c + " .team"), e = $("#" + c + " .type");
    if (a.previousClipID == c)a.transitionText(e, d, f, g);
    else {
      f.html(g);
      e.html(d);
      a.transitionClip(c)
    }
  };
  a.checkPeriod = function (b) {
    b == a.SHOOTOUT_PERIOD && a.displayShootoutGrid()
  };
  a.displayShootoutGrid = function () {
    var c = "shootout";
    a.setEventLabel(c, "penaltyshootout");
    $("#team1" + c).html(b.team1Name);
    $("#team2" + c).html(b.team2Name);
    b.penaltyGoals && a.displayShootoutGoals(b.penaltyGoals);
    a.transitionClip(c);
    a.previousClipID = c
  };
  a.displayShootoutGoals = function (l) {
    var c = 5, g, d, b, a, h;
    g = l;
    if (g.indexOf("~") > -1) {
      d = g.split("~");
      b = Math.max.apply(Math, d.map(function (a) {
        return a.split(",").length
      }));
      if (b > 0) {
        h = b > c
          ? true
          : false;
        var i = 1;
        if (h)i = b - c + 1;
        $("#penNo").children("th").each(function () {
          if ($(this).text().trim().length > 0) {
            $(this).html(i);
            i++
          }
        });
        for (var e = 0; e < d.length; e++) {
          a = d[e].split(",");
          h && a.splice(0, b - c);
          if (a.length > 0)for (var k = 2, f = 0; f < c; f++) {
            var m = e + 1, n = $("#t" + m + " > td:nth-child(" + k + ")"), j = "";
            if (a[f])j = a[f] > 0
              ? "score"
              : "miss";
            $(n).attr("class", j);
            k++
          }
        }
      }
    }
  };
  a.displaySubstitution = function (h, e, c) {
    if (c && c.indexOf("#") > -1) {
      var b = "substitutionEvent", d = c.split("#"), f = d[0], g = d[1];
      a.setTeamNameLabel(b, h);
      a.setEventLabel(b, e);
      $("#" + b).find(".off").html(f);
      $("#" + b).find(".on").html(g);
      a.transitionClip(b)
    }
  };
  a.onPossessionHandler = function (c) {
    var b = c.data;
    a.displayPossessionAnim(b.team, b.intensity)
  };
  a.onThrowHandler = function (b) {
    a.displayZonalAnim(b.data.team, "throw", b.data.zoneId)
  };
  a.onGoalHandler = function (b) {
    a.displayImageAnim(b.data.team, "goal")
  };
  a.onRedCardHandler = function (b) {
    a.displayImageAnim(b.data.team, "redcard")
  };
  a.onYellowCardHandler = function (b) {
    a.displayImageAnim(b.data.team, "yellowcard")
  };
  a.onOffsideHandler = function (b) {
    a.currentDelay += 3e3;
    a.displayImageAnim(b.data.team, "offside")
  };
  a.onCornerHandler = function (b) {
    a.displayZonalAnim(b.data.team, "corner", b.data.zoneId)
  };
  a.onGoalKickHandler = function (b) {
    a.displayZonalAnim(b.data.team, "goalkick", "")
  };
  a.onPenaltyHandler = function (b) {
    a.displayImageAnim(b.data.team, "penalty")
  };
  a.onFreeKickHandler = function (c) {
    var b = "";
    switch (c.data.zoneId) {
      case ZonalPostioning.FreeKick.ZONE1:
      case ZonalPostioning.FreeKick.ZONE2:
      case ZonalPostioning.FreeKick.ZONE3LEFT:
      case ZonalPostioning.FreeKick.ZONE3RIGHT:
        b = "dfreekick";
        break;
      case ZonalPostioning.FreeKick.ZONE4:
      case ZonalPostioning.FreeKick.ZONE5:
        b = "sfreekick"
    }
    setTimeout(function () {
      a.displayZonalAnim(c.data.team, b, c.data.zoneId);
      a.currentDelay = 0
    }, a.currentDelay)
  };
  a.onGeneralAlertHandler = function (e) {
    var d, c = "";
    switch (e.data.alert) {
      case SoccerAlerts.KICK_OFF:
        c = "kickoff";
        break;
      case SoccerAlerts.HALF_TIME:
        c = "halftime";
        break;
      case SoccerAlerts.SECOND_HALF:
        c = "secondhalf";
        break;
      case SoccerAlerts.FULL_TIME:
        c = "fulltime";
        break;
      case SoccerAlerts.START_EXTRA_TIME_1:
        c = "startExtraTime1";
        break;
      case SoccerAlerts.EXTRA_TIME_HT:
        c = "extraTimeHT";
        break;
      case SoccerAlerts.START_EXTRA_TIME_2:
        c = "startExtraTime2";
        break;
      case SoccerAlerts.END_EXTRA_TIME:
        c = "endOfExtraTime";
        break;
      case SoccerAlerts.PENALTY_SHOOTOUT:
        c = "penaltyshootout";
        break;
      case SoccerAlerts.INJURY:
        c = "injury";
        break;
      case SoccerAlerts.INJURY_TIME:
        c = "injuryTime"
    }
    d = b.getMatchLiveMLValue(c);
    a.displayGeneralAlert(d)
  };
  a.onTeamAlertHandler = function (e) {
    var d, c = "";
    switch (e.data.alert) {
      case SoccerAlerts.SUBSTITUTION:
        c = "substitution";
        break;
      case SoccerAlerts.PENALTY_MISSED:
        c = "penaltymissed";
        break;
      case SoccerAlerts.SHOT_ON_TARGET:
        c = "shotongoal";
        break;
      case SoccerAlerts.SHOT_OFF_TARGET:
        c = "shotoffgoal"
    }
    d = b.getMatchLiveMLValue(c);
    a.displayGeneralTeamAlert(d, e.data.team)
  };
  a.onPeriodHandler = function (b) {
    a.checkPeriod(b.data.period)
  };
  a.onShootoutGoalsHandler = function (b) {
    a.displayShootoutGoals(b.data.goals)
  };
  a.onShootoutAlertHandler = function (d) {
    var e, c = "", f = true;
    switch (d.type) {
      case MLSoccerEvent.SHOOTOUT_SCORE:
        c = "score";
        a.displayImageAnim(d.data.team, c);
        break;
      case MLSoccerEvent.SHOOTOUT_MISS:
        c = "missed";
        e = b.getMatchLiveMLValue(c).toUpperCase();
        a.displayGeneralTeamAlert(e, d.data.team);
        break;
      case MLSoccerEvent.SHOOTOUT_TO_TAKE:
        c = "abouttotake";
        a.displayImageAnim(d.data.team, c);
        f = false
    }
    f && setTimeout(function () {
      a.displayShootoutGrid()
    }, 3e3)
  };
  a.onSubstitutionHandler = function (b) {
    a.displaySubstitution(b.data.team, b.type, b.data.playerInfo)
  };
  a.onMatchInfoHandler = function (c) {
    var d = c.data.statNum, b = c.data.name;
    switch (d) {
      case"5":
        a.setInfo(b);
        break;
      case"6":
        a.setPitch(b)
    }
  };
  a.delegate_onPossessionHandler = new c(a, a.onPossessionHandler);
  a.delegate_onGoalHandler = new c(a, a.onGoalHandler);
  a.delegate_onThrowHandler = new c(a, a.onThrowHandler);
  a.delegate_onCornerHandler = new c(a, a.onCornerHandler);
  a.delegate_onRedCardHandler = new c(a, a.onRedCardHandler);
  a.delegate_onYellowCardHandler = new c(a, a.onYellowCardHandler);
  a.delegate_onOffsideHandler = new c(a, a.onOffsideHandler);
  a.delegate_onGoalKickHandler = new c(a, a.onGoalKickHandler);
  a.delegate_onPenaltyHandler = new c(a, a.onPenaltyHandler);
  a.delegate_onFreeKickHandler = new c(a, a.onFreeKickHandler);
  a.delegate_onGeneralAlertHandler = new c(a, a.onGeneralAlertHandler);
  a.delegate_onTeamAlertHandler = new c(a, a.onTeamAlertHandler);
  a.delegate_onShootoutGoalsHandler = new c(a, a.onShootoutGoalsHandler);
  a.delegate_onShootoutAlertHandler = new c(a, a.onShootoutAlertHandler);
  a.delegate_onSubstitutionHandler = new c(a, a.onSubstitutionHandler);
  a.delegate_onPeriodHandler = new c(a, a.onPeriodHandler);
  a.delegate_onMatchInfoHandler = new c(a, a.onMatchInfoHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.POSSESSION, a.delegate_onPossessionHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.GOAL, a.delegate_onGoalHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.THROW, a.delegate_onThrowHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.THROW_ZONE, a.delegate_onThrowHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.CORNER, a.delegate_onCornerHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.CORNER_ZONE, a.delegate_onCornerHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.RED_CARD, a.delegate_onRedCardHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.YELLOW_CARD, a.delegate_onYellowCardHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.OFFSIDE, a.delegate_onOffsideHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.GOAL_KICK, a.delegate_onGoalKickHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.PENALTY, a.delegate_onPenaltyHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.FREE_KICK, a.delegate_onFreeKickHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.FREE_KICK_ZONE, a.delegate_onFreeKickHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.GENERAL_ALERT, a.delegate_onGeneralAlertHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.TEAM_ALERT, a.delegate_onTeamAlertHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.PENALTY_GOALS, a.delegate_onShootoutGoalsHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.SHOOTOUT_SCORE, a.delegate_onShootoutAlertHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.SHOOTOUT_MISS, a.delegate_onShootoutAlertHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.SHOOTOUT_TO_TAKE, a.delegate_onShootoutAlertHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.SUBSTITUTION, a.delegate_onSubstitutionHandler);
  a.soccerModel.addEventListener(MatchLiveEvent.PERIOD, a.delegate_onPeriodHandler);
  a.soccerModel.addEventListener(MatchLiveEvent.STAT_NAME_EVENT, a.delegate_onMatchInfoHandler);
  a.transitionText = function (c, b, a, d) {
    $(c).fadeOut(function () {
      $(this).html(b).fadeIn()
    });
    $(a) && $(a).fadeOut(function () {
      $(this).html(d).fadeIn()
    })
  };
  a.transitionClip = function (b, c, d) {
    if (a.previousClipID == b && !c)return;
    $("#" + a.previousClipID).removeClass("opaque").addClass("transparent");
    a.previousClipID.search("possession") >= 0 && $("#" + a.previousClipID + "BG").removeClass("opaque").addClass("transparent");
    if (c) {
      $("#eventsContainer").removeClass().addClass("events " + d + " " + c);
      $("#" + b).removeClass().addClass(d + " " + c + " opaque anim")
    }
    else {
      $("#eventsContainer").removeClass().addClass("events");
      $("#" + b).removeClass("transparent").addClass("opaque")
    }
    a.previousClipID = b
  };
  a.changePossessionBackground = function (d, b) {
    var f = new Date, g = f.getTime(), c = a.intensityValue(d.intensity), e = a.intensityValue(b.intensity);
    a.globalIntensity = c;
    a.animate(g, c, e, b.team)
  };
  a.intensityValue = function (a) {
    switch (a) {
      case"safe":
        return 0;
      case"attack":
        return.5;
      case"danger":
        return 1;
      default:
        return 0
    }
  };
  a.animate = function (d, c, b, g) {
    var k = new Date, h = k.getTime(), f = h - d, e = 1e3;
    if (b > c) {
      var i = (b - c) / e * f;
      a.globalIntensity += i;
      if (a.globalIntensity >= b) {
        window.cancelRequestAnimFrame(a.request);
        return
      }
    }
    else {
      var j = (c - b) / e * f;
      a.globalIntensity -= j;
      if (a.globalIntensity <= b) {
        window.cancelRequestAnimFrame(a.request);
        return
      }
    }
    a.drawBG(g + "possessionBG", a.globalIntensity);
    d = h;
    a.request = window.requestAnimFrame(function () {
      a.animate(d, c, b, g)
    })
  };
  a.drawBG = function (l, g) {
    var j = a.pitchWidth, c = j * .39, d = j * .98, k = $("canvas");
    $(k).attr("width", d);
    $(k).attr("height", c);
    var n = d / 426, m = .85 * d, i = .5 * d, o = 20 * n, e = i + (m - i) * g, f = o * g, p = document.getElementById(l), b = p.getContext("2d");
    b.clearRect(0, 0, d, c);
    var h = b.createLinearGradient(0, 0, d, c);
    if (l.substr(0, 5) == "team1") {
      b.beginPath();
      b.moveTo(0, 0);
      b.lineTo(e, 1);
      b.lineTo(e + f, c / 6);
      b.lineTo(e, c / 6 * 2);
      b.lineTo(e + f, c / 6 * 3);
      b.lineTo(e, c / 6 * 4);
      b.lineTo(e + f, c / 6 * 5);
      b.lineTo(e, c);
      b.lineTo(0, c);
      b.closePath();
      h.addColorStop(0, "rgba(0,0,0," + (.3 + g * .2) + ")");
      h.addColorStop(.6, "rgba(153,0,51," + (.1 + g * .2) + ")")
    }
    else {
      b.beginPath();
      b.moveTo(d, 1);
      b.lineTo(d - e, 0);
      b.lineTo(d - e - f, c / 6);
      b.lineTo(d - e, c / 6 * 2);
      b.lineTo(d - e - f, c / 6 * 3);
      b.lineTo(d - e, c / 6 * 4);
      b.lineTo(d - e - f, c / 6 * 5);
      b.lineTo(d - e, c);
      b.lineTo(d, c);
      b.closePath();
      h.addColorStop(0, "rgba(0,0,0," + (.2 + g * .2) + ")");
      h.addColorStop(.6, "rgba(153,0,51," + (.1 + g * .2) + ")")
    }
    b.fillStyle = h;
    b.fill()
  };
  a.dispose = function () {
    a.soccerModel.removeEventListener(MLSoccerEvent.POSSESSION, a.delegate_onPossessionHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.GOAL, a.delegate_onGoalHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.THROW, a.delegate_onThrowHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.THROW_ZONE, a.delegate_onThrowHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.CORNER, a.delegate_onCornerHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.CORNER_ZONE, a.delegate_onCornerHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.RED_CARD, a.delegate_onRedCardHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.YELLOW_CARD, a.delegate_onYellowCardHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.OFFSIDE, a.delegate_onOffsideHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.GOAL_KICK, a.delegate_onGoalKickHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.PENALTY, a.delegate_onPenaltyHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.FREE_KICK, a.delegate_onFreeKickHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.FREE_KICK_ZONE, a.delegate_onFreeKickHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.GENERAL_ALERT, a.delegate_onGeneralAlertHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.TEAM_ALERT, a.delegate_onTeamAlertHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.PENALTY_GOALS, a.delegate_onShootoutGoalsHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.SHOOTOUT_SCORE, a.delegate_onShootoutAlertHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.SHOOTOUT_MISS, a.delegate_onShootoutAlertHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.SHOOTOUT_TO_TAKE, a.delegate_onShootoutAlertHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.SUBSTITUTION, a.delegate_onSubstitutionHandler);
    a.soccerModel.removeEventListener(MatchLiveEvent.PERIOD, a.delegate_onPeriodHandler);
    a.soccerModel.removeEventListener(MatchLiveEvent.STAT_NAME_EVENT, a.delegate_onMatchInfoHandler);
    a.soccerModel = null
  };
  a.InfoLookup = {Weather: {0: "good", 1: "windy", 2: "stormy", 3: "rainy", 4: "snowy", 5: "veryHot", 6: "heavyRain", 7: "lightRain", 8: "cloudy", 9: "heavySnow", 10: "lightSnow", 11: "sleetHail", 12: "highWind", 13: "lightWind", 14: "sunny", 15: "hot", 16: "mild", 17: "cold", 18: "fog", 19: "thunderstorm"}, Pitch: {0: "good", 1: "wet", 2: "snowy", 3: "excellent", 4: "regular", 5: "wetAndFast", 6: "slowDueToWater", 7: "unevenCuttingUp", 8: "goalmouthsAffected", 9: "hardFrozen", 10: "artificialTurf"}};
  var e = a.init()
};
SoccerStatsView = function (b) {
  var c = ns_gen5_util.Delegate, a = this;
  this.soccerModel = b;
  a.init = function () {
    $("#team1Name").html(a.soccerModel.team1Name);
    $("#team2Name").html(a.soccerModel.team2Name);
    a.displayScore("team1", a.soccerModel.team1Score);
    a.displayScore("team2", a.soccerModel.team2Score);
    a.displayGraphStats(a.soccerModel.statsAvailable);
    a.displayStat("team1", 1, a.soccerModel.team1Stat1);
    a.displayStat("team2", 1, a.soccerModel.team2Stat1);
    a.displayStat("team1", 2, a.soccerModel.team1Stat2);
    a.displayStat("team2", 2, a.soccerModel.team2Stat2);
    a.displayStat("team1", 3, a.soccerModel.team1Stat3);
    a.displayStat("team2", 3, a.soccerModel.team2Stat3);
    a.displayStat("team1", 4, a.soccerModel.team1Stat4);
    a.displayStat("team2", 4, a.soccerModel.team2Stat4);
    a.displayCard("team1", "yellow", a.soccerModel.team1YellowCards);
    a.displayCard("team2", "yellow", a.soccerModel.team2YellowCards);
    a.displayCard("team1", "red", a.soccerModel.team1RedCards);
    a.displayCard("team2", "red", a.soccerModel.team2RedCards);
    a.displayCorner("team1", a.soccerModel.team1Corners);
    a.displayCorner("team2", a.soccerModel.team2Corners);
    return true
  };
  a.displayGraphStats = function (d) {
    var b = $("#noStats"), c = $("#statsGraphs");
    if (d) {
      a.setGraphStatsLabels();
      a.setTeamBarColours();
      $(c).show();
      $(b).hide()
    }
    else {
      $(c).hide();
      $(b).show()
    }
  };
  a.setTeamBarColours = function () {
    if (b.team1Colour.length > 0 && b.team2Colour.length > 0) {
      var a = $("div.bar");
      a.each(function () {
        $(this).css("background-color", b.team1Colour);
        $(this).children("span").css("background-color", b.team2Colour)
      })
    }
  };
  a.setGraphStatsLabels = function () {
    $("#stat1 > span.title").html(b.stat1Name);
    $("#stat2 > span.title").html(b.stat2Name);
    $("#stat3 > span.title").html(b.stat3Name);
    $("#stat4 > span.title").html(b.stat4Name)
  };
  a.displayStat = function (d, c, a) {
    var j = "#stat" + c + " ." + d + "Amt", k = $(j);
    k.html(a.toString());
    var g = d == "team1"
      ? "team2"
      : "team1", f = "#stat" + c + " ." + g + "Amt", b = $(f).html(), i = parseInt(a) + parseInt(b), h = d == "team1"
      ? parseInt(b)
      : parseInt(a), e = 50;
    if (a > 0 || b > 0)e = Math.round(h / i * 100);
    $("#stat" + c + " .bar span").css("width", e + "%")
  };
  a.displayCard = function (d, a, b) {
    var c = "#" + d + "IconStats .card." + a, e = $(c);
    e.html(b.toString())
  };
  a.displayScore = function (b, a) {
    var c = $("#" + b + "score");
    c.html(a.toString())
  };
  a.displayCorner = function (c, a) {
    var b = "#" + c + "IconStats .corners", d = $(b);
    d.html(a.toString())
  };
  a.cardEventHandler = function (c) {
    var b = c.data;
    a.displayCard(b.team, b.colour, b.value)
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
  a.cornerEventHandler = function (c) {
    var b = c.data;
    a.displayCorner(b.team, b.value)
  };
  a.delegate_statsAvailableEventHandler = new c(a, a.statsAvailableEventHandler);
  a.delegate_statEventHandler = new c(a, a.statEventHandler);
  a.delegate_cardEventHandler = new c(a, a.cardEventHandler);
  a.delegate_scoreEventHandler = new c(a, a.scoreEventHandler);
  a.delegate_cornerEventHandler = new c(a, a.cornerEventHandler);
  a.soccerModel.addEventListener(MatchLiveEvent.STATS_AVAILABLE_EVENT, a.delegate_statsAvailableEventHandler);
  a.soccerModel.addEventListener(MatchLiveEvent.STAT_EVENT, a.delegate_statEventHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.CARD_EVENT, a.delegate_cardEventHandler);
  a.soccerModel.addEventListener(MatchLiveEvent.SCORE, a.delegate_scoreEventHandler);
  a.soccerModel.addEventListener(MLSoccerEvent.CORNER_EVENT, a.delegate_cornerEventHandler);
  a.dispose = function () {
    a.soccerModel.removeEventListener(MatchLiveEvent.STATS_AVAILABLE_EVENT, a.delegate_statsAvailableEventHandler);
    a.soccerModel.removeEventListener(MatchLiveEvent.STAT_EVENT, a.delegate_statEventHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.CARD_EVENT, a.delegate_cardEventHandler);
    a.soccerModel.removeEventListener(MatchLiveEvent.SCORE, a.delegate_scoreEventHandler);
    a.soccerModel.removeEventListener(MLSoccerEvent.CORNER_EVENT, a.delegate_cornerEventHandler);
    a.soccerModel = null
  };
  var d = a.init()
};
function soccerstatsview_loaded() {
  $(document).trigger("statsviewloaded")
}
function soccerall_loaded() {
  $(document).trigger("statsviewloaded")
}