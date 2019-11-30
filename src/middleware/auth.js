const jwt = require('jsonwebtoken')
const User = require('../model/user')

const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('Token', token)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Authenticate Failed.....'})
    }
}

module.exports = auth