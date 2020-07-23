async function chatMessage(socket, message, user, room) {
    socket.to(room.id).broadcast.emit('chat-message', { 
        message: message, 
        name: user.name
    })
}

module.exports = chatMessage