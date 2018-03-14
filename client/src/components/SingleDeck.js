import React, { Component } from "react";
import axios from "axios";

class SingleDeck extends Component {
  state = {
    user: {},
    deck: {},
    card: {}
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
    const userRes = await axios.get(`/api/users/${userId}`);
    const cardRes = await axios.get(`/api/users/${userId}/decks/${deckId}/cards`)
    const user = userRes.data;
    const deck = res.data;
    const card = cardRes.data
    this.setState({ user, deck, card });
  }

  render() {
    return (
      <div>
        <h1>Hey from Single Deck!</h1>
        {this.state.user.username}'s deck
        <div>{this.state.deck.name}</div>
        <div>{this.state.deck.description}</div>
        <div>{this.state.deck.archetype}</div>
        <div>{this.state.deck.format}</div>
        <div>{this.state.card.name}</div>
        {console.log(this.state.deck.cards)}
      </div>
    );
  }
}

export default SingleDeck;
