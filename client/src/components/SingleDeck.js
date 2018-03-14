import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

class SingleDeck extends Component {
  state = {
    user: {},
    deck: {
        cards:[]
    }
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const deckId = this.props.match.params.deckId;
    const res = await axios.get(`/api/users/${userId}/decks/${deckId}`);
    const userRes = await axios.get(`/api/users/${userId}`);
    const user = userRes.data;
    const deck = res.data;
    this.setState({ user, deck });
  }

  hoverTest = () => {
      console.log('yay')
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
        {this.state.deck.cards.map((card) => (
            <div key={card._id}>
                <div onMouseEnter={this.hoverTest}>{card.name}</div>
                <Link to ={`/users/${this.state.user._id}/decks/${this.state.deck._id}/cards`}>Link to card</Link>
            </div>  
        ))}
        
      </div>
    );
  }
}

export default SingleDeck;
