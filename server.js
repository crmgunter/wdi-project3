require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const userController = require('./controllers/userController')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('Successfully connected to MongoDB!')
})

// middleware!!!
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/client/build`))

// routes!!!

app.get('/', (req, res) => {
    res.send('hello clarice')
})

app.use('/api/users', userController)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('App is running hot on port' + PORT)
})