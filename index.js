require('dotenv').config()

const breadRoutes = require('./controllers/bread')

const express = require('express')
const app = express()

app.use('/breads', breadRoutes)

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))