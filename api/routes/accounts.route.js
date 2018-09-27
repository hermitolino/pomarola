module.exports = (app) => {
    const accounts = require('../controllers/accounts.controller.js')

    // Create a new account
    app.post('/accounts', accounts.create)

    // Retrive all accounts
    app.get('/accounts', accounts.findAll)

    // Retrive a sigle account with id
    app.get('/accounts/:id', accounts.findOne)

    // Update a account with id
    app.put('/accounts/:id', accounts.update)

    // Delete a account with id
    app.delete('/accounts/:id', accounts.delete)
}
