'use strict'

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

/*vérif du token*/
const check = (req,res,next) =>{

    const {email, codeVerif}= req.body

    client.verify.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks
      .create({to: email, code: codeVerif})
      .then(data => {
          if(data.status !== 'approved'){
              return res.status(401).json({message:`Mauvais code`})
          }
      })
      .catch(err =>{return res.status(500).json({message: err}) })

    next()
}

module.exports = check