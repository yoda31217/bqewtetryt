(function (a) {
  ScorersHelper = {selectScorerFromList: function (d, c, b) {
    getScorersHelper().hideScorersLinks(c);
    a("#" + c).hide();
    a("#" + d).show();
  }, toggleScorersLinks: function (b) {
    if (a("#" + b).is(":visible")) {
      getScorersHelper().showScorersLinks(b);
    }
    else {
      getScorersHelper().hideScorersLinks(b);
    }
  }, hideOpenScorersLinks: function () {
    a("tr[id*='scorer']:visible").each(function () {
      getScorersHelper().hideScorersLinks(a(this).attr("id"));
    });
  }, showScorersLinks: function (b) {
    getScorersHelper().hideOpenScorersLinks();
    a("#" + b).find(".players-links").show();
    a("#" + b).find(".player-name").hide();
  }, hideScorersLinks: function (b) {
    a("#" + b).find(".players-links").hide();
    a("#" + b).find(".player-name").show();
  }, initialization: function () {
    a(document).delegate("[data-plus-scorers]", "click", function () {
      getScorersHelper().toggleScorersLinks(a(this).parent().attr("id"));
    });
    a(document).delegate(".players-links a", "mouseenter", function () {
      a(this).addClass("active-scorer");
    });
    a(document).delegate(".players-links a", "mouseleave", function () {
      a(this).removeClass("active-scorer");
    });
  }};
  getScorersHelper = function () {
    return ScorersHelper;
  };
  ScorersHelper.initialization();
}(window.jQuery));