'use strict'

const config = require('../config.js')
const store = require('../store')

// SIGNUP AJAX CREATES USER OBJECT___________________
const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

// SIGNIN AJAX CREATES  A TOKEN___________________
const signIn = (data) => {
  console.log('signIn check')
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
    // data : data

  })
}

// SIGNOUT AJAX DELETES A TOKEN___________________
const signOut = () => {
  console.log('signOut check')
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// CHANGE PASSWORD AJAX MODIFIES THE PASSWORDS OBJECT___________________
const changePassword = (data) => {
  console.log('data is ', data)
  console.log('signIn check')
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {

  signUp,
  signIn,
  signOut,
  changePassword

}
