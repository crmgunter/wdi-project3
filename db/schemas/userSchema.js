const mongoose = require('mongoose')
const Schema = mongoose.Schema
const deckSchema = require('./deckSchema')

const userSchema = new Schema ({
    username: String,
    decks: [deckSchema]
})

module.exports = userSchema