const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        index: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Account', AccountSchema)
