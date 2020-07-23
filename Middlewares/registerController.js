const bcrypt = require('bcrypt')
const User = require('../models/user')
const nameExistCheck = require('../Configs/nameExistCheck')

async function registerNewUser(req, res) {
    const { name, email, password } = req.body
    const checkExist = await nameExistCheck(name, email, true)
    if (checkExist.nameExistFlag) 
        return res.render('register', { userExistError: true, errMessage: 'Username Already Exist!' })
    if (checkExist.emailExistFlag)
        return res.render('register', { userExistError: true, errMessage: 'Email Already Exist!'})
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (err) {
        res.redirect('/register')
    }
}

module.exports = registerNewUser