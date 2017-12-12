'use strict'

let store = require('../store')

// Sign UP SUCCESS AND FAILURE MESSAGING ________________________
const signUpSuccess = (data) => {
  console.log(data)
  $('#signUpForm').modal('hide')
  $('#signUpPlayerPasswordConfirm').val('')
  $('#signUpPlayerPassword').val('')
  $('#signUpPlayerEmail').val('')
  $('#sign-up-failure-alert').hide()
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
  $('#sign-in-failure-alert').hide()
// New report
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
  $('#sign-in-failure-alert').show()
}

//  SIGN OUT SUCCESS AND FAILURE MESSAGING ______________________

const signOutSuccess = () => {
  console.log('signOut success ran, and nothing was returned')

// Hide elements
  console.log(store.user)
  $('#game-board').hide()
  $('#newGame').hide()
  $('#ai-menu').hide()
  $('#updateStats').hide()
  $('#change-pass-but').hide()
  $('#sign-out').hide()
  // Update the tracker information
  $('#game-messaging').text('Please log in to play')
  $('#games-total').text('Total Games: ')
  $('#games-win').text('Wins: ')
  $('#games-loss').text('Losses ')
  $('#games-ties').text('Ties: ')
  $('#games-abandoned').text('Abandoned: ')
  // Show sign up and signin buttons
  $('#signupbut').show()
  $('#signinbut').show()

  store = null
  console.log(store.user)
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
}

//  Change Password SUCCESS AND FAILURE MESSAGING ______________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed')
  $('#changePasswordForm').modal('hide')
  $('#changePassNew').val('')
  $('#changePassOld').val('')
}

const changePasswordFailure = (error) => {
  console.log('Password was not succesfully changed', error)
}

const signInClose = function () {
  $('#signInPlayerPassword').val('')
  $('#signInPlayerEmail').val('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  signInClose
}
