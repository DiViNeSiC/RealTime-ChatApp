const Room = require('../models/room')

function updateChatRoom(user, room, method) {
    if (method === 'join') {
        addUser(user, room)
    }

    if (method === 'disconnect') {
        removeUser(user, room)
    }
}

async function addUser(user, room) {
    const newUsers = [...room.joinedUsers, user]
    await Room.findByIdAndUpdate(room.id, { joinedUsers: newUsers })
}

async function removeUser(user, room) {
    const newUsers = room.joinedUsers.filter(joinedUser => joinedUser.name !== user.name)
    await Room.findByIdAndUpdate(room.id, { joinedUsers: newUsers })
}

module.exports = updateChatRoom