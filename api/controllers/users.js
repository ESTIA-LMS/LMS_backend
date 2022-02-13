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

  if (mdp !== mdp1) return res.status(401).json({message: 'Les mots de passe ne sont pas identiques'})

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
          return res.status(201).json({user: user})
        })
        .catch(next)
      })
      .catch(err => res.status(500).json({message: err}))
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
ctrl.destroy = async function destroy(req, res, next) {

    // Vérification de l'id utilisateur
    const id = parseInt(req.params.id)
    if(!id){
        return res.status(400).json({message:'Manque id!'})
    }
    
    // Suppression définitive de l'utilisateur
    try {
        const data = await User.destroy({where:{Users_Id: id}, force: true})
        return res.status(200).json({message: 'Utilisateur supprimé', data: data })

    } catch (err) {
        return res.status(500).json({message: err})
    }     
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
    .findByPk(req.params.id)
    .then(user => {
      if (user) {
        return res.status(200).send(user)
      }

      throw next(httpError(404, 'Cannot find user: ' + req.params.id))
    })
    .catch(next)
  
}

module.exports = ctrl
