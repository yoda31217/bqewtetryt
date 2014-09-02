var organisation2tab = {};

function onEventSelectHandler(event) {
  if (!organisation2tab[event.organisation1]) {
    chrome.runtime.sendMessage({type: 'error', text: event.organisation1 + ' Tab is NOT identified!'});
    return;
  }

  if (!organisation2tab[event.organisation2]) {
    chrome.runtime.sendMessage({type: 'error', text: event.organisation2 + ' Tab is NOT identified!'});
    return;
  }

  chrome.tabs.update(organisation2tab[event.organisation1], {active: true}, function (tab) {
    chrome.tabs.sendMessage(tab.id, {sport: event.sport, id: event.id1}, function () {
    });
  })

  chrome.tabs.update(organisation2tab[event.organisation2], {active: true}, function (tab) {
    chrome.tabs.sendMessage(tab.id, {sport: event.sport, id: event.id2}, function () {
    });
  })
}

function sendUserNotification(title, text) {
  chrome.notifications.create('', {
    type: 'basic',
    title: title,
    message: text,
    iconUrl: 'meta/icon.png'
  }, function () {
  });
}

function onErrorHandler(text) {
  sendUserNotification('ERROR!', text);
}

function onInfoHandler(text) {
  sendUserNotification('INFO!', text);
}

function onTabIdentifyHandler(tab) {
  organisation2tab[tab.organisation] = tab.id;
}

chrome.runtime.onMessage.addListener(function (message) {

  if ('event-select' === message.type)
    onEventSelectHandler(message.event);

  else if ('tab-identify' === message.type)
    onTabIdentifyHandler(message.tab);

  else if ('error' === message.type)
    onErrorHandler(message.text);

  else if ('info' === message.type)
    onInfoHandler(message.text);

  else {
    onInfoHandler('Unhandled message type: ' + message.type + ' and message: ' + message.text + '.');
  }

  //  chrome.tabs.update(kamazTabId, {active: true}, function (tab) {
  //    chrome.tabs.sendMessage(tab.id, message, function () {
  //    });
  //  })

});
