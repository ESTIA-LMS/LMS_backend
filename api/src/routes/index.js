'use strict'

const express = require('express')
const app = express()

const userRtr = require('./users')
const authRtr = require('./auth')


app.get('/',(req,res,next) => res.send('Bonjour et bienvenue'))

app.use('/auth', authRtr)
app.use('/users', userRtr)

app.get('*', (req,res,next) => res.status(501).send(`Tu m'as l'air un peu perdu`))

module.exports = app