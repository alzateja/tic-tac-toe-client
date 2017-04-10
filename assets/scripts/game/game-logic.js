'use strict'
let openMoves = []
let winCondition = ''
let xWinnableOneMove = []
let oWinnableOneMove = []
let xWinnableTwoMove = []
let oWinnableTwoMove = []
let xMoveValues = {}
let oMoveValues = {}
let xOptimalMove = null
let oOptimalMove = null
let optimalMove = null
let gameWon = false
let gameTied = false
let profileTotalGames = 0
let profileWins = 0
let profileTies = 0
let profileLosses = 0
let profileUnfinishedGames = 0

// Game Win Options
const allWins = {
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  col1: [0, 3, 6],
  col2: [1, 4, 7],
  col3: [2, 5, 8],
  diag1: [0, 4, 8],
  diag2: [6, 4, 2]
}

const calculateGameStats = function (data) {
  profileTotalGames = 0
  profileWins = 0
  profileTies = 0
  profileLosses = 0
  profileUnfinishedGames = 0

  let tempBoardForCalc = []

  for (const prop in data) {
    gameWon = false
    gameTied = false
    tempBoardForCalc = data[prop]['cells']
    evaluateBoard(tempBoardForCalc)
    profileTotalGames++
  }
  console.log('FInished calculating Game stats')
  console.log('Total: ' + profileTotalGames + ' , Wins: ' + profileWins +
  ' , Losses: ' + profileLosses + ', Ties: ' + profileTies + ', DNF: ' + profileUnfinishedGames)
  console.log(profileTotalGames === profileWins + profileTies + profileLosses + profileUnfinishedGames)
}

//  0 - Reset and run functions. Master ControlFunction

const runLogic = function (board) {
  // RESET VARIABLES
  openMoves = []
  winCondition = ''
  xWinnableOneMove = []
  oWinnableOneMove = []
  xWinnableTwoMove = []
  oWinnableTwoMove = []
  xMoveValues = {}
  oMoveValues = {}
  xOptimalMove = null
  oOptimalMove = null
  gameWon = false
  gameTied = false

//  1 -  Identify Possible outstanding moves
  determineOpenMoves(board)
// 2 - Evaluate board to Check Victory or for Ties and unwinnable games
  evaluateBoard(board)
  // 3 - Calcuate the Value of Moves and put in Object
  CalculateMoveValues()
  // 4- Calculate the Optimal Move based on
  pickOptimalMove()

/*
  console.log('Summary---')
  console.log('x Optimal Move - ' + xOptimalMove)
  console.log('o Optimal Move - ' + oOptimalMove)
  console.log('Game Tied - ' + gameTied)
  console.log('Game Won - ' + gameWon)
  console.log('win condition - ' + winCondition)
  console.log('End Summary---')
  */
}

//  1 -  Identify Possible outstanding moves
const determineOpenMoves = function (board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      openMoves.push(i)
    }
  }
}

// 2 - Evaluate board to Check Victory or for Ties
const evaluateBoard = function (board) {
  let unwinnableCount = 0
  let x = []
  let o = []
  let blank = []
  for (const prop in allWins) {
    x = []
    o = []
    blank = []
    // Description for each stat
    for (let i = 0; i < 3; i++) {
      if (board[allWins[prop][i]] === 'x') {
        x.push(allWins[prop][i])
      }
      if (board[allWins[prop][i]] === 'o') {
        o.push(allWins[prop][i])
      }
      if (board[allWins[prop][i]] === '') {
        blank.push(allWins[prop][i])
      }
    }
      //  Check for wins
    if (x.length === 3 || o.length === 3) {
      // console.log('Winner!')
      winCondition = prop
      gameWon = true

      if (x.length === 3) {
        profileWins++
      }
      if (o.length === 3) {
        profileLosses++
      }

      return
    }

       // Add to unwinnable Count winner
    if (x.length > 0 && o.length > 0) {
      unwinnableCount++
    //  console.log(prop + ' is unwinnable. Count is ' + unwinnableCount)
    }

    if (x.length > 1 && blank.length === 1) {
      xWinnableOneMove.push(blank[0])
    //  console.log(prop + ' is winnable in 1 move. The move for x is selecting : ' + xWinnableOneMove)
    }

    if (o.length > 1 && blank.length === 1) {
      oWinnableOneMove.push(blank[0])
    //  console.log(prop + ' is winnable in 1 move. The move for o is selecting : ' + oWinnableOneMove)
    }
    if (x.length > 0 && blank.length === 2) {
      xWinnableTwoMove.push(blank[0])
      xWinnableTwoMove.push(blank[1])
    //  console.log(prop + ' is winnable in 2 moves. The move for x is selecting : ' + xWinnableTwoMove)
    }
    if (o.length > 0 && blank.length === 2) {
      oWinnableTwoMove.push(blank[0])
      oWinnableTwoMove.push(blank[1])
    //  console.log(prop + ' is winnable in 2 moves. The move for x is selecting : ' + oWinnableTwoMove)
    }

  /* console.log(prop + ' distribution -  x: ' + x.length + ';o: ' + o.length + ';blank: ' + blank.length)
    console.log('values in ' + prop + ' = ' +
    allWins[prop][0] + ' : ' + board[allWins[prop][0]] + ', ' +
    allWins[prop][1] + ' : ' + board[allWins[prop][1]] + ', ' +
    allWins[prop][2] + ' : ' + board[allWins[prop][2]])
    */
  }
  if (unwinnableCount === 8) {
    // console.log('Game is tied or unwinnable')
    gameTied = true
    profileTies++
    return
  }
/*
  console.log('X Two move set: ' + xWinnableTwoMove)
  console.log('O Two move set: ' + oWinnableTwoMove)
  console.log('O One move set: ' + oWinnableOneMove)
  console.log('X One move set: ' + xWinnableOneMove)
  */
  // console.log('Keep playing')
  profileUnfinishedGames++
}

