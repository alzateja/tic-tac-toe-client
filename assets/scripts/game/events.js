'use strict'
const gameLogic = require('./game-logic.js')
const ui = require('./ui.js')
const gameApi = require('./api.js')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
let ai = 'off'
let gameId = ['', '', '', '', '', '', '', '', '']
let board = null
let moveCounter = 1
let player = 'x'
let gameWon = false
let gameTied = false
let over = false
let winCondition = ''
let xOptimalMove = null
let oOptimalMove = null
let optimalMove = null

//  _________________________________________________

// NEW GAME -  INITIALIZE THE GAME
const newGame = function (data) {
  // Check to see if loggedin

  if (jQuery.isEmptyObject(store.user)) {
    $('#game-messaging').text('Please log in to play')
    return
  }
  gameApi.createGames()
        .then(ui.createGameSuccess)
        .catch(ui.createGameFailure)
  $('#game-board').show()
  ui.boardClear()
  ui.onNewGame()
  board = ['', '', '', '', '', '', '', '', '']
  gameId = 0
  moveCounter = 1
  player = 'x'
  gameWon = false
  gameTied = false
  over = false
  winCondition = ''
  xOptimalMove = null
  oOptimalMove = null
}

// STEP 0 - CAPTURE AND TRANSATE PLAYER CLICK INFORMATION
const capturePlayerAction = function (event) {
  event.preventDefault()
  // Store selection to pass as argument
  const elementId = $(this).attr('id')
  const num = +elementId.replace('board', '')
// STEP 1 - LOG INTO GAME CHECK
  if (jQuery.isEmptyObject(store)) {
    console.log('No log in!')
    $('#game-messaging').text('Please log in to play')
    return
  }
  displayStats()
  // Step 2 - Check to see if Game is over. If so, Click will force restart
  onPlayerAction(num)
}

//  MASTER - CONTROLS FLOW OF INFORMATION OF WHEN PLAYER CLICKS
const onPlayerAction = function (num) {
  if (gameTied || gameWon) {
    console.log('Game Already over!. Restarting and exiting')
    ui.notifyNewGameNeeded()
    displayStats()
    return
  }
  ui.updatePlayerRecord()
  console.log('After Step 2, Game still active')

  console.log('After Step 2 to check if we resart, we are Back in onPlayerAction. Here is the value of the move : ' + num)
  console.log('Current Player: ' + player + ' . Game tied: ' + gameTied + '.  Game won: ' + gameWon)
// Step 3 - Check if invalid move
  if (board[num] !== '' || $('#board' + num).html() !== '') {
      // Alert user invalid
    if (player === 'o') {
      aiMove()
      return
    }
    ui.invalidMove()
    console.log('Invalid Move selected. exiting: ' + board)
    return
  }

  console.log('After Step 3 Move is valid. Current Movecounter value' + moveCounter)

  // Step 4 - Update the board and rerender. Increment Move Counter
  boardUpdate(num)

// STEP 5 - RUN THROUGH THE GAME LOGIC
  console.log('_________________BEGIN LOGIC DETAIL__________________')
  gameLogic.runLogic(board)
  console.log('_________________END LOGIC DETAIL__________________')

  gameWon = gameLogic.returnGameWon()
  gameTied = gameLogic.returnGameTied()
  winCondition = gameLogic.returnWinCondition()
  xOptimalMove = gameLogic.returnXOptimalMove()
  oOptimalMove = gameLogic.returnOOptimalMove()
  optimalMove = gameLogic.returnOptimalMove()

  console.log('After Step 5 and running the game logic, Game tied: ' + gameTied + '.  Game won: ' + gameWon)
  console.log('If win condition is found :  ' + winCondition)
  console.log('After running the game Logic. The optimal move for x if they are next is ' + xOptimalMove)
  console.log('After running the game Logic. The optimal move for o if they are next is ' + oOptimalMove)
  console.log('After running the game Logic. The optimal move for either player is ' + optimalMove)
//  Step 6  -- FORMAT DATA TO SEND TO BACK END SERVER
  console.log('Before step 6, the status of over is ' + over)

  updateGameInfoServer(num)

  console.log('After step 6, the status of over is ' + over)

// STEP 7 - PROCESS THE OUTCOME OF PRECEDING STEPS AND NOTIFY
  gameOutcome(player)

  if (over) { return }

  console.log('END OF STEP 7')

  // STEP 8 SWITCH PLAYERS AND UPDATE COUNTER
  playerMoveCount()
}

// ______________________________________________________________
// Step 4 - Update the board and rerender. Increment Move Counter
const boardUpdate = function (selection) {
   // If valid push to the board
  board[selection] = player
  ui.boardRender(board)
    // if not return invalid move
// After the moves let us know what happened
  console.log('After Step 4, the the turn , The current move is ' + moveCounter + ' updated board is ', board)
  console.log(board)
}

