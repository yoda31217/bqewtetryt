(function () {
  var result = '';

  var sportEls = $('#content > div.content > div.livediv > ul.betlist > li.tour-bl');
  for (var i = 0; i < sportEls.length; i++) {

    var sportAttr = sportEls[i].attributes['data-sportid'];
    if (!sportAttr || !sportAttr.value || 0 === sportAttr.value.length) continue;

    var sportElWrapper = $(sportEls[i]);

    var eventEls = sportElWrapper.find('li[data-eventid] > ul.mrk-head.t2');

    for (var j = 0; j < eventEls.length; j++) {

      var eventIdAttr = eventEls[j].attributes['data-eventid'];
      if (!eventIdAttr || !eventIdAttr.value || 0 === eventIdAttr.value.length) continue;

      var eventElWrapper = $(eventEls[j]);

      var lowKofEls = eventElWrapper.find('li.col21 > ul.mrk-itm li.bets_fullmark_body.m_1 button:not([disabled])');
      if (0 === lowKofEls.length) continue;
      var lowKof = lowKofEls[0].innerText;
      if (0 === lowKof.length) continue;

      var highKofEls = eventElWrapper.find('li.col21 > ul.mrk-itm li.bets_fullmark_body.m_2 button:not([disabled])');
      if (0 === highKofEls.length) continue;
      var highKof = highKofEls[0].innerText;
      if (0 === highKof.length) continue;

      var side1Els = eventElWrapper.find('li.col21 > ul.mrk-itm li.bets_fullmark_body.m_1 span');
      if (0 === side1Els.length) continue;
      var side1 = side1Els[0].innerText;
      if (0 === side1.length) continue;

      var side2Els = eventElWrapper.find('li.col21 > ul.mrk-itm li.bets_fullmark_body.m_2 span');
      if (0 === side2Els.length) continue;
      var side2 = side2Els[0].innerText;
      if (0 === side2.length) continue;

      //console.log(eventEls[j]);
      result += eventIdAttr.value + '^#' + side1 + '^#' + side2 + '^#' + lowKof + '^#' + highKof + '^#' + sportAttr.value + '@#';
    }
  }

  return result;
})();

