// const socket = io('https://real-time-chat-app-testing.herokuapp.com')
// http://localhost:3000
const socket = io('https://real-time-chat-app-testing.herokuapp.com', {
    query: {
        token: token,
        roomId: roomId
    }
})
const messageContainer = document.getElementById('messageContainer')
const messageForm = document.getElementById('sendContainer')
const messageInput = document.getElementById('messageInput')
const onlineMembers = document.getElementById('onlineMembers')
if (messageForm != null) {
    onlineMembers.innerText = `${onlineMemberCount} Online`
    startApp()
}

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, false)
})

socket.on('user-connected', data => {
    appendMessage(`${name} Joined`, true)
    incrementOnlineMembers()
})

socket.on('user-disconnected', data => {
    appendMessage(`${name} left`, true)
    decrementOnlineMembers()
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

function incrementOnlineMembers() {
    onlineMemberCount++
    onlineMembers.innerText = `${onlineMemberCount} Online`
}

function decrementOnlineMembers() {
    onlineMemberCount--
    onlineMembers.innerText = `${onlineMemberCount} Online`
}