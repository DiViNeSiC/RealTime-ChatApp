const updateChatRoom = require('./chatroomUsersController')

async function newUser(socket, user, room) {
    socket.join(room.id)
    updateChatRoom(user, room, 'join')
    const data = {
        username: user.name,
        allUsers: room.joinedUsers
    }
    console.log(room.joinedUsers);
    socket.to(room.id).broadcast.emit('user-connected', data)
}

module.exports = newUser