ORGANISATIONS = ['LANOS', 'VOLVO']

$ ->
  $('#refreshBtn').click(refresh)
  window.setInterval(() ->
    if (0 < $('#autoRefreshChk:checked').length)
      refresh()
  , 1000)
  refresh()

refresh = () ->
  $.get '/get_calculations', (calculationsSnippetText) ->
    mainContainer = $('#main_container')
    mainContainer.empty()
    mainContainer.append $('<div id="calculations_panel" class=\"panel panel-default\">').append $('<div class=\"panel-heading\">').text 'Calculations'
    $('#calculations_panel').append $('<div class=\"panel-body\">').append $('<pre></pre>').text calculationsSnippetText
