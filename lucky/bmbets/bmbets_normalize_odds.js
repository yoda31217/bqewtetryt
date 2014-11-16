var normalizeOddRow = function (row, rightIndex) {
  var cells = row.children;

  var percentCell = cells[cells.length - rightIndex];
  var percent = percentCell.innerText;
  percent = Number(percent.substring(0, percent.length - 1)) / 100.0;

  var factor = 1.0 / percent;

  for (var i = 1; i < cells.length - rightIndex; i++) {
    var oddCell = cells[i];
    var odd = Number(oddCell.innerText);
    oddCell.innerHTML += '<div style="color: green">' + (odd * factor).toFixed(3) + '</div>'
  }

  //console.log(row);
};

var normalizeOdds = function () {
  //console.log('Norm');

  var oddsPanelEl = document.getElementById('odds-panel');
  if (!oddsPanelEl || oddsPanelEl.classList.contains('lucky-odds-normalized')) return;

  var oddRows = $('#odds-panel > div > table.odds-table > tbody > tr');
  for (var i = 0; i < oddRows.length; i++) {
    normalizeOddRow(oddRows[i], 2);
  }

  var averageOddRows = $('#odds-panel > div > table.odds-table > tfoot > tr.average');
  normalizeOddRow(averageOddRows[0], 1);

  oddsPanelEl.classList.add('lucky-odds-normalized');
  //console.log('Norm done');
};

window.setInterval(normalizeOdds, 2000);