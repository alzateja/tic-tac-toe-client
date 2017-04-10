'use strict'

let store = require('../store')

// Sign UP SUCCESS AND FAILURE MESSAGING ________________________
const signUpSuccess = (data) => {
  console.log(data)
  $('#signUpForm').modal('hide')
  $('#signUpPlayerPasswordConfirm').val('')
  $('#signUpPlayerPassword').val('')
  $('#signUpPlayerEmail').val('')
}

const signUpFailure = (error) => {
  console.error(error)
}

//  SIGN IN SUCCESS AND FAILURE MESSAGING ________________________

const signInSuccess = (data) => {
  console.log('signIn success ran, data is: ', data)
  store.user = data.user
  $('#game-messaging').text('Click New Game to Begin')
  // Hide Modal
  $('#signInForm').modal('hide')
  // Clear fields
  $('#signInPlayerPassword').val('')
  $('#signInPlayerEmail').val('')
  // Show AI ,new game, sign out, change pass, and options
  $('#newGame').show()
  $('#ai-menu').show()
  $('#change-pass-but').show()
  $('#sign-out').show()
  $('#signupbut').hide()
  $('#signinbut').hide()
  $('#updateStats').show()
// New report
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
}

//  SIGN OUT SUCCESS AND FAILURE MESSAGING ______________________

const signOutSuccess = (data) => {
  console.log('signOut success ran, and nothing was returned')
  store = null
  $('#game-board').hide()
  $('#newGame').hide()
  $('#ai-menu').hide()
  $('#game-messaging').text('Please log in to play')
  $('#games-total').text('Total Games: 0')
  $('#games-win').text('Wins: 0')
  $('#games-loss').text('Losses 0')
  $('#games-ties').text('Ties: 0')
  $('#games-abandoned').text('Abandoned:: 0')
  $('#signupbut').show()
  $('#signinbut').show()
  $('#updateStats').hide()
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
}

//  Change Password SUCCESS AND FAILURE MESSAGING ______________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed')
  $('#changePasswordForm').modal('hide')
}

const changePasswordFailure = (error) => {
  console.log('Password was not succesfully changed', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess
}
