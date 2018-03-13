const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Deck = require("../models/deck");
const Card = require('../models/card')

// INDEX ROUTE
router.get("/", (req, res) => {
    userId = req.params.userId
    deckId = req.params.deckId
    User.findById(userId).then((user) => {
        console.log(user)
        const deck = user.decks.id(deckId)
        console.log(deck.cards)
        res.json(deck.cards)
    }).catch(err => {
        console.log(err)
    })
  });

// POST ROUTE
router.post("/", (req, res) => {
    const userId = req.params.userId
    const newDeck = req.body

    User.findById(userId).then((user) => {
        user.decks.push(newDeck)
        return user.save()
    }).then((user) => {
        res.json(user)
    }).catch((err) =>{
        console.log(err)
    })
});

module.exports = router