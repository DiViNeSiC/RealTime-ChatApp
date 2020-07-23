const Room = require('../models/room')
const nameExistCheck = require('../Configs/nameExistCheck')
const getLoggedUser = require('./getLoggedUser')

let error = null
let errorMessage = null

function pageInit(req, res) {
    const room = { 
        roomName: '',
        description: ''
    }
    clearErrStatus()
    res.render('createRoom', { room: room, error: error, errorMessage: errorMessage })
}

async function createRoom(req, res) {
    const { name, description } = req.body
    const nameRegex = /[^A-Za-z\s]/i 
    const creator = await getLoggedUser(req.payload.id)
    const creatorId = creator.id
    const checkExist = await nameExistCheck(name, null, false)
    const room = { 
        roomName: name,
        description: description
    }
    
    if (name == null || name == '') return res.redirect('/room/create')

    if (nameRegex.test(name)) {
        error = true
        errorMessage = 'Name Can Only Contain Alphabets!'
        return res.render('createRoom', {
            room: room,
            error: error, 
            errorMessage: errorMessage
        })
    }
    if (checkExist.nameExistFlag) {
        error = true
        errorMessage = 'Name Already Exist'
        return res.render('createRoom', { room: room,  error: error, errorMessage: errorMessage })
    }

    try {
        const newRoom = new Room({
            roomName: name,
            description: description,
            creator: creator,
            creatorId: creatorId
        })
        await newRoom.save()
        res.redirect(`/chatroom/name=${newRoom.slug}`)
    } catch (err) {
        res.redirect('/room/create')
    }
}

function clearErrStatus() {
    if (errorMessage != null) {
        error = null
        errorMessage = null
    } 
}

module.exports = {
    pageInit, 
    createRoom
}