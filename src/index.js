const app = require('./app')

const PORT = process.env.PORT


app.listen(PORT, () => {
    console.log(`Applicaiton is listening on ${PORT}`)
})
