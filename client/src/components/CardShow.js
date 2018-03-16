import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const CenterContent = styled.div`
text-align: center;
`

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
    this.props.getDeck()

  };

  render() {
    return (
      <CenterContent>
        {this.props.cards.map((card, index) => (
          <div key={index}>
           <div> <img src={card.imageUrl} alt={card.name} /> </div>
            <div><Button onClick={() => this.addCardToDeck(card)}>
              Add To Deck
            </Button>
            </div>
          </div>
        ))}
      </CenterContent>
    );
  }
}

export default CardShow;
