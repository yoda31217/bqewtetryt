(function () {
  var result = '';
  var eventEls = $('#sports_holder > div > div > div > div > div.marketHolderExpanded > table.tableData > tbody > tr.rowLive');

  for (var i = 0; i < eventEls.length; i++) {

    var eventId = eventEls[i].id;
    if (!eventId || 0 === eventId.length) continue;

    var eventElWrapper = $(eventEls[i]);

    var sidesStrEls = eventElWrapper.find('td.CentrePad > a > span');
    if (0 === sidesStrEls.length) continue;
    var sidesStr = sidesStrEls[0].innerText;
    if (0 === sidesStr.length) continue;

    var kofsStrEls = eventElWrapper.find('td > div.eventpriceholder-left > div.eventprice');
    if (2 > kofsStrEls.length) continue;
    var lowKofStr = kofsStrEls[0].innerText;
    if (0 === lowKofStr.length) continue;
    var highKofStr = kofsStrEls[1].innerText;
    if (0 === highKofStr.length) continue;

    var sportsStrEls = eventElWrapper.find('td > div.contentMyEv > div > a[title=\'Add to My Favourites\']');
    if (0 === sportsStrEls.length) continue;

    var sportStr = sportsStrEls[0].href;

    var sportStrComaIndex = sportStr.lastIndexOf(',');
    if (-1 === sportStrComaIndex) continue;

    sportStr = sportStr.substr(sportStrComaIndex);

    var sportDigitStrs = sportStr.match(/\d+/);
    if (0 === sportDigitStrs.length) continue;

    sportStr = sportDigitStrs[0];
    if (0 === sportStr.length) continue;

    //console.log(eventEls[i]);
    result += eventId + '^#' + sidesStr + '^#' + lowKofStr + '^#' + highKofStr + '^#' + sportStr + '@#';
  }

  return result;
})();

