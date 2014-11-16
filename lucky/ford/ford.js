chrome.runtime.onMessage.addListener(function (event) {
    var eventEls = $('tr#ip_row_' + event.id + '.rowLive > td.CentrePad');
    if (0 === eventEls.length) {
      chrome.runtime.sendMessage({type: 'error', text: 'Failed to find ' + event.id + ' Ford Event!'});
      return;
    }

    var eventEl = eventEls[0];

    eventEl.style.backgroundColor = 'orange';
    eventEl.scrollIntoView(true);

    setTimeout(function () {
      eventEl.style.backgroundColor = '';
    }, 10000);
  }
);
