'use strict'

const api = require('express')
let router   = api.Router()
let ctrl = require('../controllers/auth')


/*Routage de la ressource*/

router.post('/', ctrl.login)
router.patch('/:id', ctrl.updateMdp)

module.exports = router