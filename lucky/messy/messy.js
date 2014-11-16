var onEventSidesClickHandler = function (clickEvent) {
  var rawEvent = clickEvent.target.attributes['messy-data'].value.split(':');

  var event = {};
  event.sport = rawEvent[0];
  event.organisation1 = rawEvent[1];
  event.id1 = rawEvent[2];
  event.organisation2 = rawEvent[3];
  event.id2 = rawEvent[4];

  chrome.runtime.sendMessage({type: 'event-select', event: event});
};

var setupOnEventSidesClickHandlersIfNeeded = function () {
  $('button[messy-type="event-sides"]:not(.messy-event-sides-click-bound)')
    .addClass('messy-event-sides-click-bound')
    .click(onEventSidesClickHandler);
};

window.setInterval(setupOnEventSidesClickHandlersIfNeeded, 500);
