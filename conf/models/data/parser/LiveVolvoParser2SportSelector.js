(function () {

  var sportBaseSelector = '#sbMCN div.ClassificationMenuContainer > div.ClassificationMenu > div.Classification.SPORT_CODE';

  var sportEls = $(sportBaseSelector + '.on');
  if (0 < sportEls.length) return true;

  sportEls = $(sportBaseSelector);
  if (0 < sportEls.length) sportEls[0].click();

  return false;

})();