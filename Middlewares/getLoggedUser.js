const User = require('../models/user')

async function getLoggedUser(id) {
    const user = await User.findById(id)
    return user
}

module.exports = getLoggedUser
