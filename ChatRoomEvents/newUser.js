async function newUser(socket, user, room) {
    socket.join(room.id)
    socket.to(room.id).broadcast.emit('user-connected', user.name)
}

module.exports = newUser