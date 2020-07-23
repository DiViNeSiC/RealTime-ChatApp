const Room = require('../models/room')
const getLoggedUser = require('./getLoggedUser')

async function indexInit(req, res) {
    const rooms = await Room.find().sort({ roomName: 'asc' })
    const loggedUser = await getLoggedUser(req.payload.id)
    res.render('index', { rooms: rooms, user: loggedUser })
}


module.exports = indexInit