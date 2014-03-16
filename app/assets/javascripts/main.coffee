ORGANISATIONS = ['LANOS', 'VOLVO']

$ ->
  $('#refreshBtn').click(refresh)
  window.setInterval(() ->
    if (0 < $('#autoRefreshChk:checked').length)
      refresh()
  , 5000)
  refresh()

refresh = () ->
  $.get '/get_calculations', (calculationsSnippetText) ->
    mainContainer = $('#main_container')
    mainContainer.empty()
    mainContainer.append $('<div id="calculations_panel" class=\"panel panel-default\">').append $('<div class=\"panel-heading\">').text 'Calculations'
    $('#calculations_panel').append $('<div class=\"panel-body\">').append $('<pre></pre>').text calculationsSnippetText

#  $('#tennis-panel').empty()
#  $('#tennis-panel').append $('<div id="events" class=\"panel panel-default\">').append $('<div class=\"panel-heading\">').text 'Tennis'
#  $('#events').append eventContainer = $('<div class=\"panel-body\">')
#
#  eventContainer.append winningEventContainer = $("<div>")
#  eventContainer.append regularEventContainer = $("<div>")
#  eventContainer.append brokenEventContainer = $("<div>")
#
#  $.get '/get_kofs', (events) ->
#    $.each events, (eventIndex, event) ->
#      eventHeader = $('<div class="row-fluid">')
#
#      eventDate = new Date(event.date)
#
#      dateStr = (eventDate.getMonth() + 1) + '-' + eventDate.getDate() + ' ' + eventDate.getHours() + ':' + eventDate.getMinutes()
#      captionStr = "#{event.sport}: #{event.side1} - #{event.side2}"
#
#      eventHeader.append $('<div class="col-md-1">').append $('<small>').text dateStr
#      eventHeader.append $('<div class="col-md-4">').append $('<small>').text captionStr
#      eventHeader.append $('<div class="col-md-3">').append $('<small>').text event.code
#
#      historyAggregator = {}
#
#      eventHistoryContainer = $('<div class="row-fluid">').hide()
#      $.each event.history, (recordIndex, record) ->
#        row = $('<div class="row-fluid text-info">')
#        eventHistoryContainer.prepend row
#
#        historyAggregator[record.organisation] = record
#
#        cell = $('<div class="col-md-6">').append $('<small>').text ""
#        row.append cell
#
#        lowKof = 0
#        highKof = 0
#        for organisation in ORGANISATIONS
#          recordToShow = historyAggregator[organisation]
#
#          recordToShow = recordToShow || {}
#          recordToShow.date = recordToShow.date || new Date().getTime()
#          recordToShow.organisation = recordToShow.organisation || organisation
#          recordToShow.lowKof = recordToShow.lowKof || 1.0
#          recordToShow.highKof = recordToShow.highKof || 1.0
#
#          if (recordToShow.lowKof > lowKof)
#            lowKof = recordToShow.lowKof
#            lowKofSymbol = recordToShow.organisation.substr(0, 1)
#          if (recordToShow.highKof > highKof)
#            highKof = recordToShow.highKof
#            highKofSymbol = recordToShow.organisation.substr(0, 1)
#
#          cell = $('<div class="col-md-1">').append $('<small>').text recordToShow.organisation.substr(0,
#            1) + ': ' + intervalText new Date().getTime() - recordToShow.date
#          row.append cell
#
#          cell = $('<div class="col-md-1">').append $('<small>').text "#{recordToShow.lowKof.toFixed(3)} / #{recordToShow.highKof.toFixed(3)}"
#          row.append cell
#
#        zeroHighKof = 1 + 1 / (lowKof - 1)
#        deltaM = (highKof - zeroHighKof) * (lowKof - 1)
#        firstDeltaMPercent = 100.0 * deltaM / lowKof
#        secondDeltaMPercent = 100.0 * deltaM / highKof
#
#        row.append $('<div class="col-md-2">').append $('<small>').text "#{lowKofSymbol}:#{lowKof.toFixed(3)} / #{highKofSymbol}:#{highKof.toFixed(3)} : #{deltaM.toFixed(3)}$ : #{firstDeltaMPercent.toFixed(3)}% / #{secondDeltaMPercent.toFixed(3)}%"
#
#        if (lowKof > 1.0 + 1.0 / (highKof - 1.0))
#          row.addClass('text-danger')
#
#      lowKof = 0
#      lowKofSymbol = 'X'
#      highKof = 0
#      highKofSymbol = 'X'
#      for organisation in ORGANISATIONS
#        recordToShow = historyAggregator[organisation]
#
#        recordToShow = recordToShow || {}
#        recordToShow.date = recordToShow.date || new Date().getTime()
#        recordToShow.organisation = recordToShow.organisation || organisation
#        recordToShow.lowKof = recordToShow.lowKof || 1.0
#        recordToShow.highKof = recordToShow.highKof || 1.0
#
#        if (recordToShow.lowKof > lowKof)
#          lowKof = recordToShow.lowKof
#          lowKofSymbol = recordToShow.organisation.substr(0, 1)
#        if (recordToShow.highKof > highKof)
#          highKof = recordToShow.highKof
#          highKofSymbol = recordToShow.organisation.substr(0, 1)
#
#        if (1.0 == recordToShow.lowKof)
#          eventHeader.addClass('text-muted')
#
#        eventHeader.append $('<div class="col-md-1">').append $('<small>').text recordToShow.organisation.substr(0,
#          1) + ': ' + "#{recordToShow.lowKof.toFixed(3)} / #{recordToShow.highKof.toFixed(3)}"
#
#      if (lowKof > 1.0 + 1.0 / (highKof - 1.0))
#        eventHeader.addClass('text-danger')
#
#      zeroHighKof = 1 + 1 / (lowKof - 1)
#      deltaM = (highKof - zeroHighKof) * (lowKof - 1)
#      firstDeltaMPercent = 100.0 * deltaM / lowKof
#      secondDeltaMPercent = 100.0 * deltaM / highKof
#
#      eventHeader.append $('<div class="col-md-2">').append $('<small>').text "#{lowKofSymbol}:#{lowKof.toFixed(3)} / #{highKofSymbol}:#{highKof.toFixed(3)} : #{deltaM.toFixed(3)}$ : #{firstDeltaMPercent.toFixed(3)}% / #{secondDeltaMPercent.toFixed(3)}%"
#
#      eventHeader.click () ->
#        eventHistoryContainer.toggle()
#
#      if (eventHeader.hasClass('text-danger'))
#        winningEventContainer.append eventHeader
#        winningEventContainer.append eventHistoryContainer
#      else if (eventHeader.hasClass('text-muted'))
#        brokenEventContainer.append eventHeader
#        brokenEventContainer.append eventHistoryContainer
#      else
#        regularEventContainer.append eventHeader
#        regularEventContainer.append eventHistoryContainer

#intervalText = (intervalMs) ->
#  ms = intervalMs % 1000
#  intervalMs -= ms
#  intervalMs /= 1000
#
#  sec = intervalMs % 60
#  intervalMs -= sec
#  intervalMs /= 60
#
#  if intervalMs == 0
#    return "#{sec}с"
#
#  min = intervalMs % 60
#  intervalMs -= min
#  intervalMs /= 60
#
#  if intervalMs == 0
#    return "#{min}м #{sec}с"
#
#  h = intervalMs % 24
#  intervalMs -= h
#  intervalMs /= 24
#
#  if intervalMs == 0
#    return "#{h}ч #{min}м #{sec}с"
#  else
#    return "#{intervalMs}д #{h}ч #{min}м #{sec}с"
