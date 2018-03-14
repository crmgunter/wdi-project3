import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from './NewDeckForm'

class Decks extends Component {
  state = {
    user: {
      decks: []
    },
    newDeck: false
  };

  async componentWillMount() {
    const userId = this.props.match.params.userId;
    const res = await axios.get(`/api/users/${userId}`);
    const user = res.data;
    this.setState({ user });
    console.log(this.state.user.decks);
  }

  toggleNewDeckForm = () => {
      this.setState({ newDeck: !this.state.newDeck})
  }

  render() {
    return (
      <div>
        <h1>Hey from decks!</h1>
        <div>
          <button onClick={this.toggleNewDeckForm}>Add New Deck</button>
          {this.state.newDeck ? <NewDeckForm/> : null}
        </div>
        {this.state.user.username}'s decks
        {this.state.user.decks.map(deck => (
          <div key={deck._id}>
            <h3>{deck.name}</h3>
            <h5>{deck.description}</h5>
            <h5>{deck.archetype}</h5>
            <h5>{deck.format}</h5>
          </div>
        ))}
      </div>
    );
  }
}

export default Decks;
