(function (e) {
  var c = {Init: function () {
    Markets.ONLY_ONE_EVENT_OPEN_AM = true;
  }, scrollToEvent: function (j) {
    var k = null;
    if (j) {
      k = e("#event_" + j).parents(".main-block-events")[0];
    }
    else {
      var i = e(".main-block-events");
      if (i.length > 0) {
        k = i[0];
      }
    }
  }};
  window.getLiveHelper = function () {
    return c;
  };
  function g() {
    var i = e(this);
    var j = i.closest("[data-sport-group]").data("sportGroup");
    e("[data-category-sport='" + j + "'] .live-selection").prop("checked", this.checked);
  }

  function f() {
    e("#sportsMenu .group-selection").prop("checked", false).change();
    e(this).siblings(".group-selection").prop("checked", true).change();
    e(".but-show").click();
  }

  function b(i, j) {
    location.href = getLivesUrl(i, j);
  }

  function h() {
    var i = e(this).closest("[data-category-treeId]").find("[data-event-treeId]").map(function () {
      return e(this).attr("data-event-treeId");
    }).get();
    b(i, i.length == 1);
  }

  function a() {
    var j = e(this).closest("[data-category-sport]").data("categorySport");
    var i = e("[data-category-sport='" + j + "'] .live-selection:not(:checked)").length == 0;
    e(".main-sport-category[data-sport-group='" + j + "'] input").prop("checked", i);
  }

  function d(i) {
    if (i != null && !e(i.target).is("input") && !e(i.target).is("a") && e(i.target).parents("a").length == 0) {
      window.location = e(this).data("href");
    }
  }

  e(document).ready(function () {
    e("#sportsMenu").delegate(".group-selection", "change", g).delegate("[data-sport-group] a", "click", f);
    e("#container_AVAILABLE").delegate("[data-category-treeId] .block-events-head > a", "click", h).delegate(".available-event", "click", d);
    e("#page_content").delegate("input.live-selection", "change", a);
  });
  e(window).load(function () {
    var i = e(".main-block-events:first");
    if (i.length) {
      var j = i.position().top;
      j -= (parseInt(i.closest(".padding-top").css("paddingTop")) || 0);
      e(".body-content").animate({scrollTop: j}, 300);
    }
  });
})(jQuery);