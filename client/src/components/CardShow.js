import React, { Component } from 'react';
import axios from 'axios'

class CardShow extends Component {

    addCardToDeck = async card => {
        const userId = this.props.userId;
        const deckId = this.props.deckId;
        console.log(userId)
        console.log(card)
        const payload = {
          name: card.name,
          imageUrl: card.imageUrl,
          artist: card.artist,
          cmc: card.cmc,
          color: card.color
        };
        console.log(payload);
        await axios.post(`/api/users/${userId}/decks/${deckId}/cards`, payload);
      };

    render() {
        return (
            <div>
                <h1>hey from card show</h1>
                {this.props.cards.map((card, index) => (
                    <div>
                    {card.name}
                    <img src={card.imageUrl} alt={card.name}/>
                    <button onClick={()=> this.addCardToDeck(card)}>Add To Deck</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default CardShow;