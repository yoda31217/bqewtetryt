PollingUpdateHelper = function () {
};
getPollingUpdateHelper = function () {
  if (!PollingUpdateHelper._instance) {
    PollingUpdateHelper._instance = new BaseUpdateHelper().extend({subscribe: function () {
      var a = this.sendRequest.bind(this);
      window.setTimeout(a, initData.update_interval);
    }, Init: function () {
      this.subscribe();
    }});
  }
  return PollingUpdateHelper._instance;
};