function parsePercent(cell) {
  var percent = cell.innerText;
  return Number(percent.substring(0, percent.length - 1)) / 100.0;
}

function calculateFactor(cell) {
  var percent = parsePercent(cell);
  return 1.0 / percent;
}

function calculateNormalOdd(cell, factor) {
  var odd = Number(cell.innerText);
  return odd * factor;
}

function processOddRow(row, minOdds, maxOdds, preMaxOdds) {
  var cells = row.children;

  var factor = calculateFactor(cells[cells.length - 2]);

  for (var i = 1; i < cells.length - 2; i++) {

    var normalOdd = calculateNormalOdd(cells[i], factor);
    cells[i].innerHTML += '<div style="color: green">' + normalOdd.toFixed(3) + '</div>';

    if (Infinity === normalOdd) continue;

    if (minOdds[i] > normalOdd) {
      minOdds[i] = normalOdd;
    }

    if (maxOdds[i] < normalOdd) {
      preMaxOdds[i] = maxOdds[i];
      maxOdds[i] = normalOdd;
    }
    else if (preMaxOdds[i] < normalOdd) {
      preMaxOdds[i] = normalOdd;
    }
  }
}

function processAverageOddRow(row, minOdds, maxOdds, preMaxOdds) {
  var cells = row.children;

  var factor = calculateFactor(cells[cells.length - 1]);

  for (var i = 1; i < cells.length - 1; i++) {

    var normalOdd = calculateNormalOdd(cells[i], factor);

    cells[i].innerHTML += '<div style="color: green">' + minOdds[i].toFixed(3) + '</div><div style="color: green">' + normalOdd.toFixed(3) +
    '</div><div style="color: green">' + preMaxOdds[i].toFixed(3) + '</div><div style="color: green">' + maxOdds[i].toFixed(3) + '</div>';
  }
}

function normalizeOdds() {
  var oddsPanelEls = $('#odds-panel');
  if (0 === oddsPanelEls.length || oddsPanelEls[0].classList.contains('lucky-odds-normalized')) return;

  var minOdds = [];
  var maxOdds = [];
  var preMaxOdds = [];
  for (var i = 0; i < 5; i++) {
    minOdds[i] = 1000.0;
    preMaxOdds[i] = 0.0;
    maxOdds[i] = 0.1;
  }

  var oddRows = oddsPanelEls.find('> div > table.odds-table > tbody > tr');
  for (var j = 0; j < oddRows.length; j++) {
    processOddRow(oddRows[j], minOdds, maxOdds, preMaxOdds);
  }

  var averageOddRows = oddsPanelEls.find('> div > table.odds-table > tfoot > tr.average');
  processAverageOddRow(averageOddRows[0], minOdds, maxOdds, preMaxOdds);

  oddsPanelEls[0].classList.add('lucky-odds-normalized');
}

//normalizeOdds();
window.setInterval(normalizeOdds, 2000);