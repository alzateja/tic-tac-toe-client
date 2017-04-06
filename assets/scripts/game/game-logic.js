'use strict'

// Variable declaration
//  ____________________________
let board = ['', '', '', '', '', '', '', '', '']
let xwin = 0
let owin = 0
let moveCounter = 1
let player = 'x'
let gameWon = false
let gameTied = false
let victoryCondition = ''

// Function to Restart a game
const restartGame = function () {
  // Reset option to the default state
  board = ['', '', '', '', '', '', '', '', '']
  moveCounter = 1
  player = 'x'
  gameWon = false
  gameTied = false
  victoryCondition = ''
  console.log('Game was reset:' + player + ',x wins: ' + xwin + ',x wins: ' + owin + ',moveCounter: ' + moveCounter)
  console.log(board)
}

// Function to switch between players
const playerMoveCount = function () {
  if (moveCounter % 2 === 0) {
    player = 'o'
  } else {
    player = 'x'
  }
}

// FUNCTION TO Check Victory
const checkVictory = function (player) {
 // Check Victory is the function
  console.log(board)
  if (
    // First row check
    (board[0] === player && board[1] === player && board[2] === player) ||
    // Second row check
    (board[3] === player && board[4] === player && board[5] === player) ||
     // Third row check
    (board[6] === player && board[7] === player && board[8] === player) ||
    // First column check
    (board[0] === player && board[3] === player && board[6] === player) ||
    // Second column check
    (board[1] === player && board[4] === player && board[7] === player) ||
     // Third column check
    (board[2] === player && board[5] === player && board[8] === player) ||
    // Downward Diag check
    (board[0] === player && board[4] === player && board[8] === player) ||
     // Upward Diag check
    (board[6] === player && board[4] === player && board[2] === player)) {
    // add score to global counter
    // _____________________________
    // if successful identify player and update their score.
    gameWon = true
    if (player === 'x') {
      xwin++
    } else {
      owin++
    }
    return   // Declare the WINNER!!!!!
    // If no winner check for tie
  } else {
    console.log('No One has won!. Checking for Tie')
  }
}

const checkTie = function () {
  if (board.every(x => x !== '')) {
    console.log('Tied after ' + (moveCounter - 1) + ' moves. Unable to select')
    gameTied = true
    return
  }
}

// FUNCTION FOR USER INPUT
const userInput = function (selection) {
// What were the values before player input
  console.log(board)
 // End of before view
  // Data check to see if input is valid

  if (board[selection] === '') {
   // If valid push to the board
    board[selection] = player
    moveCounter++
    checkVictory(player)
    checkTie()
    // and check to see if you won
  }
    // if not return invalid move
// After the moves let us know what happened

  console.log('After the turn ,player:' + player + ',o wins: ' + owin + ',x wins: ' + xwin + ',moveCounter: ' + moveCounter)
  console.log(board)
}

// Functions to return the variables for the UI
const currentPlayer = function () {
  return player
}

const currentXScore = function () {
  return xwin
}

const currentOScore = function () {
  return owin
}

const currentGameWinStatus = function () {
  return gameWon
}

const currentGameTieStatus = function () {
  return gameTied
}

const currentBoard = function () {
  return board
}

module.exports = {
  player,
  board,
  moveCounter,
  userInput,
  restartGame,
  playerMoveCount,
  checkVictory,
  currentPlayer,
  currentOScore,
  currentXScore,
  currentGameWinStatus,
  currentGameTieStatus,
  currentBoard,
  checkTie
}
