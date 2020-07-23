const express = require('express')
const router = express.Router()
const {
    pageInit,
    getUserInformation,
    changePassword,
    deleteUserAccount
} = require('../Middlewares/userSettings')

router.get('/', pageInit)

router.post('/update', getUserInformation)

router.post('/password/change', changePassword)

router.delete('/delete', deleteUserAccount)

module.exports = router