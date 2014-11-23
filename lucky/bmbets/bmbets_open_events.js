$("body").keydown(function (event) {

  if (event.which !== 87 || !event.ctrlKey || !event.shiftKey) return;

  var linkEls = $('#MainCPH_eventSort > table > tbody > tr > td.name.table-participant > .activate');
  var linkIdx = 0

  var interval = 5000;

  var openWindowsChain = function () {
    if (linkIdx >= linkEls.length) {
      chrome.runtime.sendMessage({type: 'info', text: 'Events opened!'});
      return;
    }

    var openedWindow = window.open(linkEls[linkIdx].href);
    openedWindow.window.openedByLucky = true;

    linkIdx++;
    window.setTimeout(openWindowsChain, interval);
  };

  window.setTimeout(openWindowsChain, interval);

});

window.setTimeout(function () {

  if (!window.openedByLucky) return;

  if (0 === $('#eventValueBets > div > table > tbody > tr > td.count > div > a > span.BK.b17').length) window.close();

}, 30000);