//  Step 6  -- FORMAT DATA TO SEND TO BACK END SERVER
const updateGameInfoServer = function (num) {
  gameId = store.game.id
  console.log('Game ID - ' + gameId)
  if (gameTied || gameWon) {
    over = true
  }

// Format data to send to server
  const dataForUpdate = {
    'game': {
      'cell': {
        'index': num,
        'value': player
      },
      'over': over
    }
  }

  gameApi.gameUpdated(dataForUpdate, gameId)
         .then(ui.updateGameSuccess)
         .catch(ui.updateGameFailure)
}

// STEP 7 - PROCESS THE OUTCOME OF PRECEDING STEPS AND NOTIFY
const gameOutcome = function (player) {
  // Push to store ---> Store use the API -- > push to server - Game Update
  if (gameWon) {
    console.log('NOTIFY PLAYER ' + player + ' OF WIN')
    ui.notifyWin(player)
    return
  }
  if (gameTied) {
    console.log('NOTIFY PLAYERS OF TIE')
    ui.notifyTie()
    return
  }
  console.log('GAME IS STILL ACTIVE')
}

// STEP 8 SWITCH PLAYERS AND UPDATE COUNTER
const playerMoveCount = function () {
  console.log('Current player is ' + player + 'and Move Counter is ' + moveCounter)
  moveCounter++
  if (moveCounter % 2 === 0) {
    player = 'o'
  } else {
    player = 'x'
  }
  console.log('After Player Move Count, New player is ' + player + 'and Move Counter is ' + moveCounter)
// Notify Player of Turn
  ui.notifyTurn(player)
  if (player === 'o') {
    console.log('Check for AI Move')
    aiMove()
    return
  }
}

// *******----------AI FUNCTIONALITY -----------************
// _________________________Toggle the AI button
const turnAiOff = function () {
  console.log(2)
  ai = 'off'
  $('#ai-menu').text('AI Off')
}

const turnOnDumbAi = function () {
  console.log(1)
  ai = 'dumb'
  $('#ai-menu').text('Dumb AI On')
  aiMove()
}

const turnOnSmartAi = function () {
  console.log(3)
  ai = 'smart'
  $('#ai-menu').text('Smart AI On')
  aiMove()
}

const turnOnSmartestAi = function () {
  console.log(3)
  ai = 'smartest'
  $('#ai-menu').text('Smartest AI On')
  aiMove()
}

// _________________________Toggle the AI button

//  BONUS --- RANDOM AI -  Define an AI move
const aiMove = function () {
  console.log('Ai move- ' + player)
  let random = Math.floor(Math.random() * (8 - 0 + 1)) + 0
  if (ai === 'smartest' && optimalMove !== null) {
    onPlayerAction(optimalMove)
    console.log('Smartest AI Move Made!')
  } else if ((ai === 'smart' || ai === 'smartest') && player === 'o' && oOptimalMove !== null) {
    onPlayerAction(oOptimalMove)
    console.log('Player O Smart AI Move Made!')
  } else if (player === 'o' && ai === 'smart' && oOptimalMove === null) {
    onPlayerAction(random)
    console.log('Dumb or Random AI Move Made By Smart AI! ')
  } else if (player === 'o' && ai === 'smartest' && oOptimalMove === null && optimalMove === null) {
    onPlayerAction(random)
    console.log('Dumb or Random AI Move Made By Smartest AI!')
  } else if (player === 'o' && ai === 'dumb') {
    onPlayerAction(random)
    console.log('Dumb or Random AI Move Made By Dumb AI!')
  }
}

const displayStats = function (data) {
  ui.updatePlayerRecord()
  gameLogic.calculateGameStats(store.games)
  $('#games-total').text('Total Games: ' + gameLogic.returnTotalGames())
  $('#games-win').text('Wins: ' + gameLogic.returnTotalWins())
  $('#games-loss').text('Losses ' + gameLogic.returnTotalLosses())
  $('#games-ties').text('Ties: ' + gameLogic.returnTotalTies())
  $('#games-abandoned').text('Abandoned: ' + gameLogic.returnTotalUnfinished())
}

const addHandlers = () => {
  $('#board0').on('click', capturePlayerAction)
  $('#board1').on('click', capturePlayerAction)
  $('#board2').on('click', capturePlayerAction)
  $('#board3').on('click', capturePlayerAction)
  $('#board4').on('click', capturePlayerAction)
  $('#board5').on('click', capturePlayerAction)
  $('#board6').on('click', capturePlayerAction)
  $('#board7').on('click', capturePlayerAction)
  $('#board8').on('click', capturePlayerAction)
  $('#newGame').on('click', newGame)
  $('#updateStats').on('click', displayStats)
  $(document).on('click', '#ai-off', turnAiOff)
  $(document).on('click', '#dumb-ai', turnOnDumbAi)
  $(document).on('click', '#smart-ai', turnOnSmartAi)
  $(document).on('click', '#smartest-ai', turnOnSmartestAi)
}

module.exports = {
  addHandlers
}
