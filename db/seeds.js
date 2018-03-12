require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user')
const Deck = require('../models/deck')
const Card = require('../models/card')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('open', () => {
    console.log('You have connected to mongoDB!!!')
})
db.on('error', (err) => {
    console.log(err)
})

const blackLotus = new Card({
    name: "Black Lotus",
    color: "Colorless",
    cmc: "0",
    rarity: "Rare",
    set: "Alpha",
    artist: "Christopher Rush",
    img: "https://6d4be195623157e28848-7697ece4918e0a73861de0eb37d08968.ssl.cf1.rackcdn.com/8989_200w.jpg"
})

const testDeck = new Deck({
    name: "test deck one",
    cards: [blackLotus],
    archetype: "artifact",
    format: "vintage"
})

const cameron = new User({
    username: "crmgunter",
    decks: [testDeck]
})

Deck.remove(() => {
    return User.remove()
}).then(() => {
    return Card.remove()
}).then(() => {
    return cameron.save()
}).then(() => {
    console.log('saved successfully')
    db.close
}).catch((err) => {
    console.log(err)
    db.close()
})
