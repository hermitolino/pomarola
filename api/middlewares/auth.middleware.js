const jwt = require('jsonwebtoken')
const authConfig = require('../configs/auth.config')

// Middleware to verify the token passed
exports.verifyToken = (req, res, next) => {
    var token = req.headers['x-access-token'] || false

    if(!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token founded.'
        })
    }
    jwt.verify(token, authConfig.secret, function(err, decoded) {
        if(err) {
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate'
            })
        }
        req.body.auth_user_id = decoded.id
        next()
    })
}
