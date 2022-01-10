'use strict'

const httpError = require('http-errors')
const bcrypt = require('bcrypt')
const { QueryTypes } = require('sequelize')
const User = require('../models/users')

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
  .catch(err => res.status(500).json({ message: 'Database Error'}))
 
}

/**
 * Create a new user.
 *
 * @param  {Request}  req
 * @param  {Response} res
 * @param  {function} next
 */
ctrl.create = function create(req, res, next) {

  let {nom, prenom, email, mdp, mdp1} = req.body

  if (mdp !== mdp1) throw httpError(400, 'Password are not equals')

  User.findOne({where:{Users_Email : email}, raw: true})
  .then(user => {

      //vérf user existe avec ce mail
      if(user !== null){
        return res.status(401).json({message: `Cet email est déja utilisé`})
      }

      bcrypt.hash(mdp, 10)
      .then(hash => {
        User
        .create({Users_Nom: nom, Users_Prenom: prenom, Users_Email: email, Users_Pwd: hash })
        .then(user => {
          console.log(hash)
          return res.status(201).send(user)
        })
        .catch(next)
      })
      .catch(err => res.status(500).json({message: err}))
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
