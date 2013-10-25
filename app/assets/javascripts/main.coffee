ORGANISATIONS = ['MARATHON', 'BET365']

$ ->
  $('#refreshBtn').click(refresh)
  window.setInterval(() ->
    if (0 < $('#autoRefreshChk:checked').length)
      refresh()
  , 4 * 1000)
  refresh()

refresh = () ->
  $('#tennis-panel').empty()
  $('#tennis-panel').append $('<div id="events" class=\"panel panel-default\">').append $('<div class=\"panel-heading\">').text 'Tennis'
  $('#events').append eventContainer = $('<div class=\"panel-body\">')

  eventContainer.append winningEventContainer = $("<div>")
  eventContainer.append regularEventContainer = $("<div>")
  eventContainer.append brokenEventContainer = $("<div>")

  $.get '/get_kofs', (events) ->
    $.each events, (eventIndex, event) ->
      eventHeader = $('<div class="row-fluid">')

      eventDate = new Date(event.date)

      dateStr = (eventDate.getMonth() + 1) + '-' + eventDate.getDate() + ' ' + eventDate.getHours() + ':' + eventDate.getMinutes()
      captionStr = "#{event.firstSide} - #{event.secondSide}"

      eventHeader.append $('<div class="col-md-1">').append $('<small>').text dateStr
      eventHeader.append $('<div class="col-md-4">').append $('<small>').text captionStr
      eventHeader.append $('<div class="col-md-3">').append $('<small>').text event.code

      historyAggregator = {}

      eventHistoryContainer = $('<div class="row-fluid">').hide()
      $.each event.history, (recordIndex, record) ->
        row = $('<div class="row-fluid text-info">')
        eventHistoryContainer.prepend row

        historyAggregator[record.organisation] = record

        cell = $('<div class="col-md-6">').append $('<small>').text ""
        row.append cell

        firstKof = 0
        secondKof = 0
        for organisation in ORGANISATIONS
          recordToShow = historyAggregator[organisation]

          recordToShow = recordToShow || {}
          recordToShow.date = recordToShow.date || new Date().getTime()
          recordToShow.organisation = recordToShow.organisation || organisation
          recordToShow.firstKof = recordToShow.firstKof || 1.0
          recordToShow.secondKof = recordToShow.secondKof || 1.0

          if (recordToShow.firstKof > firstKof)
            firstKof = recordToShow.firstKof
            firstKofSymbol = recordToShow.organisation.substr(0, 1)
          if (recordToShow.secondKof > secondKof)
            secondKof = recordToShow.secondKof
            secondKofSymbol = recordToShow.organisation.substr(0, 1)

          cell = $('<div class="col-md-1">').append $('<small>').text recordToShow.organisation.substr(0,
            1) + ': ' + intervalText new Date().getTime() - recordToShow.date
          row.append cell

          cell = $('<div class="col-md-1">').append $('<small>').text "#{recordToShow.firstKof.toFixed(3)} / #{recordToShow.secondKof.toFixed(3)}"
          row.append cell

        zeroSecondKof = 1 + 1 / (firstKof - 1)
        deltaM = (secondKof - zeroSecondKof) * (firstKof - 1)
        firstDeltaMPercent = 100.0 * deltaM / firstKof
        secondDeltaMPercent = 100.0 * deltaM / secondKof

        row.append $('<div class="col-md-2">').append $('<small>').text "#{firstKofSymbol}:#{firstKof.toFixed(3)} / #{secondKofSymbol}:#{secondKof.toFixed(3)} : #{deltaM.toFixed(3)}$ : #{firstDeltaMPercent.toFixed(3)}% / #{secondDeltaMPercent.toFixed(3)}%"

        if (firstKof > 1.0 + 1.0 / (secondKof - 1.0))
          row.addClass('text-danger')

      firstKof = 0
      firstKofSymbol = 'X'
      secondKof = 0
      secondKofSymbol = 'X'
      for organisation in ORGANISATIONS
        recordToShow = historyAggregator[organisation]

        recordToShow = recordToShow || {}
        recordToShow.date = recordToShow.date || new Date().getTime()
        recordToShow.organisation = recordToShow.organisation || organisation
        recordToShow.firstKof = recordToShow.firstKof || 1.0
        recordToShow.secondKof = recordToShow.secondKof || 1.0

        if (recordToShow.firstKof > firstKof)
          firstKof = recordToShow.firstKof
          firstKofSymbol = recordToShow.organisation.substr(0, 1)
        if (recordToShow.secondKof > secondKof)
          secondKof = recordToShow.secondKof
          secondKofSymbol = recordToShow.organisation.substr(0, 1)

        if (1.0 == recordToShow.firstKof)
          eventHeader.addClass('text-muted')

        eventHeader.append $('<div class="col-md-1">').append $('<small>').text recordToShow.organisation.substr(0,
          1) + ': ' + "#{recordToShow.firstKof.toFixed(3)} / #{recordToShow.secondKof.toFixed(3)}"

      if (firstKof > 1.0 + 1.0 / (secondKof - 1.0))
        eventHeader.addClass('text-danger')

      zeroSecondKof = 1 + 1 / (firstKof - 1)
      deltaM = (secondKof - zeroSecondKof) * (firstKof - 1)
      firstDeltaMPercent = 100.0 * deltaM / firstKof
      secondDeltaMPercent = 100.0 * deltaM / secondKof

      eventHeader.append $('<div class="col-md-2">').append $('<small>').text "#{firstKofSymbol}:#{firstKof.toFixed(3)} / #{secondKofSymbol}:#{secondKof.toFixed(3)} : #{deltaM.toFixed(3)}$ : #{firstDeltaMPercent.toFixed(3)}% / #{secondDeltaMPercent.toFixed(3)}%"

      eventHeader.click () ->
        eventHistoryContainer.toggle()

      if (eventHeader.hasClass('text-danger'))
        winningEventContainer.append eventHeader
        winningEventContainer.append eventHistoryContainer
      else if (eventHeader.hasClass('text-muted'))
        brokenEventContainer.append eventHeader
        brokenEventContainer.append eventHistoryContainer
      else
        regularEventContainer.append eventHeader
        regularEventContainer.append eventHistoryContainer

intervalText = (intervalMs) ->
  ms = intervalMs % 1000
  intervalMs -= ms
  intervalMs /= 1000

  sec = intervalMs % 60
  intervalMs -= sec
  intervalMs /= 60

  if intervalMs == 0
    return "#{sec}с"

  min = intervalMs % 60
  intervalMs -= min
  intervalMs /= 60

  if intervalMs == 0
    return "#{min}м #{sec}с"

  h = intervalMs % 24
  intervalMs -= h
  intervalMs /= 24

  if intervalMs == 0
    return "#{h}ч #{min}м #{sec}с"
  else
    return "#{intervalMs}д #{h}ч #{min}м #{sec}с"
