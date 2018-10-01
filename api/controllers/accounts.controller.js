const jwt = require('jsonwebtoken')
const Account = require('../models/account.model')
const secret = require('../configs/auth.config').secret

// Create and save the new Account
exports.create = (req, res) => {
    // Create a Account
    Account.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, account) {
        if(err) {
            return res.status(500).send({
                message: err.message || "Some error ocurred while createing the Account"
            })
        }

        return res.send({
            auth: true,
            token: jwt.sign({id: account._id}, secret, {
                expiresIn: 86400 // 24 hours
            }),
            account: account
        })
    })
}

// Retrive and return all accounts from the database
exports.findAll = (req, res) => {
    Account.find()
        .then(accounts => {
            return res.send(accounts)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while retrieving accounts"
            })
        })
}

// Find a single account with a id
exports.findOne = (req, res) => {
    Account.findById(req.params.id)
        .then(account => {
            if(!account) {
                return res.status(404).send({
                    message: "Account not found with id: " + req.params.id
                })
            }
            return res.send(account)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account not found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error retrieving account with id" + req.params.id
            })
        })
}

// Update a account indentified by id
exports.update = (req, res) => {
    validateRequestAuthID(req, res)
    Account.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, {new: true})
        .then(account => {
            if(!account) {
                return res.status(400).send({
                    message: "Account not found with id: " + req.params.id
                })
            }
            return res.send(account);
        }).catch( err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account account found with id: " + req.params.id
                })
            }
            return res.status(500).send({
                message: "Error updating account with id: " + req.params.id
            })
        })
}

// Delete a account indentified by id
exports.delete = (req, res) => {
    validateRequestAuthID(req, res)
    Account.findByIdAndRemove(req.params.id)
        .then(account => {
            if(!account) {
                return res.status(404).send({
                    message: "Account not found with id: " + req.params.id
                })
            }
            return res.send(account)
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account not found with id:" + req.params.id
                })
            }
            return res.status(500).send({
                message: "Could not delete account with id: " + req.params.id
            })
        })
}

// Login
exports.login = (req, res) => {
    Account.authenticate(
        req.body.email,
        req.body.password,
        function(err, account) {
            if(err || !account) {
                return res.status(500).send({
                    message: "The login not works"
                })
            }

            return res.send({
                auth: true,
                token: jwt.sign({id: account._id}, secret, {
                    expiresIn: 86400 // 24 hours
                }),
                account: account
            })
        }
    )
}

const validateRequestAuthID = (req, res) => {
    if(req.params.id !== req.body.id) {
        return res.status(401).send({
            message: 'Not authorized'
        })
    }
}
