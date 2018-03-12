const mongoose = require('mongoose')
const cardSchema = require('../db/schemas/cardSchema')

const Card = mongoose.model('card', cardSchema)

module.exports = Card