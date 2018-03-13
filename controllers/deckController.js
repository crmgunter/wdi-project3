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

// //UPDATE ROUTE
// router.patch('/:id', (req, res) => {
//     const userId = req.params.id
//     const updatedUser = req.body
//     const savedUser = User.findByIdAndUpdate(userId, updatedUser)
//     .then((updatedUser) => {
//         res.json(savedUser)
//         res.redirect('/api/users')
//     }).catch((err) => {
//         console.log(err)
//         res.status(500).json(err)
//     })
// })

// //DELETE ROUTE
// router.delete('/:id', (req, res) => {
//     const userId = req.params.id
//     User.findByIdAndRemove(userId)
//     .then(() => {
//         res.redirect('/api/users')
//     }).catch((err) => {
//         console.log(err)
//     })
// })

module.exports = router;
