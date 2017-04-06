// RESTART

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

const onNewGame = function () {
  $('#game-messaging').text('Starting a New Game! Player X begin!')
}

// ERROR HANDLING
const invalidMove = function () {
  console.log('UI Invalid move!')
  $('#game-messaging').text('Invalid Move! Pick Again.')
}

// NOTIFY USER
const notifyTurn = function (player) {
  // console.log('Whose turn')
  $('#game-messaging').text('Player ' + player.toUpperCase() + ' it is now your turn')
}

// NOTIFY USER
const updateXScore = function (xscore) {
  // console.log('Whose turn')
  $('#x-score').text(xscore)
}

// NOTIFY USER
const updateOScore = function (oscore) {
  // console.log('Whose turn')
  $('#o-score').text(oscore)
}

// NOTIFY USER OF TIE
const notifyTie = function () {
  $('#game-messaging').text('Tied game. Click to Restart!')
}

const notifyWin = function (player) {
  $('#game-messaging').text('Congrats on Winning! Player ' + player.toUpperCase())

}

module.exports = {
  onNewGame,
  invalidMove,
  notifyTurn,
  updateXScore,
  updateOScore,
  notifyTie,
  boardClear,
  notifyWin
}
