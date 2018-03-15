const express = require("express");
const router = express.Router({ mergeParams: true });
const mtg = require('mtgsdk')
const User = require("../models/user");
const Deck = require("../models/deck");
const Card = require("../models/card");

// INDEX ROUTE
router.get("/", (req, res) => {
  userId = req.params.userId;
  deckId = req.params.deckId;
  User.findById(userId)
    .then(user => {
      const deck = user.decks.id(deckId);
      res.json(deck.cards);
    })
    .catch(err => {
      console.log(err);
    });
});

// POST ROUTE
router.post("/", (req, res) => {
  const userId = req.params.userId;
  const deckId = req.params.deckId;
  const newCard = req.body;

  User.findById(userId)
    .then(user => {
      const deck = user.decks.id(deckId);
      console.log(deck);
      deck.cards.push(newCard);
      return user.save();
    })
    .then(user => {
      res.json(user.decks.id(deckId).cards);
    })
    .catch(err => {
      console.log(err);
    });
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
  const deckId = req.params.deckId;
  const userId = req.params.userId;
  const cardId = req.params.id;
  User.findById(userId)
    .then(user => {
      const card = user.decks.id(deckId).cards.id(cardId);
      res.json(card);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

router.delete("/:id", (req, res) => {
  const deckId = req.params.deckId;
  const userId = req.params.userId;
  const cardId = req.params.id;
  User.findById(userId)
    .then(user => {
      const card = user.decks.id(deckId).cards.id(cardId);
      card.remove();
      return user.save();
    })
    .then(user => {
      res.json(user.decks.id(deckId).cards.id(cardId));
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/search/:name", (req, res) => {
    name = req.params.name
  mtg.card.where({name}).then(cards => {
    console.log(cards)
    res.json(cards)
  });
});

module.exports = router;
