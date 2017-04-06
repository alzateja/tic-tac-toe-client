'use strict'
const store = require('../store')
const authApi = require('./api')
const authUi = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')

// get in the habit of naming your handlers, it eases debugging.
//
// also, follow a convention for handlers. here, I name my handler
// beginning with 'on' to denote that it is done when the GET /books
// button is clicked

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log(data)
  console.log(data.credentials.password)
  console.log(data.credentials.password_confirmation)
  console.log(data.credentials.email)
  if (data.credentials.password !== data.credentials.password_confirmation) {
    console.log('Your passwords do not match')
    return
  }

  if (
    data.credentials.password === '' || data.credentials.password_confirmation === '' || data.email === '') {
    console.log('No blank fields accepted')
    return
  }
  authApi.signUp(data)
  .then(authUi.signUpSuccess)
  .catch(authUi.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  console.log('Sign In run')
  const data = getFormFields(this)
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('Sign out run')
  if (store.user === undefined) {
    console.log('Not signed In')
    return
  }
  authApi.signOut()
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  console.log('Changing password run')
  const data = getFormFields(this)
  if (store.user === undefined) {
    console.log('Not signed In. Please Sign In to change password')
    return
  }
  if (
    data.passwords.old === '' || data.passwords.new === '') {
    console.log('No blank fields accepted')
    return
  }

  authApi.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordFailure)
}

const addHandlers = () => {
  $(document).on('submit', '#signUpForm', onSignUp)
  $(document).on('submit', '#signInForm', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#changePasswordForm').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
