'use strict'

const store = require('../store')

// Sign UP ________________________
const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = (error) => {
  console.error(error)
}

//  SIGN IN ________________________

const signInSuccess = (data) => {
  console.log('signIn success ran, data is: ', data)
  store.user = data.user
}

const signInFailure = (error) => {
  console.error('signIn error ran, error is: ', error)
}

//  SIGN OUT ________________________

const signOutSuccess = (data) => {
  console.log('signOut success ran, and nothing was returned')
  console.log('store is', store)
  store.user = null
  console.log('store is', store)
}

const signOutFailure = (error) => {
  console.error('signOut error ran, error is: ', error)
}

//  Change Password ________________________

const changePasswordSuccess = (data) => {
  console.log('Password was succesfully changed')
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
