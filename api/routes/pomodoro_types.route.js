'use strict'

module.exports = (app) => {
    const auth = require('../middlewares/auth.middleware')
    const pomodoro_types = require('../controllers/pomodoro_types.controller.js')

    // Create a new pomodoro_type
    app.post('/pomodoro_types', auth.verifyToken, pomodoro_types.create)

    // Retrive all pomodoro_types
    app.get('/pomodoro_types', auth.verifyToken, pomodoro_types.findAll)

    // Retrive a sigle pomodoro_type with id
    app.get('/pomodoro_types/:id', auth.verifyToken, pomodoro_types.findOne)

    // Update a pomodoro_type with id
    app.put('/pomodoro_types/:id', auth.verifyToken, pomodoro_types.update)

    // Delete a pomodoro_type with id
    app.delete('/pomodoro_types/:id', auth.verifyToken, pomodoro_types.delete)
}
