const mongoose = require('mongoose')
const slugify = require('slugify')

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    creator: {
        type: Object,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

roomSchema.pre('validate', function(next) {
    if (this.roomName) {
        this.slug = slugify(this.roomName, {
            lower: true,
            strict: true
        })
    }

    next()
})

module.exports = mongoose.model('Room', roomSchema)