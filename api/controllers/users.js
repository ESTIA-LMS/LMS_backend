'use strict'

const httpError = require('http-errors')
const { QueryTypes } = require('sequelize')
const User = require('../models/init-models').Users

const ctrl = {}

/**
 * Display all users.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.getAll = function getAll(req, res, next) {
  User.sequelize.query(`SELECT * FROM USERS order by Users_Create_Date DESC`,
    {
      type: QueryTypes.SELECT
    })
  .then(users => res.json({ data: users }))
  .catch(err => res.status(500).json({ message: 'Database Error', err : err}))
 
}

/**
 * Create a new user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.create = function create(req, res, next) {
  User
    .create(req.body)
    .then(function(user) {
      return res.status(201).send(user)
    })
    .catch(next)
  
}

/**
 * Update an user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.update = function update(req, res, next) {
  User
    .findOneAndUpdate({Users_id: req.params.id}, req.body, {new: true})
    .then(function(user) {
      if (user) {
        return res.status(200).send(user)
      }

      throw httpError(404, 'Cannot find user: ' + req.params.id)
    })
    .catch(next)
  
}

/**
 * Remove a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.destroy = function destroy(req, res, next) {
  User
    .findOneAndRemove({Users_id: req.params.id})
    .then(function(user) {
      return res.status(200).send(user)
    })
    .catch(next)
  
}

/**
 * Display a given user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.getOne = function getOne(req, res, next) {
  User
    .findById(req.params.id)
    .then(function(user) {
      if (user) {
        return res.status(200).send(user)
      }

      throw next(httpError(404, 'Cannot find user: ' + req.params.id))
    })
    .catch(next)
  
}

module.exports = ctrl
