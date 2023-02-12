require('dotenv').config()

const breadRoutes = require('./controllers/bread')

const express = require('express')
const app = express()

// MIDDLEWARE
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use('/breads', breadRoutes)

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))