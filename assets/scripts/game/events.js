'use strict'
const gameLogic = require('./game-logic.js')
const ui = require('./ui.js')
// const getFormFields = require('../../../lib/get-form-fields')

// Action when you click on a square
//  ____________________________
//  ____________________________
const onPlayerAction = function (event) {
  event.preventDefault()
  // Format numbers for display
  let elementId = $(this).attr('id')
  let numId = +elementId.replace('board', '')
  let you = gameLogic.currentPlayer()
  let playerBoard = gameLogic.currentBoard()

  // Console log allows you to no that it already worked
  console.log(you + ' made a selection!')
  console.log(playerBoard)
  console.log('Game is tied:' + gameLogic.currentGameTieStatus())
  console.log('Game is won:' + gameLogic.currentGameWinStatus())

  console.log(playerBoard[numId])
  console.log(playerBoard)

//  Check to see if board should be reset. If so display new message.
  if (gameLogic.currentGameTieStatus() || gameLogic.currentGameWinStatus()) {
    onRestart()
    return
  }

  // SUB FUNCTION TO CHECK INPUT

  //  ____________________________
  // Allow them to know that it is an invalid move
  if (playerBoard[numId] !== '' || $(this).html() !== '') {
      // Alert user invalid
    ui.invalidMove()
    console.log(playerBoard)
    return
  }
   //  ____________________________

  // Update the images on the grid
  if (you === 'o' && $(this).html() === '') {
    $(this).html('<img src="assets/images/dog-o.jpg"/>')
  } else if (you === 'x' && $(this).html() === '') {
    $(this).html('<img src="assets/images/cat-x.jpeg"/>')
  }

  gameLogic.userInput(numId)
  // Change the header to notify the user that it is their turn

  you = gameLogic.currentPlayer()

  console.log('Game is tied:' + gameLogic.currentGameTieStatus())
  console.log('Game is won:' + gameLogic.currentGameWinStatus())

  if (gameLogic.currentGameTieStatus()) {
    ui.notifyTie()
    return
  } else if (gameLogic.currentGameWinStatus(you)) {
    ui.updateXScore(gameLogic.currentXScore())
    ui.updateOScore(gameLogic.currentOScore())
    ui.notifyWin(you)
    return
  }
  gameLogic.playerMoveCount()
  ui.notifyTurn(you)
}

//  RESTART the game
const onRestart = function () {
    ui.boardClear()
    ui.onNewGame()
    gameLogic.board = ['', '', '', '', '', '', '', '', '']
    gameLogic.restartGame()
    console.log(gameLogic.board)
}

module.exports = {
  onRestart,
  onPlayerAction
}
