function HomeHelper() {
  this.Init = function () {
  };
}
HomeHelper.getLiveSelections = function () {
  return HomeHelper._getSelections("live-selection");
};
HomeHelper.getLiveSelectionIDs = function () {
  return HomeHelper.getSelectionIDs(HomeHelper.getLiveSelections());
};
HomeHelper.getSimpleSelectionIDs = function () {
  var catTreeIds = [];
  $(":checkbox.group-selection[data-tree-ids]").each(function () {
    var groupCB = $(this);
    var treeIds = eval(groupCB.data("tree-ids"));
    if (groupCB.is(":checked")) {
      $.merge(catTreeIds, treeIds);
    }
    else {
      for (var i = 0; i < treeIds.length; i++) {
        $(":checkbox.simple-selection:checked[data-top-sport-id = " + treeIds[i] + "]").each(function () {
          catTreeIds[catTreeIds.length] = this.id;
        });
      }
    }
  });
  return catTreeIds;
};
HomeHelper.getSelectionIDs = function (b) {
  var c = [];
  for (var a = 0; a < b.length; a++) {
    if (b[a].checked == true) {
      c.push(b[a].id);
    }
  }
  return c;
};
HomeHelper.getGroupSelections = function () {
  return HomeHelper._getSelections("group-selection");
};
HomeHelper.getSimpleSelections = function () {
  return HomeHelper._getSelections("simple-selection");
};
HomeHelper.clearSelections = function () {
  HomeHelper.clearGroupSelections();
  HomeHelper.clearSimpleSelections();
  HomeHelper.clearLiveSelections();
};
HomeHelper.clearGroupSelections = function () {
  var b = HomeHelper.getGroupSelections();
  for (var a = 0; a < b.length; a++) {
    b[a].checked = false;
  }
};
HomeHelper.clearSimpleSelections = function () {
  var b = HomeHelper.getSimpleSelections();
  for (var a = 0; a < b.length; a++) {
    b[a].checked = false;
  }
};
HomeHelper.clearLiveSelections = function () {
  var b = HomeHelper.getLiveSelections();
  for (var a = 0; a < b.length; a++) {
    b[a].checked = false;
  }
};
HomeHelper._getSelections = function (b, c) {
  var a = $("#" + (c || "page_content"));
  return $(":checkbox." + b, a);
};
HomeHelper.EVENTS_SELECTOR_COOKIE_NAME = "escn";
HomeHelper.putEventsSelectorCookie = function () {
};
HomeHelper.removeEventsSelectorCookie = function () {
};
HomeHelper._instance = null;
function getHomeHelper() {
  if (!HomeHelper._instance) {
    HomeHelper._instance = new HomeHelper();
  }
  return HomeHelper._instance;
}