import React, { Component } from 'react';
import axios from 'axios'

class SingleCard extends Component {
    state = {
        user: {},
        deck: {},
        card: {}
      };
    
      async componentWillMount() {
        const userId = this.props.match.params.userId;
        console.log(userId)
        const deckId = this.props.match.params.deckId;
        const cardId = this.props.match.params.cardId;
        console.log(cardId)
        const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
        const userRes = await axios.get(`/api/users/${userId}`);
        const cardRes = await axios.get(`/api/users/${userId}/decks/${deckId}/cards/${cardId}`)
        console.log(cardRes)
        const user = userRes.data;
        const deck = res.data;
        const card = cardRes.data;
        this.setState({ user, deck, card });
      }

    render() {
        return (
            <div>
                <h1>hey from single Card!</h1>
                <div>{this.state.card.name}</div>
                <div><img src={this.state.card.img} alt="card"/></div>
                <div>{this.state.card.color}</div>
                <div>{this.state.card.cmc}</div>
                <div>{this.state.card.rarity}</div>
                <div>{this.state.card.set}</div>
                <div>{this.state.card.artist}</div>
            </div>
        );
    }
}

export default SingleCard;