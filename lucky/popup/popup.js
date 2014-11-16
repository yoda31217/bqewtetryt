$(document).ready(function () {

  var createOnIdentifyClickHandler = function (organisation) {
    return function () {
      var activeTabsFoundHandler = function (tabs) {
        if (0 === tabs.length) {
          chrome.runtime.sendMessage({type: 'error', text: 'There is NO active Tab!'});
          return;
        }

        chrome.runtime.sendMessage({type: 'tab-identify', tab: {organisation: organisation, id: tabs[0].id}});
      };
      chrome.tabs.query({active: true, currentWindow: true}, activeTabsFoundHandler);
    };
  };

  $('#identifyKamazButton').click(createOnIdentifyClickHandler('K'));
  $('#identifyFordButton').click(createOnIdentifyClickHandler('F'));
  $('#identifyVolvoButton').click(createOnIdentifyClickHandler('V'));

});


