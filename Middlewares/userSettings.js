const User = require('../models/user')
const bcrypt = require('bcrypt')
const nameExistCheck = require('../Configs/nameExistCheck')
const getLoggedUser = require('./getLoggedUser')

let notificationMessage = null
let notificationMessageStatus = null

async function pageInit(req, res) {
    res.render('userSettings', { 
        user: await getLoggedUser(req.payload.id), 
        message: notificationMessage, 
        status: notificationMessageStatus 
    })
    clearStatus()
}

async function getUserInformation(req, res) {
    const user = await getLoggedUser(req.payload.id)
    const { name, email, password } = req.body
    const passed = await bcrypt.compare(password, user.password)
    if (!passed) {
        notificationMessage = 'Incorrect Password'
        notificationMessageStatus = 'bad'
        return res.redirect('/user/settings')
    }
    updateUser(name, email, user)
    return res.redirect('/user/settings')
}

async function updateUser(name, email, user) {
    const checkExist = await nameExistCheck(name, email, true)
    const update = {
        name: name,
        email: email,
    }

    if (checkExist.nameExistFlag) {
        notificationMessage = 'Username Already Exist!'
        notificationMessageStatus = 'bad'
        return 
    }
    
    if (checkExist.emailExistFlag) {
        notificationMessage = 'Email Already Exist!'
        notificationMessageStatus = 'bad'
        return 
    }
    try {
        await User.findByIdAndUpdate(user.id, update)
        notificationMessage = 'Account Updated'
        notificationMessageStatus = 'good'
    } catch (err) {
        notificationMessage = 'Failed To Update Your Account'
        notificationMessageStatus = 'bad'
    }
}

async function changePassword(req, res) {
    const user = await getLoggedUser(req.payload.id)
    const { newPassword, currentPassword } = req.body
    const passed = await bcrypt.compare(currentPassword, user.password)
    if (!passed) {
        notificationMessage = 'Incorrect Password'
        notificationMessageStatus = 'bad'
        return res.redirect('/user/settings')
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10)
    const update = {
        password: newHashedPassword
    }

    try {
        await User.findByIdAndUpdate(user.id, update)
        notificationMessage = 'Password Changed'
        notificationMessageStatus = 'good'
        res.redirect('/user/settings')
    } catch (err) {
        notificationMessage = 'Failed To Change Your Password'
        notificationMessageStatus = 'bad'
        res.redirect('/user/settings')
    }
}

async function deleteUserAccount(req, res) {
    const enteredPassword = req.body.password
    const user = await getLoggedUser(req.payload.id)
    try {
        if (await bcrypt.compare(enteredPassword, user.password)) {
            await User.findByIdAndDelete(user.id)
            req.session.token = null
            res.redirect('/login')
        } else {
            notificationMessage = 'Incorrect Password'
            notificationMessageStatus = 'bad'
            res.redirect('/user/settings')
        }
    } catch (err) {
        notificationMessage = 'Something went wrong'
        notificationMessageStatus = 'bad'
        res.redirect('/user/settings')
    }
    
}

function clearStatus() {
    if (notificationMessageStatus != null) {
        notificationMessage = null
        notificationMessageStatus = null
    }
}

module.exports = {
    pageInit,
    getLoggedUser,
    getUserInformation,
    changePassword,
    deleteUserAccount
}