'use strict'

const api = require('express')
let router   = api.Router()
let Ctrl = require('../controllers/auth')


/*Routage de la ressource*/

router.post('/', Ctrl.login)
router.patch('/', Ctrl.updateMdp)


module.exports = router