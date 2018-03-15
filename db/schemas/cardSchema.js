const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: String,
    colors: String,
    cmc: String,
    rarity: String,
    set: String,
    artist: String,
    imageUrl: String,
    type: String,
    manaCost: String,
    text: String,
    flavor: String,
    power: String,
    toughness: String
})

module.exports = cardSchema