'use strict'

const mongoose = require('mongoose')

const PomodoroTypeSchema = mongoose.Schema({
    title: String,
    time: String
}, {timestamps: true})

module.exports = mongoose.model('PomodoroType', PomodoroTypeSchema)
