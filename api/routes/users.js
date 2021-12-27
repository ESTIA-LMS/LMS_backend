'use strict'

const api = require('express')
let router   = api.Router()
let userCtrl = require('../controllers/users')

const jwtmiddleware = require('../middelwares/jwt_token')

router.get('/',jwtmiddleware, userCtrl.getAll)
router.post('/', userCtrl.create)
router.get('/:id',jwtmiddleware, userCtrl.getOne)
router.put('/:id',jwtmiddleware, userCtrl.update)
router.delete('/:id',jwtmiddleware, userCtrl.destroy)

module.exports = router