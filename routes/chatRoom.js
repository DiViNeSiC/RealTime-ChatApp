const express = require('express')
const Room = require('../models/room')
const router = express.Router()

router.get('/name=:slug', getRoomBySlug, (req, res) => {
    res.render('chatRoom', { room: req.room, token: req.session.token })
})

async function getRoomBySlug(req, res, next) {
    const room = await Room.findOne({ slug: req.params.slug })
    if (room == null) return res.redirect('/')
    req.room = room
    next()
}

module.exports = router