import React, { Component } from "react";
import axios from "axios";
import NewDeckForm from "./NewDeckForm";
import { Link } from "react-router-dom";

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
    this.setState({ newDeck: !this.state.newDeck });
  };

  remove = index => {
    const userId = this.props.match.params.userId;
    const deckId = this.state.user.decks[index]._id;
    console.log(deckId);
    axios
      .delete(`/api/users/${userId}/decks/${deckId}`)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };



  render() {
    return (
      <div>
        <h1>Hey from decks!</h1>
        <div>
          <button onClick={this.toggleNewDeckForm}>Add New Deck</button>
          {this.state.newDeck ? (
            <NewDeckForm userId={this.props.match.params.userId} />
          ) : null}
        </div>
        {this.state.user.username}'s decks
        {this.state.user.decks.map((deck, i) => (
          <div key={deck._id}>
            <Link to={`/users/${this.state.user._id}/decks/${deck._id}`}>
              <h3>{deck.name}</h3>
            </Link>
            <h5>{deck.description}</h5>
            <h5>{deck.archetype}</h5>
            <h5>{deck.format}</h5>
            <button onClick={() => this.remove(i)}>Delete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Decks;