// 3 - Calcuate the Value of Moves and put in Object
const CalculateMoveValues = function () {
  xMoveValues = {}
  oMoveValues = {}
// BEGIN X CALC
  // X - 2 move count and value = VALUE of 1 for each move
  if (xWinnableTwoMove.length > 0) {
    for (let i = 0; i < xWinnableTwoMove.length; i++) {
      if (xMoveValues[xWinnableTwoMove[i]] === undefined) {
        xMoveValues[xWinnableTwoMove[i]] = 0
      }
      xMoveValues[xWinnableTwoMove[i]]++
    //  console.log('2 X move count: ', xMoveValues)
    }
  }
   // X - 1 move count and value = VALUE of 3 for each move
   // Moves will count as 9 for
  if (xWinnableOneMove.length > 0) {
    for (let i = 0; i < xWinnableOneMove.length; i++) {
      if (xMoveValues[xWinnableOneMove[i]] === undefined) {
        xMoveValues[xWinnableOneMove[i]] = 0
      }
      if (oMoveValues[xWinnableOneMove[i]] === undefined) {
        oMoveValues[xWinnableOneMove[i]] = 0
      }
      // console.log(xMoveValues)
      // console.log(oMoveValues)
      xMoveValues[xWinnableOneMove[i]] += 9
      oMoveValues[xWinnableOneMove[i]] += 6
      // console.log(xMoveValues)
      // console.log(oMoveValues)
    }
  }
//  console.log('AFTER 1 X move count: ', xMoveValues)
// End X Calc

  // BEGIN O CALC
  // O - 2 move count
  if (oWinnableTwoMove.length > 0) {
    for (let i = 0; i < oWinnableTwoMove.length; i++) {
      if (oMoveValues[oWinnableTwoMove[i]] === undefined) {
        oMoveValues[oWinnableTwoMove[i]] = 0
      }
      oMoveValues[oWinnableTwoMove[i]]++
    //  console.log('2 O move count: ', oMoveValues)
    }
  }

   // O - 1 move count
  if (oWinnableOneMove.length > 0) {
    for (let i = 0; i < oWinnableOneMove.length; i++) {
      if (oMoveValues[oWinnableOneMove[i]] === undefined) {
        oMoveValues[oWinnableOneMove[i]] = 0
      }
      if (xMoveValues[oWinnableOneMove[i]] === undefined) {
        xMoveValues[oWinnableOneMove[i]] = 0
      }
      // console.log(xMoveValues)
      // console.log(oMoveValues)
      oMoveValues[oWinnableOneMove[i]] += 9
      xMoveValues[oWinnableOneMove[i]] += 6
      // console.log(xMoveValues)
      // console.log(oMoveValues)
    }
  }
//  console.log('AFTER 1 O move count: ', oMoveValues)
// End O Calc
}

