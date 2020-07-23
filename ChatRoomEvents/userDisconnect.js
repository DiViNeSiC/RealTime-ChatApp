const updateChatRoom = require('./chatroomUsersController')

async function userDisconnect(socket, user, room) {
    updateChatRoom(user, room, 'disconnect')
    const data = {
        username: user.name,
        allUsers: room.joinedUsers
    }
    console.log(room.joinedUsers);
    socket.to(room.id).broadcast.emit('user-disconnected', data)
    delete user
}

module.exports = userDisconnect