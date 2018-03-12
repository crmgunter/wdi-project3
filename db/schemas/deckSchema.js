const mongoose = require('mongoose')
const cardSchema = require('./cardSchema')
const Schema = mongoose.Schema

const deckSchema = new Schema({
    name: String,
    cards: [cardSchema],
    archetype: String,
    format: String
})

module.exports = deckSchema