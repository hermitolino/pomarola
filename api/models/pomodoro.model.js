'use strict'

const mongoose = require('mongoose')

const PomodoroSchema = mongoose.Schema({
    title: String,
    time: String,
    start: Date,
    end: Date,
    status: String,
    user: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId
}, {timestamps: true})

module.exports = mongoose.model('Pomodoro', PomodoroSchema)
