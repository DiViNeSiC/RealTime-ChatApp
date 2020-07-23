const express = require('express')
const router = express.Router()
const { pageInit, createRoom } = require('../Middlewares/createRoomController')

router.get('/', pageInit)

router.post('/', createRoom)

module.exports = router