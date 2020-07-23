const Room = require('../models/room')
const nameExistCheck = require('../Configs/nameExistCheck')

let error = null
let errorMessage = null

function pageInit(req, res) {
    clearErrStatus()
    res.render('editRoom', { 
        room: req.room,
        roomId: req.room.id,
        error: error, 
        errorMessage: errorMessage
    })
}

async function findRoom(req, res, next) {
    const room = await Room.findById(req.params.id)
    if (room == null) return res.redirect('/user/rooms')
    req.room = room
    next()
}

async function updateRoom(req, res) {
    const newName = req.body.name
    const newDescription = req.body.description
    const nameRegex = /[^A-Za-z\s]/i 
    const checkExist = await nameExistCheck(name, null, false)
    const room = {
        roomName: newName,
        description: newDescription
    }
    if (newName == null || newName == '') 
        return res.redirect('/user/rooms')

    if (nameRegex.test(newName)) {
        error = true
        errorMessage = 'Name Can Only Contain Alphabets!'
        return res.render('editRoom', {
            room: room,
            roomId: req.room.id,
            error: error, 
            errorMessage: errorMessage
        })
    }

    if (checkExist.nameExistFlag && newName !== req.room.roomName) {
            error = true
            errorMessage = 'Name Already Exist'
            return res.render('editRoom', {
                room: room,
                roomId: req.room.id,
                error: error, 
                errorMessage: errorMessage
            })
    } 

    try {
        const updateMethods = {
            roomName: newName,
            description: newDescription
        }
        await Room.findByIdAndUpdate(req.room.id, updateMethods)
        res.redirect('/user/rooms')
    } catch (err) {
        res.redirect('/user/rooms')
    }
}

function clearErrStatus() {
    if (errorMessage != null) {
        error = null
        errorMessage = null
    }
}

async function deleteRoom(req, res) {
    await Room.findByIdAndDelete(req.room.id)
    res.redirect('/user/rooms')
}

module.exports = {
    pageInit,
    findRoom,
    updateRoom,
    deleteRoom
}