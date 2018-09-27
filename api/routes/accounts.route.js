module.exports = (app) => {
    const accounts = require('../controllers/accounts.controller.js')

    // Login
    app.post('/login', accounts.login)

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
