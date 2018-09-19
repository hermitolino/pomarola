const Note = require('../models/note.model')

// Create and save the new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            messag: "Note content can not be empty"
        })
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    })

    // Save Note in the database
    note.save()
        .then(data => {
            return res.send(data)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while createing the Note"
            })
        })
}

// Retrive and return all notes from the database
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            return res.send(notes)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while retrieving notes"
            })
        })
}

// Find a single note with a id
exports.findOne = (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id: " + req.params.id
                })
            }
            return res.send(note)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving note with id" + req.params.id
            })
        })
}

// Update a note indentified by id
exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be update"
        })
    }

    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.content || "Untitled note",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(400).send({
                    message: "Note not found with id: " + req.params.id
                })
            }
            return res.send(note);
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note note found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error updating note with id: " + req.params.id
            })
        })
}

// Delete a note indentified by id
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.id)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id: " + req.params.id
                })
            }
            return res.send(note)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id:" + req.params.id
                })
            }
            return res.status(500).send({
                message: "Could not delete note with id: " + req.params.id
            })
        })
}
