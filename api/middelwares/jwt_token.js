'use strict'

const jwt = require('jsonwebtoken')

/*extraction du token*/

const exctractBearer = authorization =>{

    if(typeof(authorization)!== 'string'){
        return false
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i)

    return matches && matches[2]
}

/*vérif du token*/
const checkTokenMiddleware = (req,res,next) => {

    const token = req.headers.authorization && exctractBearer(req.headers.authorization)

    if(!token){
        return res.status(403).json({message:`Vous n'êtes pas identifé`})
    }

    jwt.verify(token, process.env.JWT_PHRASE_SECRETE, (err, decodedToken) => {
        if(err){
            res.status(403).json({message: 'Bad token'})
        }
    })
    next()
}

module.exports = checkTokenMiddleware

