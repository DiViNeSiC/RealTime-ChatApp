const socket = io('https://real-time-chat-app-testing.herokuapp.com', {
    query: {
        token: token,
        roomId: roomId
    }
})
const messageContainer = document.getElementById('messageContainer')
const messageForm = document.getElementById('sendContainer')
const messageInput = document.getElementById('messageInput')

if (messageForm != null) {
    startApp()
}

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, false)
})

socket.on('user-connected', data => {
    appendMessage(`${name} Joined`, true)
})

socket.on('user-disconnected', data => {
    appendMessage(`${name} left`, true)
})

function startApp() {
    appendMessage('You joined!', true)
    socket.emit('new-user')
    messageForm.addEventListener('submit', event => {
        event.preventDefault()
        const message = messageInput.value
        socket.emit('send-chat-message', message)
        appendMessage(`You: ${message}`)
        messageInput.value = ''
    })
}

function appendMessage(message, isJoined) {
    const messageDiv = document.createElement('div')
    messageDiv.innerText = message
    isJoined ? messageDiv.classList.add('join') : messageDiv.classList.add('msg')
    messageContainer.appendChild(messageDiv)
}