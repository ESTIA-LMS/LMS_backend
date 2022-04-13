 
const httpError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/Users');

/**
 * Controller pour l'authentification.
 * @class auth_ctrl Authentication controller
 */

 const auth_ctrl = {}

/**
* Méthode pour la connexion / authentification de l'utilisateur.
* @param  {Request}  req Argument de requête HTTP à la fonction
* @param  {Response} res Argument de réponse HTTP à la fonction
* @param  {function} next Argument d'appel à la fonction middleware suivante dans l’application.
*/

auth_ctrl.login = function login(req,res,next){

    let {email, mdp} = req.body

    if(!email || !mdp){
        throw next(httpError(400, 'Paramètre manquant')) 
    }

    User.findOne({where:{Users_Email : email}, raw: true})
        .then(user => {

            //vérf user existe avec ce mail
            if(user === null){
                return res.status(401).json({message: `Email n'existe pas`})
            }


            //vérif du mdp
            bcrypt.compare(mdp, user.Users_Pwd)
                .then(match => {

                    if(!match){
                        return res.status(401).json({message: `Mauvais mot de passe`})
                    }

                    //Si test ok alros génération du token
                    const token = jwt.sign({
                        id: user.Users_Id,
                        nom: user.Users_Nom,
                        prenom: user.Users_Prenom
                    }, process.env.JWT_PHRASE_SECRETE, {expiresIn: '365 days'})

                    return res.status(200).json({access_token: token})
                })
                .catch(next)
        })
        .catch(err => res.status(500).json({message: `Le processus de connexion a échoué`}))
}


/**
* Méthode pour update le mot de passe utilisateur.
* @param  {Request}  req Argument de requête HTTP à la fonction
* @param  {Response} res Argument de réponse HTTP à la fonction
* @param  {function} next Argument d'appel à la fonction middleware suivante dans l’application.
*/

auth_ctrl.updateMdp = function update(req, res, next) {

    const id = req.params.id
    const {oldPwd, newPwd, newPwdConf} = req.body
  
    if (!Number(id)) return res.status(400).json({message:'On est mal barré'})
  
    //verif mdp identiques
    if(newPwd !== newPwdConf) return res.status(400).json({message:'les mots de passe ne sont pas identiques'})
  
    //verif conforme rgpd
    if(newPwd.length<=6)  return res.status(400).json({message:`Veuillez saisir un mdp d'au moins 6 charactère`})
  
    //Cherche user
    User.findOne({where:{Users_Id: id}, raw: true})
    .then(user => {
  
        //vérf user existe avec ce num
        if(user === null) return res.status(401).json({message: `Cet utilisateur n'existe pas`})
  
        //verif old mdp
        bcrypt.compare(oldPwd, user.Users_Pwd)
        .then(match => {

          if(!match) return res.status(401).json({message: `Ancien mot de passe ne correspond pas.`})
                    
          //Si ok alors hashage puis mdp update
          bcrypt.hash(newPwd, 10)
              .then(hash => {
                  //Update le mdp
                  User.update({Users_Pwd: hash}, {where:{Users_Id: id}, raw: true})
                      .then(user => res.status(200).json({message : 'Mdp mis à jour'}))
                      .catch(err => res.status(500).json({message : 'erreur update mdp'}))
              })
              .catch(err => res.status(500).json({message: 'Erreur hashage'}))
        })
        .catch(err => res.status(500).json({message: 'Erreur comparaison'}))
    })
    .catch(err => res.status(401).json({message: 'Erreur recherche utilisateur'}))
}



/**
 * Module pour le controller d'authentification.
 * @module auth/controller
 */

module.exports = auth_ctrl