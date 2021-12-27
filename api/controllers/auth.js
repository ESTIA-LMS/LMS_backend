
const httpError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const User = require('../models/users');
const ctrl = {}


/**
* Connexion.
*
* @param  {Request}  req
* @param  {Response} res
* @param  {function} next
*/
ctrl.login = function login(req,res,next){

    let {email, mdp} = req.body

    if(!email || !mdp){
        throw next(httpError(400, 'Paramètre manquant')) 
    }

    User.findOne({where:{Users_Email : email}, raw: true})
        .then(user => {

            //vérf user existe avec ce mail
            if(user === null){
                return res.status(401).json({message: `Ce munéro de téléphone n'est associé à aucun employé sur GX`})
            }


            //vérif du mdp
            bcrypt.compare(mdp, user.Users_Pwd)
                .then(match => {

                    if(!match){
                        return res.status(401).json({message: `Mauvais mot de passe`})
                    }

                    //Si test ok alros génération du token
                    const token = jwt.sign({
                        id: user.n_itc,
                        nom: user.Nom_commercial,
                        premom: user.Prenom,
                        phone: user.Users_Pwd
                    }, process.env.JWT_PHRASE_SECRETE, {expiresIn: '12 hour'})

                    return res.json({access_token: token})
                })
                .catch(err => res.status(500).json({message: 'La vérification du mot de passe a échoué'}))
        })
        .catch(err => res.status(500).json({message: `Le processus de connexion a échoué`}))
}


/**
* Update mdp.
*
* @param  {Request}  req
* @param  {Response} res
* @param  {function} next
*/
ctrl.updateMdp = function updateMdp(req,res,next){

    let {email, mdp1, mdp2} = req.body

    //vérif du numéro
    if(!email){
        throw next(httpError(400, 'Veuillez renseigner un numéro de téléphone')) 
    }
    //verif mdp identiques
    if(mdp1 !== mdp2){
        throw next(httpError(400, 'les mots de passe ne sont pas identiques')) 
    }
    //verif conforme rgpd
    if(mdp1.length<9){
        throw next(httpError(400, 'Veuillez saisir un mdp de plus de 9 charactère')) 
    }

    //Cherche employé
    User.findOne({where:{Users_Pwd: email}, raw: true})
        .then(user => {

            //vérf employé existe avec ce num
            if(user === null){
                return res.status(401).json({message: `Cet employé n'existe pas`})
            }
            
            //Si existe alors hashage puis mdp update
            bcrypt.hash(mdp1, 10)
                .then(hash => {

                    //Update le mdp
                    user.update({Users_Pwd: hash}, {where:{Users_Email: email}, raw: true})
                        .then(user => res.status(200).json({message : 'Mdp mis à jour'}))
                        .catch(err => res.status(500).json({message : 'erreur update mdp'}))
                })
                .catch(err => res.status(500).json({message:'Erreur interne'}))

        })
        .catch(err => res.status(401).json({message: `Erreur`}))
}





module.exports = ctrl