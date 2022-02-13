'use strict'

const api = require('express')

const userCtrl = require('../controllers/users')
const jwtmiddleware = require('../middelwares/jwt_token')

let router   = api.Router()

router.get('/', jwtmiddleware, userCtrl.getAll)
router.post('/', userCtrl.create)
router.get('/:id', jwtmiddleware, userCtrl.getOne)
router.delete('/:id', jwtmiddleware, userCtrl.destroy)

module.exports = router