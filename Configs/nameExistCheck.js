const Room = require('../models/room.js')
const User = require('../models/user.js')

async function checkNameExist(name, email, isUser) {
    let nameExistFlag = false
    let emailExistFlag = false
    const lowerCaseName = name.toLowerCase()
    if (isUser) {
        const allUsers = await User.find()
        const lowerCaseEmail = email.toLowerCase()
        const nameExist = allUsers.some(user => user.name.toLowerCase() === lowerCaseName)
        const emailExist = allUsers.some(user => user.email.toLowerCase() === lowerCaseEmail) 
        if (nameExist) {
            nameExistFlag = true
        }
        if (emailExist) {
            emailExistFlag = true
        }
    }
    if (!isUser) {
        const allRooms = await Room.find()
        const nameExist = allRooms.some(room => room.roomName.toLowerCase() === lowerCaseName)
        if (nameExist) {
            nameExistFlag = true
        }
    }
    return {
        emailExistFlag,
        nameExistFlag
    }
}

module.exports = checkNameExist