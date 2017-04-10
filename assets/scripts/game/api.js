'use strict'

const config = require('../config.js')
const store = require('../store')

const createGames = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const gameJoined = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const gameUpdated = function (data, id) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}
const findGame = function () {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const getFinishedGames = function () {
  return $.ajax({
    async: false,
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  findGame,
  getFinishedGames,
  createGames,
  gameJoined,
  gameUpdated

}
