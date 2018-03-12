require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})

db.on('open', () => {
    console.log('Successfully connected to MongoDB!')
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello clarice')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('App is running hot on port' + PORT)
})