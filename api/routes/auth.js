'use strict'

const api = require('express')
let router   = api.Router()
let Ctrl = require('../controllers/users')


/*Routage de la ressource*/

router.post('/', Ctrl.login)
router.patch('/', Ctrl.updateMdp)


module.exports = router