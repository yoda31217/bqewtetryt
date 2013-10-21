ORGANISATIONS = ['MARATHON', 'BET365']

$ ->
  $('.container').append $('<div id="events" class=\"panel panel-default\">').append $('<div class=\"panel-heading\">').text 'Tennis'
  $('#events').append eventsContainer = $('<div class=\"panel-body\">')

  $.get '/get_kofs', (events) ->
    $.each events, (eventIndex, event) ->
      eventId = "event_#{Math.floor((Math.random() * 100000000) + 1)}"

      eventsContainer.append eventPanel = $('<div class=\"panel panel-info\">').append eventHeader = $("<div class=\"panel-heading\" data-toggle=\"collapse\" data-target=\"##{eventId}\">")
      eventPanel.append eventHistoryContainer = $("<div class=\"panel-body\" id=\"#{eventId}\">")

      #      table = $('<table class=\"table table-bordered\">')
      #      $('body').append table
      #
      firstPlayerStr = event.firstPlayer.firstName + ', ' + event.firstPlayer.secondName
      secondPlayerStr = event.secondPlayer.firstName + ', ' + event.secondPlayer.secondName
      dateStr = new Date(event.date).toLocaleString()

      captionStr = "#{firstPlayerStr} - #{secondPlayerStr}(#{dateStr})"

      eventHeader.text captionStr

      #
      #      caption = $('<caption>').text captionStr
      #      table.append caption
      #
      #      tableBody = $('<tbody>')
      #      table.append tableBody
      #
      historyAggregator = {}

      $.each event.history, (recordIndex, record) ->
        row = $('<div class="row">')
        eventHistoryContainer.prepend row

        historyAggregator[record.organisation] = record

        for organisation in ORGANISATIONS
          recordToShow = historyAggregator[organisation]

          if recordToShow?
            cell = $('<div class="col-md-3">').text recordToShow.organisation + ': ' + intervalText new Date().getTime() - recordToShow.date
            row.append cell

            cell = $('<div class="col-md-3">').text "#{recordToShow.firstKof.toFixed(3)} / #{recordToShow.secondKof.toFixed(3)}"
            row.append cell

intervalText = (intervalMs) ->
  ms = intervalMs % 1000
  intervalMs -= ms
  intervalMs /= 1000

  sec = intervalMs % 60
  intervalMs -= sec
  intervalMs /= 60

  if intervalMs == 0
    return "#{sec}сек"

  min = intervalMs % 60
  intervalMs -= min
  intervalMs /= 60

  if intervalMs == 0
    return "#{min}мин #{sec}сек"

  h = intervalMs % 24
  intervalMs -= h
  intervalMs /= 24

  if intervalMs == 0
    return "#{h}ч #{min}мин #{sec}сек"
  else
    return "#{intervalMs}д #{h}ч #{min}мин #{sec}сек"
