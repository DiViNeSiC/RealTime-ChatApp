const express = require('express')
const router = express.Router()
const getLoggedUser = require('../Middlewares/getLoggedUser')
const Room = require('../models/room')

router.get('/', async (req, res) => {
    const loggedUser = await getLoggedUser(req.payload.id)
    const userRooms = await Room.find({ creatorId: loggedUser.id })
    let message = null
    
    if (userRooms == null) {
        message = 'You have no rooms created'
    }
    res.render('userRooms', {
        user: loggedUser,
        userRooms: userRooms,
        message: message
    })
})

module.exports = router