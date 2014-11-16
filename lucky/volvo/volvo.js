var script = document.createElement('script');
script.innerHTML = 'setInterval(function(){$(\'#sbMCN div.FixtureList div.Fixture:not([fqlb])\').each(function(){this.setAttribute(\'fqlb\', this.wrapper.stem.data.ID.split(\'_\')[0]);});}, 500);';
document.head.appendChild(script);

var sport2id = {};
sport2id['BT'] = '94';
sport2id['BL'] = '16';
sport2id['BB'] = '18';
sport2id['BV'] = '95';
sport2id['TT'] = '92';
sport2id['TE'] = '13';
sport2id['VB'] = '91';

var highlightEvent = function (id) {

  var eventEls = $('#sbMCN div.FixtureList div.Fixture[fqlb="' + id + '"]');
  if (0 === eventEls.length) {
    chrome.runtime.sendMessage({type: 'error', text: 'Failed to find ' + id + ' Volvo Event!'});
    return;
  }

  var eventEl = eventEls[0];

  var oldBackgroundColor = eventEl.style.backgroundColor;

  eventEl.style.backgroundColor = 'orange';
  eventEl.scrollIntoView(true);

  setTimeout(function () {
    eventEl.style.backgroundColor = oldBackgroundColor;
  }, 10000);
};

chrome.runtime.onMessage.addListener(function (event) {
  var sportId = sport2id[event.sport];
  if (!sportId) {
    chrome.runtime.sendMessage({type: 'error', text: 'Failed to identify Sport ' + event.sport + ' for Volvo Event!'});
    return;
  }

  var selectedSportEls = $('#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification.sport_' + sportId + '.on');
  if (0 === selectedSportEls.length) {

    var sportSelectorEls = $('#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification.sport_' + sportId);
    if (0 === sportSelectorEls.length) {
      chrome.runtime.sendMessage({type: 'error', text: 'Failed to find Sport ' + event.sport + ' for Volvo Event!'});
      return;
    }

    sportSelectorEls.click();

    setTimeout(function () {
      highlightEvent(event.id);
    }, 1000);
    return;
  }

  highlightEvent(event.id);
});
