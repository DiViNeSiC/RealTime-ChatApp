const express = require('express')
const router = express.Router()
const {
    pageInit,
    findRoom,
    updateRoom,
    deleteRoom
} = require('../Middlewares/editRoomController')

router.get('/id=:id', findRoom, pageInit)

router.put('/update/id=:id', findRoom, updateRoom) 

router.delete('/delete/id=:id', findRoom, deleteRoom)

module.exports = router