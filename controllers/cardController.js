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
        const deck = user.decks.id(deckId)
        res.json(deck.cards)
    }).catch(err => {
        console.log(err)
    })
  });

// POST ROUTE
router.post("/", (req, res) => {
    const userId = req.params.userId
    const deckId = req.params.deckId
    const newCard = req.body

    User.findById(userId).then((user) => {
        const deck = user.decks.id(deckId)
        console.log(deck)
        deck.cards.push(newCard)
        return user.save()
    }).then((user) => {
        res.json(user.decks.id(deckId).cards)
    }).catch((err) =>{
        console.log(err)
    })
});

// router.delete('/:id', (req, res) => {
//     const deckId = req.params.deckId
//     const userId = req.params.userId
//     const cardId = req.params.id
//     User.findById(userId)
//     .then((user) => {
//         const deck = user.decks.id(deckId)
//         deck.cards.id(cardId).remove
//         return user.save()
        
//     }).then((user) => {
//         res.json(user.decks.id(deckId).cards)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


module.exports = router