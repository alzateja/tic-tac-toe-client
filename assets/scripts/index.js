'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
//
const gameEvents = require('./game/events.js')

const userAuthEvents = require('./auth/events.js')
// On document ready

const hideGameOptions = function () {
  $('#game-board').hide()
  $('#game-messaging').text('Please log in to play')
  $('#newGame').hide()
  $('#ai-menu').hide()
  $('#change-pass-but').hide()
  $('#sign-out').hide()
  $('#game-options-launch').hide()
  $('#updateStats').hide()
}

$(() => {
  // Set app location
  setAPIOrigin(location, config)
  // Load event handlers for the game
  gameEvents.addHandlers()
  // Load event handlers for authorization
  userAuthEvents.addHandlers()
  // Initially hide game
  hideGameOptions()
})
