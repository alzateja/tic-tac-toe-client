// RESTART
// NEED Store to save games
const store = require('../store')
const gameApi = require('./api.js')

const boardClear = function () {
  $('#board0').html('')
  $('#board1').html('')
  $('#board2').html('')
  $('#board3').html('')
  $('#board4').html('')
  $('#board5').html('')
  $('#board6').html('')
  $('#board7').html('')
  $('#board8').html('')
}

const boardRender = function (board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === 'o') {
      $('#board' + i).html('<img src="http://i.imgur.com/EIGFEib.jpg"/>')
    } else if (board[i] === 'x') {
      $('#board' + i).html('<img src="http://i.imgur.com/Gbc1k8o.jpg"/>')
    } else if (board[i] === '') {
      $('#board' + i).html('')
    }
  }
}

const onNewGame = function () {
  $('#game-messaging').text('New Game! Player X begin!')
}

// ERROR HANDLING
const invalidMove = function () {
  console.log('UI Invalid move!')
  $('#game-messaging').text('Invalid Move! Pick Again.')
}

// NOTIFY USER
const notifyTurn = function (player) {
  // console.log('Whose turn')
  $('#game-messaging').text('Player ' + player.toUpperCase() + ' your turn')
}
// NOTIFY USER
const notifyNewGameNeeded = function (player) {
  // console.log('Whose turn')
  $('#game-messaging').text('Click New Game')
}

// NOTIFY USER OF TIE
const notifyTie = function () {
  $('#game-messaging').text('Tied game')
}

const notifyWin = function (player) {
  console.log('Test to see if runs')
  $('#game-messaging').text('Congrats Player ' + player.toUpperCase())
}

// Create Game ________________________

const createGameSuccess = function (data) {
  console.log('created game ', data)
  store.game = data.game
}

const createGameFailure = (error) => {
  console.error('Did not create game ', error)
}

//  Update Game ________________________

const updateGameSuccess = function (data) {
  console.log('updated game ', data)
}

const updateGameFailure = (error) => {
  console.error('Did not update game ', error)
}

//  Get User info________________________

const infoSuccess = function (data) {
  console.log('get game ', data)
  store.games = data.games
}

const infoFailure = (error) => {
  console.error('get game', error)
}

const updatePlayerRecord = function () {
  console.log('Executing update')
  gameApi.getFinishedGames()
         .then(infoSuccess)
         .catch(updateGameFailure)
}

module.exports = {
  onNewGame,
  boardRender,
  invalidMove,
  notifyTurn,
  notifyTie,
  boardClear,
  notifyWin,
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  infoSuccess,
  infoFailure,
  updatePlayerRecord,
  notifyNewGameNeeded
}
