chrome.runtime.onMessage.addListener(function (event) {
    var eventEls = $('li.tour-bl li[data-eventid="' + event.id + '"] .col0');
    if (0 === eventEls.length) {
      chrome.runtime.sendMessage({type: 'error', text: 'Failed to find ' + event.id + ' Kamaz Event!'});
      return;
    }

    var eventEl = eventEls[0];

    var oldBackgroundImage = eventEl.style.backgroundImage;

    eventEl.style.backgroundColor = 'orange';
    eventEl.style.backgroundImage = 'none';
    eventEl.scrollIntoView(true);

    setTimeout(function () {
      eventEl.style.backgroundImage = oldBackgroundImage;
      eventEl.style.backgroundColor = '';
    }, 10000);
  }
);
