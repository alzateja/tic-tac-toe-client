'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
//
const gameEvents = require('./game/events.js')

// On document ready
$(() => {
  $('#board0').on('click', gameEvents.onPlayerAction)
  $('#board1').on('click', gameEvents.onPlayerAction)
  $('#board2').on('click', gameEvents.onPlayerAction)
  $('#board3').on('click', gameEvents.onPlayerAction)
  $('#board4').on('click', gameEvents.onPlayerAction)
  $('#board5').on('click', gameEvents.onPlayerAction)
  $('#board6').on('click', gameEvents.onPlayerAction)
  $('#board7').on('click', gameEvents.onPlayerAction)
  $('#board8').on('click', gameEvents.onPlayerAction)
  $('#restartGame').on('click', gameEvents.onRestart)
})
