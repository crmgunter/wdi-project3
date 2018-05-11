import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const CardContainer = styled.div`
text-align: center;
`

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
            <CardContainer>
                <div>{this.state.card.name}</div>
                <div><img src={this.state.card.imageUrl} alt="card"/></div>
                <div><p>Colors: {this.state.card.colors}</p></div>
                <div><p>Converted Mana Cost: {this.state.card.cmc}</p></div>
                <div>Rarity: {this.state.card.rarity}</div>
                <div>Set: {this.state.card.set}</div>
                <div>Artist: {this.state.card.artist}</div>
                <div>Type: {this.state.card.type}</div>
                <div>Mana Cost: {this.state.card.manaCost}</div>
                <div>Card Text: {this.state.card.text}</div>
                <div>Power: {this.state.card.power}</div>
                <div>Toughness: {this.state.card.toughness}</div>
            </CardContainer>
           
        );
    }
}

export default SingleCard;