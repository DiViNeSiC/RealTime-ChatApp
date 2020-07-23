const jwt = require('jwt-then')

const auth = async (req, res, next) => {
    try {
        const token = req.session.token
        if (token == null) return res.redirect('/login')
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        req.payload = payload
        next()
    } catch (err) {
        res.redirect('/login')
    }
}

const notAuth = (req, res, next) => {
    const token = req.session.token
    if (token) return res.redirect('/')
    next()
} 


module.exports = {
    auth,
    notAuth
}