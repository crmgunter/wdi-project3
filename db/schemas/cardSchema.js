const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: String,
    color: String,
    cmc: String,
    rarity: String,
    set: String,
    artist: String,
    img: String
})

module.exports = cardSchema