// 4- Calculate the Optimal Move based on
const pickOptimalMove = function () {
  let xhighestValuesKeys = []
  let ohighestValuesKeys = []
  let sharedHighestValuesKeys = []
  let xhighestValuesNumber = 0
  let ohighestValuesNumber = 0
  // let counter = 0
  let num = null

  // DEDUPE AND DETERMINE HIGHEST MOVES - PLAYER O
  for (const prop in oMoveValues) {
    // counter++
    // console.log(counter + ': move - ' + prop + ' , value - ' + oMoveValues[prop])
      // reset if higher value found
    if (oMoveValues[prop] > ohighestValuesNumber) {
      // console.log(ohighestValuesKeys)
      ohighestValuesKeys = []
      ohighestValuesNumber = oMoveValues[prop]
    }
      // post higher value moves
    if (oMoveValues[prop] === ohighestValuesNumber) {
    //  console.log(ohighestValuesKeys)
      ohighestValuesKeys.push(prop)
    }
  }

// _______________________________
// Reset variables
  num = null
  // counter = 0
 // DEDUPE AND DETERMINE HIGHEST MOVES - PLAYER X
  for (const prop in xMoveValues) {
    // counter++
    // console.log(counter + ': move - ' + prop + ' , value - ' + xMoveValues[prop])
      // reset if higher value found
    if (xMoveValues[prop] > xhighestValuesNumber) {
      // console.log(xhighestValuesKeys)
      xhighestValuesKeys = []
      xhighestValuesNumber = xMoveValues[prop]
    }
    // post higher value moves
    if (xMoveValues[prop] === xhighestValuesNumber) {
      // console.log(xhighestValuesKeys)
      xhighestValuesKeys.push(prop)
    }
  }
    //  END OF PARING DOWN DESCISIONS
  let tempStore = null
  if (ohighestValuesKeys.length !== 0 && xhighestValuesKeys.length !== 0) {
    for (let o = 0; o < ohighestValuesKeys.length; o++) {
      tempStore = ohighestValuesKeys[o]
      for (let x = 0; x < xhighestValuesKeys.length; x++) {
        if (tempStore === xhighestValuesKeys[x]) {
          sharedHighestValuesKeys.push(xhighestValuesKeys[x])
        }
      }
    }
  }
  // console.log(sharedHighestValuesKeys)
    // RANDOMLY DETERMINE A MOVE BASED ON EQUAL VALUE

  if (xhighestValuesKeys.length > 0) {
    num = Math.floor(Math.random() * ((xhighestValuesKeys.length - 1) - 0 + 1)) + 0
    // SET OPTIMAL O MOVE
    xOptimalMove = xhighestValuesKeys[num]
  } else if (xhighestValuesKeys.length === 1) {
    xOptimalMove = xhighestValuesKeys[0]
  } else {
    xOptimalMove = null
  }

  if (ohighestValuesKeys.length > 0) {
    num = Math.floor(Math.random() * ((ohighestValuesKeys.length - 1) - 0 + 1)) + 0
    // SET OPTIMAL O MOVE
    oOptimalMove = ohighestValuesKeys[num]
  } else if (ohighestValuesKeys.length === 1) {
    oOptimalMove = ohighestValuesKeys[0]
  } else {
    oOptimalMove = null
  }

  if (sharedHighestValuesKeys.length > 0) {
    num = Math.floor(Math.random() * ((sharedHighestValuesKeys.length - 1) - 0 + 1)) + 0
  // SET BOTH OPTIMAL MOVES
    optimalMove = sharedHighestValuesKeys[num]
    console.log('shared!!!!!')
  } else if (sharedHighestValuesKeys.length === 1) {
    optimalMove = sharedHighestValuesKeys[0]
  } else {
    optimalMove = null
  }
  // console.log(xOptimalMove)
//  console.log(oOptimalMove)
}
// _______________ RETURN VARIABLES _________________________

const returnXOptimalMove = function () {
  return xOptimalMove
}
const returnOOptimalMove = function () {
  return oOptimalMove
}
const returnOptimalMove = function () {
  return optimalMove
}
const returnGameTied = function () {
  return gameTied
}
const returnGameWon = function () {
  return gameWon
}
const returnWinCondition = function () {
  return winCondition
}

const returnTotalWins = function () {
  return profileWins
}
const returnTotalLosses = function () {
  return profileLosses
}
const returnTotalTies = function () {
  return profileTies
}
const returnTotalGames = function () {
  return profileTotalGames
}

const returnTotalUnfinished = function () {
  return profileUnfinishedGames
}

module.exports = {
  runLogic,
  returnWinCondition,
  returnGameWon,
  returnGameTied,
  returnXOptimalMove,
  returnOOptimalMove,
  returnOptimalMove,
  calculateGameStats,
  returnTotalGames,
  returnTotalTies,
  returnTotalLosses,
  returnTotalWins,
  returnTotalUnfinished
}
