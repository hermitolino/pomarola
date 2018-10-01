module.exports = (app) => {
    const auth = require('../middlewares/auth.middleware')
    const pomodoros = require('../controllers/pomodoros.controller.js')

    // Create a new pomodoro
    app.post('/pomodoros', auth.verifyToken, pomodoros.create)

    // Retrive all pomodoros
    app.get('/pomodoros', auth.verifyToken, pomodoros.findAll)

    // Retrive a sigle pomodoro with id
    app.get('/pomodoros/:id', auth.verifyToken, pomodoros.findOne)

    // Update a pomodoro with id
    app.put('/pomodoros/:id', auth.verifyToken, pomodoros.update)

    // Delete a pomodoro with id
    app.delete('/pomodoros/:id', auth.verifyToken, pomodoros.delete)
}
