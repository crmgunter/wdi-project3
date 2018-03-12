const mongoose = require('mongoose')
const deckSchema = require('../db/schemas/deckSchema')

const Deck = mongoose.model('deck', deckSchema)

module.exports = Deck