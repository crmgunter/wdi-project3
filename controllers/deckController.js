const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Deck = require("../models/deck");

// INDEX ROUTE
router.get("/", (req, res) => {
  User.findById(req.params.userId).then((user) => {
      console.log(user)
      const decks = user.decks
      res.json(decks)
  }).catch(err => {
      console.log(err)
  })
});

// CREATE ROUTE
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

//SHOW ROUTE
router.get("/:id", (req, res) => {
    const deckId = req.params.id
    const userId = req.params.userId;
    console.log(userId)
    console.log(deckId)
    User.findById(userId).then((user) => {
        const deck = user.decks.id(deckId)
      res.json(deck);
    }).catch(err => {
    console.log(err);
    res.json(err);
  });
})

//UPDATE ROUTE
router.patch('/:id', (req, res) => {
    const deckId = req.params.id
    const userId = req.params.userId
    const updatedDeck = req.body
    User.findByIdAndUpdate(userId).then((user) => {
        const deckToUpdate = user.decks.id(deckId)
        deckToUpdate.name = updatedDeck.name
        deckToUpdate.description = updatedDeck.description
        deckToUpdate.archetype = updatedDeck.archetype
        deckToUpdate.format = updatedDeck.format
        return user.save()
    }).then((user) => {
        res.json(user.decks.id(deckId))
    }).catch((err) =>{
        console.log(err)
    })
})

//DELETE ROUTE
router.delete('/:id', (req, res) => {
    const deckId = req.params.id
    const userId = req.params.userId
    User.findById(userId)
    .then((user) => {
        const deck = user.decks.id(deckId).remove()
        return user.save()
        res.redirect(`/api/users/${userId}/decks`)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;
