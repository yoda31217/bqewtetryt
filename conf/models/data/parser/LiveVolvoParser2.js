(function () {
  var result = '';
  var eventEls = $('#sbMCN div.FixtureList div.Fixture');

  for (var i = 0; i < eventEls.length; i++) {

    var eventElWrapper = $(eventEls[i]);

    var kofsStrEls = eventElWrapper.find('div.OverviewMarket > div.Participant:not(.Suspended) > span.Odds');
    if (2 > kofsStrEls.length) continue;
    var lowKofStr = kofsStrEls[0].innerText;
    if (0 === lowKofStr.length) continue;
    var highKofStr = kofsStrEls[1].innerText;
    if (0 === highKofStr.length) continue;

    var sidesStrEls = eventElWrapper.find('div.RowContainer > div.Row > div.teams');
    if (2 > sidesStrEls.length) continue;
    var side1 = sidesStrEls[0].innerText;
    if (0 === side1.length) continue;
    var side2 = sidesStrEls[1].innerText;
    if (0 === side2.length) continue;

    var eventId = eventEls[i].wrapper.stem.data.ID.split('_')[0];
    if (!eventId || 0 === eventId.length) continue;

    //console.log(eventEls[i]);
    result += eventId + '^#' + side1 + '^#' + side2 + '^#' + lowKofStr + '^#' + highKofStr + '@#';
  }

  return result;
})();

