const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jwt-then')

async function login(req, res) {
    const { email, password } = req.body
    const lowerCaseEmail = email.toLowerCase()
    const user = await User.findOne({ email: lowerCaseEmail })
    
    if (user == null) res.render('login', { message: 'No User With That Email' })

    const passed = await bcrypt.compare(password, user.password)
    if (!passed) res.render('login', { message: "Incorrect Password" })
    
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET)
    req.session.token = token
    res.redirect('/')
}

module.exports = login