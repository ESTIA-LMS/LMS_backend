'use strict'

const express = require('express')
const app = express()

const userRtr = require('./users')
//const authRtr = require('./auth')
const jwtmiddleware = require('../middelwares/jwt_token')

app.get('/',(req,res,next) => res.send('Bonjour et bienvenue'))

//api.app.use('/login', authRtr)
app.use('/users', userRtr)

app.get('*', (req,res,next) => res.status(501).send(`Tu m'as l'air un peu perdu`))

module.exports = app