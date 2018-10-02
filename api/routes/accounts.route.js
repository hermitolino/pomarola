'use strict'

module.exports = (app) => {
    const auth = require('../middlewares/auth.middleware')
    const accounts = require('../controllers/accounts.controller')

    // Login
    app.post('/login', accounts.login)

    // Create a new account
    app.post('/accounts', accounts.create)

    // Retrive all accounts
    app.get('/accounts', auth.verifyToken, accounts.findAll)

    // Retrive a sigle account with id
    app.get('/accounts/:id', auth.verifyToken, accounts.findOne)

    // Update a account with id
    app.put('/accounts/:id', auth.verifyToken, accounts.update)

    // Delete a account with id
    app.delete('/accounts/:id', auth.verifyToken, accounts.delete)

    // Logout
    app.get('/logout', function (req, res) {
        if(req.session) {
            // destroy session
            req.session.destroy(function(err) {
                if(err) {
                    return next(err)
                } else {
                    return res.redirect('/')
                }
            })
        }
    })
}
