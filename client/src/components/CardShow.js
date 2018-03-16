import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class CardShow extends Component {
  addCardToDeck = async card => {
    const userId = this.props.userId;
    const deckId = this.props.deckId;
    console.log(userId);
    console.log(card);
    const payload = {
      name: card.name,
      imageUrl: card.imageUrl,
      artist: card.artist,
      cmc: card.cmc,
      colors: card.colors,
      rarity: card.rarity,
      set: card.set,
      type: card.type,
      manaCost: card.manaCost,
      text: card.text,
      flavor: card.flavor,
      power: card.power,
      toughness: card.toughness
    };
    console.log(payload);
    await axios.post(`/api/users/${userId}/decks/${deckId}/cards`, payload);
  };

  render() {
    return (
      <div>
        {this.props.cards.map((card, index) => (
          <div key={index}>
          {/* <Link
                to={`/users/${this.props.userId}/decks/${this.props.deckId}/cards/${card._id}`}> */}
            {card.name}
            {/* </Link> */}
            <img src={card.imageUrl} alt={card.name} />
            <button onClick={() => this.addCardToDeck(card)}>
              Add To Deck
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default CardShow;
