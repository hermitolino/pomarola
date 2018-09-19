module.exports = (app) => {
    const notes = require('../controllers/notes.controller.js')

    // Create a new Note
    app.post('/notes', notes.create)

    // Retrive all Notes
    app.get('/notes', notes.findAll)

    // Retrive a sigle Note with id
    app.get('/notes/:id', notes.findOne)

    // Update a Note with id
    app.put('/notes/:id', notes.update)

    // Delete a Note with id
    app.delete('/notes/:id', notes.delete)
}
