$("body").keydown(function (event) {

  if (event.which !== 87 || !event.ctrlKey || !event.shiftKey) return;

  var linkEls = $('#MainCPH_eventSort > table > tbody > tr > td.name.table-participant > a');
  var linkIdx = 0

  var interval = 5000;

  var openWindowsChain = function () {
    if (linkIdx >= linkEls.length) {
      window.alert('Opened.')
      return;
    }

    window.open(linkEls[linkIdx].href);

    linkIdx++;
    window.setTimeout(openWindowsChain, interval);
  };

  window.setTimeout(openWindowsChain, interval);

});
