'use strict'

const Pomodoro = require('../models/pomodoro.model')

// Create and save the new PromodoroType
exports.create = (req, res) => {
    Pomodoro.find({
        user: req.body.auth_user_id,
        status: 'running'
    }).then(pomodoros => {
        if(pomodoros.length > 0) {
            return res.status(500).send({
                message: "A pomodoro was start for this account"
            })
        }

        Pomodoro.create({
            title: req.body.title | 'Untitled',
            time: req.body.time,
            start: req.body.start,
            end: req.body.end,
            status: req.body.status || 'running',
            type: req.body.type,
            user: req.body.auth_user_id
        }, function(err, pomodoro) {
            if(err) {
                return res.status(500).send({
                    message: err.message || "Some error ocurred while createing the Pomodoro Type"
                })
            }

            return res.send(pomodoro)
        })
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error ocurred while trying starting the pomodoro"
        })
    })
}

// Retrive and return all pomodoros from the database
exports.findAll = (req, res) => {
    Pomodoro.find()
        .then(pomodoros => {
            return res.send(pomodoros)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while retrieving pomodoros"
            })
        })
}

// Find a single pomodoro with a id
exports.findOne = (req, res) => {
    Pomodoro.findById(req.params.id)
        .then(pomodoro => {
            if(!pomodoro) {
                return res.status(404).send({
                    message: "Pomodoro not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pomodoro not found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving pomodoro with id" + req.params.id
            })
        })
}

// Update a pomodoro indentified by id
exports.update = (req, res) => {
    Pomodoro.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        time: req.body.time,
        start: req.body.start,
        end: req.body.end,
        status: req.body.status,
        type: req.body.type
    }, {new: true})
        .then(pomodoro => {
            if(!pomodoro) {
                return res.status(400).send({
                    message: "Pomodoro not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro);
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pomodoro pomodoro found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error updating pomodoro with id: " + req.params.id
            })
        })
}

// Delete a pomodoro indentified by id
exports.delete = (req, res) => {
    Pomodoro.findByIdAndRemove(req.params.id)
        .then(pomodoro => {
            if(!pomodoro) {
                return res.status(404).send({
                    message: "Pomodoro not found with id: " + req.params.id
                })
            }
            return res.send(pomodoro)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pomodoro not found with id:" + req.params.id
                })
            }
            return res.status(500).send({
                message: "Could not delete pomodoro with id: " + req.params.id
            })
        })
}

