const express = require('express')
require('./db/mongoose')

const app = express()
app.use(express.json())

const userRouter = require('./router/user')

//Custom Routers --Route all User service routes to this router.
app.use(userRouter)

module.exports = app