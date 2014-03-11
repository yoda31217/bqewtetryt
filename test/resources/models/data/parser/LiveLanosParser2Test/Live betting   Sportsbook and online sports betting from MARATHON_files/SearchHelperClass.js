SearchHelper = function () {
  this.navigateTo = function (a) {
    $$("searchForm").searchPage.value = a;
    $$("searchForm").submit();
  };
  this.navigateForward = function () {
    $$("searchForm").searchPage.value = $$("searchForm").searchPage.value * 1 + 1;
    $$("searchForm").submit();
  };
  this.navigateBack = function () {
    $$("searchForm").searchPage.value = $$("searchForm").searchPage.value * 1 - 1;
    $$("searchForm").submit();
  };
};
function validateSearchStringLingth() {
  var a = new RegExp("^[^%_]{3,}$");
  var b = $$("searchForm")["searchText"].value;
  if (($.trim(b) == "") || (!a.test(b))) {
    $("#sherror").modal({position: ["20%"]});
    window.event && (window.event.returnValue = false);
    return false;
  }
}
SearchHelper._instance = null;
function getSearchHelper() {
  if (!SearchHelper._instance) {
    SearchHelper._instance = new SearchHelper();
  }
  return SearchHelper._instance;
}