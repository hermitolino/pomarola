'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AccountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        index: true,
        trim: true
    }
}, {timestamps: true})

// Hashing a password before saving it to the database
AccountSchema.pre('save', function (next) {
    var account = this

    bcrypt.hash(account.password, 10, function (err, hash) {
        if(err) {
            return next(err)
        }
        account.password = hash
        next()
    })
})

// Authenticate input against database
AccountSchema.statics.authenticate = function(email, password, callback) {
    this.findOne({email: email})
        .exec(function (err, account) {
            if(err) {
                return callback(err)
            } else if(!account) {
                var err = new Error('Account not found')
                err.status = 401
                return callback(err)
            }

            bcrypt.compare(password, account.password, function(err, result) {
                if(result === true) {
                    return callback(null, account)
                }
                return callback(err)
            })
        })
}

module.exports = mongoose.model('Account', AccountSchema)
