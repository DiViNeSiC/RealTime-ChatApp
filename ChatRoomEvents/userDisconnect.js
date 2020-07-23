async function userDisconnect(socket, user, room) {
    socket.to(room.id).broadcast.emit('user-disconnected', user.name)
    delete user
}

module.exports = userDisconnect