const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    console.log('Ohhh yeah.....')
    next()
}

module.exports = auth