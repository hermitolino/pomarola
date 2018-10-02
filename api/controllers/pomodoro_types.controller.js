'use strict'

const PomodoroType = require('../models/pomodoro_type.model')

// Create and save the new PromodoroType
exports.create = (req, res) => {
    PomodoroType.create({
        title: req.body.title || 'Untitle pomodoro',
        time: req.body.time || '25min'
    }, function(err, pomodoro_type) {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error ocurred while createing the Pomodoro Type"
            })
        }

        return res.send(pomodoro_type)
    })
}

// Retrive and return all pomodoro_types from the database
exports.findAll = (req, res) => {
    PomodoroType.find()
        .then(pomodoro_types => {
            return res.send(pomodoro_types)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while retrieving pomodoro_types"
            })
        })
}

// Find a single pomodoro_type with a id
exports.findOne = (req, res) => {
    PomodoroType.findById(req.params.id)
        .then(pomodoro_type => {
            if(!pomodoro_type) {
                return res.status(404).send({
                    message: "PomodoroType not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro_type)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "PomodoroType not found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving pomodoro_type with id" + req.params.id
            })
        })
}

// Update a pomodoro_type indentified by id
exports.update = (req, res) => {
    PomodoroType.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        time: req.body.time
    }, {new: true})
        .then(pomodoro_type => {
            if(!pomodoro_type) {
                return res.status(400).send({
                    message: "PomodoroType not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro_type);
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "PomodoroType pomodoro_type found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error updating pomodoro_type with id: " + req.params.id
            })
        })
}

// Delete a pomodoro_type indentified by id
exports.delete = (req, res) => {
    PomodoroType.findByIdAndRemove(req.params.id)
        .then(pomodoro_type => {
            if(!pomodoro_type) {
                return res.status(404).send({
                    message: "PomodoroType not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro_type)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "PomodoroType not found with id:" + req.params.id
                })
            }
            return res.status(500).send({
                message: "Could not delete pomodoro_type with id: " + req.params.id
            })
        })
}

