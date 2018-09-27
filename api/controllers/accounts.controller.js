const Account = require('../models/account.model')

// Create and save the new Account
exports.create = (req, res) => {
    // Create a Account
    const account = new Account({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    // Save Account in the database
    account.save()
        .then(data => {
            return res.send(data)
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error ocurred while createing the Account"
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
