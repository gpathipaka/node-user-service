const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/test', (req, res) => {:q!
    res.status(200),send({messge: 'Hello Mr. Gangadhar Pathipaka'})
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router