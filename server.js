require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const session = require('express-session')
const jwt = require('jwt-then')
const methodOverride = require('method-override')

const User = require('./models/user')
const Room = require('./models/room')

const registerNewUser = require('./Middlewares/registerController')
const indexInit = require('./Middlewares/indexPageInit')
const { auth, notAuth } = require('./Middlewares/auth')
const login = require('./Middlewares/loginController')

const settingsRouter = require('./routes/settings')
const createRoomRouter = require('./routes/createRoom')
const userRoomsRouter = require('./routes/userRooms')
const editRoomRouter = require('./routes/editRoom')
const chatRoomRouter = require('./routes/chatRoom')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to Mongoose'))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(methodOverride('_method'))

app.get('/login', notAuth, (req, res) => {
    res.render('login', { message: null })
})

app.post('/login', notAuth, login)

app.get('/register', notAuth, (req, res) => {
    res.render('register', { userExistError: false, errMessage: null })
})

app.post('/register', notAuth, registerNewUser)

app.get('/', auth, indexInit)

app.delete('/logout', auth, (req, res) => {
    req.session.token = null
    res.redirect('/login')
})

app.use('/user/settings', auth, settingsRouter)
app.use('/room/create', auth, createRoomRouter)
app.use('/user/rooms', auth, userRoomsRouter)
app.use('/room/edit', auth, editRoomRouter)
app.use('/chatroom', auth, chatRoomRouter)


const newUser = require('./ChatRoomEvents/newUser')
const chatMessage = require('./ChatRoomEvents/chatMessage')
const userDisconnect = require('./ChatRoomEvents/userDisconnect')

io.use( async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        socket.userId = payload.id
        socket.roomId = socket.handshake.query.roomId
        next()
    } catch (err) {
        console.error(err)
    }

})
io.on('connection', async (socket) => {
    const user = await User.findById(socket.userId)
    const room = await Room.findById(socket.roomId)

    socket.on('new-user', () => {
        newUser(socket, user, room)
    })

    socket.on('send-chat-message', message => {
        chatMessage(socket, message, user, room)
    })

    socket.on('disconnect', () => {
        userDisconnect(socket, user, room)
    })

})

server.listen(process.env.PORT || 3000)